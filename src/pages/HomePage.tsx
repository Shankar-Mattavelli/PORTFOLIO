import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PercorsoSection from '@/components/sections/PercorsoSection'
import CertificazioniSection from '@/components/sections/CertificazioniSection'
import ContattoSection from '@/components/sections/ContattoSection'
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
      <ContattoSection />
    </>
  )
}
