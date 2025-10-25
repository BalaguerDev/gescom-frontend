import { Users } from "lucide-react";

export default function ClientTipologiaCard({ clients = [] }) {
  if (!Array.isArray(clients)) return null;

  const tipoCounts = clients.reduce(
    (acc, client) => {
      const tipo = client.tipo?.toUpperCase?.() || "C";
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    },
    { A: 0, B: 0, C: 0 }
  );

  return (
<>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Distribución por tipología</h3>
          <div className="flex gap-6 mt-2">
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-green-600">{tipoCounts.A}</span>
              <span className="text-xs text-gray-500">A</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-orange-500">{tipoCounts.B}</span>
              <span className="text-xs text-gray-500">B</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-700">{tipoCounts.C}</span>
              <span className="text-xs text-gray-500">C</span>
            </div>
          </div>
        </div>
        <Users className="text-gray-400" size={28} />
</>

  );
}
