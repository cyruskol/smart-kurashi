import type { Metadata } from 'next';
import { Noto_Sans_JP, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StructuredData from '@/components/StructuredData';
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
    default: 'Smart Kurashi — スマートホーム・AI 家電ニュース',
    template: '%s | Smart Kurashi',
  },
  description:
    'スマートホーム、IoT 機器、AI 家電、最新テクノロジーニュースを日本語でお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
  keywords: [
    'スマートホーム', 'AI 家電', 'IoT', '人工知能', '家電レビュー',
    'テクノロジーニュース', 'HEMS', '音声アシスタント', '省エネ', 'IoT 機器',
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
    title: 'Smart Kurashi — スマートホーム・AI 家電ニュース',
    description:
      'スマートホーム、IoT 機器、AI 家電、最新テクノロジーニュースを日本語でお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Smart Kurashi — スマートホーム・AI 家電ニュース',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Kurashi — スマートホーム・AI 家電ニュース',
    description:
      'スマートホーム、IoT 機器、AI 家電、最新テクノロジーニュースを日本語でお届け。',
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
    'スマートホーム、IoT 機器、AI 家電、最新テクノロジーニュースを日本語でお届け。',
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
    '日本のスマートホーム・AI 家電・テクノロジーニュースを専門とするメディアです。',
  sameAs: [],
};

const jsonLdItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Smart Kurashi メニュー',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', url: 'https://smart-kurashi.jp/' },
    { '@type': 'ListItem', position: 2, name: 'AI & Tech', url: 'https://smart-kurashi.jp/category/ai-tech' },
    { '@type': 'ListItem', position: 3, name: 'Smart Home', url: 'https://smart-kurashi.jp/category/smart-home' },
    { '@type': 'ListItem', position: 4, name: '会社概要', url: 'https://smart-kurashi.jp/about' },
    { '@type': 'ListItem', position: 5, name: 'お問い合わせ', url: 'https://smart-kurashi.jp/contact' },
    { '@type': 'ListItem', position: 6, name: 'プライバシーポリシー', url: 'https://smart-kurashi.jp/privacy' },
    { '@type': 'ListItem', position: 7, name: '利用規約', url: 'https://smart-kurashi.jp/terms' },
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
        <StructuredData type="Website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          コンテンツへスキップ
        </a>
        
        <Header />
        <div id="main-content">{children}</div>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}