import { Trophy } from "lucide-react";
import { formatters } from "@/utils/formatters";

export default function FacturacionAnual({ anualFacturacion, objetivoAnual }) {
  const total = anualFacturacion?.total || 0;
  const progreso = (total / objetivoAnual) * 100;
  const diff = ((total / objetivoAnual - 1) * 100).toFixed(1);

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Facturación anual
      </h2>

      <div className="rounded-xl p-6 bg-white border shadow-sm">
        <p className="text-lg font-semibold text-gray-900">
          {formatters.currency(total)}{" "}
          <span className="text-gray-500 text-sm">
            / {formatters.currency(objetivoAnual)}
          </span>
        </p>

        <p
          className={`text-sm mt-2 flex items-center gap-2 font-semibold ${
            progreso >= 100 ? "text-green-700" : "text-orange-600"
          }`}
        >
          <Trophy className="w-4 h-4" />
          {progreso >= 100
            ? `+${diff}% ¡Objetivo superado!`
            : `${progreso.toFixed(1)}% del objetivo`}
        </p>
      </div>
    </section>
  );
}
