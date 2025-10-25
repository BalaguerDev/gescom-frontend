import { formatters } from "../../../utils/formatters";

const ClientOrderDetails = ({ pedido }) => (
  <div className="flex flex-col gap-4">
    <p>
      <span className="font-semibold text-xs">Fecha:</span>{" "}
      <span className="font-semibold text-xs text-gray-500">{formatters.date(new Date(pedido.date))}</span>
    </p>
    <ul className="divide-y divide-gray-100 mt-2">
      {pedido.items?.map((item, idx) => (
        <li key={idx} className="py-2 px-1 flex justify-between text-sm text-gray-700">
          {/* Contenedor con scroll horizontal si el nombre es largo */}
          <div className="flex flex-col w-1/2 overflow-x-auto">
            <span className="truncate font-medium">{item.nombre}</span>
            <span className="text-xs text-gray-500 truncate ">{item.ref}</span>
          </div>
          <span className="w-1/3 text-center">{item.cantidad} u.</span>
          <span className="w-1/3 text-right">€{item.precio?.toFixed(2) || "0.00"}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ClientOrderDetails;
