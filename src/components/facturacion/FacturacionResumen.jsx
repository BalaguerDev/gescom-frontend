import { FacturacionCard } from "./FacturacionCard";

export const FacturacionResumen = ({
  nombreMes,
  añoActual,
  mensualFacturacion,
  objetivoMensual,
  totalFacturacion,
  objetivoAnual,
  progresoMensual,
  progresoAnual,
  vista,
}) => {
  const facturado = vista === "año" ? totalFacturacion : mensualFacturacion;
  const objetivo = vista === "año" ? objetivoAnual : objetivoMensual;
  const progreso = vista === "año" ? progresoAnual : progresoMensual;
  const titulo =
    vista === "año"
      ? `Facturación año ${añoActual}`
      : `Facturación ${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)} de ${añoActual}`;

  return (
    <div className="sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <FacturacionCard
        titulo={titulo}
        facturado={facturado}
        objetivo={objetivo}
        progreso={progreso}
      />
    </div>
  );
};
