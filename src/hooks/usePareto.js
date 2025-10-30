import { useMemo } from "react";

/**
 * Hook para clasificar clientes A/B/C según Pareto (80/15/5)
 * Basado en la distribución 20/30/50% de clientes por facturación anual.
 */
export const usePareto = (clients = []) => {
  const { classifiedClients, totalBilling } = useMemo(() => {
    if (!clients.length) return { classifiedClients: [], totalBilling: 0 };

    // Facturación anual fiable
    const clientsWithAnnual = clients.map((c) => ({
      ...c,
      annualRevenue: c.totalCurrent > 0 ? c.totalCurrent : c.totalLast || 0,
    }));

    // Orden descendente por facturación anual
    const sorted = [...clientsWithAnnual].sort(
      (a, b) => b.annualRevenue - a.annualRevenue
    );

    const total = sorted.reduce((sum, c) => sum + c.annualRevenue, 0);
    if (total === 0) return { classifiedClients: [], totalBilling: 0 };

    const totalClients = sorted.length;
    const topA = Math.ceil(totalClients * 0.2);
    const topB = Math.ceil(totalClients * 0.5); // 20% A + 30% B = 50%

    const classified = sorted.map((c, i) => {
      let type = "C";
      if (i < topA) type = "A";
      else if (i < topB) type = "B";

      const visitsPerMonth = type === "A" ? 3 : type === "B" ? 2 : 1;
      const cooldownDays = type === "A" ? 8 : type === "B" ? 15 : 30;

      return {
        ...c,
        type,
        visitsPerMonth,
        cooldownDays,
      };
    });

    return { classifiedClients: classified, totalBilling: total };
  }, [clients]);

  return { classifiedClients, totalBilling };
};
