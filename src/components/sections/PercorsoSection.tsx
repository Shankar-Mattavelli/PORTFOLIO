import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { TIMELINE } from '@/constants/data'
import type { TimelineItem } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'

// ── SVG S-curve geometry ──────────────────────────────────────────────────
const VW = 200          // viewBox width
const VH = 820          // viewBox height
const CX = VW / 2       // center x = 100
const CO = 76           // control-point horizontal offset

// Node positions (pixel coords within the SVG viewBox)
const NODES = [
  { x: CX, y: 70  },
  { x: CX, y: 280 },
  { x: CX, y: 500 },
  { x: CX, y: 700 },
]

// Where each node sits along the path, 0 → 1
const NODE_T = [0.02, 0.33, 0.63, 0.88]

// S-curve: each segment bends alternately right then left
const PATH_D = [
  `M ${CX} ${NODES[0].y}`,
  `C ${CX + CO} ${NODES[0].y} ${CX - CO} ${NODES[1].y} ${CX} ${NODES[1].y}`,
  `C ${CX + CO} ${NODES[1].y} ${CX - CO} ${NODES[2].y} ${CX} ${NODES[2].y}`,
  `C ${CX + CO} ${NODES[2].y} ${CX - CO} ${NODES[3].y} ${CX} ${NODES[3].y}`,
].join(' ')

// Absolute top of each card (aligned to its SVG node)
const CARD_TOPS = [40, 250, 470, 668]

// ── Sub-components (each calls hooks at top level) ──────────────────────

function TimelineNode({
  cx, cy, t, progress,
}: {
  cx: number; cy: number; t: number; progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [t - 0.02, t + 0.05], [0, 1])
  const scale   = useTransform(progress, [t - 0.02, t + 0.05], [0.2, 1])

  return (
    <motion.g style={{ opacity, scale, transformOrigin: `${cx}px ${cy}px` }}>
      {/* Pulse ring */}
      <motion.circle
        cx={cx} cy={cy} r={14}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={1}
        strokeOpacity={0.2}
        animate={{ r: [14, 26], opacity: [0.2, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: t * 4 }}
      />
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={7}
        fill="none" stroke="var(--color-accent)" strokeWidth={1.5}
      />
      {/* Inner fill */}
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
  const isLeft = item.side === 'left'

  return (
    <motion.div
      style={{
        opacity,
        position: 'absolute',
        top: nodeY - 7,
        // place year label on the opposite side from the card
        ...(isLeft
          ? { left: `calc(50% + ${VW / 2 + 12}px)` }
          : { right: `calc(50% + ${VW / 2 + 12}px)` }),
      }}
      className="font-mono text-[10px] tracking-[0.18em] text-white/35"
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
  const opacity = useTransform(progress, [t, t + 0.15], [0, 1])
  const x       = useTransform(progress, [t, t + 0.15], [isLeft ? -30 : 30, 0])

  return (
    <motion.div
      style={{
        opacity,
        x,
        position: 'absolute',
        top,
        width: '43%',
        ...(isLeft
          ? { right: `calc(50% + ${VW / 2 + 36}px)` }
          : { left:  `calc(50% + ${VW / 2 + 36}px)` }),
      }}
    >
      <div className="border border-white/[0.09] bg-white/[0.025] p-5 backdrop-blur-sm">
        <p
          className="text-[9px] font-mono tracking-[0.24em] uppercase mb-2"
          style={{ color: 'var(--color-accent)' }}
        >
          {item.institution}
        </p>

        <h3 className="font-display font-black text-[20px] text-[#f0ece0] leading-tight">
          {item.role}
        </h3>

        {item.location && (
          <p className="text-[10px] font-mono text-white/28 mt-1">{item.location}</p>
        )}

        <div className="mt-3 h-px bg-white/[0.06] w-full" />

        <p className="mt-3 text-[12px] leading-relaxed text-white/52 font-light">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

// ── Mobile fallback (single column, left border) ─────────────────────────

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
          {/* Node dot on the left border */}
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

// ── Main section ─────────────────────────────────────────────────────────

export default function PercorsoSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 20%'],
  })

  return (
    <section id="percorso" className="w-full py-20">

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 mb-16">
        <SectionLabel label="Il mio percorso" />
        <motion.h2
          className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
          style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="text-[#f0ece0] block">Da zero</span>
          <span style={{ color: 'var(--color-accent)' }} className="block">all'obiettivo.</span>
        </motion.h2>
      </div>

      {/* Mobile layout */}
      <div className="block md:hidden max-w-[1440px] mx-auto px-5 sm:px-10">
        <MobileTimeline />
      </div>

      {/* Desktop S-curve layout */}
      <div
        ref={timelineRef}
        className="relative hidden md:block max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24"
        style={{ height: VH + 100 }}
      >
        {/* SVG centered */}
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
            {/* Wide glow behind the line */}
            <motion.path
              d={PATH_D}
              stroke="var(--color-accent)"
              strokeWidth={22}
              fill="none"
              strokeLinecap="round"
              strokeOpacity={0.07}
              style={{ pathLength: scrollYProgress }}
            />

            {/* Main S-curve */}
            <motion.path
              d={PATH_D}
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />

            {/* Node dots */}
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

        {/* Cards */}
        {TIMELINE.map((item, i) => (
          <TimelineCard
            key={item.id}
            item={item}
            top={CARD_TOPS[i]}
            t={NODE_T[i]}
            progress={scrollYProgress}
          />
        ))}

        {/* Year / range labels (opposite side from each card) */}
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
