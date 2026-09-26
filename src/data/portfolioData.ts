import { FocusTabData, FocusTab, LeadershipRole, AcademicSemester } from '../types';
import ProfilePic from './arj.webp'

export const PORTFOLIO_INFO = {
  name: 'Arjun Korlekar',
  tagline: 'Engineering Undergraduate | Software & Backend Developer',
  institution: 'COEP Technological University',
  institutionAddress: 'Wellesley Road, Shivajinagar, Pune',
  institutionUrl: 'https://www.coeptech.ac.in',
  degree: 'Bachelor of Technology (B.Tech)',
  major: 'Electrical Engineering',
  duration: '2025 - 2029',
  batch: "'29",
  location: 'Pune, Maharashtra, India',
  specialization: 'Software & Backend Development',
  email: 'arjun1k.dev@gmail.com',
  githubUrl: 'https://github.com/arjun1k-dev',
  githubUser: 'arjun1k-dev',
  linkedinUrl: 'https://www.linkedin.com/in/arjun1k-dev/',
  linkedinUser: 'arjun1k-dev',
  status: 'looking for software/backend internships',
  mailtoLink: 'mailto:arjun1k.dev@gmail.com?subject=[Internship%20Referral]%20Software%20Engineering%20Role',
  summary:
    'EE undergrad at COEP. I write C, Python and TypeScript because I want to control what happens, not just use what exists. Most of what I build starts as a tool for a problem I personally have — then it ships.',
  recruiterBio:
    "I'm Arjun — Electrical Engineering undergrad at COEP (2025-2029, 7.32 CGPA). I work in C/C++, Python, TypeScript, Next.js and FastAPI, and I run web teams for MindSpark and Pune Startup Fest. I build things to understand them — rebuilding git's core in C taught me more than any tutorial could.",
  portraitUrl:
    ProfilePic,
};

