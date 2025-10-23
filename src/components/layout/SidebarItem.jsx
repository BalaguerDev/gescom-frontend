import { useNavigate, useLocation } from "react-router-dom";

const SidebarItem = ({ name, icon: Icon, path }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === path;

  const baseClasses =
    "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer";
  const activeClasses = isActive
    ? "bg-blue-50 text-blue-600"
    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

  return (
    <button
      onClick={() => navigate(path)}
      className={`${baseClasses} ${activeClasses}`}
      aria-label={name}
    >
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </button>
  );
};

export default SidebarItem;
