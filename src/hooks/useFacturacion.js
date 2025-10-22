import { useMemo } from "react";
import { calcularFacturacion, calcularProgreso } from "@/utils/facturacion.utils";

export const useFacturacion = (clients, mesActual, objetivos) => {
  const { total, mensual } = useMemo(() => {
    if (!clients?.length) return { total: 0, mensual: 0 };
    return calcularFacturacion(clients, mesActual);
  }, [clients, mesActual]);

  const progresoAnual = calcularProgreso(total, objetivos.anual);
  const progresoMensual = calcularProgreso(mensual, objetivos.mensual);

  return {
    totalFacturacion: total,
    mensualFacturacion: mensual,
    progresoAnual,
    progresoMensual,
  };
};

