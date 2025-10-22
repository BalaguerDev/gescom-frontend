import ClientTable from "./ClientTable";
import ClientListMobile from "./ClientListMobile";
import ClientModal from "./ClientModal";
import { useState } from "react";

const ClientList = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div>
      {/* Desktop */}
      <ClientTable clients={clients} onRowClick={setSelectedClient} />

      {/* Mobile */}
      <ClientListMobile clients={clients} onSelect={setSelectedClient} />

      {/* Modal */}
      <ClientModal
        client={selectedClient}
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </div>
  );
};

export default ClientList;
