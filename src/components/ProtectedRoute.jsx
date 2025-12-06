import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protege rutas que requieren autenticación
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cafe-blanco flex items-center justify-center">
        <div className="text-cafe-oscuro text-xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Protege rutas que requieren rol de ADMIN
export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cafe-blanco flex items-center justify-center">
        <div className="text-cafe-oscuro text-xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
