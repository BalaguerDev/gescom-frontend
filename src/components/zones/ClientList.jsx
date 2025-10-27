// src/features/zones/components/ClientsList.jsx
"use client";

import { ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import {
  calcularFacturacionActual,
  calcularFacturacionAnterior,
  calcularCrecimiento,
} from "../../utils/revenueCalculations";

export const ClientList = ({ selectedZone, deleteZone, setSelectedZone }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow p-4 mb-15 md:mb-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Clientes en la zona</h3>

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
        <p className="text-sm text-gray-500">Selecciona una zona para ver sus clientes.</p>
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
                  <p className="font-medium text-gray-800 truncate">{client.name}</p>
                  <p className="text-gray-900 font-semibold">
                    {facturacion2025.toLocaleString("es-ES")} €
                  </p>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <p>
                    2024 mismo periodo: {facturacion2024.toLocaleString("es-ES")} €
                  </p>
                  {growth !== null && (
                    <span
                      className={`flex items-center gap-1 ${
                        isUp ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
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
  );
};
