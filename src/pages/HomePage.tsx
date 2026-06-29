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
   * Come funziona il reveal:
   *   - outerWrapper height = mainContent (H) + paddingBottom (100vh)
   *   - Contact è position:absolute bottom:0 height:100vh → vive nella padding area (H … H+100vh)
   *   - mainContent ha bg #080808 solido e copre il contact fino a che non esce dal viewport
   *   - Scrollando da (H-vh) a H il mainContent sale e il contact appare dal basso in sincronia
   *   - Effetto: "foglio che si solleva e rivela la sezione sotto"
   */
  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '100vh' }}>

      {/* ── CONTATTO — nella padding area, dipinto per primo (sotto) ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '100vh',
      }}>
        <ContattoSection />
      </div>

      {/* ── PAGINA PRINCIPALE — bg solido, scorre sopra il contatto ── */}
      <div style={{ position: 'relative', backgroundColor: '#080808' }}>

        <HeroSection />

        <SectionDivider />

        <ProjectsSection />

        <SectionDivider />

        <PercorsoSection />

        <SectionDivider />

        <CertificazioniSection />

        {/* Pausa visiva + gradiente di transizione verso il viola del contatto */}
        <div style={{ height: '55vh' }} />
        <div style={{
          height: '5vh',
          background: 'linear-gradient(to bottom, #080808 0%, #0a0916 100%)',
        }} />

      </div>
    </div>
  )
}
