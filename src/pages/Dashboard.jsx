import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const { user, logout } = useAuth0();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <img
          src={user?.picture}
          alt={user?.name}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
        <p className="text-gray-600 mb-6">{user?.email}</p>

        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
