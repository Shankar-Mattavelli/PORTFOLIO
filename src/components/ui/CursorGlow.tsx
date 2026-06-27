import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const glowX = useSpring(mouseX, { stiffness: 60, damping: 22, mass: 0.6 })
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 22, mass: 0.6 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        position: 'fixed',
        left: glowX,
        top: glowY,
        x: '-50%',
        y: '-50%',
        width: 650,
        height: 650,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(124,91,223,0.13) 0%, rgba(124,91,223,0.05) 45%, transparent 70%)',
        filter: 'blur(8px)',
      }}
    />
  )
}
