import React from 'react';
import './RoleBuckets.css';

const RoleBuckets = ({ selectedRole, onRoleSelect, currentEnergy }) => {
  const roles = [
    {
      id: 'office',
      name: 'Office Role',
      icon: 'fa-briefcase',
      color: '#3498db',
      gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      description: 'Job responsibilities',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
      tasks: {
        high: ['Strategic planning', 'Important presentations', 'Key decisions'],
        medium: ['Emails & reviews', 'Team meetings', 'Documentation'],
        low: ['Reading reports', 'Light organizing', 'Listening to recordings']
      }
    },
    {
      id: 'product',
      name: 'Product Role',
      icon: 'fa-rocket',
      color: '#e74c3c',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      description: 'Building your product',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      tasks: {
        high: ['Architecture design', 'Complex problem solving', 'PRD writing'],
        medium: ['Feature development', 'Code reviews', 'Documentation'],
        low: ['Learning new tech', 'Reading docs', 'Watching tutorials']
      }
    },
    {
      id: 'growth',
      name: 'Growth Role',
      icon: 'fa-seedling',
      color: '#2ecc71',
      gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
      description: 'Learning, thinking',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      tasks: {
        high: ['Deep thinking', 'Strategy planning', 'Research analysis'],
        medium: ['Course learning', 'Article writing', 'Note-taking'],
        low: ['Podcasts', 'Light reading', 'Video tutorials']
      }
    },
    {
      id: 'recovery',
      name: 'Recovery Role',
      icon: 'fa-spa',
      color: '#9b59b6',
      gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
      description: 'Rest, travel, reset',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
      tasks: {
        high: ['Meditation', 'Exercise planning', 'Goal setting'],
        medium: ['Light reading', 'Music listening', 'Social connection'],
        low: ['Resting', 'Mindful breathing', 'Gentle activities']
      }
    }
  ];

  const getTasksForCurrentEnergy = (role) => {
    if (!currentEnergy) return [];
    return role.tasks[currentEnergy] || [];
  };

  return (
    <div id="roles" className="role-buckets-section">
      <div className="text-center mb-4 animate__animated animate__fadeInDown">
        <h2 className="display-5 text-white fw-bold mb-3">
          <i className="fas fa-layer-group me-2"></i>
          Role-Based Buckets
        </h2>
        <p className="lead text-white-50">
          Assign intent, not time. What role are you in right now?
        </p>
      </div>

      <div className="row g-4">
        {roles.map((role, index) => (
          <div key={role.id} className="col-md-6 col-lg-3">
            <div
              className={`card role-card animate__animated animate__fadeInUp ${
                selectedRole === role.id ? 'selected' : ''
              }`}
              style={{
                background: role.gradient,
                animationDelay: `${index * 0.15}s`
              }}
              onClick={() => onRoleSelect(role.id)}
            >
              <div className="card-img-top" style={{
                height: '150px',
                backgroundImage: `url(${role.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div className="overlay"></div>
              </div>
              <div className="card-body text-white p-4">
                <div className="text-center mb-3">
                  <i className={`fas ${role.icon} role-icon`}></i>
                  <h4 className="card-title fw-bold mb-2">{role.name}</h4>
                  <p className="card-text small">{role.description}</p>
                </div>

                {selectedRole === role.id && currentEnergy && (
                  <div className="role-tasks animate__animated animate__fadeIn">
                    <h6 className="mb-3">
                      <i className="fas fa-list-check me-2"></i>
                      Tasks for {currentEnergy} energy:
                    </h6>
                    <ul className="list-unstyled">
                      {getTasksForCurrentEnergy(role).map((task, idx) => (
                        <li key={idx} className="mb-2 small">
                          <i className="fas fa-arrow-right me-2"></i>
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

      {selectedRole && (
        <div className="text-center mt-4 animate__animated animate__fadeIn">
          <div className="alert alert-light d-inline-block" role="alert">
            <i className="fas fa-info-circle me-2 text-info"></i>
            <strong>Tip:</strong> You don't assign time. You assign intent.
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleBuckets;

