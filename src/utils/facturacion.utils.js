export const calcularFacturacion = (clients = [], mesActual) => {
  const total = clients.reduce((sum, c) => sum + (c.totalCurrent || 0), 0);
  const mensual = clients.reduce(
    (sum, c) => sum + (c.revenueCurrentYear?.[mesActual] || 0),
    0
  );
  return { total, mensual };
};

export const calcularProgreso = (valor, objetivo) => {
  if (!objetivo || objetivo <= 0) return 0;
  return Math.min((valor / objetivo) * 100, 100);
};
