// src/hooks/usePareto.js
import { useMemo } from "react";

/**
 * Hook para calcular el análisis de Pareto (regla 80/20)
 * sobre un conjunto de clientes con datos de facturación.
 *
 * @param {Array} clients - Lista de clientes [{ id, name, billing }]
 * @returns {Object} {
 *   paretoClients: clientes que forman el 80% de la facturación total
 *   otherClients: el resto de clientes
 *   totalBilling: suma total de facturación
 *   paretoPercentage: % que representan los clientes top
 * }
 */
export const usePareto = (clients = []) => {
  const {
    paretoClients,
    otherClients,
    totalBilling,
    paretoPercentage,
  } = useMemo(() => {
    if (!clients.length) {
      return {
        paretoClients: [],
        otherClients: [],
        totalBilling: 0,
        paretoPercentage: 0,
      };
    }

    // Ordenar clientes de mayor a menor facturación
    const sortedClients = [...clients].sort(
      (a, b) => (b.billing || 0) - (a.billing || 0)
    );

    // Calcular total de facturación
    const total = sortedClients.reduce(
      (sum, client) => sum + (client.billing || 0),
      0
    );

    // Calcular el punto de corte del 80%
    let cumulative = 0;
    const paretoCutoff = total * 0.8;
    const pareto = [];

    for (const client of sortedClients) {
      cumulative += client.billing || 0;
      pareto.push(client);
      if (cumulative >= paretoCutoff) break;
    }

    const others = sortedClients.filter(
      (c) => !pareto.some((p) => p.id === c.id)
    );

    return {
      paretoClients: pareto,
      otherClients: others,
      totalBilling: total,
      paretoPercentage: ((cumulative / total) * 100).toFixed(2),
    };
  }, [clients]);

  return {
    paretoClients,
    otherClients,
    totalBilling,
    paretoPercentage,
  };
};
