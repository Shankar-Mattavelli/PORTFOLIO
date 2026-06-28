import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/constants/data'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = PROJECTS.find(p => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  const gallery = project.gallery ?? (project.preview ? [project.preview] : [])

  return (
    <main className="w-full min-h-svh" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* Hero — prima immagine full-width */}
      {gallery[0] && (
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px, 55vh, 680px)' }}>
          <img
            src={gallery[0]}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.78)' }}
          />
          {/* Gradient bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--color-bg) 100%)' }}
          />
        </div>
      )}

      {/* Contenuto */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        {/* Header info */}
        <motion.div
          className="pt-10 pb-12 border-b"
          style={{ borderColor: 'var(--color-border)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Sinistra: num + titolo + desc */}
            <div className="max-w-2xl">
              <p className="text-[10px] font-mono tracking-[0.3em] text-white/25 uppercase mb-3">
                {project.num} — {project.category}
              </p>
              <h1
                className="font-display font-black leading-[0.9] tracking-[-0.02em] text-[#f0ece0]"
                style={{ fontSize: 'clamp(44px, 7vw, 100px)' }}
              >
                {project.title}
              </h1>
              <p className="mt-5 text-[14px] leading-relaxed text-white/45 font-light max-w-lg">
                {project.description}
              </p>
            </div>

            {/* Destra: metadata */}
            <div className="flex flex-col gap-5 shrink-0 min-w-[180px]">
              {[
                { label: 'Ruolo',      value: project.role },
                { label: 'Anno',       value: project.year },
                { label: 'Categoria',  value: project.type },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[8px] font-mono tracking-[0.25em] text-white/25 uppercase mb-1">{label}</p>
                  <p className="text-[13px] font-mono text-white/70">{value}</p>
                </div>
              ))}
              {/* Tech tags */}
              <div>
                <p className="text-[8px] font-mono tracking-[0.25em] text-white/25 uppercase mb-2">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techTags.map(tag => (
                    <span
                      key={tag}
                      className="border text-[8px] font-mono tracking-[0.12em] px-2 py-[3px] uppercase"
                      style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', borderRadius: 2 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery */}
        {gallery.length > 1 && (
          <motion.div
            className="py-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <p className="text-[9px] font-mono tracking-[0.28em] text-white/25 uppercase mb-8">Galleria</p>
            <div className="columns-1 sm:columns-2 gap-4 space-y-4">
              {gallery.slice(1).map((src, i) => (
                <motion.div
                  key={src}
                  className="break-inside-avoid overflow-hidden"
                  style={{ borderRadius: 6 }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease, delay: i * 0.06 }}
                >
                  <img
                    src={src}
                    alt={`${project.title} — ${i + 2}`}
                    className="w-full object-cover"
                    style={{ filter: 'brightness(0.9)' }}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back */}
        <div className="py-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <Link
            to="/#progetti"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-white/30 hover:text-white/70 transition-colors duration-200 uppercase"
          >
            ← Torna ai progetti
          </Link>
        </div>
      </div>
    </main>
  )
}
