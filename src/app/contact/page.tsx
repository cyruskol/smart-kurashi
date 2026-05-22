import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'Smart Kurashiへのお問い合わせはこちらから。',
};

export default function ContactPage() {
  return (
    <main style={{ background: '#F8FAFC', padding: '48px 0' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>
        <nav style={{ marginBottom: '24px' }}>
          <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="/" style={{ color: '#94A3B8' }} className="hover:text-orange-500">ホーム</a></li>
            <li style={{ color: '#CBD5E1' }}>/</li>
            <li style={{ color: '#475569' }}>お問い合わせ</li>
          </ol>
        </nav>
        <ContactForm />
      </div>
    </main>
  );
}
