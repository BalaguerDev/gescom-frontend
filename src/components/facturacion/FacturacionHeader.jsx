import { useState } from "react";
import { SearchInput, ToggleVista } from "../ui";

export default function FacturacionHeader({ vista, setVista, onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <header className="flex flex-col pb-5 sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
      {/* === 📱 MOBILE === */}
      <div className="flex flex-col w-full sm:hidden gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Resumen facturación
          </h2>
          <ToggleVista vista={vista} setVista={setVista} size="sm" />
        </div>

        <SearchInput value={searchTerm} onChange={handleSearch} />
      </div>

      {/* === 💻 DESKTOP === */}
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full gap-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Resumen facturación
        </h2>

        {/* 🔍 Buscador más largo */}
        <div className="flex-1 max-w-[400px]">
          <SearchInput value={searchTerm} onChange={handleSearch} />
        </div>

        <ToggleVista vista={vista} setVista={setVista} />
      </div>
    </header>
  );
}
