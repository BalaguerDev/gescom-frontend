import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { fetchClients } from "../api/clients";
import ClientList from "../components/client/ClientList";

const Facturacion = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchClients(getAccessTokenSilently);
      setClients(data);
    };
    loadClients();
  }, [getAccessTokenSilently]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Facturación</h2>
      <ClientList clients={clients} />
    </div>
  );
};

export default Facturacion;
