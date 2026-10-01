import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '@/data/restaurantData';

/** Session key that records whether the splash screen already played. */
const STORAGE_KEY = 'tgwc:loader-shown';

/** Milliseconds the overlay stays on screen before it starts to exit. */
const HOLD_DURATION = 1500;

/** Seconds the slide-up exit animation takes to complete. */
const EXIT_DURATION = 0.5;

/** Brand letters, revealed one after another. */
const BRAND_LETTERS = ['T', 'G', 'W', 'C'];

/** Stagger timing shared by the brand letter group. */
const brandContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};

/** Entrance state for a single brand letter. */
const brandLetterVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Reads the session flag without throwing when storage is blocked.
 * Returns true when the splash screen has already played for this session.
 */
function hasLoaderRun(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/** Persists the session flag, ignoring browsers where storage is unavailable. */
function rememberLoaderRun(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Storage can be blocked; the splash screen then plays again on the next visit.
  }
}

export function Loader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => !reduced && !hasLoaderRun());

  // Remember the visit so the splash screen does not repeat within the session.
  useEffect(() => {
    rememberLoaderRun();
  }, []);

  // Lock page scrolling while the overlay is on screen and restore it afterwards.
  useEffect(() => {
    if (!visible) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  // Dismiss the overlay after the hold period. Reduced motion skips it entirely.
  useEffect(() => {
    if (!visible) {
      return;
    }
    if (reduced) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), HOLD_DURATION);
    return () => window.clearTimeout(timer);
  }, [visible, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 bg-[#120b08] px-6"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: EXIT_DURATION, ease: 'easeInOut' }}
        >
          {/* Warm glow that keeps the overlay on brand. */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(232,82,62,.18),transparent_62%)]" />

          {/* Flame outline that draws itself in. */}
          <motion.svg
            viewBox="0 0 24 24"
            className="relative h-11 w-11 text-[#e8523e]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.path
              d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          </motion.svg>

          {/* Brand mark revealed letter by letter. */}
          <motion.div
            className="relative flex items-end gap-1 font-display text-[clamp(3.5rem,18vw,11rem)] font-black uppercase leading-[.8] tracking-[-.02em] text-[#f5e9d6]"
            variants={brandContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {BRAND_LETTERS.map((letter) => (
              <motion.span
                key={letter}
                className="inline-block"
                variants={brandLetterVariants}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline that fades in beneath the brand mark. */}
          <motion.p
            className="relative font-mono-brand text-[11px] uppercase tracking-[.32em] text-[#f1b557]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55, ease: 'easeOut' }}
          >
            {restaurantData.phrase}
          </motion.p>

          {/* Progress line that fills for the duration of the hold. */}
          <div className="relative h-px w-52 overflow-hidden rounded-full bg-[#f5e9d6]/15">
            <motion.div
              className="h-full w-full origin-left bg-[#e8523e]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD_DURATION / 1000, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
