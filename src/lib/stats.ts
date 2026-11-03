/**
 * Single source of truth for Tiger Tracks marketing statistics.
 *
 * Every hard-coded metric on the site should be imported from here so the
 * numbers stay consistent across pages. When a figure changes, change it once
 * in this file.
 *
 * Figures marked CONFIRM depend on internal figures only Tiger Tracks can
 * verify against its books - treat them as the canonical public claim.
 */

export const STATS = {
  // --- Company headline ---
  revenueGrowth: '2,954%', // Inc. 5000 three-year revenue growth
  incRank: '#123', // Inc. 5000 ranking
  foundingYear: 2021,
  teamSize: '30+', // Oct 22 2026 roster: 26 full-time + 6 starting (founders excluded). Approved public framing: 30+
  workModel: 'Fully remote, New York based',
  industries: '12',

  // Ad spend managed ($200M+ annual / $500M+ lifetime) PULLED Oct 2026: not verified by finance.

  // --- CEO / Ready valuation (matches public press) ---
  readyValuation: '$350M+', // was "$500M+" on-site; press reports "$350M+"

  // Portfolio averages (-18% CAC, 4.2x ROAS, +29% CVR, 2.3x LTV, 67%, 85%), 50+ brands served and
  // 18 mo avg tenure PULLED Oct 2026: not verified by finance. Do not re-add without a finance sign-off.

  // --- Representative (best-case, client-attributed) results ---
  // NEVER present these as averages. Always label "representative" / per-client.
  representative: {
    roasLift: '+147%',
    cvrLift: '+46%', // broadband engagement figure, cleared 2026-08-07
    organicTraffic: '+89%',
    ltvIncrease: '+34%',
    creativeWinRate: '3x',
    feedQualityLift: '+34%', // Platform Feed Optimization avg feed quality lift
  },

  // --- National broadband provider engagement (anonymized; NEVER name the client) ---
  // Percentages only. Cleared as accurate 2026-08-07. No raw conversion values,
  // no dollar figures, no client name anywhere.
  broadband: {
    cvrLift: '+46%', // website conversion rate
    purchases: '+32%',
    revenue: '+15%',
    rankingPositions: '+21', // avg organic Google ranking positions gained
  },

  // --- Monarch Money (public funding facts, verified via CNBC May 2025) ---
  monarch: {
    seriesB: '$75M',
    valuation: '$850M',
    usersGrowth: '+368%',
  },

  // --- Industry references (cited third-party figures) ---
  industry: {
    searchDeclineGartner: '25%', // Gartner: projected traditional search volume decline by 2026
  },
} as const;

export type SiteStats = typeof STATS;
