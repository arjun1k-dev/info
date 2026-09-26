import React from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Code2,
  Smile,
  Trophy,
  User,
  GraduationCap,
} from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { MagicBento } from './MagicBento';

interface AboutSectionProps {
  onOpenTerminal: () => void;
  onOpenTranscript: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenTerminal, onOpenTranscript }) => {
  const stats = [
    {
      value: '7.32',
      label: 'Academic CGPA',
      sub: 'COEP EE (+0.55 Delta)',
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
    },
    {
      value: '4+',
      label: 'Projects Completed',
      sub: 'OVERRUN, Resonance & Systems',
      icon: Code2,
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    },
    {
      value: '96%',
      label: 'Telemetry Match',
      sub: 'Backend & Systems Rigor',
      icon: Smile,
      color: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
    },
    {
      value: '3+',
      label: 'Leadership Roles',
      sub: 'MindSpark & PSF Web Lead',
      icon: Trophy,
      color: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    },
  ];

  return (
    <section className="py-14 px-6 md:px-10 max-w-7xl mx-auto w-full" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column (6 Cols): About Me Story */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200 w-fit shadow-xs font-mono-code font-bold text-[11px] uppercase tracking-wider">
            <span>ABOUT ME</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            I don't like black boxes. So I take systems apart and rebuild them.
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            EE undergrad at{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">COEP Technological University</strong> (2025-2029). I write backend systems, developer tools, and whatever removes friction from my own workflow — because using a tool without understanding it never sits right with me.
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Built <em>OVERRUN</em> because I procrastinate and wanted the cost to be visible. Rebuilt git's core in C (<em>Resonance</em>) because I wanted to know how it actually works. Run web teams for national fests because deadlines are real and shipping is the only proof.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenTerminal}
              className="px-7 py-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-display text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Learn More About Me</span>
              <User className="w-4 h-4 text-blue-200" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column (6 Cols): 2x2 Metric Cards Grid with Animated Borders */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className="animated-border rounded-sm p-6 shadow-lg flex flex-col justify-between gap-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-sm border ${stat.color} shadow-xs`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-mono-code text-[11px] uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="font-display text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-display text-sm font-bold text-blue-900 dark:text-blue-200 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="font-mono-code text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Light Theme Bento Grid Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 space-y-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200 font-mono-code font-bold text-[11px] uppercase tracking-wider">
            <span>INTERACTIVE BENTO GRID</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            The Stack, Mapped
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-normal">
            Hover and click the cards — the grid reacts. Everything here is something I've actually built with, not just installed.
          </p>
        </div>

        <MagicBento enableStars={true} enableSpotlight={true} enableTilt={true} clickEffect={true} enableMagnetism={true} />
      </motion.div>
    </section>
  );
};
