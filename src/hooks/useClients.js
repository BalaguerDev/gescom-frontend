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
      setClients(data);
      setError(null);
    } catch (err) {
      console.error("Error cargando clientes:", err);
      setError("Error al obtener clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getAccessTokenSilently) loadClients();
  }, [getAccessTokenSilently]);

  return { clients, loading, error, reloadClients: loadClients };
};
