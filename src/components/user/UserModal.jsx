import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";
import { Modal } from "@/components/ui";

const UserModal = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title="Perfil de usuario">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={user?.picture}
          alt={user?.name}
          className="w-20 h-20 rounded-full border border-gray-300 object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {user?.name || "Usuario"}
          </p>
          <p className="text-sm text-gray-500 mt-1">Comercial</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </Modal>
  );
};

export default UserModal;
