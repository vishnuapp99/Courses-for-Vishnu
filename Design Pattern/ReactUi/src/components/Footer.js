import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer animate__animated animate__fadeInUp">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-white">
              <i className="bi bi-heart-fill text-danger me-2"></i>
              Made with love for learning Design Patterns
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-white">
              <i className="bi bi-github me-2"></i>
              Open Source Tutorial
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

