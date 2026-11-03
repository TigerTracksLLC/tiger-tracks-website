'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { CTASection } from '@/components/CTASection';
import { STATS } from '@/lib/stats';
import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const milestones = [
  {
    year: '2010s',
    title: 'Google',
    description:
      'Campaign design for top client brands across Paid Search, YouTube, Shopping.',
  },
  {
    year: '2018',
    title: 'Ready',
    description: 'Chief Growth Officer, $50M to $350M+ valuation.',
  },
  {
    year: '2021',
    title: 'Tiger Tracks Founded',
    description: 'May 2021, starting with 3 people.',
  },
  {
    year: '2023',
    title: '100x MRR',
    description: 'Compounding growth through PE/VC partnerships.',
  },
  {
    year: '2025',
    title: 'Inc. 5000 #123',
    description: '2,954% three-year revenue growth.',
  },
  {
    year: '2026',
    title: 'President Joins',
    description: 'Adam Potashnick joins from Brainlabs to scale how Tiger Tracks operates and grows.',
  },
];

const leaders = [
  {
    name: 'Cliff Simmons',
    title: 'CEO & Co-Founder',
    initials: 'CS',
    image: '/cliff-headshot.jpeg',
    bio: 'Started career at Google overseeing campaign design and management for Google’s top client brands across Paid Search, YouTube, Shopping, and others. After Google, served as Chief Growth Officer of Ready where he oversaw consumer business and managed over $250K per week in performance marketing spend. His teams captured and converted demand responsible for over 90% of Ready’s revenue, propelling the company from $50M to $350M+ valuation.',
    credentials: ['Ex-Google', 'Former CGO, Ready', 'Inc. 5000 Founder'],
  },
  {
    name: 'Adam Potashnick',
    title: 'President',
    initials: 'AP',
    image: '',
    bio: 'Joins Tiger Tracks from Brainlabs, with a career leading growth and operations at global agencies. Partnering with Cliff to scale how we operate and grow.',
    credentials: ['Ex-Brainlabs', 'Agency Growth & Operations', 'New York'],
  },
];

