import ClientList from "@/components/clients/ClientList";

const FacturacionClientes = ({ clients, vista, mesActual, añoActual }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      Detalle de clientes
    </h3>
    <ClientList clients={clients} vista={vista} mesActual={mesActual} añoActual={añoActual} />
  </div>
);

export default FacturacionClientes;
