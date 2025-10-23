import { useState, useEffect } from "react";
import { fetchClients } from "@/api/clients";

export const useClients = (getAccessTokenSilently) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await fetchClients(getAccessTokenSilently);
      setClients(data || []);
      setError(null);
      console.debug("[useClients] Clientes cargados:", data?.length || 0);
    } catch (err) {
      console.error("[useClients] Error:", err);
      setError("No se pudieron obtener los clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getAccessTokenSilently) loadClients();
  }, [getAccessTokenSilently]);

  return {
    clients,
    loading,
    error,
    reload: loadClients,
  };
};
