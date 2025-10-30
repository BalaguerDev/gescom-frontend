import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import RouteClientHeader from "./RouteClientHeader";
import RouteClientIndicators from "./RouteClientIndicators";
import RouteClientFamilies from "./RouteClientFamilies";
dayjs.extend(relativeTime);
dayjs.locale("es");

export function RouteClientCard({ client, onStartRoute }) {
  if (!client) return null;

  const {
    name,
    address,
    phone,
    email,
    totalCurrent = 0,
    totalLast = 0,
    revenueCurrentYear = [],
    revenueLastYear = [],
    orders = [],
  } = client;

  const growth = totalLast > 0 ? ((totalCurrent - totalLast) / totalLast) * 100 : 0;
  const currentMonth = dayjs().month() + 1;
  const currentData = revenueCurrentYear.find((m) => +m.month === currentMonth);
  const lastData = revenueLastYear.find((m) => +m.month === currentMonth);
  const currentMonthTotal = currentData?.total || 0;
  const lastMonthTotal = lastData?.total || 0;
  const monthlyGrowth = lastMonthTotal > 0 ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;
  const monthlyOrders = orders.filter((o) => dayjs(o.date).month() + 1 === currentMonth);
  const ticketMedio = monthlyOrders.length > 0 ? Math.round(currentMonthTotal / monthlyOrders.length) : 0;

  const isInactive = monthlyOrders.length === 0 && monthlyGrowth < -10;
  const riskLevel = isInactive || growth < -10 ? "Alto" : growth < 0 ? "Medio" : "Bajo";

  const currentFamilies = Object.keys(currentData?.families || {}).map((key) => {
    const current = Number(currentData.families[key] || 0);
    const last = Number(lastData?.families?.[key] ?? 0);
    const pctChange = last ? ((current - last) / last) * 100 : 0;
    return { name: key.charAt(0).toUpperCase() + key.slice(1), current, last, pctChange };
  });

  return (
    <div className="space-y-6">
      <RouteClientHeader
        name={name}
        address={address}
        phone={phone}
        email={email}
        riskLevel={riskLevel}
        onStartRoute={onStartRoute}
      />
      <RouteClientIndicators
        totalCurrent={totalCurrent}
        totalLast={totalLast}
        growth={growth}
        currentMonthTotal={currentMonthTotal}
        lastMonthTotal={lastMonthTotal}
        monthlyGrowth={monthlyGrowth}
        ticketMedio={ticketMedio}
        monthlyOrders={monthlyOrders}
        formatters={{ currency: (v) => `${v.toLocaleString()} €`, percentage: (v) => `${v.toFixed(1)}%` }}
      />
      {currentFamilies.length > 0 && <RouteClientFamilies families={currentFamilies} />}
    </div>
  );
}
