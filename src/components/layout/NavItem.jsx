const NavItem = ({ name, icon: Icon, isActive, onClick }) => {
  const baseClasses =
    "flex flex-col items-center text-xs transition-colors duration-200";
  const activeClass = isActive
    ? "text-blue-600"
    : "text-gray-600 hover:text-blue-600";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClass}`}
      aria-label={name}
    >
      <Icon className="w-6 h-6" />
      <span>{name}</span>
    </button>
  );
};

export default NavItem;
