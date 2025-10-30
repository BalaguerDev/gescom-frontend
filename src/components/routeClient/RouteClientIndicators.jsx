import dayjs from "dayjs";
import Card from "./Card";

export default function RouteClientIndicators({
  totalCurrent,
  totalLast,
  growth,
  currentMonthTotal,
  lastMonthTotal,
  monthlyGrowth,
  ticketMedio,
  monthlyOrders,
  formatters,
}) {
  const monthlyTarget = lastMonthTotal > 0 ? lastMonthTotal * 1.2 : 1;
  const targetProgress = Math.min(
    (currentMonthTotal / monthlyTarget) * 100,
    100
  ).toFixed(0);

  return (
    <section
      className="
        grid 
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-4
        w-full
        max-w-full
        overflow-hidden
      "
    >
      {/* 🧱 Ventas anuales */}
      <Card title={`Ventas Ene–${dayjs().format("MMM").toUpperCase()}`}>
        <div className="space-y-1">
          <p className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-semibold">
            {formatters.currency(totalCurrent)}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Año {dayjs().year() - 1}:{" "}
            <span className="font-medium text-gray-700">
              {formatters.currency(totalLast)}
            </span>
          </p>
          <p
            className={`text-xs sm:text-sm font-medium ${growth >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
          >
            {growth >= 0 ? "▲" : "▼"} {formatters.percentage(growth)} año anterior
          </p>
        </div>
      </Card>

      {/* 🧱 Ventas mensuales */}
      <Card title={`Ventas ${dayjs().format("MMM").toUpperCase()}`}>
        <div className="space-y-1">
          <p className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-semibold">
            {formatters.currency(currentMonthTotal)}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Año {dayjs().year() - 1}:{" "}
            <span className="font-medium text-gray-700">
              {formatters.currency(lastMonthTotal)}
            </span>
          </p>
          <p
            className={`text-xs sm:text-sm font-medium ${monthlyGrowth >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
          >
            {monthlyGrowth >= 0 ? "▲" : "▼"}{" "}
            {formatters.percentage(monthlyGrowth)} este mes
          </p>
        </div>
      </Card>

      {/* 🧱 % Consecución */}
      <Card title="% Consecución">
        <p className="text-xl sm:text-2xl font-semibold">{targetProgress}%</p>
        <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
          <div
            className={`h-2 transition-all ${targetProgress >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
            style={{ width: `${targetProgress}%` }}
          />
        </div>
        <div className="mt-2 space-y-1 text-xs sm:text-sm text-gray-500">
          <p>{monthlyOrders.length} pedidos este mes</p>
          <p>Media pedido: {formatters.currency(ticketMedio)}</p>
        </div>
      </Card>
    </section>
  );
}
