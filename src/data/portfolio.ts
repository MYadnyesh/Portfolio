export const projects = [
  {
    id: "outskill-hackathon",
    name: "Prism",
    tagline: "One URL. Three ways to understand it.",
    description: "Paste a website. Pick a mode. Get a fast TL;DR, a full song written from the page, or a kid-friendly explanation with a story and a quiz, one mode at a time, real AI under the hood. Built for the Outskill Hackathon.",
    longDescription: `Prism transforms any webpage into three distinct formats: a concise TL;DR summary, an AI-generated song with lyrics (and optional audio via ElevenLabs), or an ELI5 explanation complete with a story, fun facts, and an interactive quiz. The project demonstrates end-to-end AI integration: server-side content extraction, multi-modal LLM prompting (Gemini), and graceful fallback handling for paid API features.

The architecture uses a custom "Clay" design system built with CSS custom properties and CSS Modules, no utility framework, implementing a warm, light interface with a six-color feature card palette. The frontend is a Vite + React SPA with a sophisticated state machine managing the analysis pipeline. Backend runs on Vercel/Netlify serverless functions with a 60-second timeout ceiling that comfortably handles the 12-17s song generation pipeline.`,
    problem: "Web content is often too long, too dense, or too technical. People need different entry points: a quick summary, an engaging format, or a simplified explanation.",
    solution: "A single URL input that routes to three distinct AI transformations, each with its own prompt engineering, output formatting, and UX considerations.",
    stack: ["React", "Vite", "TypeScript", "Google Gemini API", "ElevenLabs Music API", "Cheerio", "Vercel/Netlify Functions", "Custom CSS Design System"],
    aiInvolvement: "Core product, multi-modal LLM pipeline with three distinct prompt strategies (summarization, creative lyrics generation, pedagogical explanation + quiz generation). Real AI, not a wrapper.",
    category: "AI-Native Product",
    status: "Live",
    links: {
      github: "https://github.com/MYadnyesh/Outskill-Hackathon",
      live: "https://prism-outskill.vercel.app", // placeholder - will update
      docs: "https://github.com/MYadnyesh/Outskill-Hackathon/blob/main/docs/FEATURES.md"
    },
    screenshots: [
      "/images/prism-landing.png",
      "/images/prism-tldr.png",
      "/images/prism-song.png",
      "/images/prism-eli5.png"
    ],
    featured: true,
    proficiency: "Core",
    year: 2026,
    metrics: {
      commits: 48,
      modes: 3,
      apis: 2
    }
  },
  {
    id: "sentiment-analyzer",
    name: "Gmail & Google Chat Sentiment Analyzer",
    tagline: "Phrase-based sentiment analysis across Google Workspace communications.",
    description: "A comprehensive sentiment analysis tool that searches Gmail and Google Chat messages for specific phrases, analyzes sentiment polarity and subjectivity using TextBlob, and generates detailed 6-panel visualization dashboards with CSV export.",
    longDescription: `This Python application connects to Gmail and Google Chat APIs via OAuth 2.0, searches for user-specified phrases, extracts 10-word context windows around each match, and runs sentiment analysis using TextBlob's lexicon-based NLP. Results are filtered through 8 constraint types (sentiment labels, source platform, score ranges, subjectivity thresholds, date ranges) and visualized in a 6-panel matplotlib/seaborn dashboard: sentiment distribution pie, source comparison stacked bar, timeline line chart, score histogram, top senders horizontal bar, and subjectivity vs sentiment scatter plot with quadrant analysis.

The architecture follows a hybrid functional-OOP pattern: OOP for API fetchers and visualizers, functional pipeline for text cleaning, context extraction, sentiment calculation, and constraint filtering. Data classes define Message, SentimentResult, AnalysisConstraints, and AnalysisSummary types.`,
    problem: "Teams and individuals need to understand emotional tone in written communication but existing tools only do keyword search or full-message analysis without phrase-level context.",
    solution: "Phrase-specific context extraction (10 words before/after) combined with dual-metric sentiment (polarity + subjectivity) and rich constraint-based filtering.",
    stack: ["Python", "TextBlob", "Google APIs (Gmail, Chat)", "OAuth 2.0", "Pandas", "Matplotlib", "Seaborn", "NLTK"],
    aiInvolvement: "Lexicon-based NLP sentiment analysis (TextBlob), rule-based, not LLM. Foundation for understanding how ML-based sentiment differs from lexicon approaches.",
    category: "Data & NLP",
    status: "Complete",
    links: {
      github: "https://github.com/MYadnyesh/sentiment-analyzer",
      live: null,
      docs: "https://github.com/MYadnyesh/sentiment-analyzer/blob/master/README.md"
    },
    screenshots: [
      "/images/sentiment-dashboard.png",
      "/images/sentiment-scatter.png"
    ],
    featured: true,
    proficiency: "Core",
    year: 2026,
    metrics: {
      commits: 6,
      panels: 6,
      constraints: 8
    }
  },
  {
    id: "ms365-sentiment-analyzer",
    name: "Microsoft 365 Sentiment Analyzer",
    tagline: "Full-stack sentiment analysis across the Microsoft 365 ecosystem.",
    description: "A modern full-stack web application (FastAPI + Next.js + TypeScript) that analyzes sentiment in communications across Teams, Outlook, OneDrive, SharePoint, and OneNote using a hybrid NLP engine (70% VADER + 30% TextBlob) with interactive Recharts visualizations and glass-morphism UI.",
    longDescription: `This project demonstrates full-stack engineering with a clean separation: FastAPI backend providing REST endpoints for authentication, search, analysis, and filtering; Next.js 14 frontend with App Router, TypeScript, Tailwind CSS, Framer Motion animations, and Recharts for interactive data visualization. The hybrid sentiment engine combines VADER (social media optimized) and TextBlob (general purpose) with weighted scoring.

The UI features a glass-morphism design system with smooth animations, responsive layouts, and accessibility compliance. Currently runs on dummy data generators simulating MS Graph API responses, real Microsoft Graph integration is spec'd for v1.1. Background task processing with live status polling provides real-time UX for long-running analyses.`,
    problem: "Organizations using Microsoft 365 lack accessible tools to analyze communication sentiment across Teams, Outlook, and other services without custom engineering.",
    solution: "Unified search interface across 6+ MS365 sources with hybrid NLP, interactive filtering, and executive-ready visualizations, deployable as a self-contained Docker stack.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "VADER", "TextBlob", "Recharts", "Framer Motion", "Docker"],
    aiInvolvement: "Hybrid NLP ensemble (VADER + TextBlob), classical ML approach. Architecture designed for future LLM-based sentiment upgrade (BERT/GPT) per roadmap.",
    category: "Full-Stack Application",
    status: "Demo (Dummy Data)",
    links: {
      github: "https://github.com/MYadnyesh/ms365-sentiment-analyzer",
      live: null,
      docs: "https://github.com/MYadnyesh/ms365-sentiment-analyzer/blob/main/README.md"
    },
    screenshots: [
      "/images/ms365-search.png",
      "/images/ms365-dashboard.png",
      "/images/ms365-timeline.png"
    ],
    featured: true,
    proficiency: "Core",
    year: 2026,
    metrics: {
      commits: 1,
      sources: 6,
      chartTypes: 4
    }
  },
  {
    id: "aatmanirbhar-sentiment",
    name: "Twitter Sentiment Detector (Capstone)",
    tagline: "End-to-end ML pipeline for social media sentiment classification.",
    description: "Capstone project from the Skillship Foundation Aatmanirbhar Python Program. Complete ML pipeline: data collection via Twitter API, preprocessing, feature engineering (TF-IDF, n-grams), model training (Logistic Regression, Naive Bayes, SVM), evaluation, and deployment-ready serialization.",
    longDescription: `This capstone project demonstrates the full ML lifecycle: raw tweet collection → cleaning (URL removal, mention handling, emoji processing) → feature extraction with TF-IDF vectorization including bi-grams and tri-grams → training multiple classifiers with cross-validation → hyperparameter tuning via GridSearchCV → model comparison with ROC curves and confusion matrices → joblib serialization for production deployment. Includes Jupyter notebooks documenting each phase with visualizations.`,
    problem: "Social media sentiment analysis requires domain-specific preprocessing and model selection, generic models fail on tweet-specific noise (hashtags, mentions, abbreviations, emojis).",
    solution: "Tweet-optimized preprocessing pipeline + ensemble of classical ML models with rigorous evaluation methodology.",
    stack: ["Python", "scikit-learn", "pandas", "NLTK", "Tweepy", "Matplotlib", "Seaborn", "Jupyter"],
    aiInvolvement: "Classical ML (Logistic Regression, Naive Bayes, SVM) with TF-IDF features, pre-LLM era approach. Valuable for understanding feature engineering fundamentals that transfer to modern embedding-based approaches.",
    category: "Machine Learning",
    status: "Complete (Educational)",
    links: {
      github: "https://github.com/MYadnyesh/Aatmanirbhar_program/tree/master/Capstone%20Project/Twitter-Sentiment%20Detector",
      live: null,
      docs: null
    },
    screenshots: [],
    featured: false,
    proficiency: "Used",
    year: 2023,
    metrics: {}
  },
  {
    id: "newsapp",
    name: "NewsApp",
    tagline: "Lightweight news aggregation interface.",
    description: "Vanilla HTML/CSS/JavaScript news reader consuming a public news API. Clean responsive layout, category filtering, article preview cards, and direct link-out to sources. Early project demonstrating API integration and frontend fundamentals.",
    longDescription: `Simple single-page application fetching from NewsAPI.org. Features: category tabs (Technology, Business, Sports, etc.), responsive card grid, loading states, error handling, and external link navigation. Built before React adoption, shows progression from vanilla JS to modern frameworks.`,
    problem: "Need a distraction-free way to scan headlines across categories without algorithmic feed manipulation.",
    solution: "Direct API consumption with manual category control and chronological sorting.",
    stack: ["HTML", "CSS", "JavaScript", "NewsAPI.org"],
    aiInvolvement: "None, pre-AI integration project. Included for timeline context.",
    category: "Frontend",
    status: "Archived",
    links: {
      github: "https://github.com/MYadnyesh/NewsApp",
      live: null,
      docs: null
    },
    screenshots: [],
    featured: false,
    proficiency: "Familiar",
    year: 2021,
    metrics: {}
  }
];

