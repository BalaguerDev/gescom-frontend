// src/features/zones/pages/MapPage.jsx
"use client";

import { Loader2 } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useZonesLogic } from "../hooks/useZonesLogic";
import { MapView } from "../components/zones/MapView";
import { ZoneList } from "../components/zones/ZoneList";
import { ClientList } from "../components/zones/ClientList";
import { ZoneModal } from "../components/zones/ZoneModal";

export default function MapPage() {
  const logic = useZonesLogic();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["drawing", "geometry"],
  });

  if (!isLoaded || logic.loading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-blue-600" size={28} />
      </div>
    );

  if (logic.error)
    return <p className="text-center text-red-600">Error: {logic.error}</p>;

  return (
    <div className="space-y-6 relative">
      <h2 className="text-xl font-semibold text-gray-800">🗺️ Zonas de clientes</h2>

      <MapView {...logic} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ZoneList {...logic} />
        <ClientList {...logic} />
      </div>

      {logic.showModal && <ZoneModal {...logic} />}
    </div>
  );
}
