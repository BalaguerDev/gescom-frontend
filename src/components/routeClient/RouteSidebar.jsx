import { RouteIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

export function RouteSidebar({ routeList, selectedClient, onSelect }) {
  const { profile } = useUserProfile("http://localhost:4000");

  const handleExportToGoogleMaps = () => {
    if (!routeList?.length) return;

    // 🏁 Puntos de inicio y fin desde el perfil
    const origin = encodeURIComponent(profile?.startPoint || "Barcelona");
    const destination = encodeURIComponent(profile?.endPoint || "Barcelona");

    // 📍 Clientes intermedios como paradas
    const waypoints = routeList
      .map((c) => encodeURIComponent(c.address || c.name))
      .join("|");

    // 🗺️ Construir URL final
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ""
      }`;

    window.open(url, "_blank");
  };

  return (
    <aside className="overflow-auto from-gray-50 to-white sm:px-10 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-center md:text-left">
          Visitas diarias
        </h3>
        <button
          onClick={handleExportToGoogleMaps}
          className="text-blue-600 hover:text-blue-700 transition active:scale-95"
          title="Ver ruta completa en Google Maps"
        >
          <RouteIcon size={20} />
        </button>
      </div>

      <ul className="space-y-2">
        {routeList.map((c) => (
          <li
            key={c.id}
            className={`p-3 rounded-lg cursor-pointer transition ${selectedClient?.id === c.id
                ? "bg-indigo-100 border border-indigo-300"
                : "hover:bg-gray-200"
              }`}
            onClick={() => onSelect(c)}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">{c.name}</span>
              <span className="text-xs text-gray-500">{c.arrivalHour}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
