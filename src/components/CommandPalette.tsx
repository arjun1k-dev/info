import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, FileText, Cpu, Zap, GraduationCap, Mail, Github, Linkedin, Moon, Sun, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenPdfSpec: () => void;
  onOpenTranscript: () => void;
  onOpenProjectSpec: (id: 'overrun' | 'resonance') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

interface PaletteAction {
  id: string;
  category: 'Projects & Demos' | 'Actions & Tools' | 'Academics & Dossier' | 'Connect';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenPdfSpec,
  onOpenTranscript,
  onOpenProjectSpec,
  isDarkMode,
  onToggleTheme,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: PaletteAction[] = [
    {
      id: 'proj-overrun',
      category: 'Projects & Demos',
      title: 'OVERRUN: Loss-Aversion Time Bank & Command Center',
      subtitle: 'Next.js 15, Prisma, SQLite, Obsidian Vault Scanner & Syllabus Telemetry',
      icon: <Zap className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onClose();
        onOpenProjectSpec('overrun');
      },
      shortcut: '1',
    },
    {
      id: 'proj-resonance',
      category: 'Projects & Demos',
      title: 'Resonance (`reso`): Content-Addressable VCS in C',
      subtitle: 'From-scratch Git clone in C: SHA-1 fan-out, zlib compression, commit DAG',
      icon: <Cpu className="w-4 h-4 text-teal-500" />,
      action: () => {
        onClose();
        onOpenProjectSpec('resonance');
      },
      shortcut: '2',
    },
    {
      id: 'tool-terminal',
      category: 'Actions & Tools',
      title: 'Launch Architecture Sandbox CLI',
      subtitle: 'Interactive in-browser CLI terminal for C VCS & OVERRUN subcommands',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenTerminal();
      },
      shortcut: 'CLI',
    },
    {
      id: 'tool-theme',
      category: 'Actions & Tools',
      title: isDarkMode ? 'Switch to Deep Emerald Light Mode' : 'Switch to Deep Emerald Dark Mode',
      subtitle: 'Toggle global color palette & high-contrast theme',
      icon: isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onToggleTheme();
        onClose();
      },
      shortcut: 'T',
    },
    {
      id: 'dossier-pdf',
      category: 'Academics & Dossier',
      title: 'Open 1-Click Referral Kit & Dossier Spec',
      subtitle: 'Formatted executive summary & direct candidate referral spec',
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onClose();
        onOpenPdfSpec();
      },
      shortcut: 'PDF',
    },
    {
      id: 'dossier-transcript',
      category: 'Academics & Dossier',
      title: 'COEP Academic Transcript & SGPA Acceleration (+0.55)',
      subtitle: 'Detailed semester breakdown, credits, and verified COEP EE coursework',
      icon: <GraduationCap className="w-4 h-4 text-cyan-500" />,
      action: () => {
        onClose();
        onOpenTranscript();
      },
      shortcut: 'COEP',
    },
    {
      id: 'connect-email',
      category: 'Connect',
      title: 'Direct Referral Email (arjun1k.dev@gmail.com)',
      subtitle: 'Open mailto link pre-filled with Software & Backend internship subject',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.open(PORTFOLIO_INFO.mailtoLink, '_blank');
        onClose();
      },
    },
    {
      id: 'connect-github',
      category: 'Connect',
      title: 'GitHub Profile (github.com/arjun1k-dev)',
      subtitle: 'View repositories, commit graphs, and C/TypeScript codebases',
      icon: <Github className="w-4 h-4 text-slate-300" />,
      action: () => {
        window.open(PORTFOLIO_INFO.githubUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'connect-linkedin',
      category: 'Connect',
      title: 'LinkedIn Profile (linkedin.com/in/arjun1k-dev)',
      subtitle: 'Professional profile, engineering network & updates',
      icon: <Linkedin className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.open(PORTFOLIO_INFO.linkedinUrl, '_blank');
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#041914] text-[#e2f1ec] rounded-sm border border-emerald-700/50 shadow-2xl overflow-hidden z-10 font-geist"
        >
          {/* Search Header Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-emerald-900/80 gap-3">
            <Search className="w-5 h-5 text-emerald-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, CLI commands, coursework, dossier..."
              className="w-full bg-transparent text-emerald-100 placeholder-emerald-500/70 focus:outline-none font-geist text-sm sm:text-base font-medium"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1 font-geist">
            {filteredActions.length === 0 ? (
              <div className="py-12 text-center text-emerald-400/60 font-mono-code text-xs">
                No matching results found for "{query}"
              </div>
            ) : (
              filteredActions.map((action, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={action.id}
                    onClick={action.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3.5 py-3 rounded-sm flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-900/70 text-white border border-emerald-500/40 shadow-xs'
                        : 'text-emerald-200/90 hover:bg-emerald-950/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? 'bg-emerald-950 border border-emerald-400/30' : 'bg-[#020e0c]'
                      }`}>
                        {action.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs sm:text-sm truncate">
                            {action.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-400/70 truncate font-mono-code">
                          {action.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {action.shortcut && (
                        <span className="px-2 py-0.5 rounded bg-[#020e0c] border border-emerald-900 text-[10px] font-mono-code text-emerald-400 font-bold">
                          {action.shortcut}
                        </span>
                      )}
                      <CornerDownLeft className={`w-3.5 h-3.5 transition-opacity ${
                        isSelected ? 'opacity-100 text-emerald-400' : 'opacity-0'
                      }`} />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Command Palette Footer */}
          <div className="px-4 py-2.5 bg-[#020e0c] border-t border-emerald-900/80 flex items-center justify-between text-[11px] font-mono-code text-emerald-400/70">
            <div className="flex items-center gap-3">
              <span><kbd className="bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300">↑↓</kbd> navigate</span>
              <span><kbd className="bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300">↵</kbd> select</span>
              <span><kbd className="bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300">esc</kbd> close</span>
            </div>
            <span className="hidden sm:inline text-emerald-400/50">Arjun Korlekar Portfolio Command Palette</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
