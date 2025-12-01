import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/images/hero-image.jpg";
import { useAuth } from "../context/AuthContext";
import { api } from "../config/axiosConfig";

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [preferencias, setPreferencias] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        const profileData = response.data;
        setUserData(profileData);
        setName(profileData.nombre || "");
        setFechaNacimiento(profileData.fechaNacimiento || "");
        setPreferencias(profileData.preferencias || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error al cargar el perfil. Por favor recarga la página.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, navigate]);

  const validar = () => {
    if (!name) return "El nombre es obligatorio";
    if (password && password.length < 6)
      return "La nueva contraseña debe tener al menos 6 caracteres";
    if (password && password !== confirmPassword)
      return "Las nuevas contraseñas no coinciden";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    const validationError = validar();
    if (validationError) {
      setError(validationError);
      return;
    }

    setCargando(true);
    try {
      const updateData = {
        nombre: name,
        fechaNacimiento: fechaNacimiento,
        preferencias: preferencias,
      };
      if (password) {
        updateData.password = password;
      }

      const response = await api.put('/auth/profile', updateData);
      setUserData(response.data);
      setExito("¡Perfil actualizado con éxito!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Error al actualizar el perfil.");
    } finally {
      setCargando(false);
    }
  };

  if (loadingProfile) {
    return (
      <section className="min-h-screen bg-cafe-claro flex items-center justify-center">
        <div className="text-cafe-oscuro text-xl">Cargando perfil...</div>
      </section>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <section
      className="min-h-screen bg-cafe-claro flex items-center justify-center"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-lg mx-4 bg-cafe-blanco text-cafe-oscuro rounded-3xl p-8 shadow-2xl border-1 border-cafe-oscuro">
        <h2 className="font-subtitulo text-4xl text-center mb-6">
          Modificar Perfil
        </h2>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          {error && (
            <div className="text-sm text-red-600 bg-red-100 p-3 pl-4 rounded-2xl">
              {error}
            </div>
          )}
          {exito && (
            <div className="text-sm text-green-600 bg-green-100 p-3 pl-4 rounded-2xl">
              {exito}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="w-full bg-cafe-oscuro/10 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2"
              type="email"
              id="email"
              value={userData.email || authUser?.email || ""}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dob">
              Fecha de Nacimiento
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="date"
              id="dob"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="prefs">
              Preferencias (ej. sabores favoritos) (opcional)
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="text"
              id="prefs"
              value={preferencias}
              onChange={(e) => setPreferencias(e.target.value)}
            />
          </div>

          <div className="text-sm text-cafe-oscuro/80">
            <p>Edad: {userData.edad ?? "No registrada"}</p>
            <p>
              Beneficio DUOC: {userData.isDuoc ? "Sí (torta gratis en tu cumpleaños)" : "No"}
            </p>
            <p>Cupon FELICES50 aplicado: {userData.felicesCincuenta ? "Sí" : "No"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nombre
            </label>
            <input
              className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <p className="text-sm text-cafe-oscuro/80 pt-2">
            Cambiar contraseña (dejar en blanco para no cambiar):
          </p>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cafe-oscuro/60 hover:text-cafe-oscuro"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirm-password"
            >
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full bg-cafe-oscuro/5 placeholder-cafe-oscuro/60 border border-cafe-oscuro/20 rounded-2xl px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-cafe-oscuro"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cafe-oscuro/60 hover:text-cafe-oscuro"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-cafe-oscuro rounded-2xl px-4 py-2 border-1 border-cafe-oscuro hover:bg-cafe-oscuro hover:cursor-pointer hover:text-cafe-claro transition-all duration-200"
            disabled={cargando}
          >
            {cargando ? "Guardando Cambios..." : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </section>
  );
}
