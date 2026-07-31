import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Ya no recibimos la prop "isAdmin"
const ProductsList = () => {
  const [products, setProducts] = useState([]);

  // Fetch a tu API en Express (puerto 3001) para traer los productos de SQLite
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error al cargar productos:', err));
  }, []);

  const handleDelete = (id) => {
    // Lógica para eliminar un producto
    console.log("Eliminando producto", id);
  };

  return (
    <div className="products-list-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Catálogo de Productos</h3>
        
        {/* Este botón ahora SIEMPRE se muestra porque estamos en el panel de Admin */}
        <Link to="/products/new" style={{ background: '#007bff', color: 'white', padding: '10px 15px', textDecoration: 'none', borderRadius: '5px' }}>
          + Nuevo Producto
        </Link>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
            <h4>{product.name}</h4>
            <p>Precio: ${product.price}</p>
            
            {/* Estos botones de administración ahora SIEMPRE están visibles */}
            <div className="admin-actions" style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <Link to={`/products/${product.id}/edit`} style={{ color: 'orange', textDecoration: 'none' }}>
                ✏️ Editar
              </Link>
              <button onClick={() => handleDelete(product.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;