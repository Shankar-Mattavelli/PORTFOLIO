import { useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
        width: 650,
        height: 650,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(124,91,223,0.14) 0%, rgba(124,91,223,0.05) 45%, transparent 70%)',
        filter: 'blur(6px)',
        pointerEvents: 'none',
        zIndex: 9,
      }}
    />
  )
}
