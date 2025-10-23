import { useState } from "react";
import { TrendingUp, TrendingDown, MoreVertical, FileText } from "lucide-react";
import { formatters } from "@/utils/formatters";

const DETAIL_FIELDS = [
    { label: "Accesorios", key: "accesorios" },
    { label: "Máquinas", key: "maquinas" },
    { label: "Herramienta mano", key: "herramienta" },
];

const ClientTableMobile = ({
    clients = [],
    onSelect,
    headerAnterior,
    headerActual,
    vista,
}) => {
    const [expandedClient, setExpandedClient] = useState(null);

    const toggleExpanded = (id) => {
        setExpandedClient((prev) => (prev === id ? null : id));
    };

    if (!clients.length) {
        return (
            <div className="sm:hidden mt-4 p-4 text-center text-gray-500 text-sm border border-gray-100 rounded-lg">
                No hay clientes disponibles
            </div>
        );
    }

    return (
        <div className="sm:hidden mt-4 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {/* === CABECERA === */}
            <div className="grid grid-cols-[1.5fr_2fr_0.5fr] bg-gray-100 text-[12px] font-semibold text-gray-700 border-b border-gray-200">
                <div className="px-3 py-2 flex items-center">Empresa</div>
                <div className="px-3 py-2 flex flex-col text-right leading-tight">
                    <span className="text-gray-800 text-[12px] font-semibold">
                        {headerActual}
                    </span>
                    <span className="text-gray-500 text-[11px]">{headerAnterior}</span>
                    <span className="text-gray-500 text-[11px] flex items-center justify-end gap-1">

                    </span>                </div>
                <div className="px-3 py-2 flex items-center justify-end">
                    <FileText size={16} className="text-gray-500" />
                </div>
            </div>

            {/* === FILAS === */}
            {clients.map((client) => {
                const isOpen = expandedClient === client.id;
                const mesCandidate = new Date().getMonth() + 1;

                // Familias
                let familiasCurrent = {};
                let familiasLast = {};

                if (vista === "anual") {
                    for (const m of client.revenueCurrentYear || []) {
                        const families = m?.families || {};
                        for (const k of Object.keys(families)) {
                            familiasCurrent[k] =
                                (familiasCurrent[k] || 0) + Number(families[k] || 0);
                        }
                    }
                    for (const m of client.revenueLastYear || []) {
                        const families = m?.families || {};
                        for (const k of Object.keys(families)) {
                            familiasLast[k] =
                                (familiasLast[k] || 0) + Number(families[k] || 0);
                        }
                    }
                } else {
                    const findMonthData = (arr, monthIndexCandidate) => {
                        if (!Array.isArray(arr) || arr.length === 0) return null;
                        const byMonthProp = arr.find((m) => {
                            if (!m) return false;
                            const mm =
                                typeof m.month === "string" ? Number(m.month) : m.month;
                            return mm === monthIndexCandidate;
                        });
                        return byMonthProp || null;
                    };

                    const mesActualData = findMonthData(
                        client?.revenueCurrentYear ?? [],
                        mesCandidate
                    );
                    const mesLastData = findMonthData(
                        client?.revenueLastYear ?? [],
                        mesCandidate
                    );
                    familiasCurrent = mesActualData?.families ?? {};
                    familiasLast = mesLastData?.families ?? {};
                }

                // Totales
                const totalActual =
                    client.totalCurrentYear ??
                    client.revenueCurrentYear?.reduce(
                        (sum, m) => sum + (m.total || 0),
                        0
                    ) ??
                    0;
                const totalAnterior =
                    client.totalLastYear ??
                    client.revenueLastYear?.reduce(
                        (sum, m) => sum + (m.total || 0),
                        0
                    ) ??
                    0;
                const crecimiento =
                    totalAnterior > 0
                        ? ((totalActual - totalAnterior) / totalAnterior) * 100
                        : 0;
                const positivo = crecimiento > 0;
                const colorCrec =
                    crecimiento > 0
                        ? "text-green-600"
                        : crecimiento < 0
                            ? "text-red-500"
                            : "text-gray-400";

                return (
                    <div key={client.id}>
                        <div
                            onClick={() => toggleExpanded(client.id)}
                            className="grid grid-cols-[1.5fr_2fr_0.5fr] text-[13px] border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition"
                        >
                            {/* Nombre truncado */}
                            <div className="px-3 py-2 text-gray-900 font-medium flex items-center">
                                <span className="truncate max-w-[140px]">{client.name}</span>
                            </div>

                            {/* Facturación */}
                            <div className="px-3 py-2 text-right leading-tight">
                                <div className="text-[12px] font-semibold text-gray-900">
                                    {formatters.currency(totalActual)}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                    {formatters.currency(totalAnterior)}
                                </div>
                                <div className={`flex items-center justify-end gap-1 text-[10px] ${colorCrec}`}>
                                    {crecimiento >= 0 ? (
                                        <TrendingUp size={11} className={`${colorCrec}`} />
                                    ) : (
                                        <TrendingDown size={11} className={`${colorCrec}`} />
                                    )}
                                    <span>{Math.abs(crecimiento).toFixed(1)}%</span>
                                </div>
                            </div>

                            {/* Botón de acciones */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect?.(client);
                                }}
                                className="flex items-center justify-end px-3"
                            >
                                <MoreVertical size={16} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Detalle (accordion) */}
                        {isOpen && (
                            <div className="bg-blue-50 px-3 py-3 text-sm text-gray-700 border-t border-blue-100">
                                <div className="grid grid-cols-[1.5fr_2fr_2fr] text-[12px] font-semibold text-gray-800 border-b border-blue-100 pb-1 mb-2">
                                    <span>Familia</span>
                                    <span className="text-right">{headerAnterior}</span>
                                    <span className="text-right">{headerActual}</span>
                                </div>

                                {DETAIL_FIELDS.map(({ label, key }) => {
                                    const actual = Number(familiasCurrent?.[key] || 0);
                                    const anterior = Number(familiasLast?.[key] || 0);
                                    const crecimientoFam =
                                        anterior > 0 ? ((actual - anterior) / anterior) * 100 : 0;
                                    const color = crecimientoFam > 0
                                        ? "text-green-600"
                                        : crecimientoFam < 0
                                            ? "text-red-500"
                                            : "text-gray-400";
                                    const arrow = crecimientoFam > 0
                                        ? "▲"
                                        : crecimientoFam < 0
                                            ? "▼"
                                            : "●";

                                    return (
                                        <div
                                            key={key}
                                            className="grid grid-cols-[1.5fr_2fr_2fr] py-1 border-b border-blue-100 last:border-none"
                                        >
                                            <span className="truncate text-[12px] text-gray-700">
                                                {label}
                                            </span>

                                            <span className="text-right text-[11px] text-gray-500">
                                                {formatters.currency(anterior)}
                                            </span>

                                            <div className="flex flex-col items-end leading-tight">
                                                <span className="text-[12px] font-semibold text-gray-800">
                                                    {formatters.currency(actual)}
                                                </span>

                                                <div className={`flex items-center justify-end gap-1 text-[10px] ${color}`}>
                                                    {crecimientoFam >= 0 ? (
                                                        <TrendingUp size={11} className={`${color}`} />
                                                    ) : (
                                                        <TrendingDown size={11} className={`${color}`} />
                                                    )}
                                                    <span>{Math.abs(crecimientoFam).toFixed(1)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ClientTableMobile;
