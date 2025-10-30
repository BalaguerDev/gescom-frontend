import { useRouteStore } from "@/store/useRouteStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { usePareto } from "@/hooks/usePareto";
import dayjs from "dayjs";

/**
 * Hook principal para generar rutas diarias optimizadas
 * según perfil del usuario, horario y clasificación Pareto.
 */
export const useRouteBuilder = (clients, API_URL) => {
  const { monthlyRoutes, setMonthlyRoute } = useRouteStore();
  const { profile, loadingProfile } = useUserProfile(API_URL);
  const { classifiedClients } = usePareto(clients);

  // ⚠️ Hook fijo (no depende de props dinámicos para evitar errores de orden)
  const buildRouteForDay = async (selectedDate) => {
    if (loadingProfile) {
      console.log("⏳ Esperando a que se cargue el perfil...");
      return [];
    }

    if (!profile) {
      console.warn("⚠️ No se pudo cargar el perfil del usuario");
      return [];
    }

    const dateKey = dayjs(selectedDate).format("YYYY-MM-DD");

    // 🗓 Evita recalcular rutas ya guardadas
    if (monthlyRoutes[dateKey]) {
      console.log("✅ Ruta ya guardada para", dateKey);
      return monthlyRoutes[dateKey];
    }

    // 📅 Selección de clientes según tipo y frecuencia
    const dayOfWeek = dayjs(selectedDate).day();
    const todaysClients = classifiedClients.filter((c, idx) => {
      if (c.type === "A") return idx % 3 === dayOfWeek % 3; // 3 visitas/mes
      if (c.type === "B") return idx % 2 === dayOfWeek % 2; // 2 visitas/mes
      return dayOfWeek === idx % 7; // 1 visita/mes
    });

    // 🧩 Evita que se visite el mismo cliente con poco margen
    const recentDays = Array.from({ length: 7 }).map((_, i) =>
      dayjs(selectedDate).subtract(i + 1, "day").format("YYYY-MM-DD")
    );
    const recentClients = recentDays.flatMap(
      (d) => monthlyRoutes[d]?.stops?.map((s) => s.id) || []
    );

    const filteredClients = todaysClients.filter(
      (c) => !recentClients.includes(c.id)
    );

    if (!filteredClients.length) {
      console.log("⚠️ No hay clientes disponibles para hoy");
      return [];
    }

    // 🔢 Asegurar mínimo de visitas diarias
    const MIN_VISITS = 5;
    let clientsForToday = [...filteredClients];

    if (clientsForToday.length < MIN_VISITS) {
      const remainingClients = classifiedClients.filter(
        (c) => !clientsForToday.includes(c)
      );

      // Mezcla por prioridad Pareto (A > B > C)
      const priorityOrder = { A: 1, B: 2, C: 3 };
      const sortedRemaining = remainingClients.sort(
        (a, b) => priorityOrder[a.segment] - priorityOrder[b.segment]
      );

      const needed = MIN_VISITS - clientsForToday.length;
      clientsForToday = [...clientsForToday, ...sortedRemaining.slice(0, needed)];

      console.log(
        `🧩 Añadidos ${needed} clientes extra para cumplir el mínimo de ${MIN_VISITS}`
      );
    }

    // 🚀 Optimiza ruta con Google Maps
    const result = await optimizeWithGoogle(clientsForToday, profile);
    const orderedStops = result?.stops || [];

    // 💾 Guarda resultado
    setMonthlyRoute(dateKey, {
      stops: orderedStops,
      meta: result?.meta || null,
    });

    return { stops: orderedStops, meta: result?.meta || null };
  };

  return { buildRouteForDay };
};

/**
 * 🚗 Optimización y cálculo de tiempos con Google Maps
 */
async function optimizeWithGoogle(clients, profile) {
  if (!window.google?.maps) {
    console.error("❌ Google Maps no está cargado aún");
    return clients;
  }

  const validClients = clients.filter((c) => c.address);
  if (validClients.length < 1) return validClients;

  const origin = profile?.startPoint;
  const destination = profile?.endPoint;
  const startTime = profile?.startTime;
  const plannedEnd = profile?.endTime;

  const waypoints = validClients.map((c) => ({
    location: c.address,
    stopover: true,
  }));

  try {
    const directionsService = new google.maps.DirectionsService();

    const result = await new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
        },
        (response, status) => {
          if (status === "OK") resolve(response);
          else reject(status);
        }
      );
    });

    const order = result.routes[0].waypoint_order;
    const orderedClients = order.map((i) => validClients[i]);
    const legs = result.routes[0].legs;

    // 🕐 Inicializa horario y límites
    let currentTime = dayjs()
      .hour(Number(startTime.split(":")[0]))
      .minute(Number(startTime.split(":")[1]))
      .second(0);

    const plannedEndTime = dayjs()
      .hour(Number(plannedEnd.split(":")[0]))
      .minute(Number(plannedEnd.split(":")[1]))
      .second(0);

    const visitDuration = 45 * 60; // 45 min
    const lunchBreak = 75 * 60; // 1h15
    const totalStops = orderedClients.length;
    const middleIndex = Math.floor(totalStops / 2);

    const withTimes = [];

    for (let i = 0; i < totalStops; i++) {
      const leg = legs[i];
      const distanceKm = leg?.distance?.value ? leg.distance.value / 1000 : 0;
      const durationMin = leg?.duration?.value ? Math.round(leg.duration.value / 60) : 0;

      // 🚗 Avanza el reloj con la duración del trayecto
      if (leg?.duration?.value) {
        currentTime = currentTime.add(leg.duration.value, "second");
      }

      const client = orderedClients[i];
      const arrivalHour = currentTime.format("HH:mm");

      // 🚫 Detén si sobrepasas horario
      if (currentTime.isAfter(plannedEndTime.subtract(15, "minute"))) break;

      withTimes.push({
        ...client,
        order: i + 1,
        arrivalHour,
        distanceKm,
        durationMin,
      });

      // ⏱ Añade tiempo de visita
      currentTime = currentTime.add(visitDuration, "second");

      // 🍽 Pausa de comida
      if (i === middleIndex && totalStops > 3) {
        currentTime = currentTime.add(lunchBreak, "second");
      }
    }

    // 🚗 Último trayecto de regreso a casa
    const lastLeg = legs[legs.length - 1];
    if (lastLeg?.duration?.value) {
      currentTime = currentTime.add(lastLeg.duration.value, "second");
    }

    // ⏱ Ajuste final si excede jornada
    if (currentTime.isAfter(plannedEndTime)) {
      withTimes.pop();
    }

    // 📊 Resumen de ruta
    const finalArrival = currentTime.format("HH:mm");
    const totalMinutes = currentTime.diff(
      dayjs()
        .hour(Number(startTime.split(":")[0]))
        .minute(Number(startTime.split(":")[1])),
      "minute"
    );

    const totalKm =
      legs.reduce((acc, l) => acc + (l.distance?.value || 0), 0) / 1000;
    const totalDriveTime =
      legs.reduce((acc, l) => acc + (l.duration?.value || 0), 0) / 60;

    return {
      stops: withTimes,
      meta: {
        finalArrival,
        totalDuration: totalMinutes,
        totalStops: withTimes.length,
        totalKm: Math.round(totalKm),
        totalDriveTime: Math.round(totalDriveTime),
      },
    };
  } catch (error) {
    console.error("❌ Error en optimizeWithGoogle:", error);
    return { stops: clients, meta: { finalArrival: null, totalDuration: 0 } };
  }
}
