export default function ToggleVista({ vista, setVista, size = "md" }) {
  const sizeClasses =
    size === "sm"
      ? "text-[11px] p-0.5"
      : "text-[12px] p-1";

  const btnClasses =
    size === "sm"
      ? "px-2.5 py-1"
      : "px-3 py-1";

  return (
    <div
      className={`relative inline-flex bg-gray-200 rounded-full font-semibold select-none ${sizeClasses}`}
    >
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-full transition-all duration-300 ${
          vista === "mes" ? "translate-x-full" : ""
        }`}
      />
      {["año", "mes"].map((v) => (
        <button
          key={v}
          onClick={() => setVista(v)}
          className={`relative z-10 ${btnClasses} rounded-full cursor-pointer ${
            vista === v ? "text-white" : "text-gray-800"
          }`}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
