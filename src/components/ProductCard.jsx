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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
              ${product.price.toFixed(2)}
            </span>
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
