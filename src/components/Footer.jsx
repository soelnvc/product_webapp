import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '80px 20px', 
      textAlign: 'center', 
      backgroundColor: 'var(--surface-container-low)', 
      color: 'var(--text-secondary)',
      marginTop: 'auto'
    }}>
      <div className="layout-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)', letterSpacing: '-0.02em' }}>STITCH.</h2>
        <p style={{ fontSize: '0.875rem' }}>The Curated Digital Gallery.</p>
        <p style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '40px' }}>&copy; 2026 STITCH. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
