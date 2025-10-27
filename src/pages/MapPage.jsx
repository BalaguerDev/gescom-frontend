"use client";

import { useRef, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  Polygon,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useClients } from "@/hooks/useClients";
import {
  Loader2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Trash2,
} from "lucide-react";
import { useZonesStore } from "../store/useZoneStore";

const containerStyle = {
  width: "100%",
  height: "55vh",
  borderRadius: "16px",
};

export default function ZonesMap() {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error } = useClients(getAccessTokenSilently);
  const mapRef = useRef(null);

  const [drawingMode, setDrawingMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // --- Modal creación de zona ---
  const [newZonePath, setNewZonePath] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [zoneColor, setZoneColor] = useState("#3b82f6");

  const {
    zones,
    selectedZone,
    addZone,
    deleteZone,
    setSelectedZone,
  } = useZonesStore();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["drawing", "geometry"],
  });

  // --- MAPA ---
  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (clients.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        clients.forEach((c) => {
          if (c.lat && c.lng) bounds.extend({ lat: c.lat, lng: c.lng });
        });
        map.fitBounds(bounds);
      }
    },
    [clients]
  );

  const getClientsInPolygon = (path) => {
    if (!window.google?.maps?.geometry?.poly?.containsLocation) return [];
    const polygon = new window.google.maps.Polygon({ paths: path });
    return clients.filter((c) => {
      if (!c.lat || !c.lng) return false;
      const point = new window.google.maps.LatLng(c.lat, c.lng);
      return window.google.maps.geometry.poly.containsLocation(point, polygon);
    });
  };

  // --- FACTURACIÓN ---
  const mesActual = new Date().getMonth() + 1;

  const calcularFacturacionActual = (client) => {
    if (!client?.revenueCurrentYear) return 0;
    return client.revenueCurrentYear
      .filter((m) => m.month <= mesActual)
      .reduce((acc, m) => acc + m.total, 0);
  };

  const calcularFacturacionAnterior = (client) => {
    if (!client?.revenueLastYear) return 0;
    return client.revenueLastYear
      .filter((m) => m.month <= mesActual)
      .reduce((acc, m) => acc + m.total, 0);
  };

  const calcularCrecimiento = (client) => {
    const actual = calcularFacturacionActual(client);
    const anterior = calcularFacturacionAnterior(client);
    if (anterior === 0) return null;
    return ((actual - anterior) / anterior) * 100;
  };

  const calcularFacturacionZona = (clientsInZone) =>
    clientsInZone.reduce((total, c) => total + calcularFacturacionActual(c), 0);

  // --- CREAR ZONA ---
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
    const clientsInside = getClientsInPolygon(newZonePath);
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

  const handleDeleteZone = () => {
    if (!selectedZone) return;
    const confirmDelete = window.confirm(
      `¿Eliminar la zona "${selectedZone.name}"?`
    );
    if (confirmDelete) {
      deleteZone(selectedZone.id);
      setSelectedZone(null);
    }
  };

  // --- UI ---
  if (!isLoaded || loading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-blue-600" size={28} />
      </div>
    );

  if (error)
    return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-6 relative">
      <h2 className="text-xl font-semibold text-gray-800">
        🗺️ Zonas de clientes
      </h2>

      {/* MAPA */}
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        options={{
          disableDefaultUI: true,
          mapTypeId: "roadmap",
          clickableIcons: false,
        }}
      >
        {clients.map((client) => (
          <Marker
            key={client.id}
            position={{ lat: client.lat, lng: client.lng }}
            onClick={() => setSelectedClient(client)}
          />
        ))}

        {selectedClient && (
          <InfoWindow
            position={{
              lat: selectedClient.lat,
              lng: selectedClient.lng,
            }}
            onCloseClick={() => setSelectedClient(null)}
          >
            <div className="text-sm space-y-1">
              <p className="font-semibold">{selectedClient.name}</p>
              <p className="text-gray-700">
                2025:{" "}
                {calcularFacturacionActual(selectedClient).toLocaleString(
                  "es-ES"
                )}{" "}
                €
              </p>
              <p className="text-gray-400">
                2024:{" "}
                {calcularFacturacionAnterior(selectedClient).toLocaleString(
                  "es-ES"
                )}{" "}
                €
              </p>
            </div>
          </InfoWindow>
        )}

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

        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            path={zone.path}
            options={{
              fillColor:
                selectedZone?.id === zone.id ? zone.color : `${zone.color}80`,
              fillOpacity: 0.35,
              strokeColor: zone.color,
              strokeWeight: 2,
            }}
            onClick={() => setSelectedZone(zone)}
          />
        ))}
      </GoogleMap>

      {/* PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ZONAS */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Zonas creadas
            </h3>
            <button
              onClick={() => setDrawingMode(!drawingMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${drawingMode
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
            >
              <Plus className="w-4 h-4" />
              {drawingMode ? "Cancelar" : "Crear zona"}
            </button>
          </div>

          {zones.length === 0 ? (
            <p className="text-sm text-gray-500">
              No hay zonas creadas todavía.
            </p>
          ) : (
            <ul className="space-y-3">
              {zones.map((zone) => (
                <li
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`border rounded-lg p-3 cursor-pointer transition ${selectedZone?.id === zone.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-800">
                        {zone.name}
                      </span>
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: zone.color }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      💶{" "}
                      {calcularFacturacionZona(zone.clients).toLocaleString(
                        "es-ES"
                      )}{" "}
                      €
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CLIENTES */}
        {/* CLIENTES */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-4 mb-15 md:mb-0">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Clientes en la zona
            </h3>

            {selectedZone && (
              <div
                onClick={() => {
                  if (confirm(`¿Seguro que deseas eliminar la zona "${selectedZone.name}"?`)) {
                    deleteZone(selectedZone.id);
                    setSelectedZone(null);
                  }
                }}
                className="flex items-center gap-1 text-red-600 cursor-pointer hover:text-red-700 transition"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-xs font-medium">Eliminar zona</span>
              </div>
            )}
          </div>

          {!selectedZone ? (
            <p className="text-sm text-gray-500">
              Selecciona una zona para ver sus clientes.
            </p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {selectedZone.clients.map((client) => {
                const facturacion2025 = calcularFacturacionActual(client);
                const facturacion2024 = calcularFacturacionAnterior(client);
                const growth = calcularCrecimiento(client);
                const isUp = growth >= 0;

                return (
                  <li
                    key={client.id}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-800 truncate">
                        {client.name}
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {facturacion2025.toLocaleString("es-ES")} €
                      </p>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <p>
                        2024 mismo periodo:{" "}
                        {facturacion2024.toLocaleString("es-ES")} €
                      </p>
                      {growth !== null && (
                        <span
                          className={`flex items-center gap-1 ${isUp ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          {isUp ? (
                            <ArrowUpRight size={12} />
                          ) : (
                            <ArrowDownRight size={12} />
                          )}
                          {growth.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* MODAL NUEVA ZONA */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Nueva zona
            </h3>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la zona
            </label>
            <input
              type="text"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej. Zona Norte"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color de la zona
            </label>
            <input
              type="color"
              value={zoneColor}
              onChange={(e) => setZoneColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer mb-6"
            />

            <button
              onClick={handleConfirmNewZone}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Guardar zona
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
