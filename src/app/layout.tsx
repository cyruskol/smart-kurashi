import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Noto_Sans_JP, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import Footer from '@/components/Footer';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://smart-kurashi.jp'),
  title: {
    default: 'Smart Kurashi — スマートホーム・AI家電ニュース',
    template: '%s | Smart Kurashi',
  },
  description:
    'スマートホーム、IoT機器、AI家電、最新テクノロジーニュースを日本語でお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
  keywords: [
    'スマートホーム',
    'AI家電',
    'IoT',
    '人工知能',
    '家電レビュー',
    'テクノロジーニュース',
    'HEMS',
    '音声アシスタント',
    '省エネ',
    'IoT機器',
  ],
  authors: [{ name: 'Smart Kurashi' }],
  creator: 'Smart Kurashi',
  publisher: 'Smart Kurashi',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Smart Kurashi',
    title: 'Smart Kurashi — スマートホーム・AI家電ニュース',
    description:
      'スマートホーム、IoT機器、AI家電、最新テクノロジーニュースを日本語でお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smart Kurashi — スマートホーム・AI家電ニュース',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Kurashi — スマートホーム・AI家電ニュース',
    description:
      'スマートホーム、IoT機器、AI家電、最新テクノロジーニュースを日本語でお届け。',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://smart-kurashi.jp',
    languages: {
      'ja-JP': 'https://smart-kurashi.jp',
    },
  },
  category: 'technology',
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Smart Kurashi',
  url: 'https://smart-kurashi.jp',
  description:
    'スマートホーム、IoT機器、AI家電、最新テクノロジーニュースを日本語でお届け。',
  inLanguage: 'ja',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://smart-kurashi.jp/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Smart Kurashi',
  url: 'https://smart-kurashi.jp',
  logo: 'https://smart-kurashi.jp/logo.png',
  description:
    '日本のスマートホーム・AI家電・テクノロジーニュースを専門とするメディアです。',
  sameAs: [],
};

const jsonLdItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Smart Kurashi メニュー',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      url: 'https://smart-kurashi.jp/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'AI & Tech',
      url: 'https://smart-kurashi.jp/category/ai-tech',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Smart Home',
      url: 'https://smart-kurashi.jp/category/smart-home',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: '会社概要',
      url: 'https://smart-kurashi.jp/about',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'お問い合わせ',
      url: 'https://smart-kurashi.jp/contact',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'プライバシーポリシー',
      url: 'https://smart-kurashi.jp/privacy',
    },
    {
      '@type': 'ListItem',
      position: 7,
      name: '利用規約',
      url: 'https://smart-kurashi.jp/terms',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="jsonld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <Script
          id="jsonld-itemlist"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdItemList),
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          コンテンツへスキップ
        </a>
        <Link href="/" aria-label="Smart Kurashi ホーム" style={{ position: 'fixed', top: '0', left: '16px', zIndex: 120 }}>
          <Image src="/logo.png" alt="Smart Kurashi" width={128} height={128} priority />
        </Link>
        <div id="main-content" style={{ paddingTop: '120px' }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
