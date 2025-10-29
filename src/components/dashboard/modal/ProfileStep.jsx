export default function ProfileStep({ userName, setUserName, userImage, setUserImage }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Personaliza tu cuenta agregando tu nombre y foto de perfil. Esto nos ayudará a identificarte en la plataforma y mejorar tu experiencia.
      </p>

      <div>
        <label className="block mb-1 font-medium">Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre completo"
          className="w-full border p-2 rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Foto de perfil</label>
        <input
          type="text"
          placeholder="URL de tu foto"
          className="w-full border p-2 rounded"
          value={userImage}
          onChange={(e) => setUserImage(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">
          Puedes usar cualquier URL de imagen o subirla en tu perfil más adelante.
        </p>
      </div>
    </div>
  );
}
