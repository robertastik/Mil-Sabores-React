const API_URL = "http://localhost:8080/api/productos";

export async function obtenerProductos() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  const data = await response.json();
  console.log("API Response (obtenerProductos):", data);
  return data;
}

export async function obtenerProductoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Producto no encontrado");
  }
  return response.json();
}
