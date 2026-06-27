# CHANGELOG.md

Tutte le modifiche significative vengono documentate qui.
Formato basato su [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

## [0.2.0] — 2026-06-27 — Milestone 1: Layout base e navigazione

### Added
- `src/types/index.ts` — interfacce TypeScript (Project, TimelineItem, Certification, HeroBadge, Stat…)
- `src/constants/data.ts` — tutti i dati del portfolio (info personali, progetti, timeline, certificazioni, social)
- `src/components/layout/Layout.tsx` — wrapper con Header e Footer
- `src/components/layout/Header.tsx` — navbar sticky con logo SM.DEV, nav links, badge DISPONIBILE ● (ping verde), menu mobile
- `src/components/layout/Footer.tsx` — footer minimalista
- `src/components/sections/HeroSection.tsx` — hero completo: nome Rubik 900, cursore lampeggiante, badge tech flottanti, glow viola, stats con accento, animazioni Framer Motion sequenziali
- `src/components/ui/SectionLabel.tsx` — componente riutilizzabile label sezione (linea accent + testo)
- `src/pages/HomePage.tsx` — pagina principale con tutte le sezioni (Hero completo + stub per M2)
- Font Rubik Black (900) da Google Fonts (confermato dall'utente come font del design)

### Changed
- `src/main.tsx` — aggiunto BrowserRouter
- `src/App.tsx` — sostituito con Routes, lazy load HomePage
- `src/index.css` — aggiornato token design con palette reale (`#080808`, `#f0ece0`, `#7c5bdf`), animazione `.cursor-blink`, stile `.section-label`, font Rubik
- `index.html` — aggiornato titolo, lingua `it`, import Google Fonts (Rubik + Inter + JetBrains Mono)
- `CLAUDE.md` — aggiornato con design tokens reali e font corretto

### Removed
- `src/App.css` — rimosso (non più necessario, sostituito da Tailwind)
- `src/assets/react.svg`, `vite.svg`, `hero.png` — rimossi (file template Vite non utilizzati)

## [0.1.0] — 2026-06-27

### Added
- Scaffolding progetto con Vite 8 + React 19 + TypeScript 6
- Installazione React Router 7, Framer Motion 12, Tailwind CSS 4
- Plugin `@tailwindcss/vite` (integrazione nativa, nessun postcss.config)
- Path alias `@/` → `./src/` in vite.config.ts e tsconfig.app.json
- Struttura cartelle professionale: `components/ui`, `components/layout`, `components/sections`, `pages`, `hooks`, `lib`, `styles`, `types`, `constants`, `context`
- Design tokens dark in `src/index.css` (`@theme`): palette, tipografia, ombre, raggi
- Documentazione: `CLAUDE.md`, `README.md`, `PROJECT_CONTEXT.md`, `ROADMAP.md`, `ARCHITECTURE.md`
- Configurazione Vercel (`vercel.json`)
- `.gitignore` aggiornato

### Changed
- `package.json`: rinominato da `portfolio-temp` a `portfolio`
- `README.md`: riscritto con documentazione del progetto reale
- `src/index.css`: riscritto con Tailwind v4 e design tokens custom (sostituisce il CSS template Vite)

### Infrastructure
- Node.js: 24.17.0
- npm: 11.13.0
