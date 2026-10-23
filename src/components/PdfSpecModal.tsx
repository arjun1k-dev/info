import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Copy, Check, ShieldCheck, Mail, MapPin, Globe } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface PdfSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfSpecModal: React.FC<PdfSpecModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySpec = () => {
    const specText = `ARJUN KORLEKAR
Engineering Undergraduate | Software & Backend Developer
COEP Technological University, Pune | B.Tech Electrical Engineering (2025-2029)
Email: arjun1k.dev@gmail.com | GitHub: github.com/arjun1k-dev | LinkedIn: linkedin.com/in/arjun1k-dev
Status: Actively seeking Software Engineering & Backend Internships

ACADEMIC RECORD
Cumulative CGPA: 7.32 / 10.0 (Sem 1: 7.05 SGPA, Sem 2: 7.60 SGPA, +0.55 Acceleration Delta)
Key Coursework: Signals and Systems, Numerical Methods in Computer Programming (MATLAB), Python Programming, Analog Electronics & Circuit Analysis, Web Design Fundamentals.

TECHNICAL SKILLS
- Languages: C, C++, Java, Python, TypeScript, JavaScript
- Frameworks & Web: Next.js, FastAPI, React
- Systems & Tools: Linux / Unix environments, Git & Version Control, SQLite, Prisma ORM, Bun

PROJECTS (ACTIVE PROTOTYPING)
1. OVERRUN: AI-Driven Autonomous Academic Command Center & Loss-Aversion Time Engine
   - Full-stack web application & offline-first academic operating system (Next.js 15, React 19, SQLite, Prisma, TypeScript).
   - Loss-Aversion Time Bank currency engine turning study minutes into finite surplus/debt with live focus session tracking.
   - Zero-token Obsidian Markdown vault sync via Web File System Access API with 0 LLM token cost.
   - 9-subject engineering syllabus mapping and NotebookLM quiz gap routing.

2. Resonance (reso): Content-Addressable Version Control System in C
   - From-scratch version control system written in C (CMake-built, POSIX/Linux) modeled on Git's internal object store.
   - SHA-1 content-addressed, zlib-compressed object store (.reso/objects/) with blob, tree, and commit primitives.
   - Implemented write path: setup (init), hash-object, stage (add), snapshot (commit), status, and linked commit chain DAG.

CAMPUS INITIATIVES & ROLES
- Web Team Coordinator: MindSpark '26 (Annual National Technical Fest, COEP Tech - 1 of 8 coordinators)
- Web Team Coordinator: Pune Startup Fest '27 (Flagship Entrepreneurship Fest, COEP Tech - 1 of 8 coordinators)
- Web Team Volunteer: Pune Startup Fest '26 (COEP Tech)
- Technical Speaker & Mentor (Freelanced): Devadhar Classes (Conducted AI <-> Mathematics bridge workshop for high school students)`;

    navigator.clipboard.writeText(specText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            className="w-full max-w-4xl bg-white text-slate-900 rounded-sm shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
          >
            {/* Modal Controls Bar (Hidden during print) */}
            <div className="no-print px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono-code text-xs font-semibold text-emerald-300">
                  ONE-CLICK OUTREACH KIT & REFERRAL SPEC (PDF READY)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySpec}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Text' : 'Copy Plaintext'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono-code font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body (Swiss-Style Single-Page Clean Engineering Resume) */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 font-sans bg-white selection:bg-emerald-100">
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                      {PORTFOLIO_INFO.name}
                    </h1>
                    <p className="font-mono-code text-sm font-semibold text-emerald-800 mt-1">
                      {PORTFOLIO_INFO.tagline}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {PORTFOLIO_INFO.institution} ({PORTFOLIO_INFO.institutionAddress})
                    </p>
                    <p className="text-xs text-slate-600">
                      B.Tech in {PORTFOLIO_INFO.major} • Duration: {PORTFOLIO_INFO.duration}
                    </p>
                  </div>
                  <div className="text-xs font-mono-code text-slate-700 space-y-1 sm:text-right shrink-0">
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{PORTFOLIO_INFO.email}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{PORTFOLIO_INFO.location}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{PORTFOLIO_INFO.githubUser} • {PORTFOLIO_INFO.linkedinUser}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs font-mono-code text-slate-800">
                  <span className="bg-emerald-50 text-emerald-900 font-bold px-2.5 py-1 rounded border border-emerald-200">
                    Cumulative CGPA: 7.32 / 10.0
                  </span>
                  <span>Semester 1: <strong>7.05 SGPA</strong></span>
                  <span>•</span>
                  <span>Semester 2: <strong>7.60 SGPA</strong> (+0.55 acceleration)</span>
                  <span>•</span>
                  <span className="text-emerald-800 font-semibold">{PORTFOLIO_INFO.status}</span>
                </div>
              </div>

              {/* Technical Core Section */}
              <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
                <div>
                  <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2">
                    Technical Skills & Infrastructure
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <strong className="text-slate-950 block">Languages:</strong>
                      <span className="text-slate-600">
                        C, C++, Java, Python, TypeScript, JavaScript
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-950 block">Frameworks & Web:</strong>
                      <span className="text-slate-600">
                        Next.js 15, FastAPI, React 19, Zustand
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-950 block">Systems & Tools:</strong>
                      <span className="text-slate-600">
                        Linux / Unix environments, Git, SQLite, Prisma ORM, CMake, Bun
                      </span>
                    </div>
                  </div>
                </div>

                {/* Projects (Active Prototyping) */}
                <div>
                  <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-3">
                    Featured Engineering Projects (Active Development)
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-950">
                        <span className="font-display text-sm">OVERRUN: Autonomous Academic Command Center</span>
                        <span className="font-mono-code text-[11px] text-emerald-800">Next.js 15 • React 19 • Prisma • SQLite</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Offline-first academic operating system designed for engineering students combining a Loss-Aversion Time Bank currency engine with zero-token Obsidian vault syncing.
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                        <li>Loss-Aversion Time Bank calculates real-time time surpluses/debts and XP rewards based on planned vs actual focus sessions.</li>
                        <li>Zero-Token Vault Sync directly scans local Obsidian Markdown vaults & YAML frontmatter into SQLite at $0 LLM token cost.</li>
                        <li>Hierarchical subject mapping across 9 engineering courses with NotebookLM quiz gap routing and automated EOD markdown logs.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-950">
                        <span className="font-display text-sm">Resonance (reso): Content-Addressable Version Control System</span>
                        <span className="font-mono-code text-[11px] text-emerald-800">C • POSIX/Linux • CMake • SHA-1</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        From-scratch Git clone in C architecturally modeled on Git's internal object store and commit DAG.
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                        <li>Object database (.reso/objects/): SHA-1 content-addressed, zlib-compressed objects stored in fan-out format for blobs, trees, and commits.</li>
                        <li>Full write-path command dispatcher: setup (init), hash-object, stage (add), snapshot (commit), and status reporting.</li>
                        <li>Active roadmap: tree checkout/restore, explicit branching (reso branch), commit DAG history walker (log), and diff engine.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Campus Initiatives & Coordination */}
                <div>
                  <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-3">
                    Campus Initiatives & Coordination
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-950">
                        <span>Web Team Coordinator (1 of 8): MindSpark '26</span>
                        <span className="font-mono-code text-[11px] text-emerald-800">Annual National Technical Fest</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Contributed UI/UX design suggestions, architectural planning, and inter-team coordination for COEP Tech's national technical festival as one of 8 coordinators.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-950">
                        <span>Web Team Coordinator (1 of 8): Pune Startup Fest '27</span>
                        <span className="font-mono-code text-[11px] text-emerald-800">Flagship Entrepreneurship Fest</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Coordinating digital asset planning, user experience flow, and web delivery as one of 8 coordinators for the fest. (Also served as Web Team Volunteer for PSF '26).
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-950">
                        <span>Technical Speaker & Mentor (Freelanced): Devadhar Classes</span>
                        <span className="font-mono-code text-[11px] text-emerald-800">Academic Mentorship</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Designed and conducted an interactive bridge workshop for 11th and 12th-grade students on AI ↔ Mathematics, explaining connections from linear algebra and calculus to AI systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Coursework */}
                <div>
                  <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2">
                    Key Coursework & Fundamentals
                  </h3>
                  <p className="text-slate-700">
                    Signals and Systems • Numerical Methods in Computer Programming (MATLAB) • Python Programming • Analog Electronics & Circuit Analysis • Web Design Fundamentals
                  </p>
                </div>
              </div>

              {/* Watermark Seal */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Candidate Dossier: COEP Technological University</span>
                </span>
                <span>One-Click Outreach & Referral Kit</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
