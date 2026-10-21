import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TelemetryMatrix } from './components/TelemetryMatrix';
import { ProjectsSection } from './components/ProjectsSection';
import { AcademicsSection } from './components/AcademicsSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { PdfSpecModal } from './components/PdfSpecModal';
import { TranscriptModal } from './components/TranscriptModal';
import { ProjectSpecModal } from './components/ProjectSpecModal';
import { PgpModal } from './components/PgpModal';
import { CommandPalette } from './components/CommandPalette';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPdfSpecOpen, setIsPdfSpecOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isPgpOpen, setIsPgpOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [specModalProjectId, setSpecModalProjectId] = useState<'overrun' | 'resonance' | 'mathoxide' | null>(null);

  // Theme Management (Phosphor bench dark by default; light = blueprint paper)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ak_theme') !== 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('ak_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('ak_theme', 'light');
    }
  }, [isDarkMode]);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)] antialiased relative overflow-x-hidden min-h-screen transition-colors duration-300">
      {/* Bench Backdrop: blueprint grid + CRT scanlines + grain + tube vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dot-pattern" />
      <div className="fixed inset-0 pointer-events-none z-0 scanlines" />
      <div className="fixed inset-0 pointer-events-none z-0 noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 vignette" />
      {/* Bench edge ruler marks */}
      <div className="fixed left-3 top-1/2 -translate-y-1/2 z-0 hidden xl:flex flex-col gap-6 pointer-events-none select-none" aria-hidden>
        {['40', '30', '20', '10', '00'].map((m) => (
          <span key={m} className="font-mono-code text-[9px] tracking-widest text-[var(--ink-faint)]">{m}</span>
        ))}
      </div>
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-0 hidden xl:flex flex-col items-end gap-6 pointer-events-none select-none" aria-hidden>
        {['CH1', 'CH2', 'TRG', 'RUN'].map((m) => (
          <span key={m} className="font-mono-code text-[9px] tracking-widest text-[var(--ink-faint)]">{m}</span>
        ))}
      </div>

      {/* 1. Header / Navbar */}
      <Navbar
        onOpenPdfSpec={() => setIsPdfSpecOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Layout */}
      <main className="pt-24 relative z-10 w-full flex flex-col gap-16 md:gap-20">
        {/* 2. Hero Section */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenTranscript={() => setIsTranscriptOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* 3. About Me & 2x2 Metric Stats Grid */}
        <AboutSection
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenTranscript={() => setIsTranscriptOpen(true)}
        />

        {/* 4. Skills & Telemetry Matrix */}
        <TelemetryMatrix onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 5. Featured Projects */}
        <ProjectsSection
          onOpenSpecModal={(id) => setSpecModalProjectId(id)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* 6. Academic Progression & Leadership Timeline */}
        <AcademicsSection onOpenTranscript={() => setIsTranscriptOpen(true)} />

        {/* 7. Footer Call-to-Action & Telemetry Bar */}
        <Footer
          onOpenPdfSpec={() => setIsPdfSpecOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenPgpModal={() => setIsPgpOpen(true)}
        />
      </main>

      {/* Modals & Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenPdfSpec={() => setIsPdfSpecOpen(true)}
        onOpenTranscript={() => setIsTranscriptOpen(true)}
        onOpenProjectSpec={(id) => setSpecModalProjectId(id)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <PdfSpecModal
        isOpen={isPdfSpecOpen}
        onClose={() => setIsPdfSpecOpen(false)}
      />

      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
      />

      <ProjectSpecModal
        projectId={specModalProjectId}
        onClose={() => setSpecModalProjectId(null)}
        onOpenTerminal={() => {
          setSpecModalProjectId(null);
          setIsTerminalOpen(true);
        }}
      />

      <PgpModal
        isOpen={isPgpOpen}
        onClose={() => setIsPgpOpen(false)}
      />
    </div>
  );
}
