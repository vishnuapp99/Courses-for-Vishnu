import React from 'react';
import './EnergySelector.css';

const EnergySelector = ({ selectedEnergy, onEnergySelect }) => {
  const energyLevels = [
    {
      id: 'high',
      name: 'High Energy',
      icon: 'fa-bolt',
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      description: 'Thinking, building, decisions',
      tasks: [
        'Product architecture thinking',
        'Writing PRD / roadmap',
        'Solving hard problems',
        'Making important decisions',
        'Creative brainstorming'
      ]
    },
    {
      id: 'medium',
      name: 'Medium Energy',
      icon: 'fa-battery-half',
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
      description: 'Writing, planning, reviewing',
      tasks: [
        'Office emails & reviews',
        'Product documentation',
        'Planning next steps',
        'Code reviews',
        'Team communication'
      ]
    },
    {
      id: 'low',
      name: 'Low Energy',
      icon: 'fa-battery-quarter',
      color: '#95a5a6',
      gradient: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)',
      description: 'Learning, listening, organising',
      tasks: [
        'Listening to podcasts',
        'Reading articles',
        'Reviewing ideas',
        'Watching tutorials',
        'Light organizing'
      ]
    }
  ];

  return (
    <div id="energy" className="energy-selector-section">
      <div className="text-center mb-4 animate__animated animate__fadeInDown">
        <h2 className="display-5 text-white fw-bold mb-3">
          <i className="fas fa-battery-full me-2"></i>
          What's Your Energy Level?
        </h2>
        <p className="lead text-white-50">
          Match task difficulty to your current energy
        </p>
      </div>

      <div className="row g-4">
        {energyLevels.map((energy) => (
          <div key={energy.id} className="col-md-4">
            <div
              className={`card energy-card animate__animated animate__fadeInUp ${
                selectedEnergy === energy.id ? 'selected' : ''
              }`}
              style={{
                background: energy.gradient,
                animationDelay: `${energyLevels.indexOf(energy) * 0.2}s`
              }}
              onClick={() => onEnergySelect(energy.id)}
            >
              <div className="card-body text-center text-white p-4">
                <i className={`fas ${energy.icon} energy-icon`}></i>
                <h3 className="card-title fw-bold mb-3">{energy.name}</h3>
                <p className="card-text mb-4">{energy.description}</p>
                
                {selectedEnergy === energy.id && (
                  <div className="tasks-list animate__animated animate__fadeIn">
                    <h5 className="mb-3">
                      <i className="fas fa-tasks me-2"></i>
                      Suggested Tasks:
                    </h5>
                    <ul className="list-unstyled text-start">
                      {energy.tasks.map((task, idx) => (
                        <li key={idx} className="mb-2">
                          <i className="fas fa-check-circle me-2"></i>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEnergy && (
        <div className="text-center mt-4 animate__animated animate__fadeIn">
          <div className="alert alert-light d-inline-block" role="alert">
            <i className="fas fa-lightbulb me-2 text-warning"></i>
            <strong>Remember:</strong> You don't fight your day — you flow with it!
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergySelector;

