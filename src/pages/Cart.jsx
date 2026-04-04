import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + tax;

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', padding: '0 40px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Area */}
      <section style={{ marginTop: '80px', marginBottom: '80px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>CURATED CART</h1>
        <p style={{ marginTop: '20px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
             YOUR PRIVATE ARCHIVE — ({cartItems.length}) ITEMS
        </p>
      </section>

      {/* Main Grid Area */}
      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.8fr) minmax(320px, 1fr)', gap: '60px', paddingBottom: '100px', alignItems: 'start' }}>
         
         {/* LEFT COLUMN: Cart Items */}
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cartItems.length === 0 ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '60px 0', borderTop: '1px solid #EAEAEA' }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Your cart is empty.</p>
                  <Link to="/products" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: 'var(--archive-btn-bg)', color: 'var(--primary)', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none' }}>
                     RETURN TO EXPLORE
                  </Link>
               </motion.div>
            ) : (
               cartItems.map((item, idx) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} style={{ display: 'flex', gap: '30px', padding: '40px 0', borderBottom: idx === cartItems.length - 1 ? 'none' : '1px solid #EAEAEA' }}>
                     
                     {/* Product Image */}
                     <Link to={`/product/${item.id}`} style={{ display: 'block', width: '220px', height: '280px', borderRadius: '25px', overflow: 'hidden', backgroundColor: '#F0F0F3', flexShrink: 0 }}>
                         <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'var(--image-blend, multiply)' }} alt={item.title} />
                     </Link>

                     {/* Product Details */}
                     <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px 0' }}>
                         
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                            <div>
                                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                   <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>{item.title}</h3>
                                </Link>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{item.category || 'Archive Default'} / 1 Size</p>
                            </div>
                            <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>${parseFloat(item.price).toFixed(2)}</p>
                         </div>
                         
                         {/* Controls: Quantity & Remove */}
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             
                             <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EAEAEA', borderRadius: '30px', padding: '2px' }}>
                                 <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ padding: '8px 15px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color='#000'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
                                   −
                                 </button>
                                 <span style={{ fontSize: '0.85rem', fontWeight: 600, width: '24px', textAlign: 'center' }}>{item.quantity}</span>
                                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '8px 15px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color='#000'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
                                   +
                                 </button>
                             </div>

                             <button onClick={() => removeFromCart(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color='#000'} onMouseOut={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                                 REMOVE
                             </button>

                         </div>
                     </div>

                  </motion.div>
               ))
            )}
         </div>

         {/* RIGHT COLUMN: Order Summary */}
         <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Summary Card */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ backgroundColor: 'var(--surface-container-highest)', borderRadius: '35px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
               <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '35px' }}>ORDER SUMMARY</h2>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                       <span>Subtotal</span>
                       <span style={{ color: 'var(--primary)', fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, alignItems: 'center' }}>
                       <span>Shipping</span>
                       <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.1em' }}>COMPLIMENTARY</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                       <span>Tax</span>
                       <span style={{ color: 'var(--primary)', fontWeight: 600 }}>${tax.toFixed(2)}</span>
                   </div>
               </div>

               <div style={{ borderTop: '1px solid #EAEAEA', paddingTop: '30px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800 }}>Total</span>
                   <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 800 }}>${finalTotal.toFixed(2)}</span>
               </div>

               <Link to="/checkout" style={{ display: 'block', width: '100%', backgroundColor: 'var(--primary)', color: 'var(--on-primary)', textAlign: 'center', padding: '18px 0', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textDecoration: 'none', transition: 'box-shadow 0.2s', marginBottom: '35px' }} onMouseOver={(e) => e.currentTarget.style.boxShadow='0 10px 20px rgba(0,0,0,0.2)'} onMouseOut={(e) => e.currentTarget.style.boxShadow='none'}>
                  PROCEED TO CHECKOUT
               </Link>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                       Secure encrypted checkout
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 3h15v13H1z"></path><path d="M16 8h4l3 3v5h-7V8z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                       Free worldwide express delivery
                   </div>
               </div>
            </motion.div>

            {/* Promo Code Bubble */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} style={{ border: '1px dashed #D0D0D0', borderRadius: '35px', padding: '30px 40px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
               <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>HAVE A PROMOTIONAL CODE?</p>
               <div style={{ display: 'flex', width: '100%', gap: '10px', backgroundColor: '#F0F0F3', borderRadius: '25px', overflow: 'hidden' }}>
                  <input type="text" placeholder="CODE" style={{ flex: 1, padding: '15px 20px', backgroundColor: 'transparent', border: 'none', fontSize: '0.8rem', outline: 'none', color: 'var(--primary)', fontWeight: 500 }} />
                  <button style={{ backgroundColor: 'transparent', color: 'var(--primary)', border: 'none', padding: '0 25px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer' }}>APPLY</button>
               </div>
            </motion.div>

         </div>

      </section>
    </div>
  );
};

export default Cart;
