import { Phone, Mail, Building2, MapPin, User } from "lucide-react";

const ClientContacto = ({ client }) => (
  <div className="p-4 rounded-lg shadow-sm space-y-3 bg-white">
    {/* Cliente */}
    <div>
      <p className="font-semibold mb-1">Cliente:</p>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
        <span className="truncate text-gray-700">{client.name}</span>
        <User size={18} className="text-gray-400" />
      </div>
    </div>

    {/* CIF */}
    <div>
      <p className="font-semibold mb-1">CIF:</p>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
        <span className="truncate text-gray-700">{client.cif}</span>
        <Building2 size={18} className="text-gray-400" />
      </div>
    </div>

    {/* Dirección */}
    <div>
      <p className="font-semibold mb-1">Dirección:</p>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
        <span className="truncate text-gray-700">{client.address}</span>
          <MapPin size={18} className="text-gray-400" />
      </div>
    </div>

    {/* Email */}
    <div>
      <p className="font-semibold mb-1">Email:</p>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
        <span className="truncate text-gray-700">{client.email}</span>
        {client.email && (
          <a
            href={`mailto:${client.email}`}
            className="text-blue-500 hover:text-blue-700 transition ml-2"
            title="Enviar correo"
          >
            <Mail size={18} />
          </a>
        )}
      </div>
    </div>

    {/* Teléfono */}
    <div>
      <p className="font-semibold mb-1">Teléfono:</p>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
        <span className="text-gray-700">{client.phone}</span>
        {client.phone && (
          <a
            href={`tel:${client.phone}`}
            className="text-blue-500 hover:text-blue-700 transition ml-2"
            title="Llamar"
          >
            <Phone size={18} />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ClientContacto;
