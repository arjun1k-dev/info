import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Film,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Eye,
  Sliders,
  Check,
  Terminal,
} from 'lucide-react';

interface SceneDemo {
  id: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  posterSrc: string;
  duration: number;
  description: string;
  codeSnippet: string;
  mathFormula: string;
}

const SCENE_DEMOS: SceneDemo[] = [
  {
    id: 'master',
    title: 'Master Showcase',
    subtitle: 'Multi-scene orchestration with top-of-file imports & camera moves',
    videoSrc: '/mathoxide/master_showcase.mp4',
    posterSrc: '/mathoxide/preview_master.png',
    duration: 8.0,
    mathFormula: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x - a)^n',
    description:
      'Full video composition demonstrating composite VGroup asset animations, coordinate grid reveal, 3D camera sweeps, and smooth sequential scene pacing.',
    codeSnippet: `// master.moa — Top-of-file imports & macro timeline
import "assets/intro_card.moa" as intro at (0, 0);
import "assets/formula.moa" as formula at (0, -0.5);

number_plane grid x_step=1.0 y_step=1.0 color=#4A009933;

play showCreation(grid) 1.5s smooth;
play drawBorderThenFill(intro) 1.8s smooth;
play circumscribe(intro) 1.2s;
wait 0.5s;

camera polar phi=1.1 theta=0.6;
play transform(intro, formula) 2.0s smooth;
wait 1.0s;`,
  },
  {
    id: '3d-perspective',
    title: '3D Camera & Primitives',
    subtitle: 'Polar camera coordinates (phi, theta, gamma) with hardware wireframes',
    videoSrc: '/mathoxide/demo_3d.mp4',
    posterSrc: '/mathoxide/preview_3d.png',
    duration: 6.0,
    mathFormula: '\\mathbf{r}(\\phi, \\theta) = [R\\sin\\phi\\cos\\theta, R\\sin\\phi\\sin\\theta, R\\cos\\phi]',
    description:
      'True 3D geometric shapes (cube_3d, cylinder, cone, line3d, surface_3d) rendered via custom WGSL shaders with real-time camera orbits.',
    codeSnippet: `// 3D scene composition in MathOxide DSL
cube_3d box size=2.0 color=#00FFF7 fill=#0A002B99 sw=2;
dot3d center_pt at (0, 0, 0) radius=0.15 color=#FFE066;

play showCreation(box) 2.0s smooth;
play grow(center_pt) 1.0s;

// Dynamic continuous camera orbit
camera polar phi=0.8 theta=0.0;
play rotate(box) 3.0s angle=3.14 smooth;
camera polar phi=1.2 theta=1.57;`,
  },
  {
    id: 'typst-latex',
    title: 'Typst Vector Math & Transforms',
    subtitle: 'Zero-stroke LaTeX morphing powered by Typst vector subpaths',
    videoSrc: '/mathoxide/latex_showcase.mp4',
    posterSrc: '/mathoxide/preview_latex.png',
    duration: 9.0,
    mathFormula: 'e^{i\\pi} + 1 = 0 \\quad \\longleftrightarrow \\quad \\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi}',
    description:
      'Mathematical typesetting powered by Typst without synthetic stroke distortion or LaTeX CLI latency. Subpaths morph smoothly point-to-point via Bézier lerps.',
    codeSnippet: `// Typst-powered LaTeX formula reveal & morphing
tex euler text="e^{i\\pi} + 1 = 0" size=1.4 color=#FFE066 at (0, 1.0);
tex gauss text="\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi}" size=1.3 color=#00FF9D at (0, -1.0);

play write(euler) 2.0s smooth;
play circumscribe(euler) 1.0s color=#FF00A8;
wait 0.5s;
play transform(euler, gauss) 2.5s smooth;
play fadeOut(euler) 1.0s;`,
  },
];

