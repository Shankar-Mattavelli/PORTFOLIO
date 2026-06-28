import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const TRAITS = ['Curiosità', 'Crescita continua', 'Creatività', 'Problem Solving']

const TIMELINE = [
  { label: 'Liceo Scientifico — Scienze Applicate',          period: '2015 – 2020' },
  { label: 'Istituto Europeo di Design (IED)',               period: '2020 – 2023' },
  { label: 'Magazziniere — prima esperienza lavorativa',     period: '2020 – 2021' },
  { label: 'Formazione sulla Sicurezza & Multimedia',        period: '2024 – oggi' },
  { label: 'Ingegneria Informatica',                         period: '2024 – oggi' },
  { label: 'Progetti Personali',                             period: 'in continuo'  },
]

const BIO = [
  "Mi chiamo Shankar e sono una persona guidata dalla curiosità. Credo che ogni esperienza rappresenti un'opportunità di crescita e che ogni nuova sfida sia un'occasione per scoprire qualcosa in più su ciò che posso diventare.",
  "Il mio percorso è iniziato nel mondo del design, dove ho frequentato l'Istituto Europeo di Design (IED), sviluppando una particolare attenzione alla comunicazione visiva e alla cura dei dettagli. Parallelamente agli studi ho lavorato come magazziniere, un'esperienza che mi ha insegnato disciplina, organizzazione e il valore della costanza.",
  "Con il tempo la curiosità mi ha portato ad avvicinarmi sempre di più al mondo della tecnologia, fino a intraprendere gli studi in Ingegneria Informatica. Oggi mi occupo di formazione sulla sicurezza e della realizzazione di contenuti multimediali, unendo creatività e tecnologia in un contesto concreto.",
  "Nel tempo libero amo sperimentare nuove idee, sviluppare progetti personali ed esplorare strumenti e tecnologie che mi permettono di crescere continuamente. Credo che la curiosità, la capacità di adattarsi e la voglia di mettermi in gioco siano gli elementi che guidano il mio percorso, dentro e fuori dal lavoro.",
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function AboutModal({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          style={{ backgroundColor: 'var(--color-bg)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-[101] flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-white/25 hover:text-white/70 transition-colors duration-200 uppercase"
            aria-label="Chiudi"
          >
            Esc <span className="text-[16px] leading-none">×</span>
          </button>

          <motion.div
            className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 pt-20 pb-24"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.08 }}
          >
            {/* Section header */}
            <div className="mb-14 md:mb-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-7 h-px" style={{ backgroundColor: 'var(--color-accent)' }} />
                <span className="text-[10px] font-medium tracking-[0.35em] text-white/35 uppercase">Chi Sono</span>
              </div>
              <h2
                className="font-display font-black leading-[0.9] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(40px, 5.5vw, 82px)' }}
              >
                <span className="text-[#f0ece0] block">Il mio</span>
                <span style={{ color: 'var(--color-accent)' }} className="block">percorso.</span>
              </h2>
              <p className="mt-5 text-[13px] text-white/30 font-light max-w-lg leading-relaxed">
                Un percorso costruito tra creatività, tecnologia e voglia di mettersi continuamente alla prova.
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">

              {/* LEFT — foto + pills */}
              <div>
                <div
                  className="relative overflow-hidden w-full"
                  style={{ borderRadius: 4, maxHeight: 560 }}
                >
                  <img
                    src="/shankar.png"
                    alt="Shankar Mattavelli"
                    className="w-full h-full object-cover object-top"
                    style={{ maxHeight: 560 }}
                    draggable={false}
                  />
                  {/* Bottom fade — blende col bg */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 45%, var(--color-bg) 100%)',
                    }}
                  />
                </div>

                {/* Trait pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {TRAITS.map((trait, i) => (
                    <motion.span
                      key={trait}
                      className="font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-[5px]"
                      style={{
                        border: '1px solid rgba(124,91,223,0.28)',
                        color: 'var(--color-accent)',
                        borderRadius: 2,
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.38, ease, delay: 0.35 + i * 0.07 }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* RIGHT — bio + timeline */}
              <div className="flex flex-col gap-14">

                {/* Bio */}
                <div className="flex flex-col gap-5">
                  {BIO.map((para, i) => (
                    <motion.p
                      key={i}
                      className="text-[14px] leading-[1.85] text-white/45 font-light"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease, delay: 0.2 + i * 0.08 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-[9px] font-mono tracking-[0.28em] text-white/22 uppercase mb-8">
                    Tappe del percorso
                  </p>
                  <div className="relative">
                    {/* Vertical guide line */}
                    <div
                      className="absolute left-[3px] top-3 bottom-3 w-px"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    />
                    <div className="flex flex-col gap-7">
                      {TIMELINE.map((item, i) => {
                        const isLast = i === TIMELINE.length - 1
                        return (
                          <motion.div
                            key={item.label}
                            className="relative pl-6 flex flex-col"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.07 }}
                          >
                            {/* Dot */}
                            <span
                              className="absolute left-0 top-[6px] w-[7px] h-[7px] rounded-full"
                              style={{
                                backgroundColor: 'var(--color-accent)',
                                opacity: isLast ? 1 : 0.32,
                                boxShadow: isLast ? '0 0 8px rgba(124,91,223,0.5)' : 'none',
                              }}
                            />
                            <span className="text-[13px] font-medium text-white/60 leading-snug">
                              {item.label}
                            </span>
                            <span className="mt-[3px] text-[9px] font-mono tracking-[0.16em] text-white/22">
                              {item.period}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
