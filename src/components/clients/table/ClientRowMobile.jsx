import { MoreVertical, ChevronDown } from "lucide-react";
import { formatters } from "@/utils/formatters";

const ClientRowMobile = ({ client, onSelect }) => {
  const { name, displayActual, displayAnterior, displayCrecimiento } = client;

  return (
    <div className="flex justify-between items-center px-3 py-3 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center flex-1 pr-2">
        <ChevronDown size={16} className="text-gray-500 mr-1" />
        <p className="text-[13px] font-medium text-gray-800 truncate">
          {formatters.truncate(name, 18)}
        </p>
      </div>

      <div className="flex flex-col flex-1 text-right pr-2">
        <p className="text-[13px] font-semibold text-gray-800 leading-tight">
          {formatters.currency(displayActual)}
        </p>
        <p className="text-[10px] text-gray-400 leading-tight">
          {formatters.currency(displayAnterior)}
        </p>
        <p
          className={`text-[11px] mt-[2px] font-semibold ${formatters.growthColor(
            displayCrecimiento
          )}`}
        >
          {displayCrecimiento?.toFixed(2)}%
        </p>
      </div>

      <button
        onClick={() => onSelect(client)}
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 flex justify-center items-center"
      >
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

export default ClientRowMobile;
