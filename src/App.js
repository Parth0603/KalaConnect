import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArtisanDashboard from './pages/ArtisanDashboard';
import Marketplace from './pages/Marketplace';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="nav-container">
            <h1 className="logo">🎨 CraftStory AI</h1>
            <nav className="nav">
              <Link to="/" onClick={() => setCurrentView('home')}>Home</Link>
              <Link to="/marketplace" onClick={() => setCurrentView('marketplace')}>Marketplace</Link>
              <Link to="/dashboard" onClick={() => setCurrentView('dashboard')}>Artisan Dashboard</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/dashboard" element={<ArtisanDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h2>Empowering Local Artisans Through AI</h2>
        <p>Bridge traditional craftsmanship with modern digital audiences</p>
        <div className="cta-buttons">
          <Link to="/dashboard" className="btn primary">Join as Artisan</Link>
          <Link to="/marketplace" className="btn secondary">Explore Crafts</Link>
        </div>
      </section>
      
      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🤖 AI Story Generation</h3>
            <p>Automatically create compelling narratives about your craft and heritage</p>
          </div>
          <div className="feature-card">
            <h3>📸 Smart Product Showcase</h3>
            <p>AI-enhanced photography and 360° product visualization</p>
          </div>
          <div className="feature-card">
            <h3>🌐 Multi-language Support</h3>
            <p>Real-time translation preserving cultural context</p>
          </div>
          <div className="feature-card">
            <h3>📊 Business Intelligence</h3>
            <p>AI-powered insights for pricing and market trends</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;