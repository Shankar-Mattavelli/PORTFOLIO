import { motion } from 'framer-motion'

type Props = { label: string; delay?: number }

export default function SectionLabel({ label, delay = 0 }: Props) {
  return (
    <motion.div
      className="section-label mb-6 md:mb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <span className="text-[10px] font-medium tracking-[0.35em] text-white/35 uppercase">
        {label}
      </span>
    </motion.div>
  )
}
