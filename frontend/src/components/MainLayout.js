import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/home':
        return 'Panel de Inicio';
      case '/products':
        return 'Productos > Listado';
      case '/products/new':
        return 'Productos > Nuevo';
      case '/categories':
        return 'Categorías';
      case '/profile':
        return 'Perfil de Usuario';
      default:
        if (location.pathname.startsWith('/products/')) {
          return 'Productos > Detalle / Edición';
        }
        return 'Panel de Administración';
    }
  };

  return (
    <div className="app-container">
      {/* Botón hamburguesa para pantallas pequeñas (1024px o menos) */}
      <button className="menu-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* --- SIDEBAR --- */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard E-Commerce</h2>
        </div>

        {/* Opciones del menú principal con indicador de ruta activa */}
        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            🏠 Inicio
          </NavLink>
          
          <NavLink 
            to="/products" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            📦 Productos
          </NavLink>
          
          <NavLink 
            to="/categories" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            🏪 Categorías
          </NavLink>
        </nav>

        {/* Enlace de perfil del usuario actual ubicado en la parte inferior */}
        <div className="sidebar-footer">
          <NavLink 
            to="/profile" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'user-profile-link active' : 'user-profile-link')}
          >
            <span className="user-avatar">👤</span>
            <span className="user-name">Olivia</span>
          </NavLink>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* --- MAIN AREA --- */}
      <main className="main-area">
        <header className="main-header">
          <div className="header-title-container">
            <h2>{getHeaderTitle()}</h2>
          </div>
        </header>

        <div className="main-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;