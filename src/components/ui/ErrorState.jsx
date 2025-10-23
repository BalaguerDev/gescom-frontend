import { AlertTriangle, RotateCcw } from "lucide-react";

const ErrorState = ({
  message = "Ha ocurrido un error inesperado.",
  onRetry,
  fullscreen = false,
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center animate-fade-in ${
      fullscreen ? "min-h-screen" : "py-12"
    } text-gray-700`}
  >
    <div className="bg-red-50 border border-red-200 rounded-2xl px-8 py-10 shadow-sm w-full max-w-md">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-lg font-semibold mb-2 text-red-600">
        Ocurrió un problema
      </h2>
      <p className="text-sm text-gray-600 mb-6">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
        >
          <RotateCcw size={18} />
          Reintentar
        </button>
      )}
    </div>
  </div>
);

export default ErrorState;
