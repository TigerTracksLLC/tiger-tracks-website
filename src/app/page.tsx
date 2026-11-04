'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, MotionConfig, useInView, animate, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { STATS } from '@/lib/stats';

/* ================================================================
   HOMEPAGE (Nov 2026 redesign, v5: calm rhythm)
   Varied rhythm: split hero with video, moving client marquee,
   bento results with one orange tile, interactive capabilities,
   full-bleed quote band, alternating case studies, 100-day plan
   timeline, featured research and a full-bleed close.
   Calm colour rhythm: Ink throughout, two Paper sections
   (capabilities, research) for light/dark contrast, and orange used
   for two moments only (the results tile and the closing band).
   One container (max-w-7xl px-6) aligned with the nav and footer.
   Brand: Work Sans headlines, Inter body, DM Sans labels, Ink
   surfaces, orange for CTAs and key numbers.
   Every figure comes from src/lib/stats.ts or an existing case study.
   ================================================================ */

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const WRAP = 'mx-auto w-full max-w-7xl px-6';
const SECTION = 'py-20 lg:py-28';

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up the numeric part of a figure like "2,954%", "+51%" or "#123" when it scrolls into view. */
function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : 0;
  const suffix = match ? match[3] : '';
  const useComma = match ? match[2].includes(',') : false;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, { duration: 1.6, ease: EASE, onUpdate: (v) => setDisplay(v) });
    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span className={className}>{value}</span>;
  const n = Math.round(display);
  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {prefix}
      {useComma ? n.toLocaleString('en-US') : n}
      {suffix}
    </span>
  );
}

function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Section label. On tinted panels orange small text fails AA, so the label turns paper with an orange rule. */
function Label({ children, className = '', panel = false, light = false }: { children: ReactNode; className?: string; panel?: boolean; light?: boolean }) {
  if (light) {
    return (
      <p className={`flex items-center gap-3 font-eyebrow text-sm font-medium text-tt-ink ${className}`}>
        <span className="h-0.5 w-6 bg-tt-orange" aria-hidden="true" />
        {children}
      </p>
    );
  }
  if (panel) {
    return (
      <p className={`flex items-center gap-3 font-eyebrow text-sm font-medium text-tt-paper ${className}`}>
        <span className="h-px w-6 bg-tt-orange" aria-hidden="true" />
        {children}
      </p>
    );
  }
  return <p className={`font-eyebrow text-sm font-medium text-tt-orange ${className}`}>{children}</p>;
}

