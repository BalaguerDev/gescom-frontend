import { formatCurrency, getGrowthColor } from "@/utils/formatters";

const ClientModal = ({ client, isOpen, onClose }) => {
  if (!isOpen || !client) return null;

  const totalLast = client.revenueLastYear.reduce((a, b) => a + b, 0);
  const totalCurrent = client.revenueCurrentYear.reduce((a, b) => a + b, 0);
  const growth = totalLast ? ((totalCurrent - totalLast) / totalLast) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{client.name}</h2>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><span className="font-semibold">CIF:</span> {client.cif}</p>
          <p><span className="font-semibold">Dirección:</span> {client.address}</p>
          <p><span className="font-semibold">Email:</span> {client.email}</p>
          <p><span className="font-semibold">Teléfono:</span> {client.phone}</p>

          <hr className="my-3 border-gray-200" />

          <p><span className="font-semibold">Ventas Año Anterior:</span> {formatCurrency(totalLast)}</p>
          <p><span className="font-semibold">Ventas Actual:</span> {formatCurrency(totalCurrent)}</p>
          <p className={`font-semibold ${getGrowthColor(growth)}`}>
            Crecimiento: {growth.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>

  );
};

export default ClientModal;
