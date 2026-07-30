import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    store: '',
    image: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Cargar los datos del producto
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOriginalData(data);
        setFormData({
          name: data.name || '',
          price: data.price || 0,
          stock: data.stock || 0,
          description: data.description || '',
          store: data.store || '',
          image: data.image || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar:", err);
        setError('No se pudo cargar el producto.');
        setLoading(false);
      });
  }, [id]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador para los botones de + y - del Stock
  const handleStockChange = (amount) => {
    setFormData((prev) => {
      const newStock = parseInt(prev.stock || 0) + amount;
      return { ...prev, stock: newStock >= 0 ? newStock : 0 }; // Evitamos stock negativo
    });
  };

  // 2. Botón Cancelar: Restaura los datos originales
  const handleCancel = () => {
    setFormData({
      name: originalData.name || '',
      price: originalData.price || 0,
      stock: originalData.stock || 0,
      description: originalData.description || '',
      store: originalData.store || '',
      image: originalData.image || ''
    });
    setError('');
  };

  // 3. Botón Guardar: Validación y petición PUT
  const handleSave = () => {
    // Validaciones requeridas por la US #9
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

    fetch(`http://localhost:3000/products/${id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) {
          alert('Producto actualizado con éxito');
          setOriginalData(payload); // Actualizamos la base original local
          setError('');
        } else {
          setError('Error al guardar los cambios.');
        }
      })
      .catch((err) => setError('Error de conexión al guardar.'));
  };

  // 4. Botón Eliminar: Petición DELETE
  const handleDelete = () => {
    if(window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      fetch(`http://localhost:3000/products/${id}/delete`, {
        method: 'DELETE'
      })
        .then((res) => {
          if (res.ok) {
            alert('Producto eliminado');
            navigate('/products'); // Volvemos al listado
          } else {
            setError('Error al eliminar el producto.');
          }
        })
        .catch((err) => setError('Error de conexión al eliminar.'));
    }
  };

  // Botón para eliminar la imagen
  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
  };

  if (loading) return <div>Cargando producto...</div>;

  return (
    <div className="product-view-container">
      {/* Encabezado */}
      <div className="product-view-header">
        <h2>Productos &gt; #{id}</h2>
        <button className="btn-delete-header" onClick={handleDelete}>
          Eliminar
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Resumen del Producto (Escenario 1 y BONUS 2) */}
      <div className="product-summary-card">
        <div className="summary-image">
          {formData.image ? <img src={formData.image} alt={formData.name} /> : <div className="no-image">Sin Imagen</div>}
        </div>
        <div className="summary-details">
          <h3>{formData.name}</h3>
          <div className="summary-stats">
            <span><strong>${formData.price}</strong> Valor</span>
            <span><strong>{formData.stock}</strong> Stock Disponible</span>
            {/* BONUS: Enlace al perfil de la tienda */}
            <span className="store-badge">
              <Link to={`/stores/${formData.store}`}>🏪 {formData.store || 'Sin Tienda'}</Link>
            </span>
          </div>
        </div>
      </div>

      {/* Formulario de Edición */}
      <div className="product-edit-form">
        <h3>Información</h3>
        
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Valor</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </div>

        <div className="form-group stock-group">
          <label>Stock</label>
          <div className="stock-controls">
            <button onClick={() => handleStockChange(-1)}>-</button>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
            <button onClick={() => handleStockChange(1)}>+</button>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
        </div>

        <div className="form-group">
          <label>Tienda</label>
          <input type="text" name="store" value={formData.store} onChange={handleChange} />
        </div>

        <h3>Galería de Imágenes</h3>
        <div className="form-group image-group">
          <label>Nueva Imagen (URL)</label>
          <div className="image-input-container">
            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
            <button className="btn-remove-image" onClick={handleRemoveImage}>Eliminar</button>
          </div>
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

export default ProductView;