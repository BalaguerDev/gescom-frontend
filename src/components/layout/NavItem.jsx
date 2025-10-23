const NavItem = ({ name, icon: Icon, path, isActive, onClick }) => {
  const textColor = isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600";

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transition ${textColor}`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs">{name}</span>
    </button>
  );
};

export default NavItem;
