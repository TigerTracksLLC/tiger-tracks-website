import type { NotionBlock, NotionRichText } from './notion';

/**
 * Strips AI drafting leftovers from Notion article bodies at render time so
 * they never reach readers or crawlers, even if the Notion page still has them.
 * Fix the source in Notion too; this is a safety net, not the editorial process.
 */

const DROP_BLOCK_PATTERNS: RegExp[] = [
  /^\s*insert\b/i, // "Insert brand-colored chart ..."
  /\[insert[^\]]*\]/i, // "[Insert URL]"
  /should be placed here/i,
  /^\s*brand-colored (bar )?(chart|infographic)/i,
  /^\s*(visual asset|carousel content script|content script for carousel|visual asset content script)/i,
  /^\s*new subsection:/i,
];

const CUT_FROM_HERE: RegExp[] = [/linkedin post package/i];

const MARKER = /\[\/?CALLOUT(?::[a-z_]+)?\]/gi;

function plain(rt?: NotionRichText[]): string {
  return (rt ?? []).map((r) => r.plain_text).join('');
}

function cleanRichText(rt?: NotionRichText[]): NotionRichText[] | undefined {
  if (!rt) return rt;
  return rt
    .map((r) => ({ ...r, plain_text: r.plain_text.replace(MARKER, '').replace(/ {2,}/g, ' ') }))
    .filter((r) => r.plain_text.length > 0);
}

type State = { cut: boolean };

function cleanBlock(b: NotionBlock, state: State): NotionBlock {
  return {
    ...b,
    data: {
      ...b.data,
      rich_text: cleanRichText(b.data.rich_text),
      caption: cleanRichText(b.data.caption),
    },
    children: b.children ? walk(b.children, state) : b.children,
  };
}

/** Public entry point. Once a "LinkedIn Post Package" marker is found at any
 *  depth, everything after it in the article is removed. */
export function cleanBlocks(blocks: NotionBlock[]): NotionBlock[] {
  return walk(blocks, { cut: false });
}

function walk(blocks: NotionBlock[], state: State): NotionBlock[] {
  const out: NotionBlock[] = [];
  for (const b of blocks) {
    if (state.cut) break;
    const text = plain(b.data.rich_text) + ' ' + plain(b.data.caption);
    if (CUT_FROM_HERE.some((re) => re.test(text))) {
      state.cut = true;
      break;
    }
    if (DROP_BLOCK_PATTERNS.some((re) => re.test(text.trim()))) continue;
    const cleaned = cleanBlock(b, state);
    const isTextBlock = b.data.rich_text !== undefined && !b.has_children;
    if (isTextBlock && plain(cleaned.data.rich_text).trim() === '' && plain(b.data.rich_text).trim() !== '') {
      continue; // block contained only markers
    }
    out.push(cleaned);
  }
  return out;
}
