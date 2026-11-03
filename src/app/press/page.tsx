'use client';

import { CTASection } from '@/components/CTASection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pressArticles = [
  {
    title:
      'Google Alums at Tiger Tracks Agency Spur Rapid Growth by Deploying Tech Industry Tactics',
    outlet: 'LBB Online',
    date: 'August 28, 2025',
    detail:
      'Attributes fast growth to PE partnerships. 100x MRR milestone. Grew from 3 to 24 employees.',
    href: 'https://lbbonline.com/news/Google-Alums-At-Tiger-Tracks-Agency-Spur-Rapid-Growth-By-Deploying-Tech-Industry-Tactics',
  },
  {
    title: 'Tiger Tracks Ranks No. 123 on the 2025 Inc. 5000 List',
    outlet: 'Inc.',
    date: 'August 18, 2025',
    detail: '2,954% revenue growth. First time on list.',
    href: 'https://www.inc.com/profile/tiger-tracks',
  },
  {
    title:
      'SEEEN plc and Tiger Tracks LLC Announce Strategic Partnership to Bring Interactive Video Commerce to Performance Marketing',
    outlet: 'News by Wire',
    date: 'March 2026',
    detail: 'Strategic partnership bringing interactive, shoppable video to performance marketing programs.',
    href: 'https://newsbywire.com/seeen-plc-and-tiger-tracks-llc-announce-strategic-partnership-to-bring-interactive-video-commerce-to-performance-marketing/',
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function PressPage() {
  return (
    <div>
      {/* ── Section 1: Hero ── */}
      <section className="relative py-24 px-6 overflow-hidden" style={{
        background: `
          #052E3F
        `,
      }}>
        {/* MJ press-flatlay background */}
        <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
          backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/press-flatlay.webp) */,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-6">
            PRESS
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-tt-white leading-tight">
            In the news
          </h1>
        </div>
      </section>

      {/* ── Section: Featured Speaking (SXSW) ── */}
      <section className="bg-tt-black py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-4">
              ON STAGE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-tt-white">
              SXSW: Under the AI microscope
            </h2>
            <p className="text-tt-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              CEO &amp; Co-Founder Cliff Simmons joins the CMO of AG1 at SXSW to
              talk about how AI is reshaping media buying and creative.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl ring-1 ring-white/10">
            <video
              controls
              preload="metadata"
              playsInline
              poster="/cliff-sxsw-ag1-poster.jpg"
              className="w-full aspect-video object-cover bg-tt-black"
            >
              <source src="/cliff-sxsw-ag1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* ── Section 2: Awards & Recognition ── */}
      <section className="surface-paper py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            Awards &amp; recognition
          </h2>

          {/* Featured award card */}
          <div className="bg-tt-gray-50 rounded-2xl p-12 text-center max-w-3xl mx-auto mb-10">
            <p className="text-4xl font-extrabold text-tt-orange">Inc. 5000</p>
            <p className="text-8xl font-extrabold text-tt-black mt-4">#123</p>
            <p className="text-xl text-tt-gray-700 mt-6">
              America&rsquo;s Fastest-Growing Private Companies
            </p>
            <p className="text-lg font-semibold text-tt-orange mt-3">
              2,954% Three-Year Revenue Growth
            </p>
          </div>

          {/* Meta Business Partner badge */}
          <div className="text-center">
            <span className="inline-block bg-tt-gray-50 rounded-full px-6 py-3 text-sm font-semibold text-tt-gray-700">
              Meta Business Partner
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 3: Press Coverage ── */}
      <section className="surface-paper py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            Coverage
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pressArticles.map((article) => (
              <div
                key={article.title}
                className="bg-tt-white rounded-xl p-8 transition flex flex-col"
              >
                <p className="text-sm text-tt-gray-500 mb-3">{article.outlet} &middot; {article.date}</p>
                <h3 className="text-xl font-bold text-tt-gray-900 mb-4 leading-snug">
                  {article.title}
                </h3>
                <p className="text-tt-gray-700 mb-6 flex-1">
                  {article.detail}
                </p>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tt-orange font-semibold text-sm hover:text-tt-orange-dark transition"
                >
                  Read article &rarr;
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── Section 4: CTA ── */}
      <CTASection
        headline="Want to feature Tiger Tracks?"
        subheadline="For press inquiries, contact info@tigertracks.ai"
        primaryCTA={{ text: 'Contact Us', href: '/get-started' }}
        dark
      />
    </div>
  );
}
