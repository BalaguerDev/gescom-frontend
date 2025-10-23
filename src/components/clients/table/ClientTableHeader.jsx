const ClientTableHeader = ({ headerAnterior, headerActual }) => (
  <thead className="bg-white sticky top-0 z-20 shadow-sm">
    <tr>
      {["Empresa", headerAnterior, headerActual, "%", ""].map(
        (label, idx) => (
          <th
            key={idx}
            className={`px-4 py-3 text-sm font-bold text-gray-700 tracking-wide ${
              idx === 0 ? "text-left" : "text-right"
            }`}
          >
            {label}
          </th>
        )
      )}
    </tr>
  </thead>
);

export default ClientTableHeader;
