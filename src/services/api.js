import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetches all products from the live API.
 * Maps data to maintain compatibility with existing UI (rating and createdAt).
 */
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.map(product => ({
      ...product,
      rating: product.rating?.rate || 0,
      createdAt: new Date().toISOString() // Fake date as API doesn't provide it
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetches a single product by ID.
 */
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    const product = response.data;
    return {
      ...product,
      rating: product.rating?.rate || 0,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches the list of all product categories.
 */
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetches products within a specific category.
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data.map(product => ({
      ...product,
      rating: product.rating?.rate || 0,
      createdAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};

// Accurate hardcoded subset from FakeStoreAPI for the New Arrivals section
export const newArrivalsInventory = [
  { id: 1, title: "Fjallraven Backpack", price: 109.95, category: "MENS", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", rating: 3.9, limited: true },
  { id: 2, title: "Slim Fit T-Shirt", price: 22.30, category: "MENS", image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", rating: 4.1 },
  { id: 3, title: "Cotton Jacket", price: 55.99, category: "MENS", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", rating: 4.7 },
  { id: 4, title: "Casual Slim Fit", price: 15.99, category: "MENS", image: "https://fakestoreapi.com/img/71YXM9iYn6L._AC_UY879_.jpg", rating: 2.1 },
  { id: 5, title: "Chain Bracelet", price: 695.00, category: "JEWELRY", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", rating: 4.6 },
  { id: 6, title: "Gold Petite Micropave", price: 168.00, category: "JEWELRY", image: "https://fakestoreapi.com/img/61sbMi64mXL._AC_UL640_QL65_ML3_.jpg", rating: 3.9, desc: "A masterpiece of delicate craftsmanship." }
];

export default { fetchProducts, fetchProductById, fetchCategories, fetchProductsByCategory, newArrivalsInventory };
