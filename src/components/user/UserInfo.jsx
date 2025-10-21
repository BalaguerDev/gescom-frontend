import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserModal from "./UserModal";
import { CircleUserRound } from "lucide-react"; // o tu icono específico

const UserInfo = ({ className }) => {
  const { user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => setImgError(true);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`px-6 py-4 border-t border-gray-200 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition ${className}`}
      >
        {user?.picture && !imgError ? (
          <img
            src={user.picture}
            alt={user.name}
            onError={handleImgError}
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center">
            <CircleUserRound
              className="w-6 h-6 text-gray-500"
            />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {user?.name || "Usuario"}
          </p>
          <p className="text-xs text-gray-500">Comercial</p>
        </div>
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default UserInfo;
