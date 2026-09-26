import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Trophy,
  Terminal,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { TechLogo } from './TechLogos';

export interface BentoCardProps {
  color?: string;
  borderColor?: string;
  glowColor?: string;
  title?: string;
  description?: string;
  label?: string;
  badge?: string;
  tag?: string;
  icon?: React.ReactNode;
  techs?: string[];
  metric?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  cards?: BentoCardProps[];
  onCardClick?: (index: number, card: BentoCardProps) => void;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 320;
const DEFAULT_LIGHT_GLOW_COLOR = '61, 220, 151'; // Phosphor Green
const MOBILE_BREAKPOINT = 768;

export const DEFAULT_LIGHT_CARDS: BentoCardProps[] = [
  {
    color: 'var(--bg-raised)',
    borderColor: 'var(--hairline)',
    glowColor: '61, 220, 151', // Phosphor
    title: 'Modern Full-Stack & Runtimes',
    description: 'Next.js 15 App Router, React 19, Zustand state, type-safe Zod schemas, and FastAPI microservices.',
    label: '01 / Full-Stack',
    badge: 'Core Match',
    techs: ['Next.js', 'React', 'TypeScript', 'FastAPI'],
    icon: <Code2 className="w-5 h-5 text-blue-700" />,
    metric: '96% Rigor',
  },
  {
    color: 'var(--bg-raised)',
    borderColor: 'var(--hairline)',
    glowColor: '4, 120, 87', // Emerald Teal
    title: 'Systems Programming & C VCS',
    description: 'POSIX C low-level file I/O, SHA-1 fan-out object storage, zlib compression, and CMake build pipelines.',
    label: '02 / Systems',
    badge: 'Git Architecture',
    techs: ['C', 'Linux', 'CMake', 'Git'],
    icon: <Cpu className="w-5 h-5 text-emerald-700" />,
    metric: 'Resonance VCS',
  },
  {
    color: 'var(--bg-raised)',
    borderColor: 'var(--hairline)',
    glowColor: '217, 119, 6', // Amber Gold
    title: 'Offline-First & Local Storage',
    description: 'Zero-token local Obsidian vault sync, Web File System Access API, SQLite & Prisma schema migrations.',
    label: '03 / Storage',
    badge: '$0 API Cost',
    techs: ['SQLite', 'Prisma', 'TypeScript'],
    icon: <Database className="w-5 h-5 text-amber-700" />,
    metric: 'OVERRUN Core',
  },
  {
    color: 'var(--bg-raised)',
    borderColor: 'var(--hairline)',
    glowColor: '61, 220, 151', // Phosphor
    title: 'Academic Engineering Foundation',
    description: 'Electrical Engineering student at COEP Technological University (\'29, 7.32 CGPA, Signals & Systems).',
    label: '04 / Academics',
    badge: 'COEP Tech',
    techs: ['Matlab', 'C', 'Python'],
    icon: <GraduationCap className="w-5 h-5 text-blue-700" />,
    metric: '+0.55 SGPA Delta',
  },
  {
    color: 'var(--bg-raised)',
    borderColor: 'var(--hairline)',
    glowColor: '4, 120, 87', // Emerald
    title: 'Leadership & Web Engineering',
    description: 'Coordinated web infrastructure and digital platforms for major technical fests MindSpark & Pune Startup Fest.',
    label: '05 / Leadership',
    badge: '3+ Tech Fests',
    techs: ['React', 'TypeScript', 'Tailwind'],
    icon: <Trophy className="w-5 h-5 text-emerald-700" />,
    metric: 'COEP Lead',
  },
  {
    color: 'var(--bg-raised)',
    borderColor: 'var(--hairline)',
    glowColor: '217, 119, 6', // Amber
    title: 'Automated Tooling & Sandbox CLI',
    description: 'Interactive in-browser CLI sandbox, Unix shell dev environment, and loss-aversion time banking algorithms.',
    label: '06 / Automation',
    badge: 'Interactive CLI',
    techs: ['Linux', 'TypeScript', 'Python'],
    icon: <Terminal className="w-5 h-5 text-amber-700" />,
    metric: 'Headless Sandbox',
  },
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_LIGHT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(${color}, 0.9);
    box-shadow: 0 0 8px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_LIGHT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 90,
          y: (Math.random() - 0.5) * 90,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.25,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        });
      }, index * 90);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 4,
          rotateY: 4,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.04;
        const magnetY = (y - centerY) * 0.04;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.15) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_LIGHT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight-light';
    spotlight.style.cssText = `
      position: fixed;
      width: 750px;
      height: 750px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 20%,
        rgba(${glowColor}, 0.03) 35%,
        transparent 65%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section-light');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.card-bento');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        cards.forEach((card) => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.95
          : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.95
          : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card-bento').forEach((card) => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid: React.FC<{
  children: React.ReactNode;
  gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
  <div
    className="bento-section-light w-full select-none relative"
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_LIGHT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  cards = DEFAULT_LIGHT_CARDS,
  onCardClick,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>
        {`
          .bento-section-light {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 220px;
            --glow-color: ${glowColor};
            --border-color: var(--hairline);
            --card-bg-light: var(--bg-raised);
            --text-dark: #101a14;
          }

          .card-bento-responsive {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
            width: 100%;
          }

          @media (min-width: 640px) {
            .card-bento-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .card-bento-responsive {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .card--border-glow-light::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2.5px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(var(--card-glow-color, ${glowColor}), calc(var(--glow-intensity) * 0.95)) 0%,
                rgba(var(--card-glow-color, ${glowColor}), calc(var(--glow-intensity) * 0.45)) 35%,
                transparent 65%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 2;
          }

          .card-bento-responsive .card-bento:hover::after {
            opacity: 1;
          }

          .card-bento-responsive .card-bento:hover {
            box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08), 0 0 25px rgba(61, 220, 151, 0.16);
          }

          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.25);
            border-radius: 50%;
            z-index: -1;
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="card-bento-responsive">
          {cards.map((card, index) => {
            const cardGlow = card.glowColor || glowColor;
            const baseClassName = `card-bento flex flex-col justify-between relative min-h-[220px] w-full p-6 sm:p-7 rounded-sm border border-slate-300 dark:border-slate-800 bg-[var(--bg-raised)] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 ${
              enableBorderGlow ? 'card--border-glow-light' : ''
            }`;

            const cardStyle = {
              backgroundColor: card.color || '#ffffff',
              borderColor: card.borderColor || 'var(--hairline)',
              color: 'var(--ink)',
              '--card-glow-color': cardGlow,
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '220px',
            } as React.CSSProperties;

            const content = (
              <>
                {/* Header Meta Row */}
                <div className="card__header flex items-center justify-between gap-3 relative z-10 w-full mb-3">
                  <div className="flex items-center gap-2.5">
                    {card.icon && (
                      <div className="p-2.5 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                        {card.icon}
                      </div>
                    )}
                    <span className="card__label font-mono-code text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {card.label}
                    </span>
                  </div>

                  {card.badge && (
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-mono-code text-[11px] font-bold border border-blue-300 dark:border-blue-800 shadow-2xs">
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="card__content flex flex-col relative z-10 space-y-2 my-2">
                  <h3 className={`card__title font-display text-lg font-bold text-slate-900 dark:text-white leading-snug ${textAutoHide ? 'text-clamp-1' : ''}`}>
                    {card.title}
                  </h3>
                  <p className={`card__description text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal ${textAutoHide ? 'text-clamp-2' : ''}`}>
                    {card.description}
                  </p>
                </div>

                {/* Footer Tech Logos & Metric */}
                <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 relative z-10">
                  {card.techs && card.techs.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {card.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono-code text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                        >
                          <TechLogo name={tech} className="w-3.5 h-3.5 shrink-0" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}

                  {card.metric && (
                    <span className="font-mono-code text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1 ml-auto">
                      <span>{card.metric}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </>
            );

            if (enableStars) {
              return (
                <ParticleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={cardGlow}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                  onClick={() => onCardClick?.(index, card)}
                >
                  {content}
                </ParticleCard>
              );
            }

            return (
              <div
                key={index}
                className={baseClassName}
                style={cardStyle}
                onClick={() => onCardClick?.(index, card)}
              >
                {content}
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
