import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const LogoTypeScript: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#3178C6"/>
    <path d="M11.5 13.5H9.5V18H7.5V13.5H5.5V11.8H11.5V13.5ZM13.2 17.1C13.6 17.5 14.3 17.8 15.2 17.8C16.3 17.8 16.9 17.3 16.9 16.5C16.9 15.7 16.2 15.3 15.1 14.9L14.4 14.6C13.2 14.2 12.3 13.4 12.3 12.1C12.3 10.5 13.7 9.5 15.6 9.5C16.9 9.5 17.9 9.9 18.6 10.5L17.5 11.8C17 11.3 16.3 11.1 15.6 11.1C14.7 11.1 14.2 11.5 14.2 12.1C14.2 12.7 14.8 13.1 15.8 13.4L16.5 13.7C17.9 14.2 18.8 15 18.8 16.4C18.8 18.1 17.2 19.3 15.1 19.3C13.7 19.3 12.4 18.7 11.8 17.9L13.2 17.1Z" fill="white"/>
  </svg>
);

export const LogoJavaScript: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
    <path d="M6.5 17.9L7.8 17.1C8.2 17.8 8.8 18.2 9.7 18.2C10.6 18.2 11.2 17.7 11.2 16.8V11.8H13.1V16.9C13.1 18.8 11.9 19.7 10 19.7C8.5 19.7 7.3 18.9 6.5 17.9ZM14 17.1L15.3 16.3C15.8 17 16.5 17.4 17.4 17.4C18.3 17.4 18.9 17 18.9 16.3C18.9 15.5 18.2 15.2 17.1 14.8L16.4 14.5C15.2 14.1 14.3 13.3 14.3 12C14.3 10.5 15.6 9.5 17.5 9.5C18.8 9.5 19.8 9.9 20.5 10.6L19.3 11.8C18.7 11.3 18.1 11.1 17.4 11.1C16.6 11.1 16.1 11.5 16.1 12C16.1 12.6 16.7 12.9 17.7 13.3L18.4 13.6C19.8 14.1 20.7 14.9 20.7 16.3C20.7 18 19.2 19.1 17.2 19.1C15.6 19.1 14.5 18.2 14 17.1Z" fill="#000000"/>
  </svg>
);

export const LogoReact: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
    <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
  </svg>
);

export const LogoNextjs: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#000000" stroke="#333333" strokeWidth="1"/>
    <path d="M14.8 16.8L9.2 8.5V7H7.5V17H9.2V11.2L14 18.2C14.3 17.8 14.6 17.3 14.8 16.8Z" fill="white"/>
    <rect x="15" y="7" width="1.7" height="10" fill="white"/>
  </svg>
);

export const LogoNodejs: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2.5 7.5V18.5L12 24L21.5 18.5V7.5L12 2Z" fill="#5FA04E"/>
    <path d="M12 4.5L19.5 8.8V17.2L12 21.5L4.5 17.2V8.8L12 4.5Z" fill="#336633" opacity="0.3"/>
    <path d="M12 6L6 9.5V16.5L12 20L18 16.5V9.5L12 6Z" fill="#FFFFFF"/>
    <path d="M12 8L8 10.3V14.7L12 17L16 14.7V10.3L12 8Z" fill="#5FA04E"/>
  </svg>
);

export const LogoPython: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.87 2c-5.26 0-4.94 2.28-4.94 2.28l.01 2.37h5.02v.72H4.96S2 7.02 2 12.31c0 5.29 2.58 5.1 2.58 5.1h1.54v-2.18s-.08-2.61 2.57-2.61h4.98s2.44.04 2.44-2.35V4.72S16.59 2 11.87 2zm-1.39 1.54a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56z" fill="#3776AB"/>
    <path d="M12.13 22c5.26 0 4.94-2.28 4.94-2.28l-.01-2.37h-5.02v-.72h7.02S22 16.98 22 11.69c0-5.29-2.58-5.1-2.58-5.1h-1.54v2.18s.08 2.61-2.57 2.61h-4.98s-2.44-.04-2.44 2.35v7.55S7.41 22 12.13 22zm1.39-1.54a.78.78 0 1 1 0-1.56.78.78 0 0 1 0 1.56z" fill="#FFD43B"/>
  </svg>
);

