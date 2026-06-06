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
    default: 'Smart Kurashi — 日本の暮らしのための商品発見サイト',
    template: '%s | Smart Kurashi',
  },
  description:
    '日本で買って失敗しにくいAIツール、家電、ガジェットを、レビュー・比較・買い方ガイドで整理する商品発見サイト。',
  keywords: [
    'スマートホーム',
    'AIツール',
    '家電レビュー',
    'ガジェット比較',
    '比較ランキング',
    '購入ガイド',
    'IoT',
    'レビュー',
    'アフィリエイト',
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
    title: 'Smart Kurashi — 日本の暮らしのための商品発見サイト',
    description:
      '日本で買って失敗しにくいAIツール、家電、ガジェットを、レビュー・比較・買い方ガイドで整理する商品発見サイト。',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Smart Kurashi — 日本の暮らしのための商品発見サイト',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Kurashi — 日本の暮らしのための商品発見サイト',
    description:
      '日本で買って失敗しにくいAIツール、家電、ガジェットを、レビュー・比較・買い方ガイドで整理する商品発見サイト。',
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
    '日本で買って失敗しにくいAIツール、家電、ガジェットを、レビュー・比較・買い方ガイドで整理する商品発見サイト。',
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
    '日本のAIツール・家電・ガジェットをレビューと比較で案内する編集メディアです。',
  sameAs: [],
};

const jsonLdItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Smart Kurashi メインメニュー',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'AI・テック', url: 'https://smart-kurashi.jp/category/ai-tech' },
    { '@type': 'ListItem', position: 2, name: '家電・ガジェット', url: 'https://smart-kurashi.jp/category/smart-home' },
    { '@type': 'ListItem', position: 3, name: '商品を探す', url: 'https://smart-kurashi.jp/products' },
    { '@type': 'ListItem', position: 4, name: '比較・ランキング', url: 'https://smart-kurashi.jp/compare' },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }} />
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
