import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gauge,
  Network,
  Cpu,
  Calculator,
  Play,
  CheckCircle2,
  Terminal as TerminalIcon,
  Sparkles,
} from 'lucide-react';
import { FocusTab } from '../types';
import { TELEMETRY_TABS_DATA } from '../data/portfolioData';
import { TechLogo } from './TechLogos';

interface TelemetryMatrixProps {
  onOpenTerminal: () => void;
}

export const TelemetryMatrix: React.FC<TelemetryMatrixProps> = ({ onOpenTerminal }) => {
  const [activeTab, setActiveTab] = useState<FocusTab>('backend');
  const [pingState, setPingState] = useState<'idle' | 'running' | 'done'>('idle');
  const [pingResult, setPingResult] = useState<{
    latency: string;
    bytes: number;
    jitter: string;
    timestamp: string;
  } | null>(null);

  const currentData = TELEMETRY_TABS_DATA[activeTab];

  const handlePingTest = () => {
    if (pingState === 'running') return;
    setPingState('running');
    setPingResult(null);

    const latencies = ['0.14ms', '0.18ms', '0.16ms', '0.12ms', '0.19ms'];
    const jitters = ['±0.02ms', '±0.03ms', '±0.01ms'];
    const selectedLatency = latencies[Math.floor(Math.random() * latencies.length)];
    const selectedJitter = jitters[Math.floor(Math.random() * jitters.length)];

    setTimeout(() => {
      setPingResult({
        latency: selectedLatency,
        bytes: 1024,
        jitter: selectedJitter,
        timestamp: new Date().toLocaleTimeString(),
      });
      setPingState('done');
      setTimeout(() => {
        setPingState('idle');
      }, 5000);
    }, 650);
  };

  return (
    <section className="py-14 px-6 md:px-10 max-w-7xl mx-auto w-full" id="telemetry-matrix">
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="animated-border rounded-sm p-8 md:p-12 shadow-2xl flex flex-col gap-10"
      >
        {/* Section Header & Switcher Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200 w-fit font-mono-code font-bold text-[11px] uppercase tracking-wider">
              <span>MY SKILLS</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              What I Actually Work With
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              No skill percentages pulled from thin air — each domain maps to things I've actually built. Switch tabs to inspect.
            </p>
          </div>

          {/* Role Focus Tabs (Smooth Sliding Motion Pill) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-sm border border-slate-300 dark:border-slate-800 self-start lg:self-auto shadow-inner">
            {[
              { id: 'backend', label: 'Full-Stack & Backend', icon: Network },
              { id: 'systems', label: 'Systems & C (Resonance)', icon: Cpu },
              { id: 'math', label: 'Signals & MATLAB', icon: Calculator },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as FocusTab)}
                  className={`relative px-4 py-2.5 rounded-sm font-mono-code text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-blue-700 rounded-sm shadow-md -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <IconComp className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Telemetry Dynamic Body: Dual Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Col: Radial Mastery Score & Verified Badges (No Gradients) */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5 bg-blue-50/70 dark:bg-slate-950 p-8 rounded-sm border border-blue-200 dark:border-slate-800 flex flex-col items-center text-center gap-6 shadow-xs"
          >
            <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
              Simulated Role Alignment Index
            </span>

            {/* Circular / Radial Score Graphic (Solid Navy Colors) */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke="#bfdbfe"
                  className="dark:stroke-slate-800"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke="#1d4ed8"
                  strokeWidth="10"
                  strokeDasharray="314"
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: currentData.offset }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  key={currentData.score}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-4xl font-extrabold text-blue-950 dark:text-white tracking-tight"
                >
                  {currentData.score}
                </motion.span>
                <span className="font-mono-code text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 tracking-wide">
                  {currentData.label}
                </span>
              </div>
            </div>

            {/* Role Summary Text */}
            <div className="space-y-1">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {currentData.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
                {currentData.desc}
              </p>
            </div>

            {/* Competency Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-2 border-t border-blue-200 dark:border-slate-800 w-full">
              {currentData.badges.map((badge, idx) => (
                <motion.span
                  key={badge.text}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="px-3.5 py-1.5 rounded-sm bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-mono-code text-[11px] font-bold border border-blue-300 dark:border-blue-800 flex items-center gap-1 shadow-2xs"
                >
                  {badge.text}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Col: Progress Bars (Solid Rich Navy Blue Fills) */}
          <div className="lg:col-span-7 flex flex-col gap-6 pl-0 lg:pl-4">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Core Competency Depth & Rigor
              </span>
              <span className="font-mono-code text-[11px] text-blue-900 dark:text-blue-200 font-bold bg-blue-100 dark:bg-blue-950 px-3 py-1 rounded-md border border-blue-300 dark:border-blue-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                <span>VERIFIED COEP LAB CODE</span>
              </span>
            </div>

            {/* Sliders Container */}
            <div className="space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {currentData.bars.map((item, idx) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex items-center justify-between font-mono-code text-xs">
                        <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 truncate pr-2">
                          <TechLogo name={item.name} className="w-4.5 h-4.5 shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </span>
                        <span className="font-black text-blue-700 dark:text-blue-400 shrink-0">{item.val}</span>
                      </div>

                      <div className="w-full h-3.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.numericVal}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-blue-700"
                        />
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono-code font-medium">
                        <span className="truncate pr-2">{item.detail}</span>
                        <span className="text-blue-900 dark:text-blue-300 font-bold shrink-0">{item.meta}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Recruiter Action: Ping Socket Engine */}
            <div className="mt-2 p-4.5 rounded-sm bg-slate-100 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="space-y-0.5">
                <span className="font-mono-code text-xs text-slate-900 dark:text-slate-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                  <span>Stress test live latency via headless CLI?</span>
                </span>
                <p className="text-[11px] font-mono-code text-slate-600 dark:text-slate-400">
                  Simulates non-blocking POSIX epoll multiplexed echo loop.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePingTest}
                  disabled={pingState === 'running'}
                  className={`px-4 py-2.5 rounded-sm font-mono-code text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                    pingState === 'running'
                      ? 'bg-blue-800 text-blue-200 cursor-wait'
                      : pingState === 'done'
                      ? 'bg-slate-900 text-white'
                      : 'bg-blue-700 hover:bg-blue-800 text-white shadow-md'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${pingState === 'running' ? 'animate-spin' : ''}`} />
                  <span>
                    {pingState === 'running'
                      ? 'Multiplexing epoll...'
                      : pingState === 'done'
                      ? `p99: ${pingResult?.latency}`
                      : 'Ping Socket Engine'}
                  </span>
                </motion.button>

                <button
                  onClick={onOpenTerminal}
                  title="Open full interactive CLI"
                  className="p-2.5 rounded-sm bg-[var(--bg-raised)] border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer shadow-xs"
                >
                  <TerminalIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
