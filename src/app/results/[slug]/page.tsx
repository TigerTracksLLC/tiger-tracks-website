import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudies';
import { CaseStudyPageClient } from '@/components/CaseStudyPageClient';

const SITE_URL = 'https://tigertracks.ai';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return { title: 'Case Study Not Found' };
  }

  const title = `${cs.client}: ${cs.heroMetric} ${cs.heroMetricLabel}`;
  const description = cs.summary.length > 160 ? `${cs.summary.slice(0, 157)}…` : cs.summary;
  const url = `${SITE_URL}/results/${cs.slug}`;
  const image = cs.heroImage || '/images/og-brand.png';

  return {
    title,
    description,
    alternates: { canonical: `/results/${cs.slug}` },
    openGraph: {
      type: 'article',
      title: `${title} | Tiger Tracks`,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Tiger Tracks`,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Results', item: `${SITE_URL}/results` },
      {
        '@type': 'ListItem',
        position: 3,
        name: caseStudy.client,
        item: `${SITE_URL}/results/${caseStudy.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CaseStudyPageClient caseStudy={caseStudy} />
    </>
  );
}
