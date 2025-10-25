import { TrendingUp } from "lucide-react";
import { formatters } from "@/utils/formatters";

export default function BillingHeader({
  mesActual,
  añoActual,
  diasRestantes,
  fechaActual,
  totalMes,
  objetivoMes,
  progresoMes,
}) {
  const colorTexto =
    progresoMes >= 100
      ? "text-green-600"
      : progresoMes >= 75
      ? "text-orange-500"
      : "text-red-600";

  return (
    <header
      className="rounded-2xl bg-white md:bg-transparent shadow-sm md:shadow-none 
                 border border-gray-100 md:border-0 p-4 md:p-0 
                 flex flex-col md:flex-row md:items-center md:justify-between transition-all"
    >
      {/* IZQUIERDA */}
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug">
          Facturación actual{" "}
          <span className="capitalize">{formatters.monthName(mesActual)}</span>{" "}
          {añoActual}
        </h2>

        <p className="text-xs sm:text-sm text-gray-600">
          Faltan{" "}
          <span className="font-medium text-gray-800">{diasRestantes}</span> días ·{" "}
          <span className="text-gray-500">
            Última actualización:{" "}
            {fechaActual.toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      </div>

      {/* DERECHA */}
      <div className="mt-4 md:mt-0 text-left sm:text-right space-y-1">
        <p className="text-base sm:text-lg font-semibold text-gray-800">
          Facturado:{" "}
          <span className="font-bold text-gray-900">
            {formatters.currency(totalMes)}
          </span>
          <span></span>
        </p>

        <p className="text-xs sm:text-sm text-gray-600">
          Objetivo: {formatters.currency(objetivoMes)}
        </p>

        <div
          className={`mt-1 flex items-center sm:justify-end gap-1 sm:gap-2 text-sm font-semibold ${colorTexto}`}
        >
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{progresoMes.toFixed(1)}%</span>
          <span className="hidden sm:inline text-gray-600 font-medium">
            del objetivo
          </span>
        </div>
      </div>
    </header>
  );
}
