import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitCommit, GitBranch, Layers, Hash, Database, Cpu, Check, Terminal, FileCode, Play, Sparkles } from 'lucide-react';

interface DagNode {
  id: string;
  sha: string;
  shortSha: string;
  parentSha: string | null;
  message: string;
  author: string;
  timestamp: string;
  treeSha: string;
  stagedFiles: { name: string; type: 'blob' | 'tree'; size: number; hash: string }[];
  branch: string;
  isHead: boolean;
}

const INITIAL_DAG: DagNode[] = [
  {
    id: '1',
    sha: '8f3a92b1c4e7d5a06921b84f31920e17623910ab',
    shortSha: '8f3a92b',
    parentSha: null,
    message: 'reso setup: initialize .reso repository structure',
    author: 'Arjun Korlekar <arjun1k.dev@gmail.com>',
    timestamp: '2026-09-20 14:22:01 UTC',
    treeSha: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    stagedFiles: [
      { name: 'main.c', type: 'blob', size: 1420, hash: 'a1b2c3d4e5f6' },
      { name: '.reso/config', type: 'blob', size: 180, hash: 'f6e5d4c3b2a1' },
    ],
    branch: 'main',
    isHead: false,
  },
  {
    id: '2',
    sha: '4b825dc91f3a207e81290bb34219c00189a741ef',
    shortSha: '4b825dc',
    parentSha: '8f3a92b1c4e7d5a06921b84f31920e17623910ab',
    message: 'feat(objects): implement zlib deflate & SHA-1 fan-out store',
    author: 'Arjun Korlekar <arjun1k.dev@gmail.com>',
    timestamp: '2026-09-22 09:15:40 UTC',
    treeSha: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e',
    stagedFiles: [
      { name: 'src/objects.c', type: 'blob', size: 3410, hash: '4b825dc91f3a' },
      { name: 'src/objects.h', type: 'blob', size: 940, hash: '7c8d9e0f1a2b' },
      { name: 'Makefile', type: 'blob', size: 520, hash: '3e4f5a6b7c8d' },
    ],
    branch: 'main',
    isHead: false,
  },
  {
    id: '3',
    sha: 'e9102c77d48f91b0c32e54117a892b1f490132cd',
    shortSha: 'e9102c7',
    parentSha: '4b825dc91f3a207e81290bb34219c00189a741ef',
    message: 'feat(staging): binary index file packing & stage command',
    author: 'Arjun Korlekar <arjun1k.dev@gmail.com>',
    timestamp: '2026-09-24 18:40:12 UTC',
    treeSha: '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    stagedFiles: [
      { name: 'src/staging.c', type: 'blob', size: 2890, hash: 'e9102c77d48f' },
      { name: 'src/index.h', type: 'blob', size: 1150, hash: '1f2e3d4c5b6a' },
    ],
    branch: 'main',
    isHead: true,
  },
];

