import SidebarItem from "./SidebarItem";
import UserInfo from "../user/UserInfo";
import AppLogo from "../ui/AppLogo";
import { routes } from "@/utils/menuItems";

const Sidebar = () => (
  <aside className="hidden md:flex flex-col justify-between w-64 bg-white shadow-lg">
    <div>
      <div className="px-6 py-6 border-b border-gray-200">
        <AppLogo />
      </div>

      <nav className="flex flex-col mt-6 space-y-1 px-4" aria-label="Menú lateral">
        {routes
          .filter((r) => r.icon)
          .map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
      </nav>
    </div>
    <UserInfo />
  </aside>
);

export default Sidebar;
