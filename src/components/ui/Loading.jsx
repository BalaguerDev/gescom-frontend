import { Loader2 } from "lucide-react";

const Loading = ({ message = "Cargando...", fullscreen = false, size = "md" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const containerClasses = fullscreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <Loader2 className={`animate-spin text-gray-600 ${sizeClasses[size]}`} />
      {message && (
        <p className="mt-3 text-sm font-medium text-gray-600 tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
