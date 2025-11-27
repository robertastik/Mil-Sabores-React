/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { loginAuth, registerAuth } from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider.");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email'); 

        if (token) {
            setIsAuthenticated(true);
            setUser({ email }); 
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginAuth(email, password);
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);

            setUser({ email: data.email });
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            await registerAuth(userData);
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};