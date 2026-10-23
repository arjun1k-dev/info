import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Github, Linkedin, Mail, ArrowDown, ArrowUpRight, Search } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { TechLogo } from './TechLogos';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenTranscript: () => void;
  onOpenCommandPalette: () => void;
}

const SINE_PATH =
  'M0,45 Q25,5 50,45 T100,45 T150,45 T200,45 T250,45 T300,45 T350,45 T400,45 T450,45 T500,45 T550,45 T600,45';

const techStack = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js',
  'Next.js', 'Node.js', 'C/C++', 'Python', 'Git',
];

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenTranscript, onOpenCommandPalette }) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  return (
    <section className="pt-10 pb-12 px-6 md:px-10 max-w-7xl mx-auto w-full" id="hero">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left: boot sequence → headline → actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* boot line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 font-mono-code text-[11px] tracking-wider text-[var(--ink-dim)]"
          >
            <span>
              <span className="text-[var(--phosphor)]">$</span> whoami
            </span>
            <span className="text-[var(--ink-faint)]">→</span>
            <span className="text-[var(--ink)] uppercase">software &amp; backend developer</span>
            <span className="w-1.5 h-1.5 bg-[var(--phosphor)] scope-pulse inline-block" />
            <button
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] transition-all cursor-pointer"
            >
              <Search className="w-3 h-3" />
              <span>⌘K INDEX</span>
            </button>
          </motion.div>

          {/* headline */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-[var(--ink)] leading-[1.05] uppercase">
              Arjun <span className="text-[var(--phosphor)] text-glow">Korlekar</span>
              <br />
              <span className="text-[var(--ink-dim)] text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold">
                builds systems
              </span>{' '}
              <span className="text-[var(--amber)]">that work.</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink-dim)] max-w-2xl leading-relaxed font-normal">
              EE undergrad at{' '}
              <a
                href={PORTFOLIO_INFO.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--ink)] underline decoration-[var(--phosphor)] decoration-2 underline-offset-4 hover:text-[var(--phosphor)] transition-colors"
              >
                COEP Technological University
              </a>
              . I write C, Python and TypeScript — not to pad a resume, but because I want to
              control what happens, not just use what exists. Most of what I build started as a
              tool for a problem I personally had.
            </p>
          </div>

          {/* actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="btn-scope px-6 py-3.5 bg-[var(--phosphor)] hover:bg-[var(--phosphor-bright)] text-[#04120b] font-bold text-xs shadow-[0_0_24px_-6px_var(--phosphor)] cursor-pointer flex items-center gap-2"
            >
              <span>View Work</span>
              <ArrowDown className="w-4 h-4" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenTranscript}
              className="btn-scope px-5 py-3.5 border border-[var(--hairline)] bg-[var(--bg-raised)] hover:border-[var(--phosphor)] text-[var(--ink)] text-xs cursor-pointer flex items-center gap-2"
            >
              <span>Transcript.pdf</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--phosphor)]" />
            </motion.button>

            <div className="flex items-center gap-1 ml-1">
              {[
                { icon: Github, href: PORTFOLIO_INFO.githubUrl, title: 'GitHub' },
                { icon: Linkedin, href: PORTFOLIO_INFO.linkedinUrl, title: 'LinkedIn' },
                { icon: Mail, href: PORTFOLIO_INFO.mailtoLink, title: 'Email' },
              ].map(({ icon: Icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  title={title}
                  className="p-2.5 text-[var(--ink-faint)] hover:text-[var(--phosphor)] border border-transparent hover:border-[var(--hairline)] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* tech registry */}
          <div className="pt-3 space-y-3">
            <span className="font-mono-code text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--ink-faint)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--phosphor)] inline-block" />
              toolchain registry
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + index * 0.045, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="px-2.5 py-1.5 border border-[var(--hairline)] bg-[var(--bg-raised)] font-mono-code text-[11px] font-medium text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] transition-colors flex items-center gap-1.5 cursor-default"
                >
                  <TechLogo name={tech} className="w-3.5 h-3.5 shrink-0" />
                  <span>{tech === 'C/C++' ? 'C · C++' : tech.replace('.js', '')}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: portrait screen and circular frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center pt-4 lg:pt-0"
        >
          <div className="w-full max-w-sm corners">
            {/* scope bezel header */}
            <div className="flex items-center justify-between px-3 py-1.5 border border-[var(--hairline)] border-b-0 bg-[var(--bg-raised)] font-mono-code text-[10px] tracking-widest text-[var(--ink-faint)] uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[var(--phosphor)] scope-pulse" />
                CH1 · portrait.sys
              </span>
              <span>TRIG · AUTO</span>
            </div>

            {/* screen */}
            <div className="relative border border-[var(--hairline)] bg-[var(--bg-raised)] p-3">
              <div className="relative aspect-square overflow-hidden bg-[#071410] corners">
                {imgLoaded ? (
                  <img
                    src={PORTFOLIO_INFO.portraitUrl}
                    alt="Arjun Korlekar Portrait"
                    onError={() => setImgLoaded(false)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[var(--phosphor)] p-6 bg-[#071410]">
                    <Cpu className="w-14 h-14 mb-3 opacity-70" />
                    <span className="font-display font-bold text-xl uppercase">{PORTFOLIO_INFO.name}</span>
                    <span className="text-xs font-mono-code opacity-60 mt-1">COEP TECH '29</span>
                  </div>
                )}
                {/* phosphor scanline film over the screen */}
                <div className="absolute inset-0 pointer-events-none scanlines opacity-60" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#03110b]/70 via-transparent to-transparent" />
              </div>
            </div>

            {/* scope trace readout */}
            <div className="relative border border-[var(--hairline)] border-t-0 bg-[var(--bg-raised)] px-3 pt-2 pb-1 overflow-hidden">
              <svg viewBox="0 0 600 90" className="w-full h-12" preserveAspectRatio="none" aria-hidden>
                <line x1="0" y1="45" x2="600" y2="45" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="4 6" />
                <path
                  d={SINE_PATH}
                  transform="translate(0,0)"
                  fill="none"
                  stroke="var(--amber)"
                  strokeWidth="1.25"
                  opacity="0.4"
                />
                <path
                  d={SINE_PATH}
                  fill="none"
                  stroke="var(--phosphor)"
                  strokeWidth="1.75"
                  className="trace-draw"
                  style={{ filter: 'drop-shadow(0 0 4px var(--phosphor))' }}
                />
              </svg>
              <div className="flex items-center justify-between font-mono-code text-[9px] tracking-widest text-[var(--ink-faint)] uppercase pb-1">
                <span>1.00v/div · 2.5ms/div</span>
                <span className="text-[var(--phosphor)]">CGPA 7.32 · LOCK ✓</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