export const capabilities = {
  fullStack: [
    { name: "React", proficiency: "Core", years: 3 },
    { name: "Next.js", proficiency: "Core", years: 2 },
    { name: "TypeScript", proficiency: "Core", years: 3 },
    { name: "JavaScript", proficiency: "Core", years: 4 },
    { name: "Node.js", proficiency: "Core", years: 3 },
    { name: "Express", proficiency: "Used", years: 2 },
    { name: "Redux", proficiency: "Used", years: 1 },
    { name: "HTML/CSS", proficiency: "Core", years: 4 },
    { name: "Tailwind CSS", proficiency: "Core", years: 2 },
    { name: "REST APIs", proficiency: "Core", years: 3 },
  ],
  backendData: [
    { name: "SQL", proficiency: "Used", years: 2 },
    { name: "PostgreSQL", proficiency: "Used", years: 1 },
    { name: "MongoDB", proficiency: "Used", years: 1 },
    { name: "Firebase", proficiency: "Familiar", years: 1 },
    { name: "Authentication", proficiency: "Used", years: 2 },
    { name: "OAuth/JWT", proficiency: "Used", years: 2 },
    { name: "Socket.io", proficiency: "Familiar", years: 1 },
    { name: "Microservices", proficiency: "Familiar", years: 1 },
  ],
  cloudEngineering: [
    { name: "Git", proficiency: "Core", years: 4 },
    { name: "Agile/Scrum", proficiency: "Used", years: 2 },
    { name: "AWS", proficiency: "Familiar", years: 1 },
    { name: "Azure", proficiency: "Familiar", years: 1 },
    { name: "Vercel/Netlify", proficiency: "Core", years: 2 },
    { name: "Docker", proficiency: "Used", years: 1 },
    { name: "CI/CD", proficiency: "Used", years: 2 },
    { name: "Testing", proficiency: "Familiar", years: 1 },
    { name: "Architecture", proficiency: "Used", years: 2 },
  ],
  aiLlm: [
    { name: "LLM APIs (OpenAI, Gemini, Claude)", proficiency: "Core", years: 1 },
    { name: "Prompt Engineering", proficiency: "Core", years: 1 },
    { name: "RAG & Embeddings", proficiency: "Used", years: 1 },
    { name: "Vector Databases", proficiency: "Familiar", years: 1 },
    { name: "AI Automation", proficiency: "Used", years: 1 },
    { name: "AI Agents", proficiency: "Exploring", years: 0.5 },
    { name: "Multimodal AI", proficiency: "Exploring", years: 0.5 },
    { name: "Voice AI", proficiency: "Exploring", years: 0.5 },
    { name: "Agentic Workflows", proficiency: "Exploring", years: 0.5 },
  ],
  aiEngineering: [
    { name: "Ollama / Local LLMs", proficiency: "Exploring", years: 0.5 },
    { name: "MCP (Model Context Protocol)", proficiency: "Exploring", years: 0.5 },
    { name: "OpenCode / Codex / OpenClaw", proficiency: "Exploring", years: 0.5 },
    { name: "LangGraph / LangChain", proficiency: "Exploring", years: 0.5 },
    { name: "CrewAI / Multi-Agent", proficiency: "Exploring", years: 0.5 },
    { name: "Coding Agents", proficiency: "Exploring", years: 0.5 },
    { name: "Model Routing", proficiency: "Exploring", years: 0.5 },
    { name: "Inference / Quantization", proficiency: "Exploring", years: 0.5 },
    { name: "Fine-tuning / LoRA", proficiency: "Exploring", years: 0.5 },
    { name: "AI Infrastructure", proficiency: "Exploring", years: 0.5 },
    { name: "Voice Agents", proficiency: "Exploring", years: 0.5 },
    { name: "n8n / Workflow Automation", proficiency: "Exploring", years: 0.5 },
  ]
};

