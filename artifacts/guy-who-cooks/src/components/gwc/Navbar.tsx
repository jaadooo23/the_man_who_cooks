import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu as MenuIcon, PhoneCall, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { restaurantData } from '@/data/restaurantData';

const navLinks = ['menu', 'signature', 'story', 'contact'] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('menu');
  const reduced = useReducedMotion();

  // Track scroll distance to switch the background from transparent to solid.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link matching the currently visible section.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.2, 0.5] },
    );
    navLinks.forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll and bind Escape-to-close whenever the mobile menu is open.
  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const phoneHref = `tel:${restaurantData.phone.replaceAll(' ', '')}`;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-300',
          scrolled
            ? 'bg-[#21140f]/90 border-white/10 backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          {/* Brand mark — scrolls back to the hero. */}
          <motion.button
            data-testid="button-brand-home"
            type="button"
            aria-label="Back to top"
            onClick={() => scrollTo('top')}
            className="group flex items-center gap-3 text-left"
            whileHover={reduced ? undefined : { scale: 1.04 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[.4rem] border border-[#e8523e] bg-[#e8523e] font-display text-[11px] font-black leading-none text-[#21140f]">
              {restaurantData.shortName}
            </span>
            <span className="text-xs font-mono-brand uppercase tracking-[.22em] text-[#f5e9d6]">
              {restaurantData.phrase}
            </span>
          </motion.button>

          {/* Desktop navigation links. */}
          <nav className="hidden items-center md:flex" aria-label="Primary navigation">
            <ul className="flex items-center gap-1.5">
              {navLinks.map((item) => {
                const isActive = active === item;
                return (
                  <motion.button
                    key={item}
                    type="button"
                    data-testid={`link-nav-${item}`}
                    onClick={() => scrollTo(item)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative px-4 py-2 font-mono-brand text-[11px] uppercase tracking-[.18em] transition-colors',
                      isActive ? 'text-[#f1b557]' : 'text-[#c7ab93] hover:text-[#f1b557]',
                    )}
                  >
                    {item}
                    {/* Animated underline — grows on hover and stays for the active section. */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 w-full bg-[#e8523e]"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                      whileHover={reduced ? undefined : { scaleX: 1, opacity: 1 }}
                      style={{ transformOrigin: 'left' }}
                      transition={{ duration: reduced ? 0 : 0.2, ease: 'circOut' }}
                    />
                  </motion.button>
                );
              })}
            </ul>
          </nav>
          {/* Right side: call-to-action + mobile toggle. */}
          <div className="flex items-center gap-3">
            <motion.a
              href={phoneHref}
              data-testid="button-order-header"
              aria-label="Call now"
              className="btn-primary hidden shrink-0 sm:inline-flex"
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.96 }}
            >
              <PhoneCall size={14} /> Call now
            </motion.a>
            <motion.button
              type="button"
              data-testid="button-mobile-menu"
              aria-expanded={open}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-[.4rem] border border-white/20 text-[#f5e9d6] transition-colors hover:border-[#e8523e] hover:text-[#e8523e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1b557] md:hidden"
              whileTap={reduced ? undefined : { scale: 0.95 }}
            >
              {open ? <X size={20} /> : <MenuIcon size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu with staggered link entrance. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-10 bg-[#120b08]/95 p-10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              data-testid="button-close-mobile"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-[.4rem] border border-white/20 text-[#f5e9d6] transition-colors hover:border-[#e8523e] hover:text-[#e8523e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1b557]"
            >
              <X size={20} />
            </motion.button>
            <motion.ul
              className="flex flex-col items-center gap-6"
              initial={reduced ? 'visible' : 'hidden'}
              animate="visible"
              exit="hidden"
              variants={
                reduced
                  ? undefined
                  : {
                      visible: {
                        transition: { staggerChildren: 0.08, delayChildren: 0.18 },
                      },
                      hidden: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 },
                      },
                    }
              }
            >
              {navLinks.map((item) => {
                const isActive = active === item;
                return (
                  <motion.li
                    key={item}
                    variants={
                      reduced
                        ? undefined
                        : {
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: 16 },
                          }
                    }
                    transition={{ duration: reduced ? 0 : 0.18, ease: 'easeOut' }}
                  >
                    <motion.button
                      type="button"
                      data-testid={`link-mobile-nav-${item}`}
                      onClick={() => scrollTo(item)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'font-mono-brand text-2xl uppercase tracking-[.2em] transition-colors',
                        isActive
                          ? 'text-[#f1b557]'
                          : 'text-[#f5e9d6] hover:text-[#f1b557]',
                      )}
                      whileHover={reduced ? undefined : { x: 6 }}
                      whileTap={reduced ? undefined : { scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  </motion.li>
                );
              })}
            </motion.ul>
            <motion.a
              href={phoneHref}
              data-testid="link-mobile-call"
              aria-label="Call now"
              onClick={() => setOpen(false)}
              className="btn-primary"
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.96 }}
            >
              <PhoneCall size={16} /> Call now
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
