export const fetchClients = async (getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost:4000/api/clients", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener clientes");
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error(err);
        return [];
    }
};
