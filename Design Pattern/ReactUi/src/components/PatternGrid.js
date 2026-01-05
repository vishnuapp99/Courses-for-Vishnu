import React from 'react';
import './PatternGrid.css';
import patternsData from '../data/patterns';

const PatternGrid = ({ category, onPatternSelect }) => {
  const filteredPatterns = category === 'all' 
    ? patternsData 
    : patternsData.filter(p => p.category === category);

  return (
    <div className="pattern-grid-container">
      <div className="text-center mb-4">
        <h3 className="text-white fw-bold">
          <i className="bi bi-collection me-2"></i>
          {category === 'all' ? 'All Design Patterns' : `${category.charAt(0).toUpperCase() + category.slice(1)} Patterns`}
          <span className="badge bg-light text-dark ms-2">{filteredPatterns.length}</span>
        </h3>
      </div>
      <div className="row g-4">
        {filteredPatterns.map((pattern, index) => (
          <div 
            key={pattern.id} 
            className="col-lg-4 col-md-6 col-sm-12"
          >
            <div
              className="card pattern-card animate__animated animate__fadeInUp"
              onClick={() => onPatternSelect(pattern)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="card-body text-center p-4">
                <div className="pattern-icon">
                  <i className={`bi ${pattern.icon}`}></i>
                </div>
                <h4 className="card-title fw-bold mb-3">{pattern.name}</h4>
                <p className="card-text text-muted mb-3">{pattern.description}</p>
                <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
                  <span className={`badge category-badge badge-${pattern.category}`}>
                    {pattern.category}
                  </span>
                  {pattern.priority && (
                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-star-fill me-1"></i>
                      {pattern.priority}
                    </span>
                  )}
                </div>
                <div className="mt-auto">
                  <button className="btn btn-primary w-100">
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternGrid;

