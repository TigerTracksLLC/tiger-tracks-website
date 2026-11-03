export interface TimelineDataPoint {
  label: string;
  value: number;
}

export interface CaseStudy {
  slug: string;
  client: string;
  heroMetric: string;
  heroMetricLabel: string;
  category: string;
  channels: string[];
  industry: string;
  challengeType: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  results: { metric: string; value: string; metricType?: 'cac' | 'ltv' | 'roas' | 'revenue' | 'leads' | 'efficiency' }[];
  wayfinderTactic: { title: string; description: string };
  attribution: string;
  timeline: { before: TimelineDataPoint[]; after: TimelineDataPoint[] };
  testimonial?: { quote: string; name: string; title: string; company: string };
  logoPlaceholder: string;
  heroImage?: string;
  isPlaceholder?: boolean;
}

export const challengeTypes = [
  'All Challenges',
  'Lowering CAC',
  'Scaling Spend',
  'Improving ROAS',
  'Channel Diversification',
  'Account Restructure',
  'Full-Funnel Build',
] as const;

export const industryFilters = [
  'All Industries',
  'DTC',
  'E-Commerce',
  'Finance',
  'Health',
  'Beauty',
  'Telecom',
  'Real Estate',
  'B2C',
  'SaaS',
  'B2B',
  'PE Portfolio',
] as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: 'national-broadband-provider',
    client: 'National Broadband Provider',
    heroMetric: '+46%',
    heroMetricLabel: 'Website Conversion Rate (CVR)',
    category: 'Broadband & Telecom / Full-Funnel',
    channels: ['Multi-Channel'],
    industry: 'Telecom',
    challengeType: 'Full-Funnel Build',
    summary:
      'Website conversion rate up 46%, purchases up 32%, and revenue up 15% for a national broadband provider, with average organic Google ranking up 21 positions.',
    problem:
      'A national broadband provider faced the two problems every subscription enterprise knows: site traffic trending down and a website conversion rate that would not move. The funnel leaked at every stage, organic visibility was eroding, and e-commerce was underweighted as a share of sales.',
    solution:
      'We took over site optimization and organic growth inside the provider\'s own accounts and tools. Compounding CRO waves restructured the purchase funnel while targeting, creative, and messaging were rebuilt around what actually converts, and the organic program recovered visibility across the terms that matter.',
    impact:
      'Website conversion rate rose 46%, purchases rose 32%, and revenue rose 15%, with average organic ranking on Google\'s results page up 21 positions. An engagement that began in two test markets expanded to the provider\'s entire national footprint within six months.',
    results: [
      { metric: 'Website Conversion Rate (CVR)', value: '+46%', metricType: 'efficiency' },
      { metric: 'Purchases', value: '+32%', metricType: 'leads' },
      { metric: 'Revenue', value: '+15%', metricType: 'revenue' },
      { metric: 'Avg Google Ranking Positions', value: '+21', metricType: 'efficiency' },
    ],
    wayfinderTactic: {
      title: 'Compounding CRO Waves',
      description: 'Structured optimization waves shipped week over week, each wave informed by the last, so conversion gains stacked instead of plateauing.',
    },
    attribution: 'Measured inside the client\'s own analytics stack: conversion rate indexed against pre-engagement baseline, organic rankings tracked across the priority keyword set.',
    timeline: {
      before: [
        { label: 'Q1', value: 97 },
        { label: 'Q2', value: 99 },
        { label: 'Q3', value: 98 },
        { label: 'Q4', value: 100 },
      ],
      after: [
        { label: 'M1', value: 118 },
        { label: 'M2', value: 129 },
        { label: 'M4', value: 138 },
        { label: 'M6', value: 146 },
      ],
    },
    logoPlaceholder: 'NBP',
  },
  {
    slug: 'national-broadband-provider-paid-media',
    client: 'National Broadband Provider',
    heroMetric: '+81%',
    heroMetricLabel: 'Purchases YoY on Meta (CPA -50%)',
    category: 'Broadband & Telecom / Paid Media',
    channels: ['Google', 'Meta'],
    industry: 'Telecom',
    challengeType: 'Lowering CAC',
    summary:
      'Purchases up 81% YoY on Meta with CPA down 50%, and up 32% YoY on Google Ads with CPA down 27%, for a national broadband provider.',
    problem:
      'Paid media efficiency was being held back by wasted spend in non-serviceable areas and inaccurate purchase tracking. CPAs were inflated, and the team lacked confidence in where to scale because the measurement itself could not be trusted.',
    solution:
      'We tightened targeting to eliminate non-serviceable demand, implemented rigorous keyword management with ongoing query controls to cut inefficient spend, and ran frequent tCPA optimizations across campaigns to stabilize efficiency while scaling. In parallel, we fixed the purchase tracking and pixel issues so every optimization decision ran on accurate data.',
    impact:
      'Purchases grew 32% year over year on Google Ads while CPA fell 27%, and grew 81% year over year on Meta while CPA fell 50%. Volume and efficiency improved together instead of trading off.',
    results: [
      { metric: 'Purchases YoY (Meta)', value: '+81%', metricType: 'leads' },
      { metric: 'CPA (Meta)', value: '-50%', metricType: 'cac' },
      { metric: 'Purchases YoY (Google Ads)', value: '+32%', metricType: 'leads' },
      { metric: 'CPA (Google Ads)', value: '-27%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Serviceability-First Targeting',
      description: 'Query controls and geo targeting excluded demand the provider could not serve, so every dollar competed only where a sale was possible.',
    },
    attribution: 'Measured inside the client\'s own ad accounts after restoring purchase tracking accuracy; purchases and CPA compared year over year per platform.',
    timeline: {
      before: [
        { label: 'Q1', value: 96 },
        { label: 'Q2', value: 100 },
        { label: 'Q3', value: 98 },
        { label: 'Q4', value: 100 },
      ],
      after: [
        { label: 'M1', value: 112 },
        { label: 'M2', value: 126 },
        { label: 'M4', value: 152 },
        { label: 'M6', value: 181 },
      ],
    },
    logoPlaceholder: 'NBP',
  },
  {
    slug: 'national-broadband-provider-creative',
    client: 'National Broadband Provider',
    heroMetric: '+21%',
    heroMetricLabel: 'More Purchases per Dollar of Spend',
    category: 'Broadband & Telecom / Creative',
    channels: ['Meta', 'Multi-Channel'],
    industry: 'Telecom',
    challengeType: 'Improving ROAS',
    summary:
      'Offer-led creative drove 21% more purchases per dollar of spend and a 17% lower CPA than the incumbent agency across social campaigns.',
    problem:
      'The provider needed creative that could break through heavy promotional competition in the category, driving purchase volume without sacrificing CPA, while keeping messaging matched to real buyer intent.',
    solution:
      'We shifted messaging toward price-led, promotion-first positioning instead of people-led storytelling, scaled the static concepts that proved most efficient, and built offer-aligned variants across key products so winning concepts applied broadly. Brand storytelling was refined to support direct-response conversion goals rather than replace them.',
    impact:
      'Head to head across all social campaigns, our creative delivered a 17% lower CPA than the incumbent agency and 21% more purchases per dollar of spend.',
    results: [
      { metric: 'Purchases per Dollar of Spend', value: '+21%', metricType: 'efficiency' },
      { metric: 'CPA vs Incumbent Agency (Social)', value: '-17%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Offer-Led Creative Matrix',
      description: 'Winning price-led concepts were systematically rebuilt as offer-aligned variants per product, so proven creative scaled across the portfolio instead of staying siloed.',
    },
    attribution: 'Same-period, same-platform comparison against the incumbent agency\'s campaigns, normalized to purchases per dollar of spend.',
    timeline: {
      before: [
        { label: 'Q1', value: 98 },
        { label: 'Q2', value: 100 },
        { label: 'Q3', value: 99 },
        { label: 'Q4', value: 100 },
      ],
      after: [
        { label: 'M1', value: 105 },
        { label: 'M2', value: 111 },
        { label: 'M4', value: 117 },
        { label: 'M6', value: 121 },
      ],
    },
    logoPlaceholder: 'NBP',
  },
  {
    slug: 'national-broadband-provider-ctv',
    client: 'National Broadband Provider',
    heroMetric: '99%',
    heroMetricLabel: 'Video Completion Rate (CTV)',
    category: 'Broadband & Telecom / CTV',
    channels: ['CTV'],
    industry: 'Telecom',
    challengeType: 'Channel Diversification',
    summary:
      'A premium CTV program delivered a 99% video completion rate, 1.7M impressions, and 29,000+ tracked post-click site actions for a national broadband provider.',
    problem:
      'The provider needed a scalable CTV program that could deliver efficient reach and measurable site actions, while identifying which offer-led creative and regional waves were most likely to drive conversion outcomes.',
    solution:
      'We launched a premium CTV strategy built to balance efficient conversion volume with incremental reach, optimized toward tracked post-view actions, and used offer-led creative variants to isolate the messaging most correlated with purchase behavior. Performance learnings fed directly into an ongoing creative mix strategy.',
    impact:
      'The program delivered 1.7M impressions with a 99% video completion rate and more than 29,000 tracked post-click site actions, turning CTV from an awareness expense into a measured, conversion-connected channel.',
    results: [
      { metric: 'Video Completion Rate', value: '99%', metricType: 'efficiency' },
      { metric: 'Impressions', value: '1.7M', metricType: 'leads' },
      { metric: 'Tracked Post-Click Site Actions', value: '29K+', metricType: 'leads' },
    ],
    wayfinderTactic: {
      title: 'Post-View Action Optimization',
      description: 'Instead of optimizing to reach alone, delivery was tuned toward the tracked site actions that followed exposure, connecting CTV to actual conversion behavior.',
    },
    attribution: 'Post-click and post-view site actions tracked inside the client\'s own measurement stack, mapped to creative variant and regional wave.',
    timeline: {
      before: [
        { label: 'W1', value: 100 },
        { label: 'W2', value: 102 },
        { label: 'W3', value: 101 },
        { label: 'W4', value: 103 },
      ],
      after: [
        { label: 'M1', value: 118 },
        { label: 'M2', value: 134 },
        { label: 'M3', value: 149 },
        { label: 'M4', value: 160 },
      ],
    },
    logoPlaceholder: 'NBP',
  },

  {
    slug: 'ag1-meta',
    client: 'AG1',
    heroMetric: '+51%',
    heroMetricLabel: 'Monthly Acquired Customers YoY',
    category: 'DTC / Multi-Channel',
    channels: ['Meta'],
    industry: 'DTC',
    challengeType: 'Lowering CAC',
    summary:
      'How we restructured Meta campaigns to drive compounding acquisition growth while cutting CAC 5% year-over-year.',
    problem:
      'AG1\'s Meta performance had plateaued. A legacy account and campaign structure limited learning velocity, forcing delivery to spread thin across too many ad sets. Customer acquisition costs were rising while monthly new customer volume stayed flat. The growth team needed a way to unlock scale without blowing past efficiency targets.',
    solution:
      'We rebuilt the entire Meta campaign architecture aligned with current best practices and full-funnel optimization. Creative testing was moved to mid-funnel to separate learning from conversion campaigns. Wayfinder AI ran daily anomaly detection across 200+ ad sets, surfacing creative fatigue and audience saturation before they impacted performance. We implemented a disciplined creative analysis process that fed winning concepts back into production within 48 hours.',
    impact:
      'Monthly acquired customers grew 51% year-over-year while CAC dropped 5%. The restructured account unlocked consistent learning signals that compounded over time, turning a plateau into an acceleration curve.',
    results: [
      { metric: 'Monthly Acquired Customers', value: '+51% YoY', metricType: 'leads' },
      { metric: 'Customer Acquisition Cost', value: '-5% YoY', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Anomaly Detection Across 200+ Ad Sets',
      description: 'Wayfinder AI monitored creative fatigue and audience saturation signals daily, flagging underperforming ad sets before they dragged down campaign-level efficiency.',
    },
    attribution: 'Meta Conversions API with server-side deduplication, cross-referenced against Shopify order data. Incrementality validated via geo-holdout testing.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 98 },
        { label: 'Month 3', value: 102 },
        { label: 'Month 4', value: 97 },
        { label: 'Month 5', value: 101 },
        { label: 'Month 6', value: 99 },
      ],
      after: [
        { label: 'Month 7', value: 112 },
        { label: 'Month 8', value: 125 },
        { label: 'Month 9', value: 134 },
        { label: 'Month 10', value: 141 },
        { label: 'Month 11', value: 148 },
        { label: 'Month 12', value: 151 },
      ],
    },
    testimonial: {
      quote:
        'Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply specialized knowledge of ad platforms with a relentless focus on hitting growth goals.',
      name: 'Jason Marshall',
      title: 'Chief Growth Officer',
      company: 'AG1',
    },
    logoPlaceholder: 'AG1',
  },
  {
    slug: 'ag1-brand-search',
    client: 'AG1',
    heroMetric: '-31%',
    heroMetricLabel: 'Brand Search CAC',
    category: 'DTC / Google',
    channels: ['Google'],
    industry: 'DTC',
    challengeType: 'Lowering CAC',
    summary:
      'Reducing Brand Search overspend to unlock incremental growth budget and cut CAC by 31%.',
    problem:
      'AG1 was over-investing in Google Brand Search, capturing users who would have converted organically. This inflated reported ROAS while starving incremental channels of budget. The result: high apparent efficiency masking low actual incrementality, with limited room to grow.',
    solution:
      'We reset the role of Brand Search in the overall channel mix. Using Wayfinder AI, we modeled the incrementality of every brand keyword cluster and systematically reduced spend on queries with high organic overlap. Freed budget was reallocated to higher-incrementality channels with verified lift.',
    impact:
      'Brand Search CAC dropped 31%. More importantly, the budget freed up funded incremental growth elsewhere in the channel mix, improving overall unit economics without sacrificing volume.',
    results: [
      { metric: 'Brand Search CAC', value: '-31%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Incrementality Modeling by Keyword Cluster',
      description: 'Wayfinder AI scored every brand keyword cluster by organic overlap rate, enabling surgical budget cuts that preserved true incremental conversions.',
    },
    attribution: 'Incrementality measured via controlled geo-holdout tests across brand keyword clusters. Results validated against Google Analytics 4 conversion paths.',
    timeline: {
      before: [
        { label: 'Q1', value: 45 },
        { label: 'Q2', value: 44 },
        { label: 'Q3', value: 46 },
        { label: 'Q4', value: 47 },
      ],
      after: [
        { label: 'Q5', value: 38 },
        { label: 'Q6', value: 34 },
        { label: 'Q7', value: 32 },
        { label: 'Q8', value: 32 },
      ],
    },
    testimonial: {
      quote:
        'Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply specialized knowledge of ad platforms with a relentless focus on hitting growth goals.',
      name: 'Jason Marshall',
      title: 'Chief Growth Officer',
      company: 'AG1',
    },
    logoPlaceholder: 'AG1',
  },
  {
    slug: 'anastasia-beverly-hills',
    client: 'Anastasia Beverly Hills',
    heroMetric: '+22%',
    heroMetricLabel: 'Meta ROAS',
    category: 'Beauty / TikTok + Meta',
    channels: ['TikTok', 'Meta'],
    industry: 'Beauty',
    challengeType: 'Channel Diversification',
    summary:
      'UGC-first TikTok strategy driving off-platform conversions and a 22% ROAS lift for prestige beauty.',
    problem:
      'ABH needed to scale TikTok as a demand driver without cannibalizing margins through TikTok Shop. Previous in-platform commerce had hurt brand perception and margin structure. The challenge: use TikTok for upper-funnel demand while keeping all conversions on ABH.com where margins were intact.',
    solution:
      'We built a UGC-first creative system (tutorials, GRWM, product reactions, shade tests, before/after) optimized for reach, ROAS impact, and qualified traffic. Wayfinder AI tracked cross-platform attribution signals to connect TikTok brand reach to downstream Meta and Google conversions, proving halo effect value.',
    impact:
      'Meta ROAS increased 22% as TikTok-driven demand lifted conversion rates across all channels. Brand perception remained premium with zero TikTok Shop dependency.',
    results: [
      { metric: 'Meta ROAS', value: '+22%', metricType: 'roas' },
    ],
    wayfinderTactic: {
      title: 'Cross-Platform Halo Effect Tracking',
      description: 'Wayfinder AI correlated TikTok brand reach spikes with downstream Meta and Google conversion lifts, proving TikTok\'s true contribution beyond last-click.',
    },
    attribution: 'Multi-touch attribution combining TikTok pixel data with Meta Conversions API and Google Analytics 4 assisted conversion paths. Cross-platform halo measured via time-series correlation analysis.',
    timeline: {
      before: [
        { label: 'Jan', value: 2.1 },
        { label: 'Feb', value: 2.0 },
        { label: 'Mar', value: 2.2 },
        { label: 'Apr', value: 1.9 },
        { label: 'May', value: 2.1 },
        { label: 'Jun', value: 2.0 },
      ],
      after: [
        { label: 'Jul', value: 2.2 },
        { label: 'Aug', value: 2.4 },
        { label: 'Sep', value: 2.5 },
        { label: 'Oct', value: 2.6 },
        { label: 'Nov', value: 2.5 },
        { label: 'Dec', value: 2.6 },
      ],
    },
    logoPlaceholder: 'ABH',
  },
  {
    slug: 'monarch-money',
    client: 'Monarch Money',
    heroMetric: '$75M',
    heroMetricLabel: 'Series B at an $850M Valuation',
    category: 'Finance / Multi-Channel',
    channels: ['Multi-Channel'],
    industry: 'Finance',
    challengeType: 'Scaling Spend',
    summary:
      'Users up 368% with unit economics that held under investor scrutiny. Monarch went on to raise a $75M Series B at an $850M valuation.',
    problem:
      'Monarch Money needed to rapidly scale user acquisition to establish category leadership in personal finance. Efficient unit economics were non-negotiable given investor scrutiny. Existing channels were near capacity, and scaling further risked CAC inflation that would damage the company\'s growth narrative.',
    solution:
      'We built a full-funnel user acquisition strategy across multiple channels with rigorous measurement at every stage. Wayfinder AI continuously rebalanced budget allocation across channels based on real-time CAC and LTV signals, shifting spend toward whichever channel offered the best marginal unit economics at any given moment.',
    impact:
      'Users grew 368% while maintaining the efficient unit economics that matter to investors. The diversified channel mix reduced dependency on any single platform. Monarch went on to raise a $75M Series B at an $850M valuation.',
    results: [
      { metric: 'Users', value: '+368%', metricType: 'leads' },
      { metric: 'Series B (at $850M valuation)', value: '$75M', metricType: 'revenue' },
    ],
    wayfinderTactic: {
      title: 'Real-Time Cross-Channel Budget Rebalancing',
      description: 'Wayfinder AI monitored marginal CAC across all channels hourly, automatically flagging reallocation opportunities when one channel\'s efficiency shifted.',
    },
    attribution: 'Server-side event tracking with cohort-based LTV analysis. Channel contribution measured via media mix modeling with weekly recalibration.',
    timeline: {
      before: [
        { label: 'Q1', value: 100 },
        { label: 'Q2', value: 108 },
        { label: 'Q3', value: 112 },
        { label: 'Q4', value: 115 },
      ],
      after: [
        { label: 'Q5', value: 165 },
        { label: 'Q6', value: 245 },
        { label: 'Q7', value: 358 },
        { label: 'Q8', value: 468 },
      ],
    },
    logoPlaceholder: 'MM',
  },
  {
    slug: 'rho-nutrition',
    client: 'Rho Nutrition',
    heroMetric: '+78%',
    heroMetricLabel: 'Revenue During Partnership',
    category: 'DTC / Multi-Channel',
    channels: ['Multi-Channel'],
    industry: 'DTC',
    challengeType: 'Scaling Spend',
    summary:
      'Driving 78% revenue growth through optimized multi-channel performance while maintaining profitability.',
    problem:
      'Rho Nutrition had strong product-market fit but lacked the media infrastructure to scale efficiently. Ad spend was increasing without proportional revenue growth, and there was no unified view of which channels were actually driving profitable orders versus cannibalizing organic demand.',
    solution:
      'We consolidated measurement across all channels, built a unified attribution view, and optimized each channel for its role in the funnel. Wayfinder AI provided daily spend-to-revenue efficiency scoring, enabling rapid reallocation to the highest-returning opportunities.',
    impact:
      'Revenue grew 78% during the partnership while maintaining healthy margins. The unified measurement framework gave the team confidence in where every dollar was going.',
    results: [
      { metric: 'Revenue', value: '+78%', metricType: 'revenue' },
    ],
    wayfinderTactic: {
      title: 'Daily Spend-to-Revenue Efficiency Scoring',
      description: 'Wayfinder AI generated daily efficiency scores for every active campaign, ranking them by marginal revenue contribution to guide same-day optimization decisions.',
    },
    attribution: 'Multi-touch revenue attribution combining platform conversion data with backend order revenue. Blended ROAS calculated daily at the campaign level.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 103 },
        { label: 'Month 3', value: 99 },
        { label: 'Month 4', value: 105 },
      ],
      after: [
        { label: 'Month 5', value: 118 },
        { label: 'Month 6', value: 135 },
        { label: 'Month 7', value: 156 },
        { label: 'Month 8', value: 178 },
      ],
    },
    logoPlaceholder: 'RN',
  },
  {
    slug: 'aura-health',
    client: 'Aura Health',
    heroMetric: '-37%',
    heroMetricLabel: 'Cost Per Trial YoY',
    category: 'Health / Multi-Channel',
    channels: ['Multi-Channel'],
    industry: 'Health',
    challengeType: 'Lowering CAC',
    summary:
      'Reducing cost per trial 37% while scaling health app user acquisition.',
    problem:
      'Aura Health\'s cost per trial was too high to scale user acquisition profitably. The trial-to-paid conversion funnel was leaking at multiple points, and creative messaging wasn\'t resonating with the highest-LTV segments. Without lowering CPT, the growth math simply didn\'t work.',
    solution:
      'We optimized the full acquisition funnel from impression to trial activation. Wayfinder AI analyzed creative performance across audience segments, identifying which messages drove not just trials but trial-to-paid conversions. This shifted creative strategy from volume to quality.',
    impact:
      'Cost per trial dropped 37% year-over-year. More importantly, trial quality improved as the new creative strategy attracted higher-intent users who converted to paid at better rates.',
    results: [
      { metric: 'Cost Per Trial', value: '-37% YoY', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Creative-to-LTV Segment Matching',
      description: 'Wayfinder AI correlated creative variations with downstream trial-to-paid conversion rates by audience segment, revealing which messages attracted high-LTV users.',
    },
    attribution: 'Mobile measurement partner (MMP) data combined with in-app event tracking. Trial-to-paid conversion tracked at the campaign level over 30/60/90-day windows.',
    timeline: {
      before: [
        { label: 'Q1', value: 12.5 },
        { label: 'Q2', value: 13.2 },
        { label: 'Q3', value: 12.8 },
        { label: 'Q4', value: 13.5 },
      ],
      after: [
        { label: 'Q5', value: 11.0 },
        { label: 'Q6', value: 9.8 },
        { label: 'Q7', value: 8.9 },
        { label: 'Q8', value: 8.5 },
      ],
    },
    logoPlaceholder: 'AH',
  },
  {
    slug: 'online-labels',
    client: 'Online Labels',
    heroMetric: '+151%',
    heroMetricLabel: 'Profit Growth',
    category: 'E-Commerce / Google',
    channels: ['Google'],
    industry: 'E-Commerce',
    challengeType: 'Account Restructure',
    summary:
      'From 18,000 keywords and declining performance to 151% profit growth in 90 days.',
    problem:
      'Online Labels\' Google Ads account was a post-COVID mess: 18,000 keywords, 15,000 ads, 11,000 products. Performance was regressing, wasted spend was rampant, and the complexity made it nearly impossible to diagnose what was working. The team was flying blind on profitability at the product and keyword level.',
    solution:
      'We took a two-pronged approach: grow revenue via strategic keyword expansion while simultaneously eliminating wasted spend. Wayfinder AI mapped profitability at the product-keyword intersection, identifying which of the 18,000 keywords actually drove profit versus just qualified pipeline. Automated bidding, new ad copy, and custom audiences completed the rebuild.',
    impact:
      'Profit grew 151% in 90 days. Revenue grew 42%, conversion rate improved 41%, and average order value jumped 37%. Monthly profit grew 52% in just the first 30 days.',
    results: [
      { metric: 'Profit', value: '+151%', metricType: 'revenue' },
      { metric: 'Revenue', value: '+42%', metricType: 'revenue' },
      { metric: 'Conversion Rate', value: '+41%', metricType: 'efficiency' },
      { metric: 'Avg. Order Value', value: '+37%', metricType: 'revenue' },
    ],
    wayfinderTactic: {
      title: 'Product-Keyword Profitability Mapping',
      description: 'Wayfinder AI calculated true margin contribution at the product-keyword intersection across 18,000 keywords, enabling surgical pruning of unprofitable traffic.',
    },
    attribution: 'Google Ads conversion tracking integrated with backend revenue and margin data. Profitability measured at the keyword-product level with daily reconciliation against order management system.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 94 },
        { label: 'Month 3', value: 88 },
        { label: 'Month 4', value: 91 },
        { label: 'Month 5', value: 85 },
        { label: 'Month 6', value: 82 },
      ],
      after: [
        { label: 'Month 7', value: 125 },
        { label: 'Month 8', value: 168 },
        { label: 'Month 9', value: 198 },
        { label: 'Month 10', value: 215 },
        { label: 'Month 11', value: 230 },
        { label: 'Month 12', value: 251 },
      ],
    },
    testimonial: {
      quote:
        'The Tiger Tracks team boosted the profitability of our non-branded search campaigns by 151% in the first few months, and set new overall ad revenue records shortly after.',
      name: 'Steven Leung',
      title: 'Director of Marketing',
      company: 'Online Labels',
    },
    logoPlaceholder: 'OL',
  },
  {
    slug: 'lightyear',
    client: 'Lightyear',
    heroMetric: '+100%',
    heroMetricLabel: 'Qualified Leads Per Month',
    category: 'Telecom / Google',
    channels: ['Google'],
    industry: 'Telecom',
    challengeType: 'Account Restructure',
    summary: 'Doubling qualified leads for enterprise telecom after a previous agency failed to deliver for over a year.',
    problem:
      'Lightyear had run Google Ads with another agency for over a year with limited success. The campaigns were generating qualified pipeline but not qualified leads that sales could close. Lead quality was poor, conversion tracking was unreliable, and the team had lost confidence in paid as a growth channel.',
    solution:
      'We revamped campaign architecture, keyword segmentation, and conversion tracking from scratch. Wayfinder AI built lead quality scoring models that fed back into bidding, shifting spend toward queries that generated sales-qualified (not just marketing-qualified) leads.',
    impact:
      'Qualified leads per month doubled. More importantly, lead quality improved so meaningfully that the sales team\'s close rate increased, compounding the impact beyond just volume.',
    results: [
      { metric: 'Qualified Leads Per Month', value: '+100%', metricType: 'leads' },
    ],
    wayfinderTactic: {
      title: 'Lead Quality Scoring Fed Into Bidding',
      description: 'Wayfinder AI built lead quality models from CRM close-rate data, then fed quality signals back into Google\'s bidding to optimize for revenue, not just form fills.',
    },
    attribution: 'Offline conversion imports from CRM (HubSpot) to Google Ads. Lead quality tracked from click to SQL to closed deal with full funnel visibility.',
    timeline: {
      before: [
        { label: 'Month 1', value: 22 },
        { label: 'Month 2', value: 19 },
        { label: 'Month 3', value: 24 },
        { label: 'Month 4', value: 20 },
        { label: 'Month 5', value: 21 },
        { label: 'Month 6', value: 23 },
      ],
      after: [
        { label: 'Month 7', value: 30 },
        { label: 'Month 8', value: 36 },
        { label: 'Month 9', value: 40 },
        { label: 'Month 10', value: 43 },
        { label: 'Month 11', value: 44 },
        { label: 'Month 12', value: 46 },
      ],
    },
    testimonial: {
      quote:
        'Through their deep sophistication in analytics, funnel attribution, and campaign execution, Tiger Tracks took our performance marketing to the next level.',
      name: 'Matt McGill',
      title: 'VP of Performance Marketing',
      company: 'Lightyear',
    },
    logoPlaceholder: 'LY',
  },
  {
    slug: 'leonard-truck',
    client: 'Leonard Truck Outfitters',
    heroMetric: '+39%',
    heroMetricLabel: 'Leads',
    category: 'B2C / Google',
    channels: ['Google'],
    industry: 'B2C',
    challengeType: 'Account Restructure',
    summary:
      'Consolidating multi-agency chaos into a 39% lead increase with 63% conversion rate improvement.',
    problem:
      'Leonard had multiple agencies with overlapping responsibilities, fragmented campaign ownership, and conflicting optimization signals. Geographic market variations, different product categories, and strong seasonality added complexity. Nobody had a unified view of what was driving conversions.',
    solution:
      'We consolidated all conversion signals into a single source of truth, rebuilt campaign structure to accelerate algorithm learning, and segmented by geography and product category. Wayfinder AI unified reporting across the previously fragmented agency structure, revealing overlap and waste.',
    impact:
      'Leads grew 39.45%, conversion rate jumped 63.42%, and CPA dropped 12.22%. The consolidated structure finally gave the team confidence in their numbers.',
    results: [
      { metric: 'Leads', value: '+39.45%', metricType: 'leads' },
      { metric: 'Conversion Rate', value: '+63.42%', metricType: 'efficiency' },
      { metric: 'CPA Reduction', value: '-12.22%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Unified Multi-Agency Signal Consolidation',
      description: 'Wayfinder AI merged conversion signals from multiple agency accounts into a single attribution model, exposing overlapping spend and cannibalized conversions.',
    },
    attribution: 'Consolidated Google Ads conversion tracking with CRM lead data. Geographic and product-level attribution reconciled weekly against actual sales.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 96 },
        { label: 'Month 3', value: 104 },
        { label: 'Month 4', value: 98 },
      ],
      after: [
        { label: 'Month 5', value: 112 },
        { label: 'Month 6', value: 126 },
        { label: 'Month 7', value: 133 },
        { label: 'Month 8', value: 139 },
      ],
    },
    testimonial: {
      quote:
        'I believe the learning curve was accelerated by the team\'s accessibility and strategic thinking.',
      name: 'Rick Coffee',
      title: 'Head of Marketing',
      company: 'Leonard Truck Outfitters',
    },
    logoPlaceholder: 'LT',
  },
  {
    slug: 'sovereign-labs',
    client: 'Sovereign Labs',
    heroMetric: '+94%',
    heroMetricLabel: 'ROAS YoY',
    category: 'DTC / Meta',
    channels: ['Meta'],
    industry: 'DTC',
    challengeType: 'Improving ROAS',
    summary:
      'Building a full-funnel Meta strategy that nearly doubled ROAS for the colostrum supplement leader.',
    problem:
      'Sovereign Labs lacked a cohesive full-funnel Meta strategy. Upper-funnel efforts were disconnected from conversion campaigns, creative was stale, and there was no system for testing and scaling new concepts. ROAS was underperforming relative to the brand\'s strong repeat purchase rate and customer LTV.',
    solution:
      'We built a comprehensive full-funnel Meta strategy with compelling vertical video. Wayfinder AI modeled the LTV of customers acquired through different creative angles, revealing that educational content about colostrum benefits drove 2.3x higher LTV than discount-led creative. This insight reshaped the entire creative brief.',
    impact:
      'ROAS increased 94% year-over-year. The LTV-informed creative strategy attracted higher-value customers, making the improvement durable rather than a one-time optimization bump.',
    results: [
      { metric: 'ROAS', value: '+94% YoY', metricType: 'roas' },
    ],
    wayfinderTactic: {
      title: 'LTV-Informed Creative Strategy',
      description: 'Wayfinder AI modeled customer LTV by acquisition creative type, revealing educational content drove 2.3x higher LTV than promotional angles.',
    },
    attribution: 'Meta Conversions API with server-side event matching. LTV tracked over 90-day cohorts with Shopify order data integration.',
    timeline: {
      before: [
        { label: 'Q1', value: 1.8 },
        { label: 'Q2', value: 1.7 },
        { label: 'Q3', value: 1.9 },
        { label: 'Q4', value: 1.8 },
      ],
      after: [
        { label: 'Q5', value: 2.3 },
        { label: 'Q6', value: 2.8 },
        { label: 'Q7', value: 3.2 },
        { label: 'Q8', value: 3.5 },
      ],
    },
    logoPlaceholder: 'SL',
  },
  {
    slug: 'snapnhd',
    client: 'SnapNHD',
    heroMetric: '-47%',
    heroMetricLabel: 'Customer Acquisition Cost',
    category: 'Real Estate / Google',
    channels: ['Google'],
    industry: 'Real Estate',
    challengeType: 'Lowering CAC',
    summary:
      'Overhauling Google Ads to cut acquisition costs nearly in half for real estate services.',
    problem:
      'SnapNHD was experiencing growth deceleration from rising CAC and ineffective digital marketing. The Google Ads program had not been significantly updated, and performance was degrading as competition increased. Without a dramatic improvement in acquisition efficiency, growth would stall.',
    solution:
      'We overhauled the entire Google Ads program: new ad copy, shifted targeting strategies, and implemented advanced automated bidding. Wayfinder AI identified geographic and temporal patterns in conversion data, enabling hyper-targeted bid adjustments that reduced waste.',
    impact:
      'Customer acquisition cost dropped 47%. The overhauled account structure and targeting created a sustainable foundation for scaling, not just a one-time improvement.',
    results: [
      { metric: 'Customer Acquisition Cost', value: '-47%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Geographic + Temporal Bid Optimization',
      description: 'Wayfinder AI identified conversion patterns by geography and time of day/week, enabling automated bid modifiers that concentrated spend on highest-converting windows.',
    },
    attribution: 'Google Ads conversion tracking with backend customer data integration. CAC calculated on actual customers acquired, not just leads.',
    timeline: {
      before: [
        { label: 'Month 1', value: 85 },
        { label: 'Month 2', value: 90 },
        { label: 'Month 3', value: 88 },
        { label: 'Month 4', value: 92 },
      ],
      after: [
        { label: 'Month 5', value: 72 },
        { label: 'Month 6', value: 58 },
        { label: 'Month 7', value: 50 },
        { label: 'Month 8', value: 47 },
      ],
    },
    logoPlaceholder: 'SN',
  },
  {
    slug: 'honeydew',
    client: 'Honeydew',
    heroMetric: '-28%',
    heroMetricLabel: 'CAC While Scaling 3x Volume',
    category: 'Health / Google',
    channels: ['Google'],
    industry: 'Health',
    challengeType: 'Full-Funnel Build',
    summary:
      'Scaling online dermatology growth 3x while cutting CAC 28% through full-funnel restructure.',
    problem:
      'Honeydew\'s Google Search strategy was heavily segmented, limiting growth. Tight CAC goals conflicted with ambitious growth targets. Geotargeting wasn\'t aligned with actual provider availability, meaning ad spend was driving leads in markets where Honeydew couldn\'t serve patients.',
    solution:
      'We conducted a full funnel audit, restructured campaigns, and aligned geotargeting with provider availability. Wayfinder AI mapped conversion potential by ZIP code against Honeydew\'s provider network, eliminating waste from serving ads in areas without coverage.',
    impact:
      'Volume grew 3x while CAC dropped 28%. The geographic alignment alone recovered significant wasted spend that was redirected into high-coverage markets.',
    results: [
      { metric: 'CAC Reduction', value: '-28%', metricType: 'cac' },
      { metric: 'Patient Volume', value: '3x Growth', metricType: 'leads' },
    ],
    wayfinderTactic: {
      title: 'Provider Network / Ad Coverage Alignment',
      description: 'Wayfinder AI mapped ad spend by ZIP code against Honeydew\'s provider availability, identifying and eliminating spend in markets with zero fulfillment capacity.',
    },
    attribution: 'Google Ads conversion tracking with patient intake system integration. Geographic attribution at the ZIP-code level, reconciled against provider network data.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 104 },
        { label: 'Month 3', value: 98 },
        { label: 'Month 4', value: 102 },
      ],
      after: [
        { label: 'Month 5', value: 135 },
        { label: 'Month 6', value: 185 },
        { label: 'Month 7', value: 245 },
        { label: 'Month 8', value: 300 },
      ],
    },
    testimonial: {
      quote:
        'The Tiger Tracks team has been a true partner in our company\'s growth. They\'re collaborative, nimble, and thoughtful, really acting as an extension of our own team.',
      name: 'Connor Kreutz',
      title: 'Head of Growth',
      company: 'Honeydew',
    },
    logoPlaceholder: 'HD',
  },
  {
    slug: 'capezio',
    client: 'Capezio',
    heroMetric: '+54%',
    heroMetricLabel: 'ROAS (EU Market)',
    category: 'E-Commerce / Google',
    channels: ['Google'],
    industry: 'E-Commerce',
    challengeType: 'Improving ROAS',
    summary:
      'Scaling international markets without cannibalizing U.S. performance through geo-segmented Performance Max optimization.',
    problem:
      'Capezio needed to scale into EU, UK, and Australian markets but risked diluting their strong U.S. performance. Existing campaign structures were not segmented by geography, making it impossible to optimize for regional nuances in search behavior, audience intent, and competitive dynamics.',
    solution:
      'We ran a full-funnel audit that identified keyword restrictions limiting international reach, then launched revamped Performance Max campaigns with refreshed audience data segmented by geo-market. A revamped Search strategy drove down-funnel movement while isolating each market for independent optimization.',
    impact:
      'EU ROAS grew 54%, UK ROAS improved 10%, and Australian ROAS increased 54%. U.S. performance remained stable throughout the international expansion, proving the geo-segmentation thesis.',
    results: [
      { metric: 'EU ROAS', value: '+54%', metricType: 'roas' },
      { metric: 'UK ROAS', value: '+10%', metricType: 'roas' },
      { metric: 'AUS ROAS', value: '+54%', metricType: 'roas' },
    ],
    wayfinderTactic: {
      title: 'Geo-Segmented Performance Max Optimization',
      description: 'Wayfinder AI analyzed performance signals by geographic market, enabling independent bid strategies and audience targeting for each region without cross-contamination.',
    },
    attribution: 'Google Ads conversion tracking segmented by market region. ROAS calculated at the geo-campaign level with backend revenue reconciliation.',
    timeline: {
      before: [
        { label: 'Month 1', value: 1.8 },
        { label: 'Month 2', value: 1.7 },
        { label: 'Month 3', value: 1.9 },
        { label: 'Month 4', value: 1.8 },
        { label: 'Month 5', value: 1.7 },
        { label: 'Month 6', value: 1.8 },
      ],
      after: [
        { label: 'Month 7', value: 2.1 },
        { label: 'Month 8', value: 2.4 },
        { label: 'Month 9', value: 2.6 },
        { label: 'Month 10', value: 2.7 },
        { label: 'Month 11', value: 2.8 },
        { label: 'Month 12', value: 2.8 },
      ],
    },
    logoPlaceholder: 'CZ',
    heroImage: '/images/case-study-portrait-brand.png',
  },
  {
    slug: 'dovetail',
    client: 'Dovetail Furniture',
    heroMetric: '+103%',
    heroMetricLabel: 'Increase in Leads',
    category: 'E-Commerce / Google',
    channels: ['Google'],
    industry: 'E-Commerce',
    challengeType: 'Lowering CAC',
    summary:
      'Lowering CAC 46% while more than doubling lead volume through bid signal correction and campaign structure optimization.',
    problem:
      'Dovetail Furniture was sending misleading algorithm signals through their existing campaign structure, inflating customer acquisition costs while lead volume stagnated. Bid strategies were optimizing toward the wrong conversion actions, and the campaign structure was too fragmented to generate meaningful learning signals.',
    solution:
      'We ran a full-funnel audit and corrected the misleading algorithm signals that were driving inefficiency. Campaign structure was consolidated to improve bid strategy learning, and conversion action optimizations were refined to align with actual business outcomes rather than proxy metrics.',
    impact:
      'Leads increased 103% while CAC dropped 46%. The corrected signal architecture gave Google\'s algorithms accurate data to optimize against, compounding improvements over time.',
    results: [
      { metric: 'Leads', value: '+103%', metricType: 'leads' },
      { metric: 'CAC Reduction', value: '-46%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Bid Signal Correction & Structure Optimization',
      description: 'Wayfinder AI identified misleading conversion signals and structural fragmentation, then corrected the data pipeline to give bidding algorithms accurate optimization targets.',
    },
    attribution: 'Google Ads conversion tracking with CRM lead data integration. CAC calculated on qualified leads, not just form submissions.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 96 },
        { label: 'Month 3', value: 102 },
        { label: 'Month 4', value: 98 },
      ],
      after: [
        { label: 'Month 5', value: 128 },
        { label: 'Month 6', value: 158 },
        { label: 'Month 7', value: 186 },
        { label: 'Month 8', value: 203 },
      ],
    },
    testimonial: {
      quote:
        'Working with Tiger Tracks has been exceptional from the start! Their team took the time to deeply understand Dovetail Furniture\'s business model, and the results speak for themselves.',
      name: 'Marco Mazzoni',
      title: 'Director of Technology and Digital Marketing',
      company: 'Dovetail Furniture',
    },
    logoPlaceholder: 'DT',
    heroImage: '/images/case-study-product-viz-brand.png',
  },
];
