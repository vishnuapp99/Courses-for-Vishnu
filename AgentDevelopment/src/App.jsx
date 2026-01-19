import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './components/Home'
import DiscoveryQuestions from './components/DiscoveryQuestions'
import UseCases from './components/UseCases'
import AgentBuilder from './components/AgentBuilder'
import CodeExamples from './components/CodeExamples'
import ImageSearch from './components/ImageSearch'
import { Menu, X, Rocket, BookOpen, Code, Zap, Search } from 'lucide-react'
import './App.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/discovery', label: 'Discovery Questions', icon: Zap },
    { path: '/use-cases', label: 'Use Cases', icon: Rocket },
    { path: '/code-examples', label: 'Code Examples', icon: Code },
    { path: '/agent-builder', label: 'Agent Builder', icon: Zap },
    { path: '/image-search', label: 'Image Search', icon: Search },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Rocket className="logo-icon" />
          <span>AI Agent Builder</span>
        </Link>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discovery" element={<DiscoveryQuestions />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/code-examples" element={<CodeExamples />} />
            <Route path="/agent-builder" element={<AgentBuilder />} />
            <Route path="/image-search" element={<ImageSearch />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Learn how to build your first AI agent in 10 minutes or less! 🚀</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
