import { formatCurrency, getGrowthColor, formatMonthName } from "@/utils/formatters";

const ClientTable = ({ clients, onRowClick, vista, mesActual, añoActual }) => {
  // 🔹 Determinar encabezados dinámicos
  let headerAnterior, headerActual;

  if (vista === "anual") {
    headerAnterior = "Ventas Año Anterior";
    headerActual = "Ventas Actual";
  } else {
    const mesNombre = formatMonthName(mesActual); // Ej: "Octubre"
    headerAnterior = `${mesNombre} ${añoActual - 1}`;
    headerActual = `${mesNombre} ${añoActual}`;
  }

  return (
    <div className="hidden sm:block overflow-y-auto max-h-[90vh] mt-4 border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 relative">
        <thead className="bg-white sticky top-0 z-20 shadow-sm">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">Empresa</th>
            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 tracking-wide">
              {headerAnterior}
            </th>
            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 tracking-wide">
              {headerActual}
            </th>
            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 tracking-wide">% Crecimiento</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {clients.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              onClick={() => onRowClick(c)}
            >
              <td className="px-4 py-3 text-gray-800">{c.name}</td>
              <td className="px-4 py-3 text-right text-gray-600">
                {formatCurrency(c.displayAnterior)}
              </td>
              <td className="px-4 py-3 text-right text-gray-800 font-medium">
                {formatCurrency(c.displayActual)}
              </td>
              <td className={`px-4 py-3 text-right font-semibold ${getGrowthColor(c.displayCrecimiento)}`}>
                {c.displayCrecimiento.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
