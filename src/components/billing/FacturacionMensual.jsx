import FacturacionCard from "./FacturacionCard";

export default function FacturacionMensual ({ mensualFacturacion, objetivosCategorias, diasRestantes }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Facturación mensual por familias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Object.entries(objetivosCategorias).map(([key, obj]) => (
          <FacturacionCard
            key={key}
            nombre={key.charAt(0).toUpperCase() + key.slice(1)}
            facturado={mensualFacturacion?.[key] || 0}
            objetivo={obj}
            diasRestantes={diasRestantes}
          />
        ))}
      </div>
    </section>
  );
}
