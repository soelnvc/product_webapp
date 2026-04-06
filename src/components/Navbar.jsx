// The Menu bar at the top with the logo and links to other pages
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../context/ThemeContext';
import { useDebounce } from '../hooks/useDebounce';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineMoon, HiOutlineSun, HiSearch } from 'react-icons/hi';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Sync internal state with URL if URL changes (e.g. on page load)
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  // This updates the URL only after the user stops typing for 500ms
  useEffect(() => {
    const q = debouncedSearchTerm.trim();
    if (q) {
      setSearchParams({ q });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchTerm, setSearchParams]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const isCollectionsPage = location.pathname.includes('/products');
  
  return (
    <div style={{ padding: '20px 40px', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(253, 253, 255, 0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}` }}>
      
      {/* Left Logo */}
      <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.02em', color: 'var(--primary)', textDecoration: 'none' }}>
        THE CURATOR
      </Link>
      
      {/* Centered Navigation Links */}
      <nav style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '40px', fontSize: '0.85rem', fontWeight: 600 }}>
        <Link to="/products" style={{ color: location.pathname.includes('/products') ? 'var(--primary)' : 'var(--text-secondary)', borderBottom: location.pathname.includes('/products') ? '2px solid var(--primary)' : 'none', paddingBottom: '4px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => { if (!location.pathname.includes('/products')) e.target.style.color = 'var(--primary)'; }} onMouseOut={(e) => { if (!location.pathname.includes('/products')) e.target.style.color = 'var(--text-secondary)'; }}>
           Collections
        </Link>
        <Link to="/new-arrivals" style={{ color: location.pathname.includes('/new-arrivals') ? 'var(--primary)' : 'var(--text-secondary)', borderBottom: location.pathname.includes('/new-arrivals') ? '2px solid var(--primary)' : 'none', paddingBottom: '4px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => { if (!location.pathname.includes('/new-arrivals')) e.target.style.color = 'var(--primary)'; }} onMouseOut={(e) => { if (!location.pathname.includes('/new-arrivals')) e.target.style.color = 'var(--text-secondary)'; }}>
           New Arrivals
        </Link>
        <Link to="/archive" style={{ color: location.pathname.includes('/archive') ? 'var(--primary)' : 'var(--text-secondary)', borderBottom: location.pathname.includes('/archive') ? '2px solid var(--primary)' : 'none', paddingBottom: '4px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => { if (!location.pathname.includes('/archive')) e.target.style.color = 'var(--primary)'; }} onMouseOut={(e) => { if (!location.pathname.includes('/archive')) e.target.style.color = 'var(--text-secondary)'; }}>
           Archive
        </Link>
      </nav>

      {/* Right Core Actions */}
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        
        {/* Theme Toggle (Light/Dark mode placeholder) */}
        <button 
          onClick={toggleTheme}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', position: 'relative', overflow: 'hidden' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ y: 20, rotate: 45, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -20, rotate: -45, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <HiOutlineMoon size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ y: 20, rotate: 90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -20, rotate: -90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <HiOutlineSun size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Conditional Search Rendering (Only on Collections) */}
        {isCollectionsPage && (
          <div style={{ position: 'relative', width: '220px', marginRight: '10px' }}>
             <HiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={14} />
             <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={handleSearch}
                style={{ width: '100%', padding: '10px 16px 10px 40px', backgroundColor: 'var(--surface-container-low)', color: 'var(--text-primary)', border: `1px solid var(--outline-variant)`, borderRadius: '30px', fontSize: '0.75rem', fontWeight: 600, outline: 'none', fontFamily: "'Inter', sans-serif" }} 
              />
          </div>
        )}

        {/* Wishlist Link */}
        <Link to="/wishlist" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
           <HiOutlineHeart size={20} fill={location.pathname.includes('/wishlist') ? "currentColor" : "none"} />
        </Link>
        
        {/* Full Cart Link */}
        <Link to="/cart" style={{ color: 'var(--primary)', position: 'relative', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <HiOutlineShoppingBag size={20} />
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-12px', background: 'var(--primary)', color: 'var(--on-primary)', borderRadius: '30px', padding: '0 5px', minWidth: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800' }}>{cartCount}</span>}
        </Link>

      </div>
    </div>
  );
};

export default Navbar;