export const MathoxideVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'playground' | 'architecture'>('video');
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubTime, setScrubTime] = useState(2.5);
  const [usePoster, setUsePoster] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentDemo = SCENE_DEMOS[selectedDemoIndex];

  // Playback timer for playground simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying && activeTab === 'playground') {
      interval = setInterval(() => {
        setScrubTime((prev) => {
          if (prev >= currentDemo.duration) {
            return 0;
          }
          return Math.min(currentDemo.duration, prev + 0.05);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTab, currentDemo.duration]);

  // Video play/pause synchronization
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Normalized time in [0, 1] for playground simulation
  const progress = Math.min(1, Math.max(0, scrubTime / currentDemo.duration));

  return (
    <div className="w-full bg-[#05001A] text-[#DDD4F5] rounded-sm border-2 border-purple-900/60 p-5 md:p-8 shadow-2xl font-mono-code relative overflow-hidden">
      {/* Cyberpunk Neon Ambient Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-900/70 pb-5 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-sm bg-purple-950 border border-purple-500/40 text-[#FFE066] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE066]" />
              <span>MATHOXIDE STUDIO & ENGINE</span>
            </span>
            <span className="text-xs text-purple-300 font-semibold">
              Pure Rust · WGPU 24 · WebGPU Shaders · Zero Python Runtime
            </span>
          </div>
          <h3 className="text-2xl font-extrabold font-display text-white tracking-tight">
            High-Performance Mathematical Animation Engine
          </h3>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center p-1 bg-[#0A002B] rounded-sm border border-purple-800/80 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('video');
              setIsPlaying(false);
            }}
            className={`px-3.5 py-1.5 rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'video'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Video Demos</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('playground');
              setIsPlaying(false);
            }}
            className={`px-3.5 py-1.5 rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'playground'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('architecture');
              setIsPlaying(false);
            }}
            className={`px-3.5 py-1.5 rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & GPU</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Video Demos */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          {/* Demo Scene Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SCENE_DEMOS.map((demo, idx) => {
              const isSelected = selectedDemoIndex === idx;
              return (
                <button
                  key={demo.id}
                  onClick={() => {
                    setSelectedDemoIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-3.5 rounded-sm border-2 transition-all text-left flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-purple-900/50 border-[#00FFF7] text-white shadow-lg ring-1 ring-[#00FFF7]/50'
                      : 'bg-[#0A002B]/60 border-purple-900/60 hover:border-purple-600 text-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={isSelected ? 'text-[#00FFF7]' : 'text-purple-400'}>
                      0{idx + 1}. {demo.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-200">
                      {demo.duration}s MP4
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-200/80 font-sans line-clamp-2 leading-relaxed">
                    {demo.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Video Player Display Container */}
          <div className="rounded-sm border-2 border-purple-800/80 bg-black overflow-hidden relative shadow-2xl">
            {/* Top Player Status Bar */}
            <div className="bg-[#0A002B] px-4 py-2 border-b border-purple-900/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-white tracking-wide">
                  {currentDemo.title} — Real-Time Render Output
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-purple-300">
                <span>1080p Letterboxed</span>
                <span>•</span>
                <span className="text-[#00FF9D]">60 FPS WGPU</span>
                <span>•</span>
                <button
                  onClick={() => setUsePoster(!usePoster)}
                  className="text-[#FFE066] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>{usePoster ? 'Switch to Video' : 'Crisp Vector Frame'}</span>
                </button>
              </div>
            </div>

            {/* Media Canvas */}
            <div className="aspect-video w-full relative flex items-center justify-center bg-[#05001A]">
              {usePoster ? (
                <img
                  src={currentDemo.posterSrc}
                  alt={currentDemo.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  ref={videoRef}
                  key={currentDemo.videoSrc}
                  src={currentDemo.videoSrc}
                  poster={currentDemo.posterSrc}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              )}
            </div>

            {/* Bottom Telemetry Row */}
            <div className="p-4 bg-[#0A002B] border-t border-purple-900/70 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-purple-900/60 text-[#FFE066] font-bold">
                  KaTeX / Typst Math:
                </span>
                <span className="text-[#00FFF7] text-xs">
                  {currentDemo.mathFormula}
                </span>
              </div>
              <a
                href="https://github.com/arjun1k-dev/mathoxide-ide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#00FF9D] hover:underline flex items-center gap-1.5"
              >
                <span>View Source on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Description & Code Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-sm bg-[#0A002B]/80 border border-purple-800/60 space-y-2">
              <span className="text-xs font-bold text-[#FFE066] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFE066]" />
                <span>Scene Rendering Mechanics</span>
              </span>
              <p className="text-xs text-purple-200/90 leading-relaxed font-sans">
                {currentDemo.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-purple-950 text-cyan-300 border border-purple-800">
                  Content-Hashed BufCache
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-emerald-300 border border-purple-800">
                  16 MB Staging Ring
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-amber-300 border border-purple-800">
                  FrameMemo LRU (16K entries)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-sm bg-[#030010] border border-purple-900 overflow-x-auto text-xs">
              <span className="text-[10px] text-purple-400 font-bold block mb-1 uppercase tracking-wider">
                MathOxide DSL Script (.moa):
              </span>
              <pre className="text-[#00FFF7] text-[11px] font-mono-code leading-relaxed">
                <code>{currentDemo.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Playground & Simulator */}
      {activeTab === 'playground' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-sm bg-[#0A002B] border-2 border-purple-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-sm bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play Timeline'}</span>
              </button>
              <button
                onClick={() => {
                  setScrubTime(0);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-sm bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-300 hover:text-white cursor-pointer"
                title="Reset to 0.0s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="font-mono-code text-xs text-white">
                <span className="text-purple-400">Timestamp: </span>
                <strong className="text-[#FFE066] text-sm">{scrubTime.toFixed(2)}s</strong>
                <span className="text-purple-400"> / {currentDemo.duration.toFixed(1)}s</span>
              </div>
            </div>

            {/* Timeline Scrub Slider */}
            <div className="flex-1 min-w-[200px] flex items-center gap-3">
              <span className="text-[11px] text-purple-400">0s</span>
              <input
                type="range"
                min="0"
                max={currentDemo.duration}
                step="0.05"
                value={scrubTime}
                onChange={(e) => {
                  setScrubTime(parseFloat(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full h-2 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-[#00FFF7]"
              />
              <span className="text-[11px] text-purple-400">{currentDemo.duration.toFixed(0)}s</span>
            </div>
          </div>

          {/* Simulated Vector Canvas Display */}
          <div className="rounded-sm border-2 border-purple-800/80 bg-[#02000D] p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[340px]">
            {/* Background 2D Coordinate Grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8A2BE2" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Dynamic Simulated Math Mobjects */}
            <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto relative z-10">
              {/* Axes */}
              <line x1="50" y1="150" x2="550" y2="150" stroke="#00FFF7" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="300" y1="30" x2="300" y2="270" stroke="#00FFF7" strokeWidth="1.5" strokeOpacity="0.7" />

              {/* Sine / Taylor Function Curve dynamically grown by scrub progress */}
              <path
                d="M 50 150 Q 150 50 250 150 T 450 150 T 550 150"
                fill="none"
                stroke="#FFE066"
                strokeWidth="3"
                strokeDasharray="600"
                strokeDashoffset={`${600 * (1 - progress)}`}
                strokeLinecap="round"
              />

              {/* Dynamic Riemann / Calculus Area Bars */}
              {Array.from({ length: 12 }).map((_, i) => {
                const x = 120 + i * 28;
                const height = Math.sin((i / 12) * Math.PI) * 70 * Math.min(1, progress * 1.5);
                return (
                  <rect
                    key={i}
                    x={x}
                    y={150 - height}
                    width={22}
                    height={Math.max(0, height)}
                    fill="#C724FF"
                    fillOpacity="0.35"
                    stroke="#FF00A8"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Transforming Geometric Primitive (Circle into Rounded Rect) */}
              <rect
                x={260 + Math.sin(progress * Math.PI * 2) * 50}
                y={60}
                width={80}
                height={80}
                rx={progress > 0.5 ? 40 * (1 - (progress - 0.5) * 2) : 40}
                fill="#00FF9D"
                fillOpacity="0.25"
                stroke="#00FF9D"
                strokeWidth="2.5"
                transform={`rotate(${progress * 180} 300 100)`}
              />

              {/* LaTeX Formula Text Overlay */}
              <text
                x="300"
                y="260"
                textAnchor="middle"
                fill="#00FFF7"
                fontSize="18"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {progress < 0.5 ? 'Taylor: e^x = 1 + x + x²/2! + ...' : 'Gauss: ∫ e^{-x²} dx = √π'}
              </text>
            </svg>

            {/* Live Telemetry Overlay Box */}
            <div className="absolute bottom-3 left-3 bg-[#0A002B]/90 border border-purple-800 p-2.5 rounded text-[11px] font-mono-code space-y-1">
              <div>
                Frame Status: <span className="text-[#00FF9D] font-bold">ACTIVE (60.0 FPS)</span>
              </div>
              <div>
                Arc Refcount Clones: <span className="text-[#FFE066] font-bold">0 ms overhead</span>
              </div>
              <div>
                LRU Cache State: <span className="text-[#00FFF7] font-bold">FrameMemo HIT</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Architecture Deep-Dive */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          {/* Crate Architecture Map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-sm bg-[#0A002B] border-2 border-purple-800 space-y-2">
              <div className="text-xs font-bold text-[#FFE066] uppercase flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-[#FFE066]" />
                <span>1. Language & Parsing</span>
              </div>
              <p className="text-xs text-purple-200 font-sans leading-relaxed">
                <code className="text-[#00FFF7]">mo-dsl</code>: High-speed declarative parser for .moa files.
                Tracks file-relative imports, local origin bounding, and <code className="text-[#FFE066]">PlayOrigin</code> for
                cross-file bidirectional timeline edits.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#0A002B] border-2 border-purple-800 space-y-2">
              <div className="text-xs font-bold text-[#00FFF7] uppercase flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#00FFF7]" />
                <span>2. Core Geometry & Scene</span>
              </div>
              <p className="text-xs text-purple-200 font-sans leading-relaxed">
                <code className="text-[#00FFF7]">mo-core</code>: Vectorized Bézier geometry (<code className="text-[#FFE066]">VGroup</code>),
                camera orbit solver, calculus engines, and <code className="text-[#00FF9D]">FrameMemo</code> 16K-entry LRU cache
                for instant scrubbing.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#0A002B] border-2 border-purple-800 space-y-2">
              <div className="text-xs font-bold text-[#00FF9D] uppercase flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#00FF9D]" />
                <span>3. GPU Pipeline & Studio</span>
              </div>
              <p className="text-xs text-purple-200 font-sans leading-relaxed">
                <code className="text-[#00FFF7]">mo-render</code> & <code className="text-[#00FFF7]">mo-ide</code>:
                WebGPU 24 with 16 MB staging ring, bounded buffer pool recycling, and a fixed 1280×800 cyberpunk studio.
              </p>
            </div>
          </div>

          {/* Memory Budget & Hardware Constraints Table */}
          <div className="p-5 rounded-sm bg-[#0A002B]/90 border-2 border-purple-800 font-mono-code text-xs space-y-3">
            <div className="flex items-center justify-between font-bold text-white border-b border-purple-800/80 pb-2">
              <span>HARDWARE OPTIMIZATION PROFILE (LOW-VRAM BUDGET)</span>
              <span className="text-[#00FF9D]">TARGET: ~128 MB VRAM / STANDARD iGPU</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-1">
              <div className="p-3 bg-purple-950/60 rounded border border-purple-800">
                <div className="text-[10px] text-purple-300">GPU Staging Ring</div>
                <div className="text-base font-bold text-[#00FFF7]">16 MB</div>
                <div className="text-[9px] text-purple-400">Batched uploads</div>
              </div>
              <div className="p-3 bg-purple-950/60 rounded border border-purple-800">
                <div className="text-[10px] text-purple-300">Buffer Cache Budget</div>
                <div className="text-base font-bold text-[#00FF9D]">64 MB</div>
                <div className="text-[9px] text-purple-400">512 pooled entries</div>
              </div>
              <div className="p-3 bg-purple-950/60 rounded border border-purple-800">
                <div className="text-[10px] text-purple-300">FrameMemo LRU Cache</div>
                <div className="text-base font-bold text-[#FFE066]">16,384</div>
                <div className="text-[9px] text-purple-400">Zero-copy Arc state</div>
              </div>
              <div className="p-3 bg-purple-950/60 rounded border border-purple-800">
                <div className="text-[10px] text-purple-300">Render Resolution</div>
                <div className="text-base font-bold text-[#FF00A8]">1080p Target</div>
                <div className="text-[9px] text-purple-400">Half-res interactive scrub</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
