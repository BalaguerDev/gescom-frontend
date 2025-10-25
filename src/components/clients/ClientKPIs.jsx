import { Users, TrendingUp, TrendingDown } from "lucide-react";
import ClientInactivo from "./ClientInactivo";

const ClientKPIs = ({ clients = [], clientesInactivos = [], onShowInactivos }) => {
  const total = clients?.length || 0;

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();
  const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
  const añoAnterior = mesActual === 0 ? añoActual - 1 : añoActual;

  // 🆕 Nuevos clientes este año
  const nuevosClientes = clients.filter(c => c.createdAt && new Date(c.createdAt).getFullYear() === añoActual).length;

  // 🟢 Clientes activos este mes
  const clientesActivosMesActual = clients.filter(c =>
    c.orders?.some(o => {
      const fechaPedido = new Date(o.date);
      return fechaPedido.getMonth() === mesActual && fechaPedido.getFullYear() === añoActual;
    })
  ).length;

  const clientesActivosMesAnterior = clients.filter(c =>
    c.orders?.some(o => {
      const fechaPedido = new Date(o.date);
      return fechaPedido.getMonth() === mesAnterior && fechaPedido.getFullYear() === añoAnterior;
    })
  ).length;

  const crecimientoActivos = clientesActivosMesAnterior > 0
    ? ((clientesActivosMesActual - clientesActivosMesAnterior) / clientesActivosMesAnterior) * 100
    : 0;

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row justify-around items-center gap-8 text-center">

        {/* 🟥 CLIENTES INACTIVOS */}
        <div className="flex flex-col items-center justify-center">
          <ClientInactivo
            clients={clients}
            clientesInactivos={clientesInactivos}
            onShowInactivos={onShowInactivos}
          />
        </div>


        {/* 🔹 DIVISOR */}
        <div className="hidden sm:block w-px bg-gray-200 h-12" />
        <div className="block sm:hidden w-full h-px bg-gray-200" />

        {/* 🆕 NUEVOS CLIENTES ESTE AÑO */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm mb-1">Total de clientes nuevos</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{nuevosClientes}</p>
        </div>

        {/* 🔹 DIVISOR */}
        <div className="hidden sm:block w-px bg-gray-200 h-12" />
        <div className="block sm:hidden w-full h-px bg-gray-200" />

        {/* 🟢 CLIENTES ACTIVOS ESTE MES */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm mb-1">Clientes activos este mes</p>
          <div className={`flex items-baseline gap-1 ${crecimientoActivos >= 0 ? "text-green-600" : "text-red-600"}`}>
            <p className="text-3xl font-bold">{clientesActivosMesActual}</p>
            {clientesActivosMesAnterior > 0 && (
              crecimientoActivos >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />
            )}
          </div>
          {clientesActivosMesAnterior > 0 && (
            <p className="text-xs text-gray-400">
              {crecimientoActivos.toFixed(1)}% vs mes anterior
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientKPIs;
