import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROJECTS } from '@/constants/data'
import type { Project } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import TypedText from '@/components/ui/TypedText'

const ease: [number, number, number, number] = [0.45, 0, 0.55, 1]
const N = PROJECTS.length

const PROJECT_IMAGES: Record<string, string> = {
  strata:   'https://picsum.photos/seed/strata42/800/600',
  nocturne: 'https://picsum.photos/seed/nocturne7/800/600',
  forma:    'https://picsum.photos/seed/forma88/800/600',
  reverie:  'https://picsum.photos/seed/reverie21/800/600',
  atlas:    'https://picsum.photos/seed/atlas55/800/600',
  prism:    'https://picsum.photos/seed/prism33/800/600',
}

// ── Slot logic ─────────────────────────────────────────────────────────────
// Ogni card ha uno "slot" = distanza dal centro (-1, 0, +1, ±2 fuori campo)
// Il wrapping è automatico perché (i - active + N) % N normalizza circolarmente.

function getSlot(index: number, active: number): number {
  let s = (index - active + N) % N
  // Normalizza a [-floor(N/2), ceil(N/2)] così slot -1 = sinistra, +1 = destra
  if (s > Math.floor(N / 2)) s -= N
  return s
}

interface SlotStyle {
  x: number
  scale: number
  opacity: number
  filter: string
  zIndex: number
  rotateY: number
}

// cardW è la larghezza della card centrale (slot 0).
// Le card laterali (slot ±1) si sovrappongono DIETRO la centrale con un offset
// inferiore a cardW/2: la centrale copre buona parte di ciascuna, lasciando
// visibile solo la striscia esterna. Questo crea la profondità dell'esempio.
//
// Le card in staging (slot ±2+) restano sulla stessa x delle laterali visibili
// ma ruotate di ±90° attorno all'asse Y: sembrano "di taglio" (invisibili).
// L'animazione entra/esce ruotando su se stessa — nessun percorso laterale veloce.
function slotStyle(slot: number, cardW: number): SlotStyle {
  const abs = Math.abs(slot)
  const dir = slot > 0 ? 1 : -1
  const sideX = dir * Math.round(cardW * 0.62)

  if (abs === 0) return {
    x: 0, scale: 1.0, opacity: 1,
    filter: 'blur(0px) brightness(1)', zIndex: 3, rotateY: 0,
  }
  if (abs === 1) return {
    x: sideX, scale: 0.70, opacity: 0.55,
    filter: 'blur(3px) brightness(0.68)', zIndex: 1, rotateY: 0,
  }
  // Staging/uscita: stessa posizione x delle laterali, di taglio (90°), invisibili.
  // L'effetto risultante è una rotazione su se stessa senza spostamento laterale.
  return {
    x: sideX, scale: 0.70, opacity: 0,
    filter: 'blur(3px) brightness(0.68)', zIndex: 0,
    rotateY: dir * 90,   // +90 = destra entra girando, -90 = sinistra esce girando
  }
}

// ── Card ───────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  isActive,
  onClick,
  cardW,
}: {
  project: Project
  isActive: boolean
  onClick: () => void
  cardW: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ width: cardW }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={`/projects/${project.slug}`}
        tabIndex={isActive ? 0 : -1}
        style={{ display: 'block' }}
      >
        <div className="cursor-pointer" onClick={onClick}>

          {/* Immagine */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3', borderRadius: 8 }}
          >
            {project.tags.includes('3D') && (
              <div
                className="absolute top-3 left-3 z-20 bg-[var(--color-accent)] px-2 py-[3px] text-[9px] font-mono tracking-[0.15em] text-white"
                style={{ borderRadius: 3 }}
              >
                3D
              </div>
            )}

            <motion.img
              src={PROJECT_IMAGES[project.id]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{
                filter: hovered && isActive
                  ? 'grayscale(1) brightness(0.28) blur(3px)'
                  : 'grayscale(1) brightness(0.68)',
              }}
              transition={{ duration: 0.38 }}
              loading="lazy"
            />

            {/* Overlay hover — solo sulla card attiva */}
            <AnimatePresence>
              {hovered && isActive && (
                <motion.div
                  className="absolute inset-0 z-10 flex flex-col justify-between p-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <motion.div
                    className="self-end flex items-center gap-1.5 bg-[var(--color-accent)] px-3 py-1.5 text-[10px] font-mono tracking-[0.12em] text-white"
                    style={{ borderRadius: 3 }}
                    initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, delay: 0.04 }}
                  >
                    APRI ↗
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.32, delay: 0.06 }}
                  >
                    <p className="text-[13px] leading-relaxed text-white/85 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techTags.map(tag => (
                        <span
                          key={tag}
                          className="border border-[var(--color-accent)]/60 text-[var(--color-accent)] text-[8px] tracking-[0.15em] px-2 py-[3px] font-mono uppercase"
                          style={{ borderRadius: 2 }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[11px] font-mono text-white/30 shrink-0">{project.num}</span>
              <span className="font-display font-black text-[18px] text-[#f0ece0] truncate">
                {project.title}
              </span>
            </div>
            <span className="text-[11px] font-mono text-white/30 shrink-0">{project.year}</span>
          </div>
          <div
            className="mt-1.5 h-px w-full"
            style={{
              backgroundColor: isActive
                ? 'var(--color-accent)'
                : 'rgba(255,255,255,0.07)',
              transition: 'background-color 0.45s ease',
            }}
          />
          <div className="mt-1.5 text-[9px] font-mono tracking-[0.15em] text-white/30 uppercase">
            {project.category}
          </div>
        </div>
      </Link>
    </div>
  )
}

