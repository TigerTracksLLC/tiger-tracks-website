import { ART_PRESETS } from '@/lib/brandArt';

/**
 * Serves the brand art from src/lib/brandArt.ts as SVG image files,
 * for example /art/work-ag1.svg. Every picture is generated at build time.
 */

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ART_PRESETS).map((key) => ({ name: `${key}.svg` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const make = ART_PRESETS[name.endsWith('.svg') ? name.slice(0, -4) : name];
  if (!make) return new Response('Not found', { status: 404 });
  return new Response(make(), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
