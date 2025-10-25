import { AlertCircle, Sparkles } from "lucide-react";

export default function BillingInsights({ insights }) {
  // Ejemplo si no recibes datos dinámicos
  const defaultInsights = [
    {
      type: "alert",
      text: "Accesorios bajan un 12% vs septiembre",
      color: "text-yellow-600",
      icon: AlertCircle,
    },
    {
      type: "positive",
      text: "Herramienta supera el objetivo (+6.4%)",
      color: "text-green-600",
      icon: Sparkles,
    },
  ];

  const data = insights || defaultInsights;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Recomendaciones del mes
      </h2>

      <div className="bg-gray-50 mb-15 border rounded-xl p-5 text-sm text-gray-700 space-y-3 shadow-sm">
        {data.map((item, i) => {
          const Icon = item.icon;
          return (
            <p key={i} className={`flex items-center gap-2 ${item.color}`}>
              <Icon className="w-4 h-4" />
              {item.text}
            </p>
          );
        })}

        <div className="mt-3 border-t pt-2">
          <p className="font-medium text-gray-800">💬 Top clientes del mes:</p>
          <ul className="list-decimal ml-5 text-gray-700 text-sm">
            <li>Ferretería Delta (+23%)</li>
            <li>ToolsPro</li>
            <li>Aluminis Manresa</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
