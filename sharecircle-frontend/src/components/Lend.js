import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Lend.css';

const Lend = () => {
  const { user } = useAuth();

  const benefits = [
    {
      icon: '💰',
      title: 'Earn Money',
      description: 'Make money from items you already own but rarely use'
    },
    {
      icon: '🌍',
      title: 'Help the Planet',
      description: 'Reduce waste and promote sustainable consumption'
    },
    {
      icon: '👥',
      title: 'Build Community',
      description: 'Connect with neighbors and strengthen local bonds'
    },
    {
      icon: '📦',
      title: 'Declutter',
      description: 'Make use of items collecting dust in your garage'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'List Your Item',
      description: 'Take a photo, add details, and set your price',
      icon: '📸'
    },
    {
      step: '2',
      title: 'Get Requests',
      description: 'Receive borrow requests from community members',
      icon: '📬'
    },
    {
      step: '3',
      title: 'Approve & Lend',
      description: 'Review requests and arrange pickup or delivery',
      icon: '✅'
    },
    {
      step: '4',
      title: 'Earn & Share',
      description: 'Get paid and help your community save money',
      icon: '🎉'
    }
  ];

  const popularItems = [
    { name: 'Power Tools', icon: '🔨', earning: '$50-100/month' },
    { name: 'Camping Gear', icon: '⛺', earning: '$30-80/month' },
    { name: 'Sports Equipment', icon: '⚽', earning: '$40-90/month' },
    { name: 'Kitchen Appliances', icon: '🍳', earning: '$25-60/month' },
    { name: 'Garden Tools', icon: '🌱', earning: '$20-50/month' },
    { name: 'Electronics', icon: '⚡', earning: '$60-150/month' }
  ];

  return (
    <div className="lend-page">
      {/* Hero Section */}
      <section className="lend-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Turn Your Unused Items Into Income</h1>
              <p>Share what you own, earn money, and help build a more sustainable community</p>
              <div className="hero-actions">
                <Link to={user ? "/add-resource" : "/register"} className="btn btn-primary btn-large">
                  {user ? '✨ List Your First Item' : '🚀 Get Started Free'}
                </Link>
                <a href="#how-it-works" className="btn btn-outline btn-large">
                  📖 Learn How
                </a>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">2,500+</span>
                  <span className="stat-label">Items Listed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">$800</span>
                  <span className="stat-label">Avg Monthly Earnings</span>
                </div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-placeholder">
                <div className="placeholder-icon">📦</div>
                <p>Your Items, Their Money, Our Planet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Lend on ShareCircle?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="popular-items-section">
        <div className="container">
          <h2 className="section-title">Popular Items to Lend</h2>
          <p className="section-subtitle">See what others are earning with similar items</p>
          <div className="popular-grid">
            {popularItems.map((item, index) => (
              <div key={index} className="popular-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="popular-icon">{item.icon}</div>
                <h4>{item.name}</h4>
                <p className="earning-amount">{item.earning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Earning?</h2>
            <p>Join thousands of lenders making money from their unused items</p>
            <Link to={user ? "/add-resource" : "/register"} className="btn btn-primary btn-large">
              {user ? '✨ List an Item Now' : '🚀 Sign Up Free'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lend;