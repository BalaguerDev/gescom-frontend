import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import NavbarMobile from "@/components/layout/NavbarMobile";
import BottomNavMobile from "@/components/layout/BottomNavMobile";

const Layout = () => (
  <div className="flex h-screen bg-gray-50 overflow-hidden">
    {/* 🔹 Sidebar solo visible en escritorio */}
    <div className="hidden md:flex">
      <Sidebar />
    </div>

    {/* 🔹 Contenedor principal */}
    <main className="flex-1 flex flex-col relative overflow-x-hidden">
      {/* 🔹 Navbar solo en móvil */}
      <div className="md:hidden fixed top-0 left-0 w-full z-30">
        <NavbarMobile />
      </div>

      {/* 🔹 Contenido principal */}
      <section className="flex-1 overflow-y-auto p-5 sm:p-6 pt-[70px] pb-20 md:pt-10 md:pb-10 max-w-full">
        <Outlet />
      </section>

      {/* 🔹 Bottom nav solo en móvil */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-30">
        <BottomNavMobile />
      </div>
    </main>
  </div>
);

export default Layout;
