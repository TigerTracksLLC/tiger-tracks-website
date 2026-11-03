import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wayfinder AI - Cross-Channel Budget Optimization',
  description:
    'Wayfinder is Tiger Tracks’ proprietary AI: multi-touch attribution, media mix modeling, and generative engine optimization that reallocates budget to where it compounds.',
  alternates: { canonical: '/wayfinder' },
  openGraph: {
    title: 'Wayfinder AI | Tiger Tracks',
    description:
      'Proprietary AI for multi-touch attribution, media mix modeling, and budget reallocation across every channel.',
    url: 'https://tigertracks.ai/wayfinder',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function WayfinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
