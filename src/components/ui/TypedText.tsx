import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
  speed?: number    // secondi per carattere
  inView?: boolean  // true = attiva allo scroll, false = attiva al mount
}

const charVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}

export default function TypedText({
  text,
  className,
  delay = 0,
  speed = 0.045,
  inView = true,
}: Props) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: speed, delayChildren: delay } },
  }

  const triggerProps = inView
    ? { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount: 0.1 } }
    : { initial: 'hidden' as const, animate: 'visible' as const }

  return (
    <motion.span className={className} variants={containerVariants} {...triggerProps}>
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={charVariants} style={{ whiteSpace: 'pre' }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
