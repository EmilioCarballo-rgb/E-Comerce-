import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Petición GET a la ruta /products de la API Rest
  useEffect(() => {
    fetch('http://localhost:3000/products') // Ajusta el puerto del backend si es necesario
      .then((response) => response.json())
      .then((data) => {
        // Manejamos si la API responde con un array directo o un objeto con propiedad
        const productsList = Array.isArray(data) ? data : data.products || [];
        setProducts(productsList);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
        setLoading(false);
      });
  }, []);

  // Filtrado de productos por nombre, categoría o descripción (User Story #8 + BONUS)
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Verificamos de forma segura (con ?.) por si algún producto no tiene el campo definido
    const matchName = product.name?.toLowerCase().includes(searchLower);
    const matchCategory = product.category?.toLowerCase().includes(searchLower);
    const matchDescription = product.description?.toLowerCase().includes(searchLower);

    // Retorna true si coincide con cualquiera de los tres campos
    return matchName || matchCategory || matchDescription;
  });

  return (
    <div className="products-list-container">
      {/* Encabezado fijo con título, buscador y botón Agregar */}
      <div className="products-header">
        <h2>Productos</h2>
        <div className="products-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar productos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="btn-add-product"
            onClick={() => navigate('/products/new')}
            title="Agregar Producto"
          >
            +
          </button>
        </div>
      </div>

      {/* Contenido de la lista */}
      <div className="products-content">
        {loading ? (
          <div className="loading-state">Cargando…</div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-results">No hay elementos coincidentes.</div>
        ) : (
          <div className="products-items-list">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-item-card"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="product-item-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="image-placeholder"></div>
                  )}
                </div>
                <div className="product-item-info">
                  <h3>{product.name}</h3>
                  <p>#{product.id}</p>
                </div>
                <div className="product-item-arrow">
                  <span>›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;