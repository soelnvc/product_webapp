import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { cartCount, toggleCart } = useCart();
  const location = useLocation();
  
  return (
    <div style={{ padding: '20px 40px', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(249, 249, 251, 0.95)', backdropFilter: 'blur(12px)' }}>
      
      {/* Left Links */}
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.02em', color: '#000' }}>
          THE CURATOR
        </Link>
        <nav style={{ display: 'flex', gap: '30px', fontSize: '0.9rem', fontWeight: 500 }}>
          <Link to="/products" style={{ color: location.pathname.includes('/products') ? '#000' : 'var(--text-secondary)', borderBottom: location.pathname.includes('/products') ? '2px solid #000' : 'none', paddingBottom: '4px' }}>Collections</Link>
          <Link to="/new-arrivals" style={{ color: location.pathname.includes('/new-arrivals') ? '#000' : 'var(--text-secondary)', borderBottom: location.pathname.includes('/new-arrivals') ? '2px solid #000' : 'none', paddingBottom: '4px' }}>New Arrivals</Link>
          <Link to="/archive" style={{ color: location.pathname.includes('/archive') ? '#000' : 'var(--text-secondary)', borderBottom: location.pathname.includes('/archive') ? '2px solid #000' : 'none', paddingBottom: '4px' }}>Archive</Link>
        </nav>
      </div>

      {/* Center Search / Right Icons */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '280px' }}>
           <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', opacity: 0.5 }}>⚲</span>
           <input type="text" placeholder="Search" style={{ width: '100%', padding: '12px 16px 12px 42px', backgroundColor: '#f0f0f3', border: 'none', borderRadius: '30px', fontSize: '0.85rem', outline: 'none', fontFamily: "'Inter', sans-serif" }} />
        </div>

        {/* Right Icons */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '1.2rem' }}>
          <Link to="/wishlist" style={{ color: '#000', textDecoration: 'none', paddingBottom: '4px', borderBottom: location.pathname.includes('/wishlist') ? '2px solid #000' : 'none' }}>
            {location.pathname.includes('/wishlist') ? '♥' : '♡'}
          </Link>
          <button onClick={toggleCart} style={{ color: '#000', position: 'relative', background: 'none', border: 'none', fontSize: '1.2rem', paddingBottom: '4px', cursor: 'pointer', borderBottom: location.pathname.includes('/cart') ? '2px solid #000' : 'none' }}>
            🛒
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-10px', background: 'black', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>{cartCount}</span>}
          </button>
          <Link to="/" style={{ textDecoration: 'none' }}>
             <div style={{ width: '32px', height: '32px', backgroundColor: '#e0e0e0', borderRadius: '50%', overflow: 'hidden' }}>
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Curator" alt="user" style={{ width: '100%', height: '100%' }} />
             </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
