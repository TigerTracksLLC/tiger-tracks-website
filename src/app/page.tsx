import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { STATS } from '@/lib/stats';
import { SxswVideo, CountUp, TrackRail } from '@/components/home/HomeClient';

/* ================================================================
   HOMEPAGE v6 (Nov 2026): colour blocking and oversized type
   - Colour: full sections in orange, lime and teal. Ink is the
     contrast between them, not the default.
   - Type: headlines and figures are the design. Work Sans 800,
     scaled with the window.
   - Rhythm: statement, number, proof rows, quote, colour tiles,
     colour doors, research, people, close. No two neighbours share
     a layout.
   - Motion: the track (four-colour stripe) draws down the left edge
     on scroll, the tiger stripe bands drift, figures count up once.
   - Art: code-drawn brand graphics from src/lib/brandArt.ts, served
     as image files at /art/<name>.svg, standing in until real
     photography and screenshots arrive.
   Copy and figures are unchanged from v5. Every figure comes from
   src/lib/stats.ts or an existing case study.
   Server component: only the video, counters and track ship JS.
   ================================================================ */

const WRAP = 'mx-auto w-full max-w-7xl px-6';
/* The "!" beats the global h1/h2 rules in globals.css, which are unlayered. */
const DISPLAY = 'font-display !font-extrabold !tracking-[-0.05em]';
const GIANT = `${DISPLAY} !leading-[0.92] text-[clamp(3rem,8.4vw,8.75rem)]`;
const BIG = `${DISPLAY} !leading-[0.96] text-[clamp(2.5rem,6.2vw,6rem)]`;
/* Second sentence of a headline on orange: orange type on an ink band that hugs each line. */
const HIGHLIGHT = 'box-decoration-clone bg-tt-ink px-[0.14em] text-tt-orange';
const EYEBROW = 'font-eyebrow text-sm font-medium uppercase tracking-[0.18em]';
const COVER = 'absolute inset-0 h-full w-full object-cover';
const ZOOM = `${COVER} transition-transform duration-700 group-hover:scale-105`;

