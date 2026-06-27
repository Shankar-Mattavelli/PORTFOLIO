# ARCHITECTURE.md

Decisioni architetturali e rationale tecnico del progetto.

---

## Stack e motivazioni

### Vite 8
- Dev server ultra-rapido con HMR
- Build ottimizzata con Rollup
- Supporto nativo ESM
- Plugin ecosystem solido

### React 19
- Concurrent rendering
- Server Components ready (futuro)
- React Compiler compatibile (futuro)

### TypeScript 6
- Type safety end-to-end
- `erasableSyntaxOnly`: compatibilità con i nuovi stripping runtimes
- `verbatimModuleSyntax`: import/export type espliciti

### Tailwind CSS 4
- **Nessun `tailwind.config.js`** — configurazione via `@theme` in CSS
- Plugin `@tailwindcss/vite`: integrazione diretta con Vite, nessun PostCSS
- Design tokens nativi nel layer CSS, non in JS
- Utility classes in JSX per styling rapido e coerente

### Framer Motion 12
- API `motion.*` dichiarativa in JSX
- `useAnimation`, `useInView`, `useScroll` per animazioni avanzate
- Varianti per gestire stati (hidden → visible → exit)
- Compatibile con React 19

### React Router 7
- **File-based routing** opzionale (non usato: preferiamo routing manuale più controllabile)
- `BrowserRouter` in `main.tsx`, route dichiarate in `App.tsx`
- Lazy loading delle pagine con `React.lazy` + `Suspense`

---

## Struttura dei componenti

```
components/
├── ui/         # Atomici: Button, Card, Badge, Input, Tag...
│               # Nessuna logica di business, solo presentazione
├── layout/     # Struttura: Header, Footer, Layout, NavBar...
│               # Dipendono dal router, gestiscono la navigazione
└── sections/   # Blocchi di pagina: HeroSection, AboutSection...
                # Compositi, usano ui/ e dati da constants/
```

**Regola:** `ui/` non importa da `sections/` né da `pages/`. Il flusso è unidirezionale.

---

## Gestione stato

- **Stato locale:** `useState`, `useReducer` nel componente
- **Stato condiviso:** React Context in `context/` (es. ThemeContext, LanguageContext)
- **Nessun Redux/Zustand** fino a quando non strettamente necessario
- **Dati statici** (testi, progetti, skill): in `constants/` come array/oggetti TypeScript

---

## Path alias

```ts
import { Button } from '@/components/ui/Button'    // ✅
import { Button } from '../../../components/ui/Button'  // ❌
```

L'alias `@/` è definito in:
- `vite.config.ts` → `resolve.alias`
- `tsconfig.app.json` → `compilerOptions.paths`

---

## CSS Architecture

```css
/* src/index.css */
@import "tailwindcss";          /* Layer Tailwind v4 */

@theme {                        /* Design tokens globali */
  --color-bg-primary: #0a0a0f;
  --font-sans: 'Inter', ...;
  /* ... */
}

/* Reset e stili base */
body { ... }
```

- I design tokens sono variabili CSS definite in `@theme`
- I componenti usano utility classes Tailwind o le variabili CSS direttamente
- Nessun CSS-in-JS

---

## Deploy Pipeline

```
Developer → git push main → GitHub → Vercel (CI/CD) → Live
```

- Build: `npm run build` → output in `dist/`
- Vercel legge `vercel.json` per la configurazione
- SPA routing: tutte le route reindirizzate a `index.html`

---

## Integrazioni future (architettura preparata)

| Feature | Approccio pianificato |
|---|---|
| Tema chiaro/scuro | `ThemeContext` + classe `dark` su `<html>`, Tailwind dark variant |
| Multilingua | `LanguageContext` + oggetti di traduzione in `constants/i18n/` |
| Blog | Pagine MDX o CMS headless (Contentful/Sanity) |
| Three.js | Componente canvas isolato, caricato lazy |
| AI MIRA | Widget chat, chiamate API separate |
