import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: {
    default: 'Smart Kurashi — スマートホーム・AI家電ニュース',
    template: '%s | Smart Kurashi',
  },
  description:
    'スマートホーム、IoT機器、AI技術に関する最新ニュースと記事を日本語でお届け。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
