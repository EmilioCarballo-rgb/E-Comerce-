import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 1️⃣ Agregamos { isAdmin } aquí para recibir el rol desde App.js
const ProductDetail = ({ isAdmin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2️⃣ ELIMINAMOS la línea que decía: const isAdmin = false; 

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (confirmar) {
      fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' })
      .then(() => {
        alert("Producto eliminado");
        navigate('/products');
      });
    }
  };

  // Función para el usuario normal
  const handleAddToCart = () => {
    // Aquí luego irá tu lógica para guardar en el carrito
    console.log("Producto agregado:", product.name);
    alert("¡Producto agregado al carrito exitosamente!");
  };

  if (loading) return <div>Cargando detalle…</div>;
  if (!product) return null;

  return (
    <div className="product-detail-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/products')} style={{ marginBottom: '20px' }}>⬅ Volver</button>
      
      <h2>{product.name}</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {product.image && <img src={product.image} alt={product.name} style={{ width: '300px' }} />}
        
        <div>
          <p><strong>Categoría:</strong> {product.category}</p>
          <h3 style={{ color: 'green' }}>${product.price}</h3>
          <p>{product.description}</p>
          
          {/* RENDERIZADO CONDICIONAL DE BOTONES */}
          <div style={{ marginTop: '20px' }}>
            {isAdmin ? (
              // 🛠️ BOTONES DE ADMINISTRADOR
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate(`/products/${id}/edit`)} style={{ background: '#0056b3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Editar Producto
                </button>
                <button onClick={handleDelete} style={{ background: '#dc3545', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Eliminar Producto
                </button>
              </div>
            ) : (
              // 🛒 BOTÓN DE USUARIO / CLIENTE
              <button 
                onClick={handleAddToCart}
                style={{ background: '#28a745', color: 'white', padding: '10px 20px', fontSize: '1.1em', cursor: 'pointer', border: 'none', borderRadius: '5px' }}
              >
                🛒 Agregar al carrito
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;