// The Menu bar at the top with the logo and links to other pages
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../context/ThemeContext';
import { useDebounce } from '../hooks/useDebounce';

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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ y: 20, rotate: 90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -20, rotate: -90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Conditional Search Rendering (Only on Collections) */}
        {isCollectionsPage && (
          <div style={{ position: 'relative', width: '220px', marginRight: '10px' }}>
             <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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
           <svg width="18" height="18" viewBox="0 0 24 24" fill={location.pathname.includes('/wishlist') ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </Link>
        
        {/* Full Cart Link */}
        <Link to="/cart" style={{ color: 'var(--primary)', position: 'relative', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={location.pathname.includes('/cart') ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-12px', background: 'var(--primary)', color: 'var(--on-primary)', borderRadius: '30px', padding: '0 5px', minWidth: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800' }}>{cartCount}</span>}
        </Link>

      </div>
    </div>
  );
};

export default Navbar;