// ── Sezione ────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [active, setActive]         = useState(0)
  const [containerW, setContainerW] = useState(0)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setContainerW(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Card centrale ~30% del viewport → le card laterali si sovrappongono dietro di essa
  // lasciando ~49% della sua larghezza visibile su ciascun lato (striscia esterna)
  const CARD_W = containerW > 0
    ? Math.max(Math.min(Math.round(containerW * 0.30), 500), 220)
    : 320
  // Altezza fissa del contenitore basata sulla card attiva (scala 1.0)
  const CARD_H = Math.round(CARD_W * 0.75) + 84

  // Auto-advance ogni 2s
  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive(i => (i + 1) % N)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const prev = useCallback(() => setActive(i => (i - 1 + N) % N), [])
  const next = useCallback(() => setActive(i => (i + 1) % N), [])

  return (
    <section
      id="progetti"
      className="w-full py-20"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 mb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel label="Selected Work" />
            <motion.h2
              className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
              initial={{ opacity: 1, y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              <span className="text-[#f0ece0] block">
                <TypedText text="Progetti" delay={0.2} />
              </span>
              <span style={{ color: 'var(--color-accent)' }} className="block">
                <TypedText text="selezionati." delay={0.2 + 8 * 0.045 + 0.06} />
              </span>
            </motion.h2>
          </div>

          <div className="flex gap-2 shrink-0 pb-1">
            {(['‹', '›'] as const).map((arrow, idx) => (
              <button
                key={arrow}
                onClick={idx === 0 ? prev : next}
                aria-label={idx === 0 ? 'Precedente' : 'Successivo'}
                className="w-11 h-11 border border-white/[0.12] flex items-center justify-center text-white/40 text-xl hover:text-white hover:border-white/30 transition-colors duration-200"
                style={{ borderRadius: 4 }}
              >
                {arrow}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      {/* perspective abilita l'effetto 3D per la rotazione Y delle card in staging */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{ height: CARD_H, perspective: '1100px' }}
      >
        {PROJECTS.map((project, i) => {
          const slot = getSlot(i, active)
          const s    = slotStyle(slot, CARD_W)

          return (
            <motion.div
              key={project.id}
              className="absolute top-0"
              style={{
                left: '50%',
                marginLeft: -CARD_W / 2,
                width: CARD_W,
                zIndex: s.zIndex,
                transformOrigin: 'center center',
              }}
              animate={{
                x:       s.x,
                scale:   s.scale,
                opacity: s.opacity,
                filter:  s.filter,
                rotateY: s.rotateY,
              }}
              transition={{ duration: 0.85, ease }}
            >
              <ProjectCard
                project={project}
                isActive={i === active}
                onClick={() => setActive(i)}
                cardW={CARD_W}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Progetto ${i + 1}`}
            className="h-[2px] rounded-full transition-all duration-300"
            style={{
              width: i === active ? 32 : 14,
              backgroundColor: i === active
                ? 'var(--color-accent)'
                : 'rgba(255,255,255,0.18)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
