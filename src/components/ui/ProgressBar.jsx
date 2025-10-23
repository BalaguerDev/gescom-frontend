const ProgressBar = ({ progreso }) => {
  const getColorClass = (valor) => {
    if (valor < 50) return "bg-red-500";
    if (valor < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden" aria-valuenow={progreso}>
      <div
        className={`h-2 ${getColorClass(progreso)} transition-all duration-500 ease-out`}
        style={{ width: `${progreso}%` }}
      />
    </div>
  );
};

export default ProgressBar;
