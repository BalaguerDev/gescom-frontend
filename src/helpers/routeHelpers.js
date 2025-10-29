import dayjs from "dayjs";

/** Suma los totales de facturación */
export const sumTotals = (arr = []) => (arr || []).reduce((s, m) => s + (m.total || 0), 0);

/** Clasifica clientes en A/B/C/D según Pareto */
export function paretoClassify(clients = []) {
  const clientsWithTotal = clients.map((c) => {
    const totalLast = sumTotals(c.revenueLastYear || []);
    return { id: c.id, totalLast, client: c };
  });

  const grandTotal = clientsWithTotal.reduce((s, c) => s + c.totalLast, 0);
  clientsWithTotal.sort((a, b) => b.totalLast - a.totalLast);

  let acc = 0;
  const map = {};
  for (let i = 0; i < clientsWithTotal.length; i++) {
    const c = clientsWithTotal[i];
    const contribution = grandTotal ? c.totalLast / grandTotal : 0;
    acc += contribution;
    if (acc <= 0.8) map[c.id] = "A";
    else if (acc <= 0.95) map[c.id] = "B";
    else if (acc <= 0.99) map[c.id] = "C";
    else map[c.id] = "D";
  }
  if (grandTotal === 0) {
    clients.forEach((c) => (map[c.id] = "D"));
  }
  return map;
}

/** Construye ruta optimizada con Google Maps */
export async function buildRouteWithGoogle(originAddress, clients, visitDurationMin, startTime) {
  if (!window.google?.maps?.DirectionsService) {
    throw new Error("Google Maps API no disponible");
  }

  const directionsService = new window.google.maps.DirectionsService();
  const waypoints = clients.map((c) => ({ location: c.address }));
  const request = {
    origin: originAddress,
    destination: originAddress,
    waypoints,
    travelMode: window.google.maps.TravelMode.DRIVING,
    optimizeWaypoints: true,
  };

  const result = await new Promise((resolve, reject) => {
    directionsService.route(request, (res, status) => {
      if (status === "OK") resolve(res);
      else reject(status);
    });
  });

  const route = result.routes[0];
  const order = route.waypoint_order;
  const legs = route.legs;

  let cumulativeTravel = 0;
  const orderedClients = [];

  for (let i = 0; i < order.length; i++) {
    const leg = legs[i];
    const travelSeconds = leg.duration?.value || 0;
    cumulativeTravel += travelSeconds;
    const arrival = startTime.add(cumulativeTravel + i * visitDurationMin * 60, "second");
    const clientIndex = order[i];
    const client = clients[clientIndex];
    orderedClients.push({
      ...client,
      arrivalISO: arrival.toISOString(),
      arrivalHour: arrival.format("HH:mm"),
      legDistanceText: leg.distance?.text || null,
      legDurationText: leg.duration?.text || null,
    });
  }

  return orderedClients;
}
