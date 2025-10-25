import { Users, TrendingUp, Map, Target, Briefcase } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import ClientPage from "../pages/ClientPage";
import BillingPage from "../pages/BillingPage";
import RoutesPage from "../pages/RoutesPage";
// import Facturacion from "@/pages/Facturacion";
// import Objetivos from "@/pages/Objetivos";
// import Oportunidades from "@/pages/Oportunidades";
// import ClientesMapa from "@/pages/ClientesMapa";

export const routes = [
  { name: "Dashboard", path: "/dashboard", Component: Dashboard, icon: null },
  { name: "Clientes", path: "/clientes", Component: ClientPage, icon: Users },
  { name: "Facturacion", path: "/facturacion", Component: BillingPage, icon: TrendingUp },
  { name: "Rutas", path: "/rutas", Component: RoutesPage, icon: Map },
  // { name: "Objetivos", path: "/objetivos", Component: Objetivos, icon: Target },
  // { name: "Oportunidades", path: "/oportunidades", Component: Oportunidades, icon: Briefcase },
];
