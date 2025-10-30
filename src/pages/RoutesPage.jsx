"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useClients } from "@/hooks/useClients";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState, useEffect, useMemo } from "react";
import { GOOGLE_MAP_LIBRARIES } from "@/constants/googleLibraries";
import { useRouteBuilder } from "@/hooks/useRouteBuilder";
import { useClientInsights } from "@/hooks/useClientInsights";
import { RouteClientCard } from "@/components/routeClient/RouteClientCard";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Loader2,
  RouteIcon,
  Search,
  CalendarDays,
  X,
  Route
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

export default function RoutesPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const { profile } = useUserProfile("http://localhost:4000");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error } = useClients(getAccessTokenSilently);

  const [routeList, setRouteList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [routeConfig, setRouteConfig] = useState({
    startPoint: "Barcelona",
    endPoint: "Barcelona",
    startHour: "07:00",
    endHour: "17:00",
    breakMinutes: 90,
  });

  const { buildRouteForDay } = useRouteBuilder(clients, "http://localhost:4000");

  useEffect(() => {
    if (profile) {
      setRouteConfig({
        startPoint: profile.startPoint || "Barcelona",
        endPoint: profile.endPoint || "Barcelona",
        startHour: profile.startTime || "07:00",
        endHour: profile.endTime || "17:00",
        breakMinutes: 90,
      });
    }
  }, [profile]);

  useEffect(() => {
    if (clients.length > 0 && isLoaded) {
      buildRouteForDay(selectedDate).then((result) => {
        const stops = result?.stops || [];
        setRouteList(stops);
        // auto-select first if nothing selected
        if (!selectedClient && stops.length > 0) setSelectedClient(stops[0]);
      });
    } else {
      setRouteList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients, selectedDate, isLoaded]);

  const insights = useClientInsights(selectedClient);

  const filteredRouteList = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return routeList;
    return routeList.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.address || "").toLowerCase().includes(q) ||
        (c.type || "").toLowerCase().includes(q)
    );
  }, [routeList, query]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-12 h-12 text-gray-400" />
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-600 text-center">
        Error cargando clientes: {String(error)}
      </div>
    );

  const handlePrevDay = () => setSelectedDate((prev) => prev.subtract(1, "day"));
  const handleNextDay = () => setSelectedDate((prev) => prev.add(1, "day"));
  const handleToday = () => setSelectedDate(dayjs().startOf("day"));

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setIsSidebarOpen(false);
  };

  const horaFinal =
    routeList.length > 0
      ? routeList[routeList.length - 1].arrivalTime ||
      routeList[routeList.length - 1].estimatedArrival
      : null;

  const formatTotalDriveTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} h`;
    return `${hours} h ${minutes} min`;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-full bg-gray-50">


      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden md:overflow-visible">
        {/* Top bar: title + search + date navigator */}
        <div className="sticky top-0 z-20 border-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Rutas</h2>

              <div className="hidden sm:flex items-center gap-2 ml-2">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                  <CalendarDays size={16} />
                  <span className="font-medium">
                    {selectedDate.isSame(dayjs(), "day")
                      ? "Hoy"
                      : selectedDate.format("D MMM YYYY")}
                  </span>
                </div>

                <button
                  onClick={handleToday}
                  className="text-sm text-indigo-600 hover:underline px-2 py-1"
                  aria-label="Ir a hoy"
                >
                  Ir a hoy
                </button>
              </div>
            </div>

            {/* 🔹 Date Navigator — responsive & aesthetic */}
            <div className="flex items-center justify-center sm:justify-start gap-3 ml-0 sm:ml-4">
              <button
                onClick={handlePrevDay}
                className="p-2 sm:p-2.5 rounded-full bg-white/70 hover:bg-indigo-50 text-gray-700 shadow-sm hover:shadow transition-all backdrop-blur-md cursor-pointer"
                aria-label="Día anterior"
              >
                <ArrowBigLeft size={20} className="sm:size-5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-gray-100 shadow-sm backdrop-blur-md">
                <CalendarDays size={16} className="text-indigo-500" />
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {selectedDate.isSame(dayjs(), "day")
                    ? "Hoy"
                    : selectedDate.isSame(dayjs().subtract(1, "day"), "day")
                      ? "Ayer"
                      : selectedDate.isSame(dayjs().add(1, "day"), "day")
                        ? "Mañana"
                        : selectedDate.format("dddd, D MMMM")}
                </span>
              </div>

              {/* Versión compacta para móvil */}
              <div className="sm:hidden text-sm font-medium text-gray-800 bg-white/80 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                {selectedDate.isSame(dayjs(), "day")
                  ? "Hoy"
                  : selectedDate.format("DD/MM")}
              </div>

              <button
                onClick={handleNextDay}
                className="p-2 sm:p-2.5 rounded-full bg-white/70 hover:bg-indigo-50 text-gray-700 shadow-sm hover:shadow transition-all backdrop-blur-md cursor-pointer"
                aria-label="Día siguiente"
              >
                <ArrowBigRight size={20} className="sm:size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        {/* Page content */}
        <div className="flex-1 md:py-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* 🧩 Columna principal (2/3) */}
            <div className="lg:col-span-2 space-y-6 min-h-[480px]">
              {selectedClient ? (
                <RouteClientCard client={selectedClient} insights={insights} />
              ) : filteredRouteList.length > 0 ? (
                <div className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm h-full flex flex-col justify-center items-center">
                  <p className="text-gray-700 text-base mb-3">Selecciona un cliente para ver detalles</p>
                  <p className="text-sm text-gray-400">O haz click en un cliente de la lista lateral</p>
                </div>
              ) : (
                <EmptyState onOpenSidebar={() => setIsSidebarOpen(true)} onToday={handleToday} />
              )}
            </div>

            {/* 🧩 Aside (1/3) */}
            <aside className="hidden md:flex flex-col gap-6 from-white to-gray-50">
              {/* --- Card resumen --- */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <RouteIcon size={16} className="text-indigo-600" />
                    Resumen de ruta
                  </h3>
                  <span className="inline-flex items-center justify-center text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full shadow-sm">
                    {routeList.length} paradas
                  </span>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-gray-500">🚗 Distancia total</span>
                    <span className="font-semibold text-gray-900">
                      {(routeList.reduce((acc, c) => acc + (c.distanceKm || 0), 0)).toFixed(1)} km
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-gray-500">⏱ Tiempo conduciendo</span>
                    <span className="font-semibold text-gray-900">
                      {formatTotalDriveTime(
                        routeList.reduce((acc, c) => acc + (c.durationMin || 0), 0)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-gray-500">🕒 Horario</span>
                    <span className="font-semibold text-gray-900">
                      {routeConfig.startHour} - {routeConfig.endHour}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-gray-500">☕ Descanso</span>
                    <span className="font-semibold text-gray-900">{routeConfig.breakMinutes} min</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(routeConfig.startPoint)}&destination=${encodeURIComponent(routeConfig.endPoint)}${routeList.length
                          ? `&waypoints=${routeList.map((c) => encodeURIComponent(c.address || c.name)).join("|")}`
                          : ""
                        }`,
                        "_blank"
                      );
                    }}
                    className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
                  >
                    Ver en Maps
                  </button>
                </div>
              </div>

              {/* --- Próximas paradas --- */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <CalendarDays size={14} className="text-indigo-500" />
                    Próximas paradas
                  </h4>
                </div>

                {filteredRouteList.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredRouteList.slice(0, 8).map((c) => (
                      <motion.li
                        key={c.id}
                        onClick={() => handleSelectClient(c)}
                        className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedClient?.id === c.id
                          ? "bg-indigo-50 border-indigo-200"
                          : "border-gray-100 hover:bg-gray-50"
                          }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{c.name}</p>
                            <p className="text-xs text-gray-500">
                              {c.arrivalHour || c.estimatedArrival || "—"}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{c.type || ""}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-400">No hay paradas para esta fecha</p>
                )}
              </div>
            </aside>
          </div>
        </div>

      </main>
      {/* 🔹 Botón flotante (solo móvil) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-35 right-0 z-40 bg-indigo-600 text-white px-5 py-3 rounded-l-full shadow-lg flex items-center gap-2 hover:scale-105 transition md:hidden"
      >
        <RouteIcon size={18} />
        <span className="text-xs font-medium">Ver ruta</span>
      </button>

      {/* 🔹 Aside deslizante en móvil */}

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
              onClick={() => setIsSidebarOpen(false)} // 👉 cerrar al hacer clic fuera
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed inset-y-0 right-0 w-4/5 bg-white shadow-2xl z-50 p-5 overflow-y-auto md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <RouteIcon size={18} className="text-indigo-600" />
                  Resumen de ruta
                </h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Contenido del aside (mismo que el de escritorio, simplificado) */}
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-500">🚗 Distancia total</span>
                  <span className="font-semibold text-gray-900">
                    {(routeList.reduce((acc, c) => acc + (c.distanceKm || 0), 0)).toFixed(1)} km
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-500">⏱ Tiempo conduciendo</span>
                  <span className="font-semibold text-gray-900">
                    {formatTotalDriveTime(
                      routeList.reduce((acc, c) => acc + (c.durationMin || 0), 0)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-500">🕒 Horario</span>
                  <span className="font-semibold text-gray-900">
                    {routeConfig.startHour} - {routeConfig.endHour}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-500">☕ Descanso</span>
                  <span className="font-semibold text-gray-900">{routeConfig.breakMinutes} min</span>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CalendarDays size={14} className="text-indigo-500" />
                  Próximas paradas
                </h4>

                {filteredRouteList.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredRouteList.slice(0, 8).map((c) => (
                      <motion.li
                        key={c.id}
                        onClick={() => handleSelectClient(c)}
                        className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedClient?.id === c.id
                          ? "bg-indigo-50 border-indigo-200"
                          : "border-gray-100 hover:bg-gray-50"
                          }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{c.name}</p>
                            <p className="text-xs text-gray-500">
                              {c.arrivalHour || c.estimatedArrival || "—"}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{c.type || ""}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-400">No hay paradas para esta fecha</p>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


    </div>
  );
}

/* ----------------- Subcomponent: EmptyState ----------------- */
function EmptyState({ onOpenSidebar, onToday }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
        <RouteIcon size={28} className="text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Sin paradas programadas</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        No hay clientes en la ruta para la fecha seleccionada. Revisa otra fecha o abre la lista para añadir paradas.
      </p>

      <div className="flex gap-3 mt-2">
        <button
          onClick={onToday}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm text-sm font-medium"
        >
          Ir a hoy
        </button>
        <button
          onClick={onOpenSidebar}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700"
        >
          Abrir lista
        </button>
      </div>
    </div>
  );
}
