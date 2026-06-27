import { motion } from 'framer-motion'
import { PERSONAL_INFO, STATS, HERO_BADGES } from '@/constants/data'

const easeExpOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

function animFadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: easeExpOut, delay },
  } as const
}

function animFadeIn(delay: number) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, ease: 'easeOut' as const, delay },
  } as const
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-svh flex flex-col pt-[68px] overflow-hidden"
      aria-label="Hero"
    >
      {/* Purple glow — right side */}
      <div
        className="pointer-events-none absolute right-[-200px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,91,223,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Floating tech badges */}
      {HERO_BADGES.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute pointer-events-none hidden md:block"
          style={{ top: badge.top, left: badge.left, right: badge.right, bottom: badge.bottom }}
          {...animFadeIn(1.2 + i * 0.08)}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: badge.floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: badge.floatDelay,
            }}
            className="border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-white/30 whitespace-nowrap"
          >
            {badge.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="flex flex-col flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-10 lg:px-14">

        {/* Top — label + name + subtitle */}
        <div className="pt-10 md:pt-16">

          {/* Section label */}
          <motion.div className="section-label mb-6 md:mb-8" {...animFadeIn(0.3)}>
            <span className="text-[10px] font-medium tracking-[0.35em] text-white/35 uppercase">
              Portfolio 2024
            </span>
          </motion.div>

          {/* Display name */}
          <motion.h1
            className="font-display font-black leading-[0.88] tracking-[-0.02em] text-[#f0ece0]"
            style={{ fontSize: 'clamp(68px, 11.5vw, 162px)' }}
            {...animFadeUp(0.45)}
          >
            {PERSONAL_INFO.nameFirstLine}
            <br />
            {PERSONAL_INFO.nameSecondLine}
            <span className="cursor-blink" aria-hidden="true" />
          </motion.h1>

          {/* Role */}
          <motion.p
            className="mt-6 md:mt-8 text-base md:text-lg italic text-white/45 font-light tracking-wide"
            {...animFadeIn(0.7)}
          >
            — {PERSONAL_INFO.role}
          </motion.p>
        </div>

        {/* Separator */}
        <motion.div
          className="my-8 md:my-12 h-px bg-white/[0.08] w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 1, ease: easeExpOut, delay: 0.9 }}
        />

        {/* Bottom — bio + stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16 pb-12 md:pb-16">

          {/* Bio + scroll hint */}
          <div className="flex flex-col gap-6 max-w-sm">
            <motion.p
              className="text-sm md:text-[15px] leading-relaxed text-white/40 font-light"
              {...animFadeIn(1.0)}
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            <motion.div
              className="inline-flex border border-white/[0.08] bg-white/[0.02] px-3 py-2 font-mono text-[11px] tracking-[0.1em] text-white/25 w-fit"
              {...animFadeIn(1.2)}
            >
              scroll per esplorare
            </motion.div>
          </div>

          {/* Stats */}
          <div className="flex items-stretch">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`flex flex-col items-center justify-center px-6 md:px-8 py-2 ${i > 0 ? 'border-l border-white/[0.15]' : ''}`}
                {...animFadeUp(1.0 + i * 0.12)}
              >
                <span
                  className="font-display font-black leading-none tracking-tight"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--color-accent)' }}
                >
                  {stat.value}
                </span>
                <span className="mt-2 text-[9px] md:text-[10px] font-medium tracking-[0.25em] text-white/30 uppercase whitespace-nowrap">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
