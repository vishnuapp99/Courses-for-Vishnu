import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../data/topics';
import './Home.css';

function Home() {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Animate cards on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, entry.target.dataset.index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.topic-card');
    cards.forEach((card, index) => {
      card.dataset.index = index;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="home-title">
            <span className="title-line">Product Leadership</span>
            <span className="title-line">Learning Platform</span>
          </h1>
          <p className="home-subtitle">Master 13 critical domains for senior product leaders</p>
          <div className="header-stats">
            <div className="header-stat">
              <span className="stat-number">{topics.length}</span>
              <span className="stat-label">Leadership Domains</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">
                {topics.reduce((sum, t) => sum + t.principles.length + t.concepts.length, 0)}
              </span>
              <span className="stat-label">Learning Modules</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">
                {topics.reduce((sum, t) => sum + t.achievements.length, 0)}
              </span>
              <span className="stat-label">Achievement Goals</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="topics-grid">
        {topics.map((topic, index) => {
          const totalItems = topic.principles.length + topic.concepts.length + topic.achievements.length;
          const isVisible = visibleCards.includes(index.toString());
          
          return (
            <Link 
              key={topic.id} 
              to={`/topic/${topic.id}`}
              className={`topic-card ${isVisible ? 'visible' : ''}`}
              style={{ '--topic-color': topic.color }}
              data-index={index}
            >
              <div className="topic-image-container">
                <img 
                  src={topic.image} 
                  alt={topic.title}
                  className="topic-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600/667eea/ffffff?text=' + topic.title;
                  }}
                />
                <div className="topic-overlay"></div>
                <div className="topic-badge">
                  <span className="badge-number">{index + 1}</span>
                </div>
              </div>
              <div className="topic-content">
                <div className="topic-header">
                  <h2 className="topic-title">{topic.title}</h2>
                  <div className="topic-progress-ring">
                    <svg className="progress-ring" width="60" height="60">
                      <circle
                        className="progress-ring-circle"
                        stroke={topic.color}
                        strokeWidth="4"
                        fill="transparent"
                        r="26"
                        cx="30"
                        cy="30"
                        style={{
                          strokeDasharray: `${2 * Math.PI * 26}`,
                          strokeDashoffset: `${2 * Math.PI * 26 * (1 - (totalItems / 50))}`
                        }}
                      />
                    </svg>
                    <span className="progress-percent">{Math.round((totalItems / 50) * 100)}%</span>
                  </div>
                </div>
                <p className="topic-description">{topic.description}</p>
                <div className="topic-stats">
                  <div className="stat-item">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-content">
                      <strong>{topic.principles.length}</strong>
                      <span>Principles</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">💡</div>
                    <div className="stat-content">
                      <strong>{topic.concepts.length}</strong>
                      <span>Concepts</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-content">
                      <strong>{topic.achievements.length}</strong>
                      <span>Goals</span>
                    </div>
                  </div>
                </div>
                <div className="topic-footer">
                  <span className="explore-link">Explore Module →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
