import { useMemo } from "react";
import { calcularFacturacion, calcularProgreso } from "@/utils/facturacion.utils";
import { formatters } from "@/utils/formatters";

export const useFacturacion = (clients = [], mesActual, objetivos = {}) => {
  const { anual: objetivoAnual = 0, mensual: objetivoMensual = 0 } = objetivos;

  // Calcular año actual
  const añoActual = new Date().getFullYear();
  const nombreMes = formatters.monthName(mesActual);

  // Calcular totales
  const { totalFacturacion, facturacionMensual } = useMemo(() => {
    if (!clients?.length) return { totalFacturacion: 0, facturacionMensual: 0 };
    return calcularFacturacion(clients, mesActual);
  }, [clients, mesActual]);

  // Calcular progresos
  const progresoAnual = useMemo(
    () => calcularProgreso(totalFacturacion, objetivoAnual),
    [totalFacturacion, objetivoAnual]
  );

  const progresoMensual = useMemo(
    () => calcularProgreso(facturacionMensual, objetivoMensual),
    [facturacionMensual, objetivoMensual]
  );

  // 🔹 Retornar datos completos
  return {
    nombreMes,
    añoActual,
    mensualFacturacion: facturacionMensual,
    totalFacturacion,
    objetivoMensual,
    objetivoAnual,
    progresoMensual,
    progresoAnual,
  };
};
