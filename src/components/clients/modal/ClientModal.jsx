import Modal from "@/components/ui/Modal";
import { useClientModal } from "@/hooks/useClientModal";
import ClientModalTabs from "./ClientModalTabs";
import ClientOrderDetails from "./ClientOrderDetails";
import ClientContacto from "./ClientContact";
import ClientOrders from "./ClientOrders";
import ClientCampaign from "./ClientCampaign";

const ClientModal = ({ client, isOpen, onClose }) => {
  const { activeSection, setActiveSection, pedidoDetalle, setPedidoDetalle, ultimosPedidos, campanas, tabs } = useClientModal(client);

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
        {!pedidoDetalle && <ClientModalTabs tabs={tabs} activeSection={activeSection} onSelect={(id) => { setActiveSection(id); setPedidoDetalle(null); }} />}
        <div className="mt-4 flex-1 overflow-auto">
          {pedidoDetalle ? (
            <ClientOrderDetails pedido={pedidoDetalle} />
          ) : activeSection === "contacto" ? (
            <ClientContacto client={client} />
          ) : activeSection === "pedidos" ? (
            <ClientOrders pedidos={ultimosPedidos} onSelectPedido={setPedidoDetalle} />
          ) : activeSection === "campañas" ? (
            <ClientCampaign campanas={campanas} />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ClientModal;
