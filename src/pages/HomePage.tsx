import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PercorsoSection from '@/components/sections/PercorsoSection'
import CertificazioniSection from '@/components/sections/CertificazioniSection'
import ContattoSection from '@/components/sections/ContattoSection'

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
