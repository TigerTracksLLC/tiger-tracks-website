/**
 * Brand art: code-drawn graphics in the Tiger Tracks palette.
 *
 * These replace the earlier teal renders and stand in for photography and
 * product screenshots until the real assets arrive. Each picture is an SVG
 * built from a seed, so it is sharp at any size, a few kilobytes, and the same
 * on every build.
 *
 * The pictures are served as image files by src/app/art/[name]/route.ts, for
 * example /art/work-ag1.svg, so they can be used on any page or downloaded.
 *
 * To add a picture, add a line to ART_PRESETS. Change `seed` for a new
 * variation and `bg`, `fg` or `tones` for a new colourway. Only the brand
 * colours are available.
 */

export const BRAND = {
  ink: '#052E3F',
  orange: '#FE5E16',
  teal: '#7FCAD3',
  lime: '#D3E3A0',
  paper: '#EFF0EF',
} as const;

export type Tone = keyof typeof BRAND;

interface Opts {
  seed?: number;
  bg?: Tone;
  fg?: Tone;
  tones?: Tone[];
  w?: number;
  h?: number;
}

const DEFAULT_TONES: Tone[] = ['orange', 'teal', 'lime', 'paper'];

/** Small deterministic random generator, so a seed always draws the same picture. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v: number) => String(Math.round(v * 10) / 10);

function frame(w: number, h: number, bg: Tone, body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"><rect width="${w}" height="${h}" fill="${BRAND[bg]}"/>${body}</svg>`;
}

/** Tiger stripes: tapered bands that reach in from the top and bottom edges. Tiles left to right. */
export function stripes({ seed = 1, bg = 'orange', fg = 'ink', w = 800, h = 600 }: Opts = {}) {
  const r = rng(seed);
  const count = Math.max(8, Math.round(w / 70));
  let paths = '';
  for (let i = 0; i < count; i++) {
    const fromTop = i % 2 === 0;
    const x0 = (i / count) * w + (r() - 0.5) * 30;
    const len = h * (0.6 + r() * 0.32);
    const wMax = 20 + r() * 20;
    const amp = 22 + r() * 30;
    const phase = r() * Math.PI * 2;
    const left: string[] = [];
    const right: string[] = [];
    const steps = 16;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const y = fromTop ? t * len - 24 : h + 24 - t * len;
      const x = x0 + Math.sin(t * 3.1 + phase) * amp * t + (fromTop ? 1 : -1) * t * 46;
      const half = wMax * Math.pow(1 - t, 0.72);
      left.push(`${n(x - half)},${n(y)}`);
      right.push(`${n(x + half)},${n(y)}`);
    }
    paths += `<path d="M${left.join('L')}L${right.reverse().join('L')}Z"/>`;
  }
  /* Repeated one width to each side so the left and right edges join up when tiled. */
  return frame(w, h, bg, `<g id="s" fill="${BRAND[fg]}">${paths}</g><use href="#s" x="${-w}"/><use href="#s" x="${w}"/>`);
}

/** Contour lines, like tracks on a map. */
export function contours({ seed = 2, bg = 'lime', fg = 'ink', w = 800, h = 600 }: Opts = {}) {
  const r = rng(seed);
  const cx = w * (0.28 + r() * 0.44);
  const cy = h * (0.32 + r() * 0.36);
  const p1 = r() * 6.28;
  const p2 = r() * 6.28;
  const p3 = r() * 6.28;
  let rings = '';
  for (let k = 1; k <= 14; k++) {
    const base = k * 44;
    const pts: string[] = [];
    for (let s = 0; s < 72; s++) {
      const a = (s / 72) * Math.PI * 2;
      const rad = base * (1 + 0.16 * Math.sin(3 * a + p1) + 0.09 * Math.sin(5 * a + p2 + k * 0.22) + 0.06 * Math.sin(2 * a + p3));
      pts.push(`${n(cx + Math.cos(a) * rad)},${n(cy + Math.sin(a) * rad * 0.82)}`);
    }
    rings += `<path d="M${pts.join('L')}Z"/>`;
  }
  return frame(w, h, bg, `<g fill="none" stroke="${BRAND[fg]}" stroke-width="5" stroke-linejoin="round">${rings}</g>`);
}

/** Rising bars: a growth curve built from blocks. */
export function rise({ seed = 3, bg = 'ink', tones = DEFAULT_TONES, w = 800, h = 600 }: Opts = {}) {
  const r = rng(seed);
  const cols = 8;
  const gap = 16;
  const bw = (w - gap * (cols + 1)) / cols;
  let body = `<circle cx="${n(w * 0.2)}" cy="${n(h * 0.26)}" r="${n(h * 0.13)}" fill="${BRAND[tones[1 % tones.length]]}"/>`;
  for (let i = 0; i < cols; i++) {
    const height = h * (0.08 + 0.8 * Math.pow((i + 1) / cols, 1.9)) * (0.94 + r() * 0.1);
    body += `<rect x="${n(gap + i * (bw + gap))}" y="${n(h - height)}" width="${n(bw)}" height="${n(height)}" fill="${BRAND[tones[i % tones.length]]}"/>`;
  }
  return frame(w, h, bg, body);
}

/** Halftone dots that swell under a growth curve. */
export function halftone({ seed = 4, bg = 'lime', fg = 'ink', w = 800, h = 600 }: Opts = {}) {
  const r = rng(seed);
  const cols = 22;
  const rows = Math.round((cols * h) / w);
  const power = 2 + r() * 0.8;
  let dots = '';
  for (let c = 0; c < cols; c++) {
    for (let q = 0; q < rows; q++) {
      const x = ((c + 0.5) * w) / cols;
      const y = ((q + 0.5) * h) / rows;
      const curve = h - h * 0.92 * Math.pow(x / w, power) - 16;
      const depth = Math.min(Math.max((y - curve) / (h * 0.45), 0), 1);
      dots += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(1.6 + depth * (w / cols) * 0.42)}"/>`;
    }
  }
  return frame(w, h, bg, `<g fill="${BRAND[fg]}">${dots}</g>`);
}

