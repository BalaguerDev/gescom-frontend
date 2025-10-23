import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserModal from "../user/UserModal";
import UserAvatarButton from "../user/UserAvatarButton";
import AppLogo from "../ui/AppLogo";

const NavbarMobile = () => {
  const { user } = useAuth0();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        <AppLogo />
        <UserAvatarButton user={user} onClick={() => setShowModal(true)} />
      </header>

      <UserModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default NavbarMobile;
