import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "@/utils/menuItems";
import NavItem from "./NavItem";

const BottomNavMobile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      {routes.filter(r => r.icon).map(({ name, icon, path }) => (
        <NavItem
          key={name}
          name={name}
          icon={icon}
          path={path}
          isActive={pathname === path}
          onClick={() => navigate(path)}
        />
      ))}
    </nav>
  );
};

export default BottomNavMobile;
