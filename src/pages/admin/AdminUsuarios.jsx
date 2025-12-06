/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getUsuarios, deleteUsuario, updateUsuario } from "../../services/AdminService";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError("Error al cargar usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, email) => {
    if (!confirm(`¿Eliminar al usuario ${email}?`)) return;
    try {
      await deleteUsuario(id);
      loadUsuarios();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar el usuario");
    }
  };

  const filteredUsers = usuarios.filter(u =>
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-purple-900 text-xl">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-subtitulo text-3xl text-purple-900">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600 font-texto">
            {usuarios.length} usuarios registrados
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por email o nombre..."
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
                <th className="text-left py-4 px-6 font-texto">Email</th>
                <th className="text-left py-4 px-6 font-texto">Nombre</th>
                <th className="text-left py-4 px-6 font-texto">Fecha Nac.</th>
                <th className="text-left py-4 px-6 font-texto">Rol</th>
                <th className="text-left py-4 px-6 font-texto">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((usuario) => (
                <tr key={usuario.id || usuario.email} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-texto text-gray-600">{usuario.id}</td>
                  <td className="py-4 px-6 font-texto">{usuario.email}</td>
                  <td className="py-4 px-6 font-texto">{usuario.nombre || "—"}</td>
                  <td className="py-4 px-6 font-texto text-gray-600">{usuario.fechaNacimiento || "—"}</td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      usuario.role === "ADMIN" 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {usuario.role || "USER"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {usuario.role !== "ADMIN" ? (
                      <button
                        onClick={() => handleDelete(usuario.id, usuario.email)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                      >
                        Eliminar
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm font-texto">Protegido</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-texto">
              No se encontraron usuarios
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm font-texto">Total Usuarios</p>
            <p className="text-2xl font-bold text-gray-800">{usuarios.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm font-texto">Administradores</p>
            <p className="text-2xl font-bold text-purple-600">
              {usuarios.filter(u => u.role === "ADMIN").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm font-texto">Usuarios Normales</p>
            <p className="text-2xl font-bold text-blue-600">
              {usuarios.filter(u => u.role !== "ADMIN").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
