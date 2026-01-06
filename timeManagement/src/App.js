import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './App.css';
import EnergySelector from './components/EnergySelector';
import RoleBuckets from './components/RoleBuckets';
import MetroTime from './components/MetroTime';
import DailyControl from './components/DailyControl';
import EnergyVisualization from './components/EnergyVisualization';
import Header from './components/Header';
import TheorySection from './components/TheorySection';
import CourseContent from './components/CourseContent';

function App() {
  const [selectedEnergy, setSelectedEnergy] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App">
      <Header />
      
      <div className="container-fluid px-4 py-5">
        {/* Hero Section */}
        <div className="row mb-5">
          <div className="col-12 text-center animate__animated animate__fadeInDown">
            <h1 className="display-3 fw-bold text-white mb-3">
              <i className="fas fa-bolt me-3"></i>
              Energy Time Manager
            </h1>
            <p className="lead text-white-50 mb-4">
              Don't manage time. Manage energy, roles, and intent.
            </p>
            <div className="quote-box animate__animated animate__fadeInUp animate__delay-1s">
              <p className="h5 text-white">
                <i className="fas fa-quote-left me-2"></i>
                You don't fight your day — you flow with it.
                <i className="fas fa-quote-right ms-2"></i>
              </p>
            </div>
          </div>
        </div>

        {/* Energy Selector Section */}
        <div className="row mb-5">
          <div className="col-12">
            <EnergySelector 
              selectedEnergy={selectedEnergy} 
              onEnergySelect={setSelectedEnergy} 
            />
          </div>
        </div>

        {/* Three.js Visualization */}
        {selectedEnergy && (
          <div className="row mb-5 animate__animated animate__fadeIn">
            <div className="col-12">
              <EnergyVisualization energyLevel={selectedEnergy} />
            </div>
          </div>
        )}

        {/* Role-Based Buckets */}
        <div className="row mb-5">
          <div className="col-12">
            <RoleBuckets 
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
              currentEnergy={selectedEnergy}
            />
          </div>
        </div>

        {/* Metro Time Section */}
        <div className="row mb-5">
          <div className="col-12">
            <MetroTime />
          </div>
        </div>

        {/* Daily Control Questions */}
        <div className="row mb-5">
          <div className="col-12">
            <DailyControl 
              currentEnergy={selectedEnergy}
              currentRole={selectedRole}
            />
          </div>
        </div>

        {/* Theory Section - Become More */}
        <div className="row mb-5">
          <div className="col-12">
            <TheorySection />
          </div>
        </div>

        {/* Course Content Section */}
        <div className="row mb-5">
          <div className="col-12">
            <CourseContent />
          </div>
        </div>

        {/* Footer */}
        <div className="row">
          <div className="col-12 text-center py-4">
            <p className="text-white-50">
              <i className="fas fa-heart text-danger me-2"></i>
              Built with energy, not time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

