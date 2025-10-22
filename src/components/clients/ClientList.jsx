import { useState } from "react";
import {ClientTable, ClientModal, ClientListMobile} from "@/components/clients";

const ClientList = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCloseModal = () => setSelectedClient(null);

  return (
    <div>
      {/* Desktop */}
      <ClientTable clients={clients} onRowClick={setSelectedClient} />

      {/* Mobile */}
      <ClientListMobile clients={clients} onSelect={setSelectedClient} />

      {/* Modal detalle */}
      <ClientModal
        client={selectedClient}
        isOpen={Boolean(selectedClient)}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ClientList;
