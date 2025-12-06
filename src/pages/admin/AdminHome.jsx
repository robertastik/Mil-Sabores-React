/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getUsuarios, getAllPosts } from "../../services/AdminService";
import { obtenerProductos } from "../../services/ProductoService";

export default function AdminHome() {
    const [stats, setStats] = useState({
        productos: 0,
        usuarios: 0,
        posts: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentProducts, setRecentProducts] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            const [productosData, usuariosData, postsData] = await Promise.all([
                obtenerProductos().catch(() => []),
                getUsuarios().catch(() => []),
                getAllPosts().catch(() => [])
            ]);

            const productos = Array.isArray(productosData) ? productosData : productosData?.data || [];
            const usuarios = Array.isArray(usuariosData) ? usuariosData : usuariosData?.data || [];
            const posts = Array.isArray(postsData) ? postsData : postsData?.data || [];

            setStats({
                productos: productos.length,
                usuarios: usuarios.length,
                posts: posts.length
            });

            setRecentProducts(productos.slice(0, 5));
            setRecentUsers(usuarios.slice(0, 5));
        } catch (err) {
            console.error("Error cargando estadísticas:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-purple-900 text-xl">Cargando dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cafe-blanco p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-texto text-4xl text-cafe-oscuro mb-2">
                        Panel de Administración
                    </h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-cafe-claro rounded-2xl p-6 border border-cafe-oscuro/40">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cafe-oscuro font-texto text-xl">Total Productos</p>
                                <p className="text-3xl font-bold text-cafe-oscuro">{stats.productos}</p>
                            </div>
                            <div className="text-4xl"><img className="size-12" src="\src\assets\images\invent-icon.svg" alt="Inventario" /></div>

                        </div>
                    </div>

                    <div className="bg-cafe-claro rounded-2xl p-6 border border-cafe-oscuro/40">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cafe-oscuro font-texto text-xl">
                                    Total Usuarios
                                </p>
                                <p className="text-3xl font-bold text-cafe-oscuro">{stats.usuarios}</p>
                            </div>
                            <div className="text-4xl"><img className="size-12" src="\src\assets\images\users-icon.svg" alt="Usuarios" /></div>
                        </div>
                    </div>

                    <div className="bg-cafe-claro rounded-2xl p-6 border border-cafe-oscuro/40">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cafe-oscuro font-texto text-xl">Total Posts</p>
                                <p className="text-3xl font-bold text-cafe-oscuro">{stats.posts}</p>
                            </div>
                            <div className="text-4xl"><img className="size-12" src="\src\assets\images\posts-icon.svg" alt="Posts" /></div>

                        </div>
                    </div>
                </div>

                {/* Recent Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Products */}
                    <div className="bg-cafe-claro rounded-2xl p-6 border border-cafe-oscuro/40">
                        <h2 className="font-texto text-xl text-cafe-oscuro mb-4 border-b border-cafe-oscuro/30 pb-4">
                            Productos Recientes
                        </h2>
                        {recentProducts.length === 0 ? (
                            <p className="text-cafe-oscuro font-texto">No hay productos</p>
                        ) : (
                            <ul className="space-y-3">
                                {recentProducts.map((p) => (
                                    <li key={p.id_prod || p.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="font-texto text-gray-700">{p.nombre}</span>
                                        <span className="text-green-600 font-bold">${p.precio?.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Recent Users */}
                    <div className="bg-cafe-claro rounded-2xl p-6 border border-cafe-oscuro/40">
                        <h2 className="font-texto text-xl text-cafe-oscuro mb-4 border-b border-cafe-oscuro/30 pb-4">
                            Usuarios Recientes
                        </h2>
                        {recentUsers.length === 0 ? (
                            <p className="text-cafe-oscuro font-texto">No hay usuarios</p>
                        ) : (
                            <ul className="space-y-3">
                                {recentUsers.map((u) => (
                                    <li key={u.id || u.email} className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="font-texto text-cafe-oscuro">{u.email}</span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.role === "ADMIN" ? "bg-cafe-oscuro text-cafe-claro" : "bg-cafe-blanco border-1 text-cafe-oscuro"
                                            }`}>
                                            {u.role || "USER"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-cafe-claro rounded-2xl p-6 border border-cafe-oscuro/40">
                    <h2 className="font-texto text-xl text-cafe-oscuro mb-4">
                        Acciones Rápidas
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/admin/productos"
                            className="text-cafe-oscuro border-1 bg-cafe-blanco hover:text-cafe-claro hover:bg-cafe-oscuro px-6 py-3 rounded-xl font-texto transition-colors"
                        >
                            + Nuevo Producto
                        </a>
                        <a
                            href="/admin/usuarios"
                            className="text-cafe-oscuro border-1 bg-cafe-blanco hover:text-cafe-claro hover:bg-cafe-oscuro px-6 py-3 rounded-xl font-texto transition-colors"
                        >
                            Gestionar Usuarios
                        </a>
                        <a
                            href="/admin/posts"
                            className="text-cafe-oscuro bg-cafe-blanco border-1 hover:text-cafe-claro hover:bg-cafe-oscuro px-6 py-3 rounded-xl font-texto transition-colors"
                        >
                            Moderar Posts
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
