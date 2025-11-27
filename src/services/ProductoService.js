import { api } from "../config/axiosConfig";

export async function obtenerProductos() {
    try {
        const response = await api.get('/productos'); 
        return response.data;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
}
