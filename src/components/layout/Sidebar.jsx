import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import UserInfo from "../user/UserInfo";
import { routes } from "@/utils/menuItems";

const Sidebar = () => (
    <aside className="hidden md:flex flex-col justify-between w-64 bg-white shadow-lg">
        <div>
            <div className="px-6 py-6 border-b border-gray-200">
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                >
                    GESCOM
                </Link>
            </div>

            <nav className="flex flex-col mt-6 space-y-2 px-4">
                {routes
                    .filter((item) => item.icon) // solo rutas con icon
                    .map((item) => (
                        <SidebarItem key={item.name} {...item} />
                    ))}
            </nav>
        </div>
        <UserInfo />
    </aside>
);

export default Sidebar;
