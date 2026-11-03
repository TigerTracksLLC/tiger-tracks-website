'use client';

/* ------------------------------------------------------------------ */
/*  Brand names, set in the Tiger Tracks label style (DM Sans,         */
/*  uppercase, tracked). We do not recreate other companies' logos in  */
/*  our own type. Swap in official monochrome logo files when the      */
/*  clients supply them.                                               */
/* ------------------------------------------------------------------ */

function Name({ text }: { text: string }) {
  return (
    <span
      className="block whitespace-nowrap font-eyebrow text-sm uppercase tracking-[0.2em]"
      style={{ fontFamily: 'var(--font-eyebrow)', fontWeight: 400 }}
    >
      {text}
    </span>
  );
}

const make = (text: string) => {
  const C = () => <Name text={text} />;
  C.displayName = `Name(${text})`;
  return C;
};

/* ------------------------------------------------------------------ */
/*  Logo groups                                                        */
/*  IMPORTANT: keep these two lists separate. Google-era brands are    */
/*  founder experience from their time at Google - NOT Tiger Tracks    */
/*  clients - and must never appear under a "client" label.            */
/* ------------------------------------------------------------------ */

// Brands Tiger Tracks has grown (each has a case study or testimonial).
export const clientLogos = [
  { key: 'ag1', Component: make('AG1') },
  { key: 'anastasia', Component: make('Anastasia Beverly Hills') },
  { key: 'monarchmoney', Component: make('Monarch Money') },
  { key: 'rhonutrition', Component: make('Rho Nutrition') },
  { key: 'aura', Component: make('Aura Health') },
  { key: 'lightyear', Component: make('Lightyear') },
  { key: 'capezio', Component: make('Capezio') },
  { key: 'dovetail', Component: make('Dovetail') },
] as const;

// Brands the founders built while at Google (founder experience, NOT TT clients).
export const googleEraLogos = [
  { key: 'att', Component: make('AT&T') },
  { key: 'verizon', Component: make('Verizon') },
  { key: 'underarmour', Component: make('Under Armour') },
  { key: 'snapchat', Component: make('Snapchat') },
] as const;
