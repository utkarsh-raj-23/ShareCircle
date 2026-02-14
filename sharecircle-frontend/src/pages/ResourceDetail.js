import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './ResourceDetail.css';
import 'leaflet/dist/leaflet.css';

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    start: '',
    end: ''
  });

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      const response = await axios.get(`/resources/${id}`);
      setResource(response.data);
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrowRequest = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedDates.start || !selectedDates.end) {
      alert('Please select start and end dates');
      return;
    }

    try {
      await axios.post('/borrow-requests', {
        resourceId: id,
        startDate: selectedDates.start,
        endDate: selectedDates.end
      });
      alert('Borrow request sent successfully!');
    } catch (error) {
      console.error('Error creating borrow request:', error);
      alert('Failed to send request');
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      tools: '🔨',
      electronics: '⚡',
      sports: '⚽',
      camping: '⛺',
      kitchen: '🍳',
      garden: '🌱',
      books: '📚',
    };
    return icons[category] || '📦';
  };

  const getRatingStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-item.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading resource details...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="empty-state">
        <h2>Resource not found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="resource-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="detail-grid">
          <div className="detail-main">
            <div className="resource-images">
              <img 
                src={getImageUrl(resource.image)} 
                alt={resource.name}
                className="main-image"
                onError={(e) => {
                  e.target.src = '/placeholder-item.png';
                }}
              />
            </div>

            <div className="resource-content">
              <div className="resource-header">
                <div className="header-top">
                  <div className="category-badge-large">
                    <span className="icon">{getCategoryIcon(resource.category)}</span>
                    <span className="text">{resource.category}</span>
                  </div>
                  {resource.isAvailable && (
                    <div className="availability-badge-large">
                      <div className="dot"></div>
                      Available
                    </div>
                  )}
                </div>

                <h1 className="resource-title">{resource.name}</h1>

                {resource.rating && (
                  <div className="rating-display">
                    <span className="stars">{getRatingStars(resource.rating)}</span>
                    <span className="rating-value">{resource.rating.toFixed(1)}</span>
                    <span className="rating-count">(12 reviews)</span>
                  </div>
                )}
              </div>

              <div className="resource-description">
                <h3>About this item</h3>
                <p>{resource.description || 'No description provided.'}</p>
              </div>

              <div className="resource-owner-info">
                <h3>Owner</h3>
                <div className="owner-card">
                  <div className="owner-avatar-large">
                    {resource.owner?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="owner-details">
                    <h4>{resource.owner?.name || 'Unknown'}</h4>
                    <p className="owner-location">
                      📍 {resource.owner?.location || 'Location not specified'}
                    </p>
                    <div className="owner-stats">
                      <span className="stat">⭐ 4.8 rating</span>
                      <span className="stat">• 24 items shared</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="booking-card">
              <div className="price-section">
                {resource.pricePerDay ? (
                  <>
                    <span className="price">${resource.pricePerDay}</span>
                    <span className="price-period">/day</span>
                  </>
                ) : (
                  <span className="price-free">Free to borrow</span>
                )}
              </div>

              <div className="booking-form">
                <h4>Request to Borrow</h4>
                
                <div className="date-inputs">
                  <div className="date-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={selectedDates.start}
                      onChange={(e) => setSelectedDates({...selectedDates, start: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="date-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={selectedDates.end}
                      onChange={(e) => setSelectedDates({...selectedDates, end: e.target.value})}
                      min={selectedDates.start || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleBorrowRequest}
                  className="btn btn-primary btn-full"
                  disabled={!resource.isAvailable}
                >
                  {resource.isAvailable ? 'Request to Borrow' : 'Not Available'}
                </button>

                <p className="booking-note">
                  You won't be charged yet. The owner will review your request.
                </p>
              </div>

              <div className="features-list">
                <h4>Features</h4>
                <ul>
                  <li>✓ Insured during rental</li>
                  <li>✓ Free cancellation</li>
                  <li>✓ Local pickup</li>
                  <li>✓ Responsive owner</li>
                </ul>
              </div>
            </div>

            <div className="map-card">
              <h4>Location</h4>
              <div className="map-container">
                <MapContainer 
                  center={[40.7128, -74.0060]} 
                  zoom={12} 
                  style={{ height: '200px', width: '100%', borderRadius: '12px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Marker position={[40.7128, -74.0060]}>
                    <Popup>{resource.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <p className="location-text">
                📍 {resource.owner?.location || 'Location not specified'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;