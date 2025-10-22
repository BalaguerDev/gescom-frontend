import { FacturacionCard } from "@/components/facturacion";
import { useClients } from "@/hooks/useClients";
import { useAuth0 } from "@auth0/auth0-react";
import { useFacturacion } from "@/hooks/useFacturacion";
import { formatMonth } from "@/utils/formatters";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error } = useClients(getAccessTokenSilently);

  // 📅 Datos de fecha actual
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();
  const nombreMes = formatMonth(fechaActual);

  // 🎯 Objetivo mensual (puedes adaptarlo más adelante desde API)
  const objetivos = { mensual: 180_000 };

  // 💰 Calculamos facturación y progreso mensual
  const { mensualFacturacion, progresoMensual } = useFacturacion(
    clients,
    mesActual,
    objetivos
  );

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Resumen general de tu actividad comercial.
      </p>

      {/* Card de facturación mensual */}
      <FacturacionCard
        titulo={`Facturación ${nombreMes}`}
        facturado={mensualFacturacion}
        objetivo={objetivos.mensual}
        progreso={progresoMensual}
      />
    </div>
  );
};

export default Dashboard;
