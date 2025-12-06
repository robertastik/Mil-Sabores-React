/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getAllPosts, deletePostAdmin } from "../../services/AdminService";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllPosts();
      setPosts(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError("Error al cargar posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, titulo) => {
    if (!confirm(`¿Eliminar el post "${titulo}"?`)) return;
    try {
      await deletePostAdmin(id);
      loadPosts();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar el post");
    }
  };

  const formatDate = (post) => {
    const dateValue = post.fecha || post.fechaCreacion || post.createdAt || post.date;
    if (!dateValue) return "Sin fecha";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "Sin fecha";
    return date.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const filteredPosts = posts.filter(p =>
    p.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.autor?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contenido?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-purple-900 text-xl">Cargando posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-subtitulo text-3xl text-purple-900">
            Moderación de Posts
          </h1>
          <p className="text-gray-600 font-texto">
            {posts.length} posts en la comunidad
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título, autor o contenido..."
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

        {/* Posts Grid */}
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-500 font-texto">ID: {post.id}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-texto">{formatDate(post)}</span>
                  </div>
                  <h3 className="font-subtitulo text-xl text-gray-800 mb-2">
                    {post.titulo || "Sin título"}
                  </h3>
                  <p className="text-gray-600 font-texto text-sm mb-3 line-clamp-2">
                    {post.contenido || "Sin contenido"}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-texto">
                      👤 {post.autor?.email || post.autor?.nombre || "Anónimo"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(post.id, post.titulo)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition-colors ml-4"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 font-texto text-lg">No se encontraron posts</p>
          </div>
        )}
      </div>
    </div>
  );
}
