import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import './DiscoveryQuestions.css'

function QuestionSection({ title, icon, questions, color }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="question-section">
      <button
        className={`section-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="section-title">
          <span className="section-icon" style={{ color }}>
            {icon}
          </span>
          <h3>{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="section-content">
          <ul className="questions-list">
            {questions.map((question, index) => (
              <li key={index}>
                {typeof question === 'string' ? (
                  <span>{question}</span>
                ) : (
                  <>
                    <strong>{question.label}</strong>
                    {question.subItems && (
                      <ul className="sub-items">
                        {question.subItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function DiscoveryQuestions() {
  const sections = [
    {
      title: 'Purpose & Goal',
      icon: '💡',
      color: '#3b82f6',
      questions: [
        'What problem are you trying to solve?',
        'What will the agent do? (e.g., answer questions, make a call)',
        'What knowledge will it have? (e.g., internal docs, public web)',
        'What is the expected outcome? (e.g., save time, increase sales)',
      ],
    },
    {
      title: 'Agent Behavior',
      icon: '🤖',
      color: '#10b981',
      questions: [
        'Could the agent only answer questions, or take actions too?',
        {
          label: 'Could it remember?',
          subItems: ['Long-term?', 'Short-term?'],
        },
        'What is the tone? (e.g., formal, friendly)',
        'How will it handle errors? (e.g., retry, escalate)',
        'How will it handle ambiguity? (e.g., ask for clarification)',
        'How will it handle unexpected inputs? (e.g., ignore, respond with a default)',
      ],
    },
    {
      title: 'Input & Output',
      icon: '📥',
      color: '#ec4899',
      questions: [
        {
          label: 'What will the agent receive? (e.g., text, voice, image)',
          subItems: ['Text?', 'Voice?', 'Image?'],
        },
        {
          label: 'What will the agent output?',
          subItems: [
            'Text?',
            'Voice?',
            'Image?',
            'Action?',
            'API call?',
            'Email?',
            'SMS?',
            'Database update?',
            'Other?',
          ],
        },
        'What is the expected format? (e.g., JSON, plain text)',
      ],
    },
    {
      title: 'Knowledge & Data',
      icon: '📚',
      color: '#8b5cf6',
      questions: [
        {
          label: 'What data sources will it use?',
          subItems: [
            'Internal knowledge base?',
            'Your documents? (PDFs, Word)',
            'Your database? (SQL, NoSQL)',
            'Any APIs?',
            'Public web?',
          ],
        },
        {
          label: 'How will it access data?',
          subItems: ['API?', 'Database query?', 'Web scraping?', 'Other?'],
        },
        'How often will data be updated?',
        'What is the volume of data?',
      ],
    },
    {
      title: 'Tools & Actions',
      icon: '🛠️',
      color: '#f59e0b',
      questions: [
        {
          label: 'What tools should the agent be able to use?',
          subItems: [
            'Search?',
            'Calendar?',
            'Email client?',
            'CRM?',
            'Database tool?',
            'API calls?',
            'Other?',
          ],
        },
        'How will the agent know when to use a tool?',
      ],
    },
    {
      title: 'Rules & Constraints',
      icon: '⚖️',
      color: '#ef4444',
      questions: [
        'Are there any rules the agent must obey? (e.g., privacy, security)',
        'Should it avoid certain topics or responses?',
        'What are the limitations of the agent? (e.g., cannot access external systems)',
        'What is the budget for its operation? (e.g., cost per query)',
      ],
    },
    {
      title: 'Technology Choices (Beginner Level)',
      icon: '💻',
      color: '#06b6d4',
      questions: [
        {
          label: 'Do you want to build it using:',
          subItems: ['Python?', 'JavaScript?', 'Other?'],
        },
        {
          label: 'What frameworks?',
          subItems: ['LangChain?', 'LlamaIndex?', 'AutoGen?', 'Other?'],
        },
        {
          label: 'What LLM?',
          subItems: ['OpenAI?', 'Anthropic?', 'Google AI?', 'Open-source?'],
        },
        {
          label: 'What cloud provider?',
          subItems: ['AWS?', 'Azure?', 'GCP?', 'Other?'],
        },
      ],
    },
    {
      title: 'User Experience',
      icon: '🎨',
      color: '#14b8a6',
      questions: [
        {
          label: 'How will users interact with the agent?',
          subItems: [
            'Chatbot?',
            'Voice assistant?',
            'Web interface?',
            'Mobile app?',
            'Other?',
          ],
        },
        'What is the desired response time?',
        'How will users provide feedback?',
        'How will the agent handle user interruptions?',
      ],
    },
    {
      title: 'Success Metrics',
      icon: '📊',
      color: '#a855f7',
      questions: [
        "How will you measure the agent's success?",
        'What are your "Key Performance Indicators" (KPIs)?',
        'What would make you say "this agent is a success"?',
        'How often should the agent be evaluated?',
      ],
    },
    {
      title: 'UX/UI Thinking',
      icon: '✨',
      color: '#f97316',
      questions: [
        'What is the simplest interface the agent could have?',
        'What can be added later?',
        'What can be ignored for now?',
      ],
    },
  ]

  return (
    <div className="discovery-questions">
      <div className="page-header">
        <div className="header-icon">
          <Lightbulb size={32} />
        </div>
        <h1>First AI Agent - Discovery Questions</h1>
        <p className="page-subtitle">
          Answer these questions to define your AI agent's purpose, behavior, and capabilities.
        </p>
      </div>

      <div className="definition-question">
        <div className="definition-card">
          <h2>✍️ First Definition Question</h2>
          <p className="definition-text">
            <strong>"If I have to define what this agent is, what would I say?"</strong>
          </p>
        </div>
      </div>

      <div className="sections-container">
        {sections.map((section, index) => (
          <QuestionSection
            key={index}
            title={section.title}
            icon={section.icon}
            questions={section.questions}
            color={section.color}
          />
        ))}
      </div>

      <div className="next-steps">
        <div className="next-steps-card">
          <h2>🚀 Next Steps</h2>
          <p>Based on the answers to the questions above, you can now:</p>
          <ul>
            <li>Create a simple prompt for the agent.</li>
            <li>Define the external tools it needs.</li>
            <li>Design a 'Think-Act-Observe' loop.</li>
            <li>Start with the simplest possible agent and iterate upon it.</li>
          </ul>
          <p className="motivation">Let's do this! 🔥</p>
        </div>
      </div>
    </div>
  )
}

export default DiscoveryQuestions
