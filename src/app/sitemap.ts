import type { MetadataRoute } from 'next';
import { caseStudies } from '@/data/caseStudies';
import { publishedPosts as blogPosts } from '@/data/publishedPosts';

const SITE_URL = 'https://tigertracks.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Canonical static routes (legacy /about, /services, /case-studies, /insights
  // are intentionally excluded - they redirect to the canonical equivalents).
  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/capabilities', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/results', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/results/methodology', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/trust', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/wayfinder', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ai-tools', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/pe-vc', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/intelligence', priority: 0.8, changeFrequency: 'daily' },
    { path: '/company', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/get-started', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/press', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/growth-audit', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/results/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/intelligence/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...articleEntries];
}
