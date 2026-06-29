import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAL_INFO } from '@/constants/data'
import SectionLabel from '@/components/ui/SectionLabel'
import TypedText from '@/components/ui/TypedText'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ── Icone ─────────────────────────────────────────────────────────────────

function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.49 15a19.79 19.79 0 01-3.07-8.67A2 2 0 013.34 4h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 11a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 18v2.92z"/>
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

// ── ContactItem ───────────────────────────────────────────────────────────

function ContactItem({ icon, label, value, href }: {
  icon: React.ReactNode; label: string; value: string; href: string
}) {
  const isExternal = href.startsWith('http')
  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 py-4 border-b border-white/[0.06] hover:border-[var(--color-accent)]/30 transition-colors duration-300"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div
        className="w-9 h-9 shrink-0 flex items-center justify-center border border-white/[0.08] text-white/30 group-hover:border-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/8 transition-all duration-300"
        style={{ borderRadius: 6 }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-mono tracking-[0.22em] text-white/25 uppercase mb-0.5">{label}</p>
        <p className="text-[12px] font-mono text-white/55 group-hover:text-white/90 transition-colors duration-200 truncate">
          {value}
        </p>
      </div>
      <span className="shrink-0 text-white/15 group-hover:text-[var(--color-accent)] transition-colors duration-200">
        <IconArrow />
      </span>
    </motion.a>
  )
}

// ── Form ──────────────────────────────────────────────────────────────────

const fieldBase =
  'w-full bg-transparent border-b py-3 text-[14px] text-[#f0ece0] placeholder:text-white/18 focus:outline-none transition-colors duration-250'

function ContactForm() {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [message, setMessage]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio — messaggio da ${name}`)
    const body    = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`)
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          className="flex flex-col items-center justify-center py-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.div
            className="w-14 h-14 rounded-full border flex items-center justify-center mb-5"
            style={{ borderColor: 'var(--color-accent)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </motion.div>
          <p className="font-display font-black text-[20px] text-[#f0ece0] mb-2">Client email aperto</p>
          <p className="text-[12px] font-mono text-white/35 leading-relaxed">
            Se non si aprisse, scrivimi direttamente:<br/>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline" style={{ color: 'var(--color-accent)' }}>
              {PERSONAL_INFO.email}
            </a>
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 text-[9px] font-mono tracking-[0.18em] text-white/25 hover:text-white/50 transition-colors duration-200 uppercase"
          >
            ← Nuovo messaggio
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {[
            { id: 'name',    label: 'Nome',     type: 'text',  placeholder: 'Marco Rossi',        value: name,    setter: setName },
            { id: 'email',   label: 'Email',    type: 'email', placeholder: 'marco@example.com',  value: email,   setter: setEmail },
          ].map(f => (
            <div key={f.id}>
              <label className="block text-[9px] font-mono tracking-[0.22em] text-white/28 uppercase mb-2">{f.label}</label>
              <input
                className={`${fieldBase} border-white/[0.08] focus:border-[var(--color-accent)]`}
                type={f.type}
                placeholder={f.placeholder}
                required
                value={f.value}
                onChange={e => f.setter(e.target.value)}
              />
            </div>
          ))}
          <div>
            <label className="block text-[9px] font-mono tracking-[0.22em] text-white/28 uppercase mb-2">Messaggio</label>
            <textarea
              className={`${fieldBase} resize-none border-white/[0.08] focus:border-[var(--color-accent)]`}
              placeholder="Dimmi del progetto..."
              required
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full font-display font-black text-[13px] tracking-[0.08em] uppercase text-white py-4 flex items-center justify-center gap-2.5"
            style={{ backgroundColor: 'var(--color-accent)', borderRadius: 6 }}
            whileHover={{ scale: 1.02, backgroundColor: 'var(--color-accent-bright)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            Invia Messaggio
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

// ── Sezione principale ────────────────────────────────────────────────────

export default function ContattoSection() {
  const year = new Date().getFullYear()

  return (
    <section
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: '#0f0d28' }}
    >
      {/* Glow viola */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(124,91,223,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Contenuto principale — cresce per riempire lo spazio */}
      <div className="relative z-10 flex-1 max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 pt-10 pb-4 lg:pt-14 lg:pb-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-start">

          {/* ── Colonna sinistra ── */}
          <div>
            <SectionLabel label="Contatto" />

            <motion.h2
              className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
              style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}
              initial={{ opacity: 1, y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              <span className="text-[#f0ece0] block">
                <TypedText text="Costruiamo" />
              </span>
              <span style={{ color: 'var(--color-accent)' }} className="block">
                <TypedText text="qualcosa" delay={10 * 0.045 + 0.06} />
              </span>
              <span style={{ color: 'var(--color-accent)' }} className="block">
                <TypedText text="insieme." delay={18 * 0.045 + 0.12} />
              </span>
            </motion.h2>

            <motion.p
              className="mt-7 text-[14px] leading-relaxed text-white/38 font-light max-w-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              {PERSONAL_INFO.contactBio}
            </motion.p>

            {/* Contact items — Email, Telefono, LinkedIn, GitHub */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
            >
              <ContactItem
                icon={<IconMail />}
                label="Email"
                value={PERSONAL_INFO.email}
                href={`mailto:${PERSONAL_INFO.email}`}
              />
              <ContactItem
                icon={<IconPhone />}
                label="Telefono"
                value={PERSONAL_INFO.phone}
                href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`}
              />
              <ContactItem
                icon={<IconLinkedIn />}
                label="LinkedIn"
                value="shankar-mattavelli"
                href={PERSONAL_INFO.linkedin}
              />
              <ContactItem
                icon={<IconGitHub />}
                label="GitHub — progetti & codice"
                value="github.com/shankar-mattavelli"
                href="https://github.com/shankar-mattavelli"
              />
            </motion.div>
          </div>

          {/* ── CTA mobile — bottone mailto, solo su schermi < lg ── */}
          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="lg:hidden mt-2 flex items-center justify-center gap-2.5 font-display font-black text-[13px] tracking-[0.08em] uppercase text-white py-4 w-full"
            style={{ backgroundColor: 'var(--color-accent)', borderRadius: 6 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
          >
            Invia Messaggio
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>

          {/* ── Colonna destra (form) — nascosta su mobile, visibile da lg ── */}
          <motion.div
            className="hidden lg:block lg:pt-[90px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>

      {/* ── Footer bar ── */}
      <div
        className="relative z-10 shrink-0 border-t px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-4 flex items-center justify-between gap-4"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            backgroundColor: 'rgba(255,255,255,0.18)',
            WebkitMaskImage: 'url(/logo.png)',
            maskImage: 'url(/logo.png)',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            flexShrink: 0,
          }}
        />
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/15 text-right">
          © {year} Shankar Mattavelli — All rights reserved
        </span>
      </div>
    </section>
  )
}