/** Concentric bands radiating from one corner. */
export function rings({ seed = 5, bg = 'teal', tones = ['ink', 'orange', 'lime', 'paper'], w = 800, h = 600 }: Opts = {}) {
  const r = rng(seed);
  const corners: [number, number][] = [
    [0, h],
    [w, h],
    [w, 0],
    [0, 0],
  ];
  const [cx, cy] = corners[Math.floor(r() * 4)];
  const step = 74 + r() * 20;
  let body = '';
  for (let i = 0; i < 9; i++) {
    body += `<circle cx="${cx}" cy="${cy}" r="${n((9 - i) * step)}" fill="${BRAND[tones[i % tones.length]]}"/>`;
  }
  return frame(w, h, bg, body);
}

/** Waves that gain amplitude from left to right. */
export function signal({ seed = 6, bg = 'ink', tones = ['lime', 'teal', 'orange', 'paper'], w = 800, h = 600 }: Opts = {}) {
  const r = rng(seed);
  const lines = 6;
  let body = '';
  for (let l = 0; l < lines; l++) {
    const base = ((l + 1) * h) / (lines + 1);
    const freq = 0.012 + r() * 0.012;
    const phase = r() * 6.28;
    const amp = h * (0.07 + r() * 0.07);
    const pts: string[] = [];
    for (let x = -10; x <= w + 10; x += 10) {
      const grow = Math.pow(Math.max(x, 0) / w, 1.4);
      pts.push(`${n(x)},${n(base - grow * amp * Math.sin(x * freq + phase))}`);
    }
    body += `<path d="M${pts.join('L')}" stroke="${BRAND[tones[l % tones.length]]}"/>`;
  }
  return frame(w, h, bg, `<g fill="none" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">${body}</g>`);
}

/** A mosaic of squares, discs and quarter discs. */
export function mosaic({ seed = 7, bg = 'ink', tones = DEFAULT_TONES, w = 800, h = 600 }: Opts = {}) {
  const r = rng(seed);
  const cell = 200;
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  let body = '';
  for (let c = 0; c < cols; c++) {
    for (let q = 0; q < rows; q++) {
      const x = c * cell;
      const y = q * cell;
      const base = tones[Math.floor(r() * tones.length)];
      let top = tones[Math.floor(r() * tones.length)];
      if (top === base) top = bg;
      const kind = Math.floor(r() * 4);
      const turn = `rotate(${Math.floor(r() * 4) * 90} ${x + cell / 2} ${y + cell / 2})`;
      body += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${BRAND[base]}"/>`;
      if (kind === 0) {
        body += `<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="${cell / 2}" fill="${BRAND[top]}"/>`;
      } else if (kind === 1) {
        body += `<path d="M${x},${y}L${x + cell},${y}A${cell},${cell} 0 0 1 ${x},${y + cell}Z" fill="${BRAND[top]}" transform="${turn}"/>`;
      } else if (kind === 2) {
        body += `<rect x="${x}" y="${y}" width="${cell}" height="${cell / 2}" fill="${BRAND[top]}" transform="${turn}"/>`;
      }
    }
  }
  return frame(w, h, bg, body);
}

/**
 * Named pictures. Each key is served at /art/<key>.svg.
 * The homepage uses these by name.
 */
export const ART_PRESETS: Record<string, () => string> = {
  // Drifting tiger stripe bands
  'band-hero': () => stripes({ seed: 11, w: 1600, h: 200 }),
  'band-close': () => stripes({ seed: 17, w: 1600, h: 200 }),
  // Section textures
  'number-halftone': () => halftone({ seed: 4, bg: 'lime', fg: 'ink' }),
  'quote-contours': () => contours({ seed: 21, bg: 'teal', fg: 'ink' }),
  // Client results
  'work-ag1': () => rise({ seed: 3, bg: 'orange', tones: ['ink', 'paper', 'lime', 'ink'] }),
  'work-broadband': () => signal({ seed: 8, bg: 'lime', tones: ['ink', 'orange', 'ink', 'teal'] }),
  'work-monarch': () => mosaic({ seed: 14, bg: 'teal', tones: ['ink', 'paper', 'orange', 'lime'] }),
  // Capabilities
  'cap-demand-gen': () => rise({ seed: 31, bg: 'lime', tones: ['ink', 'orange', 'teal', 'ink'] }),
  'cap-creative': () => stripes({ seed: 32, bg: 'orange', fg: 'ink' }),
  'cap-cro': () => rings({ seed: 33, bg: 'teal' }),
  'cap-analytics': () => signal({ seed: 34, bg: 'lime', tones: ['ink', 'orange', 'ink', 'teal'] }),
  'cap-organic': () => contours({ seed: 35, bg: 'lime', fg: 'ink' }),
  'cap-lifecycle': () => mosaic({ seed: 36, bg: 'ink' }),
  // Doors
  'door-wayfinder': () => signal({ seed: 41, bg: 'ink' }),
  'door-trust': () => rings({ seed: 42, bg: 'orange', tones: ['ink', 'lime', 'paper', 'ink'] }),
  // Research
  'research-ai': () => mosaic({ seed: 51, bg: 'orange', tones: ['ink', 'lime', 'teal', 'paper'] }),
  'research-platform': () => contours({ seed: 52, bg: 'teal', fg: 'ink' }),
  'research-measurement': () => halftone({ seed: 53, bg: 'lime', fg: 'ink' }),
};
