import { useRef, useMemo, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { TIMELINE } from '@/constants/data'
import { useTrans } from '@/context/LanguageContext'
import type { TimelineItem } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import TypedText from '@/components/ui/TypedText'

// ── SVG geometry ──────────────────────────────────────────────────────────
const VW       = 160   // larghezza viewBox
const VH       = 1360  // altezza viewBox (6 nodi)
const CX       = VW / 2  // 80
const CARD_GAP = 32
const HALF_OFFSET = VW / 2 + CARD_GAP  // 112 px

// Nodi fissi: il path PASSA per questi punti (bezier endpoints)
const NODES = [
  { x: CX, y: 70   },
  { x: CX, y: 300  },
  { x: CX, y: 540  },
  { x: CX, y: 780  },
  { x: CX, y: 1020 },
  { x: CX, y: 1240 },
]

// Progresso scrollY a cui ogni nodo diventa visibile (0 → 1)
const NODE_T = [0.02, 0.20, 0.38, 0.57, 0.74, 0.84]

// Top assoluta di ogni card nel container desktop
const CARD_TOPS = [40, 268, 508, 748, 988, 1370]

// ── Sub-components ────────────────────────────────────────────────────────

function TimelineNode({
  cx, cy, t, progress,
}: {
  cx: number; cy: number; t: number; progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [t - 0.02, t + 0.05], [0, 1])
  const scale   = useTransform(progress, [t - 0.02, t + 0.05], [0.2, 1])
  const [burst, setBurst] = useState(false)
  const prevOpacity = useRef(0)

  // Scatta solo quando l'opacity AUMENTA oltre la soglia (scroll verso il basso)
  useEffect(() => {
    return opacity.on('change', v => {
      const prev = prevOpacity.current
      prevOpacity.current = v
      if (v > 0.6 && prev <= 0.6) setBurst(true)
    })
  }, [opacity])

  // Auto-reset dopo il completamento dell'animazione più lunga (1.5s + buffer)
  useEffect(() => {
    if (!burst) return
    const id = setTimeout(() => setBurst(false), 2200)
    return () => clearTimeout(id)
  }, [burst])

  return (
    <motion.g style={{ opacity, scale, transformOrigin: `${cx}px ${cy}px` }}>
      {/* Burst one-shot — tre anelli che esplodono quando il nodo appare */}
      {burst && (
        <>
          <motion.circle cx={cx} cy={cy} r={8} fill="none"
            stroke="var(--color-accent)" strokeWidth={2} strokeOpacity={0.7}
            initial={{ r: 8, opacity: 0.7 }}
            animate={{ r: 42, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
          <motion.circle cx={cx} cy={cy} r={8} fill="none"
            stroke="var(--color-accent)" strokeWidth={1} strokeOpacity={0.4}
            initial={{ r: 8, opacity: 0.4 }}
            animate={{ r: 64, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.12 }}
          />
          <motion.circle cx={cx} cy={cy} r={8} fill="none"
            stroke="var(--color-accent)" strokeWidth={0.5} strokeOpacity={0.2}
            initial={{ r: 8, opacity: 0.2 }}
            animate={{ r: 88, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.25 }}
          />
        </>
      )}
      {/* Pulse continuo */}
      <motion.circle
        cx={cx} cy={cy} r={14}
        fill="none" stroke="var(--color-accent)" strokeWidth={0.8} strokeOpacity={0.15}
        animate={{ r: [14, 28], opacity: [0.15, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: t * 2 }}
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
        width: `calc(50% - ${HALF_OFFSET}px)`,
        ...(isLeft
          ? { right: `calc(50% + ${HALF_OFFSET}px)` }
          : { left:  `calc(50% + ${HALF_OFFSET}px)` }),
      }}
    >
      <div className="border border-white/[0.09] bg-white/[0.02] p-5 backdrop-blur-sm" style={{ borderRadius: 8 }}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-[9px] font-mono tracking-[0.24em] uppercase"
             style={{ color: 'var(--color-accent)' }}>
            {item.institution}
          </p>
          {item.logo && (
            <img
              src={item.logo}
              alt={item.institution}
              style={{ height: 24, width: 'auto', objectFit: 'contain', opacity: 0.85 }}
            />
          )}
        </div>
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

function MobileTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="flex flex-col gap-0 pl-5 border-l border-white/[0.12]">
      {items.map((item, i) => (
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
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className="text-[9px] font-mono tracking-[0.22em] uppercase"
               style={{ color: 'var(--color-accent)' }}>
              {item.yearRange ?? item.year} · {item.institution}
            </p>
            {item.logo && (
              <img
                src={item.logo}
                alt={item.institution}
                style={{ height: 20, width: 'auto', objectFit: 'contain', opacity: 0.80 }}
              />
            )}
          </div>
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
  const tr = useTrans()
  const timelineRef = useRef<HTMLDivElement>(null)

  // Merge dei dati strutturali con il testo tradotto
  const timeline = TIMELINE.map(item => ({
    ...item,
    ...tr.percorso.timelineItems[item.id],
  }))

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 70%'],
  })

  const pathD = useMemo(() => {
    const r = (n: number) => (Math.random() - 0.5) * n
    const segs: string[] = []
    for (let i = 0; i < NODES.length - 1; i++) {
      const n0 = NODES[i], n1 = NODES[i + 1]
      const dy = n1.y - n0.y
      const cp1x = +(CX + r(110)).toFixed(1)
      const cp1y = +(n0.y + dy * (0.18 + Math.random() * 0.2) + r(28)).toFixed(1)
      const cp2x = +(CX + r(110)).toFixed(1)
      const cp2y = +(n0.y + dy * (0.62 + Math.random() * 0.2) + r(28)).toFixed(1)
      segs.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${n1.x} ${n1.y}`)
    }
    return `M ${NODES[0].x} ${NODES[0].y} ${segs.join(' ')}`
  }, [])

  return (
    <section id="percorso" className="w-full py-20">

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 mb-16">
        <SectionLabel label={tr.percorso.sectionLabel} />
        <motion.h2
          className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
          style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="text-[#f0ece0] block">
            <TypedText text={tr.percorso.h2[0]} delay={0.3} />
          </span>
          <span style={{ color: 'var(--color-accent)' }} className="block">
            <TypedText text={tr.percorso.h2[1]} delay={0.3 + tr.percorso.h2[0].length * 0.045 + 0.08} />
          </span>
        </motion.h2>
      </div>

      {/* Mobile */}
      <div className="block lg:hidden max-w-[1440px] mx-auto px-5 sm:px-10">
        <MobileTimeline items={timeline} />
      </div>

      {/* Desktop — visibile da lg (1024px) in su */}
      <div
        ref={timelineRef}
        className="relative hidden lg:block max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24"
        style={{ height: VH + 200 }}
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

        {/* Card alternanti */}
        {timeline.map((item, i) => (
          <TimelineCard
            key={item.id}
            item={item}
            top={CARD_TOPS[i]}
            t={NODE_T[i]}
            progress={scrollYProgress}
          />
        ))}

        {/* Label anni */}
        {timeline.map((item, i) => (
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
