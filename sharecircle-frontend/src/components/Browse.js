import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ResourceCard from '../components/ResourceCard';
import './Browse.css';

const Browse = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterAndSortResources();
  }, [selectedCategory, searchTerm, resources, sortBy]);

  const fetchResources = async () => {
    try {
      const response = await axios.get('/resources');
      setResources(response.data);
    } catch (error) {
      console.log('Using demo data');
      // Demo data for testing
      setResources(generateDemoResources());
    } finally {
      setLoading(false);
    }
  };

  const generateDemoResources = () => {
    return [
      {
        _id: '1',
        name: 'Power Drill Set',
        description: 'Professional DeWalt drill with multiple bits',
        category: 'tools',
        pricePerDay: 10,
        isAvailable: true,
        rating: 4.8,
        owner: { name: 'John Smith' }
      },
      {
        _id: '2',
        name: 'Camping Tent - 4 Person',
        description: 'Waterproof Coleman tent, perfect condition',
        category: 'camping',
        pricePerDay: 15,
        isAvailable: true,
        rating: 4.5,
        owner: { name: 'Sarah Johnson' }
      },
      {
        _id: '3',
        name: 'Mountain Bike',
        description: 'Trek mountain bike, well maintained',
        category: 'sports',
        pricePerDay: 20,
        isAvailable: true,
        rating: 4.9,
        owner: { name: 'Mike Davis' }
      },
      {
        _id: '4',
        name: 'KitchenAid Mixer',
        description: 'Stand mixer with attachments',
        category: 'kitchen',
        pricePerDay: 8,
        isAvailable: false,
        rating: 4.7,
        owner: { name: 'Emily Brown' }
      },
      {
        _id: '5',
        name: 'Garden Tools Set',
        description: 'Complete gardening toolkit',
        category: 'garden',
        pricePerDay: 5,
        isAvailable: true,
        rating: 4.6,
        owner: { name: 'Tom Wilson' }
      },
      {
        _id: '6',
        name: 'Projector',
        description: 'HD projector for presentations',
        category: 'electronics',
        pricePerDay: 25,
        isAvailable: true,
        rating: 4.8,
        owner: { name: 'Lisa Anderson' }
      }
    ];
  };

  const filterAndSortResources = () => {
    let filtered = [...resources];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.reverse();
        break;
      case 'price-low':
        filtered.sort((a, b) => (a.pricePerDay || 0) - (b.pricePerDay || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.pricePerDay || 0) - (a.pricePerDay || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
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
    <div className="browse-page">
      <div className="browse-header">
        <div className="container">
          <h1>Browse Items</h1>
          <p>Discover amazing items shared by your community</p>
          <SearchBar onSearch={handleSearch} placeholder="Search items..." />
        </div>
      </div>

      <div className="container">
        <div className="browse-controls">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="sort-controls">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="browse-results">
          <div className="results-header">
            <h2>
              {filteredResources.length} item{filteredResources.length !== 1 ? 's' : ''} found
            </h2>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading items...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No items found</h3>
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
      </div>
    </div>
  );
};

export default Browse;