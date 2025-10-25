import Modal from "@/components/ui/Modal";
import { formatters } from "@/utils/formatters";
import { Phone } from "lucide-react";

const InactiveCustomersModal = ({ open, onClose, clientesInactivos }) => {
  // Ordenar clientes: los que llevan menos días sin pedir primero
  const sortedClients = [...clientesInactivos].sort((a, b) => {
    const lastOrderA = a.orders?.length
      ? Math.max(...a.orders.map((o) => new Date(o.date)))
      : 0;
    const lastOrderB = b.orders?.length
      ? Math.max(...b.orders.map((o) => new Date(o.date)))
      : 0;

    const diffA = lastOrderA ? (Date.now() - lastOrderA) / (1000 * 60 * 60 * 24) : Infinity;
    const diffB = lastOrderB ? (Date.now() - lastOrderB) / (1000 * 60 * 60 * 24) : Infinity;

    return diffA - diffB;
  });

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Clientes inactivos sin comprar"
      size="lg"
    >
      {sortedClients.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay clientes inactivos.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {sortedClients.map((c) => {
            if (!c.orders?.length) {
              return (
                <li
                  key={c.id}
                  className="py-2 flex justify-between items-center text-gray-500"
                >
                  <span className="font-medium">{formatters.truncate(c.name, 25)}</span>
                  <span className="text-sm italic">Sin pedidos registrados</span>
                </li>
              );
            }

            const lastOrderDate = Math.max(...c.orders.map((o) => new Date(o.date)));
            const diffDays = Math.floor(
              (Date.now() - lastOrderDate) / (1000 * 60 * 60 * 24)
            );

            return (
              <li key={c.id} className="py-2 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">
                    {formatters.truncate(c.name, 25)}
                  </span>
                  <span className="text-sm text-gray-400">
                    Hace {diffDays} día{diffDays !== 1 ? "s" : ""}
                  </span>
                </div>

                {c.phone ? (
                  <a
                    href={`tel:${c.phone}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title={`Llamar a ${c.name}`}
                  >
                    <Phone size={18} />
                  </a>
                ) : (
                  <Phone
                    size={18}
                    className="text-gray-300"
                    title="Sin teléfono disponible"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
};

export default InactiveCustomersModal;
