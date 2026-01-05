import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="hero-section animate__animated animate__fadeInDown">
      <div className="container text-center">
        <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInUp">
          <i className="bi bi-diagram-3 me-3"></i>
          Design Patterns Tutorial
        </h1>
        <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          Learn design patterns the easy way with interactive examples and visual guides
        </p>
        <div className="row justify-content-center mt-4">
          <div className="col-md-3 col-6 mb-3">
            <div className="stats-card animate__animated animate__fadeInUp animate__delay-2s">
              <div className="stats-number">23</div>
              <div className="stats-label">Design Patterns</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="stats-card animate__animated animate__fadeInUp animate__delay-3s">
              <div className="stats-number">3</div>
              <div className="stats-label">Categories</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="stats-card animate__animated animate__fadeInUp animate__delay-4s">
              <div className="stats-number">100%</div>
              <div className="stats-label">Free & Open</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

