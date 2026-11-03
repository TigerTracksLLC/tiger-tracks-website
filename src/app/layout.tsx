import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClientBody } from '@/components/ClientBody';
import { WebVitals } from '@/components/WebVitals';
import { CookieConsent } from '@/components/CookieConsent';
import { ConsentBanner } from '@/components/ConsentBanner';

const SITE_URL = 'https://tigertracks.ai';
const OG_IMAGE = '/images/og-brand.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
    template: '%s | Tiger Tracks',
  },
  description:
    'Inc. 5000 #123 agency with 2,954% growth. Tiger Tracks delivers full-funnel performance marketing powered by proprietary AI for brands spending $100K–$5M/month. Book your free Strategic Diagnostic.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Tiger Tracks',
    title: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
    description:
      'Inc. 5000 #123 performance growth agency founded by ex-Google operators. Trusted by brands like AG1 and Anastasia Beverly Hills.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Tiger Tracks - Performance Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
    description:
      'Inc. 5000 #123 performance growth agency founded by ex-Google operators. Trusted by brands like AG1 and Anastasia Beverly Hills.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Consent Mode v2 defaults (denied) + Cookiebot CMP - must precede GTM */}
        <CookieConsent />
        <link rel="preload" href="/fonts/work-sans-latin-800-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin-300-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TGZKSQMT');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tiger Tracks',
              url: 'https://tigertracks.ai',
              logo: 'https://tigertracks.ai/brand/tt-avatar.svg',
              legalName: 'Tiger Tracks, LLC',
              description: 'Inc. 5000 #123 performance growth agency founded by ex-Google operators. Fully remote, New York based.',
              foundingDate: '2021',
              founder: { '@type': 'Person', name: 'Cliff Simmons' },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New York',
                addressRegion: 'NY',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.linkedin.com/company/tiger-tracks-media/',
                'https://www.inc.com/profile/tiger-tracks',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@tigertracks.ai',
                contactType: 'sales',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Tiger Tracks',
              url: 'https://tigertracks.ai',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased text-white bg-tt-ink">
        <WebVitals />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGZKSQMT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ClientBody>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-tt-orange focus:text-white focus:rounded-md focus:outline-none"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="relative z-[5]">{children}</main>
          <Footer />
          <ConsentBanner />
        </ClientBody>
      </body>
    </html>
  );
}
