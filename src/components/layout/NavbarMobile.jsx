import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserModal from "../user/UserModal";
import UserAvatarButton from "../user/UserAvatarButton";

const NavbarMobile = () => {
  const { user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          GESCOM
        </Link>
        <UserAvatarButton user={user} onClick={() => setIsModalOpen(true)} />
      </header>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default NavbarMobile;
