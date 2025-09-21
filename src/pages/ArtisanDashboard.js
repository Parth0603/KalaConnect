import React, { useState } from 'react';
import axios from 'axios';

const ArtisanDashboard = () => {
  const [artisan, setArtisan] = useState({
    name: '',
    craft: '',
    location: '',
    experience: '',
    phone: ''
  });
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setArtisan({
      ...artisan,
      [e.target.name]: e.target.value
    });
  };

  const generateStory = async () => {
    if (!artisan.name || !artisan.craft || !artisan.location) {
      alert('Please fill in name, craft, and location first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/ai/generate-story', artisan);
      setStory(response.data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Error generating story. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h2 style={{color: 'white', marginBottom: '2rem'}}>🎨 Artisan Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📝 Artisan Profile</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={artisan.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label>Craft Specialization</label>
            <select name="craft" value={artisan.craft} onChange={handleInputChange}>
              <option value="">Select your craft</option>
              <option value="Pottery">Pottery</option>
              <option value="Weaving">Weaving</option>
              <option value="Jewelry Making">Jewelry Making</option>
              <option value="Wood Carving">Wood Carving</option>
              <option value="Embroidery">Embroidery</option>
              <option value="Painting">Painting</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={artisan.location}
              onChange={handleInputChange}
              placeholder="e.g., Varanasi, Uttar Pradesh"
            />
          </div>
          
          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={artisan.experience}
              onChange={handleInputChange}
              placeholder="Years"
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={artisan.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div className="dashboard-card">
          <h3>🤖 AI Story Generator</h3>
          <p>Generate compelling stories about your craft and heritage using AI</p>
          
          <button 
            className="btn primary" 
            onClick={generateStory}
            disabled={loading}
            style={{width: '100%', marginTop: '1rem'}}
          >
            {loading ? '🔄 Generating...' : '✨ Generate My Story'}
          </button>
          
          {story && (
            <div className="ai-story">
              <h4>📖 Your Biography</h4>
              <p>{story.biography}</p>
              
              <h4 style={{marginTop: '1rem'}}>🏺 Product Description</h4>
              <p>{story.productDescription}</p>
              
              <h4 style={{marginTop: '1rem'}}>🏛️ Cultural Context</h4>
              <p>{story.culturalContext}</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <h3>📊 Quick Stats</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <div style={{textAlign: 'center', padding: '1rem', background: '#f0f8ff', borderRadius: '10px'}}>
            <h4>📈 Sales This Month</h4>
            <p style={{fontSize: '1.5rem', color: '#ff6b6b'}}>₹0</p>
          </div>
          <div style={{textAlign: 'center', padding: '1rem', background: '#f0fff0', borderRadius: '10px'}}>
            <h4>👥 New Customers</h4>
            <p style={{fontSize: '1.5rem', color: '#32cd32'}}>0</p>
          </div>
          <div style={{textAlign: 'center', padding: '1rem', background: '#fff8dc', borderRadius: '10px'}}>
            <h4>📦 Products Listed</h4>
            <p style={{fontSize: '1.5rem', color: '#ffa500'}}>0</p>
          </div>
          <div style={{textAlign: 'center', padding: '1rem', background: '#ffe4e1', borderRadius: '10px'}}>
            <h4>⭐ Average Rating</h4>
            <p style={{fontSize: '1.5rem', color: '#ff69b4'}}>New</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;