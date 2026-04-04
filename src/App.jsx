import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import ProductExplorer from './pages/ProductExplorer';
import NewArrivals from './pages/NewArrivals';
import Archive from './pages/Archive';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';

const Layout = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <CartDrawer />
    <main style={{ flex: 1 }}>
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductExplorer />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
