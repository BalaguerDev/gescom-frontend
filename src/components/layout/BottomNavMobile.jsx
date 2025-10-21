import { useNavigate } from "react-router-dom";
import { routes } from "@/utils/menuItems";

const BottomNavMobile = () => {
    const navigate = useNavigate();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
            {routes
                .filter((item) => item.icon)
                .map(({ name, icon: Icon }) => (
                    <button
                        key={name}
                        onClick={() => navigate(`/${name.toLowerCase()}`)}
                        className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
                    >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs">{name}</span>
                    </button>
                ))}
        </nav>
    );
};

export default BottomNavMobile;
