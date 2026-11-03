'use client';

import { useInView } from '@/hooks/useInView';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { CTASection } from '@/components/CTASection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const whyCards = [
  {
    title: 'Ex-Google DNA',
    description:
      'Work alongside people who built campaigns for Google’s largest advertisers. The bar is high, and so is the learning curve.',
  },
  {
    title: 'Proprietary Technology',
    description:
      'We don’t just use tools. We build them. Wayfinder AI and our Feed Optimization Platform are built in-house.',
  },
  {
    title: 'Real Impact',
    description:
      'Work with brands like AG1, Anastasia Beverly Hills, and PE-backed portfolio companies. Your work directly drives measurable growth.',
  },
  {
    title: 'Growth Trajectory',
    description:
      'Inc. 5000 #123 with 2,954% revenue growth. We grew from 3 people to a fully remote team of 30+ specialists. There’s room to grow with us.',
  },
];

const howWeWork = [
  {
    number: '01',
    title: 'Performance First',
    description: 'Clear outcomes. No vanity metrics.',
  },
  {
    number: '02',
    title: 'True Partnership',
    description: 'We embed with clients. You’ll have real ownership.',
  },
  {
    number: '03',
    title: 'Tech-Enabled',
    description: 'Automation frees you for strategy, not busywork.',
  },
  {
    number: '04',
    title: 'Built to Scale',
    description: 'Pod-based teams. Playbooks that work. Room to lead.',
  },
];

const benefits = [
  'Medical, dental and vision coverage',
  '401(k) with company match',
  'Flexible time off',
  '12 weeks paid parental leave',
  'Company MacBook',
  'Annual company retreat',
  'Fully remote team',
];

const LINKEDIN_JOBS = 'https://www.linkedin.com/company/tiger-tracks-media/jobs/';

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CareersPage() {
  return (
    <div>
      {/* ── Section 1: Hero ── */}
      <section className="relative min-h-[50vh] flex items-center px-6 overflow-hidden" style={{
        background: `
          #052E3F
        `,
      }}>
        {/* MJ careers-bokeh background */}
        <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
          backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/careers-bokeh.webp) */,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }} />
        <div className="relative z-10 mx-auto max-w-7xl w-full py-24">
          <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-6">
            CAREERS
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-tt-white leading-tight max-w-4xl">
            Build the future of performance marketing
          </h1>
          <p className="mt-8 text-xl text-tt-gray-400 max-w-3xl leading-relaxed">
            Join a team of ex-Google leaders and specialists building proprietary
            AI technology for the world&rsquo;s most ambitious brands.
          </p>
          <p className="text-tt-gray-200 font-medium mt-4">
            Fully remote &middot; New York based
          </p>
        </div>
      </section>

      {/* ── Section 2: Why Tiger Tracks ── */}
      <section className="surface-paper py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            Why Tiger Tracks
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="bg-tt-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-tt-gray-900">
                  {card.title}
                </h3>
                <p className="mt-3 text-tt-gray-700 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: How We Work ── */}
      <section className="surface-paper py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            How we work
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {howWeWork.map((item) => (
              <div key={item.number} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-tt-teal flex items-center justify-center text-tt-black font-bold text-sm">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-semibold text-tt-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-tt-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: The Team ── */}
      <section className="surface-paper py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-12">
            The team
          </h2>

          {/* Stats row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-14">
            <AnimatedCounter value="30+" label="Team Members" />
            <AnimatedCounter value="100x" label="MRR Growth" />
            <AnimatedCounter value="2,954%" label="Inc. 5000 Growth" />
          </div>

          {/* Benefits */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-tt-gray-900 text-center mb-6">Benefits</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <li key={b} className="bg-tt-gray-50 rounded-xl px-5 py-4 text-tt-gray-700">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section 5: Open Roles ── */}
      <section id="open-roles" className="surface-paper py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center">
            Open positions
          </h2>
          <p className="mt-4 text-lg text-tt-gray-700 text-center max-w-2xl mx-auto mb-14">
            We&rsquo;re always looking for exceptional people. If you don&rsquo;t
            see a role that fits, reach out anyway.
          </p>

          <div className="text-center">
            <a
              href={LINKEDIN_JOBS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              See open roles on LinkedIn &rarr;
            </a>
            <p className="mt-6 text-tt-gray-700">
              Don&rsquo;t see a fit? Email{' '}
              <a href="mailto:info@tigertracks.ai?subject=Careers" className="text-tt-orange-dark font-semibold underline">
                info@tigertracks.ai
              </a>{' '}
              with a note on what you&rsquo;d want to own.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 6: CTA ── */}
      <CTASection
        headline="Ready to make an impact?"
        subheadline="Tell us what drives you and what you would want to own."
        primaryCTA={{ text: 'Email Us', href: 'mailto:info@tigertracks.ai?subject=Careers' }}
        dark
      />
    </div>
  );
}