export const tShapedData = {
  vertical: {
    title: "AI / LLMs",
    description: "Deep specialization in LLM application development: prompt engineering, RAG systems, agentic workflows, multi-modal AI, and AI-native product architecture.",
    items: [
      "LLM APIs (OpenAI, Gemini, Claude)",
      "Prompt Engineering & Evaluation",
      "RAG / Embeddings / Vector DBs",
      "Agentic Workflows (LangGraph, CrewAI)",
      "Multi-Modal AI (Vision, Audio)",
      "AI-Native Product Architecture",
      "Local LLMs (Ollama, Quantization)",
      "MCP & Tool Calling Standards",
    ]
  },
  horizontal: [
    {
      title: "Cloud",
      description: "Infrastructure, deployment, and cloud-native patterns",
      items: ["AWS / Azure Fundamentals", "Vercel / Netlify / Serverless", "Docker & Containerization", "CI/CD Pipelines", "Observability Basics"]
    },
    {
      title: "Full Stack",
      description: "End-to-end web application development",
      items: ["React / Next.js / TypeScript", "Node.js / Express / FastAPI", "Database Design (SQL/NoSQL)", "Authentication & Authorization", "Real-time Systems (WebSockets)", "API Design (REST, GraphQL)"]
    },
    {
      title: "Product / UX",
      description: "Product thinking, design systems, and user experience",
      items: ["Design Systems (Tokens, Components)", "Accessibility (WCAG AA)", "User Research & Prototyping", "Data Visualization", "Animation & Interaction Design", "Technical Writing & Documentation"]
    },
    {
      title: "Business Consulting",
      description: "Advising organizations on AI adoption and process transformation",
      items: ["AI & Agentic AI Transformation Roadmaps", "Technical Product & Program Delivery", "Business Process Optimization", "No-Code / Low-Code Automation (Vibe Coding)"]
    }
  ],
  foundation: {
    title: "Software Engineering",
    description: "Core fundamentals that underpin all technical work",
    items: ["Data Structures & Algorithms", "Design Patterns & Architecture", "Clean Code & Refactoring", "Testing Strategies", "Version Control (Git)", "Performance Optimization", "Security Fundamentals", "Technical Communication"]
  }
};

