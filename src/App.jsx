import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppRouter from "@/routes/AppRouter";

const App = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated, isLoading, loginWithRedirect]);

    if (isLoading) return <div>Cargando...</div>;

    return isAuthenticated ? <AppRouter /> : null;
};

export default App;
