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
    <div style={{ position: 'relative' }}>

      {/* ── CONTATTO — fissa dietro, layer 1 ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
        <ContattoSection />
      </div>

      {/* ── PAGINA PRINCIPALE — scorre sopra, layer 2 ── */}
      <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#080808' }}>

        <HeroSection />

        <SectionDivider />

        <ProjectsSection />

        <SectionDivider />

        <PercorsoSection />

        <SectionDivider />

        <CertificazioniSection />

        {/* Spacer: permette di scrollare fino a esporre completamente il contatto */}
        <div style={{ height: '100vh' }} />

      </div>
    </div>
  )
}
