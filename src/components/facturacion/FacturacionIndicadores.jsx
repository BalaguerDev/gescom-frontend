import { formatters } from "@/utils/formatters";

const FacturacionIndicadores = ({ clients, vista, mesActual, clientesInactivos, onShowInactivos }) => {
  // Top 80%
  const clientsWithMonthly = clients.map((c) => {
    const mesData = c.revenueCurrentYear?.find((m) => m.month === mesActual);
    return { ...c, revenueCurrentMonth: mesData?.total ?? 0 };
  });

  const total = clientsWithMonthly.reduce(
    (sum, c) => sum + (vista === "año" ? c.totalCurrent : c.revenueCurrentMonth ?? 0),
    0
  );

  const sorted = [...clientsWithMonthly].sort((a, b) =>
    vista === "año" ? b.totalCurrent - a.totalCurrent : (b.revenueCurrentMonth ?? 0) - (a.revenueCurrentMonth ?? 0)
  );

  let acumulado = 0;
  let index80 = 0;
  for (let i = 0; i < sorted.length; i++) {
    acumulado += vista === "año" ? sorted[i].totalCurrent : sorted[i].revenueCurrentMonth ?? 0;
    if (acumulado / total >= 0.8) {
      index80 = i + 1;
      break;
    }
  }

  const facturacionTop80 = sorted.slice(0, index80).reduce(
    (sum, c) => sum + (vista === "año" ? c.totalCurrent : c.revenueCurrentMonth ?? 0),
    0
  );

  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="w-1/2 bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm">Facturación Top 80%</p>
        <p className="text-xl font-bold text-gray-800">
          {formatters.currency(facturacionTop80)}
        </p>
      </div>

      <div
        onClick={() => clientesInactivos.length > 0 && onShowInactivos()}
        className={`w-1/2 bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center ${
          clientesInactivos.length > 0 ? "cursor-pointer hover:bg-red-50" : ""
        }`}
      >
        <p className="text-gray-500 text-sm">Clientes inactivos</p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl sm:text-3xl font-bold text-red-600">
            {clientesInactivos.length}
          </p>
          <p className="text-gray-400 text-sm">/ {clients.length}</p>
        </div>
      </div>
    </div>
  );
};

export default FacturacionIndicadores;
