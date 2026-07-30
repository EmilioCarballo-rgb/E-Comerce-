import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ProductView/ProductView.css'; 

const ProductsNew = () => {
  const navigate = useNavigate();

  // Estado inicial vacío para el nuevo producto
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    store: '',
    image: ''
  });
  
  const [error, setError] = useState('');

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador para los botones de + y - del Stock (Escenario 5 heredado)
  const handleStockChange = (amount) => {
    setFormData((prev) => {
      const newStock = parseInt(prev.stock || 0) + amount;
      return { ...prev, stock: newStock >= 0 ? newStock : 0 }; // Evita valores negativos
    });
  };

  // Botón Cancelar: Vuelve al listado de productos (Escenario 8 heredado)
  const handleCancel = () => {
    navigate('/products');
  };

  // Botón Guardar: Validación y petición POST (Escenario 1 de la US #10)
  const handleSave = () => {
    // Validaciones (Heredadas de la US #9)
    if (!formData.name.trim()) {
      setError('El nombre es requerido.');
      return;
    }
    
    const priceInt = parseInt(formData.price);
    const stockInt = parseInt(formData.stock);

    if (isNaN(priceInt) || isNaN(stockInt)) {
      setError('El valor y el stock deben ser números enteros.');
      return;
    }

    const payload = {
      ...formData,
      price: priceInt || 0,
      stock: stockInt || 0
    };

    // Petición POST a la ruta correcta que espera el backend ('/')
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) {
          alert('¡Producto creado con éxito!');
          navigate('/products'); // Redirige al listado tras crear
        } else {
          setError('Error al crear el producto.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error de conexión al guardar.');
      });
  };

  // Botón para eliminar la imagen del input (Escenario 7 heredado)
  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
  };

  return (
    <div className="product-view-container">
      {/* Encabezado */}
      <div className="product-view-header">
        <h2>Productos &gt; Nuevo Producto</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Formulario de Alta */}
      <div className="product-edit-form">
        <h3>Información</h3>
        
        <div className="form-group">
          <label>Nombre</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Ej: Alfajor Havanna"
          />
        </div>

        <div className="form-group">
          <label>Valor</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group stock-group">
          <label>Stock</label>
          <div className="stock-controls">
            <button onClick={() => handleStockChange(-1)}>-</button>
            <input 
              type="number" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
            />
            <button onClick={() => handleStockChange(1)}>+</button>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4"
            placeholder="Descripción del producto..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>Tienda</label>
          <input 
            type="text" 
            name="store" 
            value={formData.store} 
            onChange={handleChange} 
            placeholder="Nombre de la tienda"
          />
        </div>

        <h3>Galería de Imágenes</h3>
        <div className="form-group image-group">
          <label>Nueva Imagen (URL)</label>
          <div className="image-input-container">
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              placeholder="https://..." 
            />
            <button className="btn-remove-image" onClick={handleRemoveImage}>Eliminar</button>
          </div>
          {/* Vista previa pequeña de la imagen si se ingresa una URL */}
          {formData.image && (
            <div style={{ marginTop: '10px' }}>
              <img src={formData.image} alt="Vista previa" style={{ maxWidth: '150px', borderRadius: '8px' }} />
            </div>
          )}
        </div>

        {/* Botones de acción final */}
        <div className="form-actions">
          <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
          <button className="btn-save" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsNew;