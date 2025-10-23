// src/components/clients/table/ClientDetailRow.jsx
import { formatters } from "@/utils/formatters";
import { TrendingUp, TrendingDown } from "lucide-react";

const DETAIL_FIELDS = [
  { label: "Máquinas", key: "maquinas" },
  { label: "Herramienta mano", key: "herramienta" },
  { label: "Accesorios", key: "accesorios" },
];

const findMonthData = (arr, monthIndexCandidate) => {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const byMonthProp = arr.find((m) => {
    const mm = typeof m.month === "string" ? Number(m.month) : m.month;
    return mm === monthIndexCandidate;
  });
  return byMonthProp || arr[monthIndexCandidate] || null;
};

const ClientDetailRow = ({ client, vista, mesActual }) => {
  const mesCandidate =
    typeof mesActual === "number" ? mesActual : new Date().getMonth() + 1;

  let familiasCurrent = {};
  let familiasLast = {};

  if (vista === "anual") {
    for (const m of client.revenueCurrentYear || []) {
      const families = m?.families || {};
      for (const k of Object.keys(families)) {
        familiasCurrent[k] = (familiasCurrent[k] || 0) + Number(families[k] || 0);
      }
    }
    for (const m of client.revenueLastYear || []) {
      const families = m?.families || {};
      for (const k of Object.keys(families)) {
        familiasLast[k] = (familiasLast[k] || 0) + Number(families[k] || 0);
      }
    }
  } else {
    const mesActualData = findMonthData(client?.revenueCurrentYear ?? [], mesCandidate);
    const mesLastData = findMonthData(client?.revenueLastYear ?? [], mesCandidate);

    familiasCurrent = mesActualData?.families ?? {};
    familiasLast = mesLastData?.families ?? {};
  }

  return (
    <>
      {DETAIL_FIELDS.map(({ label, key }) => {
        const actual = Number(familiasCurrent?.[key] || 0);
        const anterior = Number(familiasLast?.[key] || 0);
        const crecimiento =
          anterior > 0 ? ((actual - anterior) / anterior) * 100 : 0;
        const positivo = crecimiento > 0;
        const color =
          crecimiento === 0
            ? "text-gray-400"
            : positivo
            ? "text-green-600"
            : "text-red-500";

        return (
          <tr key={key} className="bg-gray-50 border-t border-gray-100">
            {/* Familia */}
            <td className="px-8 py-2 text-gray-700 font-medium text-[12px]">
              {label}
            </td>

            {/* Total anterior */}
            <td className="px-4 py-2 text-right text-gray-500 whitespace-nowrap text-[12px]">
              {formatters.currency(anterior)}
            </td>

            {/* Total actual */}
            <td className="px-4 py-2 text-right text-gray-800 font-semibold whitespace-nowrap text-[12px]">
              {formatters.currency(actual)}
            </td>

            {/* % crecimiento */}
            <td className="px-4 py-2 text-right text-xs font-semibold  text-[10px]">
              <div className={`flex items-center justify-end gap-2 ${color}`}>
                {crecimiento > 0 ? (
                  <TrendingUp size={12} />
                ) : crecimiento < 0 ? (
                  <TrendingDown size={12} />
                ) : null}
                <span>
                  {crecimiento === 0
                    ? "0.0%"
                    : `${Math.abs(crecimiento).toFixed(1)}%`}
                </span>
              </div>
            </td>

            {/* Celda vacía para alinear con acciones */}
            <td className="px-4 py-2" />
          </tr>
        );
      })}
    </>
  );
};

export default ClientDetailRow;
