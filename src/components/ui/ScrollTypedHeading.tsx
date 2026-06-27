import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface LineConfig {
  text: string
  accent?: boolean
}

interface Props {
  lines: LineConfig[]
  fontSize?: string
  className?: string
}

// ── Cursor ────────────────────────────────────────────────────────────────────

function Cursor({ blink }: { blink: boolean }) {
  return (
    <span
      className={blink ? 'typed-cursor typed-cursor--blink' : 'typed-cursor'}
      aria-hidden
    />
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ScrollTypedHeading({ lines, fontSize, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [count, setCount] = useState(0)

  const totalChars = lines.reduce((acc, l) => acc + l.text.length, 0)

  const { scrollYProgress } = useScroll({
    target: ref,
    // progress 0 → heading entering viewport from bottom (at 90%)
    // progress 1 → heading near exit at top (5%)
    offset: ['start 90%', 'start 5%'],
  })

  // 0→0.35 type forward, 0.35→0.65 hold, 0.65→1.0 type backward
  const countMv = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1.0],
    [0, totalChars, totalChars, 0],
  )

  useMotionValueEvent(countMv, 'change', (v) => setCount(Math.round(v)))

  // Distribute visible count across lines
  let remaining = count
  const lineCounts = lines.map((l) => {
    const visible = Math.min(remaining, l.text.length)
    remaining -= visible
    return visible
  })

  // Which line is currently active (has cursor)
  let cursorLine = 0
  let cum = 0
  for (let i = 0; i < lines.length; i++) {
    cum += lines[i].text.length
    if (count <= cum) { cursorLine = i; break }
  }

  const isHeld      = count === totalChars
  const showCursor  = count > 0

  return (
    <motion.h2
      ref={ref}
      className={`font-display font-black leading-[1.0] tracking-[-0.02em] mt-5 ${className ?? ''}`}
      style={{ fontSize: fontSize ?? 'clamp(40px, 5.5vw, 80px)' }}
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
    >
      {lines.map((line, li) => (
        <span
          key={li}
          className="block"
          style={{ color: line.accent ? 'var(--color-accent)' : '#f0ece0' }}
        >
          {line.text.split('').map((char, ci) => (
            <span
              key={ci}
              style={{ opacity: ci < lineCounts[li] ? 1 : 0, whiteSpace: 'pre' }}
            >
              {char}
            </span>
          ))}
          {showCursor && cursorLine === li && <Cursor blink={isHeld} />}
        </span>
      ))}
    </motion.h2>
  )
}
