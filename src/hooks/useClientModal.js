import { useState, useMemo } from "react";

export const useClientModal = (client) => {
  const [activeSection, setActiveSection] = useState("contacto");
  const [pedidoDetalle, setPedidoDetalle] = useState(null);

  const ultimosPedidos = useMemo(() => {
    return [...(client?.orders || [])].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [client]);

  const campañas = useMemo(() => {
    const all = [
      { id: 1, ref: "REF-001", nombre: "Campaña 10% OFF REF-001" },
      { id: 2, ref: "REF-003", nombre: "Campaña nueva colección" },
    ];
    return all.filter((c) =>
      client?.references?.some((r) => r.code === c.ref)
    );
  }, [client]);

  const tabs = [
    { id: "contacto", label: "Contacto" },
    { id: "pedidos", label: "Últimos pedidos" },
    { id: "campañas", label: `Campañas (${campañas.length})` },
  ];

  return {
    activeSection,
    setActiveSection,
    pedidoDetalle,
    setPedidoDetalle,
    ultimosPedidos,
    campañas,
    tabs,
  };
};
