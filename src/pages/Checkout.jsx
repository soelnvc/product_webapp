import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('Zip Code is required'),
});

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Order Submitted:", data);
    clearCart();
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Order Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Thank you for your purchase. Redirecting you home...</p>
      </motion.div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2 style={{ marginBottom: '20px' }}>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} style={{ padding: '12px 30px', backgroundColor: 'var(--color-black)', color: 'white', borderRadius: '30px' }}>Go Shopping</button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{ padding: '40px 0', display: 'flex', flexWrap: 'wrap', gap: '40px' }}
    >
      <div className="glass-panel" style={{ flex: '1 1 500px', padding: '30px', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '30px' }}>Checkout Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
            <input {...register('fullName')} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.fullName ? '1px solid red' : '1px solid var(--color-grey-lighter)' }} />
            {errors.fullName && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.fullName.message}</p>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
            <input {...register('email')} type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.email ? '1px solid red' : '1px solid var(--color-grey-lighter)' }} />
            {errors.email && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email.message}</p>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Shipping Address</label>
            <input {...register('address')} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.address ? '1px solid red' : '1px solid var(--color-grey-lighter)' }} />
            {errors.address && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.address.message}</p>}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>City</label>
              <input {...register('city')} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.city ? '1px solid red' : '1px solid var(--color-grey-lighter)' }} />
              {errors.city && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.city.message}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Zip Code</label>
              <input {...register('zipCode')} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.zipCode ? '1px solid red' : '1px solid var(--color-grey-lighter)' }} />
              {errors.zipCode && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.zipCode.message}</p>}
            </div>
          </div>
          <button type="submit" style={{ marginTop: '20px', padding: '16px', backgroundColor: 'var(--color-black)', color: 'white', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', border: 'none' }}>
            Place Order
          </button>
        </form>
      </div>

      <div className="glass-panel" style={{ flex: '1 1 300px', padding: '30px', borderRadius: '16px', height: 'fit-content' }}>
        <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.quantity}x {item.title.substring(0, 20)}...</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--color-grey-lighter)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem' }}>
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
