import React, { useState } from 'react';
import './MetroTime.css';

const MetroTime = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const metroActivities = [
    {
      category: 'Audio Learning',
      icon: 'fa-headphones',
      color: '#e67e22',
      activities: [
        'Product podcasts',
        'Tech talks',
        'Mindset audiobooks',
        'Language learning',
        'Industry news'
      ]
    },
    {
      category: 'Idea Dumping',
      icon: 'fa-lightbulb',
      color: '#f39c12',
      activities: [
        'Voice notes',
        'Quick sketches',
        'Thought capture',
        'Problem notes',
        'Inspiration logging'
      ]
    },
    {
      category: 'Light Planning',
      icon: 'fa-calendar-check',
      color: '#16a085',
      activities: [
        'Day structure',
        'Task prioritization',
        'Goal review',
        'Schedule adjustments',
        'Quick reflections'
      ]
    },
    {
      category: 'Reading',
      icon: 'fa-book',
      color: '#8e44ad',
      activities: [
        'Short articles',
        'Newsletters',
        'Quick tutorials',
        'Documentation snippets',
        'Case studies'
      ]
    }
  ];

  const dontDo = [
    'Heavy coding',
    'Deep problem solving',
    'Stressful decisions',
    'Complex architecture',
    'Critical debugging'
  ];

  return (
    <div id="metro" className="metro-time-section">
      <div className="metro-card animate__animated animate__fadeInUp">
        <div className="text-center mb-4">
          <h2 className="display-5 fw-bold mb-3 text-primary">
            <i className="fas fa-subway me-2"></i>
            Metro Time = Auto-Mode Work
          </h2>
          <p className="lead text-muted mb-4">
            <strong>1.5 hrs up + 1.5 hrs down</strong> = 3 hours of consistent, low-focus time
          </p>
          <div className="metro-rule-box">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Metro Rule:</strong> Use travel to feed the mind, not drain it.
          </div>
        </div>

        <div className="row g-4 mb-4">
          {metroActivities.map((activity, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div 
                className="metro-activity-card animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="activity-icon" style={{ color: activity.color }}>
                  <i className={`fas ${activity.icon}`}></i>
                </div>
                <h5 className="fw-bold mt-3 mb-3">{activity.category}</h5>
                <ul className="list-unstyled">
                  {activity.activities.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="dont-do-section">
          <h4 className="fw-bold mb-3 text-danger">
            <i className="fas fa-times-circle me-2"></i>
            What NOT to Do in Metro:
          </h4>
          <div className="row">
            {dontDo.map((item, idx) => (
              <div key={idx} className="col-md-4 col-lg-2 mb-2">
                <div className="dont-do-item">
                  <i className="fas fa-ban text-danger me-2"></i>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="motivation-box">
            <i className="fas fa-quote-left me-2"></i>
            <em className="h5">
              Metro time is low-focus but high-consistency time. 
              Make it work for you, not against you.
            </em>
            <i className="fas fa-quote-right ms-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetroTime;

