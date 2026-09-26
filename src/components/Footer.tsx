import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Mail, Copy, Check, Github, Linkedin, MapPin, Quote, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenPdfSpec: () => void;
  onOpenTerminal: () => void;
  onOpenPgpModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPdfSpec,
  onOpenTerminal,
  onOpenPgpModal,
}) => {
  const [istTime, setIstTime] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime('21:15:00 IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const panelHeader = (label: string, code: string) => (
    <div className="flex items-center justify-between font-mono-code text-[10px] tracking-widest uppercase text-[var(--ink-faint)] border-b border-[var(--hairline)] pb-2 mb-5">
      <span>{label}</span>
      <span className="text-[var(--phosphor)]">{code}</span>
    </div>
  );

  return (
    <footer className="px-6 md:px-10 pb-12 max-w-7xl mx-auto w-full" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">
        {/* Panel 1: Transmission / contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 corners glass-card p-7 flex flex-col justify-between gap-6 card-hover-lift"
        >
          <div className="space-y-4">
            {panelHeader('open channel', 'TX-01')}
            <h3 className="font-display text-2xl font-bold text-[var(--ink)] leading-tight uppercase">
              Have a project <span className="text-[var(--phosphor)]">in mind?</span>
            </h3>
            <p className="text-sm text-[var(--ink-dim)] leading-relaxed font-normal">
              Looking for software/backend internship work. Email is the fastest channel — I reply fast.
            </p>
          </div>

          <div className="space-y-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={PORTFOLIO_INFO.mailtoLink}
              className="btn-scope w-full py-3.5 bg-[var(--phosphor)] hover:bg-[var(--phosphor-bright)] text-[#04120b] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transmit Message</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <button
              onClick={onOpenPdfSpec}
              className="w-full py-3 border border-[var(--hairline)] hover:border-[var(--amber)] text-[var(--ink-dim)] hover:text-[var(--amber)] font-mono-code text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              referral-spec.pdf →
            </button>
          </div>
        </motion.div>

        {/* Panel 2: signal received / quote */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="lg:col-span-4 corners corners-amber glass-card p-7 flex flex-col justify-between gap-6 card-hover-lift"
        >
          <div className="space-y-4">
            {panelHeader('signal sample', 'RX-02')}
            <Quote className="w-6 h-6 text-[var(--amber)]" />
            <p className="text-sm text-[var(--ink-dim)] leading-relaxed italic">
              "{PORTFOLIO_INFO.recruiterBio}"
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[var(--hairline)]">
            <div className="relative corners p-0.5">
              <img
                src={PORTFOLIO_INFO.portraitUrl}
                alt="Arjun Korlekar"
                className="w-10 h-10 object-cover"
              />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-[var(--ink)] uppercase tracking-wide">
                Arjun Korlekar
              </h4>
              <p className="text-[11px] font-mono-code text-[var(--ink-faint)]">
                COEP '29 · SW &amp; Backend
              </p>
            </div>
          </div>
        </motion.div>

        {/* Panel 3: uplink ports + telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="lg:col-span-4 corners glass-card p-7 flex flex-col justify-between gap-6 card-hover-lift"
        >
          <div className="space-y-4">
            {panelHeader('uplink ports', 'I/O-03')}
            <div className="flex items-center gap-2">
              <a
                href={PORTFOLIO_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] transition-all cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={PORTFOLIO_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] transition-all cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-3 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] transition-all cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4.5 h-4.5 text-[var(--phosphor)]" /> : <Mail className="w-4.5 h-4.5" />}
              </button>
              <button
                onClick={onOpenTerminal}
                className="p-3 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--phosphor)] hover:border-[var(--phosphor)] transition-all cursor-pointer"
                title="Terminal CLI"
              >
                <Clock className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={onOpenPgpModal}
                className="p-3 border border-[var(--hairline)] bg-[var(--bg-raised)] text-[var(--ink-dim)] hover:text-[var(--amber)] hover:border-[var(--amber)] font-mono-code text-[10px] font-bold transition-all cursor-pointer"
                title="PGP Public Key"
              >
                PGP
              </button>
            </div>

            <div className="space-y-2 pt-1 font-mono-code text-xs text-[var(--ink-dim)]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--phosphor)]" />
                <span>{PORTFOLIO_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--phosphor)]" />
                <span>{PORTFOLIO_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--hairline)] flex items-center justify-between text-xs font-mono-code text-[var(--ink-faint)]">
            <span className="uppercase tracking-wider">local clock</span>
            <span className="font-semibold text-[var(--ink)] tabular-nums">{istTime}</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-[var(--hairline)] flex flex-col md:flex-row items-center justify-between gap-3 font-mono-code text-[11px] text-[var(--ink-faint)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--phosphor)]">$</span>
          <span>© 2026 arjun korlekar: all signals reserved</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>handcrafted on the bench in</span>
          <span className="text-[var(--ink)] font-semibold">Pune, IN</span>
          <span className="w-1.5 h-1.5 bg-[var(--phosphor)] scope-pulse inline-block ml-1" />
        </div>
      </div>
    </footer>
  );
};
