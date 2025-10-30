export default function Card({ title, icon, children, badge }) {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badge.color}`}>
              {badge.text}
            </span>
          )}
          {icon}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
