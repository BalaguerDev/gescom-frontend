const ClientModalTabs = ({ tabs, activeSection, onSelect }) => (
  <div className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-2 flex-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`px-4 py-2 font-semibold whitespace-nowrap rounded-lg transition cursor-pointer
            ${activeSection === tab.id
              ? "bg-blue-100 text-blue-700 border border-blue-300"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default ClientModalTabs;
