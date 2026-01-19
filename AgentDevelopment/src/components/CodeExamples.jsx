import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Code, Copy, Check } from 'lucide-react'
import './CodeExamples.css'

function CodeBlock({ code, language = 'python', title }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-container">
      {title && (
        <div className="code-block-header">
          <h4>{title}</h4>
          <button className="copy-btn" onClick={copyToClipboard}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: title ? '0 0 8px 8px' : '8px',
          padding: '1.5rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

function CodeExamples() {
  const pythonCode = `import openai

# Agent Configuration
class Agent:
    def __init__(self, name, role, tools=None):
        self.name = name
        self.role = role
        self.tools = tools if tools else []
        self.memory = [] # Simple memory for conversation history

    def think(self, prompt):
        # Simulate thinking by calling an LLM
        messages = [{"role": "system", "content": self.role}]
        messages.extend(self.memory)
        messages.append({"role": "user", "content": prompt})

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo", # Or any other LLM
            messages=messages
        )
        thought = response.choices[0].message.content
        self.memory.append({"role": "user", "content": prompt})
        self.memory.append({"role": "assistant", "content": thought})
        return thought

    def act(self, thought):
        # Simulate acting based on thought (e.g., using tools)
        # For this minimal agent, we'll just print the thought
        print(f"{self.name} acts: {thought}")
        return thought

# Initialize the Agent
task_assistant = Agent(
    name="Task Assistant",
    role="You are a helpful AI assistant that helps users manage their tasks and plan their week. Prioritize, break down problems, suggest next steps, and provide summaries.",
    tools=["To-Do List Manager", "Calendar", "Email Client", "Web Search"]
)

# Simulate a conversation
user_input = "I need to plan my week. I have a project due on Friday, and I also need to schedule a doctor's appointment."
print(f"User: {user_input}")

# Agent's process
thought_process = task_assistant.think(user_input)
task_assistant.act(thought_process)

# Example of a follow-up interaction
user_input_2 = "What are the most important steps for the project?"
print(f"\\nUser: {user_input_2}")
thought_process_2 = task_assistant.think(user_input_2)
task_assistant.act(thought_process_2)`

  const exampleOutput = `User: I need to plan my week. I have a project due on Friday, and I also need to schedule a doctor's appointment.
Task Assistant acts: Okay, I can help you plan your week and manage your tasks. Let's break this down:

**Project Due Friday:**
1. **Break Down the Project:** What are the main components or phases of the project? List them out.
2. **Estimate Time:** How much time do you anticipate each component will take?
3. **Prioritize:** Which parts are most critical to complete first?
4. **Schedule Blocks:** Allocate specific time slots in your calendar for working on these project components throughout the week, leading up to Friday.
5. **Identify Dependencies:** Are there any tasks you need to complete before others?

**Doctor's Appointment:**
1. **Check Availability:** What days/times are you free for the appointment?
2. **Contact Doctor's Office:** Call or use their online portal to schedule the appointment.
3. **Add to Calendar:** Once scheduled, immediately add it to your calendar with reminders.
4. **Prepare:** Note down any questions or symptoms you want to discuss with the doctor.

**Overall Week Planning:**
1. **Review Existing Commitments:** Look at your current calendar for any other meetings or appointments.
2. **Allocate Buffer Time:** Leave some flexibility for unexpected tasks or delays.
3. **Daily Check-ins:** Plan to review your progress and adjust your plan each morning.

To get started, could you tell me more about the project? What are its main components?

User: What are the most important steps for the project?
Task Assistant acts: To determine the most important steps for your project, let's consider a few things:

1. **Project Scope and Deliverables:** What are the absolute core requirements and final outputs of the project? Focus on these first.
2. **Critical Path:** Identify tasks that, if delayed, would push back the entire project deadline. These are usually dependent tasks.
3. **High-Impact Tasks:** Which tasks will have the biggest positive effect on the project's success or client satisfaction?
4. **Early Wins:** Sometimes, tackling a smaller, important task early can build momentum and confidence.
5. **Dependencies:** Are there any tasks that other team members or external factors are waiting on you to complete? Prioritize these to avoid bottlenecks.

Could you give me a brief overview of the project's main goals or what needs to be delivered? This will help me suggest more specific important steps.`

  return (
    <div className="code-examples">
      <div className="page-header">
        <div className="header-icon">
          <Code size={32} />
        </div>
        <h1>Code Examples</h1>
        <p className="page-subtitle">
          Study minimal Python code examples that demonstrate how to build a working AI agent from
          scratch.
        </p>
      </div>

      <div className="intro-section">
        <div className="intro-card">
          <h2>⚠️ Sample Python Code (Minimal Agent)</h2>
          <p>
            This is a very basic and simple agent. You can expand it later. The code demonstrates
            the core concepts of an AI agent: thinking, acting, and maintaining memory.
          </p>
        </div>
      </div>

      <div className="code-section">
        <h3 className="section-title">📝 Sample Input (User)</h3>
        <div className="input-example">
          <p>
            "I need to plan my week. I have a project due on Friday, and I also need to schedule a
            doctor's appointment."
          </p>
        </div>
      </div>

      <div className="code-section">
        <CodeBlock code={pythonCode} language="python" title="Python Agent Implementation" />
      </div>

      <div className="code-section">
        <h3 className="section-title">📄 Example Output</h3>
        <CodeBlock code={exampleOutput} language="text" />
      </div>

      <div className="architecture-section">
        <div className="architecture-card">
          <h2>⚙️ Architecture (Very Simple)</h2>
          <div className="architecture-grid">
            <div className="arch-item">
              <h3>Goal</h3>
              <p>Help me manage my tasks.</p>
            </div>
            <div className="arch-item">
              <h3>Tools</h3>
              <ul>
                <li>To-Do List Manager (e.g., Notion, Trello)</li>
                <li>Calendar (e.g., Google Calendar)</li>
                <li>Email Client (e.g., Gmail)</li>
                <li>Web Search (e.g., Google)</li>
                <li>API Calls (e.g., Zapier)</li>
              </ul>
            </div>
            <div className="arch-item">
              <h3>Agent</h3>
              <ul>
                <li>
                  <strong>Input:</strong> User query
                </li>
                <li>
                  <strong>Output:</strong> Action plan, summary, updated tasks
                </li>
                <li>
                  <strong>Memory:</strong> Short-term (current conversation), Long-term (user
                  preferences, past tasks)
                </li>
                <li>
                  <strong>LLM:</strong> OpenAI GPT-4
                </li>
                <li>
                  <strong>Or any other LLM</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="next-steps-section">
        <div className="next-steps-card">
          <h2>🚀 Next Steps (Very Important)</h2>
          <p>From here, you can:</p>
          <ul>
            <li>Convert this into a proper agent.</li>
            <li>Add your own 'Think-Act-Observe' workflow.</li>
            <li>Add memory.</li>
            <li>Add tool calling.</li>
            <li>Create your own Agent!</li>
          </ul>
          <p className="motivation">Let's do this! 🔥 what have you built? 🚀</p>
        </div>
      </div>
    </div>
  )
}

export default CodeExamples
