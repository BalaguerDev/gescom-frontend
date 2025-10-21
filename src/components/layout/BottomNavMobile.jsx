import { useNavigate, useLocation } from "react-router-dom";

const BottomNavItem = ({ name, icon: Icon, path }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <button
            onClick={() => navigate(path)}
            className={`flex flex-col items-center transition ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
        >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{name}</span>
        </button>
    );
};

export default BottomNavItem;
