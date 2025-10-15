import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-orange-200 p-4">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="pl-4 text-orange-800 text-3xl font-pacifico">
          Mil Sabores
        </NavLink>
        <div className="pr-4">
          <ul className="flex gap-4">
            <li>
              <NavLink
                to="/"
                className="text-orange-800 hover:underline font-lato"
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-orange-800 hover:underline font-lato"
              >
                Acerca de
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
