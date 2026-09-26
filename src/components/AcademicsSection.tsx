import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Users,
  CheckCircle2,
  FileCheck,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import {
  LEADERSHIP_ROLES,
  COURSEWORK_TAGS,
  ACADEMIC_SEMESTERS,
  PORTFOLIO_INFO,
} from '../data/portfolioData';

interface AcademicsSectionProps {
  onOpenTranscript: () => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onOpenTranscript }) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeSemIndex, setActiveSemIndex] = useState<number | null>(null);

  const activeCourse = COURSEWORK_TAGS.find((c) => c.name === selectedCourse);

  return (
    <section className="py-10 px-6 md:px-10 max-w-7xl mx-auto w-full" id="academics">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Academic Progression at COEP Tech with SVG Trend Chart (6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 bg-[var(--bg-raised)] rounded-sm p-8 md:p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-indigo-100/40 dark:shadow-none flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 w-fit font-mono-code text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{PORTFOLIO_INFO.institution}</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Academic Trajectory & Key Coursework
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                B.Tech in {PORTFOLIO_INFO.major} ({PORTFOLIO_INFO.duration}). Focused on mathematical foundations, signals & systems, computational programming, and circuit analysis with continuous SGPA upward acceleration.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-600 dark:text-slate-400 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{PORTFOLIO_INFO.institutionAddress}</span>
                <span>•</span>
                <a
                  href={PORTFOLIO_INFO.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
                >
                  <span>coeptech.ac.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* SVG Semester Trend Chart */}
            <div className="p-6 rounded-sm bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs font-bold text-slate-900 dark:text-white uppercase">
                  SGPA Progression Curve
                </span>
                <span className="font-mono-code text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-indigo-200 dark:border-indigo-800">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>+0.55 Acceleration Delta</span>
                </span>
              </div>

              {/* Curve Visualization */}
              <div className="relative h-36 w-full pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                  <defs>
                    <linearGradient id="academic-area-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="line-grad" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="50%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>

                  {/* Chart Grid Lines */}
                  <line
                    x1="40"
                    y1="20"
                    x2="380"
                    y2="20"
                    stroke="#d1fae5"
                    className="dark:stroke-emerald-900/60"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="40"
                    y1="60"
                    x2="380"
                    y2="60"
                    stroke="#d1fae5"
                    className="dark:stroke-emerald-900/60"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="40"
                    y1="100"
                    x2="380"
                    y2="100"
                    stroke="#d1fae5"
                    className="dark:stroke-emerald-900/60"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />

                  {/* Y-Axis Labels */}
                  <text
                    x="5"
                    y="24"
                    fill="#047857"
                    className="dark:fill-emerald-400"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10"
                  >
                    8.00
                  </text>
                  <text
                    x="5"
                    y="64"
                    fill="#047857"
                    className="dark:fill-emerald-400"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10"
                  >
                    7.50
                  </text>
                  <text
                    x="5"
                    y="104"
                    fill="#047857"
                    className="dark:fill-emerald-400"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10"
                  >
                    7.00
                  </text>

                  {/* Filled Area under Curve */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    d="M 60,95 C 140,88 220,70 340,38 L 340,110 L 60,110 Z"
                    fill="url(#academic-area-grad)"
                  />

                  {/* Smooth Stroke Line */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    d="M 60,95 C 140,88 220,70 340,38"
                    fill="none"
                    stroke="url(#line-grad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Data Point 1: Sem 1 (7.05) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setActiveSemIndex(activeSemIndex === 0 ? null : 0)}
                  >
                    <circle
                      cx="60"
                      cy="95"
                      r={activeSemIndex === 0 ? 8 : 6}
                      fill="#059669"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    <text
                      x="45"
                      y="78"
                      fill="#064e3b"
                      className="dark:fill-emerald-300"
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="11"
                      fontWeight="700"
                    >
                      7.05
                    </text>
                    <text
                      x="45"
                      y="118"
                      fill="#047857"
                      className="dark:fill-emerald-400"
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="9"
                    >
                      SEM 1
                    </text>
                  </g>

                  {/* Data Point 2: Sem 2 (7.60) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setActiveSemIndex(activeSemIndex === 1 ? null : 1)}
                  >
                    <circle
                      cx="340"
                      cy="38"
                      r={activeSemIndex === 1 ? 9 : 7}
                      fill="#0284c7"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    <text
                      x="325"
                      y="22"
                      fill="#0369a1"
                      className="dark:fill-cyan-300"
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="11"
                      fontWeight="700"
                    >
                      7.60
                    </text>
                    <text
                      x="325"
                      y="118"
                      fill="#047857"
                      className="dark:fill-emerald-400"
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="9"
                    >
                      SEM 2
                    </text>
                  </g>
                </svg>
              </div>

              {/* Semester info drawer if clicked */}
              <AnimatePresence>
                {activeSemIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-white dark:bg-[#041914] rounded-sm border border-emerald-200 dark:border-emerald-800 text-xs font-mono-code text-emerald-900 dark:text-emerald-100 space-y-1"
                  >
                    <div className="font-bold flex items-center justify-between text-emerald-950 dark:text-white">
                      <span>{ACADEMIC_SEMESTERS[activeSemIndex].label}</span>
                      <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        SGPA: {ACADEMIC_SEMESTERS[activeSemIndex].sgpa} ({ACADEMIC_SEMESTERS[activeSemIndex].credits} Credits)
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-900/80 dark:text-emerald-200/80 font-sans">
                      {ACADEMIC_SEMESTERS[activeSemIndex].highlight}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cumulative Summary Badge */}
              <div className="flex items-center justify-between pt-2 border-t border-emerald-200/50 dark:border-emerald-900/60 text-xs font-mono-code">
                <span className="text-emerald-900 dark:text-emerald-200">
                  Cumulative CGPA:{' '}
                  <strong className="text-emerald-950 dark:text-white font-bold text-sm">7.32 / 10.0</strong>
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Standing: Confirmed Active</span>
                </span>
              </div>
            </div>

            {/* Key Engineering Coursework Tags */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  Key Coursework & Fundamentals:
                </span>
                <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 font-mono-code">
                  (Click for syllabus details)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {COURSEWORK_TAGS.map((course) => (
                  <button
                    key={course.name}
                    onClick={() =>
                      setSelectedCourse(selectedCourse === course.name ? null : course.name)
                    }
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono-code font-medium transition-all cursor-pointer ${
                      selectedCourse === course.name
                        ? 'bg-emerald-900 dark:bg-emerald-600 text-white border-emerald-950 shadow-xs'
                        : 'bg-emerald-50/80 dark:bg-[#020d0a] text-emerald-900 dark:text-emerald-200 border-emerald-200/90 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-300'
                    }`}
                  >
                    <span>{course.name}</span>
                  </button>
                ))}
              </div>

              {/* Course Detail Drawer */}
              <AnimatePresence>
                {activeCourse && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-white dark:bg-[#020d0a] rounded-sm border border-emerald-200 dark:border-emerald-800/80 text-xs font-mono-code space-y-1 mt-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between font-bold text-emerald-950 dark:text-white">
                      <span>{activeCourse.name}</span>
                      <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded text-[11px]">
                        Course Code: {activeCourse.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-900/80 dark:text-emerald-200/80 font-sans leading-relaxed">
                      {activeCourse.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-emerald-100 dark:border-emerald-800/60 flex items-center justify-between text-xs font-mono-code text-emerald-700 dark:text-emerald-400">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>COEP Academic Record Verified</span>
            </span>
            <button
              onClick={onOpenTranscript}
              className="font-semibold text-emerald-900 dark:text-emerald-200 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
            >
              <span>View Transcript Summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Right: Campus Leadership Cards (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4" id="leadership">
          <div className="space-y-1 mb-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-purple-500/10 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 w-fit font-mono-code text-xs font-bold uppercase tracking-wider">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Leadership & Campus Initiatives</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Technical Fests & Academic Mentorship
            </h3>
          </div>

          {LEADERSHIP_ROLES.map((role, idx) => (
            <motion.div
              key={role.org + role.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-[var(--bg-raised)] rounded-sm p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-indigo-100/30 dark:shadow-none hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${role.badgeGrad} text-white font-mono-code text-[11px] font-bold shadow-2xs`}
                  >
                    {role.org}
                  </span>
                  <span className="font-mono-code text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {role.category}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {role.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {role.description}
                </p>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between font-mono-code text-[11px] text-slate-600 dark:text-slate-400 gap-2">
                <span>Focus: {role.stack}</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800">
                  {role.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
