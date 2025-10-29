import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import UserModal from "./UserModal";
import UserAvatarButton from "./UserAvatarButton";

const UserInfo = ({ className }) => {
  const { user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <div
        role="button"
        onClick={() => setIsModalOpen(true)}
        className={`px-6 py-4 border-t border-gray-200 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${className}`}
      >
        {user?.userImage && !imgError ? (
          <UserAvatarButton
            user={user}
            onClick={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
            <CircleUserRound className="w-6 h-6 text-gray-500" />
          </div>
        )}

        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-800">
            {user?.name || "Usuario"}
          </p>
          <p className="text-xs text-gray-500">{user?.email || "Comercial"}</p>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default UserInfo;
