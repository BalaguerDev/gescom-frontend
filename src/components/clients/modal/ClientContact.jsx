import { Phone, Mail, Building2, MapPin, User } from "lucide-react";

const ClientContacto = ({ client }) => (
  <div className="p-4 rounded-lg shadow-sm space-y-3 bg-white">
    {["Cliente", "CIF", "Dirección", "Email", "Teléfono"].map((label, idx) => {
      const icons = [User, Building2, MapPin, Mail, Phone];
      const values = [client.name, client.cif, client.address, client.email, client.phone];
      const Icon = icons[idx];
      return (
        <div key={idx}>
          <p className="font-semibold mb-1">{label}:</p>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
            <span className="truncate text-gray-700">{values[idx]}</span>
            {["Email", "Teléfono"].includes(label) && values[idx] ? (
              <a
                href={`${label === "Email" ? "mailto:" : "tel:"}${values[idx]}`}
                className="text-blue-500 hover:text-blue-700 transition ml-2"
                title={label === "Email" ? "Enviar correo" : "Llamar"}
              >
                <Icon size={18} />
              </a>
            ) : (
              <Icon size={18} className="text-gray-400" />
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export default ClientContacto;
