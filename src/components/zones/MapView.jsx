"use client";

import { useEffect } from "react";
import { GoogleMap, DrawingManager, Polygon, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "55vh",
  borderRadius: "16px",
};

export const MapView = ({
  clients,
  zones,
  selectedZone,
  drawingMode,
  selectedClient,
  setSelectedClient,
  setSelectedZone,
  onLoad,
  handlePolygonComplete,
}) => {
  // Cargar AdvancedMarkerElement dinámicamente
  useEffect(() => {
    const loadAdvancedMarkers = async () => {
      if (!window.google?.maps) return;
      await google.maps.importLibrary("marker");
    };
    loadAdvancedMarkers();
  }, []);

  const handleMapLoad = async (map) => {
    onLoad(map);

    // Cargamos la librería de marcadores avanzados
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Crear marcadores avanzados manualmente
    clients.forEach((client) => {
      if (client.lat && client.lng) {
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: client.lat, lng: client.lng },
          title: client.name,
        });

        // Evento de click
        marker.addListener("click", () => {
          setSelectedClient(client);
        });
      }
    });
  };

  return (
    <GoogleMap
      onLoad={handleMapLoad}
      mapContainerStyle={containerStyle}
      options={{
        disableDefaultUI: true,
        mapTypeId: "roadmap",
        clickableIcons: false,
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID", // ← necesario
      }}
    >
      {/* InfoWindow cliente */}
      {selectedClient && (
        <InfoWindow
          position={{ lat: selectedClient.lat, lng: selectedClient.lng }}
          onCloseClick={() => setSelectedClient(null)}
        >
          <div className="text-sm space-y-1">
            <p className="font-semibold">{selectedClient.name}</p>
          </div>
        </InfoWindow>
      )}

      {/* Modo dibujo */}
      {drawingMode && (
        <DrawingManager
          onPolygonComplete={handlePolygonComplete}
          options={{
            drawingMode: "polygon",
            drawingControl: false,
            polygonOptions: {
              fillColor: "#3b82f6",
              fillOpacity: 0.25,
              strokeColor: "#1e40af",
              strokeWeight: 2,
              editable: true,
            },
          }}
        />
      )}

      {/* Polígonos (zonas) */}
      {zones.map((zone) => (
        <Polygon
          key={zone.id}
          path={zone.path}
          options={{
            fillColor: selectedZone?.id === zone.id ? zone.color : `${zone.color}80`,
            fillOpacity: 0.35,
            strokeColor: zone.color,
            strokeWeight: 2,
          }}
          onClick={() => setSelectedZone(zone)}
        />
      ))}
    </GoogleMap>
  );
};
