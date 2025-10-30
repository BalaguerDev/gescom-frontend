import { TrendingUp, TrendingDown } from "lucide-react";

export default function RouteClientFamilies({ families }) {
  return (
    <section>
      <h3 className="font-semibold text-gray-900 text-lg mb-4">Facturación por familias</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {families.map((f, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold text-gray-800 capitalize">{f.name}</h4>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  f.pctChange >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {f.pctChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Number(f.pctChange).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="text-xs">{f.last.toLocaleString()} €</span>
              <span className="font-semibold text-gray-800">{f.current.toLocaleString()} €</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