const principles = [
  {
    title: 'Performance First',
    description:
      'Every engagement anchored to clear business outcomes: efficient customer acquisition, measurable revenue growth, compounding ROI.',
    icon: (
      <svg className="h-6 w-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'True Partnership',
    description:
      'Embed with client teams, align on objectives, share accountability for commercial results.',
    icon: (
      <svg className="h-6 w-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Tech-Enabled Advantage',
    description:
      'Proprietary automation, attribution, and media mix modeling for faster, more reliable decisions.',
    icon: (
      <svg className="h-6 w-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.116 2.116a4.502 4.502 0 01-6.368 0L9.2 14.5" />
      </svg>
    ),
  },
  {
    title: 'Built to Scale',
    description:
      'Pod-based delivery model and disciplined playbooks from pilot to enterprise programs.',
    icon: (
      <svg className="h-6 w-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
  },
];

const verticals = [
  { name: 'DTC & E-Commerce', clients: 'AG1, Rho Nutrition, Sovereign Labs', icon: '01' },
  { name: 'Beauty & Personal Care', clients: 'Anastasia Beverly Hills', icon: '02' },
  { name: 'Health & Wellness', clients: 'Aura Health, Honeydew', icon: '03' },
  { name: 'Finance & Fintech', clients: 'Monarch Money', icon: '04' },
  { name: 'Telecom & Enterprise', clients: 'Lightyear', icon: '05' },
  { name: 'PE & VC Portfolio Cos.', clients: 'Multi-fund partnerships', icon: '06' },
];

const podRoles = [
  { role: 'Performance Strategist', level: 'Senior', description: 'Owns your growth roadmap, budget allocation, and channel strategy.' },
  { role: 'Media Buyer', level: 'Senior', description: 'Manages day-to-day campaign execution across all paid channels.' },
  { role: 'Data Analyst', level: 'Mid-Senior', description: 'Runs attribution modeling, incrementality tests, and Wayfinder reporting.' },
  { role: 'Creative Lead', level: 'Senior', description: 'Directs performance creative, UGC, and landing page design.' },
];

const clientTestimonials = [
  {
    quote: 'Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply specialized knowledge of ad platforms with a relentless focus on hitting growth goals.',
    name: 'Jason Marshall',
    title: 'Chief Growth Officer',
    company: 'AG1',
    metric: '+51% acquired customers',
  },
  {
    quote: 'The Tiger Tracks team boosted the profitability of our non-branded search campaigns by 151% in the first few months, and set new overall ad revenue records shortly after.',
    name: 'Steven Leung',
    title: 'Director of Marketing',
    company: 'Online Labels',
    metric: '+151% profit growth',
  },
  {
    quote: "The Tiger Tracks team has been a true partner in our company's growth. They're collaborative, nimble, and thoughtful, really acting as an extension of our own team. Without them, our business simply wouldn't have scaled the way it has.",
    name: 'Connor Kreutz',
    title: 'Head of Growth',
    company: 'Honeydew',
    metric: 'Scaled sustainably',
  },
];

/* Logo components for the trust bar */
// Current Tiger Tracks clients (each has a case study or testimonial).
const logoNames = [
  'AG1', 'Anastasia Beverly Hills', 'Monarch Money', 'Rho Nutrition',
  'Aura Health', 'Online Labels', 'Honeydew', 'Lightyear',
  'Capezio', 'Dovetail', 'Sovereign Labs', 'Leonard Truck',
];

// Brands the founders built while at Google (founder experience, NOT TT clients).
const googleEraNames = ['AT&T', 'Verizon', 'Under Armour', 'Snapchat', 'Dell', 'Etsy'];

/* ------------------------------------------------------------------ */
/*  Headshot component with fallback                                   */
/* ------------------------------------------------------------------ */

function FounderHeadshot({
  src,
  initials,
  name,
}: {
  src: string;
  initials: string;
  name: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className="flex justify-center">
      <div
        className="relative group/img w-48 h-48 md:w-56 md:h-56 aspect-square rounded-full overflow-hidden border-2 border-tt-orange transition-all duration-500"
      >
        {failed ? (
          <div className="w-full h-full flex items-center justify-center" style={{
            background: 'rgba(127, 202, 211, 0.1)',
          }}>
            <span className="text-5xl font-bold text-tt-gray-600">{initials}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-[1.06]"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo Trust Bar                                                     */
/* ------------------------------------------------------------------ */

function LogoTrustBar() {
  return (
    <section className="relative py-16 overflow-hidden" style={{
      background: '#052E3F',
    }}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm uppercase tracking-[4px] text-tt-gray-500 mb-10">
          Brands we've grown
        </p>

        {/* Scrolling logo rail */}
        <div className="relative overflow-hidden">

          <div className="flex animate-logo-scroll items-center">
            {[...logoNames, ...logoNames].map((name, i) => (
              <div
                key={`logo-${i}`}
                className="mx-8 shrink-0 text-tt-gray-500 hover:text-white transition-colors duration-300"
              >
                <span className="text-sm font-semibold tracking-wide whitespace-nowrap uppercase"
                  style={{ fontFamily: 'inherit' }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Founder experience — clearly separated from current clients */}
        <p className="text-center text-sm uppercase tracking-[4px] text-tt-gray-500 mt-14 mb-8">
          Founders’ work at Google
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {googleEraNames.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-wide uppercase text-tt-gray-600 hover:text-tt-gray-400 transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Growth Stats + Client Testimonial (replaces CEO quote)             */
/* ------------------------------------------------------------------ */

function GrowthSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const { ref: quoteRef, inView: quoteInView } = useInView({ threshold: 0.15 });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-5xl">
        {/* Stats bento */}
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: STATS.revenueGrowth, label: 'Three-year revenue growth' },
            { value: STATS.incRank, label: 'Inc. 5000 Fastest-Growing' },
            { value: String(STATS.teamSize), label: 'Senior specialists' },
            { value: 'NYC', label: 'Based, fully remote' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-6 text-center"
              style={{
                background: 'rgba(5, 46, 63, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>

        {/* Stylized Growth Chart */}
        <div className="mb-20">
          <div className="rounded-2xl p-8 md:p-10" style={{
            background: 'rgba(5, 46, 63, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[3px] text-tt-orange">Revenue Growth</p>
                <p className="text-2xl font-bold text-white mt-1">2,954% in 3 Years</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-tt-gray-500 uppercase tracking-wider">Inc. 5000 Verified</p>
                <p className="text-sm font-semibold text-tt-orange">#123 Nationally</p>
              </div>
            </div>

            {/* SVG growth chart */}
            <svg viewBox="0 0 600 140" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7FCAD3" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#7FCAD3" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="35" x2="600" y2="35" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              <line x1="0" y1="70" x2="600" y2="70" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              <line x1="0" y1="105" x2="600" y2="105" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />

              {/* Fill area */}
              <path d="M0 130 L50 125 L150 115 L250 95 L350 65 L450 30 L550 12 L600 8 L600 140 L0 140 Z" fill="#7FCAD3" fillOpacity={0.12} />

              {/* Line */}
              <path d="M0 130 L50 125 L150 115 L250 95 L350 65 L450 30 L550 12 L600 8" fill="none" stroke="#7FCAD3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Glow dot at end */}
              <circle cx="600" cy="8" r="4" fill="#7FCAD3" />
              <circle cx="600" cy="8" r="8" fill="#7FCAD3" opacity="0.2" />

              {/* Year labels */}
              <text x="0" y="138" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontFamily="DM Sans, Arial, sans-serif">2021</text>
              <text x="145" y="138" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontFamily="DM Sans, Arial, sans-serif">2022</text>
              <text x="345" y="138" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontFamily="DM Sans, Arial, sans-serif">2023</text>
              <text x="560" y="138" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontFamily="DM Sans, Arial, sans-serif">2024</text>
            </svg>
          </div>
        </div>

        {/* Client Testimonial (replaces CEO quote) */}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Who we serve (NEW)                                                 */
/* ------------------------------------------------------------------ */

function WhoWeServeSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-orange mb-4">Industry Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Who we serve</h2>
          <p className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            We specialize in high-growth brands and PE/VC portfolio companies
            across six core verticals. Our sweet spot: $50K+/month in ad spend
            with aggressive growth targets.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {verticals.map((v, i) => (
            <div
              key={v.name}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(5, 46, 63, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <span className="text-xs font-bold text-tt-teal tracking-wider">{v.icon}</span>
              <h3 className="text-lg font-bold text-white mt-2">{v.name}</h3>
              <p className="mt-2 text-sm text-tt-gray-500">{v.clients}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Meet your pod (NEW)                                                */
/* ------------------------------------------------------------------ */

function MeetYourPodSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-orange mb-4">Your Dedicated Team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet your pod</h2>
          <p className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            Every client gets a dedicated pod of senior specialists, not junior account managers.
            30+ people, zero generalists. Here is what your pod looks like on day one.
          </p>
        </div>

        {/* Pod Diagram */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* SVG Pod Infographic */}
          <div className="max-w-4xl mx-auto mb-12">
            <svg viewBox="0 0 800 320" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Center node - Client */}
              <circle cx="400" cy="160" r="50" fill="rgba(254, 94, 22, 0.1)" stroke="#FE5E16" strokeWidth="2" />
              <text x="400" y="155" textAnchor="middle" fill="#FE5E16" fontSize="11" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">YOUR</text>
              <text x="400" y="170" textAnchor="middle" fill="#FE5E16" fontSize="11" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">BRAND</text>

              {/* Connection lines */}
              <line x1="350" y1="140" x2="180" y2="80" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="350" y1="180" x2="180" y2="240" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="450" y1="140" x2="620" y2="80" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="450" y1="180" x2="620" y2="240" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Pod role nodes */}
              {/* Strategist - top left */}
              <circle cx="140" cy="70" r="40" fill="rgba(127, 202, 211, 0.08)" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" />
              <text x="140" y="63" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">PERFORMANCE</text>
              <text x="140" y="76" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">STRATEGIST</text>
              <text x="140" y="96" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" fontSize="8" fontFamily="DM Sans, Arial, sans-serif">Senior</text>

              {/* Creative Lead - top right */}
              <circle cx="660" cy="70" r="40" fill="rgba(127, 202, 211, 0.08)" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" />
              <text x="660" y="63" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">CREATIVE</text>
              <text x="660" y="76" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">LEAD</text>
              <text x="660" y="96" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" fontSize="8" fontFamily="DM Sans, Arial, sans-serif">Senior</text>

              {/* Media Buyer - bottom left */}
              <circle cx="140" cy="250" r="40" fill="rgba(127, 202, 211, 0.08)" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" />
              <text x="140" y="243" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">MEDIA</text>
              <text x="140" y="256" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">BUYER</text>
              <text x="140" y="276" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" fontSize="8" fontFamily="DM Sans, Arial, sans-serif">Senior</text>

              {/* Data Analyst - bottom right */}
              <circle cx="660" cy="250" r="40" fill="rgba(127, 202, 211, 0.08)" stroke="rgba(127, 202, 211, 0.3)" strokeWidth="1.5" />
              <text x="660" y="243" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">DATA</text>
              <text x="660" y="256" textAnchor="middle" fill="#7FCAD3" fontSize="9" fontWeight="700" fontFamily="DM Sans, Arial, sans-serif">ANALYST</text>
              <text x="660" y="276" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" fontSize="8" fontFamily="DM Sans, Arial, sans-serif">Mid-Senior</text>

              {/* Outer glow rings */}
              <circle cx="400" cy="160" r="130" fill="none" stroke="rgba(254, 94, 22, 0.06)" strokeWidth="1" />
              <circle cx="400" cy="160" r="185" fill="none" stroke="rgba(127, 202, 211, 0.04)" strokeWidth="1" />
            </svg>
          </div>

          {/* Role detail cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {podRoles.map((p, i) => (
              <div
                key={p.role}
                className="rounded-xl p-5 text-center"
                style={{
                  background: 'rgba(5, 46, 63, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <span className="inline-block rounded-full bg-tt-teal/10 px-3 py-1 text-xs font-semibold text-tt-teal border border-tt-teal/20 mb-3">
                  {p.level}
                </span>
                <h4 className="text-sm font-bold text-white">{p.role}</h4>
                <p className="mt-2 text-xs text-tt-gray-500 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Pod footnote */}
          <p className="text-center text-sm text-tt-gray-500 mt-8 max-w-2xl mx-auto">
            Pods scale with your program. Larger engagements add SEO specialists, lifecycle marketers, and dedicated creative producers. We are a fully remote team, based in New York.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Wayfinder AI Platform Preview (NEW)                                */
/* ------------------------------------------------------------------ */

function WayfinderPreviewSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-orange mb-4">Proprietary Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Powered by Wayfinder AI</h2>
          <p className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto long-copy">
            Wayfinder connects your entire marketing stack into one intelligence layer, using ML to surface cross-channel optimization opportunities that humans miss. Our TT AI-Tools suite adds LLM-powered creative analysis, predictive LTV modeling, and real-time bid optimization on top.
          </p>
        </div>

        {/* Abstract Dashboard Mockup */}
        <div
          ref={ref}
          className={`rounded-2xl overflow-hidden transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            background: 'rgba(5, 46, 63, 0.9)',
            border: '1px solid rgba(127, 202, 211, 0.15)',
            boxShadow: 'none',
          }}
        >
          {/* Top bar */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <div className="ml-4 flex items-center gap-2">
              <span className="text-[10px] font-semibold text-tt-teal tracking-wider">WAYFINDER</span>
              <span className="text-[10px] text-tt-gray-600">|</span>
              <span className="text-[10px] text-tt-gray-500">Cross-Channel Dashboard</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 md:p-8">
            <div className="flex gap-6">
              {/* Sidebar */}
              <div className="hidden md:block w-36 space-y-3 flex-shrink-0">
                {['Dashboard', 'Campaigns', 'Analytics', 'AI Insights', 'Settings'].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${
                      i === 0 ? 'bg-tt-teal/10 text-tt-teal' : 'text-tt-gray-600'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-tt-teal' : 'bg-tt-gray-700'}`} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="flex-1 space-y-4">
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'ROAS (illustrative)', value: '3.1x', change: '+12%', up: true },
                    { label: 'CAC', value: '$23.40', change: '-12%', up: false },
                    { label: 'Conv. Rate', value: '3.8%', change: '+7%', up: true },
                  ].map((m) => (
                    <div key={m.label} className="rounded-lg p-3" style={{ background: 'rgba(0, 0, 0, 0.14)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <p className="text-[9px] uppercase tracking-wider text-tt-gray-600">{m.label}</p>
                      <p className="mt-1 text-lg font-bold text-white">{m.value}</p>
                      <p className={`text-[11px] font-semibold ${m.up ? 'text-tt-teal' : 'text-tt-orange'}`}>{m.change}</p>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="rounded-lg p-4" style={{ background: 'rgba(0, 0, 0, 0.14)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] uppercase tracking-wider text-tt-gray-500">Cross-Channel Performance</p>
                    <p className="text-[10px] text-tt-teal">ML Optimization Active</p>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 55, 45, 65, 50, 72, 60, 80, 68, 85, 75, 92].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all duration-300"
                        style={{ height: `${h}%`, background: `rgba(127, 202, 211, ${0.4 + (h / 200)})` }}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Insight callout */}
                <div className="rounded-lg p-3 flex items-center gap-3" style={{ background: 'rgba(127, 202, 211, 0.05)', border: '1px solid rgba(127, 202, 211, 0.1)' }}>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-tt-teal/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <p className="text-xs text-tt-gray-400">
                    <span className="text-tt-teal font-semibold">AI Insight:</span> Shift 12% of Meta budget to Google NB Search. Predicted +$18K incremental revenue this month.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
          <Link
            href="/wayfinder"
            className="inline-flex items-center gap-2 text-tt-orange text-sm font-semibold hover:text-tt-orange-muted transition-colors"
          >
            Learn more about Wayfinder AI
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial Carousel (NEW)                                         */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-orange mb-4">Client Results</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">What our clients say</h2>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {clientTestimonials.map((t, i) => (
            <div
              key={t.name}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: 'rgba(5, 46, 63, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Metric badge */}
              <span className="inline-block self-start rounded-full bg-tt-teal/10 px-3 py-1 text-xs font-semibold text-tt-teal border border-tt-teal/20 mb-4">
                {t.metric}
              </span>

              <p className="text-tt-gray-300 leading-relaxed text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-xs text-tt-gray-500">{t.title}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline (dark version)                                            */
/* ------------------------------------------------------------------ */

function TimelineSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our journey</h2>
        </div>

        <div
          ref={ref}
          className={`relative transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-px bg-tt-teal/40" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative flex gap-6 md:gap-10">
                {/* Glowing dot */}
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center" style={{
                    background: 'rgba(127, 202, 211, 0.1)',
                    border: '2px solid rgba(127, 202, 211, 0.3)',
                    boxShadow: 'none',
                  }}>
                    <div className="h-3 w-3 rounded-full bg-tt-teal" style={{
                      boxShadow: 'none',
                    }} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <span className="text-sm font-bold text-tt-teal uppercase tracking-wider">
                    {m.year}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-white">{m.title}</h3>
                  <p className="mt-1 text-tt-gray-400">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Founders section                                                   */
/* ------------------------------------------------------------------ */

function FoundersSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{
      background: `
        #052E3F
      `,
    }}>
      {/* Spotlight radial behind the cards */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{
        background: 'transparent',
      }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-orange mb-4">Who leads Tiger Tracks</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Leadership
          </h2>
          <p className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            Senior operators who have built and scaled performance marketing programs
            for some of the world's largest brands.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {leaders.map((founder, i) => (
            <div
              key={founder.name}
              className="border-l-2 border-tt-orange pl-6 md:pl-8"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p className="eyebrow">{founder.title}</p>
              <h3 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">
                {founder.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {founder.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="rounded-full px-3 py-1 text-xs font-medium text-tt-gray-300 border border-white/15"
                  >
                    {cred}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-tt-gray-300 leading-relaxed text-base">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Principles section (dark glass cards)                              */
/* ------------------------------------------------------------------ */

function PrinciplesSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What drives us</h2>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-6 max-w-5xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(5, 46, 63, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent border border-tt-orange/40 mb-4">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-3 text-tt-gray-400 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center px-6 overflow-hidden" style={{
        background: `
          #052E3F
        `,
      }}>
        <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
          backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/about-atrium.webp) */,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
        }} />
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" style={{
          background: 'transparent',
        }} />
        <div className="relative z-10 mx-auto max-w-7xl w-full py-24">
          <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-6">
            OUR STORY
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Built at Google. Proven at scale.{' '}
            <br className="hidden md:block" /> Now yours.
          </h1>
          <p className="mt-8 text-xl text-tt-gray-400 max-w-3xl leading-relaxed">
            Tiger Tracks was founded in 2021 by ex-Google leaders who spent years
            managing some of the world&rsquo;s largest advertising budgets. Today,
            we&rsquo;re Inc. 5000 #123 with 2,954% revenue growth, a fully remote team of 30+ specialists,
            and a proprietary AI platform trusted by brands like AG1, Anastasia
            Beverly Hills, and Monarch Money.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/get-started"
              className="inline-block rounded-full bg-tt-orange px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-tt-orange-dark hover:-translate-y-0.5 active:translate-y-0"
            >
              Request a Strategic Diagnostic
            </Link>
            <Link
              href="/results"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(0, 0, 0, 0.14)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              View Case Studies
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Logo Trust Bar */}
      <LogoTrustBar />

      {/* Growth Stats + Featured Testimonial */}
      <GrowthSection />

      {/* Who we serve */}
      <WhoWeServeSection />

      {/* Meet your pod */}
      <MeetYourPodSection />

      {/* Wayfinder AI Preview */}
      <WayfinderPreviewSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Timeline */}
      <TimelineSection />

      {/* Founders */}
      <FoundersSection />

      {/* What drives us */}
      <PrinciplesSection />

      <CTASection
        headline="Ready to work with us?"
        subheadline="Book a free Strategic Diagnostic and see what ex-Google performance marketing can do for your brand."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        secondaryCTA={{ text: 'View Case Studies', href: '/results' }}
        dark
        badges={['Inc. 5000 #123', 'Meta Business Partner', '30+ Specialists', 'Fully Remote, NYC Based']}
      />
    </div>
  );
}
