import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'Smart Kurashiへのお問い合わせはこちらから。取材依頼、広告掲載、コンテンツに関するご質問など、お気軽にご連絡ください。',
  openGraph: {
    title: 'お問い合わせ | Smart Kurashi',
    description: 'Smart Kurashiへのお問い合わせはこちらから。',
  },
};

export default function ContactPage() {
  return (
    <main className="py-section md:py-2xl bg-neutral">
      <article className="max-w-content mx-auto px-md">
        <nav aria-label="パンくずリスト" className="mb-lg">
          <ol className="flex items-center gap-sm text-sm">
            <li><a href="/" className="text-text-muted hover:text-accent transition-colors">ホーム</a></li>
            <li className="text-text-muted">/</li>
            <li className="text-text-secondary" aria-current="page">お問い合わせ</li>
          </ol>
        </nav>

        <header className="mb-xl">
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-sm">Contact</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-[1.1] tracking-tighter mb-md">
            お問い合わせ
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            取材依頼、広告掲載、コンテンツに関するご質問、その他お問い合わせは以下のフォームよりご連絡ください。
          </p>
        </header>

        <ContactForm />
      </article>
    </main>
  );
}
