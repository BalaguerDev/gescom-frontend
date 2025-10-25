import { formatters } from "../../../utils/formatters";

const ClientOrders = ({ pedidos, onSelectPedido }) => (
  <ul className="divide-y divide-gray-100">
    {pedidos.map((p) => {
      const diffDays = Math.floor((new Date() - new Date(p.date)) / (1000 * 60 * 60 * 24));
      return (
        <li
          key={p.id}
          className="py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
          onClick={() => onSelectPedido(p)}
        >
          <div className="flex flex-col">
            <span className="font-semibold">Pedido #{p.id}</span>
            <span className="text-gray-500 text-sm">{formatters.date(new Date(p.date))}</span>
          </div>
          <span className="text-gray-400 text-sm">{diffDays} días</span>
        </li>
      );
    })}
  </ul>
);

export default ClientOrders;
