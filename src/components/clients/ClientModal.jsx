import Modal from "@/components/ui/Modal";
import { formatters } from "@/utils/formatters";

const ClientModal = ({ client, isOpen, onClose }) => {
  if (!client) return null;

  const totalLast = client.revenueLastYear?.reduce((a, b) => a + b, 0) || 0;
  const totalCurrent = client.revenueCurrentYear?.reduce((a, b) => a + b, 0) || 0;
  const growth = totalLast ? ((totalCurrent - totalLast) / totalLast) * 100 : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={client.name} size="md">
      <p><span className="font-semibold">CIF:</span> {client.cif}</p>
      <p><span className="font-semibold">Dirección:</span> {client.address}</p>
      <p><span className="font-semibold">Email:</span> {client.email}</p>
      <p><span className="font-semibold">Teléfono:</span> {client.phone}</p>

      <hr className="my-3 border-gray-200" />

      <p><span className="font-semibold">Ventas Año Anterior:</span> {formatters.currency(totalLast)}</p>
      <p><span className="font-semibold">Ventas Actual:</span> {formatters.currency(totalCurrent)}</p>
      <p className={`font-semibold ${formatters.growthColor(growth)}`}>
        Crecimiento: {growth.toFixed(2)}%
      </p>
    </Modal>
  );
};

export default ClientModal;
