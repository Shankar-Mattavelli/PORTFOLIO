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
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-[13px] font-medium tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-200"
        >
          SM.DEV
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

        {/* CTA disponibile */}
        <div className="hidden md:flex items-center gap-3 border border-white/[0.15] px-4 py-[7px] text-[11px] font-medium tracking-[0.18em] text-white/80 hover:border-white/30 hover:text-white transition-all duration-200 cursor-pointer">
          DISPONIBILE
          <span className="relative flex h-[7px] w-[7px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-400" />
          </span>
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
          <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-emerald-400">
            DISPONIBILE
            <span className="relative flex h-[6px] w-[6px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-400" />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