/** A picture from src/lib/brandArt.ts. Decorative, so it has no alt text. */
function Art({ name, className = ZOOM }: { name: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/art/${name}.svg`} alt="" loading="lazy" decoding="async" className={className} />;
}

function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Primary button for colour sections, where an orange button would vanish.
    Paper text, because globals.css forces .text-white to ink inside orange sections. */
function InkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3 rounded-md bg-tt-ink px-8 py-4 text-base font-medium text-tt-paper transition-colors hover:bg-white hover:text-tt-ink">
      {children}
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function LineLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 border-b-2 border-current pb-1 text-base font-semibold transition ${dark ? 'text-white hover:text-tt-orange' : 'text-tt-ink hover:opacity-70'}`}>
      {children}
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** Tiger stripes drifting sideways. Two identical tiles make the loop seamless. */
function StripeBand({ name }: { name: string }) {
  const tile = 'block aspect-[8/1] w-[max(100vw,80rem)] max-w-none shrink-0';
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className="flex w-max animate-logo-scroll motion-reduce:animate-none" style={{ animationDuration: '120s' }}>
        <Art name={name} className={tile} />
        <Art name={name} className={tile} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  1. HERO (orange)                                                 */
/* ---------------------------------------------------------------- */

const HERO_STATS = [
  { value: STATS.revenueGrowth, label: 'Three-year revenue growth' },
  { value: STATS.incRank, label: 'Inc. 5000, 2025' },
  { value: STATS.teamSize, label: 'Specialists, fully remote' },
  { value: String(STATS.foundingYear), label: 'Founded' },
] as const;

function Hero() {
  return (
    <section className="relative overflow-hidden bg-tt-orange pt-28 text-tt-ink lg:pt-36">
      <div className={WRAP}>
        <p className={`${EYEBROW} flex items-center gap-3`}>
          <span className="h-2 w-2 shrink-0 rounded-full bg-tt-ink" aria-hidden="true" />
          <span>Performance marketing, founded by <span className="whitespace-nowrap">ex-Google</span> leaders</span>
        </p>
        <h1 className={`${GIANT} mt-8`}>
          <span className="block">Most agencies provide activity.</span>
          <span className="mt-[0.16em] block"><span className={HIGHLIGHT}>We provide evidence.</span></span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="max-w-xl text-xl !font-normal leading-relaxed sm:text-2xl">
              Paid media, search, creative, CRO and measurement run as one team, reported against the numbers your
              board watches.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <InkButton href="/get-started">Request a Strategic Diagnostic</InkButton>
              <LineLink href="/results">See client results</LineLink>
            </div>
          </div>
          <figure className="lg:col-span-7">
            <div className="overflow-hidden border-4 border-tt-ink">
              <SxswVideo />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-4 font-eyebrow text-sm">
              <span>
                <span className="font-semibold">On stage at SXSW</span>
                <span> with AG1</span>
              </span>
              <span>0:54</span>
            </figcaption>
          </figure>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t-2 border-tt-ink lg:mt-24 lg:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse py-7 lg:py-9 ${i % 2 === 1 ? 'border-l-2 border-tt-ink pl-6' : ''} ${i >= 2 ? 'border-t-2 border-tt-ink lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l-2 lg:pl-6' : ''}`}
            >
              <dt className="mt-2 text-sm font-medium">{s.label}</dt>
              <dd className={`${DISPLAY} !leading-none text-5xl sm:text-6xl xl:text-7xl`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <StripeBand name="band-hero" />
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  2. CLIENT MARQUEE (ink)                                          */
/* ---------------------------------------------------------------- */

const CLIENTS = ['AG1', 'Anastasia Beverly Hills', 'Monarch Money', 'Rho Nutrition', 'Aura Health', 'Lightyear', 'Capezio', 'Dovetail'];

function ClientMarquee() {
  const row = (hidden: boolean) =>
    CLIENTS.map((c) => (
      <li key={`${hidden ? 'b' : 'a'}-${c}`} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10">
        <span className="whitespace-nowrap font-display text-3xl tracking-[-0.03em] text-tt-paper sm:text-5xl">{c}</span>
        <span className="h-3 w-3 rounded-full bg-tt-orange" aria-hidden="true" />
      </li>
    ));
  return (
    <section className="bg-tt-ink py-8 sm:py-10" aria-label="Brands we have grown">
      <div className="overflow-hidden">
        <ul className="flex w-max animate-logo-scroll items-center gap-10 pr-10 motion-reduce:animate-none" style={{ animationDuration: '60s' }}>
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  3. THE NUMBER (lime)                                             */
/* ---------------------------------------------------------------- */

function TheNumber() {
  return (
    <section className="relative overflow-hidden bg-tt-lime text-tt-ink">
      <Art name="number-halftone" className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-20 lg:block" />
      <div className={`${WRAP} relative py-20 lg:py-28`}>
        <p className={EYEBROW}>Tiger Tracks, Inc. 5000 {STATS.incRank}</p>
        <p className={`${DISPLAY} mt-5 !leading-[0.85] text-[clamp(4.5rem,23vw,22rem)]`}>
          <CountUp value={STATS.revenueGrowth} />
        </p>
        <p className="mt-7 max-w-2xl font-display text-2xl !font-bold !leading-[1.1] tracking-[-0.03em] sm:text-4xl">
          Three-year revenue growth, ranked on the 2025 Inc. 5000.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  4. THE EVIDENCE (ink): one client per row                        */
/* ---------------------------------------------------------------- */

const WORK = [
  {
    slug: 'ag1-meta',
    client: 'AG1',
    sector: 'DTC, multi-channel',
    metric: '+51%',
    metricLabel: 'Customers year over year',
    summary: 'Restructured Meta campaigns to drive compounding acquisition growth across channels.',
    color: 'text-tt-orange',
    art: 'work-ag1',
  },
  {
    slug: 'national-broadband-provider',
    client: 'National broadband provider',
    sector: 'Broadband and telecom',
    metric: STATS.broadband.cvrLift,
    metricLabel: 'Website conversion rate',
    summary: `Purchases up ${STATS.broadband.purchases.replace('+', '')} and revenue up ${STATS.broadband.revenue.replace('+', '')}, from two test markets to the national footprint in six months.`,
    color: 'text-tt-lime',
    art: 'work-broadband',
  },
  {
    slug: 'monarch-money',
    client: 'Monarch Money',
    sector: 'Fintech',
    metric: STATS.monarch.usersGrowth,
    metricLabel: 'Users',
    summary: `Growth with unit economics that held under investor scrutiny. Monarch went on to raise a ${STATS.monarch.seriesB} Series B.`,
    color: 'text-tt-teal',
    art: 'work-monarch',
  },
];

function Evidence() {
  return (
    <section className="bg-tt-ink py-20 lg:py-28">
      <div className={WRAP}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className={`${EYEBROW} text-tt-orange`}>The evidence</p>
            <h2 className={`${BIG} mt-5 text-white`}>Results that hold up in the boardroom.</h2>
          </div>
          <p className="text-lg leading-relaxed text-tt-gray-200 lg:col-span-4">
            Reported against revenue and the numbers your board watches, not impressions. Client figures are results
            from individual engagements, not portfolio averages.
          </p>
        </div>

        <ul className="mt-14 border-t border-white/25">
          {WORK.map((w) => (
            <li key={w.slug} className="border-b border-white/25">
              <Link href={`/results/${w.slug}`} className="group grid grid-cols-1 items-center gap-6 py-9 md:grid-cols-12 md:gap-8 lg:py-12">
                <span className={`${DISPLAY} block !leading-[0.9] text-[clamp(4.25rem,10.5vw,10rem)] md:col-span-5 ${w.color}`}>
                  <CountUp value={w.metric} />
                </span>
                <span className="block md:col-span-4">
                  <span className="block font-eyebrow text-sm text-tt-gray-300">{w.sector}</span>
                  <span className="mt-2 block font-display text-3xl tracking-[-0.03em] text-white">{w.client}</span>
                  <span className="mt-1 block text-base font-medium text-tt-gray-100">{w.metricLabel}</span>
                  <span className="mt-3 block text-base font-light leading-relaxed text-tt-gray-300">{w.summary}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-tt-orange">
                    Read the case study
                    <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
                <span className="relative block aspect-[4/3] overflow-hidden md:col-span-3"><Art name={w.art} /></span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <LineLink dark href="/results">View all results</LineLink>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  5. CLIENT QUOTE (teal)                                           */
/* ---------------------------------------------------------------- */

function Quote() {
  return (
    <section className="relative overflow-hidden bg-tt-teal text-tt-ink">
      <Art name="quote-contours" className={`${COVER} opacity-[0.12]`} />
      <figure className={`${WRAP} relative py-24 lg:py-32`}>
        <span className={`${DISPLAY} block h-20 text-[9rem] !leading-none sm:h-28 sm:text-[12rem]`} aria-hidden="true">&ldquo;</span>
        <blockquote className={`${DISPLAY} max-w-6xl !leading-[1.03] !tracking-[-0.04em] text-[clamp(1.9rem,4.7vw,4.6rem)]`}>
          Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply specialized
          knowledge of ad platforms with a relentless focus on hitting growth goals.
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4">
          <span className="relative block aspect-[420/237] h-14 shrink-0 overflow-hidden">
            <Image src="/images/AG1_(company)_logo.png" alt="AG1" fill sizes="100px" className="object-cover" />
          </span>
          <span>
            <span className="block text-lg font-semibold">Jason Marshall</span>
            <span className="block text-base">Chief Growth Officer, AG1</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  6. CAPABILITIES (colour tiles on ink)                            */
/* ---------------------------------------------------------------- */

const CAPABILITIES = [
  { name: 'Demand Gen', line: 'Paid search to retail media, one accountable growth engine.', tags: ['Paid Search', 'Paid Social', 'Programmatic', 'Retail'], href: '/capabilities#media-buying', tile: 'bg-tt-orange text-tt-ink', art: 'cap-demand-gen' },
  { name: 'Creative', line: 'From content strategy to influencer programs, creative that answers to revenue.', tags: ['Content Strategy', 'Production', 'UGC', 'Influencer'], href: '/capabilities#creative', tile: 'bg-tt-lime text-tt-ink', art: 'cap-creative' },
  { name: 'CRO', line: 'Conversion rate lifts that compound wave over wave.', tags: ['Website Design & Development', 'A/B Testing'], href: '/capabilities#website-cro', tile: 'bg-tt-gray-800 text-white', art: 'cap-cro' },
  { name: 'Analytics', line: 'The measurement layer boards and CFOs can act on.', tags: ['MMM', 'Attribution', 'Reporting', 'Data Architecture'], href: '/capabilities#analytics', tile: 'bg-tt-gray-800 text-white', art: 'cap-analytics' },
  { name: 'Organic', line: 'Social, SEO, GEO/AEO and ASO built for how customers search now.', tags: ['Social', 'SEO', 'GEO/AEO', 'ASO'], href: '/capabilities#organic-growth', tile: 'bg-tt-teal text-tt-ink', art: 'cap-organic' },
  { name: 'Lifecycle', line: 'Email, SMS, CRM and personalization that grow LTV without touching the media budget.', tags: ['Email & SMS', 'CRM', 'Personalization'], href: '/capabilities#lifecycle', tile: 'bg-tt-orange text-tt-ink', art: 'cap-lifecycle' },
];

function Capabilities() {
  return (
    <section className="bg-tt-ink py-20 lg:py-28">
      <div className={WRAP}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-5xl">
            <p className={`${EYEBROW} text-tt-orange`}>Capabilities</p>
            <h2 className={`${BIG} mt-5 text-white`}>One team across every lever that moves revenue.</h2>
          </div>
          <LineLink dark href="/capabilities">All capabilities</LineLink>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <li key={c.name}>
              <Link href={c.href} className={`group flex h-full flex-col overflow-hidden ${c.tile}`}>
                <span className="relative block aspect-[16/10] overflow-hidden"><Art name={c.art} /></span>
                <span className="flex flex-1 flex-col p-7 lg:p-8">
                  <span className="font-eyebrow text-sm font-medium">0{i + 1}</span>
                  <span className={`${DISPLAY} mt-2 block !leading-[0.95] text-[clamp(2.4rem,4vw,3.75rem)]`}>{c.name}</span>
                  <span className="mt-4 block text-base leading-relaxed">{c.line}</span>
                  <span className="mt-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border border-current px-3 py-1 text-xs font-medium">{t}</span>
                    ))}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold">
                    Explore {c.name}
                    <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
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
/*  7. THREE DOORS (orange, lime, teal)                              */
/* ---------------------------------------------------------------- */

const PLAN = [
  { when: 'Week 1-2', what: 'Strategic Diagnostic and forensics' },
  { when: 'Week 3-4', what: 'Strategy and quick wins deployed' },
  { when: 'Month 2-3', what: 'Full-funnel execution at scale' },
] as const;

function Door({ href, tone, label, title, cta, art }: { href: string; tone: string; label: string; title: string; cta: string; art: string }) {
  return (
    <Link href={href} className={`group flex min-h-[20rem] text-tt-ink ${tone}`}>
      <span className="flex flex-1 flex-col justify-end px-6 py-12 lg:px-12 xl:px-16">
        <span className={EYEBROW}>{label}</span>
        <span className={`${DISPLAY} mt-4 block !leading-[0.98] text-[clamp(1.9rem,3.1vw,3rem)]`}>{title}</span>
        <span className="mt-7 inline-flex items-center gap-2 self-start border-b-2 border-current pb-1 text-base font-semibold">
          {cta}
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
      <span className="relative hidden w-2/5 shrink-0 overflow-hidden sm:block"><Art name={art} /></span>
    </Link>
  );
}

function Doors() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-tt-orange px-6 py-20 text-tt-ink lg:px-12 lg:py-28 xl:px-16">
        <p className={EYEBROW}>For PE and VC funds</p>
        <h2 className={`${DISPLAY} mt-5 !leading-[0.98] text-[clamp(2.2rem,4.3vw,4.25rem)]`}>
          Operators for your portfolio, from first call to fund-level reporting.
        </h2>
        <p className="mt-6 max-w-xl text-lg !font-normal leading-relaxed">
          Strategic Diagnostics, proprietary AI tooling and a team built at Google, deployed on your timeline.
        </p>
        <ol className="mt-10 border-t-2 border-tt-ink">
          {PLAN.map((p, i) => (
            <li key={p.when} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 border-b-2 border-tt-ink py-5 sm:grid-cols-[3.5rem_7.5rem_1fr]">
              <span className={`${DISPLAY} !leading-none text-3xl`}>0{i + 1}</span>
              <span className="font-eyebrow text-sm font-medium">{p.when}</span>
              <span className="col-start-2 text-lg font-medium sm:col-start-3">{p.what}</span>
            </li>
          ))}
        </ol>
        <div className="mt-9">
          <LineLink href="/pe-vc">Fund partnerships</LineLink>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <Door
          href="/wayfinder"
          tone="bg-tt-lime"
          label="Proprietary technology"
          title="Other agencies use your tools. We built our own."
          cta="See Wayfinder AI"
          art="door-wayfinder"
        />
        <Door
          href="/trust"
          tone="bg-tt-teal"
          label="Your accounts, your data"
          title="Everything we build stays yours from day one."
          cta="How we handle access"
          art="door-trust"
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  8. RESEARCH (ink)                                                */
/* ---------------------------------------------------------------- */

const ARTICLES = [
  {
    category: 'AI and automation',
    title: 'Beyond the Chatbox: The No-Shame Guide to the Agentic AI Era of 2026',
    readTime: '12 min read',
    slug: 'beyond-the-chatbox-the-no-shame-guide-to-the-agentic-ai-era-of-2026',
    art: 'research-ai',
  },
  {
    category: 'Platform strategy',
    title: 'GEO Is the New SEO: Why Generative Engine Optimization Is Not Optional in 2026',
    readTime: '10 min read',
    slug: 'geo-is-the-new-seo-why-generative-engine-optimization-is-not-optional-in-2026',
    art: 'research-platform',
  },
  {
    category: 'Measurement',
    title: 'MMM vs. MTA: The Measurement Debate That Determines Where Your Budget Goes',
    readTime: '5 min read',
    slug: 'mmm-vs-mta-the-measurement-debate-that-determines-where-your-budget-goes',
    art: 'research-measurement',
  },
];

function Research() {
  return (
    <section className="bg-tt-ink py-20 lg:py-28">
      <div className={WRAP}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`${EYEBROW} text-tt-orange`}>Eye of the Tiger</p>
            <h2 className={`${BIG} mt-5 text-white`}>Research from our team.</h2>
          </div>
          <LineLink dark href="/intelligence">All research</LineLink>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link href={`/intelligence/${a.slug}`} className="group block">
                <span className="relative block aspect-[4/3] overflow-hidden"><Art name={a.art} /></span>
                <span className="mt-5 block font-eyebrow text-sm text-tt-gray-300">
                  {a.category} <span aria-hidden="true">&middot;</span> {a.readTime}
                </span>
                <h3 className="mt-2 text-2xl !leading-[1.12] text-white transition-colors group-hover:text-tt-orange lg:text-[1.75rem]">{a.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  9. LEADERSHIP (lime)                                             */
/* ---------------------------------------------------------------- */

const LEADERS = [
  { name: 'Cliff Simmons', initials: 'CS', role: 'CEO and Co-Founder', note: 'Ex-Google. Former Chief Growth Officer, Ready.' },
  { name: 'Adam Potashnick', initials: 'AP', role: 'President', note: 'Ex-Brainlabs. Agency growth and operations.' },
] as const;

function Leadership() {
  return (
    <section className="bg-tt-lime text-tt-ink">
      <div className={`${WRAP} grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:items-end lg:py-28`}>
        <div className="lg:col-span-7">
          <p className={EYEBROW}>Leadership</p>
          <h2 className={`${BIG} mt-5`}>Built at Google. Run by operators.</h2>
          <div className="mt-9">
            <LineLink href="/company">Meet the company</LineLink>
          </div>
        </div>
        <ul className="border-t-2 border-tt-ink lg:col-span-5">
          {LEADERS.map((l) => (
            <li key={l.name} className="flex items-center gap-5 border-b-2 border-tt-ink py-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-tt-ink font-display text-xl text-white" aria-hidden="true">{l.initials}</span>
              <span>
                <span className="block font-display text-2xl tracking-[-0.03em]">{l.name}</span>
                <span className="block text-base font-medium">{l.role}</span>
                <span className="mt-1 block text-sm font-normal">{l.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  10. CLOSING (orange)                                             */
/* ---------------------------------------------------------------- */

function Closing() {
  return (
    <section className="relative overflow-hidden bg-tt-orange text-tt-ink">
      <div className={`${WRAP} py-24 lg:py-36`}>
        <h2 className={GIANT}>
          <span className="block">Your revenue is leaking.</span>
          <span className="mt-[0.16em] block"><span className={HIGHLIGHT}>We&rsquo;ll find where.</span></span>
        </h2>
        <p className="mt-9 max-w-2xl text-xl !font-normal leading-relaxed sm:text-2xl">
          Start with a free Strategic Diagnostic: a 90-day roadmap built around your actual numbers across paid,
          organic, creative and attribution.
        </p>
        <div className="mt-10">
          <InkButton href="/get-started">Request a Strategic Diagnostic</InkButton>
        </div>
      </div>
      <StripeBand name="band-close" />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <TrackRail />
      <Hero />
      <ClientMarquee />
      <TheNumber />
      <Evidence />
      <Quote />
      <Capabilities />
      <Doors />
      <Research />
      <Leadership />
      <Closing />
    </>
  );
}
