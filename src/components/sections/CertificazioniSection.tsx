import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CERTIFICATIONS } from '@/constants/data'
import { useTrans } from '@/context/LanguageContext'
import type { Certification } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import TypedText from '@/components/ui/TypedText'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
const flipEase: [number, number, number, number] = [0.45, 0, 0.1, 1]

function BadgeIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <circle cx="10" cy="9" r="7" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.85" />
      <path d="M7.5 9l2 2 3-3.5" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17.5l3 2.5 3-2.5V15" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ── Front face ─────────────────────────────────────────────────────────────

function CardFront({ cert }: { cert: Certification }) {
  const t = useTrans()
  return (
    <div
      className="group absolute inset-0 border border-white/[0.08] bg-white/[0.02] p-6 overflow-hidden flex flex-col"
      style={{ borderRadius: 8, backfaceVisibility: 'hidden' }}
    >
      {/* Accent line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ background: 'var(--color-accent)' }}
      />
      {/* Glow top-right */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,91,223,0.15) 0%, transparent 70%)' }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 flex items-center justify-center border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 mb-5 shrink-0 transition-colors duration-300 group-hover:border-[var(--color-accent)]/40"
        style={{ borderRadius: 6 }}
      >
        <BadgeIcon />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="font-display font-black text-[16px] text-[#f0ece0] leading-tight mb-2">
          {cert.title}
        </h3>
        <p className="text-[11px] font-mono text-white/35 tracking-[0.1em]">{cert.issuer}</p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--color-accent)' }}>
          {cert.year}
        </span>
        <span className="text-[9px] font-mono tracking-[0.15em] text-white/0 group-hover:text-white/35 transition-colors duration-300">
          {t.certifications.flipBtn}
        </span>
      </div>
    </div>
  )
}

// ── Back face — stile pergamena ────────────────────────────────────────────

function CardBack({ cert, onOpenPdf }: { cert: Certification; onOpenPdf: () => void }) {
  const t = useTrans()
  return (
    <div
      className="absolute inset-0 p-6 flex flex-col overflow-hidden"
      style={{
        borderRadius: 8,
        background: '#f5f0e8',
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
      }}
    >
      {/* Angoli decorativi */}
      {(['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'] as const).map((cls, i) => (
        <div key={i} className={`absolute w-5 h-5 ${cls}`} style={{ borderColor: 'rgba(124,91,223,0.28)' }} />
      ))}

      <p className="text-[8px] font-mono tracking-[0.22em] uppercase mb-1" style={{ color: '#7c5bdf' }}>
        {cert.issuer}
      </p>
      <div className="w-7 h-[1px] mb-3" style={{ background: 'rgba(124,91,223,0.28)' }} />

      <p className="text-[9px] font-mono text-[#999] tracking-[0.1em] mb-1.5">{t.certifications.certifies}</p>
      <p className="font-display font-black text-[19px] text-[#0a0a0a] leading-none mb-2">
        Shankar Mattavelli
      </p>
      <p className="text-[9px] font-mono text-[#666] mb-1.5">{t.certifications.achieved}</p>
      <p className="font-display font-black text-[13px] leading-tight text-[#0a0a0a] flex-1">
        {t.certifications.titles[cert.id] ?? cert.title}
      </p>

      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-[7px] font-mono text-[#aaa] uppercase tracking-[0.2em] mb-0.5">{t.certifications.yearLabel}</p>
          <p className="font-display font-black text-[16px] text-[#0a0a0a]">{cert.year}</p>
        </div>
        {cert.documentUrl ? (
          <button
            onClick={e => { e.stopPropagation(); onOpenPdf() }}
            className="text-[8px] font-mono tracking-[0.15em] uppercase px-2.5 py-1.5 border"
            style={{ color: '#7c5bdf', borderColor: 'rgba(124,91,223,0.4)', borderRadius: 3 }}
          >
            {t.certifications.openPdf}
          </button>
        ) : (
          <svg width="42" height="42" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="28" stroke="#7c5bdf" strokeWidth="0.8" strokeOpacity="0.22" fill="none" />
            <circle cx="32" cy="32" r="21" stroke="#7c5bdf" strokeWidth="0.5" strokeOpacity="0.14" fill="none" strokeDasharray="2 3" />
            <text x="32" y="35" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#7c5bdf" fillOpacity="0.45" letterSpacing="0.5">{cert.year}</text>
          </svg>
        )}
      </div>

      <p className="mt-2.5 text-[7px] font-mono text-[#ccc] tracking-[0.12em] text-center uppercase">
        {t.certifications.backHint}
      </p>
    </div>
  )
}

// ── PDF Modal (usato solo quando documentUrl è presente) ───────────────────

function PdfModal({ url, title, landscape, onClose }: { url: string; title: string; landscape?: boolean; onClose: () => void }) {
  const t = useTrans()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ backgroundColor: 'rgba(8,8,8,0.90)', backdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full"
        style={{ maxWidth: landscape ? 1100 : 680 }}
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 12, opacity: 0 }}
        transition={{ duration: 0.38, ease }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-9 right-0 font-mono text-[10px] tracking-[0.18em] text-white/35 hover:text-white/70 transition-colors duration-200"
        >
          {t.certifications.closeModal}
        </button>
        <iframe
          src={`${url}#navpanes=0&view=Fit`}
          title={title}
          className="w-full"
          style={{ height: landscape ? '70vh' : '82vh', borderRadius: 6, border: 'none' }}
        />
      </motion.div>
    </motion.div>
  )
}

// ── Card flip wrapper ──────────────────────────────────────────────────────

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 1024
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const [pdfOpen, setPdfOpen] = useState(false)

  function handleOpenPdf() {
    if (!cert.documentUrl) return
    // Su mobile Android/iOS, iframe non supporta PDF inline → apri direttamente in nuova scheda
    if (isMobileDevice()) {
      window.open(cert.documentUrl, '_blank', 'noopener,noreferrer')
    } else {
      setPdfOpen(true)
    }
  }

  return (
    <>
      <motion.div
        className="cursor-pointer"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease, delay: index * 0.07 }}
        onClick={() => setFlipped(f => !f)}
      >
        {/* perspective su container plain per non interferire con Framer Motion */}
        <div style={{ perspective: '1200px', minHeight: 240 }}>
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              position: 'relative',
              minHeight: 240,
            }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.72, ease: flipEase }}
          >
            <CardFront cert={cert} />
            <CardBack cert={cert} onOpenPdf={handleOpenPdf} />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {pdfOpen && cert.documentUrl && (
          <PdfModal url={cert.documentUrl} title={cert.title} landscape={cert.landscape} onClose={() => setPdfOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

// ── Sezione principale ─────────────────────────────────────────────────────

export default function CertificazioniSection() {
  const t = useTrans()
  return (
    <section
      id="certificazioni"
      className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-20"
    >
      <SectionLabel label={t.certifications.sectionLabel} />
      <motion.h2
        className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
        style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
        initial={{ opacity: 1, y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
      >
        <span className="text-[#f0ece0] block">
          <TypedText text={t.certifications.h2[0]} delay={0.25} />
        </span>
        <span style={{ color: 'var(--color-accent)' }} className="block">
          <TypedText text={t.certifications.h2[1]} delay={0.25 + t.certifications.h2[0].length * 0.045 + 0.07} />
        </span>
      </motion.h2>

      <motion.p
        className="mt-4 text-[11px] font-mono text-white/25 tracking-[0.1em]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {t.certifications.flipHint}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </section>
  )
}
