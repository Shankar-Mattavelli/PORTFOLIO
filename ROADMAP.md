# ROADMAP.md

Piano di sviluppo suddiviso in milestone. Aggiornare al completamento di ogni fase.

---

## Milestone 0 — Setup e infrastruttura ✅
**Completata:** 2026-06-27

- Scaffolding Vite + React + TypeScript
- Tailwind CSS v4, Framer Motion, React Router
- Struttura cartelle professionale
- Design tokens (palette dark, tipografia, spacing)
- Documentazione iniziale
- Configurazione Vercel

---

## Milestone 1 — Layout base e navigazione
**Obiettivo:** Un sito funzionante con navigazione, header, footer e scheletro delle sezioni principali.

### Componenti da creare
- [ ] `Layout.tsx` — wrapper con header e footer
- [ ] `Header.tsx` — navbar con logo, link e menu mobile
- [ ] `Footer.tsx` — info contatti e copyright
- [ ] `HomePage.tsx` — pagina principale con tutte le sezioni
- [ ] `HeroSection.tsx` — prima fold con headline e CTA
- [ ] Router setup in `App.tsx`

### Criteri di completamento
- Navigazione funzionante tra le pagine
- Layout responsive (mobile + desktop)
- Animazione di entrata per la Hero section

---

## Milestone 2 — Sezioni principali
**Obiettivo:** Ricreare fedelmente il layout del design Figma.

### Sezioni da implementare
- [ ] Hero — Headline principale, sottotitolo, CTA
- [ ] About — Bio, foto, competenze
- [ ] Projects — Grid di progetti con card interattive
- [ ] Skills / Stack — Tecnologie con icone
- [ ] Contact — Form contatti o link social

---

## Milestone 3 — Animazioni e polish
**Obiettivo:** Animazioni fluide, effetti scroll, interattività.

- [ ] Scroll-triggered animations (Framer Motion)
- [ ] Hover effects su card e button
- [ ] Page transitions
- [ ] Cursor custom (se nel design)
- [ ] Effetto glow/gradient sugli accenti viola

---

## Milestone 4 — Ottimizzazione e deploy
**Obiettivo:** Progetto pronto per la produzione.

- [ ] Ottimizzazione immagini (WebP, lazy loading)
- [ ] SEO base (meta tags, OG tags)
- [ ] Performance (Lighthouse > 90)
- [ ] Setup GitHub repository
- [ ] Primo deploy su Vercel
- [ ] Custom domain (opzionale)

---

## Milestone 5 — Feature avanzate (futuro)

- [ ] Tema chiaro/scuro con toggle persistente
- [ ] Multilingua IT/EN
- [ ] Blog con MDX
- [ ] Area CV interattiva
- [ ] Certificazioni e badge
- [ ] Three.js background o scene 3D
- [ ] Assistente AI MIRA
- [ ] Dashboard analytics
