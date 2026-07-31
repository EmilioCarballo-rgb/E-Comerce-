import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    store: '',
    image: '',
    category: '' // Añadí category porque tu BD lo usa
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. GET: Cargar los datos del producto (Corregido puerto 3001 y /api)
  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then((data) => {
        setOriginalData(data);
        setFormData({
          name: data.name || '',
          price: data.price || 0,
          stock: data.stock || 0,
          description: data.description || '',
          store: data.store || '',
          image: data.image || '',
          category: data.category || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar:", err);
        setError('No se pudo cargar el producto.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStockChange = (amount) => {
    setFormData((prev) => {
      const newStock = parseInt(prev.stock || 0) + amount;
      return { ...prev, stock: newStock >= 0 ? newStock : 0 }; 
    });
  };

  // 2. Botón Cancelar: Restaura los datos originales
  const handleCancel = () => {
    if(originalData) {
      setFormData({
        name: originalData.name || '',
        price: originalData.price || 0,
        stock: originalData.stock || 0,
        description: originalData.description || '',
        store: originalData.store || '',
        image: originalData.image || '',
        category: originalData.category || ''
      });
      setError('');
    }
  };

  // 3. PUT: Guardar cambios (Corregido puerto, /api y quitado el /edit de la URL)
  const handleSave = () => {
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

    // Apuntamos al ID con método PUT
    fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) {
          alert('Producto actualizado con éxito');
          setOriginalData(payload);
          setError('');
        } else {
          setError('Error al guardar los cambios.');
        }
      })
      .catch((err) => setError('Error de conexión al guardar.'));
  };

  // 4. DELETE: Eliminar (Corregido puerto, /api y quitado el /delete de la URL)
  const handleDelete = () => {
    if(window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      // Apuntamos al ID con método DELETE
      fetch(`http://localhost:3001/api/products/${id}`, {
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

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
  };

  if (loading) return <div>Cargando producto...</div>;

  return (
    <div className="product-view-container">
      <div className="product-view-header">
        <h2>Productos &gt; #{id}</h2>
        <button className="btn-delete-header" onClick={handleDelete}>
          Eliminar
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="product-summary-card">
        <div className="summary-image">
          {formData.image ? <img src={formData.image} alt={formData.name} /> : <div className="no-image">Sin Imagen</div>}
        </div>
        <div className="summary-details">
          <h3>{formData.name}</h3>
          <div className="summary-stats">
            <span><strong>${formData.price}</strong> Valor</span>
            <span><strong>{formData.stock}</strong> Stock Disponible</span>
            <span className="store-badge">
              <Link to={`/stores/${formData.store}`}>🏪 {formData.store || 'Sin Tienda'}</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="product-edit-form">
        <h3>Información</h3>
        
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        {/* Agregué el campo Categoría para que coincida con tu base de datos */}
        <div className="form-group">
          <label>Categoría</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
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

        <div className="form-actions">
          <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
          <button className="btn-save" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;