export const explorations = [
  {
    title: "Local LLMs & Inference",
    description: "Running models locally with Ollama, experimenting with quantization (GGUF), model routing, and offline-first AI architectures.",
    status: "Exploring",
    stack: ["Ollama", "llama.cpp", "GGUF", "Model Router"],
    link: null
  },
  {
    title: "Agentic Coding Workflows",
    description: "Evaluating OpenCode, Codex, OpenClaw, and MCP for autonomous code generation, refactoring, and multi-file edits.",
    status: "Exploring",
    stack: ["OpenCode", "Codex", "MCP", "OpenClaw"],
    link: null
  },
  {
    title: "Multi-Agent Systems",
    description: "Building collaborative agent networks with LangGraph and CrewAI, planning, delegation, and verification loops.",
    status: "Exploring",
    stack: ["LangGraph", "CrewAI", "AutoGen"],
    link: null
  },
  {
    title: "AI Infrastructure & Serving",
    description: "Model serving (vLLM, TGI), batch inference optimization, KV caching, and cost-effective deployment patterns.",
    status: "Exploring",
    stack: ["vLLM", "TGI", "KV Cache", "Batch Inference"],
    link: null
  },
  {
    title: "Voice AI & Real-time Agents",
    description: "Speech-to-text, LLM reasoning, text-to-speech pipelines with latency optimization for conversational agents.",
    status: "Exploring",
    stack: ["Whisper", "LLM", "TTS (ElevenLabs, MeloTTS)", "WebRTC"],
    link: null
  },
  {
    title: "Workflow Automation (n8n)",
    description: "Visual workflow builder for AI-augmented business processes, connecting APIs, databases, and LLMs without code.",
    status: "Exploring",
    stack: ["n8n", "Webhooks", "Custom Nodes"],
    link: null
  }
];

