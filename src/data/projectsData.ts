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
  videoAsset?: string;
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
    github: "https://github.com/anassheikh12",
    linkedin: "https://www.linkedin.com/in/anas-sheikh-2a24a62b5/",
    email: "sheilhanas9@gmail.com",
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
    projects: ["Axe & Arrows", "Data Structures Lab"],
  },
  {
    id: "react",
    name: "React / TS",
    icon: "🛡️",
    level: 8,
    maxLevel: 10,
    category: "Frontend",
    description: "React 18 with TypeScript, Next.js, state management with Context API and Zustand, real-time UIs with WebSocket integration and TLDraw collaborative canvases.",
    projects: ["Ligma", "This Portfolio"],
  },
  {
    id: "node",
    name: "Node.js",
    icon: "🧪",
    level: 7,
    maxLevel: 10,
    category: "Backend",
    description: "Express/Fastify APIs, WebSocket servers, real-time collaboration backends, authentication flows, and serverless deployments on Vercel.",
    projects: ["Ligma Backend", "Chat Engine"],
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    level: 7,
    maxLevel: 10,
    category: "Languages",
    description: "Server-side scripting, database integration, and backend development. Experience with Laravel frameworks, custom CMS building, and RESTful API development.",
    projects: ["Auth Systems", "Custom CMS"],
  },
  {
    id: "tailwind",
    name: "Tailwind\nBootstrap",
    icon: "🎨",
    level: 8,
    maxLevel: 10,
    category: "Styling",
    description: "Modern styling frameworks for rapid UI development. Expertise in utility-first CSS with Tailwind and component-based design with Bootstrap for responsive, pixel-perfect UIs.",
    projects: ["This Portfolio", "Ligma"],
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
    id: "html-css",
    name: "HTML/CSS",
    icon: "📐",
    level: 7,
    maxLevel: 10,
    category: "Frontend",
    description: "Core web foundations. Semantic HTML5 structure and advanced CSS3 layouts including Flexbox, Grid, and complex animations for modern web experiences.",
    projects: ["This Portfolio", "Flappy Bird"],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "💎",
    level: 6,
    maxLevel: 10,
    category: "Backend",
    description: "PostgreSQL, MongoDB, Firebase Realtime DB and Firestore. Schema design, query optimization, and real-time data synchronization patterns.",
    projects: ["Ligma", "Auth Systems"],
  },
];

export const projectsData: Project[] = [
  {
    id: "ligma",
    title: "Ligma",
    subtitle: "Collaborative SaaS",
    description: "Real-time collaborative SaaS whiteboard platform.",
    tech: ["React", "Next.js", "WebSockets", "Node.js"],
    repoUrl: "https://github.com/anassheikh12/LIGMA_DevDay",
    liveUrl: "https://ligma-afso.onrender.com/",
    videoAsset: "Ligma_demo.mp4",
    color: "#5C94FC",
    pipeHeight: 200,
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    subtitle: "Retro Arcade",
    description: "Classic retro arcade recreation playable right in the browser.",
    tech: ["JavaScript", "HTML5 Canvas", "Game Dev"],
    repoUrl: "https://github.com/anassheikh12/FlappyBird",
    liveUrl: "https://anassheikh12.github.io/FlappyBird/",
    videoAsset: "Flappy-bird.mp4",
    color: "#00A800",
    pipeHeight: 140,
  },
  {
    id: "axe-arrows",
    title: "Axe & Arrows",
    subtitle: "Shadow of the Rogue",
    description: "2D action game featuring custom barbarian/dragon movement and wave logic loops built using C++ and SFML.",
    tech: ["C++", "SFML", "Game Engines"],
    repoUrl: "https://github.com/anassheikh12/Axe-Arrow",
    videoAsset: "Axe-Arrow_C++Game.mp4",
    color: "#E44040",
    pipeHeight: 160,
  },
  {
    id: "psl-nexus",
    title: "PSL Nexus",
    subtitle: "Web3 Cricket Metaverse",
    description: "Web3 3D cricket metaverse platform.",
    tech: ["Three.js", "Web3", "React", "Metaverse"],
    repoUrl: "https://github.com/anassheikh12/PSL-Nexus",
    liveUrl: "https://psl-nexus-jet.vercel.app/",
    videoAsset: "PSL_Nexus.mp4",
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