export const LogoFastAPI: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#059669"/>
    <path d="M13.5 3L6 13.5H12L10.5 21L18 10.5H12L13.5 3Z" fill="white"/>
  </svg>
);

export const LogoC: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.97 2L2 7.75v11.5L11.97 25l9.97-5.75V7.75L11.97 2z" fill="#A8B9CC" transform="scale(0.85) translate(2 1)"/>
    <path d="M12 6.5C8.96 6.5 6.5 8.96 6.5 12s2.46 5.5 5.5 5.5c2.14 0 4.01-1.22 4.93-3h-2.31c-.65.75-1.59 1.2-2.62 1.2-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5c1.03 0 1.97.45 2.62 1.2h2.31c-.92-1.78-2.79-3-4.93-3z" fill="#1D4ED8"/>
  </svg>
);

export const LogoCpp: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#00599C"/>
    <path d="M10 8.5C8.1 8.5 6.5 10.1 6.5 12s1.6 3.5 3.5 3.5c1.4 0 2.6-.8 3.1-2h-1.6c-.4.5-1 .8-1.5.8-1.1 0-2-.9-2-2s.9-2 2-2c.6 0 1.2.3 1.5.8h1.6c-.5-1.2-1.7-2-3.1-2z" fill="white"/>
    <path d="M14.5 11h1v-1h1v1h1v1h-1v1h-1v-1h-1v-1zm4 0h1v-1h1v1h1v1h-1v1h-1v-1h-1v-1z" fill="white"/>
  </svg>
);

export const LogoSQLite: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#003B57"/>
    <path d="M12 4C7.58 4 4 5.79 4 8v8c0 2.21 3.58 4 8 4s8-1.79 8-4V8c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.3 6 2s-2.13 2-6 2-6-1.3-6-2 2.13-2 6-2zm0 12c-3.87 0-6-1.3-6-2v-1.8c1.37.93 3.6 1.47 6 1.47s4.63-.54 6-1.47V16c0 .7-2.13 2-6 2zm0-4c-3.87 0-6-1.3-6-2v-1.8c1.37.93 3.6 1.47 6 1.47s4.63-.54 6-1.47V12c0 .7-2.13 2-6 2z" fill="#41B883"/>
  </svg>
);

export const LogoPrisma: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19.5L17.5 2.5L20.5 16.5L9.5 21.5L6 19.5Z" stroke="#2D3748" strokeWidth="1.5" fill="#1A202C"/>
    <path d="M6 19.5L17.5 2.5L11 20.5L6 19.5Z" fill="#5A67D8"/>
    <path d="M17.5 2.5L20.5 16.5L11 20.5L17.5 2.5Z" fill="#319795"/>
  </svg>
);

export const LogoTailwind: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4"/>
  </svg>
);

export const LogoGit: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6 10.9L13.1 2.4C12.5 1.8 11.5 1.8 10.9 2.4L2.4 10.9C1.8 11.5 1.8 12.5 2.4 13.1L10.9 21.6C11.5 22.2 12.5 22.2 13.1 21.6L21.6 13.1C22.2 12.5 22.2 11.5 21.6 10.9Z" fill="#F05032"/>
    <path d="M15.5 12.5C14.7 12.5 14 13.2 14 14C14 14.6 14.4 15.1 14.9 15.4L13.2 17.1C12.8 17 12.4 17 12 17.2L9.8 15C10 14.6 10.1 14.1 10 13.6C9.8 12.8 9.1 12.2 8.3 12.1C7.2 11.9 6.2 12.7 6.1 13.8C6 14.7 6.6 15.5 7.5 15.8L7.5 18.2C7 18.5 6.6 19 6.6 19.6C6.6 20.4 7.3 21.1 8.1 21.1C8.9 21.1 9.6 20.4 9.6 19.6C9.6 19.1 9.3 18.6 8.9 18.3L8.9 16C9.2 16.1 9.5 16.1 9.8 16L12 18.2C11.9 18.5 11.9 18.8 12 19.1C12.2 19.8 12.9 20.4 13.7 20.5C14.8 20.7 15.8 19.9 15.9 18.8C16 17.9 15.4 17.1 14.5 16.8L16.2 15.1C16.7 15.4 17.3 15.3 17.7 14.9C18.3 14.3 18.3 13.3 17.7 12.7C17.1 12.3 16.3 12.2 15.5 12.5Z" fill="white"/>
  </svg>
);

