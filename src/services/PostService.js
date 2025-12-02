import { api } from "../config/axiosConfig";

export const getPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error("Error al obtener posts:", error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        const response = await api.post('/posts', postData);
        return response.data;
    } catch (error) {
        console.error("Error al crear post:", error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await api.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar post:", error);
        throw error;
    }
};