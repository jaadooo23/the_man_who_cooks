import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Flame, Instagram, MapPin, PhoneCall, Play, Star, X, Youtube } from 'lucide-react';
import heroImage from '@assets/generated_images/gwc-hero.jpg';
import chickenImage from '@assets/generated_images/gwc-chicken.jpg';
import friesImage from '@assets/generated_images/gwc-fries.jpg';
import { Reveal } from '@/components/gwc/Reveal';
import { galleryData, heatLevels, menuData, restaurantData, type MenuCategory } from '@/data/restaurantData';

const categories: Array<'All' | MenuCategory> = ['All', 'Signatures', 'Beef Burgers', 'Chicken', 'Fried Items', 'Steaks', 'Drinks'];
const galleryImages: Record<string, string> = { hero: heroImage, chicken: chickenImage, fries: friesImage };

/** Stagger timing shared by the hero content blocks. */
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

/** Entrance state for a single hero block. */
const heroItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section id="top" ref={heroRef} className="relative flex min-h-[720px] items-end overflow-hidden border-b border-white/10 bg-[#21140f] pt-[74px] lg:min-h-[800px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_44%,rgba(232,82,62,.25),transparent_32%),linear-gradient(105deg,#21140f_0%,rgba(33,20,15,.72)_45%,rgba(33,20,15,.15)_100%)]" />
      {/* Soft brand glow sitting behind the hero image. */}
      <div className="pointer-events-none absolute right-[2%] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-[#e8523e]/30 blur-[110px] md:right-[10%] md:h-[560px] md:w-[560px]" />
      {/* The image drifts slightly against the scroll; it is extended upward so the movement never exposes an edge. */}
      <motion.div
        className="absolute -top-12 bottom-0 right-0 w-full max-w-[820px] bg-cover bg-center opacity-85 mix-blend-screen md:w-3/5"
        style={{ backgroundImage: `url('${heroImage}')`, y: reduced ? 0 : imageY }}
      />
      <div className="steam steam--one" /><div className="steam steam--two" />
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 md:px-10 md:pb-24"
        variants={heroContainer}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <div className="max-w-[900px]">
          <motion.p variants={heroItem} transition={{ duration: 0.6, ease: 'easeOut' }} className="mb-5 font-mono-brand text-[11px] uppercase tracking-[.28em] text-[#f1b557]">Islamabad / built loud / served hot</motion.p>
          <motion.h1 variants={heroItem} transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-[950px] font-display text-[clamp(4.3rem,13vw,11rem)] font-black uppercase leading-[.76] tracking-[-.065em] text-[#f5e9d6]">
            No Beef.<br /><span className="bg-gradient-to-r from-[#e8523e] to-[#f1b557] bg-clip-text text-transparent">No Life.</span>
          </motion.h1>
          <div className="mt-9 flex max-w-[470px] items-end justify-between gap-7">
            <motion.p variants={heroItem} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-balance text-sm leading-relaxed text-[#c7ab93]">Burgers, chicken, fries and chef specials for the people who believe dinner should leave evidence.</motion.p>
            <motion.div variants={heroItem} transition={{ duration: 0.6, ease: 'easeOut' }} className="shrink-0">
              <button data-testid="button-scroll-menu" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="grid h-14 w-14 place-items-center rounded-full bg-[#f1b557] text-[#21140f] transition-transform hover:translate-y-1" aria-label="Scroll to menu"><ArrowDown size={20} /></button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 z-10 hidden -translate-x-[10%] translate-y-[40%] font-display text-[18rem] leading-none text-[#f5e9d6]/[.03] lg:block">G</div>
    </section>
  );
}

export function MenuSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<'All' | MenuCategory>('All');
  const visible = useMemo(() => active === 'All' ? menuData : menuData.filter((item) => item.category === active), [active]);
  return (
    <section id="menu" className="bg-[#efe2cc] px-5 py-28 text-[#21140f] md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="min-w-0"><div className="mb-5 flex items-center gap-4"><p className="font-mono-brand text-[11px] uppercase tracking-[.24em] text-[#b6382b]">01 / The menu</p><span aria-hidden="true" className="h-px flex-1 bg-[#b6382b]/20" /></div><h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] uppercase leading-[.82] tracking-[-.06em]">Come<br /><em className="bg-gradient-to-r from-[#b6382b] to-[#e8523e] bg-clip-text font-normal text-transparent">hungry.</em></h2></div>
          <p className="max-w-[280px] text-sm leading-relaxed text-[#765e4e]">The menu moves with the mood. Start with something that needs both hands.</p>
        </Reveal>
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Menu categories">
          {categories.map((category) => {
            const isActive = active === category;
            return <button data-testid={`button-category-${category.toLowerCase().replaceAll(' ', '-')}`} key={category} onClick={() => setActive(category)} role="tab" aria-selected={isActive} className={`relative shrink-0 border px-4 py-2 font-mono-brand text-[10px] uppercase tracking-[.14em] transition-colors ${isActive ? 'border-[#e8523e] text-[#f5e9d6]' : 'border-[#cdbba3] text-[#765e4e] hover:border-[#e8523e] hover:text-[#b6382b]'}`}>
              {/* The pill slides between the tabs through a shared layout animation. */}
              {isActive && <motion.span layoutId="menu-category-pill" className="absolute inset-0 bg-[#e8523e]" transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }} />}
              <span className="relative z-10">{category}</span>
            </button>;
          })}
        </div>
        <motion.div layout className="relative grid gap-y-4 md:grid-cols-2 md:gap-x-10 md:gap-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, index) => <motion.article data-testid={`card-menu-${item.id}`} key={item.id} layout initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }} whileHover={reduced ? undefined : { y: -5 }} transition={{ duration: reduced ? 0 : 0.28, ease: 'easeOut' }} className={`group flex gap-4 rounded-[.4rem] border border-card-border/25 bg-gradient-to-b from-[#f5e9d6]/55 to-transparent px-5 py-6 transition-[border-color,box-shadow] duration-300 hover:border-card-border/45 hover:shadow-[0_26px_46px_-32px_rgba(33,20,15,.65)] ${index % 3 === 0 ? 'md:translate-y-3' : ''}`}>
              <span className="font-mono-brand pt-1 text-[10px] text-[#b6382b]">0{index + 1}</span>
              <div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-3"><div className="min-w-0"><span className="block font-mono-brand text-[9px] uppercase tracking-[.2em] text-[#9b806a]">{item.category}</span><h3 className="mt-1.5 font-display text-2xl uppercase leading-tight tracking-[-.02em]">{item.name}</h3></div><span className="shrink-0 rounded-full border border-[#b6382b]/25 bg-[#b6382b]/10 px-3 py-1 font-mono-brand text-[11px] text-[#b6382b]">{item.price}</span></div><p className="mt-3 max-w-[390px] text-sm leading-relaxed text-[#765e4e]">{item.description}</p>{item.accent && <span className="mt-3 inline-flex items-center gap-1.5 font-mono-brand text-[9px] uppercase tracking-[.16em] text-[#b6382b]"><Flame size={11} />{item.accent}</span>}</div>
            </motion.article>)}
          </AnimatePresence>
        </motion.div>
        <p className="mt-12 border-t border-[#cdbba3] pt-5 font-mono-brand text-[10px] uppercase tracking-[.12em] text-[#765e4e]">Prices and availability may change. Ask the kitchen for the move of the day.</p>
      </div>
    </section>
  );
}

