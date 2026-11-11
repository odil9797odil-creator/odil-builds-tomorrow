/**
 * ───────────────────────────────────────────────────────────────
 *  ODIL — PORTFOLIO CONTENT
 *  Edit everything about the site from this one file.
 *  Text, links, skills, projects and journey steps all live here.
 * ───────────────────────────────────────────────────────────────
 *
 *  HOW TO ADD YOUR PORTRAIT
 *  1. Put your photo in  src/assets/  (e.g. src/assets/odil.jpg)
 *  2. At the top of this file add:  import portraitImg from "@/assets/odil.jpg";
 *  3. Set  profile.portrait.src = portraitImg
 *
 *  Leave any link as `null` until it exists — the site shows a
 *  tasteful "coming soon" state instead of a broken link.
 */

export type Level = "Currently learning" | "Basic knowledge" | "Beginner" | "Planned";

export const profile = {
  name: "Odil",
  logo: "ODIL",
  role: "Programming Student",
  title: "Aspiring Software Developer",
  heroBadge: "Aspiring Backend Developer",
  availability: "Currently learning & building.",
  heroEyebrow: "Hello, world. I'm",
  heroHeadline: "Building my future, one line of code at a time.",
  heroDescription:
    "I'm a programming student passionate about technology, software development, and solving problems through code. Currently learning Python and C++, exploring web development, and working toward becoming a backend developer.",
  introduction:
    "Hi, I'm Odil — a programming student with a growing interest in software development, problem-solving, and technology. I'm currently developing my skills in Python and C++, while exploring web technologies and working toward becoming a backend developer. In the future, I hope to explore the fascinating world of Machine Learning and Artificial Intelligence.",
  portrait: {
    /** Set to an imported image (see instructions above). `null` shows the placeholder. */
    src: null as string | null,
    alt: "Portrait of Odil",
  },
  tagline: "Learning. Building. Becoming.",
};

/** Contact details. Replace `null` with your real values. */
export const contact = {
  email: null as string | null, // e.g. "odil@example.com"
  github: null as string | null, // e.g. "https://github.com/your-username"
  linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/your-profile"
  placeholders: {
    email: "[ADD YOUR EMAIL]",
    github: "[ADD YOUR GITHUB URL]",
    linkedin: "[ADD YOUR LINK]",
  },
};

/**
 * Contact form delivery. The form never pretends to send.
 * Set `endpoint` to a real form service URL (POST, JSON body) once one is configured.
 */
export const contactForm = {
  endpoint: null as string | null,
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  heading: "Beyond the Code.",
  subtitle: "A little about who I am and what drives me.",
  paragraphs: [
    "I'm currently developing my programming skills and exploring different areas of software development.",
    "I enjoy understanding how things work behind the scenes, solving logical problems, and turning ideas into practical projects.",
    "My current priority is building a strong foundation in programming and gradually developing the skills required for backend engineering.",
    "I believe that becoming a good developer is a continuous process of learning, experimenting, and building.",
  ],
  facts: [
    { label: "Current focus", value: "Programming Fundamentals", icon: "target" },
    { label: "Main interest", value: "Backend Development", icon: "server" },
    { label: "Future interest", value: "Machine Learning & AI", icon: "sparkles" },
    { label: "Mindset", value: "Always Learning", icon: "infinity" },
  ],
} as const;

export type SkillIcon = "python" | "cpp" | "html" | "css" | "js" | "server" | "database" | "api" | "brain";

export interface Skill {
  name: string;
  icon: SkillIcon;
  level: Level;
  description: string;
}

