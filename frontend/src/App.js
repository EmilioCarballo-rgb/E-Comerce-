import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importamos el MainLayout directamente desde la carpeta components
import MainLayout from './components/MainLayout';

// Importamos las páginas existentes
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* 🏠 Página de Inicio */}
          <Route path="/" element={<Home />} />
          
          {/* 📦 Página de productos */}
          <Route path="/products" element={<ProductsList />} />
          
          {/* 📦 Página de un producto específico (por ID) */}
          <Route path="/products/:id" element={<ProductView />} />
          
          {/* 📦 Página para agregar un nuevo producto */}
          <Route path="/products/new" element={<ProductView />} /> 
          
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