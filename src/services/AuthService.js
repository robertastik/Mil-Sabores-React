import { api } from "../config/axiosConfig";

export const loginAuth = async(email, password) => {
    const response = await api.post('/auth/login', {email, password});
    return response.data;
};

export const registerAuth = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};
