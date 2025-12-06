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
        const role = localStorage.getItem('role');

        if (token) {
            setIsAuthenticated(true);
            setUser({ email, role: role || 'USER' }); 
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginAuth(email, password);
            
            console.log("🔐 Respuesta del login:", data); // DEBUG: Ver qué devuelve el backend
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role || 'USER');

            setUser({ email: data.email, role: data.role || 'USER' });
            setIsAuthenticated(true);
            
            // Dispatch custom event to notify CartContext to refresh user profile
            window.dispatchEvent(new CustomEvent('auth-change'));
            
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
        localStorage.removeItem('role');
        setUser(null);
        setIsAuthenticated(false);
        
        // Dispatch custom event to notify CartContext to clear user profile
        window.dispatchEvent(new CustomEvent('auth-change'));
    };

    const isAdmin = () => user?.role === 'ADMIN';

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};