const UserAvatarButton = ({ user, onClick }) => (
  <button
    onClick={onClick}
    aria-label="Abrir perfil de usuario"
    className="transition-transform hover:scale-105"
  >
    <img
      src={user?.picture}
      alt={user?.name || "Usuario"}
      className="w-9 h-9 rounded-full border border-gray-300 object-cover"
    />
  </button>
);

export default UserAvatarButton;
