import Link from 'next/link';

interface CTASectionProps {
  headline: string;
  subheadline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  dark?: boolean;
  badges?: string[];
}

export function CTASection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  dark = true,
  badges,
}: CTASectionProps) {
  return (
    <section
      className={`relative overflow-hidden py-24 px-6 ${
        dark ? '' : 'bg-white'
      }`}
      style={dark ? {
        background: `transparent`,
      } : undefined}
    >
      {/* Subtle data-bg overlay for dark mode */}
      {dark && (
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'transparent',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      <div className="relative mx-auto max-w-3xl text-center">
        <h2
          className={`text-4xl font-bold ${
            dark ? 'text-white' : 'text-tt-gray-900'
          }`}
        >
          {headline}
        </h2>
        <p
          className={`mt-4 text-xl ${
            dark ? 'text-tt-gray-400' : 'text-tt-gray-600'
          }`}
        >
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryCTA.href}
            className="btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tt-orange"
          >
            {primaryCTA.text}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="btn-ghost focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tt-teal"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-tt-gray-500">
            {badges.map((badge, i) => (
              <span key={badge} className="flex items-center gap-2">
                {i > 0 && <span className="text-tt-gray-700">&bull;</span>}
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
