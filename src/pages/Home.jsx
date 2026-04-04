import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '120px 40px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Background "THE CURATOR" Text */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18vw',
          fontWeight: 800,
          color: 'rgba(0,0,0,0.02)',
          whiteSpace: 'nowrap',
          zIndex: 0,
          pointerEvents: 'none',
          fontFamily: "'Inter', sans-serif"
        }}>
          THE CURATOR
        </div>

        {/* Center Text */}
        <div style={{ textAlign: 'center', zIndex: 10, position: 'relative', marginTop: '-80px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: 600, marginBottom: '20px' }}>SPRING / SUMMER 2024</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(5rem, 10vw, 8rem)', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.1, marginBottom: '40px' }}>
            The Essence<br/>of Form
          </h1>
          <Link to="/products" style={{ display: 'inline-block', backgroundColor: '#000', color: '#fff', padding: '16px 40px', borderRadius: '30px', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', transition: 'transform 0.2s' }}>
            ENTER THE ARCHIVE
          </Link>
        </div>

        {/* Left Floating Image */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ position: 'absolute', left: '8%', top: '25%', width: '25%', maxWidth: '300px', zIndex: 5 }}
        >
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/4', border: '8px solid white' }}>
            <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Model" />
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', backgroundColor: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              THE COLLECTION
            </div>
          </div>
        </motion.div>

        {/* Right Floating Image */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ position: 'absolute', right: '10%', top: '5%', width: '22%', maxWidth: '280px', zIndex: 5 }}
        >
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5', border: '8px solid white' }}>
            <img src="https://images.unsplash.com/photo-1629196914569-b5fe5be1ab1f?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Texture" />
            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', textAlign: 'center', fontWeight: 'bold' }}>
              LIMITED<br/>EDITION
            </div>
          </div>
        </motion.div>

      </section>

      {/* Curated Selections Section */}
      <section style={{ padding: '150px 40px', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'center' }}>
        
        {/* Text Side */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '20px' }}>Curated<br/>Selections</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.6, fontSize: '0.9rem' }}>
            A deliberate assembly of forms and artifacts representing the bleeding edge of modern minimalist curation.
          </p>
        </div>

        {/* Masonry Right Side */}
        <div style={{ flex: 2, position: 'relative', minHeight: '700px' }}>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ position: 'absolute', top: '0', left: '15%', width: '40%', aspectRatio: '1', borderRadius: '30px', overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Briefcase" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'absolute', bottom: '0', left: '0', width: '55%', aspectRatio: '4/3', borderRadius: '30px', overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Helmet" />
             <div style={{ position: 'absolute', bottom: '30px', left: '30px', color: '#fff' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>Objects & Artifacts</h3>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>S/S 2024 ACCESSORIES</p>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ position: 'absolute', top: '30%', right: '5%', width: '35%', aspectRatio: '3/5', borderRadius: '30px', overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1554030638-d699e19d7bdf?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Editorial" />
              <div style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center', color: '#fff' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '5px' }}>THE ATELIER EXPERIENCE</p>
                <Link to="/products" style={{ fontSize: '0.8rem', textDecoration: 'underline' }}>DISCOVER MORE</Link>
             </div>
          </motion.div>

        </div>

      </section>

      {/* Intentional Impairment Section */}
      <section style={{ padding: '100px 40px', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ flex: 1, borderRadius: '40px', overflow: 'hidden', aspectRatio: '4/5' }}>
          <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Abstract Light" />
        </motion.div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '20px' }}>LIMITED EDITION MANUFACTURE</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '4.5rem', lineHeight: 1, marginBottom: '40px' }}>
            Intentional<br/><span style={{ fontStyle: 'italic' }}>Impairment.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '400px' }}>
            Beauty is found in the fracture. Our S/S 2024 archive explores the intersection of perfunctory utility and raw, unfinished edges. Each piece features a deliberate structural anomaly—a beautiful irregularity.
          </p>
          <div style={{ display: 'flex', gap: '60px' }}>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>001</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>FIRST EDITION</p>
            </div>
             <div>
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>100%</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>AUTHENTIC</p>
            </div>
          </div>
        </div>

      </section>

      {/* Scrolling Marquee */}
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '40px 0', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '100px' }}>
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          style={{ fontSize: '3rem', fontWeight: 500, letterSpacing: '0.05em' }}>
          - S/S 2024 -- LIMITED DROP -- SUSTAINABLE DESIGN - S/S 2024 -- LIMITED DROP -- SUSTAINABLE DESIGN - S/S 2024 -- LIMITED DROP -- SUSTAINABLE DESIGN
        </motion.div>
      </div>

    </div>
  );
};

export default Home;
