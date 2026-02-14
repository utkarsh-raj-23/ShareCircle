import React from 'react';
import { Link } from 'react-router-dom';
import './ResourceCard.css';

const ResourceCard = ({ resource, index = 0 }) => {
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

  return (
    <Link 
      to={`/resource/${resource._id}`} 
      className="resource-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="resource-image-wrapper">
        <img 
          src={getImageUrl(resource.image)} 
          alt={resource.name}
          className="resource-image"
          onError={(e) => {
            e.target.src = '/placeholder-item.png';
          }}
        />
        {resource.isAvailable && (
          <div className="availability-badge">
            <div className="availability-dot"></div>
            Available
          </div>
        )}
        <div className="category-badge">
          <span className="category-icon">{getCategoryIcon(resource.category)}</span>
        </div>
      </div>

      <div className="resource-info">
        <h3 className="resource-name">{resource.name}</h3>
        
        {resource.rating && (
          <div className="resource-rating">
            <span className="stars">{getRatingStars(resource.rating)}</span>
            <span className="rating-value">{resource.rating.toFixed(1)}</span>
          </div>
        )}

        <div className="resource-owner">
          <div className="owner-avatar">
            {resource.owner?.name?.charAt(0) || 'U'}
          </div>
          <span className="owner-name">{resource.owner?.name || 'Unknown'}</span>
        </div>

        {resource.pricePerDay && (
          <div className="resource-price">
            <span className="price-amount">${resource.pricePerDay}</span>
            <span className="price-period">/day</span>
          </div>
        )}
      </div>

      <div className="card-hover-overlay">
        <button className="quick-view-btn">View Details</button>
      </div>
    </Link>
  );
};

export default ResourceCard;