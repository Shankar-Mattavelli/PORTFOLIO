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
    const totalH  = document.documentElement.scrollHeight
    const h       = Math.max((viewH / totalH) * viewH, 36)
    const maxScroll = totalH - viewH
    const top     = maxScroll > 0 ? (scrollY / maxScroll) * (viewH - h) : 0
    setThumbHeight(h)
    setThumbTop(top)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateThumb, { passive: true })
    window.addEventListener('resize', updateThumb)
    updateThumb()
    return () => {
      window.removeEventListener('scroll', updateThumb)
      window.removeEventListener('resize', updateThumb)
    }
  }, [updateThumb])

  // Drag
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      const dy          = e.clientY - dragStartY.current
      const viewH       = window.innerHeight
      const totalH      = document.documentElement.scrollHeight
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
      onMouseLeave={() => !dragging && setHovered(false)}
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
