import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../hooks/useCart';
import { useNavigate, Link } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('Zip Code is required'),
  cardNumber: yup.string().min(16, 'Invalid card number').required('Card number is required'),
  expiry: yup.string().required('Expiry is required'),
  cvc: yup.string().min(3, 'Invalid CVC').required('CVC is required'),
});

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const shippingCost = shippingMethod === 'express' ? 15 : 0;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shippingCost + tax;

  const onSubmit = (data) => {
    console.log("Order Submitted:", { ...data, shippingMethod, total: finalTotal });
    clearCart();
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </motion.div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '15px' }}>Purchase Complete</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>A confirmation email has been sent to your inbox.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '80vh' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '20px' }}>Your bag is currently empty</h2>
        <Link to="/products" style={{ display: 'inline-block', padding: '16px 40px', backgroundColor: '#000', color: '#fff', borderRadius: '30px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>ENTER ARCHIVE</Link>
      </div>
    );
  }

  const inputStyle = { width: '100%', padding: '14px 20px', borderRadius: '40px', border: '1px solid #EAEAEA', fontSize: '0.85rem', fontWeight: 500, outline: 'none', backgroundColor: '#fff', transition: 'border-color 0.2s', fontFamily: "'Inter', sans-serif" };
  const labelStyle = { display: 'block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '10px', textTransform: 'uppercase', color: 'var(--text-secondary)' };
  const sectionTitleStyle = { fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 500, marginBottom: '30px', borderBottom: '1px solid #F0F0F3', paddingBottom: '20px' };

  return (
    <div style={{ backgroundColor: '#FDFDFD', minHeight: '100vh', padding: '60px 40px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: '80px', alignItems: 'start' }}>
        
        {/* Left Form Side */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Shipping Address */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={sectionTitleStyle}>Shipping Address</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
               <div>
                  <label style={labelStyle}>First Name</label>
                  <input {...register('firstName')} placeholder="John" style={{ ...inputStyle, borderColor: errors.firstName ? '#ff4d4d' : '#EAEAEA' }} />
               </div>
               <div>
                  <label style={labelStyle}>Last Name</label>
                  <input {...register('lastName')} placeholder="Doe" style={{ ...inputStyle, borderColor: errors.lastName ? '#ff4d4d' : '#EAEAEA' }} />
               </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
               <label style={labelStyle}>Address</label>
               <input {...register('address')} placeholder="123 Curator Street" style={{ ...inputStyle, borderColor: errors.address ? '#ff4d4d' : '#EAEAEA' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <div>
                  <label style={labelStyle}>City</label>
                  <input {...register('city')} placeholder="New York" style={{ ...inputStyle, borderColor: errors.city ? '#ff4d4d' : '#EAEAEA' }} />
               </div>
               <div>
                  <label style={labelStyle}>Zip Code</label>
                  <input {...register('zipCode')} placeholder="10001" style={{ ...inputStyle, borderColor: errors.zipCode ? '#ff4d4d' : '#EAEAEA' }} />
               </div>
            </div>
          </section>

          {/* Shipping Method */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={sectionTitleStyle}>Shipping Method</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div 
                  onClick={() => setShippingMethod('standard')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 30px', borderRadius: '40px', border: `2px solid ${shippingMethod === 'standard' ? '#000' : '#EAEAEA'}`, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {shippingMethod === 'standard' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000' }}></div>}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>Standard Shipping</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>3-5 business days</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Free</span>
                </div>

                <div 
                  onClick={() => setShippingMethod('express')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 30px', borderRadius: '40px', border: `2px solid ${shippingMethod === 'express' ? '#000' : '#EAEAEA'}`, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {shippingMethod === 'express' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000' }}></div>}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>Express Shipping</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1-2 business days</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>$15.00</span>
                </div>
            </div>
          </section>

          {/* Payment Details */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={sectionTitleStyle}>Payment Details</h2>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
               <label style={labelStyle}>Card Number</label>
               <input {...register('cardNumber')} placeholder="0000 0000 0000 0000" style={{ ...inputStyle, paddingRight: '50px', borderColor: errors.cardNumber ? '#ff4d4d' : '#EAEAEA' }} />
               <svg style={{ position: 'absolute', right: '20px', top: '42px', opacity: 0.5 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <div>
                  <label style={labelStyle}>Expiry Date</label>
                  <input {...register('expiry')} placeholder="MM/YY" style={{ ...inputStyle, borderColor: errors.expiry ? '#ff4d4d' : '#EAEAEA' }} />
               </div>
               <div>
                  <label style={labelStyle}>CVC</label>
                  <input {...register('cvc')} placeholder="123" style={{ ...inputStyle, borderColor: errors.cvc ? '#ff4d4d' : '#EAEAEA' }} />
               </div>
            </div>
          </section>

        </form>

        {/* Right Sidebar - Order Summary Card */}
        <div style={{ position: 'sticky', top: '120px', backgroundColor: '#fff', borderRadius: '40px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.03)', border: '1px solid #F0F0F3' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '30px' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', maxHeight: '400px', overflowY: 'auto', marginBottom: '30px', paddingRight: '10px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '15px', backgroundColor: '#F9F9FB', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.title} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '180px' }}>{item.title}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Quantity: {item.quantity}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '4px' }}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #F0F0F3', paddingTop: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
               <span>Subtotal</span>
               <span style={{ color: '#000' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
               <span>Shipping</span>
               <span style={{ color: '#000' }}>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
               <span>Estimated Tax</span>
               <span style={{ color: '#000' }}>${tax.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, marginTop: '15px', paddingTop: '20px', borderTop: '2px solid #F0F0F3' }}>
               <span>Total</span>
               <span>${finalTotal.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleSubmit(onSubmit)}
              style={{ marginTop: '30px', width: '100%', padding: '20px 0', backgroundColor: '#000', color: '#fff', borderRadius: '40px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseOver={(e) => e.target.style.opacity=0.8}
              onMouseOut={(e) => e.target.style.opacity=1}
            >
              Complete Purchase
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', opacity: 0.4 }}>
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em' }}>SECURE SSL ENCRYPTION</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
