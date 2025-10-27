// src/features/zones/utils/revenueCalculations.js
const mesActual = new Date().getMonth() + 1;

export const calcularFacturacionActual = (client) =>
  client?.revenueCurrentYear
    ?.filter((m) => m.month <= mesActual)
    .reduce((acc, m) => acc + m.total, 0) || 0;

export const calcularFacturacionAnterior = (client) =>
  client?.revenueLastYear
    ?.filter((m) => m.month <= mesActual)
    .reduce((acc, m) => acc + m.total, 0) || 0;

export const calcularCrecimiento = (client) => {
  const actual = calcularFacturacionActual(client);
  const anterior = calcularFacturacionAnterior(client);
  if (anterior === 0) return null;
  return ((actual - anterior) / anterior) * 100;
};

export const calcularFacturacionZona = (clientsInZone) =>
  clientsInZone.reduce((total, c) => total + calcularFacturacionActual(c), 0);

export const getClientsInPolygon = (path, clients) => {
  if (!window.google?.maps?.geometry?.poly?.containsLocation) return [];
  const polygon = new window.google.maps.Polygon({ paths: path });
  return clients.filter((c) => {
    if (!c.lat || !c.lng) return false;
    const point = new window.google.maps.LatLng(c.lat, c.lng);
    return window.google.maps.geometry.poly.containsLocation(point, polygon);
  });
};