export const TELEMETRY_TABS_DATA: Record<FocusTab, FocusTabData> = {
  backend: {
    score: '96%',
    numericScore: 96,
    label: 'Backend & Web Match',
    offset: 20,
    title: 'Modern Full-Stack & Backend Systems',
    desc: 'TypeScript, Next.js 15 App Router, React 19, FastAPI microservices, offline-first SQLite/Prisma. This is where I ship.',
    badges: [
      { text: '✓ Next.js 15 & React 19', bg: 'bg-emerald-100', textCol: 'text-emerald-900', border: 'border-emerald-300/60' },
      { text: '✓ FastAPI & Python', bg: 'bg-teal-100', textCol: 'text-teal-900', border: 'border-teal-300/60' },
      { text: '✓ SQLite & Prisma ORM', bg: 'bg-amber-100', textCol: 'text-amber-900', border: 'border-amber-300/70' },
    ],
    bars: [
      {
        name: 'TypeScript & JavaScript (Full-Stack Runtimes)',
        val: '95%',
        numericVal: 95,
        detail: 'Next.js 15 App Router, React 19, Zustand persistent state, Zod schemas',
        meta: 'OVERRUN Core',
        grad: 'from-emerald-600 via-teal-500 to-cyan-500',
      },
      {
        name: 'Python & FastAPI Web Services',
        val: '92%',
        numericVal: 92,
        detail: 'Type-safe asynchronous endpoints, schema validation, data pipelines',
        meta: 'Active Dev',
        grad: 'from-teal-600 to-emerald-500',
      },
      {
        name: 'Relational Modeling & Storage (SQLite / Prisma)',
        val: '90%',
        numericVal: 90,
        detail: 'Local-first offline DB syncing, schema migrations, zero-token vault parsers',
        meta: 'Zero-API Cost',
        grad: 'from-cyan-600 to-teal-500',
      },
      {
        name: 'Web Design Fundamentals & Modern UI',
        val: '94%',
        numericVal: 94,
        detail: 'Tailwind CSS, Framer Motion, responsive UX, Web File System Access API',
        meta: 'COEP Coursework',
        grad: 'from-amber-500 to-gold-600',
      },
    ],
  },
  systems: {
    score: '94%',
    numericScore: 94,
    label: 'Systems & C Match',
    offset: 28,
    title: 'Systems Programming & Content-Addressed Storage',
    desc: "C, modern C++, POSIX/Linux, CMake. I rebuilt git's object model from scratch (Resonance) to actually understand it — not just use it.",
    badges: [
      { text: '⚙️ C & CMake Build', bg: 'bg-emerald-100', textCol: 'text-emerald-900', border: 'border-emerald-300/60' },
      { text: '📦 SHA-1 & zlib VCS', bg: 'bg-teal-100', textCol: 'text-teal-900', border: 'border-teal-300/60' },
      { text: '🐧 Linux / POSIX Core', bg: 'bg-cyan-100', textCol: 'text-cyan-900', border: 'border-cyan-300/70' },
    ],
    bars: [
      {
        name: 'C Programming & POSIX System Calls',
        val: '92%',
        numericVal: 92,
        detail: 'Low-level memory management, file descriptor I/O, POSIX path handling',
        meta: 'Resonance VCS',
        grad: 'from-emerald-600 to-teal-500',
      },
      {
        name: 'Content-Addressable Object Stores (SHA-1 / zlib)',
        val: '95%',
        numericVal: 95,
        detail: 'Fan-out tree/blob/commit objects, index staging, DAG commit chain',
        meta: 'Git Architecture',
        grad: 'from-teal-600 to-cyan-500',
      },
      {
        name: 'Linux / Unix Environments & Shell Tooling',
        val: '93%',
        numericVal: 93,
        detail: 'Command dispatch, process execution, Git version control workflows',
        meta: 'Daily Driver',
        grad: 'from-cyan-600 to-emerald-600',
      },
      {
        name: 'C++ & Java Core Foundations',
        val: '88%',
        numericVal: 88,
        detail: 'Object-oriented patterns, data structures, algorithm implementations',
        meta: 'Multi-Language',
        grad: 'from-amber-500 to-emerald-600',
      },
    ],
  },
  math: {
    score: '93%',
    numericScore: 93,
    label: 'Math & Signals Match',
    offset: 32,
    title: 'Mathematics, Signals & Computational Analysis',
    desc: "Signals & systems, MATLAB, analog circuits — EE core. I taught the math-to-AI bridge to 11th-12th graders because teaching exposes every gap you have.",
    badges: [
      { text: '⚡ Signals & Systems', bg: 'bg-amber-100', textCol: 'text-amber-900', border: 'border-amber-300/70' },
      { text: '📊 Numerical MATLAB', bg: 'bg-teal-100', textCol: 'text-teal-900', border: 'border-teal-300/60' },
      { text: '🧠 AI ↔ Math Bridge', bg: 'bg-emerald-100', textCol: 'text-emerald-900', border: 'border-emerald-300/60' },
    ],
    bars: [
      {
        name: 'Signals and Systems (Transforms & Circuit Signals)',
        val: '92%',
        numericVal: 92,
        detail: 'LTI systems, Fourier/Laplace transforms, frequency response analysis',
        meta: 'COEP Core EE',
        grad: 'from-teal-600 to-emerald-500',
      },
      {
        name: 'Numerical Methods in Computer Programming (MATLAB)',
        val: '91%',
        numericVal: 91,
        detail: 'Iterative solvers, matrix algebra, computational algorithms in MATLAB',
        meta: 'Coursework Verified',
        grad: 'from-amber-500 to-gold-600',
      },
      {
        name: 'Analog Electronics & Circuit Analysis',
        val: '89%',
        numericVal: 89,
        detail: 'Semiconductor devices, op-amps, transient analysis, filter design',
        meta: 'COEP Tech Lab',
        grad: 'from-emerald-600 to-cyan-600',
      },
      {
        name: 'AI ↔ Mathematics Mentorship & Pedagogy',
        val: '95%',
        numericVal: 95,
        detail: 'Linear algebra, calculus & computational thinking links to AI systems',
        meta: 'Devadhar Workshop',
        grad: 'from-teal-600 to-amber-500',
      },
    ],
  },
};

