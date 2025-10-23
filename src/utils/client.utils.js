export const transformClients = (clients = [], vista, mesActual) => {
  return clients
    .map((c) => {
      const lastYear = c.revenueLastYear || [];
      const currentYear = c.revenueCurrentYear || [];

      const totalLast = lastYear.reduce((a, b) => a + (b || 0), 0);
      const totalCurrent = currentYear.reduce((a, b) => a + (b || 0), 0);

      const mensualAnterior = lastYear[mesActual] || 0;
      const mensualActual = currentYear[mesActual] || 0;

      const displayAnterior = vista === "anual" ? totalLast : mensualAnterior;
      const displayActual = vista === "anual" ? totalCurrent : mensualActual;

      const base = vista === "anual" ? totalLast : mensualAnterior;
      const displayCrecimiento = base ? ((displayActual - base) / base) * 100 : 0;

      return {
        ...c,
        displayAnterior,
        displayActual,
        displayCrecimiento,
      };
    })
    .sort((a, b) => b.displayActual - a.displayActual);
};
