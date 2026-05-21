import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Kurashi — スマートホーム・AI家電ニュース',
  description:
    'スマートホーム、IoT機器、AI技術に関する最新ニュースと記事を日本語でお届け。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
