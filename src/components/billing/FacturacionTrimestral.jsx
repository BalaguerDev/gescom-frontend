import { formatters } from "@/utils/formatters";

export default function FacturacionTrimestral({
  trimestreActual,
  trimestralFacturacion,
  objetivosTrimestralesFamilias,
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Facturación Trimestral
      </h2>

      {/* En móvil solo muestra la card activa, en desktop muestra todas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.keys(objetivosTrimestralesFamilias).map((q) => {
          const factQ = trimestralFacturacion?.[q] || {};
          const totalQ = Object.values(factQ).reduce((a, b) => a + b, 0);
          const objetivoQ = Object.values(objetivosTrimestralesFamilias[q]).reduce(
            (a, b) => a + b,
            0
          );
          const isActive = q === trimestreActual;

          return (
            <div
              key={q}
              className={`
                rounded-xl border p-4 shadow-sm transition-all duration-500
                ${isActive ? "bg-white border-gray-200 shadow-md" : "bg-gray-50 border-gray-100 opacity-40 pointer-events-none"}
                ${!isActive ? "hidden" : "block"}  /* oculta no activo en móvil */
                md:block                        /* siempre visible en desktop */
              `}
            >
              <div className="flex justify-between items-center mb-2">
                <h3
                  className={`font-semibold ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {q}
                </h3>
              </div>

              <p className="text-xs flex justify-between">
                <span className="font-semibold text-gray-900">
                  {formatters.currency(totalQ)}
                </span>
                <span className="text-gray-400">
                  / {formatters.currency(objetivoQ)}
                </span>
              </p>

              <div className="mt-3 space-y-2 border-t pt-2">
                {Object.keys(objetivosTrimestralesFamilias[q]).map((cat) => {
                  const fact = factQ[cat] || 0;
                  const obj = objetivosTrimestralesFamilias[q][cat];
                  const prog = (fact / obj) * 100;
                  const color =
                    prog >= 100
                      ? "text-green-600"
                      : prog >= 70
                      ? "text-orange-500"
                      : "text-red-500";

                  return (
                    <div key={cat}>
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-medium text-gray-700 capitalize">
                          {cat}
                        </p>
                        <span className={`text-xs font-semibold ${color}`}>
                          {prog.toFixed(1)}%
                        </span>
                      </div>

                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{formatters.currency(fact)}</span>
                        <span className="text-gray-400">
                          / {formatters.currency(obj)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
