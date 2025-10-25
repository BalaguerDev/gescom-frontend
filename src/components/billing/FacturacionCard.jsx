import React from "react";
import { Trophy } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatters } from "@/utils/formatters";

/**
 * Props:
 * - nombre: string
 * - facturado: number
 * - objetivo: number
 * - diasRestantes: number
 */
export default function FacturacionCard({ nombre, facturado = 0, objetivo = 1, diasRestantes = 1 }) {
  const progreso = objetivo > 0 ? (facturado / objetivo) * 100 : 0;
  const alcanzado = progreso >= 100;
  const restante = Math.max(objetivo - facturado, 0);
  const promedioDiario = diasRestantes > 0 ? restante / diasRestantes : restante;
  // color base para el texto del porcentaje
  const color =
    progreso < 50 ? "red" : progreso < 100 ? "yellow" : "green";

  return (
    <div
      className={`rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-500 ${
        alcanzado ? "bg-green-50 border-green-300" : "bg-white border-gray-200"
      }`}
    >
      {/* Título y % */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-medium text-gray-800">{nombre}</h3>
        <span className={`text-xs font-semibold text-${color}-600`}>
          {Number.isFinite(progreso) ? progreso.toFixed(1) : "0.0"}%
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="mt-1">
        <ProgressBar progreso={Math.min(Math.max(progreso, 0), 100)} alcanzado={alcanzado} />
      </div>

      {/* Valores facturado / objetivo */}
      <div className="mt-3 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>{formatters.currency(facturado)}</span>
          <span className="text-gray-400">/ {formatters.currency(objetivo)}</span>
        </div>
      </div>

      {/* Texto de estado */}
      <div className="mt-3 text-xs text-center">
        {alcanzado ? (
          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold text-xs">
            <span className="text-green-700">
              +{((facturado / objetivo) * 100 - 100).toFixed(1)}%
            </span>
            <Trophy className="w-4 h-4 text-green-600" />
            ¡Buen trabajo!
          </div>
        ) : (
          <div className="text-xs text-gray-600">
            Necesitas{" "}
            <b className="text-gray-800">{formatters.currency(promedioDiario)}</b>{" "}
            / día
          </div>
        )}
      </div>
    </div>
  );
}
