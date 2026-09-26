<div align="center">

# Arjun Korlekar — Engineering Portfolio

**Engineering Undergraduate | Software & Backend Developer**

B.Tech Electrical Engineering · COEP Technological University · Batch of '29

*Actively seeking Software Engineering & Backend Internships*

[![GitHub](https://img.shields.io/badge/GitHub-arjun1k--dev-181717?logo=github&logoColor=white)](https://github.com/arjun1k-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-arjun1k--dev-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arjun1k-dev/)
[![Email](https://img.shields.io/badge/Email-arjun1k.dev%40gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:arjun1k.dev@gmail.com)

</div>

---

An interactive, terminal-inspired portfolio and engineering dossier. Instead of a static resume page, the site presents skills, academics, and projects as live telemetry — with an in-browser shell, a command palette, and interactive visualizers for my two flagship builds.

## Features

- **Hero + About** — profile, tagline, and a 2×2 metric stats grid
- **Telemetry Matrix** — skill match bars across Backend & Web, Systems & C, and Math & Signals
- **Projects** — deep-dive spec modals with code walkthroughs:
  - **Overrun** — loss-aversion study tracker (Time Bank engine, Obsidian vault sync, tactical timeline)
  - **Resonance** — a Git reimplementation in C (SHA-1/zlib content-addressed object store, staging index, commit DAG)
- **Academics** — semester-wise SGPA/credits timeline and coursework registry
- **Interactive Terminal** — try `help`, `cat overrun.ts`, `reso status`, `timebank`
- **Command Palette** — `Cmd/Ctrl + K` to search everything: projects, CLI commands, coursework
- **Extras** — transcript viewer, PDF spec, PGP key modal, and dark/light theme toggle

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4 |
| Animation | Motion (Framer), GSAP |
| Icons / Assets | Lucide React, Material Symbols |

## Getting Started

**Prerequisites:** Node.js

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run clean` | Remove build artifacts |

## Project Structure

```
src/
├── App.tsx                  # Layout, theme state, modal orchestration
├── types.ts                 # Shared types (FocusTab, LeadershipRole, ...)
├── data/
│   ├── portfolioData.ts     # ★ Single source of truth for all content
│   └── arj.webp             # Profile portrait
└── components/
    ├── Hero.tsx             # Landing section
    ├── AboutSection.tsx     # Bio + metrics
    ├── TelemetryMatrix.tsx  # Skill match bars per focus area
    ├── ProjectsSection.tsx  # Overrun & Resonance showcases
    ├── AcademicsSection.tsx # SGPA timeline + coursework
    ├── TerminalModal.tsx    # Interactive shell
    ├── CommandPalette.tsx   # Cmd+K search
    └── ...                  # Navbar, Footer, modals, visualizers
```

## Customizing

All content — name, tagline, skills, leadership roles, academics, project data — lives in **`src/data/portfolioData.ts`**. Edit that one file to update the entire site; no component changes needed.

## Contact

- **Email:** [arjun1k.dev@gmail.com](mailto:arjun1k.dev@gmail.com)
- **GitHub:** [github.com/arjun1k-dev](https://github.com/arjun1k-dev)
- **LinkedIn:** [linkedin.com/in/arjun1k-dev](https://www.linkedin.com/in/arjun1k-dev/)
- **Location:** Pune, Maharashtra, India
