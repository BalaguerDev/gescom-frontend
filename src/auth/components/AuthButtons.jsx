import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;

  const handleClick = () =>
    isAuthenticated
      ? logout({ logoutParams: { returnTo: window.location.origin } })
      : loginWithRedirect();

  return (
    <button onClick={handleClick}>
      {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
    </button>
  );
};

export default AuthButtons;
