import React from "react";
import {
  formatCurrency,
  getGrowthColor,
  truncateText,
} from "../../utils/formatters";

const ClientListMobile = ({ clients, onSelect }) => {
  return (
    <div className="sm:hidden mt-4">
      {/* 🔹 Contenedor scrollable */}
      <div className="overflow-y-auto max-h-[70vh] rounded-lg border border-gray-100">
        {/* 🔹 Encabezado fijo */}
        <div className="sticky top-0 bg-white z-20 shadow-sm">
          <div className="flex justify-center items-center px-3 py-3 border-b text-gray-700 text-[13px] font-bold tracking-wide">
            <div className="flex-1">Empresa</div>
            <div className="flex-1 text-right">
              <p>Fact. actual</p>
              <p className="text-[11px] text-gray-400 leading-3 font-normal">
                Año anterior
              </p>
            </div>
            <div className="flex-1 text-right">%</div>
          </div>
        </div>

        {/* 🔹 Lista de clientes */}
        <div>
          {clients.map((client) => {
            const totalLast =
              client.revenueLastYear?.reduce((a, b) => a + b, 0) ?? 0;
            const totalCurrent =
              client.revenueCurrentYear?.reduce((a, b) => a + b, 0) ?? 0;
            const growth = totalLast
              ? ((totalCurrent - totalLast) / totalLast) * 100
              : 0;
            const growthColor = getGrowthColor(growth);

            return (
              <button
                key={client.id}
                onClick={() => onSelect(client)}
                className="w-full bg-white text-left flex justify-between items-center px-3 py-3 border-b hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
              >
                {/* Empresa */}
                <div className="flex-1 pr-1">
                  <p className="text-[13px] font-medium text-gray-800 truncate">
                    {truncateText(client.name, 15)}
                  </p>
                </div>

                {/* Facturación */}
                <div className="flex-1 text-right pr-1">
                  <p className="text-[13px] font-semibold text-gray-800">
                    {formatCurrency(totalCurrent)}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {formatCurrency(totalLast)}
                  </p>
                </div>

                {/* % Crecimiento */}
                <div className="flex-1 text-right">
                  <p className={`text-[12px] font-semibold ${growthColor}`}>
                    {growth.toFixed(2)}%
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
