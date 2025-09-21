import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="marketplace">
      <div style={{background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>🛍️ Artisan Marketplace</h2>
        
        <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'}}>
          <input
            type="text"
            placeholder="🔍 Search crafts, artisans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{flex: 1, minWidth: '200px', padding: '0.8rem', borderRadius: '25px', border: '2px solid #ddd'}}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{padding: '0.8rem', borderRadius: '25px', border: '2px solid #ddd'}}
          >
            <option value="">All Categories</option>
            <option value="Textiles">Textiles</option>
            <option value="Pottery">Pottery</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Wood Craft">Wood Craft</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', color: 'white', fontSize: '1.2rem'}}>
            No products found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [showStory, setShowStory] = useState(false);

  const mockStory = {
    biography: `Meet ${product.artisan}, a master artisan from ${product.location}. With decades of dedication, they carry forward ancient traditions passed down through generations.`,
    culturalContext: `The art of ${product.category.toLowerCase()} in ${product.location} represents centuries of rich Indian craftsmanship heritage.`
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.category === 'Textiles' ? '🧵' : 
         product.category === 'Pottery' ? '🏺' : 
         product.category === 'Jewelry' ? '💍' : '🎨'}
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p style={{color: '#666', marginBottom: '0.5rem'}}>by {product.artisan}</p>
        <p style={{color: '#888', fontSize: '0.9rem', marginBottom: '1rem'}}>📍 {product.location}</p>
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <span style={{color: '#ffa500'}}>⭐ {product.rating}</span>
        </div>
        
        <button 
          onClick={() => setShowStory(!showStory)}
          style={{
            width: '100%', 
            padding: '0.8rem', 
            background: '#667eea', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            marginBottom: '0.5rem',
            cursor: 'pointer'
          }}
        >
          {showStory ? '📖 Hide Story' : '📚 Read Artisan Story'}
        </button>
        
        {showStory && (
          <div className="ai-story" style={{background: '#f8f9fa', color: '#333'}}>
            <h4>👤 About the Artisan</h4>
            <p style={{fontSize: '0.9rem', marginBottom: '1rem'}}>{mockStory.biography}</p>
            
            <h4>🏛️ Cultural Heritage</h4>
            <p style={{fontSize: '0.9rem'}}>{mockStory.culturalContext}</p>
          </div>
        )}
        
        <button 
          style={{
            width: '100%', 
            padding: '0.8rem', 
            background: '#ff6b6b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Marketplace;