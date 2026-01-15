# Product Leadership Learning App

An interactive React application designed to help you master Product Leadership. The app features structured content covering 13 critical areas for senior product leaders, including strategy, business ownership, execution, AI, and people management.

## Features

- 🎯 **13 Strategic Learning Paths**: Each topic includes core principles, key concepts, and leadership achievements
- 💼 **Executive Focus**: Content specifically curated for senior PMs, Directors, and VPs of Product
- 🎨 **Modern UI Design**: Beautiful, responsive interface with gradient backgrounds and smooth animations
- 📱 **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- 🖼️ **Visual Content**: High-quality imagery from Unsplash for each leadership domain
- 🔍 **Easy Navigation**: Simple routing between topics and home page

## Topics Included

1. **Product Strategy & Vision** - Master vision creation and narrative building
2. **Business & P&L Ownership** - Develop financial acumen and revenue models
3. **Customer & Market Understanding** - Deepen discovery and market mapping
4. **Data, Metrics & Decision-Making** - Learn actionable KPIs and data storytelling
5. **Product Execution & Delivery** - Master outcome-based roadmaps and OKRs
6. **Technology Fundamentals** - Understand technical foundations and trade-offs
7. **AI & Future-Ready Thinking** - Prepare for AI-first design and strategies
8. **UX, Design & Experience** - Lead design-driven organizations at scale
9. **Leadership & People Management** - Grow and coach high-performing teams
10. **Stakeholder & Executive Management** - Influence without authority and align C-suite
11. **Go-To-Market & Growth** - Drive adoption through PLG and GTM excellence
12. **Risk, Compliance & Scale** - Navigate global scaling and regulatory challenges
13. **Personal Effectiveness** - Enhance strategic thinking and executive presence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
  ├── components/
  │   ├── Home.js          # Home page with topic cards
  │   ├── Home.css
  │   ├── TopicDetail.js   # Detailed topic view
  │   └── TopicDetail.css
  ├── data/
  │   └── topics.js        # Topic data and content
  ├── App.js              # Main app component with routing
  ├── App.css
  ├── index.js            # Entry point
  └── index.css
```

## Adding New Topics

To add a new topic, edit `src/data/topics.js` and add a new topic object with:
- `id`: Unique identifier
- `title`: Topic name
- `description`: Brief description
- `image`: Image URL
- `color`: Theme color
- `principles`: Array of principle objects
- `concepts`: Array of concept objects
- `achievements`: Array of achievement strings

## Technologies Used

- React 18
- React Router DOM
- CSS3 (with modern features like Grid, Flexbox, and animations)

## License

This project is open source and available for educational purposes.
