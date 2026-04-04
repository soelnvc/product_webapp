import React from 'react';
import { motion } from 'framer-motion';

const Archive = () => {
  return (
    <div style={{ backgroundColor: '#F9F9FB', minHeight: '100vh', padding: '0 40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Area */}
      <section style={{ position: 'relative', marginTop: '80px', marginBottom: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ maxWidth: '500px', zIndex: 10 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '30px' }}>
            Archive.
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
            A permanent record of visual explorations. Our philosophy is rooted in the preservation of intentional design — capturing the ephemeral nature of style within a monochromatic framework.
          </p>
        </div>
        <div style={{ position: 'absolute', right: '-80px', top: '-80px', fontSize: 'clamp(15rem, 30vw, 25rem)', fontFamily: "'Playfair Display', serif", color: 'rgba(0,0,0,0.03)', fontWeight: 700, letterSpacing: '-0.05em', pointerEvents: 'none' }}>
          001
        </div>
      </section>

      {/* Collection 001 */}
      <section style={{ marginBottom: '160px' }}>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>EST. 2024 / VOL 1</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Collection 001: Monochrome</h2>
        </div>

        <div style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
           {/* Left Portrait */}
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ flex: 1.2, position: 'relative' }}>
              <div style={{ borderRadius: '25px', overflow: 'hidden', aspectRatio: '4/5', width: '100%' }}>
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} alt="Portrait" />
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-80px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(15px)', padding: '40px', width: '70%', borderRadius: '25px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                 <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 600, marginBottom: '15px' }}>The Sculptural Form</h3>
                 <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Exploring the intersection of silhouette and shadow. An examination of the purity of the garment as a standalone architecture.</p>
              </div>
           </motion.div>

           {/* Right Texture */}
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ flex: 1, paddingLeft: '60px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ borderRadius: '25px', overflow: 'hidden', aspectRatio: '1/1', width: '90%', marginLeft: 'auto' }}>
                 <img src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} alt="Fabric Texture" />
             </div>
             <div style={{ width: '90%', marginLeft: 'auto', borderLeft: '2px solid #EAEAEA', paddingLeft: '20px' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', marginBottom: '10px' }}>MATERIAL STUDY</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>"Texture is the color of the void."</p>
             </div>
           </motion.div>
        </div>
      </section>

      {/* Collection 002 (Brutalist) */}
      <section style={{ marginBottom: '160px', display: 'flex', gap: '100px', alignItems: 'center' }}>
         {/* Left Box */}
         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ flex: 1, position: 'relative', borderRadius: '25px', overflow: 'hidden', aspectRatio: '4/5', backgroundColor: '#222' }}>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.7) contrast(1.2)' }} alt="Brutalist Architecture" />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 50%)' }}></div>
            <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#fff' }}>
               <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', color: '#aaa' }}>COMING WINTER</p>
               <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '2.2rem', fontWeight: 500 }}>Collection 002</h3>
            </div>
         </motion.div>

         {/* Right Text */}
         <div style={{ flex: 1.2 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 500, lineHeight: 1.1, marginBottom: '30px' }}>The Brutalist<br/>Movement.</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '450px', marginBottom: '50px' }}>
              A departure from the soft curves of our first entry. We are looking at concrete, steel, and the unyielding geometry of urban environments.
            </p>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>ARCHIVE ACCESS RESTRICTED</p>
         </div>
      </section>

      {/* Bottom Triptych */}
      <section style={{ marginBottom: '120px', display: 'flex', gap: '30px' }}>
         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ flex: 1, borderRadius: '25px', overflow: 'hidden', height: '600px' }}>
            <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(0.6)' }} alt="Racks" />
         </motion.div>

         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', height: '600px' }}>
            <div style={{ display: 'flex', gap: '30px', height: '285px' }}>
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ flex: 1, borderRadius: '25px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} alt="Watch Hand" />
               </motion.div>
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} style={{ flex: 1, borderRadius: '25px', overflow: 'hidden', backgroundColor: '#E0E0E0' }}>
                  <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2) brightness(1.2)', mixBlendMode: 'multiply' }} alt="Shoe" />
               </motion.div>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} style={{ flex: 1, backgroundColor: '#fff', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
               <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '2.5rem', fontWeight: 500, marginBottom: '20px' }}>"Fashion fades, style is eternal."</h3>
               <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>YVES SAINT LAURENT</p>
            </motion.div>
         </div>
      </section>

    </div>
  );
};

export default Archive;
