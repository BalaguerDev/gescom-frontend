import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { buildRouteWithGoogle, paretoClassify } from "../helpers/routeHelpers";

export function useRouteBuilder(clients, routeConfig, isLoaded) {
  const [routeList, setRouteList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const VISIT_DURATION_MIN = 45;

  const totalAvailableMinutes = useMemo(() => {
    const [sH, sM] = routeConfig.startHour.split(":").map(Number);
    const [eH, eM] = routeConfig.endHour.split(":").map(Number);
    const total = eH * 60 + eM - (sH * 60 + sM);
    return total - routeConfig.breakMinutes;
  }, [routeConfig]);

  const priorities = useMemo(() => paretoClassify(clients || []), [clients]);

  useEffect(() => {
    if (!clients.length) {
      setRouteList([]);
      setSelectedClient(null);
      return;
    }

    const sorted = [...clients].sort((a, b) => {
      const pa = priorities[a.id] || "D";
      const pb = priorities[b.id] || "D";
      const order = { A: 0, B: 1, C: 2, D: 3 };
      return order[pa] - order[pb];
    });

    const maxVisits = Math.floor(totalAvailableMinutes / (VISIT_DURATION_MIN + 20));
    const selectedForDay = sorted.slice(0, maxVisits);
    const [h, m] = routeConfig.startHour.split(":").map(Number);
    const startTime = dayjs().hour(h).minute(m).second(0);

    (async () => {
      try {
        if (isLoaded && window.google?.maps?.DirectionsService) {
          const built = await buildRouteWithGoogle(routeConfig.startPoint, selectedForDay, VISIT_DURATION_MIN, startTime);
          setRouteList(built);
          setSelectedClient(built[0] || null);
        } else {
          const fallback = selectedForDay.map((c, idx) => {
            const arrival = startTime.add(idx * (VISIT_DURATION_MIN + 20), "minute");
            return { ...c, arrivalISO: arrival.toISOString(), arrivalHour: arrival.format("HH:mm") };
          });
          setRouteList(fallback);
          setSelectedClient(fallback[0] || null);
        }
      } catch (err) {
        console.error("Error construyendo ruta:", err);
      }
    })();
  }, [clients, priorities, routeConfig, totalAvailableMinutes, isLoaded]);

  return { routeList, selectedClient, setSelectedClient, VISIT_DURATION_MIN };
}
