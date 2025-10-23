import { formatters } from "@/utils/formatters";
import { TrendingUp, TrendingDown } from "lucide-react";

const DETAIL_FIELDS = [
    { label: "Accesorios", key: "accesorios" },
    { label: "Máquinas", key: "maquinas" },
    { label: "Herramienta mano", key: "herramienta" },
];

// ✅ Suma segura
const safeSum = (arr, key = "total") =>
    Array.isArray(arr)
        ? arr.reduce((s, x) => s + (typeof x === "number" ? x : (x?.[key] || 0)), 0)
        : 0;

// ✅ Buscar datos por mes
const findMonthData = (arr, monthIndexCandidate) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;

    const byMonthProp = arr.find((m) => {
        if (!m) return false;
        const mm = typeof m.month === "string" ? Number(m.month) : m.month;
        return mm === monthIndexCandidate;
    });
    if (byMonthProp) return byMonthProp;

    const idx = monthIndexCandidate;
    if (arr[idx]) return arr[idx];

    if (typeof arr[0] === "number") {
        return { total: arr[idx] ?? 0, families: {} };
    }

    return null;
};

const ClientDetailRow = ({ client, headerAnterior, headerActual, vista, mesActual }) => {
    const mesCandidate =
        typeof mesActual === "number"
            ? mesActual
            : new Date().getMonth() + 1;

    let familiasCurrent = {};
    let familiasLast = {};

    if (vista === "anual") {
        familiasCurrent = {};
        familiasLast = {};

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
        <tr>
            <td
                colSpan={5}
                className="bg-gray-50 px-6 py-4 text-sm text-gray-700 transition-colors duration-200"
            >
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="px-3 py-2 w-32"></th>
                            {DETAIL_FIELDS.map(({ label }) => (
                                <th
                                    key={label}
                                    className="px-3 py-2 text-gray-800 font-semibold text-center"
                                >
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Año actual */}
                        <tr className="bg-white">
                            <td className="px-3 py-2 font-semibold text-gray-800">
                                {headerActual}
                            </td>
                            {DETAIL_FIELDS.map(({ key }) => {
                                const actual = Number(familiasCurrent?.[key] || 0);
                                const anterior = Number(familiasLast?.[key] || 0);
                                const crecimiento =
                                    anterior > 0 ? ((actual - anterior) / anterior) * 100 : 0;
                                const positivo = crecimiento > 0;
                                const color =
                                    positivo
                                        ? "text-green-600"
                                        : crecimiento < 0
                                        ? "text-red-500"
                                        : "text-gray-400";

                                return (
                                    <td key={key} className="px-3 py-2 text-center align-top">
                                        <div className="flex flex-col items-center leading-tight">
                                            <span className="font-semibold text-gray-800">
                                                {formatters.currency(actual)}
                                            </span>
                                            <div className={`flex items-center justify-center gap-1 text-xs ${color}`}>
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
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>

                        {/* Año anterior */}
                        <tr className="bg-white">
                            <td className="px-3 py-2 text-gray-500 font-medium">
                                {headerAnterior}
                            </td>
                            {DETAIL_FIELDS.map(({ key }) => {
                                const anterior = Number(familiasLast?.[key] || 0);
                                return (
                                    <td key={key} className="px-3 py-2 text-center">
                                        <span className="text-gray-500">
                                            {formatters.currency(anterior)}
                                        </span>
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

export default ClientDetailRow;
