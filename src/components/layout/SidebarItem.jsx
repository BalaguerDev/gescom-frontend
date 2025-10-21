import { useNavigate, useLocation } from "react-router-dom";

const SidebarItem = ({ name, icon: Icon, path }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <button
            onClick={() => navigate(path)}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition
        ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
        >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
        </button>
    );
};

export default SidebarItem;
