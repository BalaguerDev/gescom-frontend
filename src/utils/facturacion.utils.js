export const calcularFacturacion = (clients = [], mesActual) => {
  if (!Array.isArray(clients) || clients.length === 0) {
    return { totalFacturacion: 0, facturacionMensual: 0 };
  }

  let totalFacturacion = 0;
  let facturacionMensual = 0;

  for (const cliente of clients) {
    const totalCliente = typeof cliente.totalCurrent === "number"
      ? cliente.totalCurrent
      : Array.isArray(cliente.revenueCurrentYear)
        ? cliente.revenueCurrentYear.reduce((sum, m) => sum + (m?.total || 0), 0)
        : 0;

    totalFacturacion += totalCliente;

    const mesCliente = Array.isArray(cliente.revenueCurrentYear)
      ? cliente.revenueCurrentYear.find((m) => m.month === mesActual)
      : null;

    facturacionMensual += mesCliente?.total || 0;
  }

  return { totalFacturacion, facturacionMensual };
};

export const calcularProgreso = (valor = 0, objetivo = 0) => {
  if (objetivo <= 0) return 0;
  const progreso = (valor / objetivo) * 100;
  return Math.min(Math.max(progreso, 0), 100);
};
