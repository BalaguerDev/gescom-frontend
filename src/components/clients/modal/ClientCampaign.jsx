const ClientCampaign = ({ campanas }) => (
  <ul className="divide-y divide-gray-100">
    {campanas.length === 0 ? (
      <p className="text-gray-500 text-sm">No hay campañas recomendadas.</p>
    ) : (
      campanas.map((c) => (
        <li key={c.id} className="py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition">
          <span>{c.nombre}</span>
        </li>
      ))
    )}
  </ul>
);

export default ClientCampaign;
