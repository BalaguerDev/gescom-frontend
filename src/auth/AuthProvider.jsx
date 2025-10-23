import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    console.error("⚠️ Faltan variables de entorno para Auth0: VITE_AUTH0_DOMAIN o VITE_AUTH0_CLIENT_ID");
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`,
        audience,
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
