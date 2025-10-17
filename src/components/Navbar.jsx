import { NavLink } from "react-router-dom";
export default function Navbar() {
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
        
        {/* Login and Register on the right */}
        <div className="pr-4">
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
        </div>
      </div>
    </nav>
  );
}
