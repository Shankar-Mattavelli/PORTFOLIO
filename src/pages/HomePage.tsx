import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import PercorsoSection from '@/components/sections/PercorsoSection'
import CertificazioniSection from '@/components/sections/CertificazioniSection'
import ContattoSection from '@/components/sections/ContattoSection'

function SectionDivider() {
  return <div className="h-px bg-white/[0.06] w-full" />
}

export default function HomePage() {
  /*
   * Stacking senza z-index espliciti: il DOM order determina chi sta sopra.
   * Contatto è PRIMA nel DOM (absolute bottom) → sotto.
   * Contenuto principale è DOPO nel DOM (position relative) → sopra.
   * Nessun z-index = nessun stacking context = il modal e i suoi bottoni
   * vivono nel root context e appaiono correttamente sopra all'header (z-50).
   */
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── CONTATTO — absolute in fondo, dipinto per primo (sotto) ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '100vh',
      }}>
        <ContattoSection />
      </div>

      {/* ── PAGINA PRINCIPALE — dipinta per seconda (sopra), bg pieno ── */}
      <div style={{ position: 'relative', backgroundColor: '#080808' }}>

        <HeroSection />

        <SectionDivider />

        <ProjectsSection />

        <SectionDivider />

        <PercorsoSection />

        <SectionDivider />

        <CertificazioniSection />

        {/* Spacer: fornisce i 100vh di scroll per sollevare il foglio */}
        <div style={{ height: '100vh' }} />

      </div>
    </div>
  )
}
