import Modal from "@/components/ui/Modal";
import { useClientModal } from "@/hooks/useClientModal";
import { ClientCampañas, ClientContacto, ClientPedidos, PedidoDetalle } from "./modal";
import ClientModalTabs from "./modal/ClientModalTab";


const ClientModal = ({ client, isOpen, onClose }) => {
  const {
    activeSection,
    setActiveSection,
    pedidoDetalle,
    setPedidoDetalle,
    ultimosPedidos,
    campañas,
    tabs,
  } = useClientModal(client);

  if (!client) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="No hay datos disponibles" size="xl" arrowBack={onClose}>
        <div className="flex items-center justify-center h-40 text-gray-500">
          Selecciona un cliente para ver los detalles
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={pedidoDetalle ? `Pedido #${pedidoDetalle.id}` : client.name}
      size="xl"
      arrowBack={pedidoDetalle ? () => setPedidoDetalle(null) : null}
    >
      <div className="flex flex-col gap-4">
        {!pedidoDetalle && (
          <ClientModalTabs
            tabs={tabs}
            activeSection={activeSection}
            onSelect={(id) => {
              setActiveSection(id);
              setPedidoDetalle(null);
            }}
          />
        )}

        <div className="mt-4 flex-1 overflow-auto">
          {pedidoDetalle ? (
            <PedidoDetalle pedido={pedidoDetalle} />
          ) : activeSection === "contacto" ? (
            <ClientContacto client={client} />
          ) : activeSection === "pedidos" ? (
            <ClientPedidos pedidos={ultimosPedidos} onSelectPedido={setPedidoDetalle} />
          ) : activeSection === "campañas" ? (
            <ClientCampañas campañas={campañas} />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ClientModal;
