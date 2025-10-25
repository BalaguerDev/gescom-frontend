export const calcularFacturacion = (clients = [], mesActual) => {
  let totalFacturacion = 0;
  const facturacionMensual = { maquinas: 0, accesorios: 0, herramienta: 0 };

  clients.forEach((client) => {
    client.orders?.forEach((order) => {
      const fecha = new Date(order.date);
      if (fecha.getMonth() === mesActual) {
        totalFacturacion += order.total || 0;
        // Sumar por categoría
        facturacionMensual.maquinas += order.maquinas || 0;
        facturacionMensual.accesorios += order.accesorios || 0;
        facturacionMensual.herramienta += order.herramienta || 0;
      }
    });
  });

  return { totalFacturacion, facturacionMensual };
};