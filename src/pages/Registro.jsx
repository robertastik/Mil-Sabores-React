import { NavLink } from "react-router-dom";
import hero from "../assets/images/hero-image.jpg";

export default function Register() {
  return (
    <section
      className="min-h-screen bg-cafe-claro flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full max-w-lg mx-4 bg-cafe-claro text-cafe-oscuro rounded-3xl p-8 shadow-2xl border-1 border-cafe-oscuro">
        <h2 className="font-titulo text-4xl text-center mb-6">Crear Cuenta</h2>

        <form className="space-y-4" id="registro-form">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nombre
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="email"
              id="email"
              name="email"
              required
            />
            <p
              id="duoc-benefit-message"
              className="text-sm text-cafe-oscuro/70 mt-1 hidden"
            >
              Conseguirás una torta gratis en tu cumpleaños
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dob">
              Fecha de Nacimiento
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="date"
              id="dob"
              name="dob"
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
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirm-password"
            >
              Confirmar Contraseña
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="coupon">
              Código de Descuento (Opcional)
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="text"
              id="coupon"
              name="coupon"
            />
          </div>

          <button
            type="submit"
            className="w-full  text-cafe-oscuro rounded-2xl px-4 py-2 border-1 border-cafe-oscuro hover:bg-cafe-oscuro hover:cursor-pointer hover:text-cafe-claro transition-all duration-200"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-center text-sm mt-6 border-t-1 border-cafe-oscuro pt-4">
          ¿Ya tienes una cuenta?{" "}
          <NavLink
            to="/login"
            className="text-cafe-oscuro underline font-medium"
          >
            Inicia Sesión
          </NavLink>
        </p>
      </div>
    </section>
  );
}
