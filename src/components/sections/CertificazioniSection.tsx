import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CERTIFICATIONS } from '@/constants/data'
import type { Certification } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import TypedText from '@/components/ui/TypedText'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function BadgeIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <circle cx="10" cy="9" r="7" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.85" />
      <path d="M7.5 9l2 2 3-3.5" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17.5l3 2.5 3-2.5V15" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function CertCard({ cert, index, onClick }: {
  cert: Certification
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      className="group relative border border-white/[0.08] bg-white/[0.02] p-6 cursor-pointer overflow-hidden"
      style={{ borderRadius: 8 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease, delay: index * 0.07 }}
      whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.04)' }}
      onClick={onClick}
    >
      {/* Accent line bottom — CSS transition su hover del gruppo */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ background: 'var(--color-accent)' }}
      />

      {/* Top-right glow — appare su hover */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,91,223,0.15) 0%, transparent 70%)' }}
      />

      {/* Badge icon */}
      <div
        className="w-10 h-10 flex items-center justify-center border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 mb-5 transition-colors duration-300 group-hover:border-[var(--color-accent)]/40 group-hover:bg-[var(--color-accent)]/10"
        style={{ borderRadius: 6 }}
      >
        <BadgeIcon />
      </div>

      {/* Titolo */}
      <h3 className="font-display font-black text-[16px] text-[#f0ece0] leading-tight mb-2 transition-colors duration-200 group-hover:text-white">
        {cert.title}
      </h3>

      {/* Ente */}
      <p className="text-[11px] font-mono text-white/35 tracking-[0.1em]">{cert.issuer}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5">
        <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--color-accent)' }}>
          {cert.year}
        </span>
        <span className="text-[9px] font-mono tracking-[0.15em] text-white/0 group-hover:text-white/40 transition-colors duration-300">
          VISUALIZZA ↗
        </span>
      </div>
    </motion.div>
  )
}

// ── Placeholder documento (finché non vengono caricati i PDF reali) ────────

function CertPlaceholder({ cert }: { cert: Certification }) {
  return (
    <div
      className="bg-[#f5f0e8] text-[#111] w-full p-10 relative overflow-hidden"
      style={{ borderRadius: 6 }}
    >
      {/* Angoli decorativi */}
      {[
        'top-5 left-5 border-t-2 border-l-2',
        'top-5 right-5 border-t-2 border-r-2',
        'bottom-5 left-5 border-b-2 border-l-2',
        'bottom-5 right-5 border-b-2 border-r-2',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-7 h-7 ${cls}`} style={{ borderColor: 'rgba(124,91,223,0.25)' }} />
      ))}

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: '#7c5bdf' }}>
          {cert.issuer}
        </p>
        <div className="w-8 h-[1px] mx-auto my-4" style={{ background: 'rgba(124,91,223,0.35)' }} />
        <p className="text-[10px] font-mono tracking-[0.2em] text-[#888] uppercase">
          Certificate of Achievement
        </p>
      </div>

      {/* Body */}
      <div className="text-center border-y border-black/10 py-7 mb-7">
        <p className="text-[9px] font-mono tracking-[0.2em] text-[#999] uppercase mb-4">
          Questo attesta che
        </p>
        <p className="font-display font-black text-[26px] text-[#0a0a0a] leading-none mb-4">
          Shankar Mattavelli
        </p>
        <p className="text-[11px] font-mono text-[#666] mb-3">
          ha completato con successo il programma
        </p>
        <p className="font-display font-black text-[18px] leading-tight" style={{ color: '#0a0a0a' }}>
          {cert.title}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[8px] font-mono tracking-[0.22em] text-[#aaa] uppercase mb-1">Anno</p>
          <p className="font-display font-black text-[16px] text-[#0a0a0a]">{cert.year}</p>
        </div>
        {/* Sigillo decorativo */}
        <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="29" stroke="#7c5bdf" strokeWidth="1" strokeOpacity="0.25" fill="none" />
          <circle cx="32" cy="32" r="23" stroke="#7c5bdf" strokeWidth="0.5" strokeOpacity="0.18" fill="none" strokeDasharray="2 3" />
          <text x="32" y="29" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill="#7c5bdf" fillOpacity="0.45" letterSpacing="1.5">VERIFIED</text>
          <text x="32" y="37" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="#7c5bdf" fillOpacity="0.35" letterSpacing="1">{cert.year}</text>
        </svg>
      </div>

      {/* Nota placeholder */}
      <div className="mt-7 border border-black/[0.08] py-2.5 text-center" style={{ borderRadius: 3 }}>
        <p className="text-[8px] font-mono tracking-[0.14em] text-[#bbb] uppercase">
          — documento pdf originale in caricamento —
        </p>
      </div>
    </div>
  )
}

// ── Modal documento ────────────────────────────────────────────────────────

function DocumentModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 overflow-y-auto"
      style={{ backgroundColor: 'rgba(8,8,8,0.88)', backdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[580px] my-auto"
        initial={{ scale: 0.90, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 12, opacity: 0 }}
        transition={{ duration: 0.38, ease }}
        onClick={e => e.stopPropagation()}
      >
        {/* Chiudi */}
        <button
          onClick={onClose}
          className="absolute -top-9 right-0 font-mono text-[10px] tracking-[0.18em] text-white/35 hover:text-white/70 transition-colors duration-200"
        >
          ESC · CHIUDI ✕
        </button>

        {/* Documento */}
        {cert.documentUrl ? (
          <iframe
            src={cert.documentUrl}
            title={cert.title}
            className="w-full"
            style={{ height: '75vh', borderRadius: 6, border: 'none' }}
          />
        ) : (
          <CertPlaceholder cert={cert} />
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Sezione principale ─────────────────────────────────────────────────────

export default function CertificazioniSection() {
  const [selected, setSelected] = useState<Certification | null>(null)

  return (
    <>
      <section
        id="certificazioni"
        className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-20"
      >
        <SectionLabel label="Certificazioni" />
        <motion.h2
          className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
          style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <span className="text-[#f0ece0] block">
            <TypedText text="Competenze" delay={0.25} />
          </span>
          <span style={{ color: 'var(--color-accent)' }} className="block">
            <TypedText text="certificate." delay={0.25 + 10 * 0.045 + 0.07} />
          </span>
        </motion.h2>

        <motion.p
          className="mt-4 text-[11px] font-mono text-white/25 tracking-[0.1em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Clicca su una certificazione per visualizzare il documento
        </motion.p>

        {/* Grid 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              onClick={() => setSelected(cert)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <DocumentModal cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
