import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importamos el MainLayout directamente desde la carpeta components
import MainLayout from './components/MainLayout';

// Importamos las páginas existentes
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';

// Importamos las páginas nuevas (Ajustá "ProductsNew" o "ProductNew" según cómo dejaste la carpeta finalmente)
import ProductsNew from './pages/Products/ProductsNew/ProductsNew';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* 🏠 Página de Inicio */}
          <Route path="/" element={<Home />} />
          
          {/* 📦 Página de productos */}
          <Route path="/products" element={<ProductsList />} />
          
          {/* 📦 Página para agregar un nuevo producto (Va arriba de la ruta con :id) */}
          <Route path="/products/new" element={<ProductsNew />} /> 
          
          {/* 📦 Página de un producto específico (por ID) */}
          <Route path="/products/:id" element={<ProductView />} />

          {/* 🏷️ Página de categorías */}
          <Route path="/categories" element={<CategoriesList />} />
          
          {/* 👤 Página de perfil del usuario */}
          <Route path="/profile" element={<div><h1>Página de Perfil (En construcción)</h1></div>} />

          {/* ⚠️ Ruta por defecto para Error 404 */}
          <Route path="*" element={<div><h1>Error 404 - Página no encontrada</h1></div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;