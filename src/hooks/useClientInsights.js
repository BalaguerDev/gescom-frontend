import dayjs from "dayjs";

export function useClientInsights(client) {
  if (!client) return null;

  const currentMonth = dayjs().month() + 1;
  const currentYTD = (client.revenueCurrentYear || [])
    .filter((m) => m.month <= currentMonth)
    .reduce((s, m) => s + (m.total || 0), 0);

  const lastYTD = (client.revenueLastYear || [])
    .filter((m) => m.month <= currentMonth)
    .reduce((s, m) => s + (m.total || 0), 0);

  const currentMonthObj = (client.revenueCurrentYear || []).find((m) => m.month === currentMonth) || { total: 0 };
  const lastMonthObj = (client.revenueLastYear || []).find((m) => m.month === currentMonth) || { total: 0 };

  const refs = {};
  (client.orders || []).forEach((o) => {
    (o.items || []).forEach((it) => {
      refs[it.ref] = (refs[it.ref] || 0) + (it.cantidad || 0);
    });
  });

  const topRefs = Object.entries(refs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ref, qty]) => ({ ref, qty }));

  return {
    currentYTD,
    lastYTD,
    currentMonthTotal: currentMonthObj.total,
    lastMonthTotal: lastMonthObj.total,
    topRefs,
  };
}
