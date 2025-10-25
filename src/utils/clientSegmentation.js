export function assignClientSegments(clients = []) {
  if (!clients.length) return [];

  // Ordenar por facturación ANUAL total
  const sorted = [...clients].sort((a, b) => (b.totalCurrent || 0) - (a.totalCurrent || 0));

  const total = sorted.reduce((acc, c) => acc + (c.totalCurrent || 0), 0);
  if (total === 0) return sorted.map(c => ({ ...c, segment: "C" }));

  let acumulado = 0;
  return sorted.map(c => {
    acumulado += c.totalCurrent || 0;
    const porcentaje = (acumulado / total) * 100;

    let segment = "C";
    if (porcentaje <= 20) segment = "A";
    else if (porcentaje <= 50) segment = "B";

    return { ...c, segment };
  });
}
