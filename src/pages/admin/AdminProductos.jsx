/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { obtenerProductos } from "../../services/ProductoService";
import { createProducto, updateProducto, deleteProducto } from "../../services/AdminService";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: "",
    stock: ""
  });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    setLoading(true);
    try {
      const data = await obtenerProductos();
      setProductos(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError("Error al cargar productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setEditingProduct(producto);
      setForm({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        categoria: producto.categoria || "",
        imagen: producto.imagen || "",
        stock: producto.stock || ""
      });
    } else {
      setEditingProduct(null);
      setForm({ nombre: "", descripcion: "", precio: "", categoria: "", imagen: "", stock: "" });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock) || 0
      };
      
      if (editingProduct) {
        await updateProducto(editingProduct.id_prod || editingProduct.id, data);
      } else {
        await createProducto(data);
      }
      
      setShowModal(false);
      loadProductos();
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Error al guardar el producto");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      loadProductos();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar el producto");
    }
  };

  const filteredProducts = productos.filter(p =>
    p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-purple-900 text-xl">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-subtitulo text-3xl text-purple-900">
              Gestión de Productos
            </h1>
            <p className="text-gray-600 font-texto">
              {productos.length} productos en el sistema
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-texto transition-colors"
          >
            + Nuevo Producto
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 font-texto focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-purple-900 text-white">
              <tr>
                <th className="text-left py-4 px-6 font-texto">ID</th>
                <th className="text-left py-4 px-6 font-texto">Nombre</th>
                <th className="text-left py-4 px-6 font-texto">Categoría</th>
                <th className="text-left py-4 px-6 font-texto">Precio</th>
                <th className="text-left py-4 px-6 font-texto">Stock</th>
                <th className="text-left py-4 px-6 font-texto">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((producto) => (
                <tr key={producto.id_prod || producto.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-texto text-gray-600">{producto.id_prod || producto.id}</td>
                  <td className="py-4 px-6 font-texto font-medium">{producto.nombre}</td>
                  <td className="py-4 px-6 font-texto text-gray-600">{producto.categoria || "—"}</td>
                  <td className="py-4 px-6 font-texto text-green-600 font-bold">${producto.precio?.toLocaleString()}</td>
                  <td className="py-4 px-6 font-texto">{producto.stock || "N/A"}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(producto)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(producto.id_prod || producto.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-texto">
              No se encontraron productos
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="font-subtitulo text-2xl text-purple-900 mb-6">
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-texto text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({...form, nombre: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 font-texto focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block font-texto text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({...form, descripcion: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 font-texto focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-texto text-gray-700 mb-1">Precio *</label>
                  <input
                    type="number"
                    value={form.precio}
                    onChange={(e) => setForm({...form, precio: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 font-texto focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-texto text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({...form, stock: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 font-texto focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-texto text-gray-700 mb-1">Categoría</label>
                <input
                  type="text"
                  value={form.categoria}
                  onChange={(e) => setForm({...form, categoria: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 font-texto focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block font-texto text-gray-700 mb-1">URL de Imagen</label>
                <input
                  type="text"
                  value={form.imagen}
                  onChange={(e) => setForm({...form, imagen: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 font-texto focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl font-texto transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-xl font-texto transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
