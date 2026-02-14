import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">🌱</div>
          <span className="logo-text">ShareCircle</span>
        </Link>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Browse
          </Link>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Lend
          </Link>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Community
          </Link>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Prompts
          </Link>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Messages
          </Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/add-resource" className="btn btn-primary">
                List Item
              </Link>
              <div className="user-menu">
                <button className="user-avatar">
                  {user.name?.charAt(0) || 'U'}
                </button>
                <div className="user-dropdown">
                  <Link to="/my-resources" className="dropdown-item">
                    My Resources
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
          
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;