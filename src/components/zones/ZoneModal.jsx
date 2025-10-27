"use client";

import { X } from "lucide-react";

export const ZoneModal = ({
  zoneName,
  setZoneName,
  zoneColor,
  setZoneColor,
  setShowModal,
  handleConfirmNewZone,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Nueva zona</h3>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la zona
        </label>
        <input
          type="text"
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ej. Zona Norte"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color de la zona
        </label>
        <input
          type="color"
          value={zoneColor}
          onChange={(e) => setZoneColor(e.target.value)}
          className="w-full h-10 rounded-lg cursor-pointer mb-6"
        />

        <button
          onClick={handleConfirmNewZone}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Guardar zona
        </button>
      </div>
    </div>
  );
};
