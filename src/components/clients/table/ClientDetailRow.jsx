import { formatters } from "@/utils/formatters";

const DETAIL_FIELDS = [
  { label: "Accesorios", key: "accesorios" },
  { label: "Máquinas", key: "maquinas" },
  { label: "Herramienta mano", key: "herramienta" },
];

const ClientDetailRow = ({ client, headerAnterior, headerActual }) => (
  <tr>
    <td colSpan={5} className="bg-gray-50 px-6 py-4 text-sm text-gray-700">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-3 py-2"></th>
            {DETAIL_FIELDS.map(({ label }) => (
              <th key={label} className="px-3 py-2 text-gray-800 font-semibold">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Fila del año actual */}
          <tr className="bg-white">
            <td className="px-3 py-2 text-gray-800 font-semibold">{headerActual}</td>
            {DETAIL_FIELDS.map(({ key }) => {
              const data = client[key] || {};
              const color = formatters.growthColor(data.crecimiento);
              return (
                <td key={key} className="px-3 py-2 font-semibold">
                  {formatters.currency(data.actual || 0)}
                  <span className={`ml-2 text-[11px] ${color}`}>
                    {(data.crecimiento ?? 0).toFixed(2)}%
                  </span>
                </td>
              );
            })}
          </tr>

          {/* Fila del año anterior */}
          <tr className="bg-white">
            <td className="px-3 py-2 text-gray-500 font-medium">{headerAnterior}</td>
            {DETAIL_FIELDS.map(({ key }) => {
              const data = client[key] || {};
              return (
                <td key={key} className="px-3 py-2 text-gray-500">
                  {formatters.currency(data.anterior || 0)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);

export default ClientDetailRow;
