import { useState } from "react";

const FiltroFacturacion = ({ onChange }) => {
  const [selected, setSelected] = useState("año");

  const handleChange = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        className="w-[260px] bg-white shadow-sm border border-gray-200 rounded-xl text-gray-700 p-2"
      >
        <option value="año">Facturación total anual</option>
        <option value="mensual">Mes curso vs año anterior</option>
      </select>
    </div>
  );
};

export default FiltroFacturacion;
