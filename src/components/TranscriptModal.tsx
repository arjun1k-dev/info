import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GraduationCap, ShieldCheck, Printer, CheckCircle2, TrendingUp, MapPin } from 'lucide-react';
import { PORTFOLIO_INFO, COURSEWORK_TAGS, ACADEMIC_SEMESTERS } from '../data/portfolioData';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            className="w-full max-w-2xl bg-white text-slate-900 rounded-sm shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Topbar */}
            <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <span className="font-mono-code text-xs font-semibold text-emerald-200">
                  COEP TECHNOLOGICAL UNIVERSITY • ACADEMIC RECORD
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-mono-code flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded text-emerald-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-sans">
              {/* Student Header */}
              <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-950">
                    {PORTFOLIO_INFO.name}
                  </h3>
                  <p className="text-xs font-mono-code text-emerald-800 font-semibold mt-0.5">
                    Degree: {PORTFOLIO_INFO.degree} • Major: {PORTFOLIO_INFO.major}
                  </p>
                  <p className="text-xs font-mono-code text-slate-600">
                    Duration: {PORTFOLIO_INFO.duration} • Batch: {PORTFOLIO_INFO.batch}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{PORTFOLIO_INFO.institution} ({PORTFOLIO_INFO.institutionAddress})</span>
                  </p>
                </div>
                <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                  <div className="text-xs font-mono-code text-slate-500 uppercase">Cumulative CGPA</div>
                  <div className="text-3xl font-display font-bold text-emerald-900">
                    7.32 <span className="text-xs font-mono-code font-normal text-slate-400">/ 10.0</span>
                  </div>
                  <div className="text-[11px] font-mono-code text-emerald-700 font-semibold flex items-center gap-1 mt-0.5 justify-end">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>+0.55 Acceleration Delta</span>
                  </div>
                </div>
              </div>

              {/* Semester Breakdown Table */}
              <div className="space-y-3">
                <h4 className="font-mono-code text-xs font-bold uppercase text-slate-900 tracking-wider">
                  Semester Performance Trajectory
                </h4>

                <div className="border border-slate-200 rounded-sm overflow-hidden font-mono-code text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px]">
                      <tr>
                        <th className="p-3">Semester</th>
                        <th className="p-3">Credits Earned</th>
                        <th className="p-3">SGPA</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ACADEMIC_SEMESTERS.map((sem) => (
                        <tr key={sem.sem} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="p-3 font-bold text-slate-950">{sem.sem} ({sem.label})</td>
                          <td className="p-3 text-slate-600">{sem.credits} Credits</td>
                          <td className="p-3 font-bold text-emerald-900">{sem.sgpa.toFixed(2)}</td>
                          <td className="p-3 text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Passed Confirmed</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Core Coursework */}
              <div className="space-y-3">
                <h4 className="font-mono-code text-xs font-bold uppercase text-slate-900 tracking-wider">
                  Key Coursework & Fundamentals
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono-code text-xs">
                  {COURSEWORK_TAGS.map((c) => (
                    <div
                      key={c.code}
                      className="p-3 rounded-sm bg-slate-50 border border-slate-200 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-950">
                        <span>{c.name}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {c.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-sans mt-1">
                        {c.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Footer */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-sm flex items-center justify-between text-xs font-mono-code text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Academic Record Verified - COEP Technological University</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">2025-2029 Cohort</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
