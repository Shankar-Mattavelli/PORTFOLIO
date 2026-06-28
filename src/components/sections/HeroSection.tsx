import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { PERSONAL_INFO, STATS, HERO_BADGES } from '@/constants/data'
import TypedText from '@/components/ui/TypedText'
import AboutModal from '@/components/sections/AboutModal'

const easeExpOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Percorsi di wander 2D per ogni badge (indice = posizione in HERO_BADGES).
// Sinistra: x sempre ≥ 0 (non escono dal bordo); destra: x ≤ 0.
// Ogni badge ha un percorso unico → nessuna collisione.
const BADGE_WANDER: Array<{ x: number[]; y: number[] }> = [
  { x: [0, 18, 26, 12, 22, 0],   y: [0, -10,  5, 14, -6, 0]  }, // Blender
  { x: [0, 22, 10, 20,  6, 0],   y: [0,   9, -8,  3, 12, 0]  }, // Word
  { x: [0, 14, 24,  8, 18, 0],   y: [0,  -9,  7,-13,  8, 0]  }, // Excel
  { x: [0, 20,  6, 24, 12, 0],   y: [0,   8,-11,  5, -7, 0]  }, // GitHub
  { x: [0,-14,  8,-22,  5, 0],   y: [0,  11, -6, 13, -9, 0]  }, // Premiere Pro
  { x: [0,-18,-10,-24, -5, 0],   y: [0,   8,-11,  6, 13, 0]  }, // ChatGPT
  { x: [0,-20, -8,-26,-12, 0],   y: [0, -11,  9, -7, 13, 0]  }, // Claude
  { x: [0,-14,-24, -8,-20, 0],   y: [0,  10, -8, 13, -5, 0]  }, // Visual Studio Code
  { x: [0, 16,-12, 20, -8, 0],   y: [0,  -9, 11,-14,  7, 0]  }, // PowerPoint
  { x: [0,-12,  9,-20,  5, 0],   y: [0,  -9,-15, -5,-11, 0]  }, // Unreal Engine
]

const ROLES = [
  'Studente di Ingegneria Informatica',
  'Interactive Developer',
  'Tecnico Multimediale',
  'Formatore Sicurezza sul Lavoro',
  'WebGL Enthusiast',
]

// Slot-machine effect: cicla numeri casuali (decelerando) poi atterra sul valore reale
function ScrambleValue({ value, startDelay }: { value: string; startDelay: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView) return
    const match = value.match(/^(\d+)(\+?)$/)
    if (!match) return
    const suffix = match[2] ?? ''

    let timerId: ReturnType<typeof setTimeout> | null = null
    let frame = 0
    const totalFrames = 20 // ~1.9s totali: inizia veloce, rallenta verso la fine

    function step() {
      frame++
      if (frame < totalFrames) {
        const rand = Math.floor(Math.random() * 10)
        setDisplay(rand + suffix)
        timerId = setTimeout(step, 22 + (frame / totalFrames) * 155)
      } else {
        setDisplay(value)
      }
    }

    const startId = setTimeout(step, startDelay)
    return () => { clearTimeout(startId); if (timerId) clearTimeout(timerId) }
  }, [inView, value, startDelay])

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums', display: 'inline-block', minWidth: '1ch' }}>{display}</span>
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex]   = useState(0)
  const [aboutOpen, setAboutOpen]   = useState(false)

  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="relative w-full min-h-svh flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* Spacer per header fisso */}
      <div className="h-[68px] shrink-0" />

      {/* Purple glow — right side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[70vh] max-w-[700px]"
        style={{
          background: 'radial-gradient(ellipse at right center, rgba(124,91,223,0.10) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating tech badges — solo desktop */}
      {HERO_BADGES.map((badge, i) => (
        <motion.div
          key={badge.label}
          aria-hidden="true"
          className="absolute pointer-events-none hidden lg:block"
          style={{ top: badge.top, left: badge.left, right: badge.right }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 + i * 0.08, duration: 0.5 }}
        >
          <motion.div
            animate={BADGE_WANDER[i]}
            transition={{
              duration: badge.floatDuration * 3.1,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: badge.floatDelay * 1.6,
            }}
            className="border border-white/[0.1] bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-white/30 whitespace-nowrap rounded-md"
          >
            {badge.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Contenuto principale */}
      <div className="relative flex flex-col flex-1 w-full max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 min-w-0">

        {/* Blocco superiore — label + nome + ruolo */}
        <div className="flex flex-col pt-8 sm:pt-12 md:pt-14">

          {/* Label sezione */}
          <motion.div
            className="section-label mb-5 md:mb-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-[10px] font-medium tracking-[0.35em] text-white/35 uppercase">
              Portfolio 2026
            </span>
          </motion.div>

          {/* Nome display — cliccabile → AboutModal */}
          <div
            className="group cursor-pointer select-none w-fit"
            onClick={() => setAboutOpen(true)}
            role="button"
            aria-label="Scopri chi sono"
          >
            <motion.h1
              className="font-display font-black leading-[0.88] tracking-[-0.02em] text-[#f0ece0] min-w-0 transition-opacity duration-300 group-hover:opacity-75"
              style={{ fontSize: 'clamp(52px, 9.5vw, 138px)' }}
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: easeExpOut, delay: 0.3 }}
            >
              <TypedText
                text={PERSONAL_INFO.nameFirstLine}
                delay={0.45}
                speed={0.055}
                inView={false}
              />
              <br />
              <TypedText
                text={PERSONAL_INFO.nameSecondLine}
                delay={0.45 + PERSONAL_INFO.nameFirstLine.length * 0.055 + 0.06}
                speed={0.05}
                inView={false}
              />
            </motion.h1>
            {/* Hint al hover */}
            <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="block w-5 h-px" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: 'var(--color-accent)' }}>
                Chi sono
              </span>
            </div>
          </div>

          {/* Ruolo ciclico con cursore lampeggiante */}
          <motion.p
            className="mt-5 md:mt-7 text-sm sm:text-base md:text-lg italic text-white/45 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {'— '}
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.p>
        </div>

        {/* Separatore orizzontale */}
        <motion.div
          className="my-7 md:my-10 h-px bg-white/[0.08] w-full shrink-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 1, ease: easeExpOut, delay: 0.9 }}
        />

        {/* Blocco inferiore — bio + stats */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-10 md:pb-14 min-w-0">

          {/* Bio + scroll hint */}
          <motion.div
            className="flex flex-col gap-4 min-w-0 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <p className="text-sm md:text-[15px] leading-relaxed text-white/40 font-light">
              {PERSONAL_INFO.bio}
            </p>
            <div className="inline-flex border border-white/[0.08] bg-white/[0.02] px-3 py-2 font-mono text-[11px] tracking-[0.1em] text-white/25 w-fit">
              scroll per esplorare
            </div>
          </motion.div>

          {/* Stats */}
          <div className="flex items-stretch shrink-0">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`flex flex-col items-center justify-center px-5 sm:px-7 md:px-8 py-2 ${i > 0 ? 'border-l border-white/[0.15]' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeExpOut, delay: 0.2 + i * 0.08 }}
              >
                <span
                  className="font-display font-black leading-none"
                  style={{ fontSize: 'clamp(26px, 3vw, 42px)', color: 'var(--color-accent)' }}
                >
                  <ScrambleValue value={stat.value} startDelay={350 + i * 100} />
                </span>
                <span className="mt-1.5 text-[9px] font-medium tracking-[0.22em] text-white/30 uppercase whitespace-nowrap">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </section>
  )
}
