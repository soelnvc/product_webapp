import React, { createContext, useReducer, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, cartId: uuidv4(), quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // Initialize from local storage if available
  const initialState = {
    items: JSON.parse(localStorage.getItem('cart') || '[]')
  };
  
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.title} added to bag`, {
      style: { backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--outline-variant)', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }
    });
  };
  
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.info('Item removed from bag', {
      style: { backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--outline-variant)', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }
    });
  };
  
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('Bag cleared', {
      style: { backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--outline-variant)', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }
    });
  };

  const cartTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems: state.items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount,
      isCartOpen,
      setIsCartOpen,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
