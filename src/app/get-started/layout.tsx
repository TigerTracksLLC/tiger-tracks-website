import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Started',
  alternates: { canonical: '/get-started' },
  description:
    'Request a free strategic diagnostic from Tiger Tracks. Our team will audit your paid channels, analytics, creative, and more.',
  openGraph: {
    title: 'Get Started | Tiger Tracks',
    description:
      'Request a free strategic diagnostic from Tiger Tracks.',
    url: 'https://tigertracks.ai/get-started',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
