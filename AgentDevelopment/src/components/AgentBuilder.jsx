import React, { useState } from 'react'
import { Save, Download, Rocket, CheckCircle } from 'lucide-react'
import './AgentBuilder.css'

function AgentBuilder() {
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    role: '',
    purpose: '',
    input: '',
    output: '',
    memory: 'short-term',
    llm: 'gpt-3.5-turbo',
    tools: [],
    tone: 'friendly',
    errorHandling: 'retry',
    rules: '',
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const steps = [
    {
      title: 'Purpose & Goal',
      questions: [
        {
          id: 'purpose',
          label: 'What problem are you trying to solve?',
          type: 'textarea',
        },
        {
          id: 'role',
          label: 'What will the agent do? (e.g., answer questions, make a call)',
          type: 'textarea',
        },
        {
          id: 'expectedOutcome',
          label: 'What is the expected outcome? (e.g., save time, increase sales)',
          type: 'textarea',
        },
      ],
    },
    {
      title: 'Agent Behavior',
      questions: [
        {
          id: 'tone',
          label: 'What is the tone?',
          type: 'select',
          options: ['Formal', 'Friendly', 'Professional', 'Casual', 'Technical'],
        },
        {
          id: 'errorHandling',
          label: 'How will it handle errors?',
          type: 'select',
          options: ['Retry', 'Escalate', 'Ask for help', 'Ignore and continue'],
        },
        {
          id: 'memory',
          label: 'What type of memory?',
          type: 'select',
          options: ['Short-term only', 'Long-term only', 'Both', 'None'],
        },
      ],
    },
    {
      title: 'Input & Output',
      questions: [
        {
          id: 'input',
          label: 'What will the agent receive?',
          type: 'multiselect',
          options: ['Text', 'Voice', 'Image', 'File', 'API Data'],
        },
        {
          id: 'output',
          label: 'What will the agent output?',
          type: 'multiselect',
          options: [
            'Text',
            'Voice',
            'Image',
            'Action',
            'API Call',
            'Email',
            'Database Update',
          ],
        },
      ],
    },
    {
      title: 'Tools & Technology',
      questions: [
        {
          id: 'tools',
          label: 'What tools should the agent use?',
          type: 'multiselect',
          options: [
            'Search',
            'Calendar',
            'Email Client',
            'CRM',
            'Database',
            'API Calls',
            'File System',
          ],
        },
        {
          id: 'llm',
          label: 'Which LLM?',
          type: 'select',
          options: [
            'OpenAI GPT-3.5',
            'OpenAI GPT-4',
            'Anthropic Claude',
            'Google Gemini',
            'Open Source (Llama)',
          ],
        },
      ],
    },
    {
      title: 'Rules & Constraints',
      questions: [
        {
          id: 'rules',
          label: 'Are there any rules the agent must obey?',
          type: 'textarea',
        },
        {
          id: 'limitations',
          label: 'What are the limitations?',
          type: 'textarea',
        },
      ],
    },
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateAgentConfig = () => {
    const config = {
      name: answers.name || 'My AI Agent',
      role: answers.role || 'A helpful AI assistant',
      purpose: answers.purpose || '',
      input: Array.isArray(answers.input) ? answers.input.join(', ') : answers.input || 'Text',
      output: Array.isArray(answers.output)
        ? answers.output.join(', ')
        : answers.output || 'Text',
      memory: answers.memory || 'Short-term only',
      llm: answers.llm || 'OpenAI GPT-3.5',
      tools: Array.isArray(answers.tools) ? answers.tools : [],
      tone: answers.tone || 'Friendly',
      errorHandling: answers.errorHandling || 'Retry',
      rules: answers.rules || '',
      limitations: answers.limitations || '',
    }
    return config
  }

  const exportConfig = () => {
    const config = generateAgentConfig()
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'agent-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="agent-builder">
      <div className="page-header">
        <div className="header-icon">
          <Rocket size={32} />
        </div>
        <h1>Agent Builder</h1>
        <p className="page-subtitle">
          Use this interactive tool to configure and build your own AI agent step by step.
        </p>
      </div>

      <div className="builder-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">
          Step {currentStep + 1} of {steps.length}
        </div>

        <div className="step-card">
          <h2 className="step-title">{currentStepData.title}</h2>
          <div className="questions-container">
            {currentStepData.questions.map((question, idx) => (
              <div key={idx} className="question-item">
                <label className="question-label">{question.label}</label>
                {question.type === 'textarea' ? (
                  <textarea
                    className="question-input"
                    rows={4}
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    placeholder="Enter your answer..."
                  />
                ) : question.type === 'select' ? (
                  <select
                    className="question-input"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                  >
                    <option value="">Select an option...</option>
                    {question.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : question.type === 'multiselect' ? (
                  <div className="multiselect-container">
                    {question.options.map((option) => {
                      const selected = Array.isArray(answers[question.id])
                        ? answers[question.id].includes(option)
                        : false
                      return (
                        <button
                          key={option}
                          className={`multiselect-option ${selected ? 'selected' : ''}`}
                          onClick={() => {
                            const current = Array.isArray(answers[question.id])
                              ? answers[question.id]
                              : []
                            const updated = selected
                              ? current.filter((item) => item !== option)
                              : [...current, option]
                            handleAnswer(question.id, updated)
                          }}
                        >
                          {selected && <CheckCircle size={16} />}
                          {option}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <input
                    className="question-input"
                    type="text"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    placeholder="Enter your answer..."
                  />
                )}
              </div>
            ))}
          </div>

          <div className="step-actions">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            {currentStep < steps.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className="btn btn-primary" onClick={exportConfig}>
                <Download size={18} />
                Export Config
              </button>
            )}
          </div>
        </div>

        <div className="preview-section">
          <h3>Agent Preview</h3>
          <div className="preview-card">
            <pre>{JSON.stringify(generateAgentConfig(), null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentBuilder
