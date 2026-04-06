// This list contains all the products with their names, prices, and images
const mockProducts = [
  { id: 1, title: 'Sculpted Wool Overcoat', price: 890, category: "men's clothing", image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop', rating: 4.8, createdAt: '2024-03-10' },
  { id: 2, title: 'Essential Base Layer', price: 120, category: "women's clothing", image: 'https://images.unsplash.com/photo-1582126893264-902ba4033b00?q=80&w=600&auto=format&fit=crop', rating: 4.5, createdAt: '2024-02-15' },
  { id: 3, title: 'Nero Leather Trainer', price: 450, category: "men's clothing", image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', rating: 4.9, createdAt: '2024-03-20' },
  { id: 4, title: 'Cashmere V-Neck', price: 520, category: "women's clothing", image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=600&auto=format&fit=crop', rating: 4.7, createdAt: '2024-01-10' },
  { id: 5, title: 'Architectural Trouser', price: 380, category: "men's clothing", image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop', rating: 4.6, createdAt: '2024-03-05' },
  { id: 6, title: 'Gallery Tote Bag', price: 740, category: "jewelery", image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop', rating: 4.4, createdAt: '2024-02-28' },
  { id: 7, title: 'Minimalist Timepiece', price: 1100, category: "jewelery", image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', rating: 5.0, createdAt: '2024-03-25' },
  { id: 8, title: 'Oversized Silk Shirt', price: 410, category: "women's clothing", image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', rating: 4.3, createdAt: '2024-01-20' },
  { id: 9, title: 'Structured Blazer', price: 950, category: "men's clothing", image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', rating: 4.7, createdAt: '2024-03-15' },
  { id: 10, title: 'Studio Headphones', price: 600, category: "electronics", image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop', rating: 4.8, createdAt: '2024-02-05' }
];

export const newArrivalsInventory = [
  // Block 1
  { type: 'tall', title: 'Trench Coat', price: '$1,850', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop' },
  { type: 'wide', title: 'Fragment Jewelry Series', price: 'From $420', img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop', limited: true },
  { type: 'square', title: 'Aero-Form Footwear', price: '$650', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop', background: '#E0E0E0' },
  { type: 'square', title: 'Tension Knit', price: '$640', img: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=600&auto=format&fit=crop', grayscale: true },
  { type: 'square', title: 'Orbital Bag', price: '$1,100', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop', grayscale: true, dimmed: true },
  { type: 'philosophy', title: 'Precision in Simplicity', desc: 'Our latest collection explores the boundaries of tailoring, where every seam serves a purpose.', img: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  
  // Block 2
  { type: 'tall', title: 'Cashmere Cardigan', price: '$940', img: 'https://images.unsplash.com/photo-1582126893264-902ba4033b00?q=80&w=800&auto=format&fit=crop' },
  { type: 'wide', title: 'Oblique Sunglasses', price: '$350', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop', limited: false },
  { type: 'square', title: 'Structured Blazer', price: '$1,200', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', grayscale: true },
  { type: 'square', title: 'Silk Wrap Skirt', price: '$580', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop', background: 'var(--surface-container-highest)' },
  { type: 'square', title: 'Leather Loafer', price: '$720', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', background: '#E0E0E0' },
  { type: 'philosophy', title: 'The Modern Form', desc: 'Sartorial innovation meeting daily wearability without compromise on form or function.', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop' },

  // Block 3
  { type: 'tall', title: 'Oversized Silk Shirt', price: '$410', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop' },
  { type: 'wide', title: 'Curated Cologne', price: '$220', img: 'https://images.unsplash.com/photo-1523293111619-3ee2ce7afb76?q=80&w=1000&auto=format&fit=crop', limited: true },
  { type: 'square', title: 'Minimalist Timepiece', price: '$1,100', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', background: '#E0E0E0' },
  { type: 'square', title: 'Gallery Tote Bag', price: '$740', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop' },
  { type: 'square', title: 'Architectural Trouser', price: '$380', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop', grayscale: true },
  { type: 'philosophy', title: 'Ethical Supply', desc: 'Crafted exclusively with sustainable materials sourced directly from artisanal makers globally.', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop' },
  
  // Block 4
  { type: 'tall', title: 'Merino Wool Beanie', price: '$120', img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop' },
  { type: 'wide', title: 'Studio Headphones', price: '$600', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', limited: false },
  { type: 'square', title: 'Essential Base Layer', price: '$120', img: 'https://images.unsplash.com/photo-1533055640609-24b498f3b0e3?q=80&w=600&auto=format&fit=crop' },
  { type: 'square', title: 'Canvas Backpack', price: '$220', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop' },
  { type: 'square', title: 'Ceramic Mug Set', price: '$90', img: 'https://images.unsplash.com/photo-1610701596007-11503z212c01?q=80&w=600&auto=format&fit=crop' },
  { type: 'philosophy', title: 'The Final Details', desc: 'True artistry exists in the finishing layers, ensuring nothing goes unnoticed.', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
];

// This function asks for the full list of all products
export const fetchProducts = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockProducts), 500));
};

// This function asks for just one single product using its ID number
export const fetchProductById = async (id) => {
  return new Promise(resolve => setTimeout(() => {
    if (id.toString().startsWith('na-')) {
       const idx = parseInt(id.toString().replace('na-', ''));
       const item = newArrivalsInventory[idx];
       if (item) {
          resolve({
             id: id,
             title: item.title,
             price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
             category: "New Arrivals",
             description: item.desc || "Exploring the intersection of architectural form and wearable art. This exclusive item is part of our latest S/S 2024 DROP.",
             image: item.img
          });
       } else {
          resolve(null);
       }
    } else {
       resolve(mockProducts.find(p => p.id === parseInt(id)));
    }
  }, 500));
};

// This function lists the different groups products can belong to (like Tech or Clothing)
export const fetchCategories = async () => {
  return new Promise(resolve => setTimeout(() => resolve(["electronics", "jewelery", "men's clothing", "women's clothing"]), 500));
};

// This function gets only the products from one group (like just "Men's Clothing")
export const fetchProductsByCategory = async (category) => {
  return new Promise(resolve => setTimeout(() => resolve(mockProducts.filter(p => p.category === category)), 500));
};

export default { fetchProducts, fetchProductById, fetchCategories, fetchProductsByCategory, newArrivalsInventory };
