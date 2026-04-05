// Root application component - Configuration of providers and routes
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import ProductExplorer from './pages/ProductExplorer';
import NewArrivals from './pages/NewArrivals';
import Archive from './pages/Archive';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';

// The wrapper that organizes how the page looks (Header on top, content in middle, footer at bottom)
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

// The main App component where we wrap everything in the "Providers" (to share data like cart items or theme across the whole site)
function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <CustomCursor />
          <BrowserRouter>
            <Layout>
              {/* This section defines which page to show based on the URL in the browser bar */}
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
    </ThemeProvider>
  );
}

export default App;
