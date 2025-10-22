import { formatCurrency, getGrowthColor } from "@/utils/formatters";

const ClientTable = ({ clients, onRowClick }) => {
  return (
    <div className="hidden sm:block overflow-y-auto max-h-[90vh] mt-4 border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 relative">
        {/* 🔹 Encabezado fijo */}
        <thead className="bg-white sticky top-0 z-20 shadow-sm">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">
              Empresa
            </th>
            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 tracking-wide">
              Ventas Año Anterior
            </th>
            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 tracking-wide">
              Ventas Actual
            </th>
            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 tracking-wide">
              % Crecimiento
            </th>
          </tr>
        </thead>

        {/* 🔹 Cuerpo scrollable */}
        <tbody className="bg-white divide-y divide-gray-100">
          {clients.map((c) => {
            const totalLast = c.revenueLastYear.reduce((a, b) => a + b, 0);
            const totalCurrent = c.revenueCurrentYear.reduce((a, b) => a + b, 0);
            const growth = totalLast ? ((totalCurrent - totalLast) / totalLast) * 100 : 0;

            return (
              <tr
                key={c.id}
                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => onRowClick(c)}
              >
                <td className="px-4 py-3 text-gray-800">{c.name}</td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {formatCurrency(totalLast)}
                </td>
                <td className="px-4 py-3 text-right text-gray-800 font-medium">
                  {formatCurrency(totalCurrent)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-semibold ${getGrowthColor(
                    growth
                  )}`}
                >
                  {growth.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
