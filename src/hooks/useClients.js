import { useState, useEffect, useCallback } from "react";
import { fetchClients } from "@/api/clients";

export const useClients = (getAccessTokenSilently) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadClients = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { success, data, error: apiError } = await fetchClients(getAccessTokenSilently)

      if (!success) throw new Error(apiError || "Error desconocido al obtener clientes");
      setClients(data || [])
    } catch (err) {
      console.error("❌ [useClients] Error al cargar clientes:", err);
      setClients([]);
      setError("No se pudieron obtener los clientes. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (getAccessTokenSilently) loadClients();
  }, [getAccessTokenSilently, loadClients]);

  return { clients, loading, error, reload: loadClients };
};