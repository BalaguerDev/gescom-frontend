// src/features/zones/components/ZoneList.jsx
"use client";

import { Plus } from "lucide-react";
import { calcularFacturacionZona } from "../../utils/revenueCalculations";

export const ZoneList = ({
  zones,
  selectedZone,
  setSelectedZone,
  drawingMode,
  setDrawingMode,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Zonas creadas</h3>

        <button
          onClick={() => setDrawingMode(!drawingMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            drawingMode
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          <Plus className="w-4 h-4" />
          {drawingMode ? "Cancelar" : "Crear zona"}
        </button>
      </div>

      {zones.length === 0 ? (
        <p className="text-sm text-gray-500">No hay zonas creadas todavía.</p>
      ) : (
        <ul className="space-y-3">
          {zones.map((zone) => (
            <li
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`border rounded-lg p-3 cursor-pointer transition ${
                selectedZone?.id === zone.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-800">{zone.name}</span>
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: zone.color }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  💶 {calcularFacturacionZona(zone.clients).toLocaleString("es-ES")} €
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