function H2({ children, className = '', light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return <h2 className={`font-display text-4xl font-bold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem] ${light ? 'text-tt-ink' : 'text-white'} ${className}`}>{children}</h2>;
}

function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex shrink-0 items-center gap-2 text-sm font-semibold underline-offset-4 transition-colors ${light ? 'text-tt-ink hover:underline' : 'text-white hover:text-tt-orange'}`}>
      {children}
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

const CARD = 'rounded-2xl border border-white/10 bg-tt-gray-800/40';

/* ---------------------------------------------------------------- */
/*  SXSW VIDEO (poster with play button, loads the player on click)  */
/* ---------------------------------------------------------------- */

function SxswVideo({ priority = false }: { priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <video controls autoPlay playsInline className="aspect-video w-full bg-tt-ink object-cover">
        <source src="/cliffypt2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-tt-ink"
      aria-label="Play the SXSW video"
    >
      <Image src="/cliff-sxsw-ag1-poster.jpg" alt="" fill priority={priority} sizes="(min-width: 1024px) 640px, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" />
      <span className="absolute inset-0 bg-tt-ink/25 transition-colors group-hover:bg-tt-ink/10" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-tt-orange transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        <svg className="relative ml-1 h-7 w-7 text-tt-ink" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  );
}

/* ---------------------------------------------------------------- */
/*  1. HERO                                                          */
/* ---------------------------------------------------------------- */

const HERO_STATS = [
  { value: STATS.revenueGrowth, label: 'Three-year revenue growth' },
  { value: STATS.incRank, label: 'Inc. 5000, 2025' },
  { value: STATS.teamSize, label: 'Specialists, fully remote' },
  { value: String(STATS.foundingYear), label: 'Founded' },
] as const;

function Hero() {
  return (
    <section className="relative overflow-hidden bg-tt-ink pt-32 lg:pt-40">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-14 lg:grid-cols-12`}>
        <motion.div
          className="min-w-0 lg:col-span-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-1.5 font-eyebrow text-xs font-medium text-tt-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-tt-orange" aria-hidden="true" />
            <span>Performance marketing, founded by <span className="whitespace-nowrap">ex-Google</span> leaders</span>
          </p>
          <h1 className="mt-8 font-display text-[2.9rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl xl:text-[4.6rem]">
            Most agencies provide activity. <span className="text-tt-orange">We provide evidence.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-tt-gray-200 sm:text-xl">
            Paid media, search, creative, CRO and measurement run as one team, reported against the numbers your
            board watches.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/get-started" className="btn-primary">
              Request a Strategic Diagnostic
            </Link>
            <TextLink href="/results">See client results</TextLink>
          </div>
        </motion.div>

        <motion.div
          className="relative min-w-0 lg:col-span-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-tt-ink">
            <SxswVideo priority />
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <p className="text-sm text-white">
                <span className="font-semibold">On stage at SXSW</span>
                <span className="text-tt-gray-300"> with AG1</span>
              </p>
              <span className="font-eyebrow text-xs text-tt-gray-300">0:54</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={`${WRAP} mt-20 lg:mt-28`}>
        <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 ${i % 2 === 1 ? 'border-l border-white/10 pl-6' : ''} ${i === 2 ? 'lg:border-l lg:border-white/10' : ''} ${i >= 1 ? 'lg:pl-8' : ''}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
                <CountUp value={s.value} />
              </dd>
              <dd className="mt-2 text-sm text-tt-gray-300">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  2. CLIENT MARQUEE                                                */
/* ---------------------------------------------------------------- */

const CLIENTS = ['AG1', 'Anastasia Beverly Hills', 'Monarch Money', 'Rho Nutrition', 'Aura Health', 'Lightyear', 'Capezio', 'Dovetail'];