export const ResonanceVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<DagNode[]>(INITIAL_DAG);
  const [selectedNode, setSelectedNode] = useState<DagNode>(INITIAL_DAG[2]);
  const [inputFileName, setInputFileName] = useState('src/diff_engine.c');
  const [inputFileContent, setInputFileContent] = useState('// POSIX File Diff Engine in C\n#include <stdio.h>\n#include <zlib.h>\n\nint diff_trees(const char* t1, const char* t2) {\n  return 0; // SHA-1 comparison\n}');
  const [hashOutput, setHashOutput] = useState<string | null>(null);
  const [fanOutDir, setFanOutDir] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dag' | 'hashing' | 'fanout'>('dag');

  // Simple pseudo SHA-1 hash generator for interactive visualizer
  const generateSha1 = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `d7a83f${hex}91c42b0e77148a09f3e1b2`;
  };

  const handleHashObject = () => {
    const sha = generateSha1(inputFileContent);
    const fanOut = `.reso/objects/${sha.slice(0, 2)}/${sha.slice(2)}`;
    setHashOutput(sha);
    setFanOutDir(fanOut);
  };

  const handleCreateSnapshot = () => {
    if (!hashOutput) {
      handleHashObject();
    }
    const currentSha = hashOutput || generateSha1(inputFileContent);
    const newHeadSha = generateSha1(currentSha + Date.now().toString());
    const shortSha = newHeadSha.slice(0, 7);
    const newDagNode: DagNode = {
      id: (nodes.length + 1).toString(),
      sha: newHeadSha,
      shortSha: shortSha,
      parentSha: selectedNode.sha,
      message: `snapshot: add ${inputFileName} to content-addressable store`,
      author: 'Arjun Korlekar <arjun1k.dev@gmail.com>',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      treeSha: generateSha1('tree_' + newHeadSha),
      stagedFiles: [
        { name: inputFileName, type: 'blob', size: inputFileContent.length, hash: currentSha.slice(0, 12) },
      ],
      branch: 'main',
      isHead: true,
    };

    const updatedNodes = nodes.map(n => ({ ...n, isHead: false })).concat(newDagNode);
    setNodes(updatedNodes);
    setSelectedNode(newDagNode);
    setActiveTab('dag');
  };

  return (
    <div className="w-full bg-[#041914] text-[#e2f1ec] rounded-sm border border-emerald-800/40 p-5 md:p-7 shadow-2xl font-geist relative overflow-hidden">
      {/* Background Micro Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-400 font-mono-code text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-emerald-400" />
              <span>Resonance (`reso`) System Simulator</span>
            </span>
            <span className="text-xs font-mono-code text-emerald-300/60">POSIX / C Implementation</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white tracking-tight">
            Content-Addressable Storage & Commit DAG Visualizer
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-[#020e0c] rounded-sm border border-emerald-900/80 font-mono-code text-xs">
          <button
            onClick={() => setActiveTab('dag')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dag'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-400/80 hover:text-white'
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>Commit DAG</span>
          </button>
          <button
            onClick={() => setActiveTab('hashing')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hashing'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-400/80 hover:text-white'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>SHA-1 Store</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Views */}
      {activeTab === 'dag' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* DAG Chain Visualization */}
          <div className="lg:col-span-7 bg-[#020d0a] rounded-sm border border-emerald-900/60 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-code text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Branch: main (HEAD)</span>
                </span>
                <span className="text-xs font-mono-code text-emerald-500/80">
                  {nodes.length} Commit Objects in DAG
                </span>
              </div>

              {/* Interactive Node Chain */}
              <div className="space-y-4 relative before:absolute before:left-4 before:top-6 before:bottom-6 before:w-0.5 before:bg-emerald-800/60">
                {nodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <motion.div
                      key={node.id}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedNode(node)}
                      className={`relative z-10 pl-10 p-3.5 rounded-sm border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/90 border-emerald-500 shadow-md shadow-emerald-900/30'
                          : 'bg-[#041712]/80 border-emerald-900/50 hover:border-emerald-700/60'
                      }`}
                    >
                      {/* Node Bullet Marker */}
                      <div
                        className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          node.isHead
                            ? 'bg-emerald-400 border-white ring-4 ring-emerald-500/30 animate-pulse'
                            : isSelected
                            ? 'bg-emerald-500 border-emerald-200'
                            : 'bg-[#020d0a] border-emerald-700'
                        }`}
                      />

                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code text-xs font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-600/40">
                            {node.shortSha}
                          </span>
                          {node.isHead && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-teal-500 text-slate-950 uppercase">
                              HEAD → main
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono-code text-emerald-400/60">
                          {node.timestamp.split(' ')[0]}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-emerald-100 font-geist line-clamp-1">
                        {node.message}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-6 pt-4 border-t border-emerald-900/60 flex items-center justify-between">
              <span className="text-xs font-mono-code text-emerald-400/80">
                Simulate new commit DAG node:
              </span>
              <button
                onClick={() => setActiveTab('hashing')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono-code text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Hash & Snapshot File</span>
              </button>
            </div>
          </div>

          {/* Selected Commit Node Deep-Dive */}
          <div className="lg:col-span-5 bg-[#020d0a] rounded-sm border border-emerald-900/60 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 mb-4">
                <span className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Commit Object Inspector</span>
                </span>
                <span className="text-[11px] font-mono-code text-emerald-400/70">
                  Object Type: commit
                </span>
              </div>

              <div className="space-y-3 font-mono-code text-xs">
                <div>
                  <span className="text-emerald-400/60 block text-[10px] uppercase">SHA-1 Hash (160-bit)</span>
                  <span className="text-emerald-300 font-bold break-all bg-[#041914] px-2 py-1 rounded border border-emerald-900/80 block mt-0.5">
                    {selectedNode.sha}
                  </span>
                </div>

                {selectedNode.parentSha && (
                  <div>
                    <span className="text-emerald-400/60 block text-[10px] uppercase">Parent Commit SHA</span>
                    <span className="text-teal-400/90 break-all bg-[#041914] px-2 py-1 rounded border border-emerald-900/80 block mt-0.5 text-[11px]">
                      {selectedNode.parentSha}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-emerald-400/60 block text-[10px] uppercase">Root Tree Object</span>
                  <span className="text-cyan-400/90 break-all bg-[#041914] px-2 py-1 rounded border border-emerald-900/80 block mt-0.5 text-[11px]">
                    {selectedNode.treeSha}
                  </span>
                </div>

                <div>
                  <span className="text-emerald-400/60 block text-[10px] uppercase">Author Header</span>
                  <span className="text-emerald-200 block mt-0.5 font-geist">{selectedNode.author}</span>
                </div>

                <div>
                  <span className="text-emerald-400/60 block text-[10px] uppercase mb-1.5">
                    Staged Objects in Tree ({selectedNode.stagedFiles.length})
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedNode.stagedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded bg-[#041914] border border-emerald-900/60 text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-200 font-medium">{file.name}</span>
                        </div>
                        <span className="text-emerald-400/70 font-mono-code">{file.size}B</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-emerald-900/60 text-[11px] font-mono-code text-emerald-400/70 flex items-center justify-between">
              <span>Path: `.reso/objects/{selectedNode.sha.slice(0, 2)}/{selectedNode.sha.slice(2)}`</span>
              <span className="text-emerald-400 font-bold">zlib compressed</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hashing' && (
        <div className="bg-[#020d0a] rounded-sm border border-emerald-900/60 p-5 font-mono-code text-xs">
          <h4 className="text-sm font-bold text-white font-display mb-2 flex items-center gap-2">
            <Hash className="w-4 h-4 text-emerald-400" />
            <span>Interactive SHA-1 Object Hashing & Fan-Out Store</span>
          </h4>
          <p className="text-emerald-300/70 font-geist text-xs mb-4">
            Test how Resonance formats file payloads into `blob &lt;size&gt;\0&lt;content&gt;`, hashes them with SHA-1, compresses with zlib, and places them into the two-character fan-out directory structure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-emerald-400/80 mb-1 font-semibold text-[11px] uppercase">
                Target File Path:
              </label>
              <input
                type="text"
                value={inputFileName}
                onChange={(e) => setInputFileName(e.target.value)}
                className="w-full bg-[#041914] border border-emerald-800/80 rounded-lg px-3 py-2 text-emerald-200 font-mono-code focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-emerald-400/80 mb-1 font-semibold text-[11px] uppercase">
                File Content:
              </label>
              <textarea
                rows={3}
                value={inputFileContent}
                onChange={(e) => setInputFileContent(e.target.value)}
                className="w-full bg-[#041914] border border-emerald-800/80 rounded-lg px-3 py-2 text-emerald-200 font-mono-code focus:outline-none focus:border-emerald-400 resize-none text-[11px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={handleHashObject}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-2 cursor-pointer transition-all shadow-xs"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>`reso hash-object`</span>
            </button>

            <button
              onClick={handleCreateSnapshot}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 cursor-pointer transition-all shadow-xs"
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>`reso snapshot` (Commit)</span>
            </button>
          </div>

          {/* Result Terminal Output */}
          {hashOutput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-[#041914] border border-emerald-700/60 space-y-2 text-[11px]"
            >
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>SHA-1 Object Written Successfully</span>
              </div>
              <div className="text-emerald-200">
                <span className="text-emerald-400/60">SHA-1 Hash: </span>
                <span className="font-bold text-teal-300">{hashOutput}</span>
              </div>
              <div className="text-emerald-200">
                <span className="text-emerald-400/60">Fan-Out Object Location: </span>
                <span className="font-bold text-cyan-300">{fanOutDir}</span>
              </div>
              <div className="text-emerald-400/70 text-[10px]">
                Payload Header: `blob {inputFileContent.length}\0...` | zlib Deflate compression ratio: ~64%
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
