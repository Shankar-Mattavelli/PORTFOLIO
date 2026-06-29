import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function CustomScrollbar() {
  const [thumbTop, setThumbTop]       = useState(0)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [hovered, setHovered]         = useState(false)
  const [dragging, setDragging]       = useState(false)
  const dragStartY      = useRef(0)
  const dragStartScroll = useRef(0)

  const updateThumb = useCallback(() => {
    const scrollY = window.scrollY
    const viewH   = window.innerHeight
    // Usa il valore massimo tra le varie proprietà per robustezza
    const totalH  = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
    )
    if (totalH <= viewH) return

    const h         = Math.max((viewH / totalH) * viewH, 40)
    const maxScroll = totalH - viewH
    const top       = (scrollY / maxScroll) * (viewH - h)

    setThumbHeight(h)
    setThumbTop(Math.max(0, top))
  }, [])

  useEffect(() => {
    // rAF garantisce che il DOM sia completamente dipinto prima della misura
    const raf = requestAnimationFrame(updateThumb)

    window.addEventListener('scroll', updateThumb, { passive: true })
    window.addEventListener('resize', updateThumb)

    // ResizeObserver: aggiorna se l'altezza del contenuto cambia dopo il mount
    const ro = new ResizeObserver(updateThumb)
    ro.observe(document.body)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', updateThumb)
      window.removeEventListener('resize', updateThumb)
      ro.disconnect()
    }
  }, [updateThumb])

  // Drag
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      const dy          = e.clientY - dragStartY.current
      const viewH       = window.innerHeight
      const totalH      = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const trackRange  = viewH - thumbHeight
      const scrollRange = totalH - viewH
      window.scrollTo(0, dragStartScroll.current + (dy / trackRange) * scrollRange)
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, thumbHeight])

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    setDragging(true)
    dragStartY.current      = e.clientY
    dragStartScroll.current = window.scrollY
  }

  return (
    <div
      style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: 12, zIndex: 49 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { if (!dragging) setHovered(false) }}
    >
      <motion.div
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          right: 0,
          top: thumbTop,
          height: thumbHeight,
          backgroundColor: 'rgba(124, 91, 223, 0.4)',
          borderRadius: '4px 0 0 4px',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        animate={{ width: hovered || dragging ? 8 : 3 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </div>
  )
}
