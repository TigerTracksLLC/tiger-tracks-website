/**
 * Article cover image resolution.
 *
 * Article covers come from Notion and are copied into blogPosts.ts by the
 * weekly sync. Some point at third-party hosts whose files have since been
 * deleted, which leaves a broken hero image and a broken social share
 * preview. Covers on those hosts are ignored and the brand category image
 * is used instead.
 *
 * To restore a real cover, upload a new one to the Notion page. To retire
 * another host, add it to DEAD_IMAGE_HOSTS.
 */

/** Hosts whose files no longer resolve (checked Nov 2026). */
const DEAD_IMAGE_HOSTS = new Set(['files.manuscdn.com']);

/** Brand fallback images, keyed by article category. */
export const CATEGORY_IMAGES: Record<string, string> = {
  'AI & Automation': '/images/ai-automation-abstract-brand.png',
  'Platform Strategy': '/images/seo-organic-discovery-brand.png',
  'Measurement & Attribution': '/images/conversion-optimization-abstract-brand.png',
  'Creative & Content': '/images/creative-ugc-performance-brand.png',
  'Agency Strategy': '/images/agency-strategy-abstract-brand.png',
  'PE/VC': '/images/pe-vc-financial-tech-brand.png',
};

export const DEFAULT_ARTICLE_IMAGE = '/images/og-brand.png';

/** Returns the URL when it is safe to render, otherwise undefined. */
export function usableCover(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (!url.startsWith('http')) return url; // local file
  try {
    return DEAD_IMAGE_HOSTS.has(new URL(url).hostname) ? undefined : url;
  } catch {
    return undefined;
  }
}

/** Cover to show for an article: a working cover, else the category image. */
export function resolveArticleImage(
  category: string,
  ...covers: (string | null | undefined)[]
): string {
  for (const c of covers) {
    const ok = usableCover(c);
    if (ok) return ok;
  }
  return CATEGORY_IMAGES[category] || DEFAULT_ARTICLE_IMAGE;
}
