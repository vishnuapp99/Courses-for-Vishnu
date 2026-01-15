export const topics = [
  {
    id: 'product-strategy-vision',
    title: 'Product Strategy & Vision',
    description: 'Master the art of creating compelling visions and long-term strategic roadmaps that drive product success.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
    color: '#4e54c8',
    principles: [
      {
        title: 'Vision Creation & Narrative',
        description: 'Build a North Star vision that inspires teams and stakeholders, creating a clear narrative for where the product is headed. A strong vision is not just a statement; it is a story that paints a vivid picture of the future.',
        example: 'Kennedy\'s "We choose to go to the moon" speech aligned an entire nation not because it was a detailed plan, but because it was a compelling vision of the future.',
        story: 'When Slack pivoted from a gaming company to a communication tool, their vision shifted from "making a game" to "making work life simpler, more pleasant and more productive." This clarity allowed them to kill the game and focus entirely on the tool that became Slack.'
      },
      {
        title: 'Roadmap Planning',
        description: 'Balance short-term delivery with long-term strategic goals, ensuring continuous value delivery and strategic alignment. A roadmap is a prototype for your strategy, not a commitment to features.',
        example: 'Using a "Now-Next-Later" roadmap format allows teams to commit to immediate deliverables ("Now") while maintaining flexibility for future strategic bets ("Later") without over-promising specific dates.',
        story: 'Netflix\'s roadmap in 2007 wasn\'t just "add streaming." It was a multi-year strategy to transition from DVD-by-mail to streaming, requiring them to secure content deals, build streaming infrastructure, and design new player interfaces long before the first stream happened.'
      },
      {
        title: 'Portfolio Management',
        description: 'Manage multiple products or strategic bets, optimizing resource allocation and risk across the product portfolio using frameworks like the Three Horizons model.',
        example: 'Google allocates resources across Horizon 1 (Search, Ads - core business), Horizon 2 (Cloud, YouTube - growth), and Horizon 3 (Waymo, Verily - future bets).',
        story: 'Amazon famously manages its portfolio by allowing "two-pizza teams" to operate almost like independent startups. This decentralization allows AWS to grow rapidly without being bottlenecked by the retail business, creating a diversified portfolio of massive products.'
      },
      {
        title: 'Product-Market Fit (PMF)',
        description: 'Utilize frameworks to identify, measure, and sustain product-market fit. PMF is not a one-time event but a continuous process of aligning your product with market needs.',
        example: 'Superhuman (email client) uses the "Sean Ellis Test": asking users "How would you feel if you could no longer use the product?" If >40% say "very disappointed," you have PMF.',
        story: 'Airbnb struggled for years until they realized their photos were the problem. They went to New York, took professional photos of listings themselves, and saw revenue double. That was their moment of finding PMF—realizing trust was the key barrier.'
      }
    ],
    concepts: [
      {
        title: 'Platform vs Feature Strategy',
        description: 'Decide when to build horizontal platforms versus vertical features. Platforms enable others to build value (leverage), while features deliver direct value to users.',
        example: 'Shopify is a platform: it empowers merchants to build their own stores. A checkout button is a feature. Shopify\'s strategy focused on building the ecosystem (App Store) rather than just adding more features themselves.'
      },
      {
        title: 'Build vs Buy vs Partner',
        description: 'Apply strategic frameworks to make critical decisions on whether to develop internally (control), acquire (speed), or form partnerships (reach).',
        example: 'Disney bought Pixar instead of trying to rebuild their animation dominance from scratch. They realized buying the talent and IP was faster and less risky than trying to "build" a new culture internally.'
      },
      {
        title: 'North Star Metrics',
        description: 'Define and track the single most important metric that captures the core value your product delivers to customers. It aligns the entire organization around customer value.',
        example: 'Spotify\'s North Star Metric isn\'t "Revenue" or "Daily Active Users." It is "Time Spent Listening." If users spend time listening, they are getting value, which leads to retention and eventually revenue.'
      }
    ],
    achievements: [
      'Create and communicate a compelling product vision',
      'Develop multi-year strategic roadmaps',
      'Optimize a product portfolio for growth and stability',
      'Navigate the path to Product-Market Fit',
      'Make informed build/buy/partner decisions'
    ]
  },
  {
    id: 'business-pl-ownership',
    title: 'Business & P&L Ownership',
    description: 'Develop the financial acumen needed to manage product revenue, pricing, and unit economics effectively.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    color: '#11998e',
    principles: [
      {
        title: 'Revenue Models',
        description: 'Master various monetization strategies including SaaS, Marketplace, Subscription, and Usage-based models. Choosing the right model is as important as the product itself.',
        example: 'Adobe shifted from selling boxed software (licenses) to Creative Cloud (SaaS subscription). This initially annoyed users but stabilized revenue and massively increased LTV and company valuation.',
        story: 'When Slack launched, they didn\'t charge per user immediately. They used a "Fair Billing Policy" where you only paid for active users. This built immense trust and aligned their revenue model with actual value delivered.'
      },
      {
        title: 'Pricing & Packaging',
        description: 'Design strategic pricing and packaging that aligns with customer value (willingness to pay) rather than just cost-plus.',
        example: 'LinkedIn Premium has different packages for Recruiters, Sales, and Job Seekers. Each package bundles features specific to that persona\'s high-value tasks, maximizing revenue capture.',
        story: 'Evernote struggled because their free tier was "too good." Users never needed to upgrade. They had to painfully restructure their pricing to limit device syncing, pushing power users to pay. It was controversial but saved the business.'
      },
      {
        title: 'Unit Economics',
        description: 'Analyze and optimize critical metrics like CAC (Customer Acquisition Cost) and LTV (Lifetime Value). A healthy business needs LTV:CAC ratio of > 3:1.',
        example: 'If you spend $100 in ads to get a customer (CAC) and they pay you $10/month for 2 years (LTV = $240), your ratio is 2.4:1. You might be growing, but you aren\'t highly profitable yet.'
      }
    ],
    concepts: [
      {
        title: 'Cost vs Value Creation',
        description: 'Balance cost optimization (efficiency) with value creation (growth). cutting costs can improve margins, but only innovation drives long-term growth.',
        example: 'Costco operates on razor-thin margins for products but makes its profit from memberships. They optimize logistics costs relentlessly to keep prices low, which drives the value of the membership.'
      },
      {
        title: 'Forecasting & Budgeting',
        description: 'Develop accurate financial forecasts based on historical data and market assumptions. This builds credibility with the CFO and Board.',
        example: 'A "Bottom-Up" forecast builds the revenue projection based on traffic * conversion rate * price. This is often more accurate than a "Top-Down" forecast ("We will get 1% of the market").'
      },
      {
        title: 'Board-Level Communication',
        description: 'Communicate product performance and financial impact effectively. Boards care about growth, burn rate, and strategic risks, not feature lists.',
        story: 'A PM Leader presented a roadmap of 50 features to the Board and got blank stares. The next quarter, she presented "3 Strategic Bets to Double Retention" with financial modeling. The Board immediately engaged and approved the budget.'
      }
    ],
    achievements: [
      'Manage a product P&L successfully',
      'Optimize CAC:LTV ratios for profitability',
      'Design and implement effective pricing strategies',
      'Present product financial health to executives',
      'Develop robust product budgets and forecasts'
    ]
  },
  {
    id: 'customer-market-understanding',
    title: 'Customer & Market Understanding',
    description: 'Deepen your ability to discover customer needs and map competitive landscapes at scale.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    color: '#ff9966',
    principles: [
      {
        title: 'Jobs-To-Be-Done (JTBD)',
        description: 'Apply the JTBD framework to understand the underlying "job" customers are hiring your product to do, rather than just what they say they want.',
        example: 'People don\'t buy a drill because they want a drill; they want a hole in the wall. Or deeper: they want to hang a picture to make their home feel cozy.',
        story: 'McDonald\'s tried to improve their milkshakes by making them tastier. Sales didn\'t move. Using JTBD, they realized people "hired" milkshakes to make their morning commute less boring. They made the shakes thicker (lasted longer) and added fruit chunks (more interesting). Sales skyrocketed.'
      },
      {
        title: 'User Segmentation',
        description: 'Create detailed personas and segment your user base. "Everyone" is not a target market. Segmentation allows for tailored messaging and features.',
        example: 'Strava segments users into "Social Fitness Enthusiasts" (share kudos) and "Data-Driven Athletes" (analyze pace zones). Features are built specifically for these distinct needs.'
      },
      {
        title: 'Customer Discovery at Scale',
        description: 'Implement systems for continuous customer discovery (interviews, surveys, observation) rather than one-off research projects.',
        example: 'Atlassian uses "R&D" (Research & Design) trios embedded in every squad to conduct weekly customer interviews, ensuring product decisions are always grounded in fresh data.'
      }
    ],
    concepts: [
      {
        title: 'Competitive Mapping',
        description: 'Map competitors not just by features, but by strategy and customer focus. Identify "Blue Ocean" opportunities where competition is irrelevant.',
        example: 'Cirque du Soleil competed with traditional circuses not by adding more animals, but by eliminating them and adding theater/drama—creating a new market space.'
      },
      {
        title: 'Voice of Customer (VoC)',
        description: 'Build robust systems (like NPS, CSAT, Support Ticket tagging) to systematically capture and analyze customer feedback.',
        story: 'Amazon has a "Customer Obsession" mechanism where leaders read customer complaints in meetings. One famous story involves Jeff Bezos calling customer support during a meeting to prove wait times were too long.'
      },
      {
        title: 'Enterprise vs SMB vs Consumer',
        description: 'Understand the critical differences. Enterprise = lengthy sales cycles, complex permissions, security. Consumer = viral growth, simplicity, emotional engagement.',
        example: 'Slack started as an SMB tool (easy adoption). To move upmarket to Enterprise (Microsoft Teams territory), they had to build "boring" features like Audit Logs, SSO, and Data Residency.'
      }
    ],
    achievements: [
      'Conduct deep-dive customer discovery sessions',
      'Build a comprehensive market map',
      'Implement a Voice of Customer system',
      'Define clear user personas and segments',
      'Apply JTBD to drive product innovation'
    ]
  },
  {
    id: 'data-metrics-decision-making',
    title: 'Data, Metrics & Decision-Making',
    description: 'Learn to define actionable KPIs and use data storytelling to influence strategic decisions.',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda50a13af?w=800&h=600&fit=crop',
    color: '#00c6ff',
    principles: [
      {
        title: 'Actionable KPIs',
        description: 'Define metrics that actually drive behavior. A good KPI tells you if you are moving towards your goal; a bad one just makes you feel good (vanity metric).',
        example: 'Vanity Metric: "Total Registered Users" (always goes up). Actionable KPI: "Daily Active Users" (tells you if people actually value the product today).',
        story: 'Facebook in its early days didn\'t focus on total users. Their "Aha!" metric was "7 friends in 10 days." They optimized the entire onboarding flow to ensure new users reached that specific milestone, driving their massive retention.'
      },
      {
        title: 'Leading vs Lagging Indicators',
        description: 'Leading indicators predict future success (e.g., user engagement today predicts retention next month). Lagging indicators confirm past success (e.g., revenue last quarter).',
        example: 'For a weight loss app, "Pounds Lost" is a lagging indicator. "Food Logs Logged This Week" is a leading indicator. If users log food, they will likely lose weight.'
      },
      {
        title: 'A/B Testing Strategy',
        description: 'Design experiments to validate hypotheses, not just to tweak colors. Understand statistical significance to avoid false positives.',
        example: 'Google famously tested 41 shades of blue for their links. While ridiculed, it resulted in $200M+ additional revenue. It wasn\'t about design taste; it was about data-driven optimization.'
      }
    ],
    concepts: [
      {
        title: 'Funnel & Cohort Analysis',
        description: 'Funnel analysis shows where users drop off. Cohort analysis shows how user behavior changes over time (e.g., do users who joined in Jan retain better than those in Feb?).',
        example: 'A SaaS company noticed churn was increasing. Aggregate data hid the issue. Cohort analysis revealed that ONLY users from a specific marketing channel were churning—the product was fine, but the marketing was targeting the wrong people.'
      },
      {
        title: 'Data Storytelling',
        description: 'Presenting data without a narrative is noise. Data storytelling combines data, visuals, and narrative to drive action.',
        story: 'Florence Nightingale didn\'t just list death statistics. She created the "Rose Diagram" to visually show that more soldiers died from poor sanitation than battle wounds. This visualization convinced the Queen and government to overhaul hospital sanitation.'
      },
      {
        title: 'Analytics Tools',
        description: 'Understand the stack: Segment (data piping), Amplitude/Mixpanel (product analytics), Snowflake (data warehouse), Tableau/Looker (visualization).',
        example: 'Engineers might use Logs (Splunk), but PMs need Event Analytics (Amplitude). Using the wrong tool leads to asking the wrong questions.'
      }
    ],
    achievements: [
      'Build a comprehensive product health dashboard',
      'Drive decisions using A/B test results',
      'Identify and act on user behavior cohorts',
      'Communicate complex data insights to executives',
      'Establish a data-driven culture in your team'
    ]
  },
  {
    id: 'product-execution-excellence',
    title: 'Product Execution & Delivery',
    description: 'Master the frameworks and processes needed for excellence in product delivery and outcome-based roadmapping.',
    image: 'https://images.unsplash.com/photo-1454165833767-02a6ed8a5874?w=800&h=600&fit=crop',
    color: '#f85032',
    principles: [
      {
        title: 'Outcome-Based Roadmaps',
        description: 'Roadmaps should promise problems to solve, not features to build. This gives teams agency to find the best solution.',
        example: 'Instead of "Build Search Filter feature in Q1," use "Reduce time-to-find-product by 50% in Q1." The team might achieve this by better sorting, not filters.',
        story: 'Wise (formerly TransferWise) teams don\'t have roadmaps handed down. They have KPIs (e.g., "Lower fees"). Teams decide entirely what to build to move that number. This autonomy drives their massive speed.'
      },
      {
        title: 'OKRs for Product Teams',
        description: 'Objectives (Inspirational) & Key Results (Measurable). OKRs align teams on "What" and "Why," leaving the "How" to the team.',
        example: 'Objective: "Delight our customers." KR1: "Increase NPS from 40 to 50." KR2: "Reduce support ticket response time to < 2 hours."',
        story: 'Intel created OKRs, but Google made them famous. Larry Page credited OKRs for helping Google grow 10x repeatedly. "It helped us take our 10x mission and break it down into achievable quarterly milestones."'
      },
      {
        title: 'Agile at Scale',
        description: 'Scrum works for one team. SAFe, LeSS, or "Spotify Model" are needed when 50 teams need to coordinate.',
        example: 'The "Spotify Model" organizes people into Squads (feature teams), Tribes (groups of squads), Chapters (skills like QA/Design), and Guilds (interest groups). It balances autonomy with alignment.'
      }
    ],
    concepts: [
      {
        title: 'Dependency Management',
        description: 'The biggest killer of speed in large orgs. Manage dependencies by decoupling architectures or aligning planning cycles.',
        example: 'If Team A needs an API from Team B to ship their feature, Team A is blocked. Solutions: Team A builds a mock API, or Team B creates a self-service platform so Team A isn\'t dependent.'
      },
      {
        title: 'Release & Risk Strategy',
        description: 'Use Feature Flags, Canary Releases, and Phased Rollouts to minimize the blast radius of bugs.',
        story: 'Facebook moves fast but doesn\'t break things for everyone at once. They use "Gatekeeper" to roll out code to 1% of users, then 5%, then 100%. If metrics tank at 1%, the rollout auto-reverts.'
      },
      {
        title: 'Speed vs Quality vs Tech Debt',
        description: 'The "Iron Triangle." You can\'t have all three. Leaders must consciously choose which to sacrifice at any moment.',
        example: 'Early stage startups sacrifice Quality/Tech Debt for Speed (PMF search). Banks sacrifice Speed for Quality (Compliance/Safety). Knowing which mode you are in is critical.'
      }
    ],
    achievements: [
      'Transition a team to outcome-based roadmapping',
      'Successfully implement OKRs across a product org',
      'Manage complex cross-functional releases',
      'Optimize delivery velocity and quality',
      'Navigate trade-offs between features and tech debt'
    ]
  },
  {
    id: 'technology-fundamentals',
    title: 'Technology Fundamentals',
    description: 'Understand the technical foundations of modern software to lead teams and make informed technical trade-offs.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    color: '#3a7bd5',
    principles: [
      {
        title: 'System Design Basics',
        description: 'Understand key concepts like Scalability (handling growth), Reliability (uptime), and Maintainability (ease of fixes).',
        example: 'Think of a system like a restaurant kitchen. "Scalability" is adding more chefs. "Load Balancing" is the expeditor assigning orders. "Caching" is prepping ingredients in advance.'
      },
      {
        title: 'APIs & Microservices',
        description: 'APIs are the contracts between software. Microservices break huge apps into small, independent pieces.',
        story: 'Uber moved from a monolithic architecture (one giant codebase) to microservices (thousands of small services) to allow hundreds of developer teams to work simultaneously without breaking each other\'s code.'
      },
      {
        title: 'Cloud Infrastructure',
        description: 'AWS/GCP/Azure. Understand concepts like Serverless (pay per execution) vs Containers (Docker/K8s).',
        example: 'Before Cloud, companies bought physical servers (CapEx) for peak traffic (Black Friday), which sat idle mostly. Now, they use Auto-Scaling in the cloud to spin up servers only when needed (OpEx).'
      }
    ],
    concepts: [
      {
        title: 'Technical Trade-offs',
        description: 'There is no "perfect" solution. CAP Theorem: Consistency, Availability, Partition Tolerance (pick 2).',
        example: 'A banking app needs Consistency (balances must be correct) over Availability (it\'s okay if it\'s slow). A social media feed needs Availability (always show something) over Consistency (it\'s okay if a like count is off by 1).'
      },
      {
        title: 'Security & Privacy',
        description: 'Encryption at rest/transit, OAuth (Login with Google), GDPR/CCPA compliance.',
        story: 'Zoom faced a massive backlash for "Zoom-bombing" because they prioritized ease of use (no passwords needed) over security. They had to freeze all feature work for 90 days to fix security trust issues.'
      },
      {
        title: 'AI/ML Basics',
        description: 'Supervised Learning (training on labeled data) vs Unsupervised Learning (finding patterns). LLMs (predicting next token).',
        example: 'Netflix recommendation engine is ML. It doesn\'t "know" you like sci-fi; it knows "Users who watched Matrix also watched Inception" and finds the pattern.'
      }
    ],
    achievements: [
      'Participate effectively in technical design reviews',
      'Evaluate technical feasibility of product ideas',
      'Make informed trade-offs with engineering leads',
      'Identify opportunities for AI/ML integration',
      'Understand and manage technical constraints'
    ]
  },
  {
    id: 'ai-future-thinking',
    title: 'AI & Future-Ready Thinking',
    description: 'Prepare for the future of product management by mastering AI-first design and future-ready strategies.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    color: '#6a11cb',
    principles: [
      {
        title: 'AI-First Product Design',
        description: 'Don\'t just sprinkle AI on top. Design products where AI is the core value driver.',
        example: 'Google Photos isn\'t just a gallery; its core value is "Search by dog" or "Create highlight video," which is only possible via AI.',
        story: 'Descript (audio editor) reimagined editing. Instead of editing waveforms (traditional), they used AI to transcribe audio to text. You edit the text, and AI edits the audio. This was a paradigm shift only possible with AI.'
      },
      {
        title: 'LLM Capabilities & Ethics',
        description: 'Understand Hallucinations, Context Windows, and Bias. AI is a probabilistic tool, not a deterministic calculator.',
        example: 'Using an LLM for "Customer Support Chat" is great (empathy, language). Using it for "Calculating Tax Returns" is dangerous (math errors, hallucinations).'
      },
      {
        title: 'Human-in-the-loop',
        description: 'AI makes suggestions; humans make decisions. This builds trust and handles edge cases.',
        example: 'GitHub Copilot doesn\'t write code for you; it suggests code. You (the human) review and accept. This "Copilot" model is safer and more trusted than an "Autopilot" model.'
      }
    ],
    concepts: [
      {
        title: 'Personalization at Scale',
        description: 'Hyper-personalization: every user sees a different product interface/content based on their behavior.',
        example: 'TikTok\'s "For You" page is the ultimate AI product. The UI is simple; the value is entirely the AI algorithm selecting the next video.'
      },
      {
        title: 'AI Governance & Bias',
        description: 'Ensuring AI doesn\'t discriminate or leak data. "Red Teaming" (attacking your own AI) to find flaws.',
        story: 'Amazon scrapped an AI recruiting tool because it learned to penalize resumes containing the word "women\'s" (e.g., "women\'s chess club") because it was trained on historical resumes which were mostly men.'
      },
      {
        title: 'Automation vs Augmentation',
        description: 'Automation replaces humans (Customer support bot). Augmentation gives humans superpowers (AI writing assistant).',
        example: 'Radiologists using AI aren\'t replaced; they are augmented. AI highlights potential tumors, the doctor confirms. This combination is more accurate than either alone.'
      }
    ],
    achievements: [
      'Develop an AI-first product strategy',
      'Implement ethical AI guardrails',
      'Design high-scale personalized experiences',
      'Manage AI-driven product transformations',
      'Evaluate and integrate LLM capabilities'
    ]
  },
  {
    id: 'ux-design-strategy',
    title: 'UX, Design & Experience',
    description: 'Lead design-driven product organizations by mastering experience strategy and design thinking at scale.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&h=600&fit=crop',
    color: '#f093fb',
    principles: [
      {
        title: 'Design Thinking at Scale',
        description: 'Empathize -> Define -> Ideate -> Prototype -> Test. It\'s not a linear process; it\'s a loop.',
        example: 'IBM trained 100,000 employees in Design Thinking. They realized enterprise software didn\'t have to be ugly and hard to use. This cultural shift revitalized their portfolio.',
        story: 'IDEO designed the first Apple Mouse. They didn\'t just engineer it; they tested prototypes made of butter dishes and deodorant roll-on balls to get the feel right.'
      },
      {
        title: 'Accessibility & Inclusion',
        description: 'Designing for the margins improves the experience for everyone. "The Curb Cut Effect."',
        example: 'Curb cuts (ramps on sidewalks) were designed for wheelchairs. But they help parents with strollers, travelers with suitcases, and cyclists. Closed Captions were for the deaf; now everyone uses them in noisy bars.'
      },
      {
        title: 'Design Systems',
        description: 'A library of reusable UI components (Buttons, Fonts, Colors) and the rules for using them. Ensures consistency and speed.',
        story: 'Airbnb built "DLS" (Design Language System). Before it, designers and engineers debated pixel placement daily. After DLS, they could assemble new screens in minutes like Lego blocks, focusing on flows rather than pixels.'
      }
    ],
    concepts: [
      {
        title: 'UX Research Methods',
        description: 'Generative Research (What should we build?) vs Evaluative Research (Did we build it right?). Usability Testing, Diary Studies.',
        example: 'Don\'t ask "Do you like this?" (Bias). Ask "Show me how you would do X using this." Watch them struggle. That is the truth.'
      },
      {
        title: 'Emotional Design',
        description: 'Visceral (Looks), Behavioral (Works), Reflective (Meaning). Great products hit all three.',
        story: 'Mailchimp uses "Freddie" the chimp logo to high-five you when you send a campaign. This small moment of delight relieves the stress of sending an email to thousands of people.'
      },
      {
        title: 'Experience Consistency',
        description: 'Omnichannel experience. The app, website, and physical store should feel like one conversation.',
        example: 'Starbucks app lets you order ahead. When you walk in, your coffee is ready. The digital and physical merge seamlessly. If the app said "Ready" but the barista didn\'t have it, the trust breaks.'
      }
    ],
    achievements: [
      'Establish a design-led product culture',
      'Launch an enterprise-grade design system',
      'Implement inclusive design standards',
      'Drive product improvements through UX research',
      'Measure and improve experience consistency'
    ]
  },
  {
    id: 'leadership-people-management',
    title: 'Leadership & People Management',
    description: 'Grow from a product manager to a leader of product managers by mastering coaching and team building.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop',
    color: '#38ef7d',
    principles: [
      {
        title: 'Leading PMs & Group PMs',
        description: 'Your product is now the team. You build the machine that builds the product.',
        story: 'Marty Cagan (Silicon Valley Product Group) says: "The job of a product leader is not to make decisions; it is to ensure good decisions are made." You move from being the QB to being the Coach.'
      },
      {
        title: 'Coaching vs Managing',
        description: 'Managing is tracking tasks. Coaching is unlocking potential. Ask questions; don\'t give answers.',
        example: 'Instead of saying "Change the roadmap," ask "How does this roadmap help us achieve our Q3 OKR?" Let them find the gap.'
      },
      {
        title: 'Hiring Senior Talent',
        description: 'Hire for "slope" (trajectory), not just "intercept" (current skills). Look for curiosity and grit.',
        story: 'Stripe is famous for its "Sunday Test": If this person was working alone in the office on a Sunday, would you be excited to come in and join them? It tests for cultural fit and excellence.'
      }
    ],
    concepts: [
      {
        title: 'Performance Frameworks',
        description: 'Career Ladders (Junior -> Senior -> Principal). Competency Matrices (Strategy, Execution, Leadership).',
        example: 'Clear frameworks prevent "Title Inflation." A Senior PM at Google might be a VP at a startup. Defining what "Senior" means at YOUR company is key.'
      },
      {
        title: 'Managing Conflict',
        description: 'Healthy conflict is good. "Disagree and Commit." Avoid "Design by Committee."',
        story: 'Amazon leaders are obligated to "Have Backbone; Disagree and Commit." It means you must fight for your view, but once a decision is made, you support it 100%.'
      },
      {
        title: 'High-Trust Teams',
        description: 'Psychological Safety (Amy Edmondson). Teams must feel safe to admit mistakes to innovate.',
        example: 'Google\'s Project Aristotle found that psychological safety was the #1 predictor of high-performing teams, far above individual intelligence.'
      }
    ],
    achievements: [
      'Build and scale a high-performing PM team',
      'Coach a PM into a leadership role',
      'Design a PM career ladder and matrix',
      'Resolve high-stakes cross-functional conflicts',
      'Establish a culture of ownership and excellence'
    ]
  },
  {
    id: 'stakeholder-executive-management',
    title: 'Stakeholder & Executive Management',
    description: 'Master the art of influencing without authority and communicating effectively with executive leadership.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    color: '#8e44ad',
    principles: [
      {
        title: 'Influencing Without Authority',
        description: 'You can\'t order people to do things. You must inspire them with data, vision, and empathy.',
        example: 'Build "Social Capital." Help Sales close a deal. Help Engineering fix a nagging bug. When you later ask for a favor (a roadmap change), you have credit in the bank.'
      },
      {
        title: 'Executive Storytelling',
        description: 'Executives have short attention spans. Start with the "BLUF" (Bottom Line Up Front).',
        story: 'Jeff Bezos banned PowerPoint at Amazon. He required "6-page memos." Why? Narrative documents force deeper thinking and clarity than bullet points. Executives read for 15 mins in silence, then discuss.'
      },
      {
        title: 'Managing Expectations',
        description: 'Under-promise and over-deliver. Be transparent about risks early.',
        example: 'Don\'t say "It will be done in May." Say "We have 80% confidence for May, but risk X could push it to June." You treat them as partners in risk, not customers of dates.'
      }
    ],
    concepts: [
      {
        title: 'Cross-Functional Alignment',
        description: 'Alignment doesn\'t mean agreement. It means everyone understands the goal and their role.',
        example: 'Use "Town Halls" for broad alignment and "Steering Committees" for deep alignment with key leaders.'
      },
      {
        title: 'Decision Frameworks',
        description: 'DACI (Driver, Approver, Contributor, Informed) or RAPID. Clarify WHO makes the decision.',
        story: 'At a startup, everyone thought they had a veto. Nothing shipped. Implementing DACI clarified that the PM was the Driver, but the CEO was the only Approver. Velocity doubled.'
      },
      {
        title: 'Escalation Management',
        description: 'Escalation is not failure; it\'s a tool to resolve blockages. Do it transparently.',
        example: 'Don\'t go behind someone\'s back. Say "We seem stuck. Let\'s escalate this to [Leader] together to get a decision so we can move forward."'
      }
    ],
    achievements: [
      'Secure executive buy-in for a major initiative',
      'Align a large cross-functional organization',
      'Present successfully to the C-suite or Board',
      'Resolve deep-seated stakeholder disagreements',
      'Manage complex founder/CEO relationships'
    ]
  },
  {
    id: 'gtm-growth',
    title: 'Go-To-Market & Growth',
    description: 'Drive product adoption and revenue through expert go-to-market strategies and growth experimentation.',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fce?w=800&h=600&fit=crop',
    color: '#ff0844',
    principles: [
      {
        title: 'Product-Led Growth (PLG)',
        description: 'The product is the primary driver of acquisition, conversion, and retention. "Try before you buy."',
        example: 'Zoom, Slack, Dropbox. You didn\'t talk to a salesperson. You just used it, got value, and then paid (or your boss paid).',
        story: 'Calendly grew virally. Every time a user sent a link to schedule a meeting, the recipient saw "Powered by Calendly." The product was its own marketing channel.'
      },
      {
        title: 'GTM Strategy',
        description: 'Product + Marketing + Sales + Support. It\'s not just a launch email.',
        example: 'Apple launches are a masterclass. The Keynote (Product), the TV Ads (Marketing), the Retail Stores (Sales), and AppleCare (Support) are perfectly synchronized.'
      },
      {
        title: 'Experiment-Driven Growth',
        description: 'Growth Hacking. High-tempo testing of marketing channels and product flows.',
        story: 'Dropbox spent money on ads ($300 CAC for a $99 product). Failed. They switched to a referral program: "Give 500MB, Get 500MB." Growth exploded permanently. It was a product feature, not an ad.'
      }
    ],
    concepts: [
      {
        title: 'Retention & Engagement',
        description: 'Acquisition is vanity; retention is sanity. Fix the leaky bucket before pouring more water in.',
        example: 'The "Hook Model" (Trigger -> Action -> Reward -> Investment). Instagram: Notification (Trigger) -> Scroll (Action) -> Dopamine/Likes (Reward) -> Post photo (Investment).'
      },
      {
        title: 'Churn Analysis',
        description: 'Voluntary Churn (unhappy) vs Involuntary Churn (credit card failed). Address them differently.',
        example: 'Reducing involuntary churn is often the easiest revenue win. Implementing "Dunning" (smart retrying of failed cards) can recover 20% of lost revenue.'
      },
      {
        title: 'Launch Planning',
        description: 'Tiered launches: Alpha (Internal), Beta (Trusted users), GA (General Availability).',
        story: 'Gmail remained in "Beta" for 5 years. This set expectations ("it might break") and created exclusivity (invitation only), driving massive hype.'
      }
    ],
    achievements: [
      'Launch a successful PLG motion',
      'Execute a high-impact multi-channel product launch',
      'Significantly improve user retention rates',
      'Build a growth experimentation engine',
      'Drive measurable revenue growth via product'
    ]
  },
  {
    id: 'risk-compliance-scale',
    title: 'Risk, Compliance & Scale',
    description: 'Navigate the challenges of scaling products globally while managing risk and regulatory requirements.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    color: '#2c3e50',
    principles: [
      {
        title: 'Regulatory Awareness',
        description: 'GDPR (Europe), HIPAA (Health), Fintech regulations. Ignorance is not a defense.',
        story: 'Uber ignored regulations ("Ask forgiveness, not permission"). It helped them grow fast but eventually cost them billions in lawsuits and got them banned from cities like London temporarily.'
      },
      {
        title: 'Security & Compliance',
        description: 'SOC2, ISO 27001. These aren\'t just badges; they are requirements to sell to Enterprise customers.',
        example: 'You cannot sell software to a bank without SOC2 Type II compliance. It\'s a "License to Hunt" in the enterprise space.'
      },
      {
        title: 'Scaling Systems & Teams',
        description: 'What works at 10 users fails at 10 million. Technical and Organizational refactoring.',
        story: 'Twitter\'s "Fail Whale" era. Their Ruby on Rails monolith couldn\'t handle the traffic. They had to rewrite the core in Scala (JVM). Scaling is often about rewriting.'
      }
    ],
    concepts: [
      {
        title: 'Risk Management',
        description: 'Risk Matrix: Probability vs Impact. Focus on High Probability / High Impact risks.',
        example: 'A "Pre-Mortem": Before a project starts, ask "Assume it\'s 6 months later and the project failed disastrously. What happened?" This uncovers hidden risks early.'
      },
      {
        title: 'Incident Response',
        description: 'SEV1 / SEV2 levels. War Rooms. Post-Mortems (Root Cause Analysis).',
        story: 'GitLab famously deleted their production database by mistake. They livestreamed their recovery process on YouTube. The transparency turned a disaster into a PR win for trust.'
      },
      {
        title: 'Crisis Leadership',
        description: 'Calm is contagious. In a crisis, the team looks to the leader for emotional cues.',
        example: 'During 9/11, the CEO of Cantor Fitzgerald (who lost 600 employees) focused entirely on taking care of the families. His leadership saved the firm\'s soul and future.'
      }
    ],
    achievements: [
      'Navigate a complex regulatory audit successfully',
      'Scale a product to its next order of magnitude',
      'Implement a company-wide security standard',
      'Lead a team through a major product crisis',
      'Establish a robust risk management framework'
    ]
  },
  {
    id: 'personal-effectiveness',
    title: 'Personal Effectiveness',
    description: 'Enhance your impact as a leader by mastering strategic thinking, communication, and self-management.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    color: '#ffc3a0',
    principles: [
      {
        title: 'Strategic Thinking',
        description: 'First Principles Thinking. Break problems down to basic truths, then reason up. Don\'t just reason by analogy ("X did it, so we should").',
        example: 'Elon Musk didn\'t look at rocket prices. He looked at the cost of raw materials (aluminum, fuel) and realized rockets could be 10x cheaper if he built them himself. That\'s First Principles.'
      },
      {
        title: 'Decision-Making',
        description: 'Type 1 (Irreversible) vs Type 2 (Reversible) decisions. Move fast on Type 2. Deliberate on Type 1.',
        story: 'Jeff Bezos letter to shareholders: "Most decisions should probably be made with somewhere around 70% of the information you wish you had. If you wait for 90%, in most cases, you\'re probably being slow."'
      },
      {
        title: 'Executive Presence',
        description: 'Gravitas, Communication, Appearance. It\'s about signaling confidence and competence.',
        example: 'Silence is power. Weak speakers fill gaps with "um" and "uh." Strong leaders pause. The pause signals thought and control.'
      }
    ],
    concepts: [
      {
        title: 'Communication Mastery',
        description: 'Active Listening. Repeating back what you heard. Adjusting your altitude (High level for CEO, Detail for Devs).',
        example: 'The "Pyramid Principle" (Minto): Start with the Answer, then Grouping Arguments, then Supporting Data. Don\'t bury the lead.'
      },
      {
        title: 'Time & Energy Management',
        description: 'Maker Schedule vs Manager Schedule. Calendar blocking. Managing energy, not just time.',
        story: 'Bill Gates took "Think Weeks"—going into a cabin alone for a week just to read and think. Strategic clarity requires deep work, unconnected from the daily grind.'
      },
      {
        title: 'Learning Systems',
        description: 'Farnam Street / Mental Models. Building a "Second Brain" (Notes). Continuous improvement.',
        example: 'Warren Buffett reads 500 pages a day. "That\'s how knowledge works. It builds up, like compound interest."'
      }
    ],
    achievements: [
      'Master high-stakes executive communication',
      'Develop a personal system for strategic learning',
      'Optimize your time for maximum leadership impact',
      'Build a strong and authentic executive brand',
      'Make high-impact decisions under pressure'
    ]
  }
];
