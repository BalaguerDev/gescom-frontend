import { formatters } from "@/utils/formatters";

const PedidoDetalle = ({ pedido }) => (
    <div className="flex flex-col gap-4">
        <div className="space-y-2 p-2">
            <p><span className="font-semibold">Fecha:</span> {formatters.date(new Date(pedido.date))}</p>
            <p><span className="font-semibold">Número de referencias:</span> {pedido.items?.length}</p>
            <ul className="divide-y divide-gray-100 mt-2">
                {pedido.items?.map((item, idx) => (
                    <li key={idx} className="py-1 flex justify-between">
                        <span>{item.ref}</span>
                        <span>{item.cantidad} u.</span>
                        <span>{item.precio ? `€${item.precio}` : "€10"}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default PedidoDetalle;
