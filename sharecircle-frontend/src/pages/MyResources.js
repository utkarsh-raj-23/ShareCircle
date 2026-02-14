import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import ResourceCard from '../components/ResourceCard';
import './MyResources.css';

const MyResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('myItems'); // myItems, borrowing, requests

  useEffect(() => {
    fetchMyResources();
  }, []);

  const fetchMyResources = async () => {
    try {
      const response = await axios.get('/resources/my-resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/resources/${id}`);
        setResources(resources.filter(r => r._id !== id));
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert('Failed to delete resource');
      }
    }
  };

  return (
    <div className="my-resources-page">
      <div className="container">
        <div className="page-header">
          <h1>My Dashboard</h1>
          <Link to="/add-resource" className="btn btn-primary">
            + Add New Item
          </Link>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'myItems' ? 'active' : ''}`}
            onClick={() => setActiveTab('myItems')}
          >
            My Items
            <span className="tab-count">{resources.length}</span>
          </button>
          <button 
            className={`tab ${activeTab === 'borrowing' ? 'active' : ''}`}
            onClick={() => setActiveTab('borrowing')}
          >
            Borrowing
            <span className="tab-count">0</span>
          </button>
          <button 
            className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
            <span className="tab-count">0</span>
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'myItems' && (
            <div className="my-items-content">
              {loading ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Loading your items...</p>
                </div>
              ) : resources.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📦</div>
                  <h3>No items yet</h3>
                  <p>Start sharing by adding your first item</p>
                  <Link to="/add-resource" className="btn btn-primary">
                    List Your First Item
                  </Link>
                </div>
              ) : (
                <div className="resources-grid">
                  {resources.map((resource, index) => (
                    <div key={resource._id} className="resource-item">
                      <ResourceCard resource={resource} index={index} />
                      <div className="resource-actions">
                        <button className="action-btn edit-btn">
                          ✏️ Edit
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(resource._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'borrowing' && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No active borrows</h3>
              <p>Browse items to start borrowing</p>
              <Link to="/" className="btn btn-primary">
                Browse Items
              </Link>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="empty-state">
              <div className="empty-icon">📬</div>
              <h3>No pending requests</h3>
              <p>Requests for your items will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyResources;