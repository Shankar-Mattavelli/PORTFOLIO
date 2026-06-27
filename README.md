# Portfolio

Portfolio professionale personale — progettato per durare nel tempo.

## Stack

- **React 19** + **TypeScript 6**
- **Vite 8** — build tool
- **Tailwind CSS 4** — styling con design tokens custom
- **Framer Motion 12** — animazioni
- **React Router 7** — routing

## Avvio rapido

```bash
npm install
npm run dev
```

Il sito sarà disponibile su `http://localhost:5173`.

## Build e preview

```bash
npm run build
npm run preview
```

## Deploy

Il progetto è configurato per il deploy automatico su **Vercel**. Ogni push su `main` avvia il deploy.

## Struttura

```
src/
├── components/
│   ├── layout/     # Header, Footer, Layout
│   ├── sections/   # Sezioni di pagina
│   └── ui/         # Componenti atomici
├── pages/          # Pagine routed
├── hooks/          # Custom hooks
├── lib/            # Utility
├── types/          # Tipi TypeScript
└── constants/      # Dati statici
```

## Documentazione

- [ROADMAP.md](ROADMAP.md) — Milestone e obiettivi
- [ARCHITECTURE.md](ARCHITECTURE.md) — Decisioni architetturali
- [CHANGELOG.md](CHANGELOG.md) — Modifiche per versione
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — Contesto di sviluppo
