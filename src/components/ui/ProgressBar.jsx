const ProgressBar = ({ progreso }) => {
  const getColorClass = (valor) => {
    if (valor < 50) return "bg-red-500";
    if (valor < 100) return "bg-orange-400";
    return "bg-green-500";
  };

  return (
    <div
      className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden shadow-inner"
      aria-valuenow={progreso}
    >
      <div
        className={`h-2.5 ${getColorClass(progreso)} transition-all duration-700 ease-out rounded-full`}
        style={{ width: `${Math.min(progreso, 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
