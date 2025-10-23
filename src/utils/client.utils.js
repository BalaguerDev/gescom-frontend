export const transformClients = (clients = [], vista, mesActual) => {
  return clients
    .map((c) => {
      const lastYear = c.revenueLastYear || [];
      const currentYear = c.revenueCurrentYear || [];

      // 🔹 Total anual (suma de los totales mensuales)
      const totalLast = lastYear.reduce((acc, m) => acc + (m?.total || 0), 0);
      const totalCurrent = currentYear.reduce((acc, m) => acc + (m?.total || 0), 0);

      // 🔹 Datos mensuales (buscando por mes)
      const mesAnteriorData = lastYear.find((m) => m.month === mesActual) || {};
      const mesActualData = currentYear.find((m) => m.month === mesActual) || {};

      const mensualAnterior = mesAnteriorData.total || 0;
      const mensualActual = mesActualData.total || 0;

      // 🔹 Determinar qué mostrar según la vista
      const displayAnterior = vista === "anual" ? totalLast : mensualAnterior;
      const displayActual = vista === "anual" ? totalCurrent : mensualActual;

      // 🔹 Porcentaje de crecimiento
      const base = vista === "anual" ? totalLast : mensualAnterior;
      const displayCrecimiento = base ? ((displayActual - base) / base) * 100 : 0;

      // 🔹 Familias agregadas (solo si las usas en tabla)
      const familiasCurrent = currentYear.reduce(
        (acc, m) => {
          acc.maquinas += m?.families?.maquinas || 0;
          acc.accesorios += m?.families?.accesorios || 0;
          acc.herramienta += m?.families?.herramienta || 0;
          return acc;
        },
        { maquinas: 0, accesorios: 0, herramienta: 0 }
      );

      const familiasLast = lastYear.reduce(
        (acc, m) => {
          acc.maquinas += m?.families?.maquinas || 0;
          acc.accesorios += m?.families?.accesorios || 0;
          acc.herramienta += m?.families?.herramienta || 0;
          return acc;
        },
        { maquinas: 0, accesorios: 0, herramienta: 0 }
      );

      return {
        ...c,
        displayAnterior,
        displayActual,
        displayCrecimiento,
        familias: {
          current: familiasCurrent,
          last: familiasLast,
        },
      };
    })
    .sort((a, b) => b.displayActual - a.displayActual);
};
