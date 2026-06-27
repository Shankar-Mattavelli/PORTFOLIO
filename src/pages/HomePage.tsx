import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PercorsoSection from '@/components/sections/PercorsoSection'
import CertificazioniSection from '@/components/sections/CertificazioniSection'
import SectionLabel from '@/components/ui/SectionLabel'
import TypedText from '@/components/ui/TypedText'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function SectionHeading({ white, accent }: { white: string; accent: string }) {
  return (
    <motion.h2
      className="font-display font-black leading-[1.0] tracking-[-0.02em] mt-5"
      style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
    >
      <span className="text-[#f0ece0] block">
        <TypedText text={white} delay={0.25} />
      </span>
      <span style={{ color: 'var(--color-accent)' }} className="block">
        <TypedText text={accent} delay={0.25 + white.length * 0.045 + 0.07} />
      </span>
    </motion.h2>
  )
}

function SectionDivider() {
  return <div className="h-px bg-white/[0.06] w-full" />
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSection />

      <SectionDivider />

      {/* ── PROGETTI ── */}
      <ProjectsSection />

      <SectionDivider />

      {/* ── PERCORSO ── */}
      <PercorsoSection />

      <SectionDivider />

      {/* ── CERTIFICAZIONI ── */}
      <CertificazioniSection />

      <SectionDivider />

      {/* ── CONTATTO ── */}
      <section
        id="contatto"
        className="min-h-svh flex flex-col justify-center w-full max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-20"
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
