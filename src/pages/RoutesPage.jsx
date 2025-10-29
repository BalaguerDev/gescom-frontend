"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useClients } from "@/hooks/useClients";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState, useEffect } from "react";
import { GOOGLE_MAP_LIBRARIES } from "@/constants/googleLibraries";
import { useRouteBuilder } from "@/hooks/useRouteBuilder";
import { useClientInsights } from "@/hooks/useClientInsights";
import { RouteClientCard } from "@/components/routeClient/RouteClientCard";
import { RouteSidebar } from "@/components/routeClient/RouteSidebar";
import { Loader2, RouteIcon } from "lucide-react";

export default function RoutesPage() {
  const { profile } = useUserProfile("http://localhost:4000");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error } = useClients(getAccessTokenSilently);

  const [routeConfig, setRouteConfig] = useState({
    startPoint: "Barcelona",
    endPoint: "Barcelona",
    startHour: "07:00",
    endHour: "17:00",
    breakMinutes: 90,
  });

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

  const { routeList, selectedClient, setSelectedClient } = useRouteBuilder(
    clients,
    routeConfig,
    isLoaded
  );
  const insights = useClientInsights(selectedClient);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-600">
        Error cargando clientes: {String(error)}
      </div>
    );

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setIsSidebarOpen(false); // 🔹 Cierra menú al seleccionar en móvil
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
      <main className="flex-1 overflow-auto">
        {selectedClient ? (
          <RouteClientCard client={selectedClient} insights={insights} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Selecciona un cliente para ver detalles
          </div>
        )}
      </main>

      {/* 🧭 Sidebar visible siempre en desktop */}
      <div className="hidden md:block order-first md:order-last">
        <RouteSidebar
          routeList={routeList}
          selectedClient={selectedClient}
          onSelect={handleSelectClient}
        />
      </div>

      {/* 📱 Sidebar móvil deslizable */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <RouteSidebar
          routeList={routeList}
          selectedClient={selectedClient}
          onSelect={handleSelectClient}
        />
      </div>

      {/* Fondo semitransparente al abrir menú móvil */}
      {isSidebarOpen && (
        
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🟣 Botón flotante para abrir menú en móvil */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed bottom-20 right-6 bg-indigo-600 text-white flex items-center gap-2 px-4 py-3 rounded-full shadow-lg active:scale-95 transition"
      >
        <RouteIcon size={18} />
        <span className="text-sm font-medium">RUTA</span>
      </button>
    </div>
  );
}