export function SignatureSection() {
  const reduced = useReducedMotion();
  const [heat, setHeat] = useState(heatLevels[1]);
  return (
    <section id="signature" className="overflow-hidden bg-[#21140f] px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div className="min-w-0"><div className="mb-5 flex items-center gap-4"><p className="font-mono-brand text-[11px] uppercase tracking-[.24em] text-[#f1b557]">02 / Signature behaviour</p><span aria-hidden="true" className="h-px flex-1 bg-[#f1b557]/25" /></div><h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[.84] tracking-[-.06em] text-[#f5e9d6]">The Divine<br /><span className="bg-gradient-to-r from-[#e8523e] to-[#f1b557] bg-clip-text text-transparent">Beast.</span></h2></div><p className="max-w-[300px] text-sm leading-relaxed text-[#c7ab93]">Chargrilled beef, divine butter, caramelized onions, and mustard mayo. A current menu feature with both hands on the wheel.</p></Reveal>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div whileHover={reduced ? undefined : { y: -6 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="group relative min-h-[420px] overflow-hidden rounded-[.4rem] border border-card-border bg-[#3c2419] transition-shadow duration-300 md:min-h-[560px] hover:shadow-[0_30px_50px_-32px_rgba(0,0,0,.8)]">
            <img src={heroImage} alt="Art-directed stacked burger with melted cheese" className="image-shift h-full w-full object-cover opacity-80 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#21140f] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between"><p className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#f5e9d6]">Divine Beast / house signature</p><span className="font-display text-5xl text-[#f1b557]">01</span></div>
          </motion.div>
          <motion.div whileHover={reduced ? undefined : { y: -6 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col justify-between rounded-[.4rem] border border-card-border bg-[#332018] p-7 transition-shadow duration-300 md:p-10 hover:shadow-[0_30px_50px_-32px_rgba(0,0,0,.8)]">
            <div><p className="font-mono-brand text-xs uppercase tracking-[.16em] text-[#e8523e]">Nashville hot chicken</p><h3 className="mt-4 font-display text-5xl uppercase leading-[.9] text-[#f5e9d6]">How hot<br /><em className="font-normal text-[#f1b557]">are you?</em></h3><p className="mt-5 max-w-[330px] text-sm leading-relaxed text-[#c7ab93]">Pick your level. The kitchen will handle the rest.</p></div>
            <div className="mt-12"><div className="mb-5 h-1 bg-[#5d3b2c]"><div className="h-1 bg-[#e8523e] transition-all duration-500" style={{ width: `${heat.level * 25}%` }} /></div><div className="grid grid-cols-4 gap-2">{heatLevels.map((level) => <button data-testid={`button-heat-${level.id}`} key={level.id} onClick={() => setHeat(level)} aria-label={`Select ${level.name} heat`} className={`group text-left ${heat.id === level.id ? 'text-[#f1b557]' : 'text-[#9c7760]'}`}><span className="mb-2 flex gap-1">{[1, 2, 3, 4].map((dot) => <span key={dot} className={`h-2 w-2 rounded-full border border-current ${dot <= level.level ? 'bg-current' : ''}`} />)}</span><span className="font-mono-brand text-[9px] uppercase tracking-[.08em]">{level.name}</span></button>)}</div><p className="mt-5 min-h-[24px] font-mono-brand text-[10px] uppercase tracking-[.1em] text-[#f5e9d6]">{heat.copy}</p></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(-1);
  const open = (index: number) => setSelected(index);
  const close = () => setSelected(-1);
  useEffect(() => {
    if (selected < 0) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); if (event.key === 'ArrowRight') setSelected((v) => (v + 1) % galleryData.length); if (event.key === 'ArrowLeft') setSelected((v) => (v - 1 + galleryData.length) % galleryData.length); };
    window.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [selected]);
  return (
    <section className="bg-[#efe2cc] px-5 py-28 text-[#21140f] md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]"><Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div className="min-w-0"><div className="mb-5 flex items-center gap-4"><p className="font-mono-brand text-[11px] uppercase tracking-[.24em] text-[#b6382b]">03 / Good evidence</p><span aria-hidden="true" className="h-px flex-1 bg-[#b6382b]/20" /></div><h2 className="font-display text-[clamp(3.2rem,7vw,6.5rem)] uppercase leading-[.84] tracking-[-.06em]">Look at<br /><em className="bg-gradient-to-r from-[#b6382b] to-[#e8523e] bg-clip-text font-normal text-transparent">that.</em></h2></div><span className="hidden font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#765e4e] md:block">Tap to enlarge / keys work</span></Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:grid-rows-[220px_220px]">
          {galleryData.map((item, index) => <motion.button data-testid={`button-gallery-${item.id}`} key={item.id} onClick={() => open(index)} whileHover={reduced ? undefined : { y: -6 }} transition={{ duration: 0.3, ease: 'easeOut' }} className={`group relative min-h-[190px] overflow-hidden rounded-[.4rem] border border-card-border/60 text-left transition-shadow duration-300 hover:shadow-[0_30px_50px_-30px_rgba(0,0,0,.85)] md:min-h-0 ${index === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'}`}><img src={galleryImages[item.image]} alt={item.alt} className="image-shift h-full w-full object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-[#21140f]/80 via-transparent opacity-70 transition-opacity group-hover:opacity-100" /><span className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#f5e9d6]"><span className="font-display text-2xl uppercase">{item.title}</span><ArrowUpRight size={18} /></span></motion.button>)}
        </div>
        <p className="mt-6 font-mono-brand text-[9px] uppercase tracking-[.12em] text-[#9b806a]">Visuals shown are art-directed concept imagery, not verified restaurant photography.</p>
      </div>
      {selected >= 0 && <div role="dialog" aria-modal="true" aria-label={`${galleryData[selected].title} enlarged`} className="fixed inset-0 z-[80] grid place-items-center bg-[#120b08]/95 p-5" onClick={close}><button data-testid="button-close-lightbox" onClick={close} className="absolute right-5 top-5 grid h-11 w-11 place-items-center border border-white/20 text-[#f5e9d6]" aria-label="Close image"><X size={20} /></button><button data-testid="button-previous-image" onClick={(event) => { event.stopPropagation(); setSelected((v) => (v - 1 + galleryData.length) % galleryData.length); }} className="absolute left-4 grid h-11 w-11 place-items-center border border-white/20 text-[#f5e9d6] md:left-10" aria-label="Previous image"><ChevronLeft size={20} /></button><figure onClick={(event) => event.stopPropagation()} className="max-w-4xl"><img src={galleryImages[galleryData[selected].image]} alt={galleryData[selected].alt} className="max-h-[76vh] w-full object-contain" /><figcaption className="mt-4 flex justify-between gap-5 font-mono-brand text-[10px] uppercase tracking-[.12em] text-[#c7ab93]"><span>{galleryData[selected].title}</span><span>{selected + 1} / {galleryData.length}</span></figcaption></figure><button data-testid="button-next-image" onClick={(event) => { event.stopPropagation(); setSelected((v) => (v + 1) % galleryData.length); }} className="absolute right-4 grid h-11 w-11 place-items-center border border-white/20 text-[#f5e9d6] md:right-10" aria-label="Next image"><ChevronRight size={20} /></button></div>}
    </section>
  );
}

export function StorySection() {
  return <section id="story" className="border-t border-card-border bg-[#21140f] px-5 py-28 md:px-10 md:py-40"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><div className="min-w-0"><div className="flex items-center gap-4"><p className="font-mono-brand text-[11px] uppercase tracking-[.24em] text-[#f1b557]">04 / The human bit</p><span aria-hidden="true" className="h-px flex-1 bg-[#f1b557]/25 lg:hidden" /></div><p className="mt-16 hidden font-display text-[11rem] leading-none text-[#e8523e]/20 lg:block">A</p></div><Reveal><div><h2 className="max-w-[820px] font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[.85] tracking-[-.06em] text-[#f5e9d6]">{restaurantData.story.intro}<br /><span className="bg-gradient-to-r from-[#e8523e] to-[#f1b557] bg-clip-text text-transparent">That’s it.</span></h2><p className="mt-10 max-w-[560px] text-lg leading-relaxed text-[#c7ab93]">{restaurantData.story.body}</p><div className="mt-12 grid max-w-[560px] grid-cols-2 gap-5 border-t border-card-border pt-5"><span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#9c7760]">The name</span><span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#f1b557]">Ahsan Irshad</span></div></div></Reveal></div></section>;
}

export function ContactSection() {
  const has = (key: keyof typeof restaurantData.links) => Boolean(restaurantData.links[key]);
  return <section id="contact" className="bg-[#e8523e] px-5 py-28 text-[#21140f] md:px-10 md:py-40"><div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_.72fr]"><Reveal><div className="min-w-0"><div className="mb-6 flex items-center gap-4"><p className="font-mono-brand text-[11px] uppercase tracking-[.24em] text-[#57251c]">06 / Pull up</p><span aria-hidden="true" className="h-px flex-1 bg-[#57251c]/30" /></div><h2 className="max-w-[800px] font-display text-[clamp(4rem,10vw,10rem)] uppercase leading-[.75] tracking-[-.07em]">Make a<br /><em className="font-normal underline decoration-2 underline-offset-4 decoration-[#57251c]">meal of it.</em></h2><p className="mt-10 max-w-[370px] text-sm leading-relaxed text-[#57251c]">For order routes and the exact pin, use the verified links when they are added to the data module.</p></div></Reveal><div className="flex flex-col justify-end"><div className="border-t border-[#57251c]/30 py-5"><span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#57251c]">Location</span><p data-testid="text-location" className="mt-2 flex items-start gap-2 font-display text-2xl uppercase"><MapPin size={20} className="mt-1 shrink-0" />{restaurantData.location.address}</p><p data-testid="text-hours" className="mt-2 text-sm text-[#57251c]">{restaurantData.hours}</p></div><div className="border-t border-[#57251c]/30 py-5"><span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#57251c]">Call the kitchen</span><a data-testid="link-phone" href={`tel:${restaurantData.phone.replaceAll(' ', '')}`} className="mt-2 flex items-center gap-2 font-display text-2xl uppercase hover:text-[#f5e9d6]"><PhoneCall size={20} />{restaurantData.phone}</a></div><div className="flex flex-wrap gap-3 pt-3"><a data-testid="link-phone-cta" href={`tel:${restaurantData.phone.replaceAll(' ', '')}`} className="btn-primary border-[#21140f] bg-[#21140f] text-[#f5e9d6] hover:border-[#f1b557] hover:bg-[#f1b557] hover:text-[#21140f]">Call to order</a>{has('maps') && <a data-testid="link-google-maps" href={restaurantData.links.maps} target="_blank" rel="noreferrer" className="btn-secondary">Open maps</a>}{has('foodpanda') && <a data-testid="link-foodpanda" href={restaurantData.links.foodpanda} target="_blank" rel="noreferrer" className="btn-secondary">Order online</a>}</div></div></div></section>;
}

export function ReviewsSection() {
  const reduced = useReducedMotion();
  const reviewLink = restaurantData.links.maps;
  const ratingRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ratingRef, { once: true, amount: 0.5 });
  // Count up to the published rating; the stored value itself is never altered.
  const ratingText = restaurantData.rating.value;
  const ratingTarget = Number(ratingText);
  const ratingDecimals = ratingText.split('.')[1]?.length ?? 0;
  const ratingCount = useMotionValue(reduced ? ratingTarget : 0);
  const ratingDisplay = useTransform(ratingCount, (latest) => latest.toFixed(ratingDecimals));

  // Run the count-up the first time the rating scrolls into view.
  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(ratingCount, ratingTarget, { duration: 1.2, ease: 'easeOut' });
    return () => controls.stop();
  }, [inView, reduced, ratingTarget, ratingCount]);

  return <section id="reviews" className="bg-[#efe2cc] px-5 py-28 text-[#21140f] md:px-10 md:py-36"><div className="mx-auto grid max-w-[1440px] items-end gap-12 md:grid-cols-[1fr_auto]"><Reveal><div className="min-w-0"><div className="mb-5 flex items-center gap-4"><p className="font-mono-brand text-[11px] uppercase tracking-[.24em] text-[#b6382b]">05 / Public signal</p><span aria-hidden="true" className="h-px flex-1 bg-[#b6382b]/20" /></div><h2 className="max-w-[730px] font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[.82] tracking-[-.06em]">Good food<br /><em className="bg-gradient-to-r from-[#b6382b] to-[#e8523e] bg-clip-text font-normal text-transparent">gets noted.</em></h2></div></Reveal><div className="rounded-[.4rem] border border-card-border/50 bg-gradient-to-b from-[#f5e9d6]/55 to-transparent px-5 py-6 md:min-w-[330px]"><div className="flex items-center gap-3"><Star size={28} fill="currentColor" className="text-[#b6382b]" /><motion.span ref={ratingRef} data-testid="text-public-rating" className="font-display text-5xl">{ratingDisplay}</motion.span><span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#765e4e]">/ 5</span></div><p data-testid="text-review-count" className="mt-3 font-mono-brand text-[11px] uppercase tracking-[.16em] text-[#b6382b]">{restaurantData.rating.reviewCount}</p>{reviewLink && <a data-testid="link-google-reviews" href={reviewLink} target="_blank" rel="noreferrer" className="btn-secondary mt-6">View Google reviews <ArrowUpRight size={14} /></a>}</div></div></section>;
}

export function Footer() {
  const links = restaurantData.links;
  return <footer className="bg-[#21140f] px-5 pb-10 pt-20 text-[#f5e9d6] md:px-10"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-10 border-b border-card-border pb-20 md:flex-row"><div><div className="font-display text-5xl uppercase leading-[.8]">The Guy<br /><span className="text-[#e8523e]">Who Cooks.</span></div><p className="mt-6 font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#9c7760]">{restaurantData.phrase}</p></div><div className="flex max-w-[350px] flex-wrap content-start gap-x-6 gap-y-4">{links.youtube && <a data-testid="link-youtube" href={links.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] hover:text-[#f1b557]"><Youtube size={15} /> YouTube</a>}{links.instagram && <a data-testid="link-instagram" href={links.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] hover:text-[#f1b557]"><Instagram size={15} /> Instagram</a>}{links.facebook && <a data-testid="link-facebook" href={links.facebook} target="_blank" rel="noreferrer" className="font-mono-brand text-[10px] uppercase tracking-[.14em] hover:text-[#f1b557]">Facebook</a>}<span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#9c7760]">Islamabad, Pakistan</span></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[.14em] text-[#9c7760] sm:flex-row"><span>© {new Date().getFullYear()} The Guy Who Cooks</span><span>Made for messy hands and big appetites.</span></div></div></footer>;
}

export function Marquee() {
  return <div className="overflow-hidden border-b border-[#21140f]/20 bg-[#f1b557] py-3 text-[#21140f]"><div className="flex w-max animate-[marquee_20s_linear_infinite] gap-8 font-mono-brand text-[10px] uppercase tracking-[.24em]"><span>NO BEEF. NO LIFE.</span><span>•</span><span>BURGERS / CHICKEN / FRIES</span><span>•</span><span>NO BEEF. NO LIFE.</span><span>•</span><span>BURGERS / CHICKEN / FRIES</span><span>•</span><span>NO BEEF. NO LIFE.</span><span>•</span></div></div>;
}

export function SocialStrip() {
  return <section className="bg-[#332018] px-5 py-24 text-[#f5e9d6] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-[1fr_auto] md:items-center"><Reveal><div className="min-w-0"><div className="mb-4 flex items-center gap-4"><p className="font-mono-brand text-[11px] uppercase tracking-[.24em] text-[#e8523e]">Kitchen transmissions</p><span aria-hidden="true" className="h-px flex-1 bg-[#e8523e]/25" /></div><h2 className="font-display text-4xl uppercase">Follow the appetite.</h2></div></Reveal><div className="flex flex-wrap gap-3">{restaurantData.links.youtube && <a data-testid="link-social-youtube" href={restaurantData.links.youtube} target="_blank" rel="noreferrer" className="btn-secondary"><Play size={14} /> YouTube</a>}</div></div></section>;
}