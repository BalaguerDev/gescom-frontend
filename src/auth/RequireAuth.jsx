import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-gray-700">Cargando...</div>;
  }

  return isAuthenticated ? children : null;
};

export default RequireAuth;
