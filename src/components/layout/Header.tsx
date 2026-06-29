import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '@/constants/data'

function scrollTo(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    scrollTo(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#080808]/70 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* Bordo inferiore — transiziona opacità per evitare il flash bianco */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)', opacity: scrolled ? 1 : 0 }}
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" aria-label="Home" className="flex items-center">
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: 'rgba(255,255,255,0.85)',
              WebkitMaskImage: 'url(/logo.png)',
              maskImage: 'url(/logo.png)',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)')}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_ITEMS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(href)}
              className="text-[11px] font-medium tracking-[0.25em] text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Status dot */}
        <div className="hidden md:block relative group">
          <div className="flex items-center justify-center w-8 h-8 cursor-default">
            <span className="relative flex h-[8px] w-[8px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-20" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="relative inline-flex rounded-full h-[8px] w-[8px]" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.7 }} />
            </span>
          </div>

          {/* Tooltip dropdown */}
          <div
            className="absolute top-full right-0 mt-2 w-60 pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200"
            style={{ zIndex: 60 }}
          >
            <div
              className="p-4"
              style={{
                backgroundColor: '#0e0e0e',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 4,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-[6px] w-[6px]">
                  <span className="relative inline-flex rounded-full h-[6px] w-[6px]" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.7 }} />
                </span>
                <span className="text-[9px] font-mono tracking-[0.22em] uppercase" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
                  Apprendistato in corso
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-px bg-white/70 transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-white/70 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-white/70 transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-white/[0.05] bg-[#080808] overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_ITEMS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(href)}
              className="text-left text-[11px] font-medium tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-200"
            >
              {label}
            </button>
          ))}
          <div className="flex items-center gap-2">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="relative inline-flex rounded-full h-[6px] w-[6px]" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.7 }} />
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
              Apprendistato in corso
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
