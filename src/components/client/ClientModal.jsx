import { formatCurrency, getGrowthColor } from "../../utils/formatters";

const ClientModal = ({ client, isOpen, onClose }) => {
  if (!isOpen || !client) return null;

  const totalLast = client.revenueLastYear.reduce((a, b) => a + b, 0);
  const totalCurrent = client.revenueCurrentYear.reduce((a, b) => a + b, 0);
  const growth = totalLast ? ((totalCurrent - totalLast) / totalLast) * 100 : 0;

  return (
    <div
      className="fixed  p-5 inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">{client.name}</h2>

        <div className="grid grid-cols-1 gap-2 text-gray-700">
          <p><span className="font-semibold">CIF:</span> {client.cif}</p>
          <p><span className="font-semibold">Dirección:</span> {client.address}</p>
          <p><span className="font-semibold">Email:</span> {client.email}</p>
          <p><span className="font-semibold">Teléfono:</span> {client.phone}</p>
          <hr className="my-2 border-gray-300" />
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
