import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import NavbarMobile from "../components/layout/NavbarMobile";
import BottomNavMobile from "../components/layout/BottomNavMobile";

const Layout = () => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 flex flex-col">
      <NavbarMobile />
      <div className="flex-1 overflow-y-auto p-4">
        <Outlet /> 
      </div>
      <BottomNavMobile />
    </main>
  </div>
);

export default Layout;
