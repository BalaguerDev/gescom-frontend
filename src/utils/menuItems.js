import { Users, Map, Gift, Target } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import Clientes from "@/pages/Clientes";
import Mapa from "@/pages/Mapa";
import Promociones from "@/pages/Promociones";
import Prospecciones from "@/pages/Prospecciones";

export const routes = [
    { name: "Dashboard", path: "/dashboard", Component: Dashboard, icon: null },
    { name: "Clientes", path: "/clientes", Component: Clientes, icon: Users },
    { name: "Mapa", path: "/mapa", Component: Mapa, icon: Map },
    { name: "Promociones", path: "/promociones", Component: Promociones, icon: Gift },
    { name: "Prospecciones", path: "/prospecciones", Component: Prospecciones, icon: Target },
];