export const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    title: 'Web Team Coordinator',
    org: "MindSpark '26",
    category: 'Annual National Technical Fest',
    badgeGrad: 'from-emerald-600 to-teal-600',
    description:
      "I coordinate the web team for COEP's national tech fest — UI/UX calls, architecture planning, and making sure the teams actually ship.",
    stack: 'UI/UX Design, Web Architecture, Coordination',
    metric: 'National Tech Fest',
  },
  {
    title: 'Web Team Coordinator',
    org: "Pune Startup Fest '27",
    category: 'Flagship Entrepreneurship Fest',
    badgeGrad: 'from-teal-600 to-cyan-600',
    description:
      'Running web coordination for the flagship edition — digital assets, UX flow, shipping on a deadline.',
    stack: 'Digital Assets, UX Planning, Web Coordination',
    metric: 'Flagship Fest Lead',
  },
  {
    title: 'Web Team Volunteer',
    org: "Pune Startup Fest '26",
    category: 'COEP Technological University',
    badgeGrad: 'from-cyan-600 to-teal-600',
    description:
      'Digital assets and tech support for event coordination and participant registration. Entry-level grind, done properly.',
    stack: 'Web Support & Digital Assets',
    metric: 'Technical Volunteer',
  },
  {
    title: 'Technical Speaker & Mentor (Freelanced)',
    org: 'Devadhar Classes',
    category: 'Academic Mentorship',
    badgeGrad: 'from-amber-500 to-gold-600',
    description:
      'I designed and ran a workshop for 11th-12th graders on how linear algebra, calculus and computational thinking actually connect to AI. Teaching it exposed every gap I had — that was the point.',
    stack: 'AI ↔ Math Pedagogy, Computational Thinking',
    metric: 'Bridge Workshop Lead',
  },
];

export const ACADEMIC_SEMESTERS: AcademicSemester[] = [
  {
    sem: 'SEM 1',
    label: 'First Semester',
    sgpa: 7.05,
    credits: 21,
    highlight:
      'Started rough. Engineering math, computing fundamentals, physical sciences.',
  },
  {
    sem: 'SEM 2',
    label: 'Second Semester',
    sgpa: 7.60,
    credits: 22,
    highlight:
      '+0.55 jump. Programming fundamentals, circuits, numerical methods. The trajectory matters more than the number.',
  },
];

export const COURSEWORK_TAGS = [
  {
    name: 'Signals and Systems',
    code: 'EE-201',
    desc: 'LTI systems, continuous & discrete Fourier transforms, Laplace transforms, and frequency response analysis.',
  },
  {
    name: 'Numerical Methods (MATLAB)',
    code: 'EE-204',
    desc: 'Computational algorithms, matrix numerical methods, iterative linear solvers, and MATLAB modeling.',
  },
  {
    name: 'Python Programming',
    code: 'CS-101',
    desc: 'Data structures, algorithm implementations, scripting, object-oriented concepts, and package tooling.',
  },
  {
    name: 'Analog Electronics & Circuits',
    code: 'EE-102',
    desc: 'Operational amplifiers, diode & transistor circuits, small-signal AC analysis, and circuit simulation.',
  },
  {
    name: 'Web Design Fundamentals',
    code: 'IT-105',
    desc: 'Modern semantic HTML5, CSS layout principles, responsive viewport design, and DOM manipulation.',
  },
];

