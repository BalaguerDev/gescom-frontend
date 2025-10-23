import Modal from "@/components/ui/Modal";
import { formatters } from "@/utils/formatters";

const ClientModal = ({ client, isOpen, onClose }) => {
  if (!client) return null;


  return (
    <Modal isOpen={isOpen} onClose={onClose} title={client.name} size="md">
      <p><span className="font-semibold">CIF:</span> {client.cif}</p>
      <p><span className="font-semibold">Dirección:</span> {client.address}</p>
      <p><span className="font-semibold">Email:</span> {client.email}</p>
      <p><span className="font-semibold">Teléfono:</span> {client.phone}</p>

      <hr className="my-3 border-gray-200" />

     
    </Modal>
  );
};

export default ClientModal;
