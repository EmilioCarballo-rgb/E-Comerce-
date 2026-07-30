import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [username] = useState('Olivia');
  const [productCount] = useState(123);
  const [categoryCount] = useState(10);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>¡Hola {username}!</h1>
      </header>

      <div className="home-cards-container">
        <div className="home-card">
          <div className="card-info">
            <span className="card-icon">📦</span>
            <h3>{productCount} Productos</h3>
          </div>
          <div className="card-actions">
            <Link to="/products" className="btn-secondary">Ver Listado</Link>
            <Link to="/products/new" className="btn-primary">Agregar Producto</Link>
          </div>
        </div>

        <div className="home-card">
          <div className="card-info">
            <span className="card-icon">🏪</span>
            <h3>{categoryCount} Categorías</h3>
          </div>
          <div className="card-actions">
            <Link to="/categories" className="btn-secondary">Ver Listado</Link>
            <Link to="/categories/new" className="btn-primary">Agregar Categoría</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;