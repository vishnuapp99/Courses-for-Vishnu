import React, { useState } from 'react';
import './CourseContent.css';

const CourseContent = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const courseSections = [
    {
      id: 'framework',
      title: 'Section 1: Framework',
      icon: 'fa-layer-group',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Build the foundation for stress-free time management',
      lessons: [
        {
          id: 'lesson1',
          number: 1,
          title: 'Everything You Need to Know About This Course',
          duration: '3 min',
          content: {
            intro: 'This course is not about strict schedules or waking up at 5 AM. It is about designing your day around energy, priorities, and reality.',
            learn: [
              'Why traditional time management fails',
              'How to manage work, personal growth, and life together',
              'How to stay productive even with travel, meetings, and interruptions',
              'How to grow without burnout'
            ],
            audience: 'This course is designed for working professionals, founders, and creators.'
          }
        },
        {
          id: 'lesson2',
          number: 2,
          title: 'The 2,000-Year-Old "Secret"',
          duration: '2 min',
          content: {
            intro: 'Time management is not new. Ancient thinkers focused on fundamental principles that modern tools ignored.',
            ancient: [
              'Doing fewer things well',
              'Protecting attention, not time',
              'Aligning work with natural energy'
            ],
            secret: 'You don\'t manage time. You manage focus, energy, and intention.',
            why: 'Modern tools failed because they ignored this truth.'
          }
        },
        {
          id: 'lesson3',
          number: 3,
          title: 'The Time Management Trap You Need to Avoid',
          duration: '3 min',
          content: {
            intro: 'Most people fall into productivity traps that create stress instead of results.',
            traps: [
              'Over-planning the day',
              'Guilt when plans break',
              'Confusing busy with productive',
              'Forcing productivity when energy is low'
            ],
            escape: [
              'Rigid schedules',
              'Productivity pressure',
              '"I\'m always behind" mindset'
            ]
          }
        }
      ]
    },
    {
      id: 'steps',
      title: 'Section 2: 7 Specific Steps to Becoming More Productive',
      icon: 'fa-stairs',
      color: '#e74c3c',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      description: 'Practical, actionable steps you can implement today',
      lessons: [
        {
          id: 'lesson4',
          number: 4,
          title: 'What You Need To Do Every Morning',
          duration: '4 min',
          content: {
            intro: 'Forget complex routines. A good morning needs only the essentials.',
            needs: [
              'Clear priority (1 important thing)',
              'Mental readiness, not motivation',
              'Direction for the day, not full planning'
            ],
            works: [
              'You wake up late',
              'You travel',
              'Your day is unpredictable'
            ]
          }
        },
        {
          id: 'lesson5',
          number: 5,
          title: 'How To Set Up Your Work Time',
          duration: '6 min',
          content: {
            intro: 'Instead of fixed hours, create a flexible system that adapts to reality.',
            instead: [
              'Create flexible work blocks',
              'Match tasks to energy (deep vs light work)',
              'Allow interruption-friendly zones'
            ],
            reality: 'Office + commute + meetings are part of the system — not obstacles.'
          }
        },
        {
          id: 'lesson6',
          number: 6,
          title: 'What To Work On (It\'s Not As Obvious As You Think)',
          duration: '2 min',
          content: {
            intro: 'Productivity is not doing more tasks. It\'s doing the right tasks.',
            learn: [
              'Identify high-impact work',
              'Say no without guilt',
              'Avoid fake urgency',
              'Choose work that compounds over time'
            ]
          }
        },
        {
          id: 'lesson7',
          number: 7,
          title: 'Make These 3 Plans To Make Massive Progress',
          duration: '5 min',
          content: {
            intro: 'You only need three plans. No micromanagement. No hourly tracking. Just clarity.',
            plans: [
              {
                name: 'Daily direction plan',
                description: 'One clear priority, flexible execution'
              },
              {
                name: 'Weekly alignment plan',
                description: 'Ensure daily actions serve weekly goals'
              },
              {
                name: 'Long-term growth plan',
                description: 'Big picture direction without rigid timelines'
              }
            ]
          }
        },
        {
          id: 'lesson8',
          number: 8,
          title: 'The "Other" 80/20 Rule',
          duration: '4 min',
          content: {
            intro: 'Most people misuse the 80/20 rule. Here\'s the real insight.',
            insight: [
              '20% of effort gives results',
              'Another 20% removes friction',
              'Eliminating wrong work is as powerful as doing right work'
            ],
            impact: 'This lesson changes how you prioritize forever.'
          }
        },
        {
          id: 'lesson9',
          number: 9,
          title: 'The "Time Management Sheet" – Part 1',
          duration: '2 min',
          content: {
            intro: 'Simple, honest, eye-opening audit of where your time actually goes.',
            learn: [
              'Audit where your time actually goes',
              'Identify energy leaks',
              'Spot distractions disguised as work'
            ]
          }
        },
        {
          id: 'lesson10',
          number: 10,
          title: 'The "Time Management Sheet" – Part 2',
          duration: '3 min',
          content: {
            intro: 'Now we optimize your day based on reality, not ideals.',
            optimize: [
              'Remove low-value tasks',
              'Restructure your day naturally',
              'Make space for learning, health, and growth'
            ],
            adapts: [
              'Office work',
              'Remote work',
              'Travel-heavy schedules'
            ]
          }
        }
      ]
    },
    {
      id: 'next-steps',
      title: 'Section 3: Next Steps',
      icon: 'fa-arrow-right',
      color: '#2ecc71',
      gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
      description: 'Apply what you\'ve learned and continue growing',
      lessons: [
        {
          id: 'lesson11',
          number: 11,
          title: 'Time Management and a Bucket of Water',
          duration: '3 min',
          content: {
            intro: 'A powerful metaphor that changes how you see your day forever.',
            metaphor: {
              day: 'Your day is a bucket',
              bigRocks: 'Big rocks go first',
              smallTasks: 'Small tasks fill the gaps',
              overflow: 'Overflow means burnout'
            },
            impact: 'You\'ll never look at your day the same way again.'
          }
        },
        {
          id: 'lesson12',
          number: 12,
          title: 'BONUS: Want More?',
          duration: '1 min',
          content: {
            intro: 'Next-level ideas for those ready to go deeper.',
            ideas: [
              'Habit stacking without pressure',
              'Long-term personal systems',
              'Growth without hustle culture'
            ],
            vision: 'This is where productivity becomes a lifestyle, not a struggle.'
          }
        }
      ]
    }
  ];

  const toggleLesson = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const totalDuration = courseSections.reduce((total, section) => {
    return total + section.lessons.reduce((sectionTotal, lesson) => {
      return sectionTotal + parseInt(lesson.duration);
    }, 0);
  }, 0);

  return (
    <div id="course" className="course-content-section">
      <div className="text-center mb-5 animate__animated animate__fadeInDown">
        <h2 className="display-4 text-white fw-bold mb-3">
          <i className="fas fa-book-open me-2"></i>
          Time Management Without Stress
        </h2>
        <p className="lead text-white-50 mb-4">
          Work Smarter. Live Better. Grow Consistently.
        </p>
        <div className="course-stats-box animate__animated animate__fadeInUp">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="stat-item">
                <i className="fas fa-list-ol stat-icon"></i>
                <h3 className="stat-number">{courseSections.reduce((sum, s) => sum + s.lessons.length, 0)}</h3>
                <p className="stat-label">Lessons</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-item">
                <i className="fas fa-clock stat-icon"></i>
                <h3 className="stat-number">{totalDuration}</h3>
                <p className="stat-label">Minutes Total</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-item">
                <i className="fas fa-layer-group stat-icon"></i>
                <h3 className="stat-number">{courseSections.length}</h3>
                <p className="stat-label">Sections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaways Banner */}
      <div className="key-takeaways-banner animate__animated animate__fadeInUp mb-5">
        <h3 className="text-white fw-bold mb-4">
          <i className="fas fa-star me-2"></i>
          What This Course Teaches You
        </h3>
        <div className="row g-3">
          <div className="col-md-3 col-sm-6">
            <div className="takeaway-item">
              <i className="fas fa-unlock takeaway-icon"></i>
              <p className="mb-0">Freedom over rigidity</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="takeaway-item">
              <i className="fas fa-chart-line takeaway-icon"></i>
              <p className="mb-0">Progress over perfection</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="takeaway-item">
              <i className="fas fa-bolt takeaway-icon"></i>
              <p className="mb-0">Energy over hours</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="takeaway-item">
              <i className="fas fa-heart takeaway-icon"></i>
              <p className="mb-0">Life-friendly productivity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Sections */}
      <div className="course-sections">
        {courseSections.map((section, sectionIndex) => (
          <div key={section.id} className="section-container mb-5">
            <div 
              className="section-header"
              style={{ background: section.gradient }}
              onClick={() => toggleSection(section.id)}
            >
              <div className="section-header-content">
                <div className="section-icon">
                  <i className={`fas ${section.icon}`}></i>
                </div>
                <div className="section-info">
                  <h3 className="section-title">{section.title}</h3>
                  <p className="section-description">{section.description}</p>
                  <div className="section-meta">
                    <span className="lesson-count">
                      <i className="fas fa-list me-1"></i>
                      {section.lessons.length} Lessons
                    </span>
                    <span className="section-duration">
                      <i className="fas fa-clock me-1"></i>
                      {section.lessons.reduce((sum, l) => sum + parseInt(l.duration), 0)} min
                    </span>
                  </div>
                </div>
              </div>
              <button className="section-toggle-btn">
                <i className={`fas fa-chevron-${expandedSection === section.id ? 'up' : 'down'}`}></i>
              </button>
            </div>

            {expandedSection === section.id && (
              <div className="lessons-container animate__animated animate__fadeIn">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="lesson-card">
                    <div 
                      className="lesson-header"
                      onClick={() => toggleLesson(lesson.id)}
                    >
                      <div className="lesson-number">{lesson.number}</div>
                      <div className="lesson-info">
                        <h4 className="lesson-title">{lesson.title}</h4>
                        <span className="lesson-duration">
                          <i className="fas fa-clock me-1"></i>
                          {lesson.duration}
                        </span>
                      </div>
                      <button className="lesson-toggle-btn">
                        <i className={`fas fa-chevron-${expandedLesson === lesson.id ? 'up' : 'down'}`}></i>
                      </button>
                    </div>

                    {expandedLesson === lesson.id && (
                      <div className="lesson-content animate__animated animate__fadeIn">
                        {lesson.content.intro && (
                          <div className="content-block intro-block">
                            <p className="lead">{lesson.content.intro}</p>
                          </div>
                        )}

                        {lesson.content.learn && (
                          <div className="content-block">
                            <h5><i className="fas fa-graduation-cap me-2"></i>You'll Learn:</h5>
                            <ul>
                              {lesson.content.learn.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.ancient && (
                          <div className="content-block">
                            <h5><i className="fas fa-history me-2"></i>Ancient Thinkers Focused On:</h5>
                            <ul>
                              {lesson.content.ancient.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.secret && (
                          <div className="content-block highlight-box">
                            <h5><i className="fas fa-key me-2"></i>The Real Secret:</h5>
                            <p className="highlight-text">{lesson.content.secret}</p>
                          </div>
                        )}

                        {lesson.content.traps && (
                          <div className="content-block">
                            <h5><i className="fas fa-exclamation-triangle me-2 text-warning"></i>Common Traps:</h5>
                            <ul>
                              {lesson.content.traps.map((item, idx) => (
                                <li key={idx}><i className="fas fa-times-circle me-2 text-danger"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.escape && (
                          <div className="content-block">
                            <h5><i className="fas fa-door-open me-2 text-success"></i>This Course Helps You Escape:</h5>
                            <ul>
                              {lesson.content.escape.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.needs && (
                          <div className="content-block">
                            <h5><i className="fas fa-list-check me-2"></i>A Good Morning Needs:</h5>
                            <ul>
                              {lesson.content.needs.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.works && (
                          <div className="content-block">
                            <h5><i className="fas fa-check-double me-2"></i>This Works Even If:</h5>
                            <ul>
                              {lesson.content.works.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.instead && (
                          <div className="content-block">
                            <h5><i className="fas fa-arrow-right me-2"></i>Instead of Fixed Hours:</h5>
                            <ul>
                              {lesson.content.instead.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.reality && (
                          <div className="content-block highlight-box">
                            <p className="highlight-text">{lesson.content.reality}</p>
                          </div>
                        )}

                        {lesson.content.plans && (
                          <div className="content-block">
                            <h5><i className="fas fa-calendar-check me-2"></i>The 3 Plans You Need:</h5>
                            <div className="plans-grid">
                              {lesson.content.plans.map((plan, idx) => (
                                <div key={idx} className="plan-card">
                                  <h6><i className="fas fa-star me-2"></i>{plan.name}</h6>
                                  <p className="small">{plan.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {lesson.content.insight && (
                          <div className="content-block">
                            <h5><i className="fas fa-lightbulb me-2 text-warning"></i>The Real Insight:</h5>
                            <ul>
                              {lesson.content.insight.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.optimize && (
                          <div className="content-block">
                            <h5><i className="fas fa-tools me-2"></i>Now We Optimize:</h5>
                            <ul>
                              {lesson.content.optimize.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.adapts && (
                          <div className="content-block">
                            <h5><i className="fas fa-sync-alt me-2"></i>This Adapts To:</h5>
                            <ul>
                              {lesson.content.adapts.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.metaphor && (
                          <div className="content-block metaphor-box">
                            <h5><i className="fas fa-water me-2"></i>The Bucket Metaphor:</h5>
                            <div className="metaphor-items">
                              <div className="metaphor-item">
                                <i className="fas fa-bucket me-2"></i>
                                <strong>{lesson.content.metaphor.day}</strong>
                              </div>
                              <div className="metaphor-item">
                                <i className="fas fa-mountain me-2"></i>
                                <strong>{lesson.content.metaphor.bigRocks}</strong>
                              </div>
                              <div className="metaphor-item">
                                <i className="fas fa-circle me-2"></i>
                                <strong>{lesson.content.metaphor.smallTasks}</strong>
                              </div>
                              <div className="metaphor-item">
                                <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
                                <strong>{lesson.content.metaphor.overflow}</strong>
                              </div>
                            </div>
                          </div>
                        )}

                        {lesson.content.ideas && (
                          <div className="content-block">
                            <h5><i className="fas fa-rocket me-2"></i>Next-Level Ideas:</h5>
                            <ul>
                              {lesson.content.ideas.map((item, idx) => (
                                <li key={idx}><i className="fas fa-check-circle me-2 text-success"></i>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.content.vision && (
                          <div className="content-block highlight-box">
                            <p className="highlight-text">{lesson.content.vision}</p>
                          </div>
                        )}

                        {lesson.content.impact && (
                          <div className="content-block highlight-box">
                            <p className="highlight-text">{lesson.content.impact}</p>
                          </div>
                        )}

                        {lesson.content.why && (
                          <div className="content-block">
                            <p><strong>Why:</strong> {lesson.content.why}</p>
                          </div>
                        )}

                        {lesson.content.audience && (
                          <div className="content-block">
                            <p><strong>Audience:</strong> {lesson.content.audience}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;

