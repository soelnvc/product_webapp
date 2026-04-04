import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '40px 20px', 
      textAlign: 'center', 
      backgroundColor: 'var(--surface-container-low)', 
      color: 'var(--text-secondary)',
      marginTop: 'auto',
      borderTop: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div className="layout-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)', letterSpacing: '-0.02em', margin: 0 }}>NVC SOEL.</h2>
        <p style={{ fontSize: '0.75rem', margin: 0 }}>The Curated Digital Gallery.</p>
        <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '20px', opacity: 0.6 }}>&copy; 2026 NVC SOEL. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