export interface SkillGroup {
  title: string;
  kind: "current" | "future";
  note: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    kind: "current",
    note: "Where most of my practice happens.",
    skills: [
      {
        name: "Python",
        icon: "python",
        level: "Currently learning",
        description: "Writing small programs to practise logic, data structures and problem-solving.",
      },
      {
        name: "C++",
        icon: "cpp",
        level: "Currently learning",
        description: "Learning functions, conditions, loops and how programs work closer to the machine.",
      },
    ],
  },
  {
    title: "Web Development",
    kind: "current",
    note: "Understanding how websites are built.",
    skills: [
      {
        name: "HTML",
        icon: "html",
        level: "Basic knowledge",
        description: "Structuring pages with semantic, accessible markup.",
      },
      {
        name: "CSS",
        icon: "css",
        level: "Basic knowledge",
        description: "Styling layouts, colour and typography.",
      },
      {
        name: "JavaScript",
        icon: "js",
        level: "Beginner",
        description: "Taking first steps with interactivity and the browser.",
      },
    ],
  },
  {
    title: "Future Exploration",
    kind: "future",
    note: "Not learned yet — this is where I'm heading.",
    skills: [
      {
        name: "Backend Development",
        icon: "server",
        level: "Planned",
        description: "Server-side programming and application architecture.",
      },
      {
        name: "Databases",
        icon: "database",
        level: "Planned",
        description: "Storing, modelling and querying data.",
      },
      {
        name: "APIs",
        icon: "api",
        level: "Planned",
        description: "Designing how applications talk to each other.",
      },
      {
        name: "Machine Learning",
        icon: "brain",
        level: "Planned",
        description: "A long-term interest in data, mathematics and AI.",
      },
    ],
  },
];

export interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  /** Optional screenshot (import from src/assets). When null, a code preview is shown. */
  image: string | null;
  /** Code preview shown when there is no image. */
  preview: { file: string; lines: string[] };
  /** Real URL once the project is published. `null` shows "Coming soon". */
  link: string | null;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "Python Experiments",
    description:
      "A collection of small Python programs and exercises created while developing programming fundamentals and problem-solving abilities.",
    tags: ["Python"],
    image: null,
    preview: {
      file: "experiments.py",
      lines: [
        "def is_prime(n):",
        "    if n < 2:",
        "        return False",
        "    for i in range(2, int(n**0.5) + 1):",
        "        if n % i == 0:",
        "            return False",
        "    return True",
      ],
    },
    link: null,
  },
  {
    number: "02",
    title: "C++ Practice",
    description:
      "Programming exercises focused on logic, functions, conditions, loops, and understanding fundamental programming concepts.",
    tags: ["C++"],
    image: null,
    preview: {
      file: "practice.cpp",
      lines: [
        "#include <iostream>",
        "",
        "int main() {",
        "  for (int i = 1; i <= 5; ++i) {",
        '    std::cout << "step " << i;',
        "  }",
        "  return 0;",
        "}",
      ],
    },
    link: null,
  },
  {
    number: "03",
    title: "Personal Portfolio",
    description:
      "My personal portfolio website, created to document my programming journey, showcase my projects, and share my future goals.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: null,
    preview: {
      file: "portfolio.html",
      lines: [
        '<header class="hero">',
        "  <h1>Odil.</h1>",
        "  <p>",
        "    Building my future,",
        "    one line at a time.",
        "  </p>",
        "</header>",
      ],
    },
    link: null,
  },
];

export type StepStatus = "ongoing" | "current" | "exploring" | "goal" | "future";

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
  status: StepStatus;
}

/** Labels shown on each step. Only one step should be "current". */
export const stepStatusLabel: Record<StepStatus, string> = {
  ongoing: "Ongoing",
  current: "You are here",
  exploring: "Exploring",
  goal: "Primary goal",
  future: "Long-term",
};

export const journey: JourneyStep[] = [
  {
    number: "01",
    title: "Foundations",
    description: "Learning programming fundamentals, logic, algorithms, and problem-solving.",
    status: "ongoing",
  },
  {
    number: "02",
    title: "Python & C++",
    description: "Strengthening programming skills through practical exercises and small projects.",
    status: "current",
  },
  {
    number: "03",
    title: "Web Development",
    description: "Understanding HTML, CSS, JavaScript, and how websites work.",
    status: "exploring",
  },
  {
    number: "04",
    title: "Backend Development",
    description:
      "My primary career goal: learning server-side programming, APIs, databases, and application architecture.",
    status: "goal",
  },
  {
    number: "05",
    title: "Machine Learning",
    description:
      "A long-term interest: exploring artificial intelligence, data, mathematics, and machine learning.",
    status: "future",
  },
];

export type ExploringIcon = "python" | "cpp" | "js" | "globe" | "server" | "puzzle";

export const exploring: { title: string; icon: ExploringIcon }[] = [
  { title: "Improving Python programming", icon: "python" },
  { title: "Practicing C++", icon: "cpp" },
  { title: "Learning JavaScript", icon: "js" },
  { title: "Understanding web development", icon: "globe" },
  { title: "Exploring backend concepts", icon: "server" },
  { title: "Developing problem-solving skills", icon: "puzzle" },
];
