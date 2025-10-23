import { useState } from "react";
import { formatters } from "@/utils/formatters";
import ClientTableHeader from "./ClientTableHeader";
import ClientTableRow from "./ClientTableRow";
import ClientTableMobile from "./ClientTableMobile";

const ClientTable = ({ clients = [], onSelect, vista, mesActual, añoActual }) => {
  const [openRow, setOpenRow] = useState(null);

  if (!clients.length) {
    return (
      <div className="mt-4 p-4 text-center text-gray-500 text-sm border border-gray-100 rounded-lg">
        No hay clientes disponibles
      </div>
    );
  }
  const mesNombre = formatters.monthName(mesActual);
  const añoAnterior = añoActual - 1;
  const headerAnterior =
    vista === "anual" ? "Año pasado" : `${mesNombre} ${añoAnterior}`;
  const headerActual =
    vista === "anual" ? "Total actual" : `${mesNombre} ${añoActual}`;

  return (
    <>
      {/* 🔹 Móvil */}
      <ClientTableMobile
        clients={clients}
        onSelect={onSelect}
        headerAnterior={headerAnterior}
        headerActual={headerActual}
        vista={vista}

      />

      {/* 🔹 Escritorio */}
      <div className="hidden sm:block overflow-y-auto max-h-[90vh] mt-4 border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 relative">
          <ClientTableHeader
            headerAnterior={headerAnterior}
            headerActual={headerActual}
          />
          {clients.map((client) => (
            <ClientTableRow
              key={client.id}
              client={client}
              openRow={openRow}
              setOpenRow={setOpenRow}
              onSelect={onSelect}
              vista={vista}
              headerActual={headerActual}
              headerAnterior={headerAnterior}
              mesActual={mesActual + 1}
            />
          ))}
        </table>
      </div>
    </>
  );
};

export default ClientTable;
