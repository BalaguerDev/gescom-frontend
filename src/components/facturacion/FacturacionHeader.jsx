const FacturacionHeader = ({ vista, setVista }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
      Resumen facturación
    </h2>

    <div className="relative inline-flex bg-gray-200 rounded-full p-1 text-[12px] font-semibold select-none">
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-full transition-all duration-300 ${
          vista === "mes" ? "translate-x-full" : ""
        }`}
      />
      <button
        onClick={() => setVista("anual")}
        className={`relative z-10 px-3 py-1 rounded-full ${
          vista === "anual" ? "text-white" : "text-gray-800"
        }`}
      >
        AÑO
      </button>
      <button
        onClick={() => setVista("mes")}
        className={`relative z-10 px-3 py-1 rounded-full ${
          vista === "mes" ? "text-white" : "text-gray-800"
        }`}
      >
        MES
      </button>
    </div>
  </div>
);
export default FacturacionHeader;
