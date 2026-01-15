import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { topics } from '../data/topics';
import './TopicDetail.css';

function TopicDetail() {
  const { topicId } = useParams();
  const topic = topics.find(t => t.id === topicId);
  const [expandedCards, setExpandedCards] = useState({});
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.dataset.section]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
      section.dataset.section = index;
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleCard = (section, index) => {
    const key = `${section}-${index}`;
    setExpandedCards((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!topic) {
    return (
      <div className="topic-detail">
        <div className="error-message">
          <h2>Topic not found</h2>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    );
  }

  const totalProgress = Math.round(
    ((topic.principles.length + topic.concepts.length + topic.achievements.length) / 50) * 100
  );

  return (
    <div className="topic-detail" style={{ '--topic-color': topic.color }}>
      <div className="topic-hero">
        <Link to="/" className="back-link">
          <span className="back-arrow">←</span>
          <span>Back to Topics</span>
        </Link>
        <div className="hero-content">
          <div className="hero-image-container">
            <img 
              src={topic.image} 
              alt={topic.title}
              className="hero-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600/667eea/ffffff?text=' + topic.title;
              }}
            />
            <div className="hero-overlay"></div>
            <div className="hero-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
              <span className="progress-text">{totalProgress}% Complete</span>
            </div>
          </div>
          <div className="hero-text">
            <div className="hero-badge">Module {topics.findIndex(t => t.id === topicId) + 1}</div>
            <h1 className="hero-title">{topic.title}</h1>
            <p className="hero-description">{topic.description}</p>
            <div className="hero-metrics">
              <div className="metric">
                <span className="metric-value">{topic.principles.length}</span>
                <span className="metric-label">Principles</span>
              </div>
              <div className="metric">
                <span className="metric-value">{topic.concepts.length}</span>
                <span className="metric-label">Concepts</span>
              </div>
              <div className="metric">
                <span className="metric-value">{topic.achievements.length}</span>
                <span className="metric-label">Goals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="topic-content-wrapper">
        <section 
          className={`content-section principles-section ${visibleSections.includes('0') ? 'visible' : ''}`}
          data-section="0"
        >
          <div className="section-header">
            <div className="section-icon-wrapper">
              <span className="section-icon">🎯</span>
            </div>
            <h2 className="section-title">Core Principles</h2>
            <p className="section-subtitle">Fundamental principles that guide your learning journey</p>
            <div className="section-progress">
              <span>{topic.principles.length} principles to master</span>
            </div>
          </div>
          <div className="cards-grid">
            {topic.principles.map((principle, index) => {
              const isExpanded = expandedCards[`principles-${index}`];
              return (
                <div 
                  key={index} 
                  className={`content-card principle-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleCard('principles', index)}
                >
                  <div className="card-number">{index + 1}</div>
                  <div className="card-header">
                    <h3 className="card-title">{principle.title}</h3>
                    <button className="expand-button">
                      {isExpanded ? '−' : '+'}
                    </button>
                  </div>
                  <div className={`card-description-wrapper ${isExpanded ? 'expanded' : ''}`}>
                    <p className="card-description">{principle.description}</p>
                    
                    {principle.example && (
                      <div className="card-section example-section">
                        <h4><span className="icon">🔍</span> Real-World Example</h4>
                        <p>{principle.example}</p>
                      </div>
                    )}
                    
                    {principle.story && (
                      <div className="card-section story-section">
                        <h4><span className="icon">📖</span> Story</h4>
                        <p>{principle.story}</p>
                      </div>
                    )}

                    {principle.image && (
                      <div className="card-image-wrapper">
                        <img 
                          src={principle.image} 
                          alt={principle.title} 
                          className="card-detail-image"
                          onError={(e) => {
                             e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section 
          className={`content-section concepts-section ${visibleSections.includes('1') ? 'visible' : ''}`}
          data-section="1"
        >
          <div className="section-header">
            <div className="section-icon-wrapper">
              <span className="section-icon">💡</span>
            </div>
            <h2 className="section-title">Key Concepts</h2>
            <p className="section-subtitle">Essential concepts you'll master</p>
            <div className="section-progress">
              <span>{topic.concepts.length} concepts to explore</span>
            </div>
          </div>
          <div className="cards-grid">
            {topic.concepts.map((concept, index) => {
              const isExpanded = expandedCards[`concepts-${index}`];
              return (
                <div 
                  key={index} 
                  className={`content-card concept-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleCard('concepts', index)}
                >
                  <div className="card-icon">📚</div>
                  <div className="card-header">
                    <h3 className="card-title">{concept.title}</h3>
                    <button className="expand-button">
                      {isExpanded ? '−' : '+'}
                    </button>
                  </div>
                  <div className={`card-description-wrapper ${isExpanded ? 'expanded' : ''}`}>
                    <p className="card-description">{concept.description}</p>
                    
                    {concept.example && (
                      <div className="card-section example-section">
                        <h4><span className="icon">🔍</span> Real-World Example</h4>
                        <p>{concept.example}</p>
                      </div>
                    )}
                    
                    {concept.story && (
                      <div className="card-section story-section">
                        <h4><span className="icon">📖</span> Story</h4>
                        <p>{concept.story}</p>
                      </div>
                    )}

                    {concept.image && (
                      <div className="card-image-wrapper">
                        <img 
                          src={concept.image} 
                          alt={concept.title} 
                          className="card-detail-image"
                          onError={(e) => {
                             e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section 
          className={`content-section achievements-section ${visibleSections.includes('2') ? 'visible' : ''}`}
          data-section="2"
        >
          <div className="section-header">
            <div className="section-icon-wrapper">
              <span className="section-icon">🏆</span>
            </div>
            <h2 className="section-title">What You'll Achieve</h2>
            <p className="section-subtitle">Learning outcomes and goals</p>
            <div className="section-progress">
              <span>{topic.achievements.length} achievements to unlock</span>
            </div>
          </div>
          <div className="achievements-grid">
            {topic.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-check">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="achievement-text">{achievement}</span>
                <div className="achievement-number">{index + 1}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TopicDetail;
