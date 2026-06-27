import HeroSection from '@/components/sections/HeroSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { motion } from 'framer-motion'

function SectionHeading({ white, accent }: { white: string; accent: string }) {
  return (
    <motion.h2
      className="font-display font-black leading-[1.0] tracking-[-0.02em]"
      style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <span className="text-[#f0ece0] block">{white}</span>
      <span style={{ color: 'var(--color-accent)' }} className="block">{accent}</span>
    </motion.h2>
  )
}

function SectionDivider() {
  return <div className="h-px bg-white/[0.06] w-full my-2" />
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSection />

      <SectionDivider />

      {/* ── PROGETTI ── */}
      <section
        id="progetti"
        className="min-h-svh flex flex-col justify-center w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20"
      >
        <SectionLabel label="Selected Work" />
        <SectionHeading white="Progetti" accent="selezionati." />

        <motion.p
          className="mt-16 text-sm text-white/25 font-mono tracking-[0.15em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          — Sezione in sviluppo (Milestone 2)
        </motion.p>
      </section>

      <SectionDivider />

      {/* ── PERCORSO ── */}
      <section
        id="percorso"
        className="min-h-svh flex flex-col justify-center w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20"
      >
        <SectionLabel label="Il mio percorso" />
        <SectionHeading white="Da zero" accent="all'obiettivo." />

        <motion.p
          className="mt-16 text-sm text-white/25 font-mono tracking-[0.15em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          — Sezione in sviluppo (Milestone 2)
        </motion.p>
      </section>

      <SectionDivider />

      {/* ── CERTIFICAZIONI ── */}
      <section
        id="certificazioni"
        className="min-h-svh flex flex-col justify-center w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20"
      >
        <SectionLabel label="Certificazioni" />
        <SectionHeading white="Competenze" accent="certificate." />

        <motion.p
          className="mt-16 text-sm text-white/25 font-mono tracking-[0.15em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          — Sezione in sviluppo (Milestone 2)
        </motion.p>
      </section>

      <SectionDivider />

      {/* ── CONTATTO ── */}
      <section
        id="contatto"
        className="min-h-svh flex flex-col justify-center w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20"
      >
        <SectionLabel label="Contatto" />
        <SectionHeading white="Costruiamo" accent="qualcosa insieme." />

        <motion.p
          className="mt-16 text-sm text-white/25 font-mono tracking-[0.15em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          — Sezione in sviluppo (Milestone 2)
        </motion.p>
      </section>
    </>
  )
}
