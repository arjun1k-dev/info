import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Terminal, Menu, X, ArrowUpRight, Search, Sun, Moon } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenPdfSpec: () => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPdfSpec,
  onOpenTerminal,
  onOpenCommandPalette,
  isDarkMode,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'home', href: '#hero' },
    { label: 'about', href: '#about' },
    { label: 'skills', href: '#telemetry-matrix' },
    { label: 'projects', href: '#projects' },
    { label: 'academics', href: '#academics' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'glass-nav border-[var(--hairline)] shadow-[0_1px_24px_-8px_rgba(0,0,0,0.4)]'
          : 'glass-nav border-transparent'
      }`}
    >
      {/* Status strip */}
      <div className="border-b border-[var(--hairline)] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-6 flex items-center justify-between font-mono-code text-[10px] tracking-wider text-[var(--ink-faint)]">
          <div className="flex items-center gap-4">
            <span>SESSION: <span className="text-[var(--phosphor)]">ACTIVE</span></span>
            <span className="hidden lg:inline">HOST: coep.ac.in</span>
            <span className="hidden lg:inline">SHELL: /bin/zsh</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline">EE · B.TECH '29</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[var(--phosphor)] scope-pulse" />
              {PORTFOLIO_INFO.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-3">
        {/* Brand: shell prompt */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#hero" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 font-mono-code text-base sm:text-lg font-semibold tracking-tight text-[var(--ink)]"
            >
              <span className="w-7 h-7 flex items-center justify-center border border-[var(--phosphor)] text-[var(--phosphor)] text-xs font-bold corners">
                AK
              </span>
              <span className="hidden sm:inline">
                <span className="text-[var(--ink-faint)]">arjun@coep</span>
                <span className="text-[var(--ink-faint)]">:~</span>
                <span className="text-[var(--phosphor)]">$</span>
                <span className="inline-block w-2 h-4 ml-1.5 align-middle bg-[var(--phosphor)] blink" />
              </span>
            </motion.div>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center border border-[var(--hairline)] glass-card font-mono-code text-xs">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-2 text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:bg-[var(--phosphor-soft)] transition-all duration-200 tracking-wider uppercase ${
                i !== navLinks.length - 1 ? 'border-r border-[var(--hairline)]' : ''
              }`}
            >
              <span className="text-[var(--phosphor)] mr-1">./</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Cmd+K Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-2 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] font-mono-code text-xs transition-all cursor-pointer"
            title="Open Command Palette (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">⌘K</span>
          </button>

          {/* CLI Sandbox Button */}
          <button
            onClick={onOpenTerminal}
            className="p-2 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] transition-all cursor-pointer"
            title="Launch Terminal CLI Sandbox"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--amber)] hover:border-[var(--amber)] transition-all cursor-pointer"
            title={isDarkMode ? 'Blueprint mode' : 'Phosphor mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Right CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenPdfSpec}
            className="px-4 sm:px-5 py-2 bg-[var(--phosphor)] hover:bg-[var(--phosphor-bright)] text-[#04120b] font-mono-code text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="hidden sm:inline">Hire Me</span>
            <span className="sm:hidden">CV</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--ink)] hover:text-[var(--phosphor)] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-b border-[var(--hairline)] px-6 py-4 flex flex-col gap-1 font-mono-code"
          >
            <div className="flex items-center gap-2 px-3 py-2 mb-2 border border-[var(--hairline)] bg-[var(--phosphor-soft)] text-[10px] text-[var(--ink-dim)] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-[var(--phosphor)] scope-pulse" />
              <span>{PORTFOLIO_INFO.status}</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="py-2.5 px-3 mb-2 text-[var(--ink)] text-xs bg-[var(--bg-raised)] border border-[var(--hairline)] flex items-center justify-between hover:border-[var(--phosphor)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--phosphor)]" />
                <span>Search Index</span>
              </div>
              <span className="px-1.5 border border-[var(--hairline)] text-[10px] text-[var(--ink-dim)]">⌘K</span>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-[var(--ink-dim)] hover:text-[var(--phosphor)] text-sm flex items-center justify-between border-b border-[var(--hairline)]/60 transition-colors"
              >
                <span><span className="text-[var(--phosphor)] mr-1.5">./</span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}

            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex-1 py-2.5 px-3 bg-[var(--bg-raised)] text-[var(--ink)] text-xs flex items-center justify-center gap-2 border border-[var(--hairline)] hover:border-[var(--phosphor)] transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-[var(--phosphor)]" />
                <span>Sandbox CLI</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPdfSpec();
                }}
                className="flex-1 py-2.5 px-3 bg-[var(--phosphor)] text-[#04120b] text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Referral Spec</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
