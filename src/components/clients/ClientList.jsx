import { useState } from "react";
import ClientTable from "./ClientTable";
import ClientListMobile from "./ClientListMobile";
import ClientModal from "./ClientModal";

const ClientList = ({ clients, vista, mesActual, añoActual }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const handleCloseModal = () => setSelectedClient(null);

  // Transformar datos según la vista
  const transformedClients = clients.map((c) => {
    if (vista === "anual") {
      const totalLast = c.revenueLastYear?.reduce((a, b) => a + b, 0) || 0;
      const totalCurrent = c.revenueCurrentYear?.reduce((a, b) => a + b, 0) || 0;
      const crecimiento = totalLast ? ((totalCurrent - totalLast) / totalLast) * 100 : 0;

      return {
        ...c,
        displayAnterior: totalLast,
        displayActual: totalCurrent,
        displayCrecimiento: crecimiento,
      };
    } else {
      const mensualActual = c.revenueCurrentYear?.[mesActual] || 0;
      const mensualAnterior = c.revenueLastYear?.[mesActual] || 0;
      const crecimiento = mensualAnterior
        ? ((mensualActual - mensualAnterior) / mensualAnterior) * 100
        : 0;

      return {
        ...c,
        displayAnterior: mensualAnterior,
        displayActual: mensualActual,
        displayCrecimiento: crecimiento,
      };
    }
  });

  // Ordenar de mayor a menor por displayActual
  transformedClients.sort((a, b) => b.displayActual - a.displayActual);

  return (
    <div>
      <ClientTable
        clients={transformedClients}
        onRowClick={setSelectedClient}
        vista={vista}
        mesActual={mesActual}
        añoActual={añoActual}
      />
      <ClientListMobile
        clients={transformedClients}
        onSelect={setSelectedClient}
        vista={vista}
        mesActual={mesActual}
        añoActual={añoActual}
      />
      <ClientModal
        client={selectedClient}
        isOpen={Boolean(selectedClient)}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ClientList;
