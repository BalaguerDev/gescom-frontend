// src/features/zones/components/MapView.jsx
"use client";

import { GoogleMap, DrawingManager, Marker, Polygon, InfoWindow } from "@react-google-maps/api";

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
  return (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={containerStyle}
      options={{
        disableDefaultUI: true,
        mapTypeId: "roadmap",
        clickableIcons: false,
      }}
    >
      {/* Marcadores de clientes */}
      {clients.map(
        (client) =>
          client.lat &&
          client.lng && (
            <Marker
              key={client.id}
              position={{ lat: client.lat, lng: client.lng }}
              onClick={() => setSelectedClient(client)}
            />
          )
      )}

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
