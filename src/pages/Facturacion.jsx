import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DataStateHandler } from "@/components/ui";
import { useClients } from "@/hooks/useClients";
import { FacturacionResumen } from "@/components/facturacion";
import { useFacturacion } from "@/hooks/useFacturacion";
import FacturacionHeader from "@/components/facturacion/FacturacionHeader";
import FacturacionIndicadores from "@/components/facturacion/FacturacionIndicadores";
import FacturacionClientes from "@/components/facturacion/FacturacionClientes";
import FacturacionModalInactivos from "@/components/facturacion/FacturacionModalInactivos";
import { formatters } from "@/utils/formatters";

const Facturacion = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error, reloadClients } = useClients(getAccessTokenSilently);

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();
  const nombreMes = formatters.month(fechaActual);
  const objetivos = { anual: 5_600_000, mensual: 380_000 };

  const { totalFacturacion, mensualFacturacion, progresoAnual, progresoMensual } =
    useFacturacion(clients, mesActual, objetivos);

  const [vista, setVista] = useState("mes");
  const [showInactivosModal, setShowInactivosModal] = useState(false);

  // 🧮 Calcular clientes inactivos
  const clientesInactivosLista = clients.filter((c) => {
    if (!c.orders?.length) return true;
    const lastOrder = Math.max(...c.orders.map((o) => new Date(o.date)));
    const diffDays = (fechaActual - lastOrder) / (1000 * 60 * 60 * 24);
    return diffDays > 90;
  });

  // 🧮 Transformar clientes según vista
  const transformedClients = clients
    .map((c) => {
      const mesData = c.revenueCurrentYear?.find((m) => m.month === mesActual);
      const mensualActual = mesData?.total ?? 0;
      const mensualAnterior =
        c.revenueLastYear?.find((m) => m.month === mesActual)?.total ?? 0;

      if (vista === "anual") {
        const crecimiento = c.totalLast
          ? ((c.totalCurrent - c.totalLast) / c.totalLast) * 100
          : 0;
        return {
          ...c,
          displayAnterior: c.totalLast ?? 0,
          displayActual: c.totalCurrent ?? 0,
          displayCrecimiento: crecimiento,
        };
      } else {
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

  return (
    <DataStateHandler loading={loading} error={error} onRetry={reloadClients}>
      <div className="space-y-6">
        <FacturacionHeader vista={vista} setVista={setVista} />
        <div className="flex flex-col md:flex-row gap-4">
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
          <FacturacionIndicadores
            clients={clients}
            vista={vista}
            mesActual={mesActual}
            clientesInactivos={clientesInactivosLista}
            onShowInactivos={() => setShowInactivosModal(true)}
          />
        </div>

        <FacturacionClientes
          clients={transformedClients}
          vista={vista}
          mesActual={mesActual}
          añoActual={añoActual}
        />

        <FacturacionModalInactivos
          open={showInactivosModal}
          onClose={() => setShowInactivosModal(false)}
          clientesInactivos={clientesInactivosLista}
        />
      </div>
    </DataStateHandler>
  );
};

export default Facturacion;
