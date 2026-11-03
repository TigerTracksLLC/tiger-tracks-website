import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Results',
  alternates: { canonical: '/results' },
  description:
    'Real performance marketing results and case studies. See how Tiger Tracks drives measurable growth for brands spending $100K-$5M/month.',
  openGraph: {
    title: 'Results | Tiger Tracks',
    description:
      'Real performance marketing results and case studies from Tiger Tracks.',
    url: 'https://tigertracks.ai/results',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
