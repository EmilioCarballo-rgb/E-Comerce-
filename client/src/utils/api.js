const BASE_URL = 'http://localhost:3001/api';

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.status}`);
  }
  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Error al obtener producto: ${response.status}`);
  }
  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`Error al obtener categorías: ${response.status}`);
  }
  return response.json();
}