function ClientMarquee() {
  const row = (hidden: boolean) =>
    CLIENTS.map((c) => (
      <li key={`${hidden ? 'b' : 'a'}-${c}`} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12">
        <span className="whitespace-nowrap font-eyebrow text-sm uppercase tracking-[0.22em] text-tt-gray-300">{c}</span>
        <span className="h-1 w-1 rounded-full bg-tt-orange" aria-hidden="true" />
      </li>
    ));
  return (
    <section className="border-y border-white/10 bg-tt-ink py-6" aria-label="Brands we have grown">
      <div className="relative overflow-hidden">
        <ul className="flex w-max animate-logo-scroll items-center gap-12 pr-12 motion-reduce:animate-none" style={{ animationDuration: '70s' }}>
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  3. RESULTS BENTO                                                 */
/* ---------------------------------------------------------------- */

function ResultsBento() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label>The evidence</Label>
            <H2 className="mt-4">Results that hold up in the boardroom.</H2>
          </div>
          <p className="text-lg font-light leading-relaxed text-tt-gray-300 lg:col-span-5">
            Reported against revenue and the numbers your board watches, not impressions. Client figures are results
            from individual engagements, not portfolio averages.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="flex h-full min-h-[16rem] flex-col justify-between rounded-2xl bg-tt-orange md:min-h-[22rem] p-8 lg:p-10">
              <p className="font-eyebrow text-sm font-medium text-tt-ink">Tiger Tracks, Inc. 5000 {STATS.incRank}</p>
              <div>
                <p className="font-display text-7xl font-bold leading-none tracking-[-0.045em] text-tt-ink sm:text-8xl lg:text-[8.5rem]">
                  <CountUp value={STATS.revenueGrowth} />
                </p>
                <p className="mt-4 max-w-xs text-lg font-medium text-tt-ink">Three-year revenue growth, ranked on the 2025 Inc. 5000.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="md:col-span-1">
            <Link href="/results/ag1-meta" className="group relative flex h-full min-h-[13rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-6">
              <Image src="/images/media-buying-dashboard-brand.png" alt="" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-tt-ink/70" aria-hidden="true" />
              <span className="relative">
                <span className="block font-display text-5xl font-bold tracking-[-0.04em] text-white"><CountUp value="+51%" /></span>
                <span className="mt-1 block text-sm text-tt-gray-100">Customers year over year</span>
                <span className="mt-3 block font-eyebrow text-xs text-tt-gray-200">AG1</span>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-1">
            <Link href="/results/monarch-money" className={`group flex h-full min-h-[13rem] flex-col justify-end ${CARD} p-6 transition-colors hover:border-white/25`}>
              <span className="block font-display text-5xl font-bold tracking-[-0.04em] text-white"><CountUp value={STATS.monarch.usersGrowth} /></span>
              <span className="mt-1 block text-sm text-tt-gray-100">Users</span>
              <span className="mt-3 block font-eyebrow text-xs text-tt-gray-200">Monarch Money, then a {STATS.monarch.seriesB} Series B</span>
            </Link>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <Link href="/results/national-broadband-provider" className={`group flex h-full flex-col justify-center ${CARD} p-6 transition-colors hover:border-white/25 lg:p-7`}>
              <span className="flex items-center justify-between gap-4">
                <span className="font-eyebrow text-xs text-tt-gray-200">National broadband provider, six months</span>
                <Arrow className="h-4 w-4 text-tt-gray-300 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
                {[
                  { v: STATS.broadband.cvrLift, l: 'Conversion rate' },
                  { v: STATS.broadband.purchases, l: 'Purchases' },
                  { v: STATS.broadband.revenue, l: 'Revenue' },
                  { v: STATS.broadband.rankingPositions, l: 'Google rank positions' },
                ].map((m) => (
                  <span key={m.l} className="block">
                    <span className="block font-display text-3xl font-bold tracking-[-0.03em] text-white"><CountUp value={m.v} /></span>
                    <span className="mt-1 block text-xs text-tt-gray-200">{m.l}</span>
                  </span>
                ))}
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  4. CAPABILITIES (interactive)                                    */
/* ---------------------------------------------------------------- */

const CAPABILITIES = [
  { name: 'Demand Gen', line: 'Paid search to retail media, one accountable growth engine.', tags: ['Paid Search', 'Paid Social', 'Programmatic', 'Retail'], href: '/capabilities#media-buying', image: '/images/precision-targeting-ui-brand.png' },
  { name: 'Creative', line: 'From content strategy to influencer programs, creative that answers to revenue.', tags: ['Content Strategy', 'Production', 'UGC', 'Influencer'], href: '/capabilities#creative', image: '/images/creative-ugc-phone-mockup-brand.png' },
  { name: 'CRO', line: 'Conversion rate lifts that compound wave over wave.', tags: ['Website Design & Development', 'A/B Testing'], href: '/capabilities#website-cro', image: '/images/cro-optimization-ui-brand.png' },
  { name: 'Analytics', line: 'The measurement layer boards and CFOs can act on.', tags: ['MMM', 'Attribution', 'Reporting', 'Data Architecture'], href: '/capabilities#analytics', image: '/images/full-funnel-automation-ui-brand.png' },
  { name: 'Organic', line: 'Social, SEO, GEO/AEO and ASO built for how customers search now.', tags: ['Social', 'SEO', 'GEO/AEO', 'ASO'], href: '/capabilities#organic-growth', image: '/images/geo-aeo-command-ui-brand.png' },
  { name: 'Lifecycle', line: 'Email, SMS, CRM and personalization that grow LTV without touching the media budget.', tags: ['Email & SMS', 'CRM', 'Personalization'], href: '/capabilities#lifecycle', image: '/images/lifecycle-journey-visualization-brand.png' },
] as const;

function Capabilities() {
  const [active, setActive] = useState(0);
  const cap = CAPABILITIES[active];
  return (
    <section className={`bg-tt-paper ${SECTION}`}>
      <div className={WRAP}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Label light>Capabilities</Label>
            <H2 light className="mt-4">One team across every lever that moves revenue.</H2>
          </div>
          <TextLink light href="/capabilities">All capabilities</TextLink>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5" role="tablist" aria-label="Capabilities">
            {CAPABILITIES.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-5 border-t border-tt-ink/15 py-5 text-left last:border-b"
                >
                  <span className={`font-eyebrow text-xs tabular-nums ${on ? 'text-tt-ink' : 'text-tt-gray-700'}`}>0{i + 1}</span>
                  <span className={`flex-1 font-display text-2xl font-bold tracking-[-0.02em] transition-colors sm:text-3xl ${on ? 'text-tt-ink' : 'text-tt-gray-700 group-hover:text-tt-ink'}`}>{c.name}</span>
                  <Arrow className={`h-5 w-5 transition-all duration-300 ${on ? 'translate-x-0 text-tt-orange opacity-100' : '-translate-x-2 text-tt-gray-700 opacity-0'}`} />
                </button>
              );
            })}
          </div>

          <div className="min-w-0 lg:col-span-7" role="tabpanel">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-tt-ink">
              <div className="relative aspect-[16/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cap.image}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <Image src={cap.image} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="p-7 lg:p-8">
                <p className="font-display text-2xl font-bold text-white">{cap.name}</p>
                <p className="mt-3 text-base font-light leading-relaxed text-tt-gray-200">{cap.line}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-tt-gray-200">{t}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <TextLink href={cap.href}>Explore {cap.name}</TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  5. QUOTE BAND (full bleed)                                       */
/* ---------------------------------------------------------------- */

function QuoteBand() {
  return (
    <section className="relative overflow-hidden">
      <Image src="/images/agency-strategy-abstract-brand.png" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-tt-ink/85" aria-hidden="true" />
      <div className={`${WRAP} relative py-24 lg:py-32`}>
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="block font-display text-7xl font-bold leading-none text-tt-orange" aria-hidden="true">&ldquo;</span>
          <blockquote>
            <p className="mt-2 font-display text-3xl font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.75rem]">
              Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply specialized
              knowledge of ad platforms with a relentless focus on hitting growth goals.
            </p>
            <footer className="mt-10 flex items-center justify-center gap-4">
              <span className="relative block h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-white/20 bg-tt-ink">
                <Image src="/images/AG1_(company)_logo.png" alt="AG1" fill className="object-contain p-2" sizes="64px" />
              </span>
              <span className="text-left">
                <span className="block text-base font-semibold text-white">Jason Marshall</span>
                <span className="block text-sm text-tt-gray-200">Chief Growth Officer, AG1</span>
              </span>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  6. CASE STUDIES (alternating rows)                               */
/* ---------------------------------------------------------------- */

const WORK = [
  {
    slug: 'ag1-meta',
    client: 'AG1',
    sector: 'DTC, multi-channel',
    metric: '+51%',
    metricLabel: 'Customers year over year',
    summary: 'Restructured Meta campaigns to drive compounding acquisition growth across channels.',
    image: '/images/case-study-product-viz-brand.png',
    accent: 'text-tt-orange',
  },
  {
    slug: 'national-broadband-provider',
    client: 'National broadband provider',
    sector: 'Broadband and telecom',
    metric: STATS.broadband.cvrLift,
    metricLabel: 'Website conversion rate',
    summary: `Purchases up ${STATS.broadband.purchases.replace('+', '')} and revenue up ${STATS.broadband.revenue.replace('+', '')}, from two test markets to the national footprint in six months.`,
    image: '/images/conversion-optimization-abstract-brand.png',
    accent: 'text-tt-orange',
  },
  {
    slug: 'monarch-money',
    client: 'Monarch Money',
    sector: 'Fintech',
    metric: STATS.monarch.usersGrowth,
    metricLabel: 'Users',
    summary: `Growth with unit economics that held under investor scrutiny. Monarch went on to raise a ${STATS.monarch.seriesB} Series B.`,
    image: '/images/scatter-plot-data-viz-brand.png',
    accent: 'text-tt-orange',
  },
] as const;

function CaseStudies() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Label>Client results</Label>
            <H2 className="mt-4">Proof, not promises.</H2>
          </div>
          <TextLink href="/results">View all results</TextLink>
        </div>

        <div className="mt-14 space-y-6">
          {WORK.map((w, i) => (
            <Reveal key={w.slug}>
              <Link href={`/results/${w.slug}`} className={`group grid grid-cols-1 overflow-hidden ${CARD} transition-colors duration-300 hover:border-tt-orange/60 md:grid-cols-12`}>
                <div className={`relative min-h-[15rem] md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image src={w.image} alt="" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col justify-center p-8 md:col-span-5 lg:p-12">
                  <p className="font-eyebrow text-xs text-tt-gray-200">{w.sector}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">{w.client}</h3>
                  <p className={`mt-6 font-display text-6xl font-bold leading-none tracking-[-0.04em] lg:text-7xl ${w.accent}`}>
                    <CountUp value={w.metric} />
                  </p>
                  <p className="mt-2 text-sm text-tt-gray-200">{w.metricLabel}</p>
                  <p className="mt-5 text-base font-light leading-relaxed text-tt-gray-200">{w.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 group-hover:underline">
                    Read the case study <Arrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  7. PE / VC: 100-DAY PLAN                                         */
/* ---------------------------------------------------------------- */

const PLAN = [
  { when: 'Week 1-2', what: 'Strategic Diagnostic and forensics' },
  { when: 'Week 3-4', what: 'Strategy and quick wins deployed' },
  { when: 'Month 2-3', what: 'Full-funnel execution at scale' },
] as const;

function PortfolioPlan() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <Reveal className="overflow-hidden rounded-3xl border border-tt-teal/40 bg-tt-gray-800/40">
          <div className="grid grid-cols-1 gap-12 p-8 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:p-14">
            <div className="lg:col-span-5">
              <p className="font-eyebrow text-sm font-medium text-tt-teal">For PE and VC funds</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl">
                Operators for your portfolio, from first call to fund-level reporting.
              </h2>
              <p className="mt-5 text-base font-light leading-relaxed text-tt-gray-200">
                Strategic Diagnostics, proprietary AI tooling and a team built at Google, deployed on your timeline.
              </p>
              <div className="mt-8">
                <TextLink href="/pe-vc">Fund partnerships</TextLink>
              </div>
            </div>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7 lg:self-center">
              {PLAN.map((p, i) => (
                <li key={p.when} className="flex h-full flex-col rounded-2xl border border-white/10 bg-tt-ink p-6">
                  <span className="font-display text-4xl font-bold leading-none text-tt-teal">0{i + 1}</span>
                  <span className="mt-6 font-eyebrow text-sm text-tt-gray-200">{p.when}</span>
                  <span className="mt-2 font-display text-lg font-bold leading-snug text-white">{p.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  8. LEADERSHIP + TECHNOLOGY + TRUST                               */
/* ---------------------------------------------------------------- */

const LEADERS = [
  { name: 'Cliff Simmons', initials: 'CS', role: 'CEO and Co-Founder', note: 'Ex-Google. Former Chief Growth Officer, Ready.' },
  { name: 'Adam Potashnick', initials: 'AP', role: 'President', note: 'Ex-Brainlabs. Agency growth and operations.' },
] as const;

function LeadershipAndTech() {
  return (
    <section className={`bg-tt-ink ${SECTION} pt-0 lg:pt-0`}>
      <div className={`${WRAP} grid grid-cols-1 gap-5 lg:grid-cols-3`}>
        <Reveal>
          <div className={`flex h-full flex-col ${CARD} p-8`}>
            <Label panel>Leadership</Label>
            <p className="mt-4 font-display text-2xl font-bold leading-snug text-white">Built at Google. Run by operators.</p>
            <ul className="mt-8 flex-1 space-y-6">
              {LEADERS.map((l) => (
                <li key={l.name} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tt-orange font-display text-sm font-bold text-tt-ink" aria-hidden="true">
                    {l.initials}
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{l.name}</span>
                    <span className="block text-sm text-tt-gray-200">{l.role}</span>
                    <span className="mt-1 block text-sm font-light text-tt-gray-300">{l.note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink href="/company">Meet the company</TextLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Link href="/wayfinder" className={`group flex h-full flex-col overflow-hidden ${CARD} transition-colors hover:border-tt-orange/60`}>
            <div className="relative aspect-[16/10]">
              <Image src="/images/wayfinder-ai-dashboard-brand.png" alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <p className="font-eyebrow text-sm font-medium text-tt-gray-100">Proprietary technology</p>
              <p className="mt-4 flex-1 font-display text-2xl font-bold leading-snug text-white">Other agencies use your tools. We built our own.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 group-hover:underline">See Wayfinder AI <Arrow /></span>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Link href="/trust" className={`group flex h-full flex-col overflow-hidden ${CARD} transition-colors hover:border-tt-orange/60`}>
            <div className="relative aspect-[16/10]">
              <Image src="/images/network-connection-map-brand.png" alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <p className="font-eyebrow text-sm font-medium text-tt-gray-100">Your accounts, your data</p>
              <p className="mt-4 flex-1 font-display text-2xl font-bold leading-snug text-white">Everything we build stays yours from day one.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 group-hover:underline">How we handle access <Arrow /></span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  9. RESEARCH (featured + list)                                    */
/* ---------------------------------------------------------------- */

const ARTICLES = [
  {
    category: 'AI and automation',
    title: 'Beyond the Chatbox: The No-Shame Guide to the Agentic AI Era of 2026',
    readTime: '12 min read',
    slug: 'beyond-the-chatbox-the-no-shame-guide-to-the-agentic-ai-era-of-2026',
    image: '/images/ai-automation-abstract-brand.png',
  },
  {
    category: 'Platform strategy',
    title: 'GEO Is the New SEO: Why Generative Engine Optimization Is Not Optional in 2026',
    readTime: '10 min read',
    slug: 'geo-is-the-new-seo-why-generative-engine-optimization-is-not-optional-in-2026',
    image: '/images/seo-organic-discovery-brand.png',
  },
  {
    category: 'Measurement',
    title: 'MMM vs. MTA: The Measurement Debate That Determines Where Your Budget Goes',
    readTime: '5 min read',
    slug: 'mmm-vs-mta-the-measurement-debate-that-determines-where-your-budget-goes',
    image: '/images/seo-content-dashboard-brand.png',
  },
] as const;

function Research() {
  const [lead, ...rest] = ARTICLES;
  return (
    <section className={`bg-tt-paper ${SECTION}`}>
      <div className={WRAP}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Label light>Eye of the Tiger</Label>
            <H2 light className="mt-4">Research from our team.</H2>
          </div>
          <TextLink light href="/intelligence">All research</TextLink>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <Link href={`/intelligence/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-6 font-eyebrow text-xs font-medium text-tt-ink">
                {lead.category} <span className="text-tt-gray-700">&middot; {lead.readTime}</span>
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-tt-ink underline-offset-4 decoration-tt-ink decoration-2 group-hover:underline sm:text-3xl">{lead.title}</h3>
            </Link>
          </Reveal>
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-5">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={0.05 * (i + 1)}>
                <Link href={`/intelligence/${a.slug}`} className="group grid grid-cols-5 items-center gap-5">
                  <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={a.image} alt="" fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  </div>
                  <div className="col-span-3">
                    <p className="font-eyebrow text-xs font-medium text-tt-ink">
                      {a.category} <span className="text-tt-gray-700">&middot; {a.readTime}</span>
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-tt-ink underline-offset-4 decoration-tt-ink decoration-2 group-hover:underline">{a.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  10. CLOSING (full bleed)                                         */
/* ---------------------------------------------------------------- */

function Closing() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-tt-orange)]">
      <div className={`${WRAP} py-24 text-center lg:py-32`}>
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-tt-ink sm:text-6xl lg:text-[5.5rem]">
            Your revenue is leaking. <span className="text-white">We&rsquo;ll find where.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-tt-ink sm:text-xl">
            Start with a free Strategic Diagnostic: a 90-day roadmap built around your actual numbers across paid,
            organic, creative and attribution.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/get-started" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-tt-ink px-7 py-4 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:px-9 sm:text-lg">
              Request a Strategic Diagnostic <Arrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-tt-ink">
        <Hero />
        <ClientMarquee />
        <ResultsBento />
        <Capabilities />
        <QuoteBand />
        <CaseStudies />
        <PortfolioPlan />
        <LeadershipAndTech />
        <Research />
        <Closing />
      </div>
    </MotionConfig>
  );
}
