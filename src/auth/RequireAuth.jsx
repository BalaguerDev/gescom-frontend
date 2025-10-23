import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@/components/ui/Loading"


const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated){
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) return <Loading fullscreen message="Cargando sesión..." />;
  return isAuthenticated ? children : null
}

export default RequireAuth;
