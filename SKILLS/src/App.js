import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TopicDetail from './components/TopicDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicId" element={<TopicDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
