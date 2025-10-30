import { useState } from "react";
import { X } from "lucide-react";

export default function VisitModal({ clientName, onClose, onSubmit }) {
  const [status, setStatus] = useState(null); // "visitado" | "no-visitado"
  const [notes, setNotes] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    const data = {
      status,
      notes: status === "visitado" ? notes : reason,
      date: new Date(),
    };
    onSubmit(data);
  };

  const reasons = [
    "Cliente cerrado",
    "No estaba el responsable de compras",
    "Me dijeron que pasara otro día",
    "No se pudo acceder",
    "Otro motivo",
  ];

  

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Registrar visita
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Cliente: <span className="font-medium text-gray-800">{clientName}</span>
        </p>

        {/* Checklist */}
        <div className="flex justify-center gap-6 mb-5">
          <button
            onClick={() => setStatus("visitado")}
            className={`px-4 py-2 rounded-lg border ${
              status === "visitado"
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200 text-gray-600 hover:border-green-300"
            }`}
          >
            ✅ Visitado
          </button>
          <button
            onClick={() => setStatus("no-visitado")}
            className={`px-4 py-2 rounded-lg border ${
              status === "no-visitado"
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-gray-200 text-gray-600 hover:border-red-300"
            }`}
          >
            ❌ No visitado
          </button>
        </div>

        {/* Campos dinámicos */}
        {status === "visitado" && (
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Notas de la visita
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Escribe detalles sobre la visita..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
        )}

        {status === "no-visitado" && (
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Motivo
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-indigo-200 focus:border-indigo-400"
            >
              <option value="">Seleccionar motivo</option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!status || (status === "visitado" && !notes) || (status === "no-visitado" && !reason)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
              !status || (status === "visitado" && !notes) || (status === "no-visitado" && !reason)
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
