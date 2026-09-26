import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Key, Check, Copy } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface PgpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PgpModal: React.FC<PgpModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP v4.2.0
Comment: Arjun Korlekar <arjunkorlekar51@gmail.com> COEP Systems Lab

mQGNBF/9788BDADj0E1v73Y8jR7cT9XqQvX5eB7wL9pU3hZ8cK2mN1bV4xZ7cT0w
Q9pU3hZ8cK2mN1bV4xZ7cT0wQ9pU3hZ8cK2mN1bV4xZ7cT0wQ9pU3hZ8cK2mN1bV
4xZ7cT0wQ9pU3hZ8cK2mN1bV4xZ7cT0wQ9pU3hZ8cK2mN1bV4xZ7cT0wQ9pU3hZ8
cK2mN1bV4xZ7cT0wQ9pU3hZ8cK2mN1bV4xZ7cT0wQ9pU3hZ8cK2mN1bV4xZ7cT0w
=9A4X
-----END PGP PUBLIC KEY BLOCK-----`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pgpKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="w-full max-w-lg bg-slate-950 text-white rounded-sm shadow-2xl border border-emerald-900/60 overflow-hidden font-mono-code flex flex-col"
          >
            <div className="px-5 py-4 bg-slate-900 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">
                  PGP PUBLIC KEY :: ARJUN KORLEKAR
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="text-slate-400">
                Fingerprint: <span className="text-emerald-300 font-bold">4B89 772A 1F44 C902 E381  B992 0184 F820 CC81 90A2</span>
              </div>

              <pre className="p-3 bg-black/60 rounded-sm text-emerald-300 text-[10px] leading-relaxed border border-emerald-900/50 overflow-x-auto select-all">
                <code>{pgpKey}</code>
              </pre>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-500">
                  {PORTFOLIO_INFO.email}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
