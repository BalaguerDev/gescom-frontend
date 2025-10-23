import ProgressBar from "@/components/ui/ProgressBar";

export const FacturacionCard = ({ titulo, facturado = 0, objetivo = 0, progreso = 0 }) => {
  const formatCurrency = (valor) => {
    if (typeof valor !== "number" || isNaN(valor)) return "– €";
    return valor.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow w-full">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{titulo}</h3>

      <div className="flex justify-between items-start mb-2 w-full">
        {/* Facturado */}
        <div>
          <p className="text-xl font-semibold text-gray-800">
            {formatCurrency(facturado)}
          </p>
          <p className="text-sm text-gray-500">facturado</p>
        </div>

        {/* Objetivo */}
        <div className="text-right">
          <p className="text-sm text-gray-400">Objetivo</p>
          <p className="text-sm text-gray-400">{formatCurrency(objetivo)}</p>
        </div>
      </div>

      <ProgressBar progreso={Number(progreso) || 0} />
      <p className="text-right text-sm text-gray-500 mt-1">
        {(Number(progreso) || 0).toFixed(1)}% alcanzado
      </p>
    </div>
  );
};
