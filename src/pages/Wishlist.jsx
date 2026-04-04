import React from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const WishlistCard = ({ product, index, onRemove, onAddBag }) => {
  return (
    <motion.div 
       initial={{ opacity: 0, y: 30 }} 
       animate={{ opacity: 1, y: 0 }} 
       transition={{ duration: 0.5, delay: index * 0.1 }}
       style={{ backgroundColor: '#fff', borderRadius: '35px', padding: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}
    >
       <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1.15', backgroundColor: '#F0F0F3', borderRadius: '25px', overflow: 'hidden', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link to={`/product/${product.id}`} style={{ width: '100%', height: '100%', display: 'block' }}>
            <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} alt={product.title} />
          </Link>
          <button onClick={() => onRemove(product)} style={{ position: 'absolute', top: '15px', right: '15px', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.08)', border: 'none', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s', zIndex: 10 }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.15)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.08)'}>
             <span style={{ fontSize: '12px', fontWeight: 600 }}>✕</span>
          </button>
       </div>
       <div style={{ padding: '0 10px 10px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '15px' }}>
          <div style={{ flex: 1, minWidth: 0, paddingRight: '10px' }}>
             <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600, marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</h3>
             </Link>
             <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '15px', textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.category || 'Archive Collection'}</p>
             <p style={{ fontSize: '0.9rem', fontWeight: 800 }}>${parseFloat(product.price).toFixed(2)}</p>
          </div>
          <button onClick={() => onAddBag(product)} style={{ width: '45px', height: '45px', flexShrink: 0, borderRadius: '50%', backgroundColor: '#F0F0F3', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s', color: '#000' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#EAEAEA'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='#F0F0F3'}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </button>
       </div>
    </motion.div>
  );
};

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach(product => {
      addToCart(product);
      toggleWishlist(product); // Remove from wishlist after adding to bag
    });
  };

  const handleAddSingleToBag = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  return (
    <div style={{ backgroundColor: '#F9F9FB', minHeight: '100vh', padding: '0 40px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Area */}
      <section style={{ marginTop: '80px', marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(4rem, 8vw, 6.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>YOUR WISHLIST</h1>
          <p style={{ marginTop: '15px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>
             COLLECTION TOTAL: <span style={{ color: '#000', fontWeight: 800 }}>{String(wishlist.length).padStart(2, '0')} ITEMS</span>
          </p>
        </div>
        {wishlist.length > 0 && (
          <button 
            onClick={handleMoveAllToBag}
            style={{ backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '30px', padding: '14px 30px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', cursor: 'pointer', transition: 'opacity 0.2s', alignSelf: 'center', transform: 'translateY(15px)' }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            MOVE ALL TO BAG
          </button>
        )}
      </section>

      {/* Grid Area */}
      <section style={{ flex: 1, paddingBottom: '100px' }}>
        {wishlist.length === 0 ? (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '120px 0' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '30px', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Your collection is currently empty.</p>
              <Link to="/products" style={{ display: 'inline-block', backgroundColor: '#EAEAEA', color: '#000', textDecoration: 'none', padding: '14px 30px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                EXPLORE ARCHIVE
              </Link>
           </motion.div>
        ) : (
           <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '80px' }}>
                {wishlist.map((product, index) => (
                  <WishlistCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                    onRemove={toggleWishlist} 
                    onAddBag={handleAddSingleToBag} 
                  />
                ))}
              </div>
              
              {/* Bottom Centered Loader/Action */}
              <div style={{ textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '60px' }}>
                 <button style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '0 auto' }}>
                    VIEW ARCHIVED ITEMS <span style={{ fontSize: '0.5rem' }}>▼</span>
                 </button>
              </div>
           </>
        )}
      </section>

    </div>
  );
};

export default Wishlist;
