import { motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'

export default function LangToggle() {
  const { lang, toggle } = useLang()
  const label = lang === 'it' ? 'EN' : 'IT'

  return (
    <motion.button
      onClick={toggle}
      aria-label={`Switch to ${label}`}
      className="fixed bottom-7 right-7 z-50 font-mono text-[10px] tracking-[0.28em] text-white/30 hover:text-white/80 transition-colors duration-200 cursor-pointer select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <span
        className="block h-px w-full mb-2"
        style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }}
      />
      {label}
    </motion.button>
  )
}
