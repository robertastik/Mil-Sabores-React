import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Componentes compartidos
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer";

// Páginas de usuario
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Registro";
import Profile from "./pages/Profile";
import Productos from "./pages/Productos";
import Blog from "./pages/Blog";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";

// Páginas de admin
import AdminHome from "./pages/admin/AdminHome";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminPosts from "./pages/admin/AdminPosts";

import { CartProvider } from "./context/CartContext";

// Layout para usuarios normales
function UserLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<h1 className="text-center py-20 text-2xl">404 - Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

// Layout para administradores
function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // Si está autenticado y es admin, mostrar layout de admin
  const showAdminLayout = isAuthenticated && isAdmin();

  return (
    <CartProvider>
      {showAdminLayout ? <AdminLayout /> : <UserLayout />}
    </CartProvider>
  );
}
