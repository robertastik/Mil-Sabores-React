import { useMemo, useState, useEffect, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { obtenerProductos } from "../services/ProductoService";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [user, setUser] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        const productsList = Array.isArray(data) ? data : data.data || [];
        console.log("Productos cargados:", productsList);
        console.log("Primer producto:", productsList[0]);
        setProductos(productsList);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(loggedInUser);
    } catch {
      setUser(null);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(productos.map((p) => p.categoria ?? p.category).filter(Boolean))
    );
    return cats;
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    if (selectedCategory === "Todos") return productos;
    return productos.filter(
      (p) => (p.categoria ?? p.category) === selectedCategory
    );
  }, [productos, selectedCategory]);

  const handleAddToCart = useCallback(
    (producto) => {
      if (!user) {
        navigate("/login");
      } else {
        addToCart(producto);
      }
    },
    [user, navigate, addToCart]
  );

  return (
    <div className="bg-cafe-blanco min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-cafe-oscuro">
        <div className="flex items-center justify-between mb-12 pb-16 border-b-1 border-cafe-oscuro/30">
          <span className="font-subtitulo text-4xl md:text-4xl">
            {selectedCategory === "Todos"
              ? "Nuestros Productos"
              : selectedCategory}
          </span>

          {categories.length > 0 && (
            <div className="flex items-center gap-2">
              <label htmlFor="categoria" className="font-texto text-base">
                Categoría:
              </label>
              <div className="relative">
                <select
                  id="categoria"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="font-texto text-base border rounded-xl px-4 py-2 bg-white/80"
                >
                  <option value="Todos">Todos</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* LISTA DE PRODUCTOS */}
        {selectedCategory === "Todos" ? (
          <div className="space-y-12 pt-4">
            {productos.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-subtitulo text-cafe-oscuro">
                  No se encontraron productos
                </h3>
                <p className="text-cafe-oscuro/70 mt-2">
                  Intenta recargar la página o verifica la conexión.
                </p>
              </div>
            ) : (
              categories.map((cat) => {
                const grupo = productos.filter(
                  (p) => (p.categoria ?? p.category) === cat
                );
                if (!grupo.length) return null;

                return (
                  <section key={cat} className="border-b-1 border-dashed pb-20">
                    <h3 className="font-subtitulo text-2xl md:text-3xl mb-4 pb-4">
                      {cat}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {grupo.map((producto) => (
                        <div
                          key={producto.id_prod}
                          onClick={() => {
                            console.log("Producto clickeado:", producto);
                            console.log(
                              "ID:",
                              producto.id_prod,
                              "Tipo:",
                              typeof producto.id_prod
                            );
                            navigate(`/producto/${producto.id_prod}`);
                          }}
                          className="bg-white rounded-lg overflow-hidden cursor-pointer border hover:border-cafe-oscuro transition-all"
                        >
                          <img
                            src={producto.imagenUrl}
                            alt={producto.nombre}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-subtitulo mb-2 truncate">
                              {producto.nombre}
                            </h3>
                            <p className="text-sm mb-3 line-clamp-2">
                              {producto.descripcion}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold">
                                ${producto.precio.toLocaleString("es-CL")}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(producto);
                                }}
                                className="px-4 pb-2 pt-1 bg-cafe-oscuro text-cafe-claro rounded-xl hover:bg-cafe-claro hover:text-cafe-oscuro border transition"
                              >
                                Agregar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id_prod}
                onClick={() => {
                  console.log("Producto clickeado:", producto);
                  console.log(
                    "ID:",
                    producto.id_prod,
                    "Tipo:",
                    typeof producto.id_prod
                  );
                  navigate(`/producto/${producto.id_prod}`);
                }}
                className="bg-white rounded-lg border overflow-hidden cursor-pointer hover:border-cafe-oscuro transition"
              >
                <img
                  src={producto.imagenUrl}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-subtitulo mb-2 truncate">
                    {producto.nombre}
                  </h3>
                  <p className="text-sm mb-3 line-clamp-2">
                    {producto.descripcion}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ${producto.precio.toLocaleString("es-CL")}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(producto);
                      }}
                      className="px-4 pb-2 pt-1 bg-cafe-oscuro text-cafe-claro rounded-xl hover:bg-cafe-claro hover:text-cafe-oscuro border transition"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTÓN SCROLL */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-4 right-4 bg-cafe-oscuro px-4 py-4 rounded-full shadow-lg group transition ${
            showScrollButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Productos;
