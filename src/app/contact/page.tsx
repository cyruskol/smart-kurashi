import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'スマートくらし へのお問い合わせはこちらから。',
};

interface PageProps {}

export default function ContactPage({}: PageProps) {
  const breadcrumbItems = [
    { label: 'ホーム', href: 'https://smart-kurashi.jp/' },
    { label: 'お問い合わせ', href: 'https://smart-kurashi.jp/contact' },
  ];

  return (
    <main style={{ background: '#F8FAFC', padding: '48px 0' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>
        {/* Breadcrumbs with JSON-LD */}
        <Breadcrumbs items={breadcrumbItems} />
        <ContactForm />
      </div>
    </main>
  );
}
