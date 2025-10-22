import { DataStateHandler } from "@/components/ui";
import { useAuth0 } from "@auth0/auth0-react";
import { useClients } from "@/hooks/useClients";
import { ClientList } from "@/components/clients"

const Facturacion = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error, reloadClients } = useClients(getAccessTokenSilently);

  return (
    <DataStateHandler
      loading={loading}                
      error={error}                  
      onRetry={reloadClients}
      loadingMessage="Cargando clientes..."
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Facturación</h2>
        <ClientList clients={clients} />
      </div>
    </DataStateHandler>
  );
};

export default Facturacion;
