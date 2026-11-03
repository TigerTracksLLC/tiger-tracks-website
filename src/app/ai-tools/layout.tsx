import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tools',
  alternates: { canonical: '/ai-tools' },
  description:
    'Proprietary AI-powered marketing tools built by Tiger Tracks. Video optimization, creative analysis, and performance intelligence for growth brands.',
  openGraph: {
    title: 'AI Tools | Tiger Tracks',
    description:
      'Proprietary AI-powered marketing tools built by Tiger Tracks for growth brands.',
    url: 'https://tigertracks.ai/ai-tools',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function AIToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
