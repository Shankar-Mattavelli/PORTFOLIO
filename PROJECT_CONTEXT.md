# PROJECT_CONTEXT.md

Contesto interno di sviluppo. Aggiornare ad ogni milestone significativa.

---

## Stato attuale

**Data:** 2026-06-27
**Fase:** Setup iniziale completato
**Versione:** 0.1.0 (pre-alpha)

### Completato
- [x] Scaffolding Vite + React + TypeScript
- [x] Installazione dipendenze: React Router, Framer Motion, Tailwind CSS v4
- [x] Configurazione path alias `@/`
- [x] Struttura cartelle professionale `src/`
- [x] Design tokens definiti in `src/index.css` (`@theme`)
- [x] Documentazione iniziale (README, ROADMAP, ARCHITECTURE, CHANGELOG, CLAUDE.md)
- [x] Configurazione Vercel (`vercel.json`)

### In corso
- [ ] Milestone 1: Layout base e navigazione

### Prossimi passi
Vedere ROADMAP.md

---

## Decisioni prese

| Decisione | Motivazione |
|---|---|
| Tailwind v4 con @tailwindcss/vite | Nessun postcss.config necessario, integrazione nativa Vite |
| React Router v7 | API moderna, TypeScript-first, supporto futuro per SSR |
| Framer Motion v12 | Compatibile con React 19, API motion() solida |
| Cartella `components/ui/` separata da `sections/` | Distingue componenti atomici da blocchi di pagina |
| `@theme` in index.css | Design tokens nativi Tailwind v4, nessun JS config |

---

## Note tecniche

- **Tailwind v4:** niente `tailwind.config.js`, i token vanno in `@theme {}` dentro index.css
- **React Router v7:** il `BrowserRouter` va in `main.tsx`, le route in `App.tsx`
- **Framer Motion:** importare da `framer-motion`, usare `motion.div` etc.
- **Path alias:** usare sempre `@/` per gli import interni (es. `@/components/ui/Button`)

---

## Design reference

Figma site: https://words-dew-88899703.figma.site/
Titolo identificato: "Elegant Dark Portfolio"
Tema: dark, con accenti viola/indigo
Analisi completa: da approfondire con screenshot forniti dall'utente
