import { useAuth0 } from "@auth0/auth0-react";

export const useApi = () => {
    const { getAccessTokenSilently } = useAuth0();

    const callApi = async (endpoint, options = {}) => {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
        return res.json();
    }
    return { callApi };
}