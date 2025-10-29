import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productosPasteleria } from '../ProductosData';
import { useCart } from '../context/CartContext';

export default function ProductDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();

  const producto = useMemo(()=> productosPasteleria.find(p => p.id === id), [id]);

  if(!producto) return (
    <div className="min-h-screen flex items-center justify-center bg-cafe-claro">
      <div className="p-8 bg-white rounded-2xl shadow-lg">Producto no encontrado</div>
    </div>
  );

  const defaultIngredients = () => {
    const cat = (producto.categoria || producto.category || '').toLowerCase();
    if(cat.includes('tort') || cat.includes('pastel')) return ['Harina', 'Huevos', 'Azúcar', 'Mantequilla', 'Leche'];
    if(cat.includes('boll') || cat.includes('masas')) return ['Harina', 'Mantequilla', 'Levadura', 'Azúcar'];
    if(cat.includes('pan')) return ['Harina', 'Agua', 'Sal', 'Levadura'];
    return ['Ingredientes frescos y de calidad'];
  };

  const ingredientes = useMemo(() => {
    const ingr = producto.ingredientes;
    if (!ingr) return defaultIngredients();
    if (Array.isArray(ingr)) return ingr;
    if (typeof ingr === 'string') return ingr.split(',').map(s => s.trim()).filter(Boolean);
    return defaultIngredients();
  }, [producto]);

  const sampleReviews = producto.reviews || [
    { id: 1, name: 'María', text: 'Delicioso y fresco. Volvería a comprar.', rating: 5 },
    { id: 2, name: 'Carlos', text: 'Buen sabor, aunque esperaba más relleno.', rating: 4 },
    { id: 3, name: 'Lucía', text: 'Perfecto para cumpleaños, se agotó en minutos.', rating: 5 }
  ];

  const onAdd = () => {
    try {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) return navigate('/login');
    } catch(e){ return navigate('/login'); }
    addToCart(producto);
  };

  const currentItem = cartItems.find(i => i.id === producto.id);
  const currentQty = currentItem?.quantity ?? 0;

  const inc = () => {
    try {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) return navigate('/login');
    } catch(e){ return navigate('/login'); }
    if (currentQty === 0) addToCart(producto);
    else updateQuantity(producto.id, currentQty + 1);
  };

  const dec = () => {
    if (currentQty <= 1) {
      // remove to zero
      updateQuantity(producto.id, 0);
    } else {
      updateQuantity(producto.id, currentQty - 1);
    }
  };

  return (
    <div className="min-h-screen bg-cafe-blanco py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img src={producto.imagenUrl} alt={producto.nombre} className="w-full rounded-2xl object-cover shadow-lg" />
          </div>
          <div className="md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-3xl font-subtitulo mb-2 truncate">{producto.nombre}</h1>
                <p className="text-xl font-texto text-cafe-oscuro/80 mb-4">${producto.precio.toLocaleString('es-CL')}</p>
              </div>

              <div className="flex items-center gap-3">
                {currentQty > 0 ? (
                  <div className="flex items-center gap-2 bg-white p-2 rounded-lg border">
                    <button onClick={dec} className="px-3 py-1 bg-white border rounded-md">-</button>
                    <span className="px-3 text-lg font-subtitulo">{currentQty}</span>
                    <button onClick={inc} className="px-3 py-1 bg-white border rounded-md">+</button>
                  </div>
                ) : (
                  <button onClick={onAdd} className="px-4 py-2 bg-cafe-oscuro text-cafe-claro rounded-xl">Agregar al Carrito</button>
                )}
              </div>
            </div>

            <p className="mb-6 text-cafe-oscuro">{producto.descripcion}</p>

            <div className="mb-6">
              <h3 className="font-subtitulo text-lg mb-2">Ingredientes</h3>
              <ul className="list-disc ml-6 text-cafe-oscuro">
                {ingredientes.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-subtitulo text-lg mb-2">Opiniones</h3>
              <div className="space-y-4">
                {sampleReviews.map(r => (
                  <div key={r.id} className="p-4 bg-white rounded-lg shadow-sm border-1 border-cafe-oscuro/10">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="font-texto">{r.name}</strong>
                      <span className="text-sm text-cafe-oscuro/70">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                    </div>
                    <p className="text-sm text-cafe-oscuro/80">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => navigate('/productos')} className="px-6 py-3 border rounded-xl">Volver a productos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
