import React from 'react';
import './CategoryFilter.css';

const categories = [
  { id: 'all', name: 'All', icon: '🌍' },
  { id: 'tools', name: 'Tools', icon: '🔨' },
  { id: 'electronics', name: 'Electronics', icon: '⚡' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'camping', name: 'Camping', icon: '⛺' },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
  { id: 'garden', name: 'Garden', icon: '🌱' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'other', name: 'Other', icon: '📦' },
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <div className="category-filter-scroll">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;