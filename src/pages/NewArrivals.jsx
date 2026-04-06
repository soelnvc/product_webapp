import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import Loader from '../components/Loader';

const NewArrivals = () => {
  const [loadCount, setLoadCount] = useState(1);
  const [isAppending, setIsAppending] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchProducts();
        setItems(data.slice(0, 24));
      } catch (err) {
        console.error("Failed to load new arrivals", err);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const handleLoadMore = () => {
    if (loadCount >= 4) return; // Limit to max chunks
    setIsAppending(true);
    setTimeout(() => {
      setLoadCount(prev => prev + 1);
      setIsAppending(false);
    }, 600);
  };

  const displayedItems = items.slice(0, loadCount * 6);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>;

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', padding: '0 40px', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      
      {/* Main Grid Area */}
      <main style={{ flex: 1, padding: '40px 0 100px 0' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(4rem, 9vw, 8.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.85, marginLeft: '-15px' }}>
            New Arrivals
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '240px', textAlign: 'right', letterSpacing: '0.02em', lineHeight: 1.6, paddingBottom: '15px' }}>
            Exploring the intersection of architectural form and wearable art. S/S 2024 DROP.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoFlow: 'row dense', gridAutoRows: 'minmax(280px, auto)', gap: '24px' }}>
          
          {displayedItems.map((item, idx) => {
             const shape = idx % 6; 
             const baseDelay = (idx % 6) * 0.1;

             if (shape === 0) { // Tall item
               return (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: baseDelay }} style={{ gridColumn: 'span 1', gridRow: 'span 2', position: 'relative', borderRadius: '35px', overflow: 'hidden', minHeight: '600px', backgroundColor: 'var(--surface-container-low)' }}>
                    <Link to={`/product/${item.id}`} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '60px' }} alt={item.title} />
                      <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', alignItems: 'center', zIndex: 10 }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h3>
                        <p style={{ fontSize: '1rem', fontWeight: 800 }}>${item.price}</p>
                      </div>
                    </Link>
                  </motion.div>
               );
             } 
             
             if (shape === 1) { // Normal item but with limited tag
               return (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: baseDelay }} style={{ gridColumn: 'span 1', gridRow: 'span 1', position: 'relative', borderRadius: '35px', overflow: 'hidden', backgroundColor: 'var(--surface-container-low)' }}>
                    <Link to={`/product/${item.id}`} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '40px' }} alt={item.title} />
                      {item.limited && <div style={{ position: 'absolute', top: '25px', right: '25px', backgroundColor: 'var(--surface-container-highest)', color: 'var(--primary)', fontSize: '0.6rem', fontWeight: 800, padding: '8px 16px', borderRadius: '20px', letterSpacing: '0.1em' }}>LIMITED EDITION</div>}
                      <div style={{ position: 'absolute', bottom: '25px', left: '25px', right: '25px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', alignItems: 'flex-end', width: 'calc(100% - 50px)' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                        <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>${item.price}</p>
                      </div>
                    </Link>
                  </motion.div>
               );
             }

             if (shape === 5) { // Philosophy Dark Box
               return (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: baseDelay }} style={{ gridColumn: 'span 2', gridRow: 'span 1', backgroundColor: 'var(--primary)', borderRadius: '35px', padding: '50px', color: 'var(--on-primary)', display: 'flex', gap: '40px', alignItems: 'center' }}>
                    <div style={{ flex: 1.2 }}>
                      <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', fontWeight: 600, color: '#888', marginBottom: '20px' }}>THE PHILOSOPHY</p>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '25px' }}>{item.title}</h2>
                      <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.6, marginBottom: '40px' }}>{item.description || item.desc}</p>
                      <Link to={`/product/${item.id}`} style={{ display: 'inline-block', backgroundColor: 'var(--surface-container-highest)', color: 'var(--primary)', border: 'none', borderRadius: '30px', padding: '14px 30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', cursor: 'pointer', transition: 'opacity 0.2s', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>EXPLORE JOURNAL</Link>
                    </div>
                    <Link to={`/product/${item.id}`} style={{ flex: 1, height: '100%', borderRadius: '25px', overflow: 'hidden', display: 'block', textDecoration: 'none', transition: 'opacity 0.2s', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.8, mixBlendMode: 'luminosity' }} alt="Product" />
                    </Link>
                  </motion.div>
               );
             }

             // Shapes 2, 3, 4 are standard small blocks
             return (
                 <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: baseDelay }} style={{ gridColumn: 'span 1', gridRow: 'span 1', backgroundColor: item.background || '#fff', borderRadius: '35px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <Link to={`/product/${item.id}`} style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                       <img src={item.image} style={{ width: '100%', height: '70%', objectFit: 'contain', filter: item.grayscale ? 'grayscale(100%)' : (item.dimmed ? 'grayscale(100%) brightness(0.9)' : 'none'), padding: '40px' }} alt={item.title} />
                       <div style={{ padding: '30px 25px 25px 25px', position: 'absolute', bottom: 0, left: 0, width: '100%', background: `linear-gradient(to top, var(--surface-container-low) 40%, transparent)` }}>
                          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '5px' }}>{item.title}</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>${item.price}</p>
                       </div>
                    </Link>
                 </motion.div>
             );
          })}

        </div>

        <div style={{ marginTop: '80px', borderTop: '1px solid var(--outline-variant)', paddingTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>SHOWING {displayedItems.length} OF 24 ITEMS</p>
          <button 
            onClick={handleLoadMore}
            disabled={isAppending || loadCount >= 4}
            style={{ backgroundColor: isAppending ? 'var(--surface-container-highest)' : 'transparent', border: isAppending ? '1px solid transparent' : '1px solid var(--outline-variant)', color: 'var(--text-primary)', borderRadius: '30px', padding: '15px 40px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em', cursor: isAppending ? 'wait' : (loadCount >= 4 ? 'not-allowed' : 'pointer'), transition: 'all 0.2s', filter: isAppending || loadCount >= 4 ? 'opacity(0.5)' : 'none' }}>
            {loadCount >= 4 ? 'END OF COLLECTION' : (isAppending ? 'LOADING...' : 'LOAD MORE')}
          </button>
        </div>

      </main>

    </div>
  );
};

export default NewArrivals;
