import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  alternates: { canonical: '/careers' },
  description:
    'Join Tiger Tracks, the Inc. 5000 #123 performance marketing agency. Explore open roles and grow your career with ex-Google leaders.',
  openGraph: {
    title: 'Careers | Tiger Tracks',
    description:
      'Join Tiger Tracks. Explore open roles at the Inc. 5000 #123 performance marketing agency.',
    url: 'https://tigertracks.ai/careers',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
