import React, { useState } from 'react'
import { Rocket, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import './UseCases.css'

function UseCaseCard({ useCase, index }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <div className="use-case-card">
      <button
        className={`use-case-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="use-case-title-section">
          <span className="use-case-icon">{useCase.icon}</span>
          <div>
            <h3>{useCase.title}</h3>
            <p className="use-case-subtitle">{useCase.subtitle}</p>
          </div>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && (
        <div className="use-case-content">
          <div className="problem-section">
            <h4>Problem</h4>
            <p>{useCase.problem}</p>
          </div>
          <div className="agent-details">
            <div className="detail-section">
              <h4>Agent</h4>
              <ul>
                <li>
                  <strong>Input:</strong> {useCase.agent.input}
                </li>
                <li>
                  <strong>Output:</strong> {useCase.agent.output}
                </li>
                <li>
                  <strong>Memory:</strong> {useCase.agent.memory}
                </li>
                <li>
                  <strong>LLM:</strong> {useCase.agent.llm}
                </li>
              </ul>
            </div>
            <div className="detail-section">
              <h4>Tools</h4>
              <ul>
                {useCase.tools.map((tool, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} className="tool-icon" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {useCase.behaviors && (
            <div className="behaviors-section">
              <h4>Agent Behavior Simple Rules</h4>
              <ul>
                {useCase.behaviors.map((behavior, idx) => (
                  <li key={idx}>{behavior}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function UseCases() {
  const useCases = [
    {
      title: 'AI Personal Task Assistant',
      subtitle: 'Help manage tasks and plan your week',
      icon: '✅',
      problem:
        'Many people try to manage a lot of tasks and often fail to know where to start.',
      agent: {
        input: 'User query',
        output: 'Action plan, summary, updated tasks',
        memory: 'Short-term (current conversation), Long-term (user preferences, past tasks)',
        llm: 'OpenAI GPT-4 or any other LLM',
      },
      tools: [
        'To-Do List Manager (e.g., Notion, Trello)',
        'Calendar (e.g., Google Calendar)',
        'Email Client (e.g., Gmail)',
        'Web Search (e.g., Google)',
        'API Calls (e.g., Zapier)',
      ],
      behaviors: [
        'Prioritize the most important questions.',
        'Break down problems.',
        'Suggest the next steps.',
        'Provide a summary.',
      ],
    },
    {
      title: 'Recruitment Agent',
      subtitle: 'Streamline your hiring process',
      icon: '💼',
      problem: 'Finding and evaluating candidates is time-consuming and repetitive.',
      agent: {
        input: 'Job description',
        output: 'Candidate list, interview questions, outreach email',
        memory: 'Candidate database, past interactions',
        llm: 'GPT-4',
      },
      tools: [
        'ATS (Applicant Tracking System)',
        'LinkedIn Recruiter',
        'Email client',
        'Calendar',
        'Job boards',
      ],
    },
    {
      title: 'Resume Reviewer',
      subtitle: 'Automate resume screening and feedback',
      icon: '📄',
      problem: 'Reviewing resumes manually is slow and can miss qualified candidates.',
      agent: {
        input: 'Resume, job description',
        output: 'Score, feedback, tailored questions',
        memory: 'Resume database, industry standards',
        llm: 'GPT-4',
      },
      tools: [
        'Document parser',
        'Text analysis',
        'Skill extraction',
        'Database query',
      ],
    },
    {
      title: 'HR Onboarding Agent',
      subtitle: 'Automate new employee onboarding',
      icon: '👥',
      problem: 'Onboarding new employees requires coordination across multiple systems.',
      agent: {
        input: 'New hire info',
        output: 'Onboarding plan, welcome email, task list',
        memory: 'Employee database, company policies',
        llm: 'GPT-4',
      },
      tools: [
        'HRIS (Human Resources Information System)',
        'Email client',
        'Calendar',
        'Document management',
      ],
    },
  ]

  return (
    <div className="use-cases">
      <div className="page-header">
        <div className="header-icon">
          <Rocket size={32} />
        </div>
        <h1>Realistic Use Cases</h1>
        <p className="page-subtitle">
          Explore practical examples of AI agents that solve real-world problems.
        </p>
      </div>

      <div className="intro-section">
        <div className="intro-card">
          <h2>💖 Realistic Use Cases</h2>
          <p>
            Below are examples of 'First Agent' concepts with realistic use cases and clear
            explanations. If you're a beginner, don't feel like you need to get it all - you can
            just follow along and build your first task.
          </p>
        </div>
      </div>

      <div className="use-cases-container">
        {useCases.map((useCase, index) => (
          <UseCaseCard key={index} useCase={useCase} index={index} />
        ))}
      </div>

      <div className="why-real-agent">
        <div className="why-card">
          <h2>🔥 Why This is a REAL AI AGENT</h2>
          <div className="why-list">
            <div className="why-item">
              <CheckCircle size={24} className="why-icon" />
              <span>Goal-oriented</span>
            </div>
            <div className="why-item">
              <CheckCircle size={24} className="why-icon" />
              <span>Ability to reason</span>
            </div>
            <div className="why-item">
              <CheckCircle size={24} className="why-icon" />
              <span>Memory state</span>
            </div>
            <div className="why-item">
              <CheckCircle size={24} className="why-icon" />
              <span>Uses external tools</span>
            </div>
            <div className="why-item">
              <CheckCircle size={24} className="why-icon" />
              <span>Easy to upgrade</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scaling-section">
        <div className="scaling-card">
          <h2>📈 How This Scales (Very Important)</h2>
          <div className="scaling-content">
            <div className="scaling-item">
              <h3>What's missing?</h3>
              <ul>
                <li>Memory persistence</li>
                <li>Tool usage (more complex)</li>
                <li>Agent orchestration</li>
              </ul>
            </div>
            <div className="scaling-item">
              <h3>Version 2 (Possibilities)</h3>
              <ul>
                <li>Add more tools</li>
                <li>Add long-term memory</li>
                <li>Add self-correction</li>
                <li>Add multi-agent collaboration</li>
                <li>Add monitoring</li>
                <li>Add UI/UX</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseCases
