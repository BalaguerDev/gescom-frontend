import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
import { formatters } from "@/utils/formatters";
import ClientDetailRow from "./ClientDetailRow";

const ClientTableRow = ({
    client,
    openRow,
    setOpenRow,
    onSelect,
    headerAnterior,
    headerActual,
    vista,
}) => {
    const isOpen = openRow === client.id;
    const toggleOpen = () => setOpenRow(isOpen ? null : client.id);
    const color = formatters.growthColor(client.displayCrecimiento);

    return (
        <tbody className="bg-white divide-y divide-gray-100">
            <tr
                onClick={toggleOpen}
                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            >
                <td className="px-4 py-3 text-gray-800 font-medium flex items-center gap-1">
                    {isOpen ? (
                        <ChevronUp size={16} className="text-gray-500" />
                    ) : (
                        <ChevronDown size={16} className="text-gray-500" />
                    )}
                    {/* Badge de segmento */}
                    {client.type && (
                        <span
                            className={`text-[10px] font-bold px-2 py-1 rounded- ${client.type === "A"
                                    ? "bg-green-100 text-green-700"
                                    : client.type === "B"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                        >
                            {client.type}
                        </span>
                    )}
                    {client.name}
                </td>


                <td className="px-4 py-3 text-right text-gray-600">
                    {formatters.currency(client.displayAnterior)}
                </td>
                <td className="px-4 py-3 text-right text-gray-800 font-semibold">
                    {formatters.currency(client.displayActual)}
                </td>
                <td className={`px-4 py-3 text-right text-[12px] font-semibold ${color}`}>
                    {client.displayCrecimiento?.toFixed(2)}%
                </td>

                <td className="px-4 py-3 text-right">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(client);
                        }}
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 flex justify-center items-center cursor-pointer"
                    >
                        <MoreVertical size={18} />
                    </button>
                </td>
            </tr>

            {isOpen && (
                <ClientDetailRow
                    client={client}
                    vista={vista}
                    mesActual={new Date().getMonth() + 1}
                    headerActual={headerActual}
                    headerAnterior={headerAnterior}

                />
            )}
        </tbody>
    );
};

export default ClientTableRow;
