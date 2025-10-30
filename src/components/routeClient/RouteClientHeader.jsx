import { useState } from "react";
import dayjs from "dayjs";
import { MapPin, Phone, Mail, Info } from "lucide-react";
import VisitModal from "./modal/VisitModal";

export default function RouteClientHeader({
  name,
  address,
  phone,
  email,
  riskLevel,
  onStartRoute,
}) {
  const [showModal, setShowModal] = useState(false);

  const riskColor =
    riskLevel === "Alto"
      ? "text-red-600"
      : riskLevel === "Medio"
      ? "text-orange-500"
      : "text-green-600";

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8 bg-white p-5 rounded-2xl shadow-md">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{name}</h1>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${riskColor}`}
              title="Nivel de riesgo del cliente"
            >
              Riesgo: {riskLevel} <Info size={14} className="text-gray-400" />
            </span>
          </div>
          <p className="text-gray-600 text-sm flex items-center gap-2 flex-wrap">
            <MapPin size={16} className="text-gray-400" /> {address}
          </p>
          <div className="flex flex-wrap gap-3 mt-2 text-gray-500 text-sm">
            {phone && (
              <p className="flex items-center gap-1">
                <Phone size={14} /> {phone}
              </p>
            )}
            {email && (
              <p className="flex items-center gap-1">
                <Mail size={14} /> {email}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start md:items-end">
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-xl shadow-md bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium hover:scale-105 transition"
          >
            Registrar visita
          </button>
          <span className="text-xs text-gray-400 cursor-pointer hover:underline">
            Última visita: {dayjs().subtract(10, "day").format("DD/MM/YYYY")}
          </span>
        </div>
      </header>

      {showModal && <VisitModal onClose={() => setShowModal(false)} clientName={name} />}
    </>
  );
}
