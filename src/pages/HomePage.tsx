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
   * Reveal effect: contact è position:fixed al fondo del viewport.
   * Il main content (bg solido #080808) scorre sopra di essa e la copre.
   * Quando il main finisce, lo spacer trasparente (100vh) è l'unica cosa
   * nel viewport → la contact fixed diventa visibile sotto.
   * Risultato: la pagina "si solleva" rivelando la sezione sotto ferma.
   */
  return (
    <>
      {/* ── CONTATTO: veramente fissa al fondo del viewport ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '100vh' }}>
        <ContattoSection />
      </div>

      {/* ── MAIN CONTENT: bg solido copre la sezione fissa mentre è visibile ── */}
      <div style={{ position: 'relative', backgroundColor: '#080808' }}>
        <HeroSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <PercorsoSection />
        <SectionDivider />
        <CertificazioniSection />
        {/* Gradiente sul bordo inferiore: anticipa visivamente la transizione */}
        <div style={{ height: '4vh', background: 'linear-gradient(to bottom, #080808 0%, #0a0916 100%)' }} />
      </div>

      {/* ── SPACER trasparente: la contact fixed è visibile attraverso ──
          id="contatto" qui per far funzionare il nav link */}
      <div id="contatto" style={{ height: '100vh' }} />
    </>
  )
}
