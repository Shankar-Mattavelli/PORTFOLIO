import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { TIMELINE } from '@/constants/data'
import type { TimelineItem } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import TypedText from '@/components/ui/TypedText'

// ── SVG geometry (base — jitter applicato via useMemo) ───────────────────
const VW       = 160   // larghezza SVG in px
const VH       = 840   // altezza SVG in px
const CX       = VW / 2  // 80
const CO_BASE  = 62    // offset orizzontale dei control-point (base)
const CARD_GAP = 32    // gap tra bordo SVG e bordo card

// Posizioni fisse dei nodi (Y in pixel SVG)
const NODES = [
  { x: CX, y: 72  },
  { x: CX, y: 284 },
  { x: CX, y: 506 },
  { x: CX, y: 706 },
]

// Dove ogni nodo si trova lungo il path 0 → 1
const NODE_T = [0.02, 0.34, 0.63, 0.87]

// Top assoluta di ogni card nel container
const CARD_TOPS = [42, 254, 474, 674]

// Offset dal centro verso la card (VW/2 + gap)
const HALF_OFFSET = VW / 2 + CARD_GAP  // 80 + 32 = 112 px

// ── Sub-components ────────────────────────────────────────────────────────

function TimelineNode({
  cx, cy, t, progress,
}: {
  cx: number; cy: number; t: number; progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [t - 0.02, t + 0.05], [0, 1])
  const scale   = useTransform(progress, [t - 0.02, t + 0.05], [0.2, 1])

  return (
    <motion.g style={{ opacity, scale, transformOrigin: `${cx}px ${cy}px` }}>
      <motion.circle
        cx={cx} cy={cy} r={14}
        fill="none" stroke="var(--color-accent)" strokeWidth={0.8} strokeOpacity={0.2}
        animate={{ r: [14, 26], opacity: [0.2, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: t * 3.5 }}
      />
      <circle cx={cx} cy={cy} r={7}
        fill="none" stroke="var(--color-accent)" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={2.5} fill="var(--color-accent)" />
    </motion.g>
  )
}

function YearLabel({
  item, nodeY, t, progress,
}: {
  item: TimelineItem; nodeY: number; t: number; progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [t, t + 0.1], [0, 1])
  const isLeft  = item.side === 'left'

  return (
    <motion.div
      style={{
        opacity,
        position: 'absolute',
        top: nodeY - 7,
        ...(isLeft
          ? { left:  `calc(50% + ${HALF_OFFSET - 16}px)` }
          : { right: `calc(50% + ${HALF_OFFSET - 16}px)` }),
      }}
      className="font-mono text-[10px] tracking-[0.18em] text-white/35 whitespace-nowrap"
    >
      {item.yearRange ?? item.year}
    </motion.div>
  )
}

function TimelineCard({
  item, top, t, progress,
}: {
  item: TimelineItem; top: number; t: number; progress: MotionValue<number>
}) {
  const isLeft  = item.side === 'left'
  const opacity = useTransform(progress, [t, t + 0.16], [0, 1])
  const x       = useTransform(progress, [t, t + 0.16], [isLeft ? -28 : 28, 0])

  return (
    <motion.div
      style={{
        opacity,
        x,
        position: 'absolute',
        top,
        // Larghezza esatta che riempie la metà disponibile senza sforare
        width: `calc(50% - ${HALF_OFFSET}px)`,
        ...(isLeft
          ? { right: `calc(50% + ${HALF_OFFSET}px)` }
          : { left:  `calc(50% + ${HALF_OFFSET}px)` }),
      }}
    >
      <div className="border border-white/[0.09] bg-white/[0.02] p-5 backdrop-blur-sm">
        <p className="text-[9px] font-mono tracking-[0.24em] uppercase mb-2"
           style={{ color: 'var(--color-accent)' }}>
          {item.institution}
        </p>
        <h3 className="font-display font-black text-[19px] text-[#f0ece0] leading-tight">
          {item.role}
        </h3>
        {item.location && (
          <p className="text-[10px] font-mono text-white/28 mt-1">{item.location}</p>
        )}
        <div className="mt-3 h-px bg-white/[0.06] w-full" />
        <p className="mt-3 text-[12px] leading-relaxed text-white/50 font-light">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

// ── Mobile fallback ───────────────────────────────────────────────────────

function MobileTimeline() {
  return (
    <div className="flex flex-col gap-0 pl-5 border-l border-white/[0.12]">
      {TIMELINE.map((item, i) => (
        <motion.div
          key={item.id}
          className="relative pb-10"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
        >
          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border border-[var(--color-accent)] bg-[#080808] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          </div>
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase mb-1.5"
             style={{ color: 'var(--color-accent)' }}>
            {item.yearRange ?? item.year} · {item.institution}
          </p>
          <h3 className="font-display font-black text-[18px] text-[#f0ece0] leading-tight">
            {item.role}
          </h3>
          {item.location && (
            <p className="text-[10px] font-mono text-white/30 mt-1">{item.location}</p>
          )}
          <p className="mt-2 text-[12px] leading-relaxed text-white/50 font-light">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────

export default function PercorsoSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 20%'],
  })

  // Jitter: il path cambia leggermente ad ogni caricamento pagina
  const pathD = useMemo(() => {
    const r = (n: number) => (Math.random() - 0.5) * n
    const cos = [CO_BASE + r(20), CO_BASE + r(20), CO_BASE + r(20)]
    return [
      `M ${CX} ${NODES[0].y}`,
      `C ${CX + cos[0]} ${NODES[0].y} ${CX - cos[0]} ${NODES[1].y} ${CX} ${NODES[1].y}`,
      `C ${CX + cos[1]} ${NODES[1].y} ${CX - cos[1]} ${NODES[2].y} ${CX} ${NODES[2].y}`,
      `C ${CX + cos[2]} ${NODES[2].y} ${CX - cos[2]} ${NODES[3].y} ${CX} ${NODES[3].y}`,
    ].join(' ')
  }, [])

  return (
    <section id="percorso" className="w-full py-20">

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 mb-16">
        <SectionLabel label="Il mio percorso" />
        <motion.h2
          className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
          style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="text-[#f0ece0] block">
            <TypedText text="Da zero" delay={0.3} />
          </span>
          <span style={{ color: 'var(--color-accent)' }} className="block">
            <TypedText text="all'obiettivo." delay={0.3 + 7 * 0.045 + 0.08} />
          </span>
        </motion.h2>
      </div>

      {/* Mobile */}
      <div className="block lg:hidden max-w-[1440px] mx-auto px-5 sm:px-10">
        <MobileTimeline />
      </div>

      {/* Desktop S-curve — visibile da lg (1024px) in su */}
      <div
        ref={timelineRef}
        className="relative hidden lg:block max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24"
        style={{ height: VH + 120 }}
      >
        {/* SVG centrato */}
        <div
          className="absolute top-0"
          style={{ left: '50%', transform: `translateX(-${VW / 2}px)` }}
        >
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            width={VW}
            height={VH}
            overflow="visible"
          >
            {/* Glow */}
            <motion.path
              d={pathD}
              stroke="var(--color-accent)"
              strokeWidth={24}
              fill="none"
              strokeLinecap="round"
              strokeOpacity={0.07}
              style={{ pathLength: scrollYProgress }}
            />
            {/* Linea principale */}
            <motion.path
              d={pathD}
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
            {/* Nodi */}
            {NODES.map((node, i) => (
              <TimelineNode
                key={i}
                cx={node.x}
                cy={node.y}
                t={NODE_T[i]}
                progress={scrollYProgress}
              />
            ))}
          </svg>
        </div>

        {/* Card alternanti sinistra / destra */}
        {TIMELINE.map((item, i) => (
          <TimelineCard
            key={item.id}
            item={item}
            top={CARD_TOPS[i]}
            t={NODE_T[i]}
            progress={scrollYProgress}
          />
        ))}

        {/* Label anni (lato opposto rispetto alla card) */}
        {TIMELINE.map((item, i) => (
          <YearLabel
            key={`yr-${item.id}`}
            item={item}
            nodeY={NODES[i].y}
            t={NODE_T[i]}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
