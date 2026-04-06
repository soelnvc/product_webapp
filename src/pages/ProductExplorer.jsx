// This page is like a store aisle where users can look at everything available
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import { 
  HiOutlineSquares2X2, 
  HiOutlineUser, 
  HiOutlineSparkles, 
  HiOutlineDeviceTablet, 
  HiOutlineTag 
} from 'react-icons/hi2'; // Using HI2 for more modern look

const categories = [
  { id: 'all', name: 'ALL PRODUCTS', icon: <HiOutlineSquares2X2 size={16} /> },
  { id: "men's clothing", name: 'OUTERWEAR', icon: <HiOutlineUser size={16} /> },
  { id: "women's clothing", name: 'WOMENSWEAR', icon: <HiOutlineUser size={16} /> },
  { id: "jewelery", name: 'ACCESSORIES', icon: <HiOutlineSparkles size={16} /> },
  { id: "electronics", name: 'TECH', icon: <HiOutlineDeviceTablet size={16} /> },
  { id: "sale", name: 'SALE', icon: <HiOutlineTag size={16} /> }
];

const ProductExplorer = () => {
  // activeCategory remembers which group of products is selected (like ALL or TECH)
  const [activeCategory, setActiveCategory] = useState('all');
  // priceRange remembers the maximum price the user wants to pay
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState('default');
  const [searchParams] = useSearchParams();
  const rawQuery = (searchParams.get('q') || '').toLowerCase();
  const searchQuery = useDebounce(rawQuery, 300);
  
  const { products, loading, error } = useProducts(activeCategory === 'all' ? null : activeCategory);

  // This "filter" only keeps products that match the selected price and search word
  const filteredProducts = products.filter(p => {
    const matchesPrice = p.price <= priceRange;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery) || p.category?.toLowerCase().includes(searchQuery);
    return matchesPrice && matchesSearch;
  });

  // Sorting logic based on the selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    return 0;
  });

  const clearFilters = () => {
    setActiveCategory('all');
    setPriceRange(10000);
    setSortBy('default');
  };

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', padding: '0 40px', maxWidth: '1600px', margin: '0 auto', display: 'flex' }}>
      
      {/* Sidebar Filters */}
      <aside style={{ width: '220px', padding: '60px 20px 60px 0', position: 'sticky', top: '80px', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '5px' }}>FILTERS</h3>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Refine Selection</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '22px', flex: 1 }}>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '15px', 
                backgroundColor: 'transparent', border: 'none', 
                color: activeCategory === cat.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeCategory === cat.id ? 800 : 600,
                fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left',
                transition: 'color 0.2s',
                letterSpacing: '0.05em'
              }}
            >
              <span style={{ fontSize: '1.2rem', opacity: activeCategory === cat.id ? 1 : 0.6, width: '20px', display: 'flex', justifyContent: 'center' }}>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
          
          {/* Price Range Slider */}
          <div style={{ marginTop: '40px' }}>
            <div style={{ borderTop: '1px solid var(--outline-variant)', opacity: 0.3, marginBottom: '40px' }}></div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '20px', fontWeight: 600 }}>PRICE RANGE</p>
            <input 
              type="range" 
              min="0" max="10000" 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ width: '100%', cursor: 'pointer', accentcolor: 'var(--primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>$0</span>
              <span>${priceRange.toLocaleString()}</span>
            </div>
          </div>
        </nav>

        <button 
          onClick={clearFilters}
          style={{ marginTop: 'auto', backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
        >
          CLEAR ALL
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '60px 0 60px 40px' }}>
        <div style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '15px' }}>
              Spring Summer 2024
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
              Curated<br/>Essentialism.
            </h1>
          </div>

          <div style={{ paddingBottom: '10px' }}>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--outline-variant)',
                color: 'var(--text-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                padding: '5px 0',
                cursor: 'pointer',
                outline: 'none',
                textTransform: 'uppercase'
              }}
            >
              <option value="default">SORT BY: FEATURED</option>
              <option value="price-low-high">PRICE: LOW TO HIGH</option>
              <option value="price-high-low">PRICE: HIGH TO LOW</option>
              <option value="rating">RATING: HIGHEST</option>
              <option value="newest">ARRIVAL: NEWEST</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Curating Selection...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>Failed to load collection.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' }}>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '100px 0', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)' }}>No products found matching "{searchQuery}"</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '10px' }}>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </main>

    </div>
  );
};

export default ProductExplorer;
