import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DataStateHandler } from "@/components/ui";
import { useClients } from "@/hooks/useClients";
import { FacturacionResumen } from "@/components/facturacion";
import ClientList from "@/components/clients/ClientList";
import { formatters } from "@/utils/formatters";
import { useFacturacion } from "@/hooks/useFacturacion";

const Facturacion = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error, reloadClients } = useClients(getAccessTokenSilently);

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();
  const nombreMes = formatters.month(fechaActual);

  const objetivos = { anual: 2_200_000, mensual: 180_000 };
  const { totalFacturacion, mensualFacturacion, progresoAnual, progresoMensual } =
    useFacturacion(clients, mesActual, objetivos);

  const [vista, setVista] = useState("mes");

  // Agregar revenueCurrentMonth a cada cliente
  const clientsWithMonthly = clients.map(c => ({
    ...c,
    revenueCurrentMonth: c.revenueCurrentYear?.[mesActual] ?? 0,
  }));

  // Transformar y ordenar clientes según vista
  const transformedClients = clientsWithMonthly
    .map(c => {
      if (vista === "anual") {
        const crecimiento = c.facturacionAnualAnterior
          ? ((c.facturacionAnual - c.facturacionAnualAnterior) / c.facturacionAnualAnterior) * 100
          : 0;
        return {
          ...c,
          displayAnterior: c.facturacionAnualAnterior ?? 0,
          displayActual: c.facturacionAnual ?? 0,
          displayCrecimiento: crecimiento,
        };
      } else {
        const mensualActual = c.revenueCurrentMonth ?? 0;
        const mensualAnterior = c.facturacionMensualAnterior?.[mesActual] ?? 0;
        const crecimiento = mensualAnterior
          ? ((mensualActual - mensualAnterior) / mensualAnterior) * 100
          : 0;
        return {
          ...c,
          displayAnterior: mensualAnterior,
          displayActual: mensualActual,
          displayCrecimiento: crecimiento,
        };
      }
    })
    .sort((a, b) => b.displayActual - a.displayActual);

  // Clientes inactivos
  const clientesInactivos = clients.filter(c => {
    if (!c.orders || c.orders.length === 0) return true;
    const lastOrder = c.orders.reduce((latest, order) => {
      const orderDate = new Date(order.date);
      return orderDate > latest ? orderDate : latest;
    }, new Date(0));
    const diffDays = (fechaActual.getTime() - lastOrder.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays > 30;
  }).length;

  // Facturación Top 80%
  const facturacionTop80 = (() => {
    const sorted = [...clientsWithMonthly].sort((a, b) =>
      vista === "anual" ? b.totalCurrent - a.totalCurrent : (b.revenueCurrentMonth ?? 0) - (a.revenueCurrentMonth ?? 0)
    );
    const total = clientsWithMonthly.reduce((sum, c) =>
      vista === "anual" ? sum + c.totalCurrent : sum + (c.revenueCurrentMonth ?? 0), 0
    );

    let acumulado = 0;
    let index80 = 0;
    for (let i = 0; i < sorted.length; i++) {
      acumulado += vista === "anual" ? sorted[i].totalCurrent : (sorted[i].revenueCurrentMonth ?? 0);
      if (acumulado / total >= 0.8) {
        index80 = i + 1;
        break;
      }
    }

    const top80 = sorted.slice(0, index80);
    return top80.reduce((sum, c) =>
      vista === "anual" ? sum + c.totalCurrent : sum + (c.revenueCurrentMonth ?? 0), 0
    );
  })();

  return (
    <DataStateHandler loading={loading} error={error} onRetry={reloadClients} loadingMessage="Cargando clientes...">
      <div>
        {/* Título + Toggle en la misma línea */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Resumen facturación</h2>

          {/* Toggle AÑO / MES */}
          <div className="relative inline-flex bg-gray-200 rounded-full p-1 text-[12px] font-semibold select-none ">
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-full transition-all duration-300 cursor-pointer ${vista === "mes" ? "translate-x-full" : ""
                }`}
            />
            <button
              onClick={() => setVista("anual")}
              className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300 cursor-pointer ${vista === "anual" ? "text-white" : "text-gray-800"
                }`}
            >
              AÑO
            </button>
            <button
              onClick={() => setVista("mes")}
              className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300 cursor-pointer ${vista === "mes" ? "text-white" : "text-gray-800"
                }`}
            >
              MES
            </button>
          </div>
        </div>

        {/* Layout principal */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Facturación resumen: 3/5 en desktop/tablet, 100% en móvil */}
          <FacturacionResumen
            nombreMes={nombreMes}
            añoActual={añoActual}
            mensualFacturacion={mensualFacturacion}
            objetivoMensual={objetivos.mensual}
            totalFacturacion={totalFacturacion}
            objetivoAnual={objetivos.anual}
            progresoMensual={progresoMensual}
            progresoAnual={progresoAnual}
            vista={vista}
          />

          {/* Columna derecha: indicadores */}
          <div className="flex flex-row gap-4 w-full">

            {/* Facturación Top 80% */}
            <div className="w-1/2 bg-white shadow rounded-xl p-4 flex flex-col justify-center items-center">
              <p className="text-gray-500 text-sm">Facturación Top 20</p>
              <p className="text-xl font-bold text-gray-800">
                {facturacionTop80.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
              </p>
            </div>

            {/* Clientes inactivos */}
            <div className="w-1/2 bg-white shadow rounded-xl p-4 flex flex-col justify-center items-center">
              <p className="text-gray-500 text-sm">Clientes inactivos</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl sm:text-3xl font-bold text-red-600">{clientesInactivos}</p>
                <p className="text-gray-400 text-sm">/ {clients.length}</p>
              </div>
            </div>

          </div>

        </div>


      </div>


      {/* Detalle de clientes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Detalle de clientes</h3>
        <ClientList
          clients={transformedClients}
          vista={vista}
          mesActual={mesActual}
          añoActual={añoActual}
        />
      </div>

    </DataStateHandler >
  );
};

export default Facturacion;
