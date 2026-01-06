import React, { useState } from 'react';
import './TheorySection.css';

const TheorySection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const theoryPrinciples = [
    {
      id: 'energy-vs-time',
      title: 'Energy vs Time: The Paradigm Shift',
      icon: 'fa-exchange-alt',
      color: '#e74c3c',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      content: {
        problem: 'Traditional time management asks: "What time should I work?"',
        solution: 'Energy management asks: "What type of energy do I have right now?"',
        why: 'Time is finite and fixed. Energy is renewable and variable. By matching tasks to energy levels, you work smarter, not harder.',
        benefits: [
          'Higher quality output when energy matches task difficulty',
          'Reduced burnout and stress',
          'Natural flow state achievement',
          'Better work-life balance'
        ]
      }
    },
    {
      id: 'role-based-intent',
      title: 'Role-Based Intent: Beyond Time Blocks',
      icon: 'fa-layer-group',
      color: '#3498db',
      gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
      content: {
        problem: 'Time blocks force you into rigid schedules that break when life happens.',
        solution: 'Role-based buckets assign intent, not time. You know what role you\'re in, not when.',
        why: 'Life is unpredictable. Office hours change. Travel happens. Energy fluctuates. Intent adapts; time blocks break.',
        benefits: [
          'Flexibility to adapt to changing circumstances',
          'Clear mental model of what to focus on',
          'Reduced guilt when schedules change',
          'Better alignment with real-world demands'
        ]
      }
    },
    {
      id: 'momentum-over-focus',
      title: 'Momentum Over Focus: The Anti-Perfectionism Model',
      icon: 'fa-rocket',
      color: '#2ecc71',
      gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      content: {
        problem: 'Waiting for perfect focus means waiting forever. Perfectionism kills progress.',
        solution: 'Momentum > Motivation > Focus. Small progress compounds. One step is enough.',
        why: 'Focus is unreliable. Motivation is fleeting. Momentum is sustainable. Small actions build into big results.',
        benefits: [
          'Consistent progress even on low-focus days',
          'Reduced procrastination',
          'Compound effect of small wins',
          'Sustainable long-term growth'
        ]
      }
    },
    {
      id: 'travel-productivity',
      title: 'Travel Time: The Hidden Productivity Goldmine',
      icon: 'fa-subway',
      color: '#9b59b6',
      gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop',
      content: {
        problem: '3 hours daily in transit = 15 hours/week = 60 hours/month of "wasted" time.',
        solution: 'Use travel for low-focus, high-consistency activities. Feed your mind, don\'t drain it.',
        why: 'Travel time is consistent but low-focus. Perfect for learning, planning, and idea capture. Not for deep work.',
        benefits: [
          'Transform dead time into growth time',
          'Consistent learning without extra effort',
          'Better use of unavoidable travel',
          'Reduced stress about "lost" time'
        ]
      }
    },
    {
      id: 'flow-state',
      title: 'Flow State: The Natural High Performance Zone',
      icon: 'fa-water',
      color: '#16a085',
      gradient: 'linear-gradient(135deg, #16a085 0%, #138d75 100%)',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
      content: {
        problem: 'Forcing work when energy is low creates stress, poor quality, and burnout.',
        solution: 'Match task difficulty to energy level. Flow happens naturally when challenge meets capacity.',
        why: 'Flow state occurs when you\'re fully engaged in an activity that matches your current energy. It can\'t be forced, only facilitated.',
        benefits: [
          'Natural peak performance without forcing',
          'Intrinsic motivation and enjoyment',
          'Higher quality work with less effort',
          'Sustainable high performance'
        ]
      }
    },
    {
      id: 'small-wins',
      title: 'Small Wins: The Compound Effect',
      icon: 'fa-chart-line',
      color: '#f39c12',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      content: {
        problem: 'Big goals feel overwhelming. All-or-nothing thinking leads to nothing.',
        solution: 'Break everything into smallest useful tasks. One step compounds into progress.',
        why: 'Small wins build confidence, create momentum, and compound over time. Perfectionism waits; progress acts.',
        benefits: [
          'Overcome procrastination with tiny steps',
          'Build consistent habits',
          'Achieve big goals through small actions',
          'Maintain motivation through progress'
        ]
      }
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div id="theory" className="theory-section">
      <div className="text-center mb-5 animate__animated animate__fadeInDown">
        <h2 className="display-4 text-white fw-bold mb-3">
          <i className="fas fa-graduation-cap me-2"></i>
          Become More: The Theory
        </h2>
        <p className="lead text-white-50 mb-4">
          Understand the principles behind energy-based time management
        </p>
        <div className="theory-intro-box animate__animated animate__fadeInUp">
          <p className="h5 text-white mb-0">
            <i className="fas fa-lightbulb me-2 text-warning"></i>
            Knowledge without application is just information. 
            Learn the theory, then apply it to transform your productivity.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {theoryPrinciples.map((principle, index) => (
          <div key={principle.id} className="col-md-6 col-lg-4">
            <div
              className={`theory-card animate__animated animate__fadeInUp ${
                expandedCard === principle.id ? 'expanded' : ''
              }`}
              style={{
                background: principle.gradient,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => toggleCard(principle.id)}
            >
              <div 
                className="theory-card-image"
                style={{
                  backgroundImage: `url(${principle.image})`,
                  height: expandedCard === principle.id ? '200px' : '150px'
                }}
              >
                <div className="image-overlay"></div>
                <div className="theory-icon">
                  <i className={`fas ${principle.icon}`}></i>
                </div>
              </div>

              <div className="theory-card-body p-4 text-white">
                <h3 className="fw-bold mb-3">{principle.title}</h3>

                <div className="theory-quick-view">
                  <div className="problem-box mb-3">
                    <h6 className="mb-2">
                      <i className="fas fa-times-circle me-2"></i>
                      The Problem:
                    </h6>
                    <p className="small">{principle.content.problem}</p>
                  </div>

                  <div className="solution-box mb-3">
                    <h6 className="mb-2">
                      <i className="fas fa-check-circle me-2"></i>
                      The Solution:
                    </h6>
                    <p className="small">{principle.content.solution}</p>
                  </div>
                </div>

                {expandedCard === principle.id && (
                  <div className="theory-expanded-content animate__animated animate__fadeIn">
                    <div className="why-box mb-3">
                      <h6 className="mb-2">
                        <i className="fas fa-question-circle me-2"></i>
                        Why It Works:
                      </h6>
                      <p>{principle.content.why}</p>
                    </div>

                    <div className="benefits-box">
                      <h6 className="mb-3">
                        <i className="fas fa-star me-2"></i>
                        Key Benefits:
                      </h6>
                      <ul className="list-unstyled">
                        {principle.content.benefits.map((benefit, idx) => (
                          <li key={idx} className="mb-2">
                            <i className="fas fa-arrow-right me-2"></i>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-center mt-4">
                      <button 
                        className="btn btn-light btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(principle.id);
                        }}
                      >
                        <i className="fas fa-compress me-2"></i>
                        Show Less
                      </button>
                    </div>
                  </div>
                )}

                {expandedCard !== principle.id && (
                  <div className="text-center mt-3">
                    <button className="btn btn-light btn-sm">
                      <i className="fas fa-expand me-2"></i>
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Takeaways Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="takeaways-section animate__animated animate__fadeInUp">
            <h3 className="text-white fw-bold mb-4 text-center">
              <i className="fas fa-key me-2"></i>
              Key Takeaways
            </h3>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="takeaway-card">
                  <i className="fas fa-sync-alt takeaway-icon"></i>
                  <h5 className="fw-bold">Energy is Variable</h5>
                  <p>Your energy changes throughout the day. Work with it, not against it.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="takeaway-card">
                  <i className="fas fa-compass takeaway-icon"></i>
                  <h5 className="fw-bold">Intent Over Time</h5>
                  <p>Know what role you're in and what you intend to do, not when you'll do it.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="takeaway-card">
                  <i className="fas fa-forward takeaway-icon"></i>
                  <h5 className="fw-bold">Momentum Matters</h5>
                  <p>Small progress beats perfect planning. One step compounds into results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Steps */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="action-steps-section animate__animated animate__fadeInUp">
            <h3 className="text-white fw-bold mb-4 text-center">
              <i className="fas fa-play-circle me-2"></i>
              How to Apply This Theory
            </h3>
            <div className="steps-timeline">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5 className="fw-bold">Start Each Day with Energy Check</h5>
                  <p>Ask yourself: "What's my energy level right now?" Don't force high-energy tasks when you're low.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5 className="fw-bold">Identify Your Current Role</h5>
                  <p>Are you in Office mode, Product mode, Growth mode, or Recovery mode? Match tasks to role.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5 className="fw-bold">Choose the Smallest Useful Task</h5>
                  <p>Break everything down. "Just open the file" is better than "Finish the entire project."</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h5 className="fw-bold">Use Travel Time Wisely</h5>
                  <p>Metro time = learning time. Podcasts, reading, planning. Not deep coding or stressful decisions.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h5 className="fw-bold">Review and Adjust</h5>
                  <p>At the end of the day, ask: "Did I flow with my energy?" Adjust tomorrow based on what worked.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheorySection;


