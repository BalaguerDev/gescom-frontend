import { TrendingUp, Map, Target, Briefcase } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import Facturacion from "@/pages/Facturacion";
import Objetivos from "@/pages/Objetivos";
import Oportunidades from "@/pages/Oportunidades";
import ClientesMapa from "@/pages/ClientesMapa";

export const routes = [
  { name: "Dashboard", path: "/dashboard", Component: Dashboard, icon: null },
  { name: "Clientes en mapa", path: "/clientesMapa", Component: ClientesMapa, icon: Map },
  { name: "Facturacion", path: "/facturacion", Component: Facturacion, icon: TrendingUp },
  { name: "Objetivos", path: "/objetivos", Component: Objetivos, icon: Target },
  { name: "Oportunidades", path: "/oportunidades", Component: Oportunidades, icon: Briefcase },
];
