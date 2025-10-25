import { useMemo } from "react";
import { calcularProgreso } from "@/utils/facturacion.utils";
import { formatters } from "@/utils/formatters";

/**
 * Hook adaptado al nuevo formato con revenueCurrentYear
 */
export const useFacturacion = (clients = [], mesActual, objetivos = {}) => {
  const {
    anual: objetivoAnual = 0,
    mensual: objetivoMensual = 0,
    trimestral: objetivoTrimestral = 0,
  } = objetivos;

  const añoActual = new Date().getFullYear();
  const nombreMes = formatters.monthName(mesActual);

  // 🔹 Facturación mensual (sumamos todas las familias del mesActual)
  const facturacionMensual = useMemo(() => {
    const totales = { maquinas: 0, accesorios: 0, herramienta: 0 };

    clients?.forEach((client) => {
      const mesData = client.revenueCurrentYear?.find((r) => r.month === mesActual + 1);
      if (mesData?.families) {
        totales.maquinas += mesData.families.maquinas || 0;
        totales.accesorios += mesData.families.accesorios || 0;
        totales.herramienta += mesData.families.herramienta || 0;
      }
    });

    return totales;
  }, [clients, mesActual]);

  // 🔹 Facturación anual total
  const facturacionAnual = useMemo(() => {
    const categorias = { maquinas: 0, accesorios: 0, herramienta: 0 };
    let total = 0;

    clients?.forEach((client) => {
      client.revenueCurrentYear?.forEach((r) => {
        categorias.maquinas += r.families?.maquinas || 0;
        categorias.accesorios += r.families?.accesorios || 0;
        categorias.herramienta += r.families?.herramienta || 0;
        total += r.total || 0;
      });
    });

    return { total, categorias };
  }, [clients]);

  // 🔹 Facturación trimestral (Q1, Q2, Q3, Q4)
  const trimestralFacturacion = useMemo(() => {
    const trimestres = {
      Q1: { maquinas: 0, accesorios: 0, herramienta: 0 },
      Q2: { maquinas: 0, accesorios: 0, herramienta: 0 },
      Q3: { maquinas: 0, accesorios: 0, herramienta: 0 },
      Q4: { maquinas: 0, accesorios: 0, herramienta: 0 },
    };

    clients?.forEach((client) => {
      client.revenueCurrentYear?.forEach((r) => {
        const mes = r.month;
        const trimestre =
          mes <= 3 ? "Q1" : mes <= 6 ? "Q2" : mes <= 9 ? "Q3" : "Q4";

        trimestres[trimestre].maquinas += r.families?.maquinas || 0;
        trimestres[trimestre].accesorios += r.families?.accesorios || 0;
        trimestres[trimestre].herramienta += r.families?.herramienta || 0;
      });
    });

    return trimestres;
  }, [clients]);

  // 🔹 Calcular progresos
  const progresoAnual = useMemo(
    () => calcularProgreso(facturacionAnual.total, objetivoAnual),
    [facturacionAnual, objetivoAnual]
  );

  const progresoMensual = useMemo(
    () =>
      calcularProgreso(
        facturacionMensual.maquinas +
          facturacionMensual.accesorios +
          facturacionMensual.herramienta,
        objetivoMensual
      ),
    [facturacionMensual, objetivoMensual]
  );

  const progresoTrimestral = useMemo(() => {
    const trimestreActual =
      mesActual < 3 ? "Q1" : mesActual < 6 ? "Q2" : mesActual < 9 ? "Q3" : "Q4";
    const totalTrimestre =
      trimestralFacturacion[trimestreActual].maquinas +
      trimestralFacturacion[trimestreActual].accesorios +
      trimestralFacturacion[trimestreActual].herramienta;

    return calcularProgreso(totalTrimestre, objetivoTrimestral);
  }, [trimestralFacturacion, mesActual, objetivoTrimestral]);

  // 🔹 Return estructurado
  return {
    nombreMes,
    añoActual,
    mensualFacturacion: facturacionMensual,
    trimestralFacturacion,
    anualFacturacion: facturacionAnual,
    objetivoMensual,
    objetivoTrimestral,
    objetivoAnual,
    progresoMensual,
    progresoTrimestral,
    progresoAnual,
  };
};
