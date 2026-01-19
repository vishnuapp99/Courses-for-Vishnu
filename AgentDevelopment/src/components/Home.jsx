import React from 'react'
import { Link } from 'react-router-dom'
import { Rocket, Zap, Code, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>How to build your first AI agent in 10 minutes or less!</span>
          </div>
          <h1 className="hero-title">
            Build Your First <span className="gradient-text">AI Agent</span>
          </h1>
          <p className="hero-description">
            This is a basic step-by-step guide for anyone who wants to create their first AI Agent.
            We're going to focus on good questions that help you create an AI agent, and we'll use
            the simplest code to make it work.
          </p>
          <div className="hero-actions">
            <Link to="/discovery" className="btn btn-primary">
              Start Learning <ArrowRight size={18} />
            </Link>
            <Link to="/agent-builder" className="btn btn-secondary">
              Build Your Agent
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon blue">
              <Zap size={24} />
            </div>
            <h3>Discovery Questions</h3>
            <p>
              Learn the essential questions to ask when building an AI agent. Understand purpose,
              behavior, inputs, outputs, and more.
            </p>
            <Link to="/discovery" className="feature-link">
              Explore Questions <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon pink">
              <Rocket size={24} />
            </div>
            <h3>Real Use Cases</h3>
            <p>
              See practical examples including Task Assistant, Recruitment Agent, Resume Reviewer,
              and HR Onboarding Agent.
            </p>
            <Link to="/use-cases" className="feature-link">
              View Examples <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              <Code size={24} />
            </div>
            <h3>Code Examples</h3>
            <p>
              Study minimal Python code examples that demonstrate how to build a working AI agent
              from scratch.
            </p>
            <Link to="/code-examples" className="feature-link">
              See Code <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">
              <BookOpen size={24} />
            </div>
            <h3>Agent Builder</h3>
            <p>
              Use our interactive tool to configure and build your own AI agent step by step with
              guided questions.
            </p>
            <Link to="/agent-builder" className="feature-link">
              Start Building <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="key-insights">
        <div className="insight-card">
          <h2>🔑 Key Insight</h2>
          <div className="insight-content">
            <p className="insight-formula">
              <strong>Real Agent = LLM + Rules + Decisions + External Tools</strong>
            </p>
            <div className="insight-warnings">
              <p>❌ No memory, no tools = just a chatbot</p>
              <p>❌ No rules = just a chatbot</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Build Your First Agent?</h2>
          <p>Follow our step-by-step guide and create a working AI agent in minutes!</p>
          <Link to="/discovery" className="btn btn-primary btn-large">
            Get Started <Rocket size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
