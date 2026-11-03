'use client';

import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { DiagnosticForm } from '@/components/DiagnosticForm';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const auditAreas = [
  {
    number: '01',
    title: 'Paid Channels',
    description:
      'Deep dive into account structures, bidding strategies, and wasted spend across Meta, Google, TikTok, and CTV.',
    accent: '#D3E3A0',
  },
  {
    number: '02',
    title: 'Organic & Search',
    description:
      'Analysis of technical SEO, generative engine optimization (GEO), and your organic footprint against competitors.',
    accent: '#7FCAD3',
  },
  {
    number: '03',
    title: 'Creative & Conversion',
    description:
      'Review of ad creative win-rates, landing page friction, and full-funnel conversion rate optimization opportunities.',
    accent: '#D3E3A0',
  },
  {
    number: '04',
    title: 'Attribution & Data',
    description:
      'Evaluation of your measurement stack, pixel health, first-party data capture, and incrementality modeling.',
    accent: '#7FCAD3',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GetStartedPage() {
  const { ref: auditRef, inView: auditInView } = useInView({ threshold: 0.1 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.1 });

  /* Calendly embed script */
  const calendlyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen text-white font-sans animated-mesh-bg pb-24 selection:bg-tt-orange selection:text-white">
      {/* ============================================================ */}
      {/*  HERO + DIAGNOSTIC FORM                                       */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 pt-32 lg:pt-44">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.08]">
            Your revenue is leaking.{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  '#FE5E16',
              }}
            >
              We&rsquo;ll find where.
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#A9B6BA' }}
          >
            Answer a few quick questions and our team will build you a 90-day
            roadmap across paid, organic, creative, and attribution. No
            commitment. No fluff. Just findings.
          </p>

          {/* Fast Facts */}
          <div
            className="flex flex-wrap justify-center gap-4 text-sm font-medium mt-8 mb-4 py-5 mx-auto max-w-2xl"
            style={{
              color: '#C5CDCF',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {[
              '7-10 days to complete',
              '$0 cost to you',
              '100% yours to keep',
              '5+ channels covered',
            ].map((fact) => (
              <span key={fact} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#FE5E16' }}
                />
                {fact}
              </span>
            ))}
          </div>
        </div>

        {/* Multi-step form */}
        <DiagnosticForm />
      </section>

      {/* ============================================================ */}
      {/*  WHAT WE AUDIT: 2x2 GRID                                     */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What we audit
        </h2>
        <div
          ref={auditRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${
            auditInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {auditAreas.map((area) => (
            <div
              key={area.number}
              className="glass-panel p-8 rounded-xl transition-colors duration-300"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = `${area.accent}40`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)')
              }
            >
              <h4 className="text-xl font-semibold mb-3 flex items-center gap-3">
                <span style={{ color: area.accent }}>{area.number}</span>
                {area.title}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#A9B6BA' }}
              >
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THREE STEPS: HORIZONTAL TIMELINE                             */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 mt-32 text-center">
        <h2 className="text-3xl font-bold mb-16">How it works</h2>
        <div
          ref={stepsRef}
          className={`flex flex-col md:flex-row justify-between items-start gap-8 relative transition-all duration-700 ${
            stepsInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px -z-10"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)' }}
          />

          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6"
              style={{
                backgroundColor: '#052E3F',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              1
            </div>
            <h4 className="text-lg font-semibold mb-2">Grant Access</h4>
            <p className="text-sm max-w-xs" style={{ color: '#A9B6BA' }}>
              You provide read-only access to your ad platforms and analytics.
            </p>
          </div>

          {/* Step 2 (highlighted) */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-tt-ink mb-6"
              style={{
                backgroundColor: '#FE5E16',
                border: '1px solid #FE5E16',
                boxShadow: 'none',
              }}
            >
              2
            </div>
            <h4 className="text-lg font-semibold mb-2">We Audit</h4>
            <p className="text-sm max-w-xs" style={{ color: '#A9B6BA' }}>
              Our ex-Google team and Wayfinder AI analyze the data for 7-10
              days.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6"
              style={{
                backgroundColor: '#052E3F',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              3
            </div>
            <h4 className="text-lg font-semibold mb-2">The Readout</h4>
            <p className="text-sm max-w-xs" style={{ color: '#A9B6BA' }}>
              We present a custom, actionable 90-day growth roadmap on a
              45-min call.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIAL                                                  */}
      {/* ============================================================ */}
      <section className="max-w-3xl mx-auto px-6 mt-32">
        <div className="glass-panel p-8 rounded-xl text-center">
          <p className=" text-lg mb-6" style={{ color: '#C5CDCF' }}>
            &ldquo;Partnering with Tiger Tracks has been amazing. They work
            fast, execute flawlessly and apply specialized knowledge of ad platforms with a
            relentless focus on hitting growth goals.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(254, 94, 22, 0.5)',
                color: '#FE5E16',
              }}
            >
              AG1
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-white">
                Jason Marshall
              </p>
              <p className="text-xs" style={{ color: '#91A2A9' }}>
                Chief Growth Officer, AG1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CALENDLY EMBED                                               */}
      {/* ============================================================ */}
      <section id="calendly" className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold text-center mb-4">
          Or schedule directly
        </h2>
        <p
          className="text-center mb-10 max-w-2xl mx-auto"
          style={{ color: '#A9B6BA' }}
        >
          Pick a time that works for you and we&rsquo;ll walk you through
          everything on a quick call.
        </p>
        {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
          <div
            ref={calendlyRef}
            className="calendly-inline-widget mx-auto max-w-4xl rounded-xl overflow-hidden"
            data-url={`${process.env.NEXT_PUBLIC_CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=052e3f&text_color=ffffff&primary_color=fe5e16`}
            style={{ minWidth: '320px', minHeight: '650px' }}
          />
        ) : (
          <div className="mx-auto max-w-2xl text-center py-16 px-8 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.14)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <p className="text-lg font-medium text-white mb-3">Ready to talk?</p>
            <p className="mb-6" style={{ color: '#A9B6BA' }}>
              Email us at{' '}
              <a href="mailto:info@tigertracks.ai" className="text-[#FE5E16] hover:underline">
                info@tigertracks.ai
              </a>{' '}
              and we&rsquo;ll send you a link to book a time.
            </p>
            <a
              href="mailto:info@tigertracks.ai?subject=Strategic%20Diagnostic%20Request"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-tt-ink transition-all duration-300 hover:brightness-110"
              style={{ background: '#FE5E16' }}
            >
              Email Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
