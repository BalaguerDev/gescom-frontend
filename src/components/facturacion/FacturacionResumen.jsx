// FacturacionResumen.jsx
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
  // Selecciona los valores según la vista
  const facturado = vista === "anual" ? totalFacturacion : mensualFacturacion;
  const objetivo = vista === "anual" ? objetivoAnual : objetivoMensual;
  const progreso = vista === "anual" ? progresoAnual : progresoMensual;
  const titulo =
    vista === "anual"
      ? `Facturación anual ${añoActual}`
      : `Facturación ${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)} de ${añoActual}`;

  return (
    <div className="flex flex-col gap-6 w-full">
      <FacturacionCard
        titulo={titulo}
        facturado={facturado}
        objetivo={objetivo}
        progreso={progreso}
      />
    </div>
  );
};
