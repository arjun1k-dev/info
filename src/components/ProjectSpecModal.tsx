import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Code2, Cpu, Check, Copy, ExternalLink, GitBranch, Clock, Terminal, Sparkles, Play } from 'lucide-react';
import { ResonanceVisualizer } from './ResonanceVisualizer';
import { OverrunVisualizer } from './OverrunVisualizer';
import { MathoxideVisualizer } from './MathoxideVisualizer';

interface ProjectSpecModalProps {
  projectId: 'overrun' | 'resonance' | 'mathoxide' | null;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const ProjectSpecModal: React.FC<ProjectSpecModalProps> = ({
  projectId,
  onClose,
  onOpenTerminal,
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'spec' | 'interactive' | 'code' | 'roadmap'>('interactive');
  const [copied, setCopied] = useState(false);

  if (!projectId) return null;

  const overrunContent = {
    spec: `// ============================================================================
// OVERRUN: SYSTEM SPECIFICATION & ARCHITECTURE
// ============================================================================
// Full-Stack Academic Operating System & Loss-Aversion Time Engine
// Framework: Next.js 15 (App Router), React 19, TypeScript
// Database: SQLite (db/custom.db) with Prisma ORM
// State & Parsers: Zustand (persist), js-yaml, Zod schema validation
// Runtime & Testing: Bun runtime with bun test suite
//
// +--------------------+      +--------------------+      +--------------------+
// | Local Obsidian     | ---> | Web File System    | ---> | SQLite Custom DB   |
// | Vault (.md / YAML) |      | Access API (Zero-T)|      | (Prisma Relational)|
// +--------------------+      +--------------------+      +--------------------+
//                                                                   |
//                                                                   v
// +--------------------+      +--------------------+      +--------------------+
// | Loss-Aversion      | <--- | Tactical Timeline  | <--- | Subject Telemetry  |
// | Time Bank (Debt)   |      | & Collision Engine |      | (9 Core Subjects)  |
// +--------------------+      +--------------------+      +--------------------+`,
    code: `// OVERRUN Core Engine: Time Bank & Zero-Token Sync
import { z } from 'zod';
import matter from 'js-yaml';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  plannedMinutes: z.number().positive(),
  actualMinutes: z.number().default(0),
  tier: z.enum(['DEEP_WORK_A', 'MEMORIZE_B', 'CHORE_C']),
  subjectId: z.string().optional(),
});

export class TimeBankCurrencyEngine {
  private balanceMinutes: number = 0;
  private totalDebtMinutes: number = 0;
  private xpPoints: number = 0;

  public processSessionCompletion(task: z.infer<typeof TaskSchema>, elapsedMinutes: number) {
    const delta = task.plannedMinutes - elapsedMinutes;
    const tierMultiplier = task.tier === 'DEEP_WORK_A' ? 1.5 : task.tier === 'MEMORIZE_B' ? 1.0 : 0.5;

    if (delta >= 0) {
      // Finished early: bank surplus minutes into Time Bank
      this.balanceMinutes += delta;
      this.xpPoints += delta * tierMultiplier;
    } else {
      // Overtime or procrastination: incur real Time Debt
      const debtDelta = Math.abs(delta);
      this.totalDebtMinutes += debtDelta;
      this.balanceMinutes -= debtDelta; // Allows negative balance to induce loss aversion
      this.xpPoints = Math.max(0, this.xpPoints - debtDelta * 0.5);
    }

    return {
      balance: this.balanceMinutes,
      debt: this.totalDebtMinutes,
      xp: this.xpPoints,
      isDebtTriggered: this.balanceMinutes < 0,
    };
  }
}`,
    roadmap: `OVERRUN SYSTEM VERIFICATION & AUDIT
- Test Suite: bun test (100% pass rate across unit integrity suites)
- Type Safety: strict tsc --noEmit check
- Offline Ingestion: 0 LLM token cost via direct browser-native File System Access API
- Subject Registry: DSA, Electrical Circuit Analysis, Numerical Methods, Signals & Systems,
  Analog/Digital Electronics, Software Engineering, Data Analytics, Economics, Environmental Science
- Automated Reports: End-of-Day (EOD) Markdown reports logged directly to disk with focus metrics.`,
  };

  const resonanceContent = {
    spec: `// ============================================================================
// RESONANCE (reso): ARCHITECTURE SPECIFICATION
// ============================================================================
// Content-Addressable Version Control System in C (CMake / POSIX Linux)
// Repository Structure:
//
// .reso/
// ├── objects/               <-- SHA-1 fan-out object store (objects/xx/yyy...)
// │   ├── 4b/
// │   │   └── 825dc642cb6eb9a060e54bf8d69288fbee4904 (blob / tree / commit)
// ├── references/
// │   └── heads/
// │       └── main           <-- Branch pointers storing target commit SHA-1
// ├── index                  <-- Flat binary staging area (path -> hash records)
// └── HEAD                   <-- Symbolic reference: "ref: references/heads/main"
//
// Objects are zlib-compressed with headers: "<type> <size>\\0<data>"`,
    code: `// Resonance C Object Writer & Commit Struct (src/objects.c & src/commits.c)
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <zlib.h>
#include <openssl/sha.h>

typedef enum {
    OBJ_BLOB,
    OBJ_TREE,
    OBJ_COMMIT
} ObjectType;

int write_reso_object(const void* buf, size_t len, ObjectType type, char* out_hex) {
    char header[64];
    const char* type_str = (type == OBJ_BLOB) ? "blob" : (type == OBJ_TREE) ? "tree" : "commit";
    int hdr_len = snprintf(header, sizeof(header), "%s %zu", type_str, len) + 1;

    // 1. Compute SHA-1 over "<type> <len>\\0<content>"
    SHA_CTX sha1_ctx;
    unsigned char hash[SHA_DIGEST_LENGTH];
    SHA1_Init(&sha1_ctx);
    SHA1_Update(&sha1_ctx, header, hdr_len);
    SHA1_Update(&sha1_ctx, buf, len);
    SHA1_Final(hash, &sha1_ctx);

    for (int i = 0; i < SHA_DIGEST_LENGTH; i++) {
        sprintf(out_hex + (i * 2), "%02x", hash[i]);
    }

    // 2. Write to .reso/objects/xx/yyy with zlib deflation
    char dir_path[256], file_path[256];
    snprintf(dir_path, sizeof(dir_path), ".reso/objects/%.2s", out_hex);
    snprintf(file_path, sizeof(file_path), "%s/%s", dir_path, out_hex + 2);
    // creates directory & writes compressed stream...
    return 0;
}`,
    roadmap: `RESONANCE (reso) ROADMAP & STATUS
Current Confirmed Architecture:
- Complete Object Database (.reso/objects/ with SHA-1 & zlib compression)
- Command Dispatcher in src/main.c:
  * setup       -> Git init (creates .reso skeleton)
  * hash-object -> Hashes file & writes blob to object store
  * stage       -> Git add (appends path->hash to index)
  * snapshot    -> Git commit (builds tree, wraps commit, resolves parent & advances HEAD)
  * status      -> Reports staged vs working tree state
- Shared core (core.c): hashing, zlib, path helpers, repo guards.

Confirmed Next Wave of Features (Roadmap):
- Checkout / Restore (materializing trees back to working directory)
- Explicit Branching (reso branch / ref switching)
- Commit DAG Walker (log command)
- Diff Engine (comparing working tree, index, and commit objects)`,
  };

  const mathoxideContent = {
    spec: `// ============================================================================
// MATHOXIDE: SYSTEM SPECIFICATION & ARCHITECTURE
// ============================================================================
// Pure-Rust Mathematical Animation Engine, Studio IDE & Agentic Media Suite
// Zero Python runtime dependencies | Optimized for low-spec iGPU (~128 MB VRAM)
// Crates: mo-core, mo-render, mo-dsl, mo-moab, mo-ide, mo-interactive, mo-cli, mo-mcp
//
// +------------------------+      +------------------------+      +------------------------+
// | .moa Script Source     | ---> | mo-dsl Parser          | ---> | mo-core Scene Graph    |
// | (Declarative grammar)  |      | (File-relative imports)|      | (VGroup Bézier paths)  |
// +------------------------+      +------------------------+      +------------------------+
//                                                                             |
//                                                                             v
// +------------------------+      +------------------------+      +------------------------+
// | Fixed-Layout IDE       | <--- | mo-render WGPU Pipeline| <--- | FrameMemo LRU Cache    |
// | (egui Studio & Gizmos) |      | (16MB Staging Ring)    |      | (16,384 Arc states)    |
// +------------------------+      +------------------------+      +------------------------+
//              |
//              +---> Headless CLI (\`mo render / compile / inspect\`)
//              +---> AI Agent JSON-RPC stdio server (\`mo-mcp\`)`,
    code: `// mo-core: Arc Scene State & Player Evaluation
use std::sync::Arc;
use std::collections::HashMap;
use crate::vgroup::VGroup;

pub struct TimelineIndex {
    decl_base: HashMap<String, Arc<VGroup>>,
    intro_decls: Vec<(String, Arc<VGroup>, f32)>,
    baked_final: std::cell::RefCell<HashMap<usize, Arc<VGroup>>>,
}

impl Player {
    /// Sample scene state at time \`t\` using precomputed timeline index.
    /// Clones Arc refcounts (0 ms memory copy), not point data buffers.
    pub fn state_at_indexed(tl: &Timeline, t: f32, idx: &TimelineIndex) -> HashMap<String, Arc<VGroup>> {
        let mut state = idx.decl_base.clone(); // Arc refcount bumps only!
        for (id, obj, intro_t) in &idx.intro_decls {
            if t >= *intro_t {
                state.insert(id.clone(), obj.clone());
            }
        }
        for (i, stmt) in tl.stmts.iter().enumerate() {
            if let Stmt::Play(timed_anim) = stmt {
                if let Some(sample) = sample_animation(timed_anim, &state, t) {
                    state.insert(timed_anim.anim.target_id().to_string(), Arc::new(sample));
                }
            }
        }
        state
    }
}`,
    roadmap: `MATHOXIDE VERIFICATION & ARCHITECTURAL AUDIT
- Test Suite: 77 passing workspace unit tests, 0 compiler warnings
  * mo-core: 36 passed (Bézier curves, FFT, complex analysis, Arc state, calculus)
  * mo-dsl: 17 passed (syntax lowering, modular imports, 3D primitives, camera)
  * mo-ide: 20 passed (synthetic preview, inline edit, timeline apply, autocomplete)
  * mo-moab: 2 passed (postcard binary container round-trip)
  * mo-render: 2 passed (WGPU vector text, renderer initialization)
- Hardware Constraints:
  * Strict low-VRAM memory cap (< 128 MB VRAM budget for standard laptop iGPU)
  * 16 MB persistent staging ring buffer for zero-stall GPU uploads
  * 64 MB buffer cache pool with budget-based LRU retirement
- Direction & Next Steps:
  * Directional lighting / normal-based shading for filled surface3d
  * Interactive camera anims in headless winit preview
  * Multi-level undo/redo in Studio IDE`,
  };

  const isMathoxide = projectId === 'mathoxide';
  const isResonance = projectId === 'resonance';
  const content = isMathoxide ? mathoxideContent : isResonance ? resonanceContent : overrunContent;

  const handleCopy = () => {
    if (activeCodeTab === 'interactive') return;
    navigator.clipboard.writeText(content[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
          className={`w-full max-w-5xl text-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
            isMathoxide
              ? 'bg-[#05001A] border-2 border-purple-700/60'
              : 'bg-[#031510] border border-emerald-700/50'
          }`}
        >
          {/* Header */}
          <div
            className={`px-6 py-4 border-b flex items-center justify-between ${
              isMathoxide
                ? 'bg-[#0A002B] border-purple-900/70'
                : 'bg-[#020e0c] border-emerald-900/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-10 h-10 rounded-sm flex items-center justify-center border shadow-xs ${
                  isMathoxide
                    ? 'bg-purple-950 text-[#FFE066] border-purple-600/50'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                }`}
              >
                {isMathoxide ? (
                  <Sparkles className="w-5 h-5 text-[#FFE066]" />
                ) : isResonance ? (
                  <GitBranch className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Clock className="w-5 h-5 text-emerald-400" />
                )}
              </span>
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <span>
                    {isMathoxide
                      ? 'MathOxide: Pure-Rust Animation Engine & Studio'
                      : isResonance
                      ? 'Resonance (reso): Content-Addressable VCS in C'
                      : 'OVERRUN: AI Academic Command Center'}
                  </span>
                </h3>
                <span
                  className={`font-mono-code text-xs ${
                    isMathoxide ? 'text-[#00FFF7]' : 'text-emerald-400/80'
                  }`}
                >
                  {isMathoxide
                    ? 'Pure Rust • WGPU 24 • WGSL Shaders • egui Studio IDE • Zero Python'
                    : isResonance
                    ? 'POSIX / Linux • CMake • SHA-1 • zlib Fan-Out Store'
                    : 'Next.js 15 • React 19 • SQLite + Prisma • Bun'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenTerminal}
                className="px-3.5 py-1.5 rounded-sm bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-mono-code font-semibold border border-emerald-600/60 flex items-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Launch Sandbox CLI</span>
                <span className="sm:hidden">CLI</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-sm text-emerald-400/70 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="px-6 py-3 bg-[#041914] border-b border-emerald-900/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono-code text-xs">
              <button
                onClick={() => setActiveCodeTab('interactive')}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCodeTab === 'interactive'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-300/80 hover:text-white hover:bg-emerald-900/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Interactive Simulator</span>
              </button>

              <button
                onClick={() => setActiveCodeTab('spec')}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeCodeTab === 'spec'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-emerald-300/80 hover:text-white hover:bg-emerald-900/50'
                }`}
              >
                Architecture Spec
              </button>

              <button
                onClick={() => setActiveCodeTab('code')}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeCodeTab === 'code'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-emerald-300/80 hover:text-white hover:bg-emerald-900/50'
                }`}
              >
                Source Code
              </button>

              <button
                onClick={() => setActiveCodeTab('roadmap')}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeCodeTab === 'roadmap'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-emerald-300/80 hover:text-white hover:bg-emerald-900/50'
                }`}
              >
                Roadmap & Verification
              </button>
            </div>

            {activeCodeTab !== 'interactive' && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-400/80 hover:text-emerald-300 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
              </button>
            )}
          </div>

          {/* Modal Body View */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#031510]">
            {activeCodeTab === 'interactive' ? (
              isMathoxide ? (
                <MathoxideVisualizer />
              ) : isResonance ? (
                <ResonanceVisualizer />
              ) : (
                <OverrunVisualizer />
              )
            ) : (
              <pre
                className={`whitespace-pre overflow-x-auto font-mono-code text-xs leading-relaxed p-4 rounded-sm border ${
                  isMathoxide
                    ? 'text-[#00FFF7] bg-[#02000D] border-purple-900/80'
                    : 'text-emerald-200 bg-[#020e0c] border-emerald-900/80'
                }`}
              >
                <code>{content[activeCodeTab]}</code>
              </pre>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-[#020e0c] border-t border-emerald-900/80 flex items-center justify-between text-[11px] font-mono-code text-emerald-400/60">
            <span>Systems & Backend Engineering Project Spec</span>
            <span className="text-emerald-400 font-semibold">Arjun Korlekar • COEP Tech '29</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
