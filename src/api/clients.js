
import { handleApiError } from "@/utils/api.utils"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api"

export const fetchClients = async (getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently()
        const response = await fetch(`${API_URL}/clients`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (!response.ok) throw new Error("Error al obtener clientes")
        const  {data}  = await response.json()
        return { success: true, data }

    } catch (error) {
        return handleApiError(error, "fetchClients")
    }
}