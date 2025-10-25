export const calcularFacturacion = (clients = [], mesActual) => {
  if (!Array.isArray(clients) || clients.length === 0) {
    return {
      totalFacturacion: 0,
      facturacionMensual: { maquinas: 0, accesorios: 0, herramienta: 0 },
    };
  }

  let totalFacturacion = 0;
  const facturacionMensual = { maquinas: 0, accesorios: 0, herramienta: 0 };

  for (const cliente of clients) {
    // Total general del cliente
    const totalCliente = typeof cliente.totalCurrent === "number"
      ? cliente.totalCurrent
      : Array.isArray(cliente.revenueCurrentYear)
        ? cliente.revenueCurrentYear.reduce((sum, m) => sum + (m?.total || 0), 0)
        : 0;

    totalFacturacion += totalCliente;

    // Buscar mes actual del cliente
    const mesCliente = Array.isArray(cliente.revenueCurrentYear)
      ? cliente.revenueCurrentYear.find((m) => m.month === mesActual + 1) // ojo: tu backend usa 1-12
      : null;

    if (mesCliente?.families) {
      facturacionMensual.maquinas += mesCliente.families.maquinas || 0;
      facturacionMensual.accesorios += mesCliente.families.accesorios || 0;
      facturacionMensual.herramienta += mesCliente.families.herramienta || 0;
    }
  }

  return { totalFacturacion, facturacionMensual };
};


export const calcularProgreso = (valor = 0, objetivo = 0) => {
  if (objetivo <= 0) return 0;
  const progreso = (valor / objetivo) * 100;
  return Math.min(Math.max(progreso, 0), 100);
};
