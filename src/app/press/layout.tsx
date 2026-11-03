import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Media',
  description:
    'Tiger Tracks in the news: Inc. 5000 #123 with 2,954% growth. Press coverage, media mentions, and resources for journalists.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Press & Media | Tiger Tracks',
    description: 'Press coverage and media resources for Tiger Tracks, Inc. 5000 #123.',
    url: 'https://tigertracks.ai/press',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
