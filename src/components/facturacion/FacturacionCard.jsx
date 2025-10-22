export const FacturacionCard = ({ titulo, facturado, objetivo, progreso }) => {
  const getColorClass = (valor) => {
    if (valor < 50) return "bg-red-400";
    if (valor < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{titulo}</h3>

      <div className="flex justify-between items-start mb-2">
        {/* Facturado */}
        <div>
          <p className="text-xl font-semibold text-gray-800">
            {facturado.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
          <p className="text-sm text-gray-500">facturado</p>
        </div>

        {/* Objetivo */}
        <div className="text-right">
          <p className="text-sm text-gray-400">Objetivo</p>
          <p className="text-sm text-gray-400">
            {objetivo.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </div>
      </div>

      {/* Barra progreso */}
      <div className="w-full bg-gray-100 h-2 rounded-full">
        <div
          className={`h-2 rounded-full ${getColorClass(
            progreso
          )} transition-all duration-300`}
          style={{ width: `${progreso}%` }}
        ></div>
      </div>

      <p className="text-right text-sm text-gray-500 mt-1">
        {progreso.toFixed(1)}% alcanzado
      </p>
    </div>
  );
};
