import React, { useState } from 'react';
import './DailyControl.css';

const DailyControl = ({ currentEnergy, currentRole }) => {
  const [answers, setAnswers] = useState({
    role: '',
    energy: '',
    task: ''
  });

  const questions = [
    {
      id: 'role',
      icon: 'fa-user-tie',
      question: 'What role am I in right now?',
      color: '#3498db',
      options: ['Office', 'Product', 'Growth', 'Recovery'],
      answer: currentRole || answers.role
    },
    {
      id: 'energy',
      icon: 'fa-bolt',
      question: 'What energy level do I have?',
      color: '#e74c3c',
      options: ['High', 'Medium', 'Low'],
      answer: currentEnergy || answers.energy
    },
    {
      id: 'task',
      icon: 'fa-tasks',
      question: 'What is the smallest useful task I can do?',
      color: '#2ecc71',
      placeholder: 'e.g., "Just open the file", "Write 3 lines", "Note one idea"',
      answer: answers.task
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const momentumTips = [
    {
      icon: 'fa-rocket',
      tip: 'Do small progress, not perfect work',
      color: '#e74c3c'
    },
    {
      icon: 'fa-compress',
      tip: 'Reduce task size until it feels easy',
      color: '#3498db'
    },
    {
      icon: 'fa-step-forward',
      tip: 'One step is enough',
      color: '#2ecc71'
    },
    {
      icon: 'fa-chart-line',
      tip: 'Momentum > Motivation > Focus',
      color: '#f39c12'
    }
  ];

  return (
    <div id="control" className="daily-control-section">
      <div className="text-center mb-5 animate__animated animate__fadeInDown">
        <h2 className="display-5 text-white fw-bold mb-3">
          <i className="fas fa-question-circle me-2"></i>
          Simple Daily Control
        </h2>
        <p className="lead text-white-50">
          At any moment, ask yourself these 3 questions. That's it. No pressure. No guilt.
        </p>
      </div>

      <div className="row g-4 mb-5">
        {questions.map((q, index) => (
          <div key={q.id} className="col-md-4">
            <div 
              className="control-question animate__animated animate__fadeInUp"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                borderLeft: `5px solid ${q.color}`
              }}
            >
              <div className="question-header mb-3">
                <i className={`fas ${q.icon} me-2`} style={{ color: q.color }}></i>
                <h4 className="fw-bold text-white mb-0">{q.question}</h4>
              </div>
              
              {q.options ? (
                <div className="options-list">
                  {q.options.map((option, idx) => (
                    <button
                      key={idx}
                      className={`option-btn ${answers[q.id]?.toLowerCase() === option.toLowerCase() ? 'active' : ''}`}
                      onClick={() => handleAnswerChange(q.id, option)}
                      style={{
                        borderColor: q.color,
                        color: answers[q.id]?.toLowerCase() === option.toLowerCase() ? '#fff' : q.color,
                        backgroundColor: answers[q.id]?.toLowerCase() === option.toLowerCase() ? q.color : 'transparent'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  className="form-control task-input"
                  placeholder={q.placeholder}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  style={{ borderColor: q.color }}
                />
              )}

              {q.answer && (
                <div className="answer-display mt-3 animate__animated animate__fadeIn">
                  <i className="fas fa-check-circle me-2" style={{ color: q.color }}></i>
                  <strong style={{ color: q.color }}>Selected:</strong> {q.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="momentum-section">
        <div className="text-center mb-4">
          <h3 className="text-white fw-bold mb-3">
            <i className="fas fa-lightbulb me-2 text-warning"></i>
            Focus Is Not Required – Momentum Is
          </h3>
          <p className="lead text-white-50">
            Do small progress, not perfect work. One step is enough.
          </p>
        </div>

        <div className="row g-4">
          {momentumTips.map((tip, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div 
                className="momentum-card animate__animated animate__fadeInUp"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  borderTop: `4px solid ${tip.color}`
                }}
              >
                <i className={`fas ${tip.icon} momentum-icon`} style={{ color: tip.color }}></i>
                <p className="momentum-text">{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <div className="system-line animate__animated animate__pulse animate__infinite">
            <h2 className="text-white fw-bold">
              <i className="fas fa-infinity me-2"></i>
              Don't manage time. Manage energy, roles, and intent.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyControl;

