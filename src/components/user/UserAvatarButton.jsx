import { useState } from "react";
import { CircleUserRound } from "lucide-react";

const UserAvatarButton = ({ user, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = user?.userImage && !imgError;

  return (
    <button
      onClick={onClick}
      aria-label="Abrir perfil de usuario"
      className="transition-transform hover:scale-105"
    >
      {hasImage ? (
        <img
          src={user.userImage}
          alt={user?.name || "Usuario"}
          onError={() => setImgError(true)}
          className="w-9 h-9 rounded-full border border-gray-300 object-cover"
        />
      ) : (
        <CircleUserRound className="w-9 h-9 text-gray-500" />
      )}
    </button>
  );
};

export default UserAvatarButton;
