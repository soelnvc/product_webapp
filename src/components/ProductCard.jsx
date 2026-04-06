import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const tags = ['AVAILABLE', 'NEW IN', 'LIMITED', 'RESTOCK', 'SOLD OUT', 'EDITION OF 50'];

const ProductCard = ({ product, index }) => {
  const [imgError, setImgError] = useState(false);
  const randomTag = tags[product.id % tags.length]; // Deterministic fake tag
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
    >
      <Link to={`/product/${product.id}`} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface-container-highest)', borderRadius: '24px', padding: '16px', transition: 'transform 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }} 
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        
        <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: 'var(--surface-container-low)', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {!imgError ? (
            <img 
              src={product.image} 
              alt={product.title} 
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'var(--image-blend, multiply)', padding: '40px', filter: 'grayscale(100%) contrast(1.1) brightness(0.95)' }} 
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
               <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#C0C0C0', letterSpacing: '0.1em' }}>PRODUCT IMAGE<br/>COMING SOON</p>
            </div>
          )}
        </div>
        
        <div style={{ padding: '0 4px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.title}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'capitalize' }}>
            {product.category}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.rating && (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '12px', gap: '2px' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FFB800' }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{product.rating}</span>
                </div>
              )}
            </div>
            <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em', color: '#b0b0b0', textTransform: 'uppercase' }}>
               {randomTag}
            </span>
          </div>
        </div>

      </Link>
    </motion.div>
  );
};

export default ProductCard;
