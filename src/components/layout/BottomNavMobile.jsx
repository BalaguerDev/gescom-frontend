import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "@/utils/menuItems";
import NavItem from "./NavItem";

const BottomNavMobile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavClick = (path) => navigate(path)
  const isActive = (path) => pathname === path

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 shadow-sm"
      aria-label="Navegación inferior móvil"
    >
      {routes
        .filter((r) => r.icon)
        .map(({ name, icon, path }) => (
          <NavItem
            key={name}
            name={name}
            icon={icon}
            path={path}
            isActive={isActive(path)}
            onClick={() => handleNavClick(path)}
          />
        ))}
    </nav>
  );
};

export default BottomNavMobile;