import { useEffect, useRef, useState, useCallback } from 'react'

export default function CustomScrollbar() {
  const thumbRef        = useRef<HTMLDivElement>(null)
  const thumbHeightRef  = useRef(40)
  const [hovered, setHovered]   = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragStartY      = useRef(0)
  const dragStartScroll = useRef(0)

  // Aggiorna posizione e altezza del thumb direttamente sul DOM — nessun re-render
  const updateThumb = useCallback(() => {
    const scrollY = window.scrollY
    const viewH   = window.innerHeight
    const totalH  = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
    )
    if (totalH <= viewH || !thumbRef.current) return

    const h         = Math.max((viewH / totalH) * viewH, 40)
    const maxScroll = totalH - viewH
    const top       = (scrollY / maxScroll) * (viewH - h)

    thumbHeightRef.current          = h
    thumbRef.current.style.height   = `${h}px`
    thumbRef.current.style.top      = `${Math.max(0, top)}px`
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(updateThumb)
    window.addEventListener('scroll', updateThumb, { passive: true })
    window.addEventListener('resize', updateThumb)

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
      const trackRange  = viewH - thumbHeightRef.current
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
  }, [dragging])

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    setDragging(true)
    dragStartY.current      = e.clientY
    dragStartScroll.current = window.scrollY
  }

  const active = hovered || dragging

  return (
    <div
      style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: 12, zIndex: 49 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { if (!dragging) setHovered(false) }}
    >
      <div
        ref={thumbRef}
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: 40,
          width: active ? 8 : 3,
          backgroundColor: 'rgba(124, 91, 223, 0.4)',
          borderRadius: '4px 0 0 4px',
          cursor: dragging ? 'grabbing' : 'grab',
          transition: 'width 0.18s ease-out',
          willChange: 'top, height',
        }}
      />
    </div>
  )
}
