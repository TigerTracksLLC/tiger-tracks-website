import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Capabilities',
  alternates: { canonical: '/capabilities' },
  description:
    'Full-funnel performance marketing capabilities: paid media, SEO, creative strategy, analytics, and CRO. Powered by proprietary AI and ex-Google expertise.',
  openGraph: {
    title: 'Capabilities | Tiger Tracks',
    description:
      'Full-funnel performance marketing capabilities: paid media, SEO, creative strategy, analytics, and CRO.',
    url: 'https://tigertracks.ai/capabilities',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
