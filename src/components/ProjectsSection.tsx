import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Info,
  GitBranch,
  Terminal,
  Clock,
  FileCode2,
  FolderGit2,
  CheckCircle2,
  Github,
} from 'lucide-react';
import { OVERRUN_MODULES, RESONANCE_COMMANDS } from '../data/portfolioData';
import { TechLogo } from './TechLogos';

interface ProjectsSectionProps {
  onOpenSpecModal: (projectId: 'overrun' | 'resonance') => void;
  onOpenTerminal: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenSpecModal,
  onOpenTerminal,
}) => {
  const [selectedOverrunModule, setSelectedOverrunModule] = useState<string | null>(null);
  const [selectedResoCmd, setSelectedResoCmd] = useState<string | null>(null);

  const activeOverrunModule = OVERRUN_MODULES.find((m) => m.id === selectedOverrunModule);
  const activeResoCmd = RESONANCE_COMMANDS.find((c) => c.cmd === selectedResoCmd);

  return (
    <section className="py-14 px-6 md:px-10 max-w-7xl mx-auto w-full" id="projects">
      <div className="space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200 w-fit font-mono-code font-bold text-[11px] uppercase tracking-wider">
            <span>FEATURED PROJECTS</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Some of My Recent Work
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Two systems I built because the existing tools annoyed me. Click any module or command to inspect how it works under the hood — that's the whole point.
          </p>
        </motion.div>

        {/* 2 Columns Grid with Animated Borders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Card 1: OVERRUN with Animated Border */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="animated-border-blue rounded-sm p-8 md:p-10 shadow-2xl flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-6">
              {/* Card Top Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono-code text-sm font-black px-3 py-1 rounded-sm bg-blue-700 text-white shadow-xs">
                    01
                  </span>
                  <div>
                    <span className="font-mono-code text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Full-Stack Academic OS</span>
                    </span>
                    <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">OVERRUN</h3>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 font-mono-code text-[11px] font-bold text-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-800">
                  PROTOTYPE
                </span>
              </div>

              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Offline-first academic OS I built for myself. Study time converts to currency — finish early, bank minutes; skip, and the{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">Time Debt</strong> sits right there on screen. Obsidian vault sync runs fully local, so it costs{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">$0 in tokens</strong>. Quiz gaps route straight into revision tasks.
              </p>

              {/* Interactive Module Ingestion Grid */}
              <div className="p-5 rounded-sm bg-slate-100 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 font-mono-code text-xs space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                    <span>System Architecture Modules</span>
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal normal-case">
                    (Click module to inspect logic)
                  </span>
                </div>

                {/* 4 Interactive Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                  {OVERRUN_MODULES.map((mod) => (
                    <motion.button
                      key={mod.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setSelectedOverrunModule(selectedOverrunModule === mod.id ? null : mod.id)
                      }
                      className={`p-2.5 rounded-sm border-2 transition-all text-left flex flex-col justify-between cursor-pointer relative ${
                        selectedOverrunModule === mod.id
                          ? 'bg-blue-700 text-white border-blue-900 shadow-md ring-2 ring-blue-400/50'
                          : 'bg-[var(--bg-raised)] border-slate-300 dark:border-slate-800 hover:border-blue-400 text-slate-900 dark:text-slate-100 shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-bold truncate">{mod.name}</div>
                        <div
                          className={`text-[9px] mt-0.5 truncate ${
                            selectedOverrunModule === mod.id ? 'text-blue-200' : 'text-blue-700 dark:text-blue-400'
                          }`}
                        >
                          {mod.sub}
                        </div>
                      </div>
                      <div
                        className={`text-[9px] font-mono-code font-semibold mt-2 pt-1 border-t ${
                          selectedOverrunModule === mod.id
                            ? 'border-blue-500 text-blue-100'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {mod.metric}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Active module expansion */}
                <AnimatePresence>
                  {activeOverrunModule && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded-sm bg-[var(--bg-raised)] border-2 border-slate-300 dark:border-slate-800 shadow-xs text-xs space-y-2 overflow-hidden"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span className="flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                          <span>{activeOverrunModule.name} Module</span>
                        </span>
                        <span className="text-[10px] text-blue-900 dark:text-blue-200 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded font-mono-code">
                          {activeOverrunModule.metric}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-normal">
                        {activeOverrunModule.desc}
                      </p>
                      <pre className="p-2.5 rounded-sm bg-slate-900 text-blue-300 text-[10px] overflow-x-auto font-mono-code border border-slate-800">
                        <code>{activeOverrunModule.code}</code>
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Metric Summary Row */}
                <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 gap-2">
                  <span>
                    Sync Cost: <strong className="text-slate-900 dark:text-slate-100 font-bold">$0 Token Ingestion</strong>
                  </span>
                  <span>
                    Storage: <strong className="text-blue-700 dark:text-blue-400 font-bold">SQLite + Prisma</strong>
                  </span>
                  <span>
                    Runtime: <strong className="text-blue-700 dark:text-blue-400 font-bold">Next.js 15 & Bun</strong>
                  </span>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <span className="font-mono-code text-[11px] uppercase font-bold text-slate-900 dark:text-slate-200 tracking-wider">
                  Key Technical Features:
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside font-normal">
                  <li>
                    <strong>Loss-Aversion Time Bank:</strong> Completing tasks early banks minutes; overtime/skipping incurs visible <em>Time Debt</em> indicators and XP deductions.
                  </li>
                  <li>
                    <strong>Zero-Token Obsidian Sync:</strong> Scans local Markdown vaults and YAML frontmatter via Web File System Access API directly into local SQLite at zero token cost.
                  </li>
                  <li>
                    <strong>Syllabus Telemetry & Quiz Routing:</strong> Maps weightages across 9 core engineering subjects and routes NotebookLM quiz gaps into targeted revision tasks.
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Pills & Action */}
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-mono-code text-xs font-bold border border-blue-300 dark:border-blue-800 flex items-center gap-1.5">
                  <TechLogo name="Next.js" className="w-4 h-4 shrink-0" />
                  <span>Next.js 15</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 font-mono-code text-xs font-bold border border-teal-300 dark:border-teal-800 flex items-center gap-1.5">
                  <TechLogo name="React" className="w-4 h-4 shrink-0" />
                  <span>React 19</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-mono-code text-xs font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                  <TechLogo name="Prisma" className="w-4 h-4 shrink-0" />
                  <span>Prisma / SQLite</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-mono-code text-xs font-bold border border-amber-300 dark:border-amber-800 flex items-center gap-1.5">
                  <TechLogo name="TypeScript" className="w-4 h-4 shrink-0" />
                  <span>TypeScript</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/arjun1k-dev/overrun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-code text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>arjun1k-dev/overrun</span>
                </a>
                <button
                  onClick={() => onOpenSpecModal('overrun')}
                  className="font-mono-code text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Inspect OVERRUN Spec</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Resonance (reso) with Animated Border */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="animated-border rounded-sm p-8 md:p-10 shadow-2xl flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-6">
              {/* Card Top Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono-code text-sm font-black px-3 py-1 rounded-sm bg-emerald-700 text-white shadow-xs">
                    02
                  </span>
                  <div>
                    <span className="font-mono-code text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>C Systems Programming</span>
                    </span>
                    <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Resonance (reso)</h3>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 font-mono-code text-[11px] font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  GIT CLONE IN C
                </span>
              </div>

              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                I didn't want to just use git — I wanted to know how it works. So I rebuilt the core in C (CMake, POSIX/Linux):{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">SHA-1 content-addressed object store</strong>, zlib fan-out compression, a staging index, and a commit DAG — with its own command surface and (<code className="font-mono-code bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-900 dark:text-emerald-200 font-bold">.reso/</code>) layout.
              </p>

              {/* Visual Command Surface Table */}
              <div className="p-5 rounded-sm bg-slate-100 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 font-mono-code text-xs space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Command Dispatch Pipeline</span>
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold normal-case">
                    (Click command to inspect)
                  </span>
                </div>

                {/* Commands Grid */}
                <div className="grid grid-cols-5 gap-1.5 text-center font-mono-code text-[11px] font-semibold pt-1">
                  {RESONANCE_COMMANDS.map((c) => {
                    const isSelected = selectedResoCmd === c.cmd;
                    return (
                      <motion.button
                        key={c.cmd}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedResoCmd(isSelected ? null : c.cmd)}
                        className={`p-2 rounded-sm border-2 transition-all flex flex-col justify-center items-center cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-700 text-white border-emerald-900 shadow-md ring-2 ring-emerald-400/50'
                            : 'bg-[var(--bg-raised)] text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-800 hover:border-emerald-400 shadow-xs'
                        }`}
                      >
                        <span className="font-bold">{c.cmd}</span>
                        <span
                          className={`text-[8px] mt-0.5 truncate ${
                            isSelected ? 'text-emerald-200' : 'text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          {c.gitEquiv}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Active command inspection drawer */}
                <AnimatePresence>
                  {activeResoCmd && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded-sm bg-[var(--bg-raised)] border-2 border-slate-300 dark:border-slate-800 shadow-xs text-xs space-y-1.5 overflow-hidden"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          <span>reso {activeResoCmd.cmd}</span>
                        </span>
                        <span className="font-mono-code text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded">
                          {activeResoCmd.file} (Git: {activeResoCmd.gitEquiv})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                        {activeResoCmd.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Object store metrics */}
                <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 gap-2">
                  <span>
                    Object Store: <strong className="text-slate-900 dark:text-slate-100 font-bold">.reso/objects/ (SHA-1)</strong>
                  </span>
                  <span>
                    Compression: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">zlib fan-out</strong>
                  </span>
                  <span>
                    History: <strong className="text-blue-700 dark:text-blue-400 font-bold">Linked DAG commits</strong>
                  </span>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <span className="font-mono-code text-[11px] uppercase font-bold text-slate-900 dark:text-slate-200 tracking-wider">
                  Architecture & Object Model:
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside font-normal">
                  <li>
                    <strong>Content-Addressed Storage:</strong> SHA-1 hashed, zlib-compressed objects stored in Git's two-character fan-out scheme (<code className="font-mono-code bg-emerald-100 dark:bg-emerald-950 px-1 py-0.5 rounded text-emerald-900 dark:text-emerald-200 font-bold">objects/xx/rest</code>) across three object primitives: <code className="font-mono-code">blob</code>, <code className="font-mono-code">tree</code>, and <code className="font-mono-code">commit</code>.
                  </li>
                  <li>
                    <strong>Clean Write Path:</strong> Staging maps files into a flat index, and <code className="font-mono-code">snapshot</code> builds tree structures, wraps headers, resolves parent via <code className="font-mono-code">HEAD</code>, and advances the branch pointer.
                  </li>
                  <li>
                    <strong>Active Roadmap:</strong> Branching (<code className="font-mono-code">reso branch</code>), history DAG inspection (<code className="font-mono-code">log</code>), tree checkout/restore, and diff engine.
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Pills & Action */}
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-mono-code text-xs font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                  <TechLogo name="C" className="w-4 h-4 shrink-0" />
                  <span>C Language</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-mono-code text-xs font-bold border border-blue-300 dark:border-blue-800 flex items-center gap-1.5">
                  <TechLogo name="Linux" className="w-4 h-4 shrink-0" />
                  <span>POSIX / Linux</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-mono-code text-xs font-bold border border-amber-300 dark:border-amber-800 flex items-center gap-1.5">
                  <TechLogo name="CMake" className="w-4 h-4 shrink-0" />
                  <span>CMake</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 font-mono-code text-xs font-bold border border-teal-300 dark:border-teal-800 flex items-center gap-1.5">
                  <TechLogo name="Git" className="w-4 h-4 shrink-0" />
                  <span>SHA-1 / zlib VCS</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/arjun1k-dev/resonance-vcs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-code text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>arjun1k-dev/resonance-vcs</span>
                </a>
                <button
                  onClick={() => onOpenSpecModal('resonance')}
                  className="font-mono-code text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Inspect Resonance Spec</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
