import { useAuth0 } from "@auth0/auth0-react";
import { X } from "lucide-react";

const UserModal = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth0();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white w-80 rounded-lg overflow-hidden shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-6 flex flex-col items-center space-y-4">
          <img
            src={user?.picture}
            alt={user?.name}
            className="w-20 h-20 rounded-full"
          />
          <p className="font-semibold text-gray-800">{user?.name}</p>
          <p className="text-gray-500 text-sm">Comercial</p>
        </div>
        <button
          className="w-full py-3 bg-red-500 text-white font-semibold hover:bg-red-600"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserModal;
