'use client';

import Image from 'next/image';
import type { NotionBlock, NotionRichText } from '@/lib/notion';

/* ------------------------------------------------------------------ */
/*  Heading helpers (shared with the Table of Contents)                */
/* ------------------------------------------------------------------ */

/** Flatten a block's rich_text into a plain string. */
export function richTextToPlain(segments?: NotionRichText[]): string {
  if (!segments || segments.length === 0) return '';
  return segments.map((s) => s.plain_text).join('');
}

/** Stable, URL-safe anchor id derived from a heading's text. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The anchor id for a heading block (empty string if not a heading). */
export function headingId(block: NotionBlock): string {
  const text = richTextToPlain(block.data.rich_text);
  const base = slugifyHeading(text);
  // Suffix with the block id tail to guarantee uniqueness across duplicate text.
  return base ? `${base}-${block.id.slice(0, 4)}` : block.id.slice(0, 8);
}

/* ------------------------------------------------------------------ */
/*  Rich Text Renderer                                                 */
/* ------------------------------------------------------------------ */

function RichText({ segments }: { segments: NotionRichText[] }) {
  if (!segments || segments.length === 0) return null;

  return (
    <>
      {segments.map((seg, i) => {
        let node: React.ReactNode = seg.plain_text;

        if (seg.annotations.code) {
          node = (
            <code className="rounded bg-black/[0.14] px-1.5 py-0.5 text-[0.88em] font-mono text-[#7FCAD3] print:bg-tt-gray-100 print:text-tt-gray-800">
              {node}
            </code>
          );
        }
        if (seg.annotations.bold) {
          node = <strong className="font-bold text-[#EFF0EF] print:text-black">{node}</strong>;
        }
        if (seg.annotations.italic) {
          node = <em>{node}</em>;
        }
        if (seg.annotations.strikethrough) {
          node = <s>{node}</s>;
        }
        if (seg.annotations.underline) {
          node = <u>{node}</u>;
        }
        if (seg.href) {
          node = (
            <a
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7FCAD3] underline decoration-[#7FCAD3]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#7FCAD3] print:text-blue-700 print:decoration-blue-700/50"
            >
              {node}
            </a>
          );
        }

        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Callout Color Mapping (exact Notion dark-mode RGB values)          */
/* ------------------------------------------------------------------ */

const CALLOUT_BG_COLORS: Record<string, string> = {
  green_background: '#1F4553',
  blue_background: '#052E3F',
  yellow_background: '#D3E3A0',
  brown_background: '#D3E3A0',
  gray_background: 'rgba(0, 0, 0, 0.14)',
  purple_background: 'rgb(60, 40, 80)',
  red_background: 'rgb(31, 69, 83)',
  orange_background: 'rgb(254, 94, 22)',
  pink_background: 'rgb(76, 35, 55)',
  default: 'rgba(255, 255, 255, 0.04)',
};

function getCalloutBg(color?: string): string {
  if (!color) return CALLOUT_BG_COLORS.default;
  return CALLOUT_BG_COLORS[color] ?? CALLOUT_BG_COLORS.default;
}

/* ------------------------------------------------------------------ */
/*  Individual Block Components                                        */
/* ------------------------------------------------------------------ */

function Paragraph({ block }: { block: NotionBlock }) {
  const rt = block.data.rich_text;
  if (!rt || rt.length === 0) return <div className="h-6 print:h-4" />;
  return (
    <p className="font-sans text-[#EFF0EF] leading-6 text-base text-left py-[3px] print:text-black print:text-sm print:leading-[1.7]">
      <RichText segments={rt} />
    </p>
  );
}

function Heading1({ block }: { block: NotionBlock }) {
  return (
    <h2 id={headingId(block)} className="scroll-mt-24 mt-6 mb-[6px] text-[24px] font-semibold text-[#EFF0EF] leading-[31.2px] font-sans print:text-black print:text-xl print:mt-10 print:mb-4">
      <RichText segments={block.data.rich_text ?? []} />
    </h2>
  );
}

function Heading2({ block }: { block: NotionBlock }) {
  return (
    <h3 id={headingId(block)} className="scroll-mt-24 mt-6 mb-[6px] text-[24px] font-semibold text-[#EFF0EF] leading-[31.2px] font-sans print:text-black print:text-lg print:mt-8 print:mb-3">
      <RichText segments={block.data.rich_text ?? []} />
    </h3>
  );
}

function Heading3({ block }: { block: NotionBlock }) {
  return (
    <h4 id={headingId(block)} className="scroll-mt-24 mt-5 mb-1 text-xl font-semibold text-[#EFF0EF] leading-[26px] font-sans print:text-black print:text-base print:mt-6 print:mb-2">
      <RichText segments={block.data.rich_text ?? []} />
    </h4>
  );
}

function BulletedListItem({ block }: { block: NotionBlock }) {
  return (
    <li className="font-sans text-[#EFF0EF] text-base leading-6 py-[2px] print:text-black print:text-sm">
      <RichText segments={block.data.rich_text ?? []} />
      {block.children && block.children.length > 0 && (
        <ul className="mt-1 ml-6 list-disc">
          {block.children.map((child) => (
            <BlockRenderer key={child.id} block={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function NumberedListItem({ block }: { block: NotionBlock }) {
  return (
    <li className="font-sans text-[#EFF0EF] text-base leading-6 py-[2px] print:text-black print:text-sm">
      <RichText segments={block.data.rich_text ?? []} />
      {block.children && block.children.length > 0 && (
        <ol className="mt-1 ml-6 list-decimal">
          {block.children.map((child) => (
            <BlockRenderer key={child.id} block={child} />
          ))}
        </ol>
      )}
    </li>
  );
}

function TodoItem({ block }: { block: NotionBlock }) {
  return (
    <li className="flex items-start gap-3 font-sans text-[#EFF0EF] text-base leading-6 py-[2px] print:text-black print:text-sm">
      <span className={`mt-1.5 h-4 w-4 shrink-0 rounded border ${block.data.checked ? 'bg-[#7FCAD3] border-[#7FCAD3] print:bg-black print:border-black' : 'border-white/20 print:border-tt-gray-400'} flex items-center justify-center`}>
        {block.data.checked && (
          <svg className="w-2.5 h-2.5 text-white print:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className={block.data.checked ? 'line-through opacity-60' : ''}>
        <RichText segments={block.data.rich_text ?? []} />
      </span>
    </li>
  );
}

function Quote({ block }: { block: NotionBlock }) {
  return (
    <blockquote className="my-4 border-l-[3px] border-white/30 pl-4 py-[3px] print:border-tt-gray-300">
      <p className="font-sans text-[#EFF0EF] text-base leading-6 text-left print:text-tt-gray-700 print:text-sm">
        <RichText segments={block.data.rich_text ?? []} />
      </p>
    </blockquote>
  );
}

function Callout({ block }: { block: NotionBlock }) {
  const emoji = block.data.icon?.type === 'emoji' ? block.data.icon.emoji : null;
  const bgColor = getCalloutBg(block.data.color);

  return (
    <div
      className="my-4 flex gap-3 rounded-[10px] p-4 print:border print:border-tt-gray-300 print:bg-tt-gray-100"
      style={{ background: bgColor }}
    >
      {emoji && <span className="text-xl shrink-0 mt-0.5 print:text-lg">{emoji}</span>}
      <div className="font-sans text-[#EFF0EF] text-base leading-6 font-bold text-left print:text-black print:text-sm print:font-normal">
        <RichText segments={block.data.rich_text ?? []} />
        {block.children && block.children.length > 0 && (
          <div className="mt-2 font-normal">
            {block.children.map((child) => (
              <BlockRenderer key={child.id} block={child} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CodeBlock({ block }: { block: NotionBlock }) {
  const lang = block.data.language || '';
  const text = (block.data.rich_text ?? []).map((s) => s.plain_text).join('');
  return (
    <div className="my-4 rounded-sm overflow-hidden border border-white/[0.06] print:border-tt-gray-300 print:rounded-none">
      {/* Language tab */}
      <div className="flex items-center gap-2 bg-[#1F4553] px-4 py-2 border-b border-white/[0.06] print:bg-tt-gray-100 print:border-tt-gray-300">
        <div className="flex gap-1.5 print:hidden">
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <span className="ml-2 text-xs font-mono uppercase tracking-wider text-tt-gray-500 print:text-tt-gray-500 print:ml-0">{lang}</span>
      </div>
      <pre className="bg-[#052E3F] p-6 overflow-x-auto print:bg-tt-gray-100 print:p-4">
        <code className="text-sm font-mono text-[#EFF0EF] leading-relaxed whitespace-pre print:text-black print:text-xs">{text}</code>
      </pre>
    </div>
  );
}

/**
 * Hosts whitelisted in next.config.ts remotePatterns (safe to optimize).
 * Any other external host bypasses the optimizer so the image still renders.
 */
const OPTIMIZABLE_HOSTS = ['files.manuscdn.com', 'www.notion.so'];

export function shouldSkipOptimizer(url: string): boolean {
  if (!url.startsWith('http')) return false; // local images: always optimize
  // Signed S3 URLs expire — skip optimizer cache
  if (url.startsWith('https://prod-files-secure') || url.startsWith('https://s3')) return true;
  try {
    return !OPTIMIZABLE_HOSTS.includes(new URL(url).hostname);
  } catch {
    return true;
  }
}

function NotionImage({ block }: { block: NotionBlock }) {
  const url = block.data.url;
  if (!url) return null;

  const caption = block.data.caption;
  const hasCaption = caption && caption.length > 0;

  return (
    <figure className="my-4 print:my-6">
      <div className="relative overflow-hidden">
        <Image
          src={url}
          alt={hasCaption ? caption.map((s) => s.plain_text).join('') : 'Article image'}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          unoptimized={shouldSkipOptimizer(url)}
        />
      </div>
      {hasCaption && (
        <figcaption className="mt-2 text-[13px] leading-snug font-sans text-[#EFF0EF]/50 print:text-tt-gray-500 print:text-xs">
          <RichText segments={caption} />
        </figcaption>
      )}
    </figure>
  );
}

function Divider() {
  return (
    <hr className="my-4 border-t border-white/[0.08] print:border-tt-gray-300" />
  );
}

function Toggle({ block }: { block: NotionBlock }) {
  return (
    <details className="my-2 group">
      <summary className="cursor-pointer py-[3px] text-[#EFF0EF] font-sans text-base list-none flex items-center gap-2 print:text-black">
        <svg
          className="w-3 h-3 text-[#EFF0EF] transition-transform duration-200 group-open:rotate-90 print:text-black"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M6 3l5 5-5 5V3z" />
        </svg>
        <RichText segments={block.data.rich_text ?? []} />
      </summary>
      <div className="pl-5 space-y-1">
        {block.children?.map((child) => (
          <BlockRenderer key={child.id} block={child} />
        ))}
      </div>
    </details>
  );
}

function VideoEmbed({ block }: { block: NotionBlock }) {
  const url = block.data.url;
  if (!url) return null;

  let embedUrl = url;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return (
    <div className="my-4 overflow-hidden print:hidden" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  );
}

function TableBlock({ block }: { block: NotionBlock }) {
  if (!block.children || block.children.length === 0) return null;

  return (
    <div className="my-4 rounded border border-white/10 print:border-tt-gray-300">
      <div className="overflow-x-auto">
        <table className="w-full text-base font-sans print:text-xs">
          <tbody>
            {block.children.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={rowIdx === 0 ? 'bg-black/[0.14] print:bg-tt-gray-100' : ''}
              >
                {(row.data.cells ?? []).map((cell, cellIdx) => {
                  const Tag = rowIdx === 0 ? 'th' : 'td';
                  return (
                    <Tag
                      key={cellIdx}
                      className={`p-3 text-left border-b border-white/10 print:border-tt-gray-200 ${
                        rowIdx === 0
                          ? 'font-semibold text-[#EFF0EF] text-sm font-sans print:text-black'
                          : 'text-[#EFF0EF] print:text-black'
                      }`}
                    >
                      <RichText segments={cell} />
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Block Router                                                       */
/* ------------------------------------------------------------------ */

function BlockRenderer({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph block={block} />;
    case 'heading_1':
      return <Heading1 block={block} />;
    case 'heading_2':
      return <Heading2 block={block} />;
    case 'heading_3':
      return <Heading3 block={block} />;
    case 'bulleted_list_item':
      return <BulletedListItem block={block} />;
    case 'numbered_list_item':
      return <NumberedListItem block={block} />;
    case 'to_do':
      return <TodoItem block={block} />;
    case 'quote':
      return <Quote block={block} />;
    case 'callout':
      return <Callout block={block} />;
    case 'code':
      return <CodeBlock block={block} />;
    case 'image':
      return <NotionImage block={block} />;
    case 'divider':
      return <Divider />;
    case 'toggle':
      return <Toggle block={block} />;
    case 'video':
    case 'embed':
      return <VideoEmbed block={block} />;
    case 'table':
      return <TableBlock block={block} />;
    case 'column_list':
      return (
        <div className="my-4 grid gap-4 print:gap-4" style={{ gridTemplateColumns: `repeat(${block.children?.length ?? 2}, 1fr)` }}>
          {block.children?.map((col) => (
            <div key={col.id}>
              {col.children?.map((child) => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </div>
          ))}
        </div>
      );
    case 'bookmark':
      return (
        <a
          href={block.data.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="my-4 flex items-center gap-3 border border-white/[0.06] bg-black/[0.14] px-4 py-3 text-[#7FCAD3] text-sm font-sans hover:border-[#7FCAD3]/30 transition-colors duration-300 rounded print:text-blue-700 print:border-tt-gray-300 print:bg-tt-gray-100"
        >
          <svg className="w-4 h-4 shrink-0 print:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="truncate">{block.data.url}</span>
        </a>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  List Grouper                                                       */
/*  Notion returns list items as siblings, not wrapped in <ul>/<ol>.   */
/*  This groups consecutive items before rendering.                     */
/* ------------------------------------------------------------------ */

interface GroupedBlock {
  kind: 'single' | 'bulleted_list' | 'numbered_list' | 'todo_list';
  blocks: NotionBlock[];
}

function groupBlocks(blocks: NotionBlock[]): GroupedBlock[] {
  const groups: GroupedBlock[] = [];
  let current: GroupedBlock | null = null;

  for (const block of blocks) {
    if (block.type === 'bulleted_list_item') {
      if (current?.kind === 'bulleted_list') {
        current.blocks.push(block);
      } else {
        current = { kind: 'bulleted_list', blocks: [block] };
        groups.push(current);
      }
    } else if (block.type === 'numbered_list_item') {
      if (current?.kind === 'numbered_list') {
        current.blocks.push(block);
      } else {
        current = { kind: 'numbered_list', blocks: [block] };
        groups.push(current);
      }
    } else if (block.type === 'to_do') {
      if (current?.kind === 'todo_list') {
        current.blocks.push(block);
      } else {
        current = { kind: 'todo_list', blocks: [block] };
        groups.push(current);
      }
    } else {
      current = null;
      groups.push({ kind: 'single', blocks: [block] });
    }
  }

  return groups;
}

/* ------------------------------------------------------------------ */
/*  Public Export                                                       */
/* ------------------------------------------------------------------ */

export function NotionBlockRenderer({ blocks }: { blocks: NotionBlock[] }) {
  const grouped = groupBlocks(blocks);

  return (
    <>
      {grouped.map((group, i) => {
        if (group.kind === 'bulleted_list') {
          return (
            <ul key={i} className="my-1 pl-6 list-disc">
              {group.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ul>
          );
        }
        if (group.kind === 'numbered_list') {
          return (
            <ol key={i} className="my-1 pl-6 list-decimal">
              {group.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ol>
          );
        }
        if (group.kind === 'todo_list') {
          return (
            <ul key={i} className="my-1 space-y-1 list-none">
              {group.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ul>
          );
        }

        const block = group.blocks[0];
        return <BlockRenderer key={block.id} block={block} />;
      })}
    </>
  );
}
