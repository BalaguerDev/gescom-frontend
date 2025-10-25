import { useAuth0 } from "@auth0/auth0-react";
import { useClients } from "@/hooks/useClients";
import { useFacturacion } from "@/hooks/useFacturacion";
import { useMemo } from "react";

const objetivosCategorias = {
  maquinas: 250_000,
  accesorios: 180_000,
  herramienta: 130_000,
};

const objetivosTrimestralesFamilias = {
  Q1: { maquinas: 420_000, accesorios: 390_000, herramienta: 50_000 },
  Q2: { maquinas: 350_000, accesorios: 160_000, herramienta: 110_000 },
  Q3: { maquinas: 240_000, accesorios: 170_000, herramienta: 120_000 },
  Q4: { maquinas: 585_000, accesorios: 430_000, herramienta: 300_000 },
};

const objetivoAnual = 2_150_000;

export const useBillingData = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error, reload } = useClients(getAccessTokenSilently);

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();
  const diasMes = new Date(añoActual, mesActual + 1, 0).getDate();
  const diaActual = fechaActual.getDate();
  const diasRestantes = diasMes - diaActual;

  const { mensualFacturacion, trimestralFacturacion, anualFacturacion } = useFacturacion(
    clients,
    mesActual,
    { mensual: 0, trimestral: 0, anual: 0 }
  );

  const trimestreActual =
    mesActual < 3 ? "Q1" : mesActual < 6 ? "Q2" : mesActual < 9 ? "Q3" : "Q4";

  const totalMes = Object.values(mensualFacturacion || {}).reduce((a, b) => a + b, 0);
  const objetivoMes = Object.values(objetivosCategorias).reduce((a, b) => a + b, 0);
  const progresoMes = (totalMes / objetivoMes) * 100;

  return {
    loading,
    error,
    reload,
    fechaActual,
    añoActual,
    mesActual,
    diasRestantes,
    mensualFacturacion,
    trimestralFacturacion,
    anualFacturacion,
    trimestreActual,
    totalMes,
    objetivoMes,
    progresoMes,
    objetivosCategorias,
    objetivosTrimestralesFamilias,
    objetivoAnual,
  };
};
