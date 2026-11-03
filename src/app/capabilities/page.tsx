'use client';

import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { STATS } from '@/lib/stats';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Framer Motion Presets                                              */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};

const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type GrowthObjective = 'acquisition' | 'profitability' | 'retention';

interface ServiceGroup {
  id: string; // anchor id, deep-linkable from anywhere on the site
  heading: string;
  items: string[];
}

interface Capability {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  objective: GrowthObjective;
  objectiveLabel: string;
  description: string;
  extendedDescription: string;
  insiderTactic?: { title: string; detail: string };
  services?: string[];
  serviceGroups?: ServiceGroup[];
  proof: { headline: string; detail: string };
  linkLabel: string;
  linkHref: string;
  gradient: { from: string; to: string; orb: string };
  imagePlaceholder: { label: string; icon: string };
  image: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const objectiveLabels: Record<GrowthObjective, { label: string; color: string }> = {
  acquisition: { label: 'Customer Acquisition', color: '#7FCAD3' },
  profitability: { label: 'Scaling Profitability', color: '#D3E3A0' },
  retention: { label: 'Retention & LTV', color: '#EFF0EF' },
};

const capabilities: Capability[] = [
  {
    id: 'media-buying',
    number: '01',
    title: 'Full-Funnel Demand Generation',
    shortTitle: 'Demand Gen',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'Acquire customers at scale while maintaining unit economics. We run paid media with proprietary AI bidding models that adapt in real time to maximize your LTV/CAC ratio.',
    extendedDescription:
      'Most agencies treat media buying as a commodity: set budgets, pick audiences, let the algorithm run. We treat it as applied data science. Our founder spent years inside Google’s ads business working with its largest advertisers. We combine that insider knowledge with proprietary bid optimization models that analyze thousands of signals per auction.',
    insiderTactic: {
      title: 'Ex-Google Insider Advantage',
      detail:
        'We deploy Alpha/Beta campaign architecture (exact-match "alpha" campaigns siphon proven converters from broad-match "beta" campaigns), Quality Score engineering that lowers CPCs before a single bid change, and proprietary auction-time signal layering. On YouTube, we leverage TrueView for Action sequencing and custom intent audiences built from Search query data.',
    },
    serviceGroups: [
      {
        id: 'paid-search',
        heading: 'Paid Search',
        items: [
          'Paid Search with Alpha/Beta architecture (Google, Bing, Apple Search Ads)',
          'Quality Score engineering and auction-time signal layering',
        ],
      },
      {
        id: 'paid-social',
        heading: 'Paid Social',
        items: [
          'Full-funnel builds across Meta, TikTok, Pinterest, Snapchat, and Reddit',
          'Creative-led audience expansion and scaling strategy',
        ],
      },
      {
        id: 'programmatic',
        heading: 'Programmatic',
        items: [
          'Programmatic & Display (DV360, The Trade Desk)',
          'YouTube TrueView for Action and demand gen campaigns',
          'Connected TV and Streaming Audio',
        ],
      },
      {
        id: 'retail',
        heading: 'Retail',
        items: [
          'Amazon Ads: Sponsored Products, Sponsored Brands, Display, and DSP',
          'Walmart Connect, Target Roundel, Instacart, Criteo',
          'Digital shelf optimization: PDP content, ratings, availability',
          'Product feed optimization',
          'Incrementality measurement and branded-term hygiene',
        ],
      },
    ],
    proof: {
      headline: 'AG1: +51% monthly acquired customers, -5% CAC YoY',
      detail:
        'Grew monthly acquired customers while holding CAC through creative diversification and audience expansion.',
    },
    linkLabel: 'See the AG1 case study',
    linkHref: '/results/ag1-meta',
    gradient: { from: '#7FCAD3', to: '#052E3F', orb: '#FE5E16' },
    imagePlaceholder: { label: 'Campaign Performance Dashboard', icon: 'chart-bar' },
    image: '/images/media-buying-dashboard-brand.png',
  },
  {
    id: 'creative',
    number: '02',
    title: 'Performance Creative That Converts',
    shortTitle: 'Creative',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'Turn creative from a cost center into your highest-leverage growth driver. We produce channel-ready creative at volume, each asset designed to lower CAC and scale winning concepts.',
    extendedDescription:
      'Creative is the single biggest lever in paid media, yet most agencies separate creative from performance. We don\'t. From content strategy and educational video to creator and influencer programs, creative here is built to perform, not just to look the part.',
    serviceGroups: [
      {
        id: 'creative-strategy',
        heading: 'Content Strategy',
        items: [
          'Content strategy and editorial programs',
          'Brand-to-Performance Creative Strategy',
          'Structured creative testing programs (A/B and multivariate)',
          'AI-assisted concepting and iteration',
        ],
      },
      {
        id: 'production',
        heading: 'Production',
        items: [
          'Image and video ad creative (static, motion, full production)',
          'Educational and explainer video',
          'Short-form video (TikTok, Reels, Shorts)',
        ],
      },
      {
        id: 'ugc',
        heading: 'UGC',
        items: [
          'UGC and creator content with paid allowlisting',
          'Creator sourcing, briefs, and rights management',
        ],
      },
      {
        id: 'influencer',
        heading: 'Influencer',
        items: [
          'Influencer strategy, sourcing, and negotiation',
          'Campaign management and whitelisting',
          'Measured on revenue contribution, not follower counts',
        ],
      },
    ],
    proof: {
      headline: 'Anastasia Beverly Hills: +22% Meta ROAS',
      detail:
        'A UGC-first TikTok strategy lifted demand across channels, driving a 22% Meta ROAS improvement.',
    },
    linkLabel: 'See the ABH case study',
    linkHref: '/results/anastasia-beverly-hills',
    gradient: { from: '#FE5E16', to: '#FE5E16', orb: '#7FCAD3' },
    imagePlaceholder: { label: 'Creative Testing Matrix', icon: 'sparkles' },
    image: '/images/creative-ugc-phone-mockup-brand.png',
  },
  {
    id: 'website-cro',
    number: '03',
    title: 'Conversion & Revenue Optimization',
    shortTitle: 'CRO',
    objective: 'profitability',
    objectiveLabel: 'Scaling Profitability',
    description:
      'A 10% lift in conversion rate has the same P&L impact as a 10% reduction in media cost. We find and fix the highest-value friction points so every dollar of traffic works harder.',
    extendedDescription:
      'Our team runs continuous experimentation programs, combining quantitative analytics with qualitative user research to deliver compounding gains. We measure impact in revenue, not just statistical significance.',
    serviceGroups: [
      {
        id: 'web-design-dev',
        heading: 'Website Design & Development',
        items: [
          'Full site builds and redesigns (Shopify, custom)',
          'Landing page design and development',
          'Post-purchase experience design',
        ],
      },
      {
        id: 'ab-testing',
        heading: 'A/B Testing',
        items: [
          'Landing page A/B and multivariate testing',
          'Conversion rate optimization programs',
          'Checkout flow optimization',
          'Heatmap and session recording analysis',
        ],
      },
    ],
    proof: {
      headline: 'Online Labels: +37% AOV, +41% Conversion Rate',
      detail:
        'Systematic testing program across PDP and checkout flow delivered compounding gains over 6 months.',
    },
    linkLabel: 'See the Online Labels case study',
    linkHref: '/results/online-labels',
    gradient: { from: '#7FCAD3', to: '#7FCAD3', orb: '#FE5E16' },
    imagePlaceholder: { label: 'Funnel Conversion Heatmap', icon: 'cursor-arrow-rays' },
    image: '/images/ab-testing-browser-mockup-brand.png',
  },
  {
    id: 'analytics',
    number: '04',
    title: 'LTV/CAC Optimization & Measurement',
    shortTitle: 'Analytics',
    objective: 'profitability',
    objectiveLabel: 'Scaling Profitability',
    description:
      'You can\'t scale profitably if you can\'t measure profitably. We build the attribution and measurement infrastructure most agencies skip.',
    extendedDescription:
      'The measurement layer boards and CFOs can act on: LLM-powered media mix modeling, deduplicated attribution, and channel-level LTV that unlocks channel-level CAC targets. In a post-iOS 14 world, measurement is broken for most brands. We fix it.',
    insiderTactic: {
      title: 'Ex-Google Insider Advantage',
      detail:
        'Our ex-Google leadership understands how Google\'s conversion modeling, data-driven attribution, and consent mode work under the hood. We configure enhanced conversions and server-side tagging at a level of precision most agencies can\'t match.',
    },
    serviceGroups: [
      {
        id: 'mmm',
        heading: 'MMM',
        items: [
          'Media mix modeling powered by LLMs',
          'Incrementality testing',
          'Channel-level LTV and CAC targets',
        ],
      },
      {
        id: 'attribution',
        heading: 'Attribution',
        items: [
          'Multi-touch, deduplicated attribution modeling',
          'Analytics setup and server-side tracking',
        ],
      },
      {
        id: 'reporting',
        heading: 'Reporting',
        items: [
          'Dashboard and reporting infrastructure',
          'Board and CFO-ready measurement narratives',
        ],
      },
      {
        id: 'data-architecture',
        heading: 'Data Architecture',
        items: [
          'Data warehouse and integration architecture',
          'CDP and customer data layer design',
        ],
      },
    ],
    proof: {
      headline: 'AG1: -31% Brand Search CAC via attribution audit',
      detail:
        'An attribution audit found Brand Search overspend. Reallocating it cut Brand Search CAC by 31% and freed budget for incremental growth.',
    },
    linkLabel: 'See the AG1 case study',
    linkHref: '/results/ag1-brand-search',
    gradient: { from: '#7FCAD3', to: '#7FCAD3', orb: '#FE5E16' },
    imagePlaceholder: { label: 'Attribution Model Architecture', icon: 'chart-pie' },
    image: '/images/scatter-plot-data-viz-brand.png',
  },
  {
    id: 'organic-growth',
    number: '05',
    title: 'Organic & AI-Search Visibility',
    shortTitle: 'Organic',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'Be found where your customers are looking, including AI-powered search engines. We\'re pioneering Generative Engine Optimization to future-proof your organic visibility.',
    extendedDescription:
      'Search is fragmenting: Google, TikTok, Amazon, ChatGPT, Perplexity. Gartner projects traditional search volume down 25% by 2026. We build organic strategies that work across all of them, and we make sure the engines answering are citing you.',
    serviceGroups: [
      {
        id: 'organic-social',
        heading: 'Social',
        items: [
          'Channel strategy and brand voice systems',
          'Always-on publishing and community management',
          'Platform-native programming and distribution',
          'Social search and discovery optimization',
          'Reporting tied to traffic, conversions, and revenue',
        ],
      },
      {
        id: 'seo',
        heading: 'SEO',
        items: [
          'Technical and content SEO',
          'SEO-aligned content production',
          'Local SEO and Google Business Profile',
        ],
      },
      {
        id: 'geo-aeo',
        heading: 'GEO/AEO',
        items: [
          'Generative engine optimization for AI answer engines',
          'AI search monitoring across platforms',
        ],
      },
      {
        id: 'aso',
        heading: 'ASO',
        items: [
          'App store optimization (listings, creative, keyword strategy)',
        ],
      },
    ],
    proof: {
      headline: 'Pioneering GEO intelligence for AI-era visibility',
      detail:
        'Our proprietary GEO monitoring tracks brand mentions across the major AI answer engines, informing content strategy that drives measurable AI referral traffic.',
    },
    linkLabel: 'Read our GEO intelligence',
    linkHref: '/intelligence',
    gradient: { from: '#052E3F', to: '#052E3F', orb: '#7FCAD3' },
    imagePlaceholder: { label: 'AI Search Visibility Map', icon: 'globe-alt' },
    image: '/images/network-connection-map-brand.png',
  },
  {
    id: 'lifecycle',
    number: '06',
    title: 'Lifecycle That Makes Every Customer Worth More',
    shortTitle: 'Lifecycle',
    objective: 'retention',
    objectiveLabel: 'Retention & LTV',
    description:
      'Lifecycle is the cheapest growth. Keeping and expanding a customer beats acquiring a new one, and it moves without touching the media budget.',
    extendedDescription:
      'On top of whatever ESP or lifecycle platform you already run, we layer an AI lifecycle engine that predicts churn risk and next-best-action at the individual level, so the right save, win-back, or cross-sell message fires at the right moment instead of everyone getting the same Tuesday blast. The engine optimizes send-time, channel, cadence, and offer per user, then continuously reallocates toward what is actually retaining and expanding customers. We measure it on LTV, not opens.',
    serviceGroups: [
      {
        id: 'email-sms',
        heading: 'Email & SMS',
        items: [
          'Email and SMS strategy and execution',
          'The four fastest lifecycle wins, built first: onboarding, churn-save, win-back, cross-sell',
          'Send-time, channel, cadence, and offer optimization per user',
        ],
      },
      {
        id: 'crm',
        heading: 'CRM',
        items: [
          'API integration with your existing ESP and CDP, no migration: an intelligence layer, not a replatform',
          'Salesforce Marketing Cloud, Adobe, Braze, Iterable, and Klaviyo, plus Segment, mParticle, and Salesforce Data Cloud underneath',
          'Subscription, loyalty, and post-purchase flows',
        ],
      },
      {
        id: 'personalization',
        heading: 'Personalization',
        items: [
          'AI churn prediction and next-best-action / next-best-offer modeling',
          'Behavioral segmentation and individual-level personalization',
          'LTV-measured program optimization and continuous reallocation',
        ],
      },
    ],
    proof: {
      headline: 'Lifecycle measured in lifetime value',
      detail:
        'Data-driven segmentation and trigger-based flows are built and reported against customer lifetime value, not open rates.',
    },
    linkLabel: 'Start the conversation',
    linkHref: '/get-started',
    gradient: { from: '#FE5E16', to: '#FE5E16', orb: '#7FCAD3' },
    imagePlaceholder: { label: 'Cohort LTV Curves', icon: 'arrow-trending-up' },
    image: '/images/lifecycle-journey-visualization-brand.png',
  },
  {
    id: 'partnerships',
    number: '07',
    title: 'Growth Ecosystem & PE/VC Acceleration',
    shortTitle: 'Partners',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'We don\'t just run ads. We build growth ecosystems that connect brands, investors, and platforms into mutually reinforcing relationships.',
    extendedDescription:
      'Our PE/VC practice is unique in the agency world. We work directly with fund operating partners to accelerate portfolio company growth, starting every engagement with an audit-led diagnostic.',
    services: [
      'Audit-Led Sales Motions for PE/VC Portfolios',
      'Referral & Partner Ecosystems',
      'Capability-Led Partner Programs',
      'Co-Marketing & Joint Ventures',
      'Platform Beta Programs & Strategic Partnerships',
      'Investor Relations Marketing Support',
    ],
    proof: {
      headline: 'Audit first, then scope',
      detail:
        'Our audit-first approach builds trust. Portfolio companies start with one channel and expand only where the numbers support it.',
    },
    linkLabel: 'Learn about our PE/VC practice',
    linkHref: '/pe-vc',
    gradient: { from: '#052E3F', to: '#052E3F', orb: '#FE5E16' },
    imagePlaceholder: { label: 'Portfolio Growth Network', icon: 'users' },
    image: '/images/project-timeline-ui-brand.png',
  },
];

const outcomes = [
  { title: 'Acquisition Efficiency', stat: 'CAC', statLabel: 'cost per acquisition', description: 'Sustained downward pressure on cost-per-acquisition through continuous optimization and creative iteration.' },
  { title: 'Incremental Revenue', stat: 'iROAS', statLabel: 'incremental return', description: 'Attributable revenue validated through incrementality testing, not just platform-reported ROAS.' },
  { title: 'Conversion Yield', stat: 'CVR', statLabel: 'conversion rate', description: 'Measurable lifts to conversion rate, AOV, and funnel efficiency through structured testing.' },
  { title: 'Lifetime Value', stat: 'LTV', statLabel: 'lifetime value', description: 'LTV:CAC ratio improvements from segmented lifecycle and retention programs that drive EBITDA alignment.' },
  { title: 'Budget Acceleration', stat: 'Spend', statLabel: 'scaled on efficiency', description: 'Budget scales only when efficiency holds, so every added dollar is earning its place.' },
  { title: 'Recurring Revenue', stat: 'MRR', statLabel: 'recurring revenue', description: 'For subscription and recurring-revenue businesses, we report against the revenue line the board watches.' },
];

const tiers = [
  { name: 'Enterprise', spend: '$1M-$5M/mo ad spend', revenue: '$250M-$2B revenue', description: 'Multi-channel, multi-market strategies with dedicated senior team and custom reporting.', highlighted: true },
  { name: 'Growth-Stage', spend: '$500K-$1M/mo', revenue: '$50M-$250M revenue', description: 'Scaling proven channels while expanding into new acquisition and retention vectors.', highlighted: true },
  { name: 'Mid-Market', spend: '$100K-$500K/mo', revenue: 'Scaling proven channels', description: 'Optimizing core channels and building the measurement infrastructure for scale.', highlighted: false },
  { name: 'Emerging', spend: 'Under $100K/mo', revenue: 'Building the playbook', description: 'We design the repeatable growth playbook and prioritize the highest-ROI channels first.', highlighted: false },
];

const timelinePhases = [
  {
    period: '30 Days',
    title: 'Audit & Foundation',
    items: [
      'Comprehensive channel audit with scored findings',
      'Baseline performance report across all active platforms',
      'Tracking & attribution health check (GA4, pixels, CAPI)',
      'Competitive landscape analysis with share-of-voice data',
      'Strategic roadmap with prioritized quick-wins',
      'First optimizations launched from audit findings',
    ],
  },
  {
    period: '60 Days',
    title: 'Optimization & Testing',
    items: [
      'Restructured campaigns (Alpha/Beta architecture for Search)',
      'First creative testing sprint: 15-20 ad variants in-market',
      'Landing page test plan with 2-3 live experiments',
      'Audience segmentation build across paid channels',
      'Weekly performance dashboard with annotated insights',
      'Bi-weekly strategy calls with your dedicated team',
    ],
  },
  {
    period: '90 Days',
    title: 'Scale & Compound',
    items: [
      'First measurable uplift report: KPIs vs. baseline',
      'Winning creative scaled, losing creative cut (data report)',
      'Channel expansion recommendation with projected ROI',
      'Attribution model v1 deployed and validated',
      'Lifecycle/retention program design (if in scope)',
      '90-day performance review + next quarter growth plan',
    ],
  },
  {
    period: '6 Months',
    title: 'Compounding Growth',
    items: [
      'Cross-channel compounding effects visible',
      'New channel expansion underway',
      'Lifecycle programs driving repeat revenue',
      'Attribution model refined & trusted',
    ],
  },
  {
    period: '12 Months',
    title: 'Full Scale',
    items: [
      'Full-funnel integration delivering compound growth',
      'Managed budget scaled with efficiency gains',
      'LTV and retention metrics at new highs',
      'Strategic partnership fully embedded',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Image Placeholder Component                                        */
/* ------------------------------------------------------------------ */

function ServiceImage({ src, label, gradient }: { src: string; label: string; gradient: { from: string; to: string } }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden group/img"
      style={{ aspectRatio: '16 / 9' }}
    >
      {/* Real image */}
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky Sub-Navigation                                              */
/* ------------------------------------------------------------------ */

function ServiceSubNav({ activeId }: { activeId: string }) {
  return (
    <nav className="sticky top-[72px] z-40 bg-tt-gray-900/90 backdrop-blur-md border-b border-tt-gray-700/50">
      <div className="mx-auto max-w-7xl px-6 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 py-3 min-w-max">
          {capabilities.map((cap) => (
            <a
              key={cap.id}
              href={`#${cap.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeId === cap.id
                  ? 'bg-tt-teal/20 text-tt-teal'
                  : 'text-tt-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cap.shortTitle}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero with Glassmorphism Stat Cards                     */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.15 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 800); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
        backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/services-hero.webp) */,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
      }} />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40"
      >
        <motion.p variants={fadeUp} transition={transition} className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-6">
          Capabilities
        </motion.p>
        <motion.h1 variants={fadeUp} transition={transition} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
          Acquire. Scale profitably.{' '}
          <br className="hidden md:block" />
          Retain. Repeat.
        </motion.h1>
        <motion.p variants={fadeUp} transition={transition} className="mt-6 text-xl text-tt-gray-400 max-w-3xl leading-relaxed">
          Seven capabilities organized around three growth objectives. Each layer
          compounds the impact of the others. Built by ex-Google leaders who know
          the systems from the inside.
        </motion.p>

        {/* Growth Objective Pills */}
        <motion.div variants={fadeUp} transition={transition} className="mt-8 flex flex-wrap gap-3">
          {Object.entries(objectiveLabels).map(([key, { label, color }]) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
              style={{ borderColor: `${color}40`, color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Hero Stats in Glassmorphism Cards */}
        <motion.div variants={fadeUp} transition={transition} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '+46%', label: 'Site CVR, national broadband provider' },
            { value: '+51%', label: 'Customers YoY, AG1' },
            { value: '2,954%', label: '3-year growth (Inc. 5000)' },
            { value: '#123', label: 'Inc. 5000 ranking' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(0, 0, 0, 0.14)',
                backdropFilter: 'blur(20px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: 'none',
              }}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 - Sticky Scroll Capability Areas                         */
/* ------------------------------------------------------------------ */

function CapabilitySection({ capability, index }: { capability: Capability; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;
  const objStyle = objectiveLabels[capability.objective];

  return (
    <section
      id={capability.id}
      className="relative border-t border-white/[0.04]"
      style={{
        scrollMarginTop: '120px',
        background: `
          #052E3F
        `,
      }}
    >
      <div ref={ref} className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* ---- LEFT COLUMN: Sticky ---- */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={staggerContainer}
              >
                {/* Objective badge */}
                <motion.div variants={fadeUp} transition={transition}>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
                    style={{
                      backgroundColor: `${objStyle.color}12`,
                      color: objStyle.color,
                      border: `1px solid ${objStyle.color}25`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: objStyle.color }} />
                    {capability.objectiveLabel}
                  </span>
                </motion.div>

                {/* Large number */}
                <motion.p
                  variants={fadeUp}
                  transition={transition}
                  className="text-[7rem] md:text-[9rem] font-extrabold leading-none select-none -ml-2"
                  style={{ color: 'rgba(239, 240, 239, 0.08)' }}
                  aria-hidden="true"
                >
                  {capability.number}
                </motion.p>

                {/* Title */}
                <motion.h2 variants={fadeUp} transition={transition} className="text-3xl md:text-4xl font-bold text-white tracking-tight -mt-4">
                  {capability.title}
                </motion.h2>

                {/* Description */}
                <motion.p variants={fadeUp} transition={transition} className="mt-5 text-lg text-tt-gray-400 leading-relaxed">
                  {capability.description}
                </motion.p>

                <motion.p variants={fadeUp} transition={transition} className="mt-4 text-base text-tt-gray-500 leading-relaxed">
                  {capability.extendedDescription}
                </motion.p>

                {/* Ex-Google Insider Tactic callout */}
                {capability.insiderTactic && (
                  <motion.div
                    variants={fadeUp}
                    transition={transition}
                    className="mt-8 rounded-r-lg border-l-2 border-tt-orange bg-black/[0.14] p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.82 4.82L10 13.27l-4.32 2.23.82-4.82L3 7.27l4.91-1.01L10 2z" fill="#FE5E16" />
                      </svg>
                      <p className="text-xs font-bold uppercase tracking-[2px] text-tt-orange">
                        {capability.insiderTactic.title}
                      </p>
                    </div>
                    <p className="text-tt-gray-300 text-sm leading-relaxed">
                      {capability.insiderTactic.detail}
                    </p>
                  </motion.div>
                )}

                {/* CTA Link */}
                <motion.div variants={fadeUp} transition={transition}>
                  <Link
                    href={capability.linkHref}
                    className="mt-8 inline-flex items-center gap-2 text-tt-orange font-semibold transition-colors hover:text-white group"
                  >
                    {capability.linkLabel}
                    <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* ---- RIGHT COLUMN: Scrolling content ---- */}
          <div className="md:col-span-8">
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* 16:9 Service Image */}
              <motion.div variants={scaleIn} transition={transition}>
                <ServiceImage
                  src={capability.image}
                  label={capability.imagePlaceholder.label}
                  gradient={capability.gradient}
                />
              </motion.div>

              {/* Services List */}
              <motion.div variants={fadeUp} transition={transition}>
                <h3 className="text-xs font-semibold uppercase tracking-[3px] text-tt-teal mb-5">
                  What this includes
                </h3>
                {capability.serviceGroups ? (
                  <div className="space-y-8">
                    {capability.serviceGroups.map((group) => (
                      <div key={group.id} id={group.id} style={{ scrollMarginTop: '120px' }}>
                        <h4 className="text-sm font-bold uppercase tracking-[2px] text-tt-teal mb-3">
                          {group.heading}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {group.items.map((service, i) => (
                            <motion.div
                              key={service}
                              variants={fadeUp}
                              transition={{ ...transition, delay: i * 0.05 }}
                              className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.03]"
                              style={{ border: '1px solid rgba(255, 255, 255, 0.04)' }}
                            >
                              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tt-teal/60" />
                              <span className="text-sm text-tt-gray-300 leading-relaxed">{service}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(capability.services ?? []).map((service, i) => (
                      <motion.div
                        key={service}
                        variants={fadeUp}
                        transition={{ ...transition, delay: i * 0.05 }}
                        className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.03]"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.04)' }}
                      >
                        <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tt-teal/60" />
                        <span className="text-sm text-tt-gray-300 leading-relaxed">{service}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Proof Point - Bento Card with orange left border */}
              <motion.div variants={fadeUp} transition={transition}>
                <div
                  className="rounded-xl border-l-4 border-l-tt-orange p-6 transition-all duration-300 hover:bg-white/[0.03]"
                  style={{
                    background: 'rgba(5, 46, 63, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderLeft: '4px solid #FE5E16',
                    boxShadow: 'none',
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-[2px] text-tt-teal mb-3">
                    Proof Point
                  </p>
                  <p className="text-white font-semibold text-lg leading-snug mb-2">
                    {capability.proof.headline}
                  </p>
                  <p className="text-tt-gray-400 text-sm leading-relaxed">
                    {capability.proof.detail}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Outcomes Framework                                     */
/* ------------------------------------------------------------------ */

function OutcomesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section id="measure" className="py-24 px-6 border-t border-white/[0.04] scroll-mt-24" style={{
      background: `#052E3F`,
    }}>
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} transition={transition} className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-4">
            Outcomes
          </motion.p>
          <motion.h2 variants={fadeUp} transition={transition} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            How we measure success
          </motion.h2>
          <motion.p variants={fadeUp} transition={transition} className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            Every engagement is measured against outcomes that matter to your P&L, not vanity metrics.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {outcomes.map((outcome) => (
            <motion.div
              key={outcome.title}
              variants={scaleIn}
              transition={transition}
              className="glass-card p-6 card-shimmer"
            >
              <div className="mb-4">
                <AnimatedCounter value={outcome.stat} label={outcome.statLabel} className="text-left" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {outcome.title}
              </h3>
              <p className="text-tt-gray-400 text-sm leading-relaxed">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 - Client Tiers (Card Grid with Orange Glow)              */
/* ------------------------------------------------------------------ */

function ClientTiersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="py-24 px-6 border-t border-white/[0.04]" style={{
      background: `#052E3F`,
    }}>
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} transition={transition} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            We work with brands that{' '}
            <br className="hidden md:block" />
            prioritize measurable growth
          </motion.h2>
          <motion.p variants={fadeUp} transition={transition} className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            From emerging DTC brands to enterprise portfolios, we tailor our approach to your stage and scale.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={scaleIn}
              transition={transition}
              className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
              style={{
                background: tier.highlighted
                  ? 'rgba(254, 94, 22, 0.04)'
                  : 'rgba(5, 46, 63, 0.5)',
                backdropFilter: 'blur(12px)',
                border: tier.highlighted
                  ? '1px solid rgba(254, 94, 22, 0.25)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: tier.highlighted
                  ? 'none'
                  : '0 8px 32px rgba(0, 0, 0, 0.2)',
              }}
            >
              {tier.highlighted && (
                <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[2px] text-tt-teal bg-transparent px-3 py-1 rounded-full">
                  Ideal Fit
                </span>
              )}
              <h3 className="font-bold text-lg text-white mb-3">{tier.name}</h3>
              <p className="text-tt-teal font-semibold mb-1">{tier.spend}</p>
              <p className="text-sm text-tt-gray-400 mb-3">{tier.revenue}</p>
              <p className="text-sm text-tt-gray-500 leading-relaxed">{tier.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Glowing Vertical Timeline                              */
/* ------------------------------------------------------------------ */

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.05 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="py-24 px-6 border-t border-white/[0.04]" style={{
      background: `#052E3F`,
    }}>
      <div ref={ref} className="mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} transition={transition} className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-4">
            YOUR FIRST YEAR
          </motion.p>
          <motion.h2 variants={fadeUp} transition={transition} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            What success looks like
          </motion.h2>
          <motion.p variants={fadeUp} transition={transition} className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            Every engagement begins with a structured onboarding that delivers measurable results within the first quarter, then compounds.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          {/* Vertical Line */}
          <div
            className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px"
            style={{
              background: 'rgba(94, 119, 129, 0.5)',
            }}
          />

          <div className="space-y-12">
            {timelinePhases.map((phase, i) => (
              <motion.div
                key={phase.period}
                variants={fadeUp}
                transition={{ ...transition, delay: i * 0.12 }}
                className="relative pl-14 md:pl-16"
              >
                {/* Glowing Orange Dot */}
                <div className="absolute left-0 top-1 flex items-center justify-center">
                  {/* Outer glow ring */}
                  <div
                    className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full animate-glow-orange"
                    style={{
                      background: 'transparent',
                    }}
                  />
                  {/* Dot */}
                  <div
                    className="relative w-[10px] h-[10px] rounded-full z-10"
                    style={{
                      backgroundColor: '#FE5E16',
                      boxShadow: 'none',
                    }}
                  />
                </div>

                {/* Content card */}
                <div
                  className="rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 card-shimmer"
                  style={{
                    background: 'rgba(5, 46, 63, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-tt-orange font-bold text-lg">{phase.period}</span>
                    <span className="h-px flex-1 bg-black/[0.14]" />
                    <span className="text-white font-semibold text-sm">{phase.title}</span>
                  </div>

                  <ul className="space-y-2.5">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-tt-gray-400">
                        <svg className="mt-0.5 flex-shrink-0 w-4 h-4 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 - SEEEN Interactive Video Commerce                       */
/* ------------------------------------------------------------------ */

function SeenCommerceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.15 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="py-24 px-6 border-t border-white/[0.04]" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} transition={transition} className="text-center mb-16">
            <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-4">
              Strategic Partnership
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-4xl mx-auto">
              Turn video engagement into immediate commerce.
            </h2>
            <p className="mt-6 text-lg text-tt-gray-400 max-w-3xl mx-auto leading-relaxed">
              Through our strategic partnership with SEEEN plc, we transform passive video consumption into shoppable, high-converting assets. Stop losing users between the view and the checkout.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={transition} className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3 text-left">
            {[
              { k: 'Watch', t: 'Products tagged inside the video your audience already watches.' },
              { k: 'Tap', t: 'Shoppers act in the moment, without leaving the content.' },
              { k: 'Measure', t: 'Video engagement tied to the conversions it drives.' },
            ].map((step) => (
              <div key={step.k} className="border-l-2 border-tt-orange pl-5 py-2">
                <p className="font-display text-xl font-bold text-white">{step.k}</p>
                <p className="mt-2 text-sm text-tt-gray-300 leading-relaxed">{step.t}</p>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} transition={transition} className="mt-10 text-center">
            <a
              href="https://newsbywire.com/seeen-plc-and-tiger-tracks-llc-announce-strategic-partnership-to-bring-interactive-video-commerce-to-performance-marketing/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Read the partnership announcement &rarr;
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Assembly                                                      */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(capabilities[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    capabilities.forEach((cap) => {
      const el = document.getElementById(cap.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveService(cap.id);
          }
        },
        { threshold: 0.15, rootMargin: '-120px 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div>
      <HeroSection />

      <ServiceSubNav activeId={activeService} />

      {capabilities.map((cap, i) => (
        <CapabilitySection key={cap.id} capability={cap} index={i} />
      ))}

      <OutcomesSection />
      <ClientTiersSection />
      <TimelineSection />
      <SeenCommerceSection />

      <CTASection
        headline="Let's build your growth engine"
        subheadline="Book a free Strategic Diagnostic and see exactly where your revenue is leaking."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        secondaryCTA={{ text: 'View Case Studies', href: '/results' }}
        dark
      />
    </div>
  );
}
