import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  /** Classes forwarded to the wrapper element so existing layout is preserved. */
  className?: string;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
};

/**
 * Fades its children in with a slight upward shift the first time they enter the viewport.
 * When the visitor prefers reduced motion the wrapper renders as a plain element.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
