# AI Agent Learning Platform

A comprehensive React application for learning how to build your first AI agent in 10 minutes or less! This platform provides interactive guides, code examples, use cases, and tools to help anyone create their first AI agent.

## Features

- 📚 **Interactive Discovery Questions** - Step-by-step guide with essential questions for building AI agents
- 🚀 **Real Use Cases** - Practical examples including Task Assistant, Recruitment Agent, Resume Reviewer, and HR Onboarding Agent
- 💻 **Code Examples** - Minimal Python code examples demonstrating core AI agent concepts
- 🛠️ **Agent Builder** - Interactive tool to configure and build your own AI agent
- 🖼️ **Image Search** - Search for images from the web to use in your projects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Landing page
│   │   ├── DiscoveryQuestions.jsx # Interactive discovery questions
│   │   ├── UseCases.jsx          # Use case examples
│   │   ├── CodeExamples.jsx      # Code examples with syntax highlighting
│   │   ├── AgentBuilder.jsx      # Interactive agent builder
│   │   └── ImageSearch.jsx       # Web image search feature
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Features in Detail

### Discovery Questions
Interactive collapsible sections covering:
- Purpose & Goal
- Agent Behavior
- Input & Output
- Knowledge & Data
- Tools & Actions
- Rules & Constraints
- Technology Choices
- User Experience
- Success Metrics
- UX/UI Thinking

### Use Cases
Detailed examples of real-world AI agents:
- **AI Personal Task Assistant** - Help manage tasks and plan your week
- **Recruitment Agent** - Streamline your hiring process
- **Resume Reviewer** - Automate resume screening
- **HR Onboarding Agent** - Automate new employee onboarding

### Code Examples
- Complete Python implementation of a minimal AI agent
- Syntax-highlighted code with copy functionality
- Example inputs and outputs
- Architecture overview

### Agent Builder
Step-by-step wizard to configure your agent:
- Answer guided questions
- Preview your agent configuration
- Export configuration as JSON

### Image Search
- Search for images related to AI agents
- Download images for your projects
- Uses placeholder images in demo mode (add API key for real search)

## Customization

### Adding Image Search API Key

To enable real image search, edit `src/components/ImageSearch.jsx` and replace:
- `YOUR_PEXELS_API_KEY` with your Pexels API key, or
- `YOUR_UNSPLASH_ACCESS_KEY` with your Unsplash API key

Get API keys from:
- [Pexels API](https://www.pexels.com/api/)
- [Unsplash API](https://unsplash.com/developers)

## Technologies Used

- **React 18** - UI library
- **React Router** - Navigation and routing
- **Vite** - Build tool and dev server
- **React Syntax Highlighter** - Code syntax highlighting
- **Lucide React** - Icon library
- **CSS3** - Styling with custom properties

## Key Concepts Covered

- **Real Agent Formula**: LLM + Rules + Decisions + External Tools
- **Think-Act-Observe Loop**: Core pattern for AI agents
- **Memory Management**: Short-term vs Long-term memory
- **Tool Integration**: How agents interact with external systems
- **Scaling Considerations**: What to add in Version 2

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## Acknowledgments

Based on the guide "How to build your first AI agent in 10 minutes or less!" - A comprehensive step-by-step guide for creating AI agents.

---

**Happy Learning! 🚀**
