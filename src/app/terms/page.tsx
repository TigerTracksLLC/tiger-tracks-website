import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms that govern use of the tigertracks.ai website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Use" updated="October 29, 2026">
      <p>
        These terms govern your use of tigertracks.ai (the &ldquo;Site&rdquo;), operated by Tiger
        Tracks, LLC (&ldquo;Tiger Tracks&rdquo;). By using the Site you agree to them. If you do not
        agree, please do not use the Site. Services we provide to clients are governed by separate
        written agreements, which control if they conflict with these terms.
      </p>

      <h2>Use of the Site</h2>
      <p>
        You may use the Site for lawful purposes and to learn about Tiger Tracks. You agree not to
        misuse it, including by attempting to gain unauthorized access, interfering with its
        operation, scraping it at a scale that burdens it, or submitting false or harmful
        information through its forms.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        The Site&apos;s content, including text, graphics, logos, tools and articles, belongs to
        Tiger Tracks or its licensors and is protected by intellectual property laws. You may view
        and share links to it for personal or internal business use. You may not copy, modify or
        republish it for commercial purposes without our written permission. Client names and
        trademarks belong to their owners and are used with permission or for identification.
      </p>

      <h2>No professional advice or guarantee</h2>
      <p>
        Articles, case studies, calculators, tool demos and diagnostics on the Site are for general
        information. Results described reflect specific engagements and are not a promise of
        similar results for your business.
      </p>

      <h2>Submissions</h2>
      <p>
        When you submit information through the Site, you confirm it is accurate and that you are
        allowed to share it. We handle it as described in our{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Third-party links</h2>
      <p>
        The Site links to third-party websites we do not control. We are not responsible for their
        content or practices.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
        of any kind, express or implied, to the fullest extent permitted by law.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Tiger Tracks will not be liable for any indirect,
        incidental, special or consequential damages arising from your use of the Site.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of New York, without regard to its
        conflict of law rules.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms by posting a new version on this page.</p>

      <h2>Contact</h2>
      <p>
        Tiger Tracks, LLC, New York, NY.{' '}
        <a href="mailto:info@tigertracks.ai">info@tigertracks.ai</a>
      </p>
    </LegalPage>
  );
}
