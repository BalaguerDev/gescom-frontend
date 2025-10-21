import { useNavigate } from "react-router-dom";

const SidebarItem = ({ name, icon: Icon }) => {
    const navigate = useNavigate();

    // Convierte el nombre en path en minúsculas
    const path = `/${name.toLowerCase()}`;

    return (
        <button
            onClick={() => navigate(path)}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
        >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
        </button>
    );
};

export default SidebarItem;
