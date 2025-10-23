import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Buscar cliente..." }) {
  return (
    <div className="relative bg-white rounded-lg shadow-sm w-full">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg 
          focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
      />
    </div>
  );
}
