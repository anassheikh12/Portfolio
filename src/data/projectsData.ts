export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  maxLevel: number;
  category: string;
  description: string;
  projects: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  color: string;
  pipeHeight: number;
}

export const bioData = {
  name: "Anas Sheikh",
  title: "Full-Stack Developer",
  subtitle: "Sophomore @ FAST-NUCES Karachi",
  bio: "A passionate developer building interactive experiences from low-level C++ engines to real-time web applications. Specializing in systems programming, game development, and modern full-stack architecture. Always pushing pixels and breaking boundaries.",
  stats: {
    level: 20,
    hp: 100,
    mp: 80,
    exp: "2+ Years",
    guild: "FAST-NUCES",
  },
  socials: {
    github: "https://github.com/AnasShk",
    linkedin: "https://linkedin.com/in/anas-shk",
    email: "anas@example.com",
  },
};

export const skillsData: Skill[] = [
  {
    id: "cpp",
    name: "C / C++",
    icon: "⚔️",
    level: 9,
    maxLevel: 10,
    category: "Languages",
    description: "Systems-level programming, SFML game engines, OOP architecture, memory management, and data structures. Built complete RPG systems with sprite animation engines.",
    projects: ["SFML RPG Engine", "Data Structures Lab"],
  },
  {
    id: "react",
    name: "React / TS",
    icon: "🛡️",
    level: 8,
    maxLevel: 10,
    category: "Frontend",
    description: "React 18 with TypeScript, Next.js, state management with Context API and Zustand, real-time UIs with WebSocket integration and TLDraw collaborative canvases.",
    projects: ["LIGMA Hub", "This Portfolio"],
  },
  {
    id: "node",
    name: "Node.js",
    icon: "🧪",
    level: 7,
    maxLevel: 10,
    category: "Backend",
    description: "Express/Fastify APIs, WebSocket servers, real-time collaboration backends, authentication flows, and serverless deployments on Vercel.",
    projects: ["LIGMA Hub Backend", "Chat Engine"],
  },
  {
    id: "python",
    name: "Python",
    icon: "📜",
    level: 7,
    maxLevel: 10,
    category: "Languages",
    description: "Scripting, automation, data processing, and rapid prototyping. Experience with Flask APIs and machine learning fundamentals.",
    projects: ["Automation Scripts", "ML Basics"],
  },
  {
    id: "tailwind",
    name: "Tailwind",
    icon: "🎨",
    level: 8,
    maxLevel: 10,
    category: "Styling",
    description: "Utility-first CSS framework expertise. Building responsive, pixel-perfect UIs with custom design systems, animations, and complex layouts.",
    projects: ["This Portfolio", "LIGMA Hub"],
  },
  {
    id: "git",
    name: "Git / CI",
    icon: "🔧",
    level: 8,
    maxLevel: 10,
    category: "DevOps",
    description: "Version control mastery with Git, GitHub Actions CI/CD pipelines, branch strategies, and collaborative workflow management.",
    projects: ["All Projects"],
  },
  {
    id: "websockets",
    name: "WebSockets",
    icon: "⚡",
    level: 7,
    maxLevel: 10,
    category: "Networking",
    description: "Real-time bidirectional communication with Socket.io and Yjs CRDT protocols. Built collaborative drawing canvases and live chat systems.",
    projects: ["LIGMA Hub", "Chat Engine"],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "💎",
    level: 6,
    maxLevel: 10,
    category: "Backend",
    description: "PostgreSQL, MongoDB, Firebase Realtime DB and Firestore. Schema design, query optimization, and real-time data synchronization patterns.",
    projects: ["LIGMA Hub", "Auth Systems"],
  },
];

export const projectsData: Project[] = [
  {
    id: "rpg-engine",
    title: "SFML RPG Engine",
    subtitle: "C++ Game Engine",
    description: "A complete 2D RPG engine built from scratch in C++ with SFML. Features state-based sprite animation, wave-based enemy AI, loot drop systems, collision detection, and a cinematic splash screen sequence. Full OOP architecture with 15+ classes.",
    tech: ["C++", "SFML", "OOP", "Game Dev"],
    repoUrl: "https://github.com/AnasShk/sfml-rpg",
    color: "#E44040",
    pipeHeight: 160,
  },
  {
    id: "ligma-hub",
    title: "LIGMA Hub",
    subtitle: "Collaborative Platform",
    description: "A Discord-inspired real-time collaboration platform with AI-powered idea generation. Features TLDraw canvas integration, role-based access control, Yjs CRDT synchronization, Neo-Brutalist UI, and Gemini AI content generation pipeline.",
    tech: ["React", "Next.js", "WebSockets", "Yjs", "AI"],
    repoUrl: "https://github.com/AnasShk/ligma-hub",
    color: "#5C94FC",
    pipeHeight: 200,
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    subtitle: "Retro Arcade Site",
    description: "The very site you're looking at! A 16-bit retro arcade cabinet portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. Features dual Arcade/Dashboard modes, parallax cloud physics, and pure CSS pixel art.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    repoUrl: "https://github.com/AnasShk/portfolio",
    color: "#00A800",
    pipeHeight: 140,
  },
  {
    id: "chat-engine",
    title: "Real-Time Chat",
    subtitle: "WebSocket Engine",
    description: "A production-grade real-time chat engine with Discord-inspired UI. Built with WebSocket bidirectional communication, message persistence, user presence tracking, and a Neo-Brutalist design system.",
    tech: ["Node.js", "Socket.io", "React", "MongoDB"],
    repoUrl: "https://github.com/AnasShk/chat-engine",
    color: "#FFD700",
    pipeHeight: 180,
  },
];

export const navItems = [
  { id: "about", label: "ABOUT", icon: "👤" },
  { id: "skills", label: "SKILLS", icon: "⚔️" },
  { id: "projects", label: "PROJECTS", icon: "🏗️" },
  { id: "contact", label: "CONTACT", icon: "📬" },
] as const;
