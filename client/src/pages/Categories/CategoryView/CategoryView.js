import React from 'react';
import { useParams } from 'react-router-dom';
import './CategoryView.css';

function CategoryView() {
  const { id } = useParams();

  return (
    <main className="category-view">
      <h1>Categoría #{id}</h1>
    </main>
  );
}

export default CategoryView;
