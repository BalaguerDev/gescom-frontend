export default function Card({ title, icon, children }) {
  return (
    <div className="bg-linear-to-br from-gray-50 to-white border border-gray-100 p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">{title}</span>
        {icon}
      </div>
      {children}
    </div>
  );
}
