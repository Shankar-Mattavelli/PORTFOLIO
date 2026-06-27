# CLAUDE.md — Portfolio Project

Questo file è la fonte di verità per Claude Code in ogni conversazione su questo progetto.
Leggerlo per intero è il primo passo obbligatorio prima di qualsiasi intervento.

---

## Identità del progetto

Portfolio professionale personale. Progettato per durare nel tempo, pubblicato su GitHub e distribuito automaticamente su Vercel. Ogni modifica deve poter essere applicata senza rompere l'architettura esistente.

---

## Stack tecnologico

| Libreria | Versione | Ruolo |
|---|---|---|
| React | 19 | UI rendering |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool + dev server |
| Tailwind CSS | 4 | Utility-first styling (plugin @tailwindcss/vite) |
| Framer Motion | 12 | Animazioni |
| React Router | 7 | Routing client-side |

**Font display:** Rubik Black (900) — confermato dall'utente

### Pianificato (non ancora integrato)
- Three.js — scene 3D / background canvas
- AI MIRA — assistente AI personalizzato
- Blog — sezione articoli
- Dashboard — area analytics
- Area CV — curriculum interattivo
- Certificazioni — badge e credenziali
- Tema chiaro/scuro — toggle persistente
- Multilingua — i18n (IT/EN)

---

## Struttura cartelle

```
PORTFOLIO/
├── public/                    # Asset statici (non trasformati)
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── layout/            # Header, Footer, Layout wrapper
│   │   ├── sections/          # Sezioni di pagina (Hero, About, Projects…)
│   │   └── ui/                # Componenti atomici (Button, Card, Badge…)
│   ├── constants/             # Dati statici, config, testi
│   ├── context/               # React Context providers
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utility functions
│   ├── pages/                 # Pagine routed (Home, Projects, Blog…)
│   ├── styles/                # CSS aggiuntivi, variabili
│   ├── types/                 # Tipi TypeScript condivisi
│   ├── index.css              # Entry CSS con Tailwind v4 e design tokens
│   ├── main.tsx               # Entry point React
│   └── App.tsx                # Router e layout root
├── CLAUDE.md                  # Questo file
├── README.md                  # Documentazione pubblica del progetto
├── PROJECT_CONTEXT.md         # Contesto di sviluppo interno
├── ROADMAP.md                 # Milestone e obiettivi
├── CHANGELOG.md               # Log delle modifiche
├── ARCHITECTURE.md            # Decisioni architetturali
├── vercel.json                # Config deployment Vercel
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

---

## Design di riferimento

Il design si basa su: https://words-dew-88899703.figma.site/

**Caratteristiche identificate (da screenshot utente):**
- Tema: dark, sfondo `#080808` (nero profondo)
- Text: off-white caldo `#f0ece0`
- Accent: viola vivace `#7c5bdf`
- Font display: **Rubik Black (900)** — headline ultra-bold
- Font body: Inter, font mono: JetBrains Mono
- Pattern sezioni: `[linea accent 28px] LABEL` → headline 2 righe (bianco + viola)
- Hero: nome gigante + cursore lampeggiante + badge tech flottanti + glow viola dx
- Sezioni: Progetti (carousel), Percorso (timeline SVG curva), Certificazioni (3×2 grid), Contatto (form 2 colonne)
- Project detail: hero full-screen, nav 3 colonne, metadata cards

---

## Path alias

L'alias `@/` punta a `./src/`. Usarlo sempre per gli import:

```ts
import { Button } from '@/components/ui/Button'
import { useScrollProgress } from '@/hooks/useScrollProgress'
```

---

## Convenzioni di codice

- Componenti React: PascalCase, un file per componente
- Hook: camelCase con prefisso `use`
- Utility: camelCase
- Costanti: SCREAMING_SNAKE_CASE per valori globali, camelCase per oggetti
- Nessun commento che descrive COSA fa il codice — solo commenti sul PERCHÉ quando non ovvio
- TypeScript strict: niente `any`, interfacce esplicite per le props
- Framer Motion: usare `motion.*` per animazioni, `useAnimation` per quelle controllate
- Tailwind: utility classes in JSX, `@theme` in index.css per i token design

---

## Regole di sviluppo

1. **Pianifica prima di implementare.** Per ogni feature proponi approccio, vantaggi e alternative.
2. **Non aggiungere feature non richieste.** Zero gold-plating.
3. **Nessun commento ridondante.** Solo dove il WHY non è ovvio.
4. **Sicurezza:** niente XSS, injection o vulnerabilità OWASP.
5. **Commit logici:** un commit per feature/fix, messaggio in inglese descrittivo.
6. **Documentazione:** aggiornare sempre README, CHANGELOG e ROADMAP dopo ogni milestone.

---

## Deployment

- **Hosting:** Vercel
- **Trigger:** push su `main` → deploy automatico
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20+ (specificato in vercel.json)

---

## Stato attuale

Vedere `PROJECT_CONTEXT.md` per lo stato aggiornato del progetto.
Vedere `ROADMAP.md` per le milestone pianificate.
Vedere `CHANGELOG.md` per le modifiche recenti.
