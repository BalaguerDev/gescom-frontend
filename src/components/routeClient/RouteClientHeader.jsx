import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "../ui/Button";
import dayjs from "dayjs";

export default function RouteClientHeader({
  name,
  address,
  phone,
  email,
  riskLevel,
  onStartRoute,
}) {
  const riskColor =
    riskLevel === "Alto"
      ? "text-red-600"
      : riskLevel === "Medio"
      ? "text-orange-500"
      : "text-green-600";

  return (
    <header className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{name}</h1>
          <span className={`text-sm font-medium ${riskColor}`}>Riesgo: {riskLevel}</span>
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
        <Button
          onClick={onStartRoute}
          className="px-4 py-2 rounded-xl shadow-sm w-full sm:w-auto"
        >
          Iniciar visita
        </Button>
        <span className="text-xs text-gray-400">
          Última visita: {dayjs().subtract(10, "day").format("DD/MM/YYYY")}
        </span>
      </div>
    </header>
  );
}
