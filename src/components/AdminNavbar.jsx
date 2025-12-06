/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-cafe-oscuro p-4 z-20 sticky top-0 border-b-2 border-cafe-claro shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Logo - Izquierda */}
        <div className="flex items-center gap-3 justify-start">
          <span className="text-cafe-claro text-3xl font-titulo">Mil Sabores</span>
          <span className="bg-cafe-claro text-cafe-oscuro text-xs font-bold px-2 py-1 rounded-full">
            ADMIN
          </span>
        </div>

        {/* Navigation Links - Centro */}
        <ul className="flex gap-6 items-center justify-center">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `text-cafe-claro font-texto transition-colors ${
                  isActive ? "border-b-2 border-white pb-1" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/productos"
              className={({ isActive }) =>
                `text-cafe-claro font-texto transition-colors ${
                  isActive ? "border-b-2 border-white pb-1" : ""
                }`
              }
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                `text-cafe-claro font-texto transition-colors ${
                  isActive ? "border-b-2 border-white pb-1" : ""
                }`
              }
            >
              Usuarios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/posts"
              className={({ isActive }) =>
                `text-cafe-claro font-texto transition-colors ${
                  isActive ? "border-b-2 border-white pb-1" : ""
                }`
              }
            >
              Posts
            </NavLink>
          </li>
        </ul>

        {/* User Info & Logout - Derecha */}
        <div className="flex items-center gap-4 justify-end">
          <div className="text-cafe-claro text-sm">
            <span className="opacity-80">Sesión:</span>{" "}
            <span className="font-bold">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="border border-cafe-claro hover:border-transparent hover:bg-cafe-claro hover:text-cafe-oscuro text-white px-4 py-2 rounded-xl font-texto transition-colors text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