export const work = [
  {
    company: "Creonextech",
    role: "Software Developer",
    type: "Freelance",
    period: "Oct 2024 – Present",
    location: "London, UK · Remote",
    summary: "Full-stack delivery and software infrastructure work, including Azure DevOps.",
    link: "https://www.creonextech.com",
    current: true,
  },
  {
    company: "TechnoCave",
    role: "Software Developer",
    type: "Freelance",
    period: "Jul 2024 – Present",
    location: "Remote",
    summary: "End-to-end MERN web apps: React frontends, secure REST APIs, cloud deployment, and Agile client delivery.",
    link: "https://www.technocave.in",
    current: true,
  },
  {
    company: "MahaWiki: Tech Community",
    role: "Community Manager",
    type: "Freelance",
    period: "Aug 2020 – Present",
    location: "Nashik, India · Remote",
    summary: "Running free, industry-oriented training, webinars, and workshops to make technical education accessible.",
    link: null,
    current: true,
  },
  {
    company: "Cloud Community Group",
    role: "Community Manager",
    type: "Freelance",
    period: "May 2021 – Present",
    location: "Nashik, India · Remote",
    summary: "Organising cloud events, bootcamps, and mentorship for developers and students.",
    link: null,
    current: true,
  },
  {
    company: "SkillShip Foundation",
    role: "Chapter Lead",
    type: "Contract",
    period: "Sep 2020 – Sep 2021",
    location: "Nashik, India · Remote",
    summary: "Led expert sessions and skill-development workshops across colleges and companies.",
    link: null,
    current: false,
  },
];

export const experience = [
  {
    role: "MSc Computer Science",
    org: "University of Greenwich",
    period: "2021–2023",
    details: "Distinction. Focus: Full-stack development, cloud computing, AI/ML applications. Capstone: Track-Master (MERN stack train ticket booking system with TfL API integration, PDF ticket generation, payment processing)."
  },
  {
    role: "AWS Solutions Architect – Associate",
    org: "Amazon Web Services",
    period: "2024",
    details: "Certified. Validates cloud architecture, security, and cost optimization knowledge."
  },
  {
    role: "Microsoft Azure Fundamentals (AZ-900)",
    org: "Microsoft",
    period: "2023",
    details: "Certified. Cloud concepts, core Azure services, security, privacy, compliance, pricing."
  },
  {
    role: "Microsoft Azure Developer Associate (AZ-204)",
    org: "Microsoft",
    period: "2024",
    details: "Certified. Developing solutions for Azure: compute, storage, security, monitoring, APIs."
  },
  {
    role: "Google AI Essentials",
    org: "Google",
    period: "2024",
    details: "Certified. Generative AI fundamentals, prompt engineering, responsible AI practices."
  },
  {
    role: "OutSkill AI Generalist Accelerator",
    org: "OutSkill",
    period: "2024",
    details: "Completed. Intensive AI application development: LLMs, RAG, agents, multimodal, voice AI, AI product strategy."
  },
  {
    role: "Skillship Foundation Aatmanirbhar Program, Best Performer, Python",
    org: "Skillship Foundation",
    period: "2022",
    details: "Top performer in Python track. Capstone: Twitter Sentiment Detector (end-to-end ML pipeline)."
  }
];

