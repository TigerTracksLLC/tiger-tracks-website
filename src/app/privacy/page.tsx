import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Tiger Tracks, LLC collects, uses and protects personal information on tigertracks.ai.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="October 29, 2026">
      <p>
        This policy explains how Tiger Tracks, LLC (&ldquo;Tiger Tracks,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;) collects, uses and shares personal information when you visit
        tigertracks.ai or contact us through it. It covers this website only. Work we do for
        clients is governed by our client agreements.
      </p>

      <h2>Information we collect</h2>
      <p>Information you give us:</p>
      <ul>
        <li>
          Strategic Diagnostic and contact forms: name, work email, phone number, company, website,
          and anything you tell us about your marketing program and goals.
        </li>
        <li>Newsletter sign-up: your email address.</li>
        <li>Emails you send to us, including job applications and press inquiries.</li>
      </ul>
      <p>Information collected automatically, subject to your cookie choices:</p>
      <ul>
        <li>
          Device and usage data such as pages viewed, referring site, browser type, approximate
          location derived from IP address, and site performance measurements.
        </li>
        <li>
          Cookies and similar technologies set by us and by the analytics and advertising tools
          listed below.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your request, prepare your diagnostic and follow up about our services.</li>
        <li>To send the newsletter you asked for. Every email has an unsubscribe link.</li>
        <li>To understand how the site is used and improve it.</li>
        <li>To measure and improve our own advertising, if you allow advertising cookies.</li>
        <li>To protect the site, prevent spam and meet legal obligations.</li>
      </ul>
      <p>
        We do not sell your personal information for money. If you accept advertising cookies,
        advertising platforms may receive information about your visit, which some state laws
        treat as &ldquo;sharing&rdquo; for targeted advertising. You can opt out at any time by
        declining in Cookie settings, and we treat a Global Privacy Control signal from your
        browser as an opt-out.
      </p>

      <h2>Who we share it with</h2>
      <p>We use service providers that process information on our behalf, including:</p>
      <ul>
        <li>
          HubSpot, our CRM, which stores form submissions and newsletter sign-ups and may set a
          cookie that links your visits to a form you submit.
        </li>
        <li>Resend and Slack, which deliver internal notifications when a form is submitted.</li>
        <li>Calendly, which runs the scheduling widget on our Get Started page.</li>
        <li>Vercel, which hosts the site.</li>
        <li>
          Google (Tag Manager and Analytics) and, where you allow advertising cookies, advertising
          platforms such as Meta and LinkedIn.
        </li>
      </ul>
      <p>
        We may also share information if required by law, to protect our rights, or as part of a
        merger, acquisition or sale of assets.
      </p>

      <h2>Cookies and your choices</h2>
      <p>
        When you first visit, we ask for your choice on analytics and advertising cookies and
        signal it to our tag manager, which is configured to respect it. Strictly necessary
        cookies, and cookies set by embedded tools you choose to use (such as the scheduling
        widget), may still be set. You can change your choice at any time with the
        &ldquo;Cookie settings&rdquo; link in the site footer, and you can also block cookies in
        your browser settings.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, including California and the European Economic Area, you may
        have the right to access, correct, delete or receive a copy of your personal information,
        and to object to or limit certain uses. To make a request, email{' '}
        <a href="mailto:info@tigertracks.ai?subject=Privacy%20request">info@tigertracks.ai</a>. We
        will verify the request and respond within the time required by law. We will not
        discriminate against you for exercising these rights.
      </p>

      <h2>Retention and security</h2>
      <p>
        We keep personal information for as long as needed for the purposes above, then delete or
        anonymize it. We use reasonable administrative and technical safeguards, described on our{' '}
        <Link href="/trust">Trust page</Link>. No method of transmission or storage is completely
        secure.
      </p>

      <h2>Children</h2>
      <p>This site is intended for business audiences and is not directed to children under 16.</p>

      <h2>International visitors</h2>
      <p>
        Tiger Tracks is based in the United States, and information you submit is processed in the
        United States.
      </p>

      <h2>Changes</h2>
      <p>
        We will post any changes to this policy on this page and update the date above.
      </p>

      <h2>Contact</h2>
      <p>
        Tiger Tracks, LLC, New York, NY.{' '}
        <a href="mailto:info@tigertracks.ai">info@tigertracks.ai</a>
      </p>
    </LegalPage>
  );
}