export const OVERRUN_MODULES = [
  {
    id: 'time-bank',
    name: 'Time Bank Engine',
    sub: 'Loss-Aversion Currency',
    desc: 'I procrastinate like everyone else. So instead of vague guilt, skipping costs visible Time Debt and XP. Finish early → banked minutes. Deadlines beat motivation, so I engineered the deadline.',
    metric: 'Real Time Debt',
    code: `// Dynamic Time Delta & XP calculation
function calculateTimeDelta(plannedMin, actualMin, workTier) {
  const delta = plannedMin - actualMin;
  const multiplier = workTier === 'A' ? 1.5 : workTier === 'B' ? 1.0 : 0.5;
  return { timeDebt: delta < 0 ? Math.abs(delta) : 0, bankedTime: Math.max(0, delta), xp: delta * multiplier };
}`,
  },
  {
    id: 'obsidian-sync',
    name: 'Vault Scanner',
    sub: 'Zero-Token SQLite Sync',
    desc: 'Parses my Obsidian vault (Markdown + YAML frontmatter) locally via File System Access API. No cloud, no subscriptions, $0 in tokens. If I can\'t control the pipeline, I don\'t trust it.',
    metric: 'Zero-Token Ingest',
    code: `// Offline-First Obsidian Vault Ingestion
async function syncObsidianVault(dirHandle, prismaDb) {
  for await (const entry of dirHandle.values()) {
    if (entry.name.endsWith('.md')) {
      const { data, content } = matter(await (await entry.getFile()).text());
      await prismaDb.concept.upsert({ where: { slug: data.slug }, update: data, create: data });
    }
  }
}`,
  },
  {
    id: 'syllabus-map',
    name: 'Syllabus Telemetry',
    sub: '9 Core Subjects',
    desc: '9 core subjects mapped with weightages. NotebookLM quiz gaps route straight to targeted revision tasks. I don\'t study blindly — the map tells me where it hurts.',
    metric: '9 Subject Registry',
    code: `// NotebookLM Quiz Gap Analysis & Routing
export const SubjectRegistry = z.object({
  subjectId: z.enum(['SIGNALS', 'CIRCUITS', 'NUMERICAL_MATH', 'DSA', 'ANALOG_ELEC']),
  conceptWeight: z.number().min(0).max(1),
  gapAnalysisSnapshot: z.string().optional()
});`,
  },
  {
    id: 'timeline-grid',
    name: 'Tactical Timeline',
    sub: 'Collision Detection',
    desc: 'Time-block scheduler with collision detection against my actual university timetable, plus automated EOD audit logs in markdown. If I can\'t see the system, I can\'t trust it.',
    metric: 'Auto EOD Reports',
    code: `// Reschedule engine with collision detection
function detectCollision(taskA, taskB, timetableBounds) {
  const overlaps = taskA.end > taskB.start && taskA.start < taskB.end;
  const outOfBounds = taskA.start < timetableBounds.start || taskA.end > timetableBounds.end;
  return { hasCollision: overlaps || outOfBounds, safeSlot: findNextFreeWindow(taskA) };
}`,
  },
];

export const RESONANCE_COMMANDS = [
  {
    cmd: 'setup',
    gitEquiv: 'git init',
    desc: 'Initializes .reso/ skeleton: objects/, references/heads/, index, and HEAD (symbolic ref: ref: references/heads/main).',
    file: 'src/main.c',
  },
  {
    cmd: 'hash-object',
    gitEquiv: 'git hash-object',
    desc: 'Computes SHA-1 hash of target file, applies zlib compression, and writes blob object to fan-out store (.reso/objects/xx/yyy...).',
    file: 'src/objects.c',
  },
  {
    cmd: 'stage',
    gitEquiv: 'git add',
    desc: 'Appends path-to-hash mappings into the flat binary index file staging area.',
    file: 'src/staging.c',
  },
  {
    cmd: 'snapshot',
    gitEquiv: 'git commit',
    desc: 'Constructs tree object from index, encapsulates into commit object with parent/author/message headers, and advances branch pointer.',
    file: 'src/commits.c',
  },
  {
    cmd: 'status',
    gitEquiv: 'git status',
    desc: 'Compares working tree against staging index and latest commit tree to report modified, untracked, and staged files.',
    file: 'src/status.c',
  },
];
