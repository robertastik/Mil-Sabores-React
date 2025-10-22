import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// A simple profile icon component
const ProfileIcon = ({ name }) => (
  <div className="w-10 h-10 rounded-full bg-cafe-oscuro text-cafe-claro flex items-center justify-center font-bold text-lg">
    {name.charAt(0).toUpperCase()}
  </div>
);

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-cafe-claro p-8 z-10 sticky top-0 border-b-1 border-cafe-oscuro">
      <div className="flex items-center">
        {/* Logo on the left */}
        <NavLink to="/" className="pl-4 text-cafe-oscuro text-5xl font-titulo">
          Mil Sabores
        </NavLink>

        {/* Center navigation items */}
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-8">
            <li>
              <NavLink
                to="/productos"
                className="text-cafe-oscuro hover:underline font-texto"
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comunidad"
                className="text-cafe-oscuro hover:underline font-texto"
              >
                Comunidad
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-cafe-oscuro hover:underline font-texto"
              >
                Sobre Nosotros
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Auth section on the right */}
        <div className="pr-4 relative">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-texto text-cafe-oscuro">
                Hola, {user.name}
              </span>
              <button
                className="hover:cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <ProfileIcon name={user.name} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 top-full w-48 bg-cafe-claro rounded-2xl shadow-lg border-1 border-cafe-oscuro py-2">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-cafe-oscuro hover:bg-cafe-oscuro/10"
                  >
                    Modificar Cuenta
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-cafe-oscuro hover:bg-cafe-oscuro/10 hover:cursor-pointer"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ul className="flex gap-4">
              <li>
                <NavLink
                  to="/login"
                  className="text-cafe-oscuro hover:underline font-texto"
                >
                  Iniciar Sesión
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="text-cafe-oscuro font-texto border-1 border-cafe-oscuro rounded-xl px-3 py-2 hover:bg-cafe-oscuro hover:text-cafe-claro transition-all duration-200"
                >
                  Registrarse
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
