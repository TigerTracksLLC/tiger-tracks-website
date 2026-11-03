'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { STATS } from '@/lib/stats';

/* ================================================================
   HOMEPAGE (Nov 2026 redesign, v2)
   One container (max-w-7xl px-6, aligned with the nav and footer),
   one vertical rhythm (py-20 lg:py-24 per section), headings left
   aligned with their intro copy, numbers at readable sizes.
   Brand: Work Sans headlines, Inter body, DM Sans labels, Ink
   surfaces, orange for CTAs and key phrases only.
   Every figure comes from src/lib/stats.ts or an existing case study.
   ================================================================ */

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const WRAP = 'mx-auto w-full max-w-7xl px-6';
const SECTION = 'py-20 lg:py-24';

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Section header: label, headline and optional intro copy, all left aligned. */
function SectionHeader({ label, title, intro, action }: { label: string; title: ReactNode; intro?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="font-eyebrow text-sm font-medium text-tt-orange">{label}</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl">{title}</h2>
        {intro && <p className="mt-5 text-lg font-light leading-relaxed text-tt-gray-300">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-tt-orange">
      {children}
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

const CARD = 'rounded-2xl border border-white/10 bg-tt-gray-800/40';

/* ---------------------------------------------------------------- */
/*  HERO                                                             */
/* ---------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-tt-ink pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12`}>
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 font-eyebrow text-xs font-medium text-tt-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-tt-orange" aria-hidden="true" />
            Inc. 5000 {STATS.incRank}
            <span className="text-tt-gray-500" aria-hidden="true">/</span>
            Founded by ex-Google leaders
          </p>
          <h1 className="mt-7 font-display text-[2.75rem] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl xl:text-[4.25rem]">
            Most agencies provide activity. <span className="text-tt-orange">We provide evidence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-tt-gray-200">
            Paid media, search, creative, CRO and measurement run as one team, reported against the
            numbers your board watches.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/get-started" className="btn-primary">
              Request a Strategic Diagnostic
            </Link>
            <TextLink href="/results">See client results</TextLink>
          </div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/media-buying-dashboard-brand.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-tt-ink/25" aria-hidden="true" />
          </div>

          <div className="absolute -bottom-6 left-4 w-56 rounded-xl border border-white/10 bg-tt-ink p-5 sm:left-6 sm:w-64">
            <p className="font-display text-4xl font-bold tracking-[-0.03em] text-white">+51%</p>
            <p className="mt-1 text-sm text-tt-gray-300">Customers year over year</p>
            <p className="mt-3 font-eyebrow text-xs text-tt-gray-400">AG1</p>
          </div>
          <div className="absolute -top-5 right-4 hidden w-56 rounded-xl border border-white/10 bg-tt-ink p-5 sm:block sm:right-6">
            <p className="font-display text-4xl font-bold tracking-[-0.03em] text-white">{STATS.broadband.cvrLift}</p>
            <p className="mt-1 text-sm text-tt-gray-300">Website conversion rate</p>
            <p className="mt-3 font-eyebrow text-xs text-tt-gray-400">National broadband provider</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  CLIENTS                                                          */
/* ---------------------------------------------------------------- */

const CLIENTS = ['AG1', 'Anastasia Beverly Hills', 'Monarch Money', 'Rho Nutrition', 'Aura Health', 'Lightyear', 'Capezio', 'Dovetail'];

function Clients() {
  return (
    <section className="border-y border-white/10 bg-tt-ink py-10" aria-label="Clients">
      <div className={WRAP}>
        <p className="font-eyebrow text-sm text-tt-gray-400">Brands we&rsquo;ve grown</p>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 xl:flex xl:items-center xl:justify-between">
          {CLIENTS.map((c) => (
            <li key={c} className="whitespace-nowrap font-eyebrow text-sm uppercase tracking-[0.2em] text-tt-gray-200">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  RESULTS BAND                                                     */
/* ---------------------------------------------------------------- */

const STATS_ROW = [
  { value: STATS.revenueGrowth, label: 'Three-year revenue growth', source: 'Inc. 5000, 2025' },
  { value: STATS.incRank, label: 'Inc. 5000 ranking', source: '2025 list' },
  { value: STATS.broadband.purchases, label: 'Purchases', source: 'National broadband provider' },
  { value: STATS.broadband.rankingPositions, label: 'Average Google ranking positions gained', source: 'National broadband provider' },
] as const;

function ResultsBand() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <SectionHeader
          label="The evidence"
          title="Results that hold up in the boardroom."
          intro="Reported against the numbers your board watches, not impressions. A few of the figures behind the name."
        />
        <Reveal className={`mt-12 grid grid-cols-2 lg:grid-cols-4 ${CARD} overflow-hidden`}>
          {STATS_ROW.map((s, i) => (
            <div
              key={s.label}
              className={`p-5 sm:p-7 lg:p-8 ${i % 2 === 1 ? 'border-l border-white/10' : ''} ${i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <p className="font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-5xl">{s.value}</p>
              <p className="mt-3 text-sm text-tt-gray-200">{s.label}</p>
              <p className="mt-1 font-eyebrow text-xs text-tt-gray-400">{s.source}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-4 font-eyebrow text-xs text-tt-gray-400">
          Client figures are results from individual engagements, not portfolio averages.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  CAPABILITIES                                                     */
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
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <SectionHeader
          label="Capabilities"
          title="One team across every lever that moves revenue."
          action={<TextLink href="/capabilities">All capabilities</TextLink>}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.05}>
              <Link
                href={c.href}
                className={`group flex h-full flex-col ${CARD} p-6 transition-colors duration-300 hover:border-tt-orange/60 hover:bg-tt-gray-800/70 sm:p-7`}
              >
                <span className="font-eyebrow text-xs text-tt-gray-400 tabular-nums">0{i + 1}</span>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.02em] text-white">{c.name}</h3>
                <p className="mt-3 flex-1 text-[15px] font-light leading-relaxed text-tt-gray-300">{c.line}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-tt-gray-200 transition-colors group-hover:text-white">
                  Learn more <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  CASE STUDIES                                                     */
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
  },
  {
    slug: 'national-broadband-provider',
    client: 'National broadband provider',
    sector: 'Broadband and telecom',
    metric: STATS.broadband.cvrLift,
    metricLabel: 'Website conversion rate',
    summary: `Purchases up ${STATS.broadband.purchases.replace('+', '')} and revenue up ${STATS.broadband.revenue.replace('+', '')}, from two test markets to the national footprint in six months.`,
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

function CaseStudies() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <SectionHeader label="Client results" title="Proof, not promises." action={<TextLink href="/results">View all results</TextLink>} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WORK.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.06}>
              <Link href={`/results/${w.slug}`} className={`group flex h-full flex-col overflow-hidden ${CARD} bg-tt-ink transition-colors duration-300 hover:border-tt-orange/60`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-eyebrow text-xs text-tt-gray-400">{w.sector}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">{w.client}</h3>
                  <p className="mt-5 font-display text-4xl font-bold tracking-[-0.03em] text-tt-orange">{w.metric}</p>
                  <p className="mt-1 text-sm text-tt-gray-200">{w.metricLabel}</p>
                  <p className="mt-4 flex-1 text-[15px] font-light leading-relaxed text-tt-gray-300">{w.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-tt-orange">
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
/*  CLIENT VOICE + SXSW                                              */
/* ---------------------------------------------------------------- */

function SxswVideo() {
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
      <Image src="/cliff-sxsw-ag1-poster.jpg" alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-top" />
      <span className="absolute inset-0 bg-tt-ink/30 transition-colors group-hover:bg-tt-ink/15" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-tt-orange transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
        <svg className="ml-1 h-6 w-6 text-tt-ink" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  );
}

function VoiceAndStage() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={`${WRAP} grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
        <Reveal className="min-w-0">
          <p className="font-eyebrow text-sm font-medium text-tt-orange">From our clients</p>
          <blockquote className="mt-6">
            <p className="font-display text-2xl font-semibold leading-snug tracking-[-0.015em] text-white sm:text-3xl">
              &ldquo;Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply
              specialized knowledge of ad platforms with a relentless focus on hitting growth goals.&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <span className="relative block h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-tt-ink">
                <Image src="/images/AG1_(company)_logo.png" alt="AG1" fill className="object-contain p-2" sizes="64px" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">Jason Marshall</span>
                <span className="block text-sm text-tt-gray-400">Chief Growth Officer, AG1</span>
              </span>
            </footer>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div className={`overflow-hidden ${CARD} bg-tt-ink`}>
            <SxswVideo />
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
              <p className="text-sm text-white">
                <span className="font-semibold">Featured at SXSW:</span>{' '}
                <span className="text-tt-gray-300">AG1 and Tiger Tracks on stage</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  LEADERSHIP                                                       */
/* ---------------------------------------------------------------- */

const LEADERS = [
  { name: 'Cliff Simmons', initials: 'CS', role: 'CEO and Co-Founder', note: 'Ex-Google. Former Chief Growth Officer, Ready.' },
  { name: 'Adam Potashnick', initials: 'AP', role: 'President', note: 'Ex-Brainlabs. Agency growth and operations.' },
] as const;

const FACTS = [
  { value: STATS.teamSize, label: 'Specialists' },
  { value: String(STATS.foundingYear), label: 'Founded' },
  { value: 'NYC', label: 'Based, fully remote' },
] as const;

function Leadership() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={`${WRAP} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <SectionHeader
            label="Leadership"
            title="Built at Google. Run by operators."
            intro="The operators who run your channels, in the room with your leadership."
          />
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-3xl font-bold tracking-[-0.02em] text-white">{f.value}</dd>
                <dd className="mt-1 text-sm text-tt-gray-400">{f.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <TextLink href="/company">Meet the company</TextLink>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {LEADERS.map((l) => (
            <div key={l.name} className={`${CARD} p-7`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tt-orange font-display text-base font-bold text-tt-ink" aria-hidden="true">
                {l.initials}
              </span>
              <p className="mt-6 font-display text-2xl font-bold text-white">{l.name}</p>
              <p className="mt-1 text-sm font-medium text-tt-gray-200">{l.role}</p>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-tt-gray-300">{l.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  PATHS: PE/VC, TECHNOLOGY, TRUST                                  */
/* ---------------------------------------------------------------- */

const PATHS = [
  { label: 'For PE and VC funds', title: 'Operators for your portfolio, on a 100-day plan.', href: '/pe-vc', cta: 'Fund partnerships' },
  { label: 'Proprietary technology', title: 'Other agencies use your tools. We built our own.', href: '/wayfinder', cta: 'See Wayfinder AI' },
  { label: 'Your accounts, your data', title: 'Everything we build stays yours from day one.', href: '/trust', cta: 'How we handle access' },
] as const;

function Paths() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={`${WRAP} grid gap-5 md:grid-cols-3`}>
        {PATHS.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.05}>
            <Link href={p.href} className={`group flex h-full flex-col ${CARD} p-7 transition-colors duration-300 hover:border-tt-orange/60`}>
              <p className="flex items-center gap-2 font-eyebrow text-xs font-medium text-tt-gray-200"><span className="h-1.5 w-1.5 rounded-full bg-tt-orange" aria-hidden="true" />{p.label}</p>
              <p className="mt-4 flex-1 font-display text-xl font-bold leading-snug text-white">{p.title}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-tt-gray-200 transition-colors group-hover:text-white">
                {p.cta} <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  RESEARCH                                                         */
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
    image: '/images/network-connection-map-brand.png',
  },
] as const;

function Research() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <SectionHeader label="Eye of the Tiger" title="Research from our team." action={<TextLink href="/intelligence">All research</TextLink>} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link href={`/intelligence/${a.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                  <Image src={a.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 font-eyebrow text-xs text-tt-teal">
                  {a.category} <span className="text-tt-gray-400">&middot; {a.readTime}</span>
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-tt-orange">{a.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  CLOSING CTA                                                      */
/* ---------------------------------------------------------------- */

function Closing() {
  return (
    <section className={`bg-tt-ink ${SECTION}`}>
      <div className={WRAP}>
        <Reveal className={`overflow-hidden ${CARD} bg-tt-gray-800/50`}>
          <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl">
                Your revenue is leaking. <span className="text-tt-orange">We&rsquo;ll find where.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-tt-gray-200">
                Start with a free Strategic Diagnostic: a 90-day roadmap built around your actual numbers across
                paid, organic, creative and attribution.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Link href="/get-started" className="btn-primary w-full justify-center whitespace-nowrap px-6 sm:w-auto">
                Request a Strategic Diagnostic
              </Link>
            </div>
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
        <Clients />
        <ResultsBand />
        <Capabilities />
        <CaseStudies />
        <VoiceAndStage />
        <Leadership />
        <Paths />
        <Research />
        <Closing />
      </div>
    </MotionConfig>
  );
}
