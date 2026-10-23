import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, ShieldAlert, FileText, Zap, Award, Sparkles, BookOpen, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const OverrunVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bank' | 'obsidian' | 'syllabus'>('bank');

  // Time Bank Simulator state
  const [plannedMin, setPlannedMin] = useState<number>(90);
  const [actualMin, setActualMin] = useState<number>(75);
  const [tier, setTier] = useState<'A' | 'B' | 'C'>('A');

  // Obsidian Vault Simulator state
  const [vaultNote, setVaultNote] = useState<string>(`---
title: "Fourier Transform & LTI Systems"
subject: "EE-201 Signals & Systems"
tags: [fourier, lti, frequency-response]
masteryLevel: 85
lastQuizScore: 92
---

# LTI Systems Analysis
A continuous-time system is LTI if it satisfies linearity & time-invariance.
Linear convolution formula:
$$y(t) = x(t) * h(t) = \\int_{-\\infty}^{\\infty} x(\\tau) h(t - \\tau) d\\tau$$
`);

  // Calculations for Time Bank
  const delta = plannedMin - actualMin;
  const isSurplus = delta >= 0;
  const bankedMinutes = isSurplus ? delta : 0;
  const timeDebt = isSurplus ? 0 : Math.abs(delta);
  const multiplier = tier === 'A' ? 1.5 : tier === 'B' ? 1.0 : 0.5;
  const xpYield = Math.round((actualMin * multiplier) - (timeDebt * 2));

  return (
    <div className="w-full bg-[#041914] text-[#e2f1ec] rounded-sm border border-emerald-800/40 p-5 md:p-7 shadow-2xl font-geist relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-400 font-mono-code text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>OVERRUN Engine Simulator</span>
            </span>
            <span className="text-xs font-mono-code text-emerald-300/60">Next.js 15 & Prisma Architecture</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white tracking-tight">
            Loss-Aversion Time Bank & Zero-Token Vault Ingest
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-[#020e0c] rounded-sm border border-emerald-900/80 font-mono-code text-xs">
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bank'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-400/80 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Time Bank</span>
          </button>
          <button
            onClick={() => setActiveTab('obsidian')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'obsidian'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-400/80 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>$0 Vault Sync</span>
          </button>
        </div>
      </div>

      {/* View 1: Loss-Aversion Time Bank Interactive Calculator */}
      {activeTab === 'bank' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-6 bg-[#020d0a] rounded-sm border border-emerald-900/60 p-5 space-y-5">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Interactive Session Controls</span>
            </h4>

            {/* Target vs Actual Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono-code mb-1">
                  <span className="text-emerald-300">Planned Session Window:</span>
                  <span className="font-bold text-emerald-400">{plannedMin} Minutes</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="15"
                  value={plannedMin}
                  onChange={(e) => setPlannedMin(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-emerald-950 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono-code mb-1">
                  <span className="text-emerald-300">Actual Execution Time:</span>
                  <span className="font-bold text-teal-400">{actualMin} Minutes</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="240"
                  step="15"
                  value={actualMin}
                  onChange={(e) => setActualMin(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer h-2 bg-emerald-950 rounded-lg"
                />
              </div>

              {/* Priority Tier Selector */}
              <div>
                <label className="block text-xs font-mono-code text-emerald-300 mb-2">
                  Academic Focus Tier (XP Multiplier):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['A', 'B', 'C'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`py-2 rounded-lg font-mono-code text-xs font-bold transition-all cursor-pointer border ${
                        tier === t
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                          : 'bg-[#041914] text-emerald-400/70 border-emerald-900/80 hover:border-emerald-700'
                      }`}
                    >
                      Tier {t} ({t === 'A' ? '1.5x' : t === 'B' ? '1.0x' : '0.5x'})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Loss Aversion Bank Display */}
          <div className="lg:col-span-6 bg-[#020d0a] rounded-sm border border-emerald-900/60 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 mb-4">
                <span className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Time Bank Session Output</span>
                </span>
                <span className="text-[11px] font-mono-code text-emerald-400/80">
                  Loss-Aversion State
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`p-4 rounded-sm border font-mono-code ${
                  isSurplus ? 'bg-emerald-950/60 border-emerald-500/50' : 'bg-red-950/40 border-red-800/60'
                }`}>
                  <span className="text-[11px] text-emerald-300/70 block uppercase">
                    {isSurplus ? 'Banked Surplus' : 'Visible Red Time Debt'}
                  </span>
                  <span className={`text-2xl font-bold ${isSurplus ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isSurplus ? `+${bankedMinutes}m` : `-${timeDebt}m`}
                  </span>
                </div>

                <div className="p-4 rounded-sm border bg-teal-950/60 border-teal-500/50 font-mono-code">
                  <span className="text-[11px] text-teal-300/70 block uppercase">XP Net Yield</span>
                  <span className="text-2xl font-bold text-teal-300">
                    {xpYield > 0 ? `+${xpYield}` : xpYield} XP
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-3.5 rounded-sm border flex items-start gap-3 font-geist text-xs ${
                isSurplus
                  ? 'bg-emerald-900/30 border-emerald-600/40 text-emerald-200'
                  : 'bg-red-950/50 border-red-800/60 text-red-200'
              }`}>
                {isSurplus ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold mb-0.5">
                    {isSurplus ? 'Time Surplus Banked!' : 'Loss-Aversion Time Debt Triggered!'}
                  </p>
                  <p className="text-[11px] opacity-80">
                    {isSurplus
                      ? `Saved ${bankedMinutes} minutes added to your reserve bank for high-intensity study modules.`
                      : `Exceeding target window by ${timeDebt} minutes penalizes XP reserves to prevent study burnout & procrastination.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-900/60 text-[11px] font-mono-code text-emerald-400/60">
              State stored locally in `db/custom.db` via Prisma ORM + Zustand persist.
            </div>
          </div>
        </div>
      )}

      {/* View 2: Obsidian Zero-Token Vault Ingestion Simulator */}
      {activeTab === 'obsidian' && (
        <div className="bg-[#020d0a] rounded-sm border border-emerald-900/60 p-5 font-mono-code text-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Web File System Access API & Zero-Token AST Parser</span>
            </h4>
            <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase">
              $0.00 LLM Token Cost
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="block text-emerald-400/80 mb-1 font-semibold text-[11px] uppercase">
                Obsidian Local Markdown Note (.md):
              </label>
              <textarea
                rows={8}
                value={vaultNote}
                onChange={(e) => setVaultNote(e.target.value)}
                className="w-full bg-[#041914] border border-emerald-800/80 rounded-lg p-3 text-emerald-200 font-mono-code text-[11px] focus:outline-none focus:border-emerald-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-emerald-400/80 mb-1 font-semibold text-[11px] uppercase">
                SQLite Prisma Model Output (Parsed AST):
              </label>
              <div className="w-full bg-[#041914] border border-emerald-800/80 rounded-lg p-3 text-emerald-300 font-mono-code text-[11px] space-y-1.5 h-48 overflow-y-auto">
                <div className="text-emerald-400/60">// Prisma DB Record generated at $0 Token Cost</div>
                <div><span className="text-emerald-500 font-bold">id:</span> "concept_ee201_fourier"</div>
                <div><span className="text-emerald-500 font-bold">title:</span> "Fourier Transform & LTI Systems"</div>
                <div><span className="text-emerald-500 font-bold">subjectCode:</span> "EE-201"</div>
                <div><span className="text-emerald-500 font-bold">masteryLevel:</span> 85%</div>
                <div><span className="text-emerald-500 font-bold">quizGapScore:</span> 92/100</div>
                <div><span className="text-emerald-500 font-bold">tags:</span> ["fourier", "lti", "frequency-response"]</div>
                <div><span className="text-emerald-500 font-bold">syncedAt:</span> {new Date().toISOString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
