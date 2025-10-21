import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserModal from "../user/UserModal";

const NavbarMobile = () => {
    const { user } = useAuth0();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-sm">
                <Link to="/dashboard" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                    GESCOM
                </Link>                <button onClick={() => setIsModalOpen(true)}>
                    <img
                        src={user?.picture}
                        alt={user?.name}
                        className="w-9 h-9 rounded-full border border-gray-300"
                    />
                    
                </button>
            </header>

            <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default NavbarMobile;
