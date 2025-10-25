import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DataStateHandler } from "@/components/ui";
import { useClients } from "@/hooks/useClients";
import InactiveCustomersModal from "../components/clients/ClientesInactivosModal";
import { assignClientSegments } from "@/utils/clientSegmentation";
import ClientKPIs from "../components/clients/ClientKPIs";
import { SearchInput, ToggleVista } from "../components/ui";
import ClientTableContainer from "../components/clients/table/ClientTableContainer";

const ClientPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error, reloadClients } = useClients(getAccessTokenSilently);
  const clientsSegmented = assignClientSegments(clients);

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();

  const [vista, setVista] = useState("mes");
  const [showInactivosModal, setShowInactivosModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 🧮 Clientes inactivos
  const clientesInactivosLista = clients.filter((c) => {
    if (!c.orders?.length) return true;
    const lastOrder = Math.max(...c.orders.map((o) => new Date(o.date)));
    const diffDays = (fechaActual - lastOrder) / (1000 * 60 * 60 * 24);
    return diffDays > 90;
  });

  // 🧮 Transformar clientes
  const transformedClients = clientsSegmented
    .map((c) => {
      const mesData = c.revenueCurrentYear?.find((m) => m.month === mesActual);
      const mensualActual = mesData?.total ?? 0;
      const mensualAnterior =
        c.revenueLastYear?.find((m) => m.month === mesActual)?.total ?? 0;

      if (vista === "año") {
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

  // 🔍 Filtrar clientes por búsqueda
  const filteredClients = transformedClients.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DataStateHandler loading={loading} error={error} onRetry={reloadClients}>
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Resumen Clientes
        </h2>

        {/* 🧩 Cards superiores: Inactivos, Nuevos, Activos*/}
        <ClientKPIs
          clients={clientsSegmented}
          clientesInactivos={clientesInactivosLista}
          onShowInactivos={() => setShowInactivosModal(true)}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* 🔍 Buscador */}
          <div className="flex-1 min-w-[180px]">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* 🔄 Toggle vista */}
          <div className="shrink-0">
            <ToggleVista vista={vista} setVista={setVista} />
          </div>
        </div>
        {/* 📋 Listado de clientes */}
        <ClientTableContainer
          clients={filteredClients}
          vista={vista}
          mesActual={mesActual}
          añoActual={añoActual}
        />

        {/* 🪄 Modal de clientes inactivos */}
        <InactiveCustomersModal
          open={showInactivosModal}
          onClose={() => setShowInactivosModal(false)}
          clientesInactivos={clientesInactivosLista}
        />
      </div>
    </DataStateHandler>
  );
};

export default ClientPage;
