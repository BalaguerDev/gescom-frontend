export const calcularFacturacion = (clients = [], mesActual) => {
  if (!Array.isArray(clients) || clients.length === 0) {
    return { total: 0, mensual: 0 };
  }

  let total = 0;
  let mensual = 0;

  for (const c of clients) {
    // ✅ Total anual (usa totalCurrent si existe o suma revenueCurrentYear)
    const totalAnual =
      typeof c.totalCurrent === "number"
        ? c.totalCurrent
        : Array.isArray(c.revenueCurrentYear)
        ? c.revenueCurrentYear.reduce((sum, m) => sum + (m?.total || 0), 0)
        : 0;

    total += totalAnual;

    // ✅ Total mensual (busca por month)
    const mesData = Array.isArray(c.revenueCurrentYear)
      ? c.revenueCurrentYear.find((m) => m.month === mesActual)
      : null;

    mensual += mesData?.total || 0;
  }

  return { total, mensual };
};

export const calcularProgreso = (valor, objetivo) => {
  if (!objetivo || objetivo <= 0) return 0;
  return Math.min((valor / objetivo) * 100, 100);
};
