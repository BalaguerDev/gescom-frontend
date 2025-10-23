import { useState } from "react";
import { transformClients } from "@/utils/client.utils";
import { ClientTable } from "./table";
import ClientModal from "./ClientModal";

const ClientList = ({ clients, vista, mesActual, añoActual }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const handleCloseModal = () => setSelectedClient(null);

  // Transforma los datos según la vista
  const transformed = transformClients(clients, vista, mesActual, añoActual);

  return (
    <>
      <ClientTable
        clients={transformed}
        vista={vista} 
        mesActual={mesActual}
        añoActual={añoActual}
        onSelect={setSelectedClient}
      />

      <ClientModal
        client={selectedClient}
        isOpen={!!selectedClient}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ClientList;
