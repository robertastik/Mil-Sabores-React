import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Registro";
import Profile from "./pages/Profile";
import Productos from "./pages/Productos";
import Blog from "./pages/Blog";

export default function App() {
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
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
