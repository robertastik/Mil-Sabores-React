import axios from 'axios';


// la variable >> API << contiene el resultado de la >> funcion CREATE de axios <<
// funcion la cual toma la >> ruta base del backend << y la configura como >> JSON << para ser
// pasada a las demas  >> funciones de servicios <<
export const api = axios.create({
    baseURL: 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("Sesión expirada o acceso denegado.");
        }
        return Promise.reject(error);
    }
);