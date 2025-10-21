import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "@/utils/menuItems";

const BottomNavMobile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      {routes
        .filter(({ icon }) => icon)
        .map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;
          const textColor = isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600";

          return (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center transition ${textColor}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{name}</span>
            </button>
          );
        })}
    </nav>
  );
};

export default BottomNavMobile;
