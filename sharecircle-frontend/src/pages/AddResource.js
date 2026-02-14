import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AddResource.css';

const AddResource = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'tools',
    pricePerDay: '',
    location: '',
    condition: 'excellent',
    isAvailable: true,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { value: 'tools', label: 'Tools', icon: '🔨' },
    { value: 'electronics', label: 'Electronics', icon: '⚡' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'camping', label: 'Camping', icon: '⛺' },
    { value: 'kitchen', label: 'Kitchen', icon: '🍳' },
    { value: 'garden', label: 'Garden', icon: '🌱' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'other', label: 'Other', icon: '📦' },
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent - Like New' },
    { value: 'good', label: 'Good - Minor Wear' },
    { value: 'fair', label: 'Fair - Shows Use' },
    { value: 'poor', label: 'Poor - Functional' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      if (image) {
        submitData.append('image', image);
      }

      await axios.post('/resources', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success message
      alert('Item listed successfully! 🎉');
      navigate('/my-resources');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add resource');
    } finally {
      setLoading(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : '📦';
  };

  return (
    <div className="add-resource-page">
      <div className="container">
        <div className="add-resource-container">
          <div className="page-header">
            <div>
              <h1>List a New Item</h1>
              <p>Share your unused items with the community</p>
            </div>
            <button 
              onClick={togglePreview} 
              className={`btn ${showPreview ? 'btn-secondary' : 'btn-outline'}`}
            >
              {showPreview ? '✏️ Edit' : '👁️ Preview'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {!showPreview ? (
            <form onSubmit={handleSubmit} className="resource-form">
              <div className="form-section">
                <h3>Item Details</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Item Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Cordless Drill, Camping Tent"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Describe your item, its condition, what it's good for..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="condition">Condition *</label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                    >
                      {conditions.map(cond => (
                        <option key={cond.value} value={cond.value}>
                          {cond.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="pricePerDay">Price per Day ($)</label>
                    <input
                      type="number"
                      id="pricePerDay"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00 (Leave empty for free)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Brooklyn, NY"
                    />
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleChange}
                    />
                    <span>Available for borrowing now</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h3>Upload Photo</h3>
                
                <div className="image-upload">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <label htmlFor="image" className="file-label">
                    {preview ? (
                      <div className="preview-container">
                        <img src={preview} alt="Preview" className="image-preview" />
                        <div className="preview-overlay">
                          <span>Click to change image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <div className="upload-icon">📷</div>
                        <p>Click to upload an image</p>
                        <span>PNG, JPG up to 5MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={() => navigate(-1)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Listing...' : '✨ List Item'}
                </button>
              </div>
            </form>
          ) : (
            <div className="preview-mode">
              <div className="preview-card">
                <div className="preview-header">
                  <h3>📱 Preview - How your item will look</h3>
                  <span className="preview-badge">Preview Mode</span>
                </div>

                <div className="resource-preview">
                  <div className="preview-image-wrapper">
                    {preview ? (
                      <img src={preview} alt={formData.name} className="preview-main-image" />
                    ) : (
                      <div className="preview-no-image">
                        <div className="no-image-icon">🖼️</div>
                        <p>No image uploaded yet</p>
                      </div>
                    )}
                    {formData.isAvailable && (
                      <div className="preview-availability-badge">
                        <div className="preview-dot"></div>
                        Available
                      </div>
                    )}
                    <div className="preview-category-badge">
                      <span>{getCategoryIcon(formData.category)}</span>
                    </div>
                  </div>

                  <div className="preview-content">
                    <div className="preview-header-info">
                      <h2 className="preview-title">
                        {formData.name || 'Item Name'}
                      </h2>
                      <div className="preview-meta">
                        <span className="preview-category">
                          {getCategoryIcon(formData.category)} {formData.category}
                        </span>
                        <span className="preview-condition">
                          Condition: {formData.condition}
                        </span>
                      </div>
                    </div>

                    {formData.description && (
                      <div className="preview-description">
                        <h4>About this item</h4>
                        <p>{formData.description}</p>
                      </div>
                    )}

                    <div className="preview-details">
                      <div className="preview-detail-item">
                        <span className="detail-label">📍 Location:</span>
                        <span className="detail-value">
                          {formData.location || 'Not specified'}
                        </span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="detail-label">💰 Price:</span>
                        <span className="detail-value">
                          {formData.pricePerDay ? `$${formData.pricePerDay}/day` : 'Free'}
                        </span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="detail-label">✨ Condition:</span>
                        <span className="detail-value">
                          {conditions.find(c => c.value === formData.condition)?.label}
                        </span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="detail-label">📅 Status:</span>
                        <span className={`detail-value ${formData.isAvailable ? 'available' : 'unavailable'}`}>
                          {formData.isAvailable ? '✅ Available Now' : '🔒 Not Available'}
                        </span>
                      </div>
                    </div>

                    <div className="preview-actions">
                      <button className="preview-action-btn primary">
                        Request to Borrow
                      </button>
                      <button className="preview-action-btn secondary">
                        Contact Owner
                      </button>
                    </div>
                  </div>
                </div>

                <div className="preview-footer">
                  <p>💡 This is how your item will appear to other users</p>
                  <button onClick={togglePreview} className="btn btn-primary">
                    ✏️ Continue Editing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddResource;