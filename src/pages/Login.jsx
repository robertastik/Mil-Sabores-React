import { NavLink } from "react-router-dom";
import hero from "../assets/images/hero-image.jpg";

export default function Login() {
  return (
    <section
      className="min-h-screen bg-cafe-claro flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full max-w-md mx-4 bg-cafe-claro text-cafe-oscuro rounded-3xl p-8 shadow-2xl border-1 border-cafe-oscuro">
        <h2 className="font-titulo text-4xl text-center mb-6">
          Iniciar Sesión
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="email"
              id="email"
              name="email"
              placeholder="tu@ejemplo.com"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            className="w-full  text-cafe-oscuro rounded-2xl px-4 py-2 border-1 border-cafe-oscuro hover:bg-cafe-oscuro hover:cursor-pointer hover:text-cafe-claro transition-all duration-200"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm mt-6 border-t-1 border-cafe-oscuro pt-4">
          ¿No tienes una cuenta?{" "}
          <NavLink
            to="/register"
            className="text-cafe-oscuro underline font-medium"
          >
            Regístrate
          </NavLink>
        </p>
      </div>
    </section>
  );
}
