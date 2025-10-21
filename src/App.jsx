import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // Si no está logueado, lo redirigimos automáticamente
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) return <div>Cargando...</div>;

  return isAuthenticated ? <Dashboard /> : null;
};

export default App;
