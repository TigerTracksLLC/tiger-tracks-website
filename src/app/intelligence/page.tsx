import type { Metadata } from 'next';
import { publishedPosts } from '@/data/publishedPosts';
import { IntelligenceHubClient } from '@/components/IntelligenceHubClient';

export const metadata: Metadata = {
  alternates: { canonical: '/intelligence' },
  title: 'Thought Leadership & Intelligence',
  description:
    'Eye of the Tiger Thought Leadership & Intelligence -- AI strategy briefings for business leaders.',
  openGraph: {
    title: 'Thought Leadership & Intelligence | Tiger Tracks',
    description:
      'Eye of the Tiger Thought Leadership & Intelligence -- AI strategy briefings for business leaders.',
    url: 'https://tigertracks.ai/intelligence',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thought Leadership & Intelligence | Tiger Tracks',
    description:
      'Eye of the Tiger Thought Leadership & Intelligence -- AI strategy briefings for business leaders.',
  },
};

export default function IntelligencePage() {
  return <IntelligenceHubClient posts={publishedPosts} />;
}
