import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogPosts';
import { fetchPageBlocks, findPageIdBySlug, fetchPageCover } from '@/lib/notion';
import { ArticlePageClient } from '@/components/ArticlePageClient';
import { HELD_SLUGS, publishedPosts } from '@/data/publishedPosts';
import { cleanBlocks } from '@/lib/articleHygiene';
import { resolveArticleImage } from '@/lib/articleImages';

export const revalidate = 3600;
export const dynamicParams = true;

const SITE_URL = 'https://tigertracks.ai';
const FALLBACK_DESCRIPTION =
  'Strategic research and tactical playbooks from Tiger Tracks. Inc. 5000 #123 performance marketing agency powered by proprietary AI.';

/* ------------------------------------------------------------------ */
/*  Helper: resolve the article for a given slug (shared by both       */
/*  generateMetadata and the page component)                           */
/* ------------------------------------------------------------------ */

function resolveArticle(slug: string) {
  // Use static blogPosts data only — no Notion API calls needed for metadata.
  // The Notion API is only used to fetch the article BODY (blocks) via fetchPageBlocks.
  if (HELD_SLUGS.has(slug)) return null;
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/*  Dynamic Metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = resolveArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  /* Title uses the layout template: "%s | Tiger Tracks" */
  const title = `${article.title} | Tiger Tracks Intelligence`;
  const description = article.excerpt?.trim() || FALLBACK_DESCRIPTION;

  /* Image priority: working Notion cover > category fallback > site default */
  const ogImage = resolveArticleImage(article.category, article.coverImage);

  /* Build absolute URL for local images (Notion URLs are already absolute) */
  const ogImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  const canonicalUrl = `${SITE_URL}/intelligence/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'Tiger Tracks',
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/png',
        },
      ],
      publishedTime: article.date || undefined,
      authors: [article.author || 'Tiger Tracks'],
      tags: [article.category],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@TigerTracksAI',
      site: '@TigerTracksAI',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  // Return only static slugs at build time to avoid Notion API rate limits.
  // All other slugs are fetched on-demand via ISR (dynamicParams = true).
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = resolveArticle(slug);

  if (!article) {
    notFound();
  }

  // Look up the Notion page ID: use static pageId if available,
  // otherwise do a lightweight lookup (1-2 API calls, cached 5min)
  const pageId = article.pageId ?? await findPageIdBySlug(slug);

  // Fetch blocks and cover image in parallel (both need pageId)
  const [blocks, coverImage] = pageId
    ? await Promise.all([
        fetchPageBlocks(pageId).then(cleanBlocks),
        article.coverImage ? Promise.resolve(article.coverImage) : fetchPageCover(pageId),
      ])
    : [[], null];

  // Covers on dead hosts are dropped; the brand category image stands in.
  const articleImage = resolveArticleImage(
    article.category,
    coverImage,
    article.coverImage,
  );

  const enrichedArticle = {
    ...article,
    ...(pageId && { pageId }),
    coverImage: articleImage,
  };
  const articleImageUrl = articleImage.startsWith('http')
    ? articleImage
    : `${SITE_URL}${articleImage}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || FALLBACK_DESCRIPTION,
    image: articleImageUrl,
    datePublished: article.date || undefined,
    dateModified: article.date || undefined,
    author: {
      '@type': article.author ? 'Person' : 'Organization',
      name: article.author || 'Tiger Tracks',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tiger Tracks',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/tt-avatar.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/intelligence/${slug}`,
    },
    articleSection: article.category,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Intelligence', item: `${SITE_URL}/intelligence` },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/intelligence/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticlePageClient article={enrichedArticle} blocks={blocks} />
    </>
  );
}
