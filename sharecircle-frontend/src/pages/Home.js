import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ResourceCard from '../components/ResourceCard';
import './Home.css';

const Home = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [selectedCategory, searchTerm, resources]);

  const fetchResources = async () => {
    try {
      const response = await axios.get('/resources');
      setResources(response.data);
      setFilteredResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Access Over
              <br />
              <span className="highlight">Ownership.</span> Together.
            </h1>
            <p className="hero-subtitle">
              Share resources with your community. Borrow what you need, lend what you don't use.
            </p>
            <div className="hero-actions">
              <Link to="/add-resource" className="btn btn-primary btn-large">
                ✨ List an Item
              </Link>
              <button className="btn btn-secondary btn-large">
                🔍 Browse Items
              </button>
            </div>
          </div>

          <div className="hero-image">
            <div className="floating-card floating-card-1">
              <div className="card-icon">🌱</div>
              <div className="card-text">3 plants near you</div>
            </div>
          </div>
        </div>

        <div className="hero-search">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="quick-actions">
          <button className="quick-action-btn">
            <div className="action-icon">👤</div>
          </button>
          <button className="quick-action-btn">
            <div className="action-icon">🏠</div>
          </button>
          <button className="quick-action-btn">
            <div className="action-icon">📍</div>
          </button>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">List Your New Items</h2>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No resources found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="resources-grid">
              {filteredResources.map((resource, index) => (
                <ResourceCard 
                  key={resource._id} 
                  resource={resource}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Items: Wheels</h2>
          <div className="featured-grid">
            {filteredResources.slice(0, 4).map((resource, index) => (
              <ResourceCard 
                key={resource._id} 
                resource={resource}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <h3 className="stat-number">2,500+</h3>
              <p className="stat-label">Items Shared</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <h3 className="stat-number">1,200+</h3>
              <p className="stat-label">Community Members</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">♻️</div>
              <h3 className="stat-number">50,000+</h3>
              <p className="stat-label">CO₂ Saved (kg)</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <h3 className="stat-number">Rs.75,000+</h3>
              <p className="stat-label">Money Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <Link to="/add-resource" className="fab" title="List an Item">
        <span className="fab-icon">+</span>
      </Link>
    </div>
  );
};

export default Home;