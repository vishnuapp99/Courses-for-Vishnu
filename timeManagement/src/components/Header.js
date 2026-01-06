import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          <i className="fas fa-bolt me-2"></i>
          Energy Flow
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#energy" onClick={handleLinkClick}>
                <i className="fas fa-battery-full me-1"></i> Energy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#roles" onClick={handleLinkClick}>
                <i className="fas fa-user-tie me-1"></i> Roles
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#metro" onClick={handleLinkClick}>
                <i className="fas fa-subway me-1"></i> Metro
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#control" onClick={handleLinkClick}>
                <i className="fas fa-question-circle me-1"></i> Control
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#theory" onClick={handleLinkClick}>
                <i className="fas fa-graduation-cap me-1"></i> Theory
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#course" onClick={handleLinkClick}>
                <i className="fas fa-book-open me-1"></i> Course
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

