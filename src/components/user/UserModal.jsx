import { X, LogOut, CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const UserModal = ({ isOpen, onClose, user }) => {
  const { logout } = useAuth0();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative animate-fadeIn">
        {/* Botón de cierre del modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagen del usuario */}
        <div className="flex flex-col items-center gap-3">
          {user?.userImage ? (
            <img
              src={user.userImage}
              alt={user?.name || "Usuario"}
              className="w-20 h-20 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <span className="text-2xl"><CircleUserRound/></span>
            </div>
          )}

          <h2 className="text-lg font-semibold text-gray-800">
            {user?.name || "Usuario"}
          </h2>
          <p className="text-sm text-gray-500">{user?.email || "Sin email"}</p>
        </div>

        {/* Datos adicionales */}
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          {user?.nickname && (
            <p>
              <span className="font-medium text-gray-800">Usuario: </span>
              {user.nickname}
            </p>
          )}
          {user?.sub && (
            <p className="truncate">
              <span className="font-medium text-gray-800">ID: </span>
              {user.sub}
            </p>
          )}
          {user?.updated_at && (
            <p>
              <span className="font-medium text-gray-800">
                Última actualización:{" "}
              </span>
              {new Date(user.updated_at).toLocaleString()}
            </p>
          )}
        </div>

        {/* Botón de logout */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
