import React from 'react';
import './PatternDetail.css';

const PatternDetail = ({ pattern, onBack }) => {
  if (!pattern) return null;

  return (
    <div className="pattern-detail-container animate__animated animate__fadeIn">
      <button 
        className="btn btn-light back-button animate__animated animate__fadeInLeft"
        onClick={onBack}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back to Patterns
      </button>

      <div className="card pattern-detail-card">
        <div className="card-header bg-gradient text-white p-4">
          <div className="d-flex align-items-center">
            <div className="pattern-detail-icon me-4">
              <i className={`bi ${pattern.icon}`}></i>
            </div>
            <div>
              <h2 className="mb-2">{pattern.name}</h2>
              <div className="d-flex gap-2">
                <span className={`badge category-badge badge-${pattern.category}`}>
                  {pattern.category}
                </span>
                {pattern.priority && (
                  <span className="badge bg-warning text-dark">
                    <i className="bi bi-star-fill me-1"></i>
                    {pattern.priority} Priority
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-8">
              <section className="mb-4">
                <h4 className="text-primary mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Description
                </h4>
                <p className="lead">{pattern.description}</p>
              </section>

              <section className="mb-4">
                <h4 className="text-primary mb-3">
                  <i className="bi bi-question-circle me-2"></i>
                  Problem It Solves
                </h4>
                <p>{pattern.problem}</p>
              </section>

              <section className="mb-4">
                <h4 className="text-primary mb-3">
                  <i className="bi bi-check-circle me-2"></i>
                  Solution
                </h4>
                <p>{pattern.solution}</p>
              </section>

              {pattern.example && (
                <section className="mb-4">
                  <h4 className="text-primary mb-3">
                    <i className="bi bi-code-square me-2"></i>
                    Code Example
                  </h4>
                  <div className="code-example">
                    <pre>{pattern.example}</pre>
                  </div>
                </section>
              )}

              {pattern.useCases && (
                <section className="mb-4">
                  <h4 className="text-primary mb-3">
                    <i className="bi bi-list-check me-2"></i>
                    Use Cases
                  </h4>
                  <ul className="use-case-list">
                    {pattern.useCases.map((useCase, index) => (
                      <li key={index}>{useCase}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="col-md-4">
              <div className="pattern-info-sidebar">
                <div className="info-card mb-3">
                  <h5 className="text-primary mb-3">
                    <i className="bi bi-lightbulb me-2"></i>
                    Real-World Analogy
                  </h5>
                  <p className="text-muted">{pattern.analogy}</p>
                </div>

                {pattern.pros && (
                  <div className="info-card mb-3">
                    <h5 className="text-success mb-3">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Pros
                    </h5>
                    <ul className="list-unstyled">
                      {pattern.pros.map((pro, index) => (
                        <li key={index} className="mb-2">
                          <i className="bi bi-check text-success me-2"></i>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pattern.cons && (
                  <div className="info-card">
                    <h5 className="text-danger mb-3">
                      <i className="bi bi-x-circle-fill me-2"></i>
                      Cons
                    </h5>
                    <ul className="list-unstyled">
                      {pattern.cons.map((con, index) => (
                        <li key={index} className="mb-2">
                          <i className="bi bi-x text-danger me-2"></i>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDetail;

