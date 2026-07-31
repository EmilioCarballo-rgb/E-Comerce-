import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLayout from './components/MainLayout';
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import ProductsNew from './pages/Products/ProductsNew/ProductsNew';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList';

function App() {
  return (
    <Router>
      {/* Ya no pasamos isAdmin, React asume que todo el que entra es Admin */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/new" element={<ProductsNew />} />
          <Route path="/products/:id/edit" element={<ProductView />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/profile" element={<div><h1>Página de Perfil</h1></div>} />
          <Route path="*" element={<div><h1>Error 404 - Página no encontrada</h1></div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;