import { blogPosts, type BlogPost } from './blogPosts';

/**
 * Editorial hold list (Oct 2026). blogPosts.ts is regenerated weekly by the
 * Notion sync, so publishing decisions live here instead.
 *
 * - NOTION_BLANK: body fails to load from Notion; crawlers see only the
 *   "loading its content from Notion" stub.
 * - FABRICATED_SOURCES: cite references that do not exist (e.g. "Smith, J.").
 *
 * Held slugs are removed from listings and the sitemap and 307 to
 * /intelligence (see next.config.ts). Fix the article in Notion, then delete
 * its slug from this list to republish.
 */
export const NOTION_BLANK = [
  'closing-the-ad-to-action-gap-tiger-tracks-partners-with-seeen',
  'programmatic-and-ctv-in-practice',
  'tiktok-ads-a-senior-media-buyers-playbook',
  'when-cfos-run-cmos-forecasts-uplift-and-the-new-growth-mandate',
  'conversational-collaboration-using-generative-ai-and-voice',
  'headline-copy-secrets-proven-ab-testing-strategies',
  'the-geometry-of-growth-how-tiger-tracks-reengineers-ecommerce-performance',
  'why-your-cac-is-lying-to-you',
  'the-future-of-growth-marketing-is-native-nimble-and-no-longer-polished',
  'digital-marketing-due-diligence-the-overlooked-lever-in-private-equity-value-creation',
  'conversion-tracking-reinvented-precision-in-the-age-of-privacy',
  'the-invisible-hand-how-digital-marketing-is-rewriting-the-rules-of-business-in-2025',
  'the-great-splintering-why-everything-you-know-about-video-advertising-is-wrong',
  'the-top-5-criteria-for-evaluating-your-marketing-agency',
];

export const FABRICATED_SOURCES: string[] = [
  // Oct 29 2026: the three articles first flagged here were re-checked against
  // the live HTML and now cite real sources; none are held.
];

export const HELD_SLUGS = new Set<string>([...NOTION_BLANK, ...FABRICATED_SOURCES]);

export const publishedPosts: BlogPost[] = blogPosts.filter((p) => !HELD_SLUGS.has(p.slug));
