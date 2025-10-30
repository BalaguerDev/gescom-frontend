import dayjs from "dayjs";

/** Suma los totales de facturación */
export const sumTotals = (arr = []) => (arr || []).reduce((s, m) => s + (m.total || 0), 0);

/** Clasifica clientes en A/B/C/D según Pareto */
export function paretoClassify(clients = []) {
  const clientsWithTotal = clients.map((c) => {
    const totalLast = sumTotals(c.revenueLastYear || []);
    return { id: c.id, totalLast, client: c };
  });

  const grandTotal = clientsWithTotal.reduce((s, c) => s + c.totalLast, 0);
  clientsWithTotal.sort((a, b) => b.totalLast - a.totalLast);

  let acc = 0;
  const map = {};
  for (let i = 0; i < clientsWithTotal.length; i++) {
    const c = clientsWithTotal[i];
    const contribution = grandTotal ? c.totalLast / grandTotal : 0;
    acc += contribution;
    if (acc <= 0.8) map[c.id] = "A";
    else if (acc <= 0.95) map[c.id] = "B";
    else if (acc <= 0.99) map[c.id] = "C";
    else map[c.id] = "D";
  }
  if (grandTotal === 0) {
    clients.forEach((c) => (map[c.id] = "D"));
  }
  return map;
}