export const community = [
  {
    role: "Community Manager",
    org: "MahaWiki",
    period: "2022–Present",
    details: "Open knowledge contribution and community coordination."
  },
  {
    role: "Community Manager",
    org: "Cloud Community Group",
    period: "May 2021 – Present",
    details: "Cloud-native technologies, Kubernetes, serverless patterns."
  },
  {
    role: "Campus Club Lead",
    org: "GESCOE MOZCLUB / Mozilla Campus Club",
    period: "2019–2021",
    details: "Privacy/security advocacy, Firefox Add-ons development, HTML/WordPress workshops."
  },
  {
    role: "Firefox Beta Tester",
    org: "Mozilla India, Quality Assurance",
    period: "2017",
    details: "Volunteer QA contributor for Firefox Developer Edition test days (Preferences Search, CSS Grid Inspector, Form Autofill) and the Firefox Quantum website-compatibility testing push."
  },
  {
    role: "Campus Ambassador & Best Performer (Python)",
    org: "SkillShip Foundation",
    period: "2020–2022",
    details: "Ran student webinars and skill-building programs; recognised as Top Active Member at HackOnfest 2020 and Best Performer in the Aatmanirbhar Python track."
  }
];

export const services = [
  {
    category: "Build",
    items: ["MVP Development", "Full-Stack Applications", "Web Applications", "Technical Prototypes"]
  },
  {
    category: "Enhance Intelligence",
    items: ["LLM Integration", "AI Automation", "Agentic Workflows", "Retrieval Systems (RAG)"]
  },
  {
    category: "Architect",
    items: ["System Design", "Technology Selection", "Scalability Planning", "API Strategy"]
  },
  {
    category: "Prototype",
    items: ["Idea → Working Prototype", "Feasibility Validation", "Technical Spike", "Proof of Concept"]
  },
  {
    category: "Product",
    items: ["UX + AI-Native Strategy", "Product Discovery", "Feature Prioritization", "Metrics Design"]
  },
  {
    category: "Explore",
    items: ["Emerging Tech Feasibility", "Local LLM Deployment", "Agent Architecture", "AI Infrastructure"]
  },
  {
    category: "Consult",
    items: ["AI & Agentic AI Transformation Roadmaps", "Technical Product & Program Delivery", "Business Process Optimization", "No-Code / Low-Code Workflow Automation (Vibe Coding)"]
  }
];

export const socialLinks = {
  github: "https://github.com/MYadnyesh",
  linkedin: "https://linkedin.com/in/yadnyesh-mulay",
  twitter: "https://twitter.com/yadnyesh_mulay",
  email: "mailto:yadnyeshmulay@gmail.com",
  calendly: "https://calendly.com/yadnyeshmulay/30min"
};

export const languages = [
  { name: "English", level: "Native / bilingual" },
  { name: "Marathi", level: "Native / bilingual" },
  { name: "Hindi", level: "Full professional" }
];

export const siteConfig = {
  name: "Yadnyesh Mulay",
  title: "AI-first T-shaped Full Stack Developer & Business/AI Consultant",
  description: "I build useful software and advise on AI-driven business transformation. I turn ideas into working technical prototypes, and turn processes into AI & agentic AI roadmaps.",
  url: "https://yadnyesh.dev",
  ogImage: "/images/og-image.png",
  keywords: ["Full Stack Developer", "AI Engineer", "LLM Applications", "Business Consultant", "AI Transformation Consultant", "Agentic AI", "Technical Product Delivery", "Business Process Optimization", "No-Code Automation", "Vibe Coding", "React", "Next.js", "TypeScript", "Python", "FastAPI", "Portfolio"]
};