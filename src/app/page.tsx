'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { STATS } from '@/lib/stats';

/* ================================================================
   HOMEPAGE (Nov 2026 redesign)
   Editorial, studio-style layout: oversized Work Sans headlines,
   Inter Light body, DM Sans labels, Ink surfaces, orange as accent only.
   Every figure comes from src/lib/stats.ts or an existing case study.
   ================================================================ */

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** The four-colour brand stripe (orange, teal, lime, paper). */
function BrandStripe({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-1.5 w-full ${className}`} aria-hidden="true">
      <span className="flex-1 bg-tt-orange" />
      <span className="flex-1 bg-tt-teal" />
      <span className="flex-1 bg-tt-lime" />
      <span className="flex-1 bg-tt-paper" />
    </div>
  );
}

function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="font-eyebrow text-sm font-medium text-tt-orange flex items-baseline gap-3">
      {index && <span className="text-tt-gray-500 tabular-nums">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WRAP = 'mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16';

/* ---------------------------------------------------------------- */
/*  1. HERO                                                          */
/* ---------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col bg-tt-ink pt-28 sm:pt-32">
      <div className={`${WRAP} flex flex-1 flex-col`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-5"
        >
          <p className="font-eyebrow text-sm text-tt-gray-300">Performance marketing, built by ex-Google leaders</p>
          <p className="font-eyebrow text-sm text-tt-gray-300">
            <span className="text-tt-orange">Inc. 5000 {STATS.incRank}</span>
            <span className="mx-3 text-tt-gray-700">/</span>
            Fully remote, New York based
          </p>
        </motion.div>

        <div className="flex flex-1 flex-col justify-center py-14 lg:py-20">
          <h1 className="font-display font-bold text-white text-[clamp(3rem,7.6vw,8.75rem)] leading-[0.92] tracking-[-0.045em]">
            {['Most agencies', 'provide activity.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block text-tt-orange"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              >
                We provide evidence.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-6 xl:col-span-5">
              <p className="text-lg font-light leading-relaxed text-tt-gray-200 sm:text-xl">
                Paid media, search, creative, CRO and measurement run as one team, reported
                against the numbers your board watches.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/get-started" className="btn-primary">
                  Request a Strategic Diagnostic
                </Link>
                <Link
                  href="/results"
                  className="group inline-flex items-center gap-2 px-2 py-3 text-base font-semibold text-white"
                >
                  <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-tt-orange">See the results</span>
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:text-right">
              <p className="font-eyebrow text-sm text-tt-gray-400">Trusted by growth leaders at</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-3xl">
                AG1, Monarch Money, Anastasia Beverly Hills
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <BrandStripe />
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  2. CLIENT MARQUEE                                                */
/* ---------------------------------------------------------------- */

const CLIENTS = ['AG1', 'Anastasia Beverly Hills', 'Monarch Money', 'Rho Nutrition', 'Aura Health', 'Lightyear', 'Capezio', 'Dovetail'];
const GOOGLE_ERA = ['AT&T', 'Verizon', 'Under Armour', 'Snapchat'];

function ClientMarquee() {
  const row = (hidden: boolean) =>
    CLIENTS.map((c) => (
      <li key={`${hidden ? 'b' : 'a'}-${c}`} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14">
        <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-tt-gray-300 sm:text-5xl">{c}</span>
        <span className="h-2 w-2 rounded-full bg-tt-orange" aria-hidden="true" />
      </li>
    ));

  return (
    <section className="bg-tt-ink py-20 sm:py-24" aria-label="Clients">
      <div className={WRAP}>
        <Eyebrow>Brands we&rsquo;ve grown</Eyebrow>
      </div>
      <div className="relative mt-10 overflow-hidden motion-reduce:overflow-x-auto">
        <ul className="flex w-max animate-logo-scroll items-center gap-14 pr-14 motion-reduce:animate-none" style={{ animationDuration: '45s' }}>
          {row(false)}
          {row(true)}
        </ul>
      </div>
      <div className={`${WRAP} mt-12`}>
        <p className="font-eyebrow text-sm text-tt-gray-500">
          Founders&rsquo; work at Google, before Tiger Tracks: {GOOGLE_ERA.join(', ')}
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  3. THE EVIDENCE (numbers index)                                  */
/* ---------------------------------------------------------------- */

const EVIDENCE = [
  { value: STATS.revenueGrowth, label: 'Three-year revenue growth', source: 'Tiger Tracks, Inc. 5000 2025', href: '/company' },
  { value: '+51%', label: 'Customers, year over year', source: 'AG1', href: '/results/ag1-meta' },
  { value: STATS.monarch.usersGrowth, label: 'Users, with unit economics that held', source: 'Monarch Money', href: '/results/monarch-money' },
  { value: STATS.broadband.cvrLift, label: 'Website conversion rate', source: 'National broadband provider', href: '/results/national-broadband-provider' },
] as const;

function Evidence() {
  return (
    <section className="bg-tt-ink pb-24 pt-8 sm:pb-32">
      <div className={WRAP}>
        <div className="grid gap-8 border-t border-white/10 pt-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="01">The evidence</Eyebrow>
          </div>
          <Reveal className="lg:col-span-8">
            <h2 className="font-display font-bold text-white text-[clamp(2.5rem,5.2vw,5rem)] leading-[1] tracking-[-0.035em]">
              Numbers a CFO can check.
            </h2>
          </Reveal>
        </div>

        <ol className="mt-16">
          {EVIDENCE.map((e, i) => (
            <li key={e.label} className="border-t border-white/10 last:border-b">
              <Link href={e.href} className="group grid items-end gap-4 py-8 sm:py-10 lg:grid-cols-12">
                <span className="font-eyebrow text-sm text-tt-gray-500 tabular-nums lg:col-span-1 lg:self-start lg:pt-4">0{i + 1}</span>
                <Reveal delay={i * 0.05} className="lg:col-span-6">
                  <span className="block font-display font-bold text-white text-[clamp(4rem,11vw,10rem)] leading-[0.85] tracking-[-0.05em] tabular-nums transition-colors duration-500 group-hover:text-tt-orange">
                    {e.value}
                  </span>
                </Reveal>
                <span className="lg:col-span-4 lg:pb-3">
                  <span className="block text-xl font-light text-tt-gray-100 sm:text-2xl">{e.label}</span>
                  <span className="mt-2 block font-eyebrow text-sm text-tt-gray-400">{e.source}</span>
                </span>
                <span className="hidden justify-end text-tt-gray-500 transition-colors group-hover:text-tt-orange lg:col-span-1 lg:flex lg:pb-4">
                  <Arrow className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-eyebrow text-xs text-tt-gray-500">
          Client figures are results from individual engagements, not portfolio averages.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  4. CLIENT VOICE                                                  */
/* ---------------------------------------------------------------- */

function ClientVoice() {
  return (
    <section className="bg-tt-gray-800 py-24 sm:py-36">
      <div className={WRAP}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="02">Client voice</Eyebrow>
          </div>
          <Reveal className="lg:col-span-9">
            <blockquote>
              <p className="font-display font-semibold text-white text-[clamp(2rem,4.4vw,4.25rem)] leading-[1.08] tracking-[-0.03em]">
                <span className="text-tt-orange">&ldquo;</span>Partnering with Tiger Tracks has been amazing. They work fast, execute
                flawlessly and apply specialized knowledge of ad platforms with a relentless focus on
                hitting growth goals.<span className="text-tt-orange">&rdquo;</span>
              </p>
              <footer className="mt-12 flex items-center gap-5">
                <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-md border border-white/15 bg-tt-ink">
                  <Image src="/images/AG1_(company)_logo.png" alt="AG1" fill className="object-contain p-2.5" sizes="80px" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-white">Jason Marshall</span>
                  <span className="block font-eyebrow text-sm text-tt-gray-300">Chief Growth Officer, AG1</span>
                </span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  5. CAPABILITIES (numbered index)                                 */
/* ---------------------------------------------------------------- */

const CAPABILITIES = [
  { name: 'Demand Gen', line: 'Paid search to retail media, one accountable growth engine.', href: '/capabilities#media-buying' },
  { name: 'Creative', line: 'From content strategy to influencer programs, creative that answers to revenue.', href: '/capabilities#creative' },
  { name: 'CRO', line: 'Conversion rate lifts that compound wave over wave.', href: '/capabilities#website-cro' },
  { name: 'Analytics', line: 'The measurement layer boards and CFOs can act on.', href: '/capabilities#analytics' },
  { name: 'Organic', line: 'Social, SEO, GEO/AEO and ASO built for how customers search now.', href: '/capabilities#organic-growth' },
  { name: 'Lifecycle', line: 'Email, SMS, CRM and personalization that grow LTV without touching the media budget.', href: '/capabilities#lifecycle' },
] as const;

function Capabilities() {
  return (
    <section className="bg-tt-ink py-24 sm:py-32">
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="03">Capabilities</Eyebrow>
          </div>
          <Reveal className="lg:col-span-8">
            <h2 className="font-display font-bold text-white text-[clamp(2.5rem,5.2vw,5rem)] leading-[1] tracking-[-0.035em]">
              One team. Every lever that moves revenue.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 sm:mt-20">
          {CAPABILITIES.map((c, i) => (
            <li key={c.name} className="border-t border-white/10 last:border-b">
              <Link href={c.href} className="group grid items-baseline gap-3 py-7 sm:py-9 lg:grid-cols-12">
                <span className="font-eyebrow text-sm text-tt-gray-500 tabular-nums lg:col-span-1">0{i + 1}</span>
                <span className="font-display font-bold text-white text-[clamp(2.25rem,5vw,4.75rem)] leading-none tracking-[-0.035em] transition-all duration-500 group-hover:translate-x-2 group-hover:text-tt-orange lg:col-span-5">
                  {c.name}
                </span>
                <span className="text-base font-light leading-relaxed text-tt-gray-300 sm:text-lg lg:col-span-5">{c.line}</span>
                <span className="hidden justify-end text-tt-gray-500 transition-colors group-hover:text-tt-orange lg:col-span-1 lg:flex">
                  <Arrow className="h-6 w-6" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  6. SELECTED WORK                                                 */
/* ---------------------------------------------------------------- */

const WORK = [
  {
    slug: 'ag1-meta',
    client: 'AG1',
    sector: 'DTC, multi-channel',
    metric: '+51%',
    metricLabel: 'Customers year over year',
    summary: 'Restructured Meta campaigns to drive compounding acquisition growth across channels.',
    image: '/images/media-buying-dashboard-brand.png',
  },
  {
    slug: 'national-broadband-provider',
    client: 'National broadband provider',
    sector: 'Broadband and telecom',
    metric: STATS.broadband.cvrLift,
    metricLabel: 'Website conversion rate',
    summary: `Purchases up ${STATS.broadband.purchases.replace('+', '')}, revenue up ${STATS.broadband.revenue.replace('+', '')}, from two test markets to the national footprint in six months.`,
    image: '/images/conversion-optimization-abstract-brand.png',
  },
  {
    slug: 'monarch-money',
    client: 'Monarch Money',
    sector: 'Fintech',
    metric: STATS.monarch.usersGrowth,
    metricLabel: 'Users',
    summary: `Growth with unit economics that held under investor scrutiny. Monarch went on to raise a ${STATS.monarch.seriesB} Series B.`,
    image: '/images/scatter-plot-data-viz-brand.png',
  },
] as const;

function SelectedWork() {
  return (
    <section className="bg-tt-ink pb-24 sm:pb-32">
      <div className={WRAP}>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-14">
          <div>
            <Eyebrow index="04">Selected work</Eyebrow>
            <h2 className="mt-6 font-display font-bold text-white text-[clamp(2.5rem,5.2vw,5rem)] leading-[1] tracking-[-0.035em]">
              Proof, not promises.
            </h2>
          </div>
          <Link href="/results" className="group inline-flex items-center gap-2 text-base font-semibold text-white">
            <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-tt-orange">All results</span>
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {WORK.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.08}>
              <Link href={`/results/${w.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-tt-gray-800">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-tt-ink/45" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="font-display font-bold text-white text-[clamp(3.5rem,6vw,5.5rem)] leading-none tracking-[-0.045em] tabular-nums">
                      {w.metric}
                    </p>
                    <p className="mt-2 font-eyebrow text-sm text-tt-gray-100">{w.metricLabel}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-tt-orange">{w.client}</h3>
                  <span className="font-eyebrow text-sm text-tt-gray-500">{w.sector}</span>
                </div>
                <p className="mt-3 text-base font-light leading-relaxed text-tt-gray-300">{w.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  7. ON STAGE (SXSW)                                               */
/* ---------------------------------------------------------------- */

function OnStage() {
  return (
    <section className="bg-tt-gray-800 py-24 sm:py-32">
      <div className={`${WRAP} grid gap-12 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-5">
          <Eyebrow index="05">On stage at SXSW</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display font-bold text-white text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[1] tracking-[-0.035em]">
              Under the AI microscope.
            </h2>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-tt-gray-200">
              The CMO of AG1 and the CEO of Tiger Tracks, featured together at SXSW.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="overflow-hidden rounded-sm ring-1 ring-white/10">
            <video controls preload="metadata" playsInline poster="/cliff-sxsw-ag1-poster.jpg" className="aspect-video w-full bg-tt-ink object-cover">
              <source src="/cliffypt2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  8. LEADERSHIP AND OPERATING MODEL                                */
/* ---------------------------------------------------------------- */

const LEADERS = [
  { name: 'Cliff Simmons', role: 'CEO and Co-Founder', note: 'Ex-Google. Former Chief Growth Officer, Ready.' },
  { name: 'Adam Potashnick', role: 'President', note: 'Ex-Brainlabs. Agency growth and operations.' },
] as const;

const FACTS = [
  { value: STATS.teamSize, label: 'Specialists, fully remote' },
  { value: String(STATS.foundingYear), label: 'Founded' },
  { value: STATS.incRank, label: 'Inc. 5000 (2025)' },
] as const;

function Leadership() {
  return (
    <section className="bg-tt-ink py-24 sm:py-32">
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="06">Leadership</Eyebrow>
          </div>
          <Reveal className="lg:col-span-8">
            <h2 className="font-display font-bold text-white text-[clamp(2.5rem,5.2vw,5rem)] leading-[1] tracking-[-0.035em]">
              Built at Google. <span className="text-tt-gray-400">Run by operators.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-tt-gray-200">
              The people who plan your growth are the people who run it. Fully remote, New York based,
              and accountable to the numbers in your board deck.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border-y border-white/10 md:grid-cols-2">
          {LEADERS.map((l) => (
            <div key={l.name} className="py-10 md:pr-10 md:[&:nth-child(2)]:border-l md:[&:nth-child(2)]:border-white/10 md:[&:nth-child(2)]:pl-10">
              <p className="font-eyebrow text-sm text-tt-orange">{l.role}</p>
              <p className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">{l.name}</p>
              <p className="mt-4 text-base font-light text-tt-gray-300">{l.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {FACTS.map((f) => (
            <div key={f.label}>
              <p className="font-display font-bold text-white text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.04em] tabular-nums">{f.value}</p>
              <p className="mt-3 font-eyebrow text-sm text-tt-gray-400">{f.label}</p>
            </div>
          ))}
        </div>

        <Link href="/company" className="group mt-14 inline-flex items-center gap-2 text-base font-semibold text-white">
          <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-tt-orange">Meet the company</span>
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  9. AUDIENCE DOORS: PE/VC, TECHNOLOGY, TRUST                      */
/* ---------------------------------------------------------------- */

const DOORS = [
  {
    label: 'For PE and VC funds',
    title: 'Operators for your portfolio, on a 100-day plan.',
    href: '/pe-vc',
    cta: 'Fund partnerships',
  },
  {
    label: 'Proprietary technology',
    title: 'Other agencies use your tools. We built our own.',
    href: '/wayfinder',
    cta: 'See Wayfinder AI',
  },
  {
    label: 'Your accounts, your data',
    title: 'Everything we build stays yours from day one.',
    href: '/trust',
    cta: 'How we handle access',
  },
] as const;

function Doors() {
  return (
    <section className="bg-tt-ink pb-24 sm:pb-32">
      <div className={WRAP}>
        <div className="grid border-t border-white/10 md:grid-cols-3">
          {DOORS.map((d, i) => (
            <Link
              key={d.href}
              href={d.href}
              className={`group flex min-h-[22rem] flex-col justify-between py-12 transition-colors duration-500 hover:bg-tt-gray-800 md:px-8 ${i > 0 ? 'border-t border-white/10 md:border-l md:border-t-0' : 'md:pl-0'}`}
            >
              <div>
                <p className="font-eyebrow text-sm text-tt-orange">{d.label}</p>
                <p className="mt-6 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl">{d.title}</p>
              </div>
              <span className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-tt-gray-200 transition-colors group-hover:text-white">
                {d.cta}
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  10. EYE OF THE TIGER                                             */
/* ---------------------------------------------------------------- */

const ARTICLES = [
  {
    category: 'AI and automation',
    title: 'Beyond the Chatbox: The No-Shame Guide to the Agentic AI Era of 2026',
    readTime: '12 min',
    slug: 'beyond-the-chatbox-the-no-shame-guide-to-the-agentic-ai-era-of-2026',
  },
  {
    category: 'Platform strategy',
    title: 'GEO Is the New SEO: Why Generative Engine Optimization Is Not Optional in 2026',
    readTime: '10 min',
    slug: 'geo-is-the-new-seo-why-generative-engine-optimization-is-not-optional-in-2026',
  },
  {
    category: 'Measurement',
    title: 'MMM vs. MTA: The Measurement Debate That Determines Where Your Budget Goes',
    readTime: '5 min',
    slug: 'mmm-vs-mta-the-measurement-debate-that-determines-where-your-budget-goes',
  },
] as const;

function Research() {
  return (
    <section className="bg-tt-gray-800 py-24 sm:py-32">
      <div className={WRAP}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="07">Eye of the Tiger</Eyebrow>
            <h2 className="mt-6 font-display font-bold text-white text-[clamp(2.5rem,5.2vw,5rem)] leading-[1] tracking-[-0.035em]">
              Research from the front line.
            </h2>
          </div>
          <Link href="/intelligence" className="group inline-flex items-center gap-2 text-base font-semibold text-white">
            <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-tt-orange">All research</span>
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-16">
          {ARTICLES.map((a) => (
            <li key={a.slug} className="border-t border-white/10 last:border-b">
              <Link href={`/intelligence/${a.slug}`} className="group grid gap-3 py-9 lg:grid-cols-12 lg:items-baseline">
                <span className="font-eyebrow text-sm text-tt-teal lg:col-span-3">{a.category}</span>
                <span className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-white transition-colors group-hover:text-tt-orange sm:text-3xl lg:col-span-8">
                  {a.title}
                </span>
                <span className="font-eyebrow text-sm text-tt-gray-400 lg:col-span-1 lg:text-right">{a.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  11. CLOSING CTA                                                  */
/* ---------------------------------------------------------------- */

function Closing() {
  return (
    <section className="bg-tt-ink">
      <BrandStripe />
      <div className={`${WRAP} py-28 sm:py-40`}>
        <Reveal>
          <h2 className="font-display font-bold text-white text-[clamp(3rem,8.4vw,8.5rem)] leading-[0.92] tracking-[-0.045em]">
            Your revenue is leaking.
            <span className="block text-tt-orange">We&rsquo;ll find where.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="text-lg font-light leading-relaxed text-tt-gray-200 sm:text-xl lg:col-span-6">
            Start with a free Strategic Diagnostic: a 90-day roadmap built around your actual numbers
            across paid, organic, creative and attribution.
          </p>
          <div className="flex flex-wrap items-center gap-4 lg:col-span-6 lg:justify-end">
            <Link href="/get-started" className="btn-primary text-lg">
              Request a Strategic Diagnostic
            </Link>
          </div>
        </div>
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
        <Evidence />
        <ClientVoice />
        <Capabilities />
        <SelectedWork />
        <OnStage />
        <Leadership />
        <Doors />
        <Research />
        <Closing />
      </div>
    </MotionConfig>
  );
}
