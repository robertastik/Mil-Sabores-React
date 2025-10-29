import { productosPasteleria } from "../ProductosData";

const Productos = () => {
  return (
    <div className="bg-cafe-claro min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-cafe-oscuro">
        <h1 className="font-subtitulo text-5xl md:text-6xl text-center mb-12">
          Nuestros Productos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-8">
          {productosPasteleria.map((producto) => (
            <div
              key={producto.id}
              className="bg-white/80 rounded-2xl overflow-hidden  flex flex-col border-1 border-cafe-oscuro transition-transform duration-300 hover:scale-102"
            >
              <img
                src={producto.imagenUrl}
                alt={producto.nombre}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-subtitulo text-2xl mb-2">
                  {producto.nombre}
                </h2>
                <p className="font-texto text-cafe-oscuro/80 mb-4 flex-grow">
                  {producto.descripcion}
                </p>
                <p className="font-texto text-xl mt-auto text-right">
                  ${producto.precio.toLocaleString("es-CL")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productos;
