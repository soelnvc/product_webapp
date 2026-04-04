import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Background Blur Overlay Element */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', zIndex: 900 }}
                    />
                    
                    {/* The Right-Side Panel */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '420px', height: '100vh', backgroundColor: 'rgba(250, 250, 250, 0.75)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)', borderLeft: '1px solid rgba(255,255,255,0.4)', zIndex: 1000, display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 50px rgba(0,0,0,0.08)' }}
                    >
                        {/* Header Block */}
                        <div style={{ padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '5px' }}>Shopping Bag</h2>
                                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                                    {cartItems.length} ITEMS SELECTED
                                </p>
                            </div>
                            <button onClick={() => setIsCartOpen(false)} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EAEAEA', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#D0D0D0'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='#EAEAEA'}>
                                ✕
                            </button>
                        </div>

                        {/* Scrollable Products List */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '0 40px' }}>
                            {cartItems.length === 0 ? (
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '40px' }}>Your bag is empty.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', paddingBottom: '40px' }}>
                                    {cartItems.map((item) => (
                                        <div key={item.id} style={{ display: 'flex', gap: '20px' }}>
                                            
                                            {/* Thumbnail Block */}
                                            <div style={{ width: '80px', height: '80px', borderRadius: '12px', backgroundColor: '#111', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>

                                            {/* Text Block Details */}
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <div>
                                                        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>{item.title}</h3>
                                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Size: Medium</p>
                                                    </div>
                                                    <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>${parseFloat(item.price).toFixed(0)}</p>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                                    {/* Pill Counter */}
                                                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F0F0F3', borderRadius: '20px', padding: '2px' }}>
                                                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>−</button>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>+</button>
                                                    </div>
                                                    
                                                    {/* Remove link */}
                                                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', textDecoration: 'underline', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer Summary Block */}
                        <div style={{ padding: '30px 40px 40px 40px', backgroundColor: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em' }}>COMPLIMENTARY</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '20px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Total</span>
                                <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>${cartTotal.toFixed(2)}</span>
                            </div>

                            <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#000', color: '#fff', padding: '18px 0', borderRadius: '40px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.target.style.opacity = 0.8} onMouseOut={(e) => e.target.style.opacity = 1}>
                                CHECKOUT
                            </button>

                            <p style={{ textAlign: 'center', fontSize: '0.55rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '10px' }}>
                                Taxes and duties are calculated during checkout.<br/>Carbon-neutral delivery included.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
