import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import NavbarMobile from "@/components/layout/NavbarMobile";
import BottomNavMobile from "@/components/layout/BottomNavMobile";

const Layout = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [offsets, setOffsets] = useState({ top: 0, bottom: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const updateOffsets = () => {
      const top = topRef.current?.offsetHeight || 0;
      const bottom = bottomRef.current?.offsetHeight || 0;
      setOffsets({ top, bottom });
      setIsMobile(window.innerWidth < 768);
    };

    updateOffsets();
    window.addEventListener("resize", updateOffsets);
    return () => window.removeEventListener("resize", updateOffsets);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 🔹 Sidebar solo visible en escritorio */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* 🔹 Contenedor principal */}
      <main className="flex-1 flex flex-col relative overflow-x-hidden">
        {/* 🔹 Navbar solo en móvil */}
        <div ref={topRef} className="md:hidden fixed top-0 left-0 w-full z-30">
          <NavbarMobile />
        </div>

        <section
          className={`flex-1 overflow-y-auto px-5 sm:px-6 md:pt-10 md:pb-10 max-w-full ${isMobile ? "" : "p-6"
            }`}
          style={
            isMobile
              ? {
                paddingTop: `${offsets.top + 10}px`, // +10px de margen visual
                paddingBottom: `${offsets.bottom + 70}px`,
              }
              : {}
          }
        >
          <Outlet />
        </section>

        {/* 🔹 Bottom nav solo en móvil */}
        <div
          ref={bottomRef}
          className="md:hidden fixed bottom-0 left-0 w-full z-30"
        >
          <BottomNavMobile />
        </div>
      </main>
    </div>
  );
};

export default Layout;
