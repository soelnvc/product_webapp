import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--color-grey-lighter)',
          borderTopColor: 'var(--color-black)',
          borderRadius: '50%'
        }}
      />
    </div>
  );
};

export default Loader;
