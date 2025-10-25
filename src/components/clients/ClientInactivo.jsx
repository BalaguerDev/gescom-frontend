import { Eye } from "lucide-react";

const ClientInactivo = ({ clients = [], clientesInactivos = [], onShowInactivos }) => {
  const total = clients?.length || 0;
  const inactivos = clientesInactivos?.length || 0;

  return (
    <>
      <p className="text-gray-500 text-sm mb-2">Clientes inactivos</p>

      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-bold text-red-600">{inactivos}</p>
          <p className="text-gray-400 text-xs">/ {total}</p>
        </div>

        {inactivos > 0 && (
          <button
            onClick={onShowInactivos}
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 mt-2 cursor-pointer"
          >
            <Eye size={16} />
            Ver
          </button>
        )}
      </div>
    </>
  );
};

export default ClientInactivo;
