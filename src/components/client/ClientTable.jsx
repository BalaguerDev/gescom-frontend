import { formatCurrency, getGrowthColor } from "../../utils/formatters";

const ClientTable = ({ clients, onRowClick }) => {
    return (
        <div className="hidden sm:block overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Empresa</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Ventas Last Year</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Ventas Actual</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">% Crecimiento</th>
                    </tr>
                </thead>
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
                                <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(totalLast)}</td>
                                <td className="px-4 py-3 text-right text-gray-800 font-medium">{formatCurrency(totalCurrent)}</td>
                                <td className={`px-4 py-3 text-right font-semibold ${getGrowthColor(growth)}`}>
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
