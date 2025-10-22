import { formatCurrency, getGrowthColor, formatMonthName, truncateText } from "@/utils/formatters";

const ClientListMobile = ({ clients, onSelect, vista, mesActual, añoActual }) => {
  const mesNombre = formatMonthName(mesActual); 
  const añoAnterior = añoActual - 1;

  const labelAnterior = vista === "anual" ? "Año anterior" : `${mesNombre} ${añoAnterior}`;
  const labelActual = vista === "anual" ? "Actual" : `${mesNombre} ${añoActual}`;

  return (
    <div className="sm:hidden mt-4 pb-15">
      <div className="overflow-y-auto max-h-[75vh] rounded-lg border border-gray-100">
        {/* Encabezado */}
        <div className="sticky top-0 bg-white z-20 shadow-sm">
          <div className="flex justify-center items-center px-3 py-3 border-b text-gray-700 text-[13px] font-bold tracking-wide">
            <div className="flex-1">Empresa</div>
            <div className="flex-1 text-right">
              <p>{labelActual}</p>
              <p className="text-[11px] text-gray-400 leading-3 font-normal">{labelAnterior}</p>
            </div>
            <div className="flex-1 text-right">%</div>
          </div>
        </div>

        {/* Filas */}
        <div>
          {clients.map((client) => {
            const growthColor = getGrowthColor(client.displayCrecimiento);

            return (
              <button
                key={client.id}
                onClick={() => onSelect(client)}
                className="w-full bg-white text-left flex justify-between items-center px-3 py-3 border-b hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
              >
                <div className="flex-1 pr-1">
                  <p className="text-[13px] font-medium text-gray-800 truncate">
                    {truncateText(client.name, 15)}
                  </p>
                </div>
                <div className="flex-1 text-right pr-1">
                  <p className="text-[13px] font-semibold text-gray-800">
                    {formatCurrency(client.displayActual)}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {formatCurrency(client.displayAnterior)}
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className={`text-[12px] font-semibold ${growthColor}`}>
                    {client.displayCrecimiento.toFixed(2)}%
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientListMobile;
