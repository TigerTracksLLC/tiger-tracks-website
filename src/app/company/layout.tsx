import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company',
  alternates: { canonical: '/company' },
  description:
    'Meet the team behind Tiger Tracks. Founded by ex-Google leaders, ranked Inc. 5000 #123 with 2,954% growth.',
  openGraph: {
    title: 'Company | Tiger Tracks',
    description:
      'Meet the team behind Tiger Tracks. Founded by ex-Google leaders, ranked Inc. 5000 #123.',
    url: 'https://tigertracks.ai/company',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
