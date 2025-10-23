import { useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, size = "md", arrowBack }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} p-6 relative transform transition-all scale-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="relative flex items-center justify-center mb-4 h-8">
          {/* Botón Volver */}
          {arrowBack && (
            <button
              onClick={arrowBack}
              className="absolute left-0 flex items-center gap-1 text-blue-500 hover:text-blue-700 text-[14px] h-full cursor-pointer"
            >
              <ArrowLeft size={14} /> Volver
            </button>
          )}

          {/* Título centrado */}
          <h2 className="text-lg font-bold text-center truncate">{title}</h2>

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="absolute right-0 text-gray-400 hover:text-gray-700 flex items-center h-full cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
