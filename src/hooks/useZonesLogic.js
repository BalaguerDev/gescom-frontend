// src/features/zones/hooks/useZonesLogic.js
import { useState, useCallback, useRef } from "react";
import { useClients } from "@/hooks/useClients";
import { useZonesStore } from "@/store/useZoneStore";
import { useAuth0 } from "@auth0/auth0-react";
import { getClientsInPolygon, calcularFacturacionZona } from "../utils/revenueCalculations";

export const useZonesLogic = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error } = useClients(getAccessTokenSilently);
  const mapRef = useRef(null);

  const [drawingMode, setDrawingMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newZonePath, setNewZonePath] = useState(null);
  const [zoneName, setZoneName] = useState("");
  const [zoneColor, setZoneColor] = useState("#3b82f6");

  const { zones, selectedZone, addZone, deleteZone, setSelectedZone } = useZonesStore();

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (clients.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        clients.forEach((c) => c.lat && c.lng && bounds.extend({ lat: c.lat, lng: c.lng }));
        map.fitBounds(bounds);
      }
    },
    [clients]
  );

  const handlePolygonComplete = (polygon) => {
    const path = polygon.getPath().getArray().map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    setNewZonePath(path);
    setShowModal(true);
    polygon.setMap(null);
    setDrawingMode(false);
  };

  const handleConfirmNewZone = () => {
    if (!zoneName.trim()) return alert("Introduce un nombre para la zona.");
    const clientsInside = getClientsInPolygon(newZonePath, clients);
    addZone({
      id: Date.now(),
      name: zoneName,
      path: newZonePath,
      clients: clientsInside,
      color: zoneColor,
    });
    setShowModal(false);
    setZoneName("");
    setZoneColor("#3b82f6");
  };

  return {
    // estado
    mapRef,
    clients,
    loading,
    error,
    zones,
    selectedZone,
    drawingMode,
    showModal,
    zoneName,
    zoneColor,
    selectedClient,

    // acciones
    setDrawingMode,
    setSelectedClient,
    setSelectedZone,
    setShowModal,
    setZoneName,
    setZoneColor,
    deleteZone,
    onLoad,
    handlePolygonComplete,
    handleConfirmNewZone,
    calcularFacturacionZona,
  };
};
