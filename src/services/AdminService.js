import { api } from "../config/axiosConfig";

// ========== USUARIOS ==========
export const getUsuarios = async () => {
    const response = await api.get('/usuarios');
    return response.data;
};

export const getUsuarioById = async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
};

export const updateUsuario = async (id, userData) => {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data;
};

export const deleteUsuario = async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
};

// ========== PRODUCTOS (CRUD completo para admin) ==========
export const createProducto = async (productoData) => {
    const response = await api.post('/productos', productoData);
    return response.data;
};

export const updateProducto = async (id, productoData) => {
    const response = await api.put(`/productos/${id}`, productoData);
    return response.data;
};

export const deleteProducto = async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
};

// ========== POSTS (admin puede eliminar cualquier post) ==========
export const getAllPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

export const deletePostAdmin = async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
};
