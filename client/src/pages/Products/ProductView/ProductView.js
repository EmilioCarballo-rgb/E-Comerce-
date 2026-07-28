import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductView.css';

function ProductView() {
  const { id } = useParams();

  return (
    <main className="product-view">
      <h1>Producto #{id}</h1>
    </main>
  );
}

export default ProductView;
