import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProductById } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>;
  if (error || !product) return <div style={{ textAlign: 'center', padding: '120px 0', minHeight: '100vh' }}><h1>Product not found.</h1></div>;

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  const handleAddToBag = () => {
    addToCart(product);
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div style={{ backgroundColor: '#F9F9FB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Main Product Section */}
        <section style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '60px 40px', display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
            
            {/* Left Image Column */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ flex: '1.2 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '100%', height: '700px', borderRadius: '35px', overflow: 'hidden', backgroundColor: '#F0F0F3', position: 'relative' }}>
                    <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={product.title} />
                    <button 
                        onClick={() => toggleWishlist(product)} 
                        style={{ position: 'absolute', top: '30px', right: '30px', backgroundColor: '#fff', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', fontSize: '1.2rem', color: isInWishlist(product.id) ? '#000' : '#888', transition: 'transform 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'}
                    >
                        {isInWishlist(product.id) ? '♥' : '♡'}
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '15px 0' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#000' }}></span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D0D0D0' }}></span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D0D0D0' }}></span>
                </div>

                {/* Decorative Thumbnails replicating the editorial layout */}
                <div style={{ display: 'flex', gap: '20px', height: '240px' }}>
                    <div style={{ flex: 1, backgroundColor: '#1A1D20', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', color: '#fff' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '15px' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em' }}>SAFE CHOICE</span>
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#34BCCC', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
                        <span style={{ fontSize: '5rem', fontWeight: 900, color: '#fff', transform: 'rotate(-5deg)', textShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>SALE</span>
                    </div>
                </div>
            </motion.div>

            {/* Right Details Column */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '15px' }}>ARCHIVE SERIES 01</p>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.03em' }}>{product.title}</h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span style={{ display: 'flex', gap: '2px' }}>
                        {'★★★★★'.split('').map((star, i) => <span key={i} style={{ color: '#000' }}>{star}</span>)}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>(128 Reviews)</span>
                </div>

                <p style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '40px' }}>${parseFloat(product.price).toFixed(2)}</p>

                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '50px', maxWidth: '480px' }}>
                    {product.description || "A study in silhouette and material. Crafted from a heavyweight Italian virgin wool blend, this piece features drop shoulders and a relaxed, architectural drape. Hand-finished seams provide a clean, invisible structural integrity."}
                </p>

                {/* Specifications List */}
                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>SPECIFICATIONS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.8rem', marginBottom: '50px', maxWidth: '480px' }}>
                    <div style={{ display: 'flex' }}><span style={{ width: '120px', color: 'var(--text-secondary)' }}>Material</span><span style={{ fontWeight: 600 }}>85% Virgin Wool, 15% Nylon</span></div>
                    <div style={{ display: 'flex' }}><span style={{ width: '120px', color: 'var(--text-secondary)' }}>Origin</span><span style={{ fontWeight: 600 }}>Milan, Italy</span></div>
                    <div style={{ display: 'flex' }}><span style={{ width: '120px', color: 'var(--text-secondary)' }}>Fit</span><span style={{ fontWeight: 600 }}>Oversized / Sculptural</span></div>
                </div>

                {/* Size Selector */}
                <div style={{ marginBottom: '40px', maxWidth: '480px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em' }}>SELECT SIZE</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer' }}>SIZE GUIDE</span>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {sizes.map(size => (
                            <button 
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                style={{ width: '50px', height: '50px', borderRadius: '50%', border: selectedSize === size ? 'none' : '1px solid #D0D0D0', backgroundColor: selectedSize === size ? '#000' : 'transparent', color: selectedSize === size ? '#fff' : '#000', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Buttons Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '480px', marginBottom: '40px' }}>
                    <button onClick={handleBuyNow} style={{ width: '100%', padding: '20px 0', borderRadius: '40px', backgroundColor: '#000', color: '#fff', fontSize: '0.85rem', fontWeight: 800, border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.target.style.opacity=0.8} onMouseOut={(e) => e.target.style.opacity=1}>
                        Buy Now
                    </button>
                    <button onClick={handleAddToBag} style={{ width: '100%', padding: '20px 0', borderRadius: '40px', backgroundColor: '#EAEAEA', color: '#000', fontSize: '0.85rem', fontWeight: 800, border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.target.style.opacity=0.8} onMouseOut={(e) => e.target.style.opacity=1}>
                        Add to Bag
                    </button>
                    <button onClick={() => setIsCartOpen(true)} style={{ width: '100%', padding: '18px 0', borderRadius: '40px', backgroundColor: 'transparent', color: '#000', fontSize: '0.85rem', fontWeight: 800, border: '1px solid #D0D0D0', textAlign: 'center', textDecoration: 'none', transition: 'border-color 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.borderColor='#000'} onMouseOut={(e) => e.target.style.borderColor='#D0D0D0'}>
                        View Bag
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid #EAEAEA', paddingTop: '25px', maxWidth: '480px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Secure Checkout
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 14h18M8 10l-4 4 4 4M21 14a7 7 0 1 0-7 7"></path></svg>
                        30 Day Returns
                    </div>
                </div>

            </div>
        </section>

        {/* Recommended Pairings Section */}
        <section style={{ backgroundColor: '#F3F3F5', padding: '100px 40px', marginTop: '40px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
                    <div>
                        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '10px' }}>COMPLETE THE LOOK</p>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Recommended Pairings</h2>
                    </div>
                    <Link to="/products" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'underline', color: '#000' }}>VIEW ALL</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {/* Item 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '30px', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#111' }}>
                            <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} alt="Structured Raw Jeans" />
                        </div>
                        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '5px' }}>DENIM</p>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '5px' }}>Structured Raw Jeans</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>$250.00</p>
                    </div>
                    
                    {/* Item 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '30px', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#F0F0F3' }}>
                            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)' }} alt="Gloss Chelsea Boot" />
                        </div>
                        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '5px' }}>FOOTWEAR</p>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '5px' }}>Gloss Chelsea Boot</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>$520.00</p>
                    </div>

                    {/* Item 3 */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '30px', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#EAEAEA' }}>
                            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Organic Cotton Tee" />
                        </div>
                        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '5px' }}>BASICS</p>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '5px' }}>Organic Cotton Tee</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>$85.00</p>
                    </div>
                </div>
            </div>
        </section>

    </div>
  );
};

export default ProductDetails;
