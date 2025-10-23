import { useState } from "react";
import { MoreVertical, FileText, ChevronDown } from "lucide-react";
import { formatters } from "@/utils/formatters";

const DETAIL_FIELDS = [
  { label: "Familia venta", key: "familiaVenta" },
  { label: "Accesorios", key: "accesorios" },
  { label: "Máquinas", key: "maquinas" },
  { label: "Herramienta mano", key: "herramienta" },
];

const ClientTableMobile = ({ clients = [], onSelect, headerAnterior, headerActual }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const isExpanded = (id) => expandedRows.includes(id);

  if (!clients.length) {
    return (
      <div className="sm:hidden mt-4 p-4 text-center text-gray-500 text-sm border border-gray-100 rounded-lg">
        No hay clientes disponibles
      </div>
    );
  }

  return (
    <div className="sm:hidden mt-4 border border-gray-200 rounded-lg overflow-hidden">
      {/* Encabezado */}
      <div className="grid grid-cols-5 items-center bg-gray-100 text-gray-700 text-xs font-medium py-2 px-3 sticky top-0 z-10">
        <div className="col-span-3 flex items-center">
          <span className="text-gray-700 font-semibold text-[11px] leading-tight text-center">Empresa</span>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-end gap-[2px] text-center">
          <span className="text-gray-700 font-semibold text-[11px] leading-tight">{headerActual}</span>
          <span className="text-gray-400 font-light text-[10px] leading-tight">{headerAnterior}</span>
          <span className="text-gray-400 font-light text-[9px] leading-tight">% Crecimiento</span>
        </div>
        <div className="col-span-1 flex justify-end">
          <FileText className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Filas */}
      <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
        {clients.map((client) => (
          <div key={client.id}>
            {/* Fila principal */}
            <div className="grid grid-cols-5 items-center px-3 py-3 hover:bg-gray-50 transition-colors duration-150">
              {/* Chevron al inicio + Empresa */}
              <div
                className="col-span-3 flex items-center cursor-pointer"
                onClick={() => toggleRow(client.id)}
              >
                <ChevronDown
                  size={16}
                  className={`mr-2 transition-transform duration-200 ${isExpanded(client.id) ? "rotate-180" : ""}`}
                />
                <p className="text-[12px] font-semibold text-gray-800 truncate text-center">
                  {client.name}
                </p>
              </div>

              {/* Totales */}
              <div className="col-span-1 flex flex-col justify-baseline items-end text-[12px] text-gray-600 gap-[2px] text-center">
                <span className="font-semibold text-gray-800">{formatters.currency(client.displayActual)}</span>
                <span className="text-gray-400 font-light text-[11px] leading-tight">{formatters.currency(client.displayAnterior)}</span>
                <span className={`text-[11px] font-medium ${formatters.growthColor(client.displayCrecimiento)}`}>
                  {client.displayCrecimiento?.toFixed(2)}%
                </span>
              </div>

              {/* Acciones */}
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => onSelect(client)}
                  className="flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
                  title="Acciones"
                >
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Accordion detalle tipo tabla */}
            {isExpanded(client.id) && (
              <div className="bg-gray-50 px-3 py-2 text-sm text-gray-600">
                <div className="grid grid-cols-[1.5fr_2fr_2fr_0.5fr] text-[12px] font-medium text-gray-700 border-b border-gray-200 pb-1 mb-1">
                  <span>Familia</span>
                  <span className="text-right">{headerAnterior}</span>
                  <span className="text-right">{headerActual}</span>
                  <span className="text-right text-[10px]">%</span>
                </div>

                {DETAIL_FIELDS.map(({ label, key }) => {
                  const data = client[key] || {};
                  const color = formatters.growthColor(data.crecimiento);
                  return (
                    <div key={key} className="grid grid-cols-[1.5fr_2fr_2fr_0.5fr] text-[12px] mb-1">
                      <span className="truncate">{label}</span>
                      <span className="text-right text-gray-500">{formatters.currency(data.anterior || 0)}</span>
                      <span className="text-right font-semibold text-gray-800">{formatters.currency(data.actual || 0)}</span>
                      <span className={`text-right text-[10px] font-medium ${color}`}>{(data.crecimiento ?? 0).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientTableMobile;
