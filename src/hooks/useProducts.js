import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../services/api';

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          category ? fetchProductsByCategory(category) : fetchProducts()
        ]);
        
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category]);

  return { products, categories, loading, error };
};
