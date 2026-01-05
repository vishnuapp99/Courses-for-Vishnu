import React from 'react';
import './PatternCategories.css';

const PatternCategories = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Patterns', icon: 'bi-grid-3x3-gap', color: '#667eea' },
    { id: 'creational', name: 'Creational', icon: 'bi-hammer', color: '#1976d2' },
    { id: 'structural', name: 'Structural', icon: 'bi-diagram-2', color: '#7b1fa2' },
    { id: 'behavioral', name: 'Behavioral', icon: 'bi-arrow-repeat', color: '#e65100' }
  ];

  return (
    <div className="category-filter animate__animated animate__fadeIn">
      <div className="text-center mb-4">
        <h2 className="text-white fw-bold mb-3">
          <i className="bi bi-funnel me-2"></i>
          Filter by Category
        </h2>
        <div className="d-flex flex-wrap justify-content-center">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn filter-btn ${
                selectedCategory === category.id ? 'active' : 'btn-light'
              } animate__animated animate__zoomIn`}
              onClick={() => onCategoryChange(category.id)}
              style={{
                animationDelay: `${categories.indexOf(category) * 0.1}s`
              }}
            >
              <i className={`bi ${category.icon} me-2`}></i>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatternCategories;

