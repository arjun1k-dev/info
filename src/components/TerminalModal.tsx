import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sysinfo',
      output: (
        <div className="space-y-1 text-emerald-300">
          <div>COEP Engineering Systems Terminal :: Linux 6.x x86_64</div>
          <div>User: arjun.korlekar [B.Tech Electrical Engineering '29]</div>
          <div>Status: Actively seeking Software Engineering & Backend Internships</div>
          <div className="text-teal-400">
            Type <span className="text-white font-bold">'help'</span> to inspect active project diagnostics.
          </div>
        </div>
      ),
      timestamp: '08:45:00',
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;
    const now = new Date().toLocaleTimeString();

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-emerald-200">
            <div className="text-white font-semibold">Available Commands:</div>
            <div>  <span className="text-teal-300 font-bold">cat mathoxide.rs</span> - Inspect MathOxide Rust WGPU staging ring & FrameMemo</div>
            <div>  <span className="text-teal-300 font-bold">mathoxide render</span> - Run simulated headless WGPU render pass for master.moa</div>
            <div>  <span className="text-teal-300 font-bold">cat overrun.ts</span> - Inspect OVERRUN loss-aversion time engine logic</div>
            <div>  <span className="text-teal-300 font-bold">cat reso.c</span>     - Inspect Resonance C object store & commit mechanics</div>
            <div>  <span className="text-teal-300 font-bold">reso status</span>   - Run simulated Resonance repository status check</div>
            <div>  <span className="text-teal-300 font-bold">timebank</span>      - Simulate OVERRUN focus session & time debt calculation</div>
            <div>  <span className="text-teal-300 font-bold">academics</span>     - Print COEP Technological University transcript records</div>
            <div>  <span className="text-teal-300 font-bold">contact</span>       - Display verified contact channels & recruiter kit</div>
            <div>  <span className="text-teal-300 font-bold">clear</span>         - Clear terminal window</div>
          </div>
        );
        break;

      case 'cat mathoxide.rs':
        output = (
          <pre className="text-purple-300 text-xs font-mono-code leading-relaxed bg-black/40 p-3 rounded-lg border border-purple-900/60 overflow-x-auto">
{`// MathOxide: WGPU Staging Ring & Arc Zero-Copy Evaluation in Rust
pub struct BufCache {
    records: HashMap<u64, GpuBufferRecord>,
    retired_pool: Vec<GpuBuffer>, // <= 4MB pool recycling
    staging_ring: GpuBuffer,      // 16MB persistent staging buffer
    staging_offset: u64,
}

impl BufCache {
    pub fn stage_copy(&mut self, data: &[u8], dst: &GpuBuffer, dst_offset: u64, encoder: &mut GpuCommandEncoder) {
        self.queue.write_buffer(&self.staging_ring, self.staging_offset, data);
        encoder.copy_buffer_to_buffer(&self.staging_ring, self.staging_offset, dst, dst_offset, data.len() as u64);
        self.staging_offset += align_256(data.len());
    }
}`}
          </pre>
        );
        break;

      case 'mathoxide render':
      case 'mo render':
        output = (
          <div className="space-y-1 text-purple-200">
            <div className="text-cyan-300">mo-cli :: Validating master.moa (6.5s composition)...</div>
            <div className="text-white">Parsing 2 asset imports: [wave.moa at (0, 1.2), card.moa at (0, -0.5)]</div>
            <div className="text-emerald-400 font-semibold">[Render Target] 1920x1080 @ 60 FPS (WGPU 24 headless)</div>
            <div className="pl-4 text-purple-300">• Staging ring uploads: 4 misses (2.4 MB), 508 hits (99.2% cache rate)</div>
            <div className="pl-4 text-purple-300">• FrameMemo LRU cache: 390 frames evaluated (0.38 ms avg per frame)</div>
            <div className="pl-4 text-emerald-300">• FFmpeg H.264 stream: master.mp4 written successfully</div>
            <div className="text-[11px] text-[#FFE066] mt-1">Memory usage: 24.8 MB VRAM / 88.4 MB RAM (0 Python dependencies).</div>
          </div>
        );
        break;

      case 'cat overrun.ts':
        output = (
          <pre className="text-emerald-300 text-xs font-mono-code leading-relaxed bg-black/40 p-3 rounded-lg border border-emerald-900/60 overflow-x-auto">
{`// OVERRUN: Loss-Aversion Time Bank & Zero-Token Sync Engine
export function evaluateFocusSession(plannedMin: number, actualMin: number, tier: 'DEEP_WORK' | 'CHORE') {
  const delta = plannedMin - actualMin;
  const isSurplus = delta >= 0;
  
  return {
    status: isSurplus ? 'MINUTES_BANKED' : 'TIME_DEBT_INCURRED',
    bankDelta: delta, // negative delta produces visible red debt
    xpAward: isSurplus ? delta * 1.5 : -(Math.abs(delta) * 0.5),
    zeroTokenSync: 'Obsidian vault parsed offline via File System Access API'
  };
}`}
          </pre>
        );
        break;

      case 'cat reso.c':
        output = (
          <pre className="text-emerald-300 text-xs font-mono-code leading-relaxed bg-black/40 p-3 rounded-lg border border-emerald-900/60 overflow-x-auto">
{`// Resonance: Content-Addressable Version Control in C
#include "reso.h"
#include <openssl/sha.h>
#include <zlib.h>

int reso_snapshot(const char* commit_message) {
    // 1. Build tree object from index file
    char tree_sha[41];
    write_tree_from_index(".reso/index", tree_sha);

    // 2. Wrap tree in commit object with parent DAG pointer
    char parent_sha[41];
    resolve_ref("HEAD", parent_sha);

    char commit_sha[41];
    write_commit_object(tree_sha, parent_sha, commit_message, commit_sha);

    // 3. Advance branch pointer (.reso/references/heads/main)
    return advance_branch_ref("main", commit_sha);
}`}
          </pre>
        );
        break;

      case 'reso status':
        output = (
          <div className="space-y-1 text-emerald-200">
            <div className="text-teal-300">On branch main (.reso/references/heads/main)</div>
            <div>Latest snapshot commit: <span className="text-white font-bold">4b825dc642cb (DAG parent linked)</span></div>
            <div className="text-emerald-400 font-semibold">Changes staged for snapshot:</div>
            <div className="pl-4 text-emerald-300">• new blob: src/objects.c [SHA-1: 9a3f21..]</div>
            <div className="pl-4 text-emerald-300">• new blob: src/commits.c [SHA-1: e81b04..]</div>
            <div className="text-[11px] text-teal-400 mt-1">Object store: .reso/objects/ (zlib fan-out active)</div>
          </div>
        );
        break;

      case 'timebank':
        output = (
          <div className="space-y-1 text-emerald-200">
            <div className="text-teal-300">Running OVERRUN Time Bank Simulation...</div>
            <div>[Planned Session] Signals & Systems Deep Work: 60 mins</div>
            <div>[Actual Focus] Timer logged: 45 mins</div>
            <div className="text-emerald-400 font-bold">Result: +15 minutes banked into Time Bank balance!</div>
            <div>XP Multiplier applied: 1.5x (Deep Work [A]) → +22.5 XP</div>
            <div className="text-[11px] text-emerald-300">Zero tokens sent to external APIs (100% offline-first).</div>
          </div>
        );
        break;

      case 'academics':
        output = (
          <div className="space-y-1 text-emerald-200">
            <div>Institution: COEP Technological University, Pune</div>
            <div>Degree: B.Tech in Electrical Engineering (2025-2029)</div>
            <div>Cumulative CGPA: <span className="text-white font-bold">7.32 / 10.0</span></div>
            <div>Semester 1: 7.05 SGPA (21 Credits)</div>
            <div>Semester 2: 7.60 SGPA (22 Credits) [+0.55 Acceleration Delta]</div>
            <div>Key Courses: Signals and Systems, Numerical Methods (MATLAB), Python, Analog Electronics & Circuits, Web Design</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-emerald-200">
            <div>Email: <a href={PORTFOLIO_INFO.mailtoLink} className="text-teal-300 underline">{PORTFOLIO_INFO.email}</a></div>
            <div>GitHub: <a href={PORTFOLIO_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="text-teal-300 underline">{PORTFOLIO_INFO.githubUser}</a></div>
            <div>LinkedIn: <a href={PORTFOLIO_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-teal-300 underline">{PORTFOLIO_INFO.linkedinUser}</a></div>
            <div>Status: {PORTFOLIO_INFO.status}</div>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-rose-400">
            Command not recognized: '{inputVal}'. Type <span className="text-white font-bold underline">'help'</span> for instructions.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: inputVal,
        output,
        timestamp: now,
      },
    ]);
    setInputVal('');
  };

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            className="w-full max-w-3xl bg-[#031d16] text-emerald-100 rounded-sm shadow-2xl border border-emerald-800/80 flex flex-col h-[520px] max-h-[90vh] overflow-hidden font-mono-code"
          >
            {/* Window Topbar */}
            <div className="px-4 py-3 bg-[#021510] border-b border-emerald-900/80 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-semibold text-emerald-300">
                  arjun@coep-systems-sandbox: ~ (OVERRUN & reso)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-1 rounded text-emerald-400 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-5 overflow-y-auto space-y-4 text-xs leading-relaxed"
            >
              {logs.map((log) => (
                <div key={log.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <span className="text-teal-400">arjun@coep:~$</span>
                    <span className="text-white">{log.command}</span>
                    <span className="text-[10px] text-emerald-600/80 ml-auto">{log.timestamp}</span>
                  </div>
                  <div className="pl-4">{log.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Prompt Input Form */}
            <form
              onSubmit={handleCommand}
              className="px-4 py-3 bg-[#021510] border-t border-emerald-900/80 flex items-center gap-2"
            >
              <span className="text-teal-400 font-bold text-xs">arjun@coep:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'cat overrun.ts', 'reso status', or 'timebank'..."
                className="flex-1 bg-transparent border-none outline-none text-emerald-100 font-mono-code text-xs placeholder:text-emerald-700/60"
              />
              <button
                type="submit"
                className="p-1.5 rounded bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
