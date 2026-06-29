import { useEffect, useRef, useState, useCallback } from 'react'

// CSS scroll-driven animation: la posizione del thumb è calcolata
// interamente dal browser (compositor thread) — zero latenza JS
const DRIVEN_CSS = `
  @keyframes _sb-move {
    from { top: 0px; }
    to   { top: calc(100vh - var(--sb-thumb-h, 40px)); }
  }
  ._sb-thumb {
    animation: _sb-move linear both;
    animation-timeline: scroll(root block);
  }
`

export default function CustomScrollbar() {
  const [hovered, setHovered]   = useState(false)
  const [dragging, setDragging] = useState(false)
  const thumbHeightRef  = useRef(40)
  const dragStartY      = useRef(0)
  const dragStartScroll = useRef(0)

  // Inietta il CSS una volta
  useEffect(() => {
    const el = document.createElement('style')
    el.textContent = DRIVEN_CSS
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  // Aggiorna solo l'altezza del thumb (JS necessario solo per il rapporto viewport/pagina)
  const updateHeight = useCallback(() => {
    const viewH  = window.innerHeight
    const totalH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
    )
    if (totalH <= viewH) return
    const h = Math.max((viewH / totalH) * viewH, 40)
    thumbHeightRef.current = h
    document.documentElement.style.setProperty('--sb-thumb-h', `${h}px`)
  }, [])

  useEffect(() => {
    requestAnimationFrame(updateHeight)
    window.addEventListener('resize', updateHeight)
    const ro = new ResizeObserver(updateHeight)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('resize', updateHeight)
      ro.disconnect()
    }
  }, [updateHeight])

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
        className="_sb-thumb"
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          right: 0,
          height: 'var(--sb-thumb-h, 40px)',
          width: active ? 8 : 3,
          backgroundColor: 'rgba(124, 91, 223, 0.4)',
          borderRadius: '4px 0 0 4px',
          cursor: dragging ? 'grabbing' : 'grab',
          transition: 'width 0.18s ease-out',
        }}
      />
    </div>
  )
}
