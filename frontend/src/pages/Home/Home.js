import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [mostWanted, setMostWanted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Llamamos a tu ruta del backend /api/products
        const response = await fetch('http://localhost:3001/api/products', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al conectar con el servidor');
        }

        const data = await response.json();
        
        // Como tu backend devuelve { products, mostWanted }, los guardamos por separado
        setProducts(data.products || []);
        setMostWanted(data.mostWanted || []);
      } catch (error) {
        console.error("No se pudieron cargar los datos de la home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>Cargando Mateando 🧉...</p>;
  }

  return (
    <main className="home-main">
      <h2 className="home-title" style={{ textAlign: 'center', marginTop: '20px' }}>
        ¡Bienvenido a Mateando🧉!
      </h2>

      {/* 1. SECCIÓN DE LOS MÁS PEDIDOS (🔥) */}
      {mostWanted.length > 0 && (
        <section className="most-wanted-section" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px', margin: '20px 20px' }}>
          <h2 style={{ marginLeft: '10px', marginBottom: '15px' }}>Los más pedidos 🔥</h2>
          <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {mostWanted.map((product) => (
              <div key={product.id} className="product-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px', textAlign: 'center', background: '#fff' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
                <p style={{ fontWeight: 'bold', color: '#27ae60' }}>${product.price}</p>
                <Link to={`/products/${product.id}`} style={{ display: 'inline-block', marginTop: '10px', padding: '5px 10px', backgroundColor: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                  Ver Detalle
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 30px 10px 30px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ margin: 0 }}>Nuestro Catálogo</h2>
      </div>

      {/* 2. CATÁLOGO GENERAL DE PRODUCTOS */}
      <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px', textAlign: 'center', background: '#fff' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
              <p style={{ fontWeight: 'bold', color: '#27ae60' }}>${product.price}</p>
              <Link to={`/products/${product.id}`} style={{ display: 'inline-block', marginTop: '10px', padding: '5px 10px', backgroundColor: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                Ver Detalle
              </Link>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles en este momento.</p>
        )}
      </div>

      {/* 3. SECCIÓN DE PROMOCIÓN */}
      <section className="promo-section" style={{ display: 'flex', margin: '40px 20px', padding: '20px', backgroundColor: '#fdf3e7', borderRadius: '10px', alignItems: 'center' }}>
        <div className="promo-text-box" style={{ flex: 1 }}>
          <h2 className="promo-title">Llevate el <span className="promo-highlight">Kit Matero Premium</span></h2>
          <p className="promo-desc">Aprovecha nuestra oferta especial. Incluye mate imperial, bombilla pico de loro y yerba de regalo con un 20% de descuento.</p>
          <Link to="/products/1" className="promo-link">
            <button className="promo-btn" style={{ padding: '10px 20px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Ver Promoción</button>
          </Link>
        </div>
        <div className="promo-img-box" style={{ flex: 1, textAlign: 'center' }}>
          <img src="https://www.belloexport.com.ar/wp-content/uploads/2018/08/P07908.jpg" alt="Promoción Kit Matero" className="promo-img" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
        </div>
      </section>
    </main>
  );
};

export default Home;