'use server';

import { Resend } from 'resend';

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const HUBSPOT_PORTAL_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '44278456';
const HUBSPOT_FORM_GUID =
  process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID ||
  '7ebf07f8-8a2d-4120-8502-e40e863e6126';

const NOTIFY_TO = ['grant@tigertracks.ai', 'info@tigertracks.ai'];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DiagnosticPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  annualRevenue?: string;
  goal?: string;
  budget?: string;
  channels?: string;
  /** Legacy field from the original /get-started form */
  companyUrl?: string;
  /** HubSpot tracking cookie + page context (passed from client) */
  hutk?: string;
  pageUri?: string;
  pageName?: string;
  /** Honeypot field - must stay empty. If a value arrives, it's a bot. */
  hp?: string;
}

export interface DiagnosticResult {
  success: boolean;
  message: string;
}

/* ------------------------------------------------------------------ */
/*  HubSpot Forms API                                                  */
/* ------------------------------------------------------------------ */

async function submitToHubSpot(p: DiagnosticPayload): Promise<boolean> {
  const trimmedName = p.name.trim();
  const spaceIdx = trimmedName.indexOf(' ');
  const firstname = spaceIdx === -1 ? trimmedName : trimmedName.slice(0, spaceIdx);
  const lastname = spaceIdx === -1 ? '' : trimmedName.slice(spaceIdx + 1);

  const messageParts: string[] = [];
  if (p.company?.trim()) messageParts.push(`Company: ${p.company.trim()}`);
  if (p.goal) messageParts.push(`Primary goal: ${p.goal}`);
  if (p.budget) messageParts.push(`Monthly ad budget: ${p.budget}`);
  if (p.channels) messageParts.push(`Current channels: ${p.channels}`);
  messageParts.push('Source: tigertracks.ai Strategic Diagnostic form');

  const fields: { name: string; value: string }[] = [
    { name: 'email', value: p.email.trim() },
    { name: 'firstname', value: firstname },
    { name: 'message', value: messageParts.join('\n') },
  ];
  if (lastname) fields.push({ name: 'lastname', value: lastname });
  if (p.phone?.trim()) fields.push({ name: 'phone', value: p.phone.trim() });
  const site = (p.website || p.companyUrl || '').trim();
  if (site) fields.push({ name: 'website', value: site });
  if (p.annualRevenue) {
    fields.push({ name: 'projected_annual_revenue', value: p.annualRevenue });
  }

  const context: Record<string, string> = {
    pageUri: p.pageUri || 'https://tigertracks.ai/',
    pageName: p.pageName || 'Tiger Tracks',
  };
  if (p.hutk) context.hutk = p.hutk;

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context }),
      },
    );
    if (res.ok) return true;
    console.error(
      '[submitDiagnostic] HubSpot error:',
      res.status,
      await res.text(),
    );
    return false;
  } catch (err) {
    console.error('[submitDiagnostic] HubSpot exception:', err);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Email Template                                                     */
/* ------------------------------------------------------------------ */

function buildEmailHtml(body: Record<string, string>): string {
  const rows = [
    ['Name', body.name],
    ['Email', body.email],
    ['Phone', body.phone || 'Not provided'],
    ['Company', body.company || 'Not provided'],
    ['Website', body.website || 'Not provided'],
    ['Annual Revenue', body.annualRevenue || 'Not provided'],
    ['Goal', body.goal || 'Not specified'],
    ['Budget', body.budget || 'Not specified'],
    ['Channels', body.channels || 'Not specified'],
    ['Submitted', body.submittedAt],
  ];

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #052E3F; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(#7FCAD3, #7FCAD3); padding: 32px 24px; text-align: center;">
        <h1 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
          New Diagnostic Request
        </h1>
        <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">
          Tiger Tracks Strategic Diagnostic Form
        </p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #9FB0B7; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; width: 130px; vertical-align: top;">
                ${label}
              </td>
              <td style="padding: 12px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #FFFFFF; font-size: 14px;">
                ${value}
              </td>
            </tr>
          `,
            )
            .join('')}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: rgba(127, 202, 211, 0.08); border: 1px solid rgba(127, 202, 211, 0.2); border-radius: 8px;">
          <p style="margin: 0; color: #7FCAD3; font-size: 13px;">
            Reply directly to this email to reach <strong>${body.name}</strong> at <strong>${body.email}</strong>.
            This lead was also added to HubSpot automatically.
          </p>
        </div>
      </div>
      <div style="padding: 16px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06);">
        <p style="margin: 0; color: #5E7781; font-size: 11px;">
          Sent from tigertracks.ai diagnostic form
        </p>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Slack notification                                                 */
/* ------------------------------------------------------------------ */

async function postToSlack(body: Record<string, string>): Promise<boolean> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn('[submitDiagnostic] SLACK_WEBHOOK_URL is not set.');
    return false;
  }

  const lines = [
    `*New Diagnostic Request* - ${body.name}${body.company ? ` (${body.company})` : ''}`,
    `:email: ${body.email}`,
    body.phone ? `:phone: ${body.phone}` : '',
    body.website ? `:globe_with_meridians: ${body.website}` : '',
    body.annualRevenue ? `:moneybag: Revenue: ${body.annualRevenue}` : '',
    body.goal ? `:dart: Goal: ${body.goal}` : '',
    body.budget ? `:chart_with_upwards_trend: Budget: ${body.budget}` : '',
    body.channels ? `:satellite: Channels: ${body.channels}` : '',
  ].filter(Boolean);

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines.join('\n') }),
    });
    if (res.ok) return true;
    console.error('[submitDiagnostic] Slack error:', res.status, await res.text());
    return false;
  } catch (err) {
    console.error('[submitDiagnostic] Slack exception:', err);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Server Action                                                      */
/* ------------------------------------------------------------------ */

export async function submitDiagnostic(
  payload: DiagnosticPayload,
): Promise<DiagnosticResult> {
  /* ---- Spam protection (honeypot) ----
     Bots fill every field, including the hidden one. Pretend success so the
     bot doesn't retry, but skip all downstream processing. */
  if (payload.hp && payload.hp.trim() !== '') {
    return { success: true, message: 'Diagnostic request received.' };
  }

  /* ---- Validation ---- */
  if (!payload.name?.trim()) {
    return { success: false, message: 'Name is required.' };
  }
  if (!payload.email?.trim()) {
    return { success: false, message: 'Email is required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  /* ---- Build the outbound body ---- */
  const body: Record<string, string> = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || '',
    company: payload.company?.trim() || '',
    website: (payload.website || payload.companyUrl || '').trim(),
    annualRevenue: payload.annualRevenue || '',
    goal: payload.goal || '',
    budget: payload.budget || '',
    channels: payload.channels || '',
    submittedAt: new Date().toISOString(),
    source: 'tiger-tracks-diagnostic-form',
  };

  /* ---- HubSpot (Forms API) + Slack, in parallel ---- */
  const [hubspotOk, slackOk] = await Promise.all([
    submitToHubSpot(payload),
    postToSlack(body),
  ]);
  void slackOk; // Slack is best-effort; not required for success.

  /* ---- Resend notification ---- */
  let resendOk = false;
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);

      const { error } = await resend.emails.send({
        from: 'Tiger Tracks <notifications@tigertracks.ai>',
        to: NOTIFY_TO,
        replyTo: payload.email.trim(),
        subject: `New Diagnostic Request from ${body.name}${body.company ? ` (${body.company})` : ''}`,
        html: buildEmailHtml(body),
      });

      if (error) {
        console.error('[submitDiagnostic] Resend error:', error);
      } else {
        resendOk = true;
      }
    } catch (err) {
      console.error('[submitDiagnostic] Resend exception:', err);
    }
  } else {
    console.warn('[submitDiagnostic] RESEND_API_KEY is not set.');
  }

  /* ---- Result: success if either channel worked ---- */
  if (hubspotOk || resendOk) {
    return { success: true, message: 'Diagnostic request received.' };
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn('[submitDiagnostic] Dev mode, logging payload:', body);
    return { success: true, message: 'Logged locally (dev mode).' };
  }

  return {
    success: false,
    message:
      'We were unable to process your request right now. Please try again or email us directly.',
  };
}
