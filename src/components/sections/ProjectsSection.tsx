import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROJECTS } from '@/constants/data'
import type { Project } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'

const CARD_W = 300
const GAP = 24
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Immagini placeholder — da sostituire con screenshot reali
const PROJECT_IMAGES: Record<string, string> = {
  strata:   'https://picsum.photos/seed/strata42/600/450',
  nocturne: 'https://picsum.photos/seed/nocturne7/600/450',
  forma:    'https://picsum.photos/seed/forma88/600/450',
  reverie:  'https://picsum.photos/seed/reverie21/600/450',
  atlas:    'https://picsum.photos/seed/atlas55/600/450',
  prism:    'https://picsum.photos/seed/prism33/600/450',
}

function ProjectCard({
  project,
  isActive,
  onClick,
}: {
  project: Project
  isActive: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ width: CARD_W, flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/projects/${project.slug}`} tabIndex={-1} style={{ display: 'block' }}>
        <motion.div
          animate={{
            scale: isActive ? 1 : 0.91,
            opacity: isActive ? 1 : 0.5,
          }}
          transition={{ duration: 0.45, ease }}
          className="cursor-pointer"
          onClick={onClick}
        >
          {/* ── Immagine ── */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            {/* Badge 3D */}
            {project.tags.includes('3D') && (
              <div className="absolute top-3 left-3 z-20 bg-[var(--color-accent)] px-2 py-[3px] text-[9px] font-mono tracking-[0.15em] text-white">
                3D
              </div>
            )}

            {/* Immagine con transizione filter */}
            <motion.img
              src={PROJECT_IMAGES[project.id]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{
                filter: hovered
                  ? 'grayscale(1) brightness(0.3) blur(3px)'
                  : 'grayscale(1) brightness(0.72)',
              }}
              transition={{ duration: 0.4 }}
              loading="lazy"
            />

            {/* Overlay hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute inset-0 z-10 flex flex-col justify-between p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* APRI — in alto a destra */}
                  <motion.div
                    className="self-end flex items-center gap-1.5 bg-[var(--color-accent)] px-3 py-1.5 text-[10px] font-mono tracking-[0.12em] text-white"
                    initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    APRI ↗
                  </motion.div>

                  {/* Descrizione + tag — in basso */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, delay: 0.07 }}
                  >
                    <p className="text-[12px] leading-relaxed text-white/85 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techTags.map(tag => (
                        <span
                          key={tag}
                          className="border border-[var(--color-accent)]/60 text-[var(--color-accent)] text-[8px] tracking-[0.15em] px-2 py-[3px] font-mono uppercase"
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

          {/* ── Footer card ── */}
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
              transition: 'background-color 0.4s ease',
            }}
          />
          <div className="mt-1.5 text-[9px] font-mono tracking-[0.15em] text-white/30 uppercase">
            {project.category}
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const [containerW, setContainerW] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) =>
      setContainerW(entry.contentRect.width)
    )
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const prev = () => setActive(i => (i - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setActive(i => (i + 1) % PROJECTS.length)

  // Centra la card attiva nel contenitore
  const trackX =
    containerW > 0
      ? containerW / 2 - (active * (CARD_W + GAP) + CARD_W / 2)
      : 0

  return (
    <section id="progetti" className="w-full py-20 overflow-hidden">

      {/* ── Header ── */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 mb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel label="Selected Work" />
            <motion.h2
              className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              <span className="text-[#f0ece0] block">Progetti</span>
              <span style={{ color: 'var(--color-accent)' }} className="block">
                selezionati.
              </span>
            </motion.h2>
          </div>

          {/* Frecce navigazione */}
          <div className="flex gap-2 shrink-0 pb-1">
            {(['‹', '›'] as const).map((arrow, idx) => (
              <button
                key={arrow}
                onClick={idx === 0 ? prev : next}
                aria-label={idx === 0 ? 'Precedente' : 'Successivo'}
                className="w-11 h-11 border border-white/[0.12] flex items-center justify-center text-white/40 text-xl hover:text-white hover:border-white/30 transition-colors duration-200"
              >
                {arrow}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Carousel track ── */}
      <div ref={wrapRef} className="w-full overflow-visible">
        <motion.div
          className="flex items-end"
          style={{ gap: GAP, paddingBottom: 4 }}
          animate={{ x: trackX }}
          transition={{ duration: 0.55, ease }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={i === active}
              onClick={() => setActive(i)}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Progetto ${i + 1}`}
            className="h-[2px] rounded-full transition-all duration-300"
            style={{
              width: i === active ? 32 : 14,
              backgroundColor:
                i === active
                  ? 'var(--color-accent)'
                  : 'rgba(255,255,255,0.18)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