export const LogoHTML5: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0z" fill="#E34F26"/>
    <path d="M12 2.18v19.67l6.844-1.95L20.44 2.18H12z" fill="#EF652A"/>
    <path d="M12 8.787H7.135l.213 2.45h4.652v2.45H7.562l.213 2.45 4.225 1.173v2.544l-6.738-1.87-.43-4.966h7.168V8.787z" fill="#FFFFFF"/>
    <path d="M12 8.787h4.865l-.43 4.904-4.435 1.233v2.544l6.738-1.87.643-7.261H12v.45z" fill="#ECECEC"/>
  </svg>
);

export const LogoCSS3: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0z" fill="#1572B6"/>
    <path d="M12 2.18v19.67l6.844-1.95L20.44 2.18H12z" fill="#33A9DC"/>
    <path d="M12 7.787H7.135l.213 2.45h4.652v2.45H7.562l.213 2.45 4.225 1.173v2.544l-6.738-1.87-.43-4.966h4.945V9.787H5.623L5.41 7.337H12v.45z" fill="#FFFFFF"/>
  </svg>
);

export const LogoLinux: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#0F172A"/>
    <path d="M12 5C9.2 5 8 7.5 8 11v3c0 2 1 4 4 4s4-2 4-4v-3c0-3.5-1.2-6-4-6z" fill="#FFFFFF"/>
    <ellipse cx="10.5" cy="10" rx="1" ry="1.5" fill="#000000"/>
    <ellipse cx="13.5" cy="10" rx="1" ry="1.5" fill="#000000"/>
    <path d="M11 12.5c.5.5 1.5.5 2 0" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 16c1 1 3 1.5 5 1.5s4-.5 5-1.5" stroke="#EAB308" strokeWidth="1.5"/>
  </svg>
);

export const LogoMatlab: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#CB4814"/>
    <path d="M4 17L8 7L12 15L16 9L20 17H4Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    <path d="M8 7L12 15L16 9" stroke="#FFD700" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const LogoCMake: React.FC<LogoProps> = ({ className = "w-5 h-5", size }) => (
  <svg viewBox="0 0 24 24" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 20H22L12 2Z" fill="#064F8C"/>
    <path d="M12 2L7 20H17L12 2Z" fill="#008F53"/>
    <path d="M12 2L12 20" stroke="#E2231A" strokeWidth="1.5"/>
  </svg>
);

// Map helper to fetch SVG by tech name string
export const TechLogo: React.FC<{ name: string; className?: string; size?: number }> = ({ name, className = "w-5 h-5", size }) => {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes('typescript') || normalized === 'ts') return <LogoTypeScript className={className} size={size} />;
  if (normalized.includes('javascript') || normalized === 'js') return <LogoJavaScript className={className} size={size} />;
  if (normalized.includes('react')) return <LogoReact className={className} size={size} />;
  if (normalized.includes('next')) return <LogoNextjs className={className} size={size} />;
  if (normalized.includes('node')) return <LogoNodejs className={className} size={size} />;
  if (normalized.includes('python')) return <LogoPython className={className} size={size} />;
  if (normalized.includes('fastapi')) return <LogoFastAPI className={className} size={size} />;
  if (normalized.includes('c++') || normalized.includes('cpp')) return <LogoCpp className={className} size={size} />;
  if (normalized === 'c' || normalized.includes('c programming') || normalized.includes('c / c++') || normalized.includes('c/c++')) return <LogoC className={className} size={size} />;
  if (normalized.includes('sqlite')) return <LogoSQLite className={className} size={size} />;
  if (normalized.includes('prisma')) return <LogoPrisma className={className} size={size} />;
  if (normalized.includes('tailwind')) return <LogoTailwind className={className} size={size} />;
  if (normalized.includes('git')) return <LogoGit className={className} size={size} />;
  if (normalized.includes('html')) return <LogoHTML5 className={className} size={size} />;
  if (normalized.includes('css')) return <LogoCSS3 className={className} size={size} />;
  if (normalized.includes('linux') || normalized.includes('posix')) return <LogoLinux className={className} size={size} />;
  if (normalized.includes('matlab')) return <LogoMatlab className={className} size={size} />;
  if (normalized.includes('cmake')) return <LogoCMake className={className} size={size} />;

  return null;
};
