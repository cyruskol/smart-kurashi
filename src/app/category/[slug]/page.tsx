import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrDisclaimer from '@/components/PrDisclaimer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryConfig: Record<
  string,
  { label: string; description: string; color: string; bg: string; icon: string }
> = {
  'ai-tech': {
    label: 'AI & Tech',
    description: 'AI技術、機械学習、生成AI、チャットボットなど最新テクノロジーニュース',
    color: '#6366F1',
    bg: '#EEF2FF',
    icon: '🤖',
  },
  'smart-home': {
    label: 'Smart Home',
    description: 'スマートホーム家電、IoT機器、HEMS、音声アシスタントなど住まいのテクノロジー',
    color: '#10B981',
    bg: '#ECFDF5',
    icon: '🏠',
  },
};

export async function generateStaticParams() {
  return Object.keys(categoryConfig).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const info = categoryConfig[slug];
  if (!info) return { title: 'Not Found' };
  return {
    title: info.label,
    description: info.description,
    openGraph: {
      title: `${info.label} | Smart Kurashi`,
      description: info.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const info = categoryConfig[slug];
  if (!info) notFound();

  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) => post.category === slug);

  const breadcrumbItems = [
    { label: 'ホーム', href: 'https://smart-kurashi.jp/' },
    { label: info.label, href: `https://smart-kurashi.jp/category/${slug}` },
  ];

  return (
    <main style={{ background: '#F8FAFC', padding: '32px 0' }}>
      <div className="max-w-container mx-auto px-md">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Category Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${info.color}15, ${info.color}05)`,
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '32px',
            border: `1px solid ${info.color}20`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '40px' }}>{info.icon}</span>
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                }}
              >
                {info.label}
              </h1>
              <p style={{ fontSize: '16px', color: '#475569', marginTop: '4px' }}>
                {info.description}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
            <span
              style={{
                padding: '4px 14px',
                background: info.bg,
                color: info.color,
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '9999px',
              }}
            >
              {posts.length} 記事
            </span>
            <Link
              href="/"
              style={{ fontSize: '13px', color: '#64748B' }}
              className="hover:text-orange-500"
            >
              ← ホームに戻る
            </Link>
          </div>
        </div>

        {/* PR Disclaimer */}
        <PrDisclaimer />

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                className="hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      padding: '2px 10px',
                      background: info.bg,
                      color: info.color,
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '9999px',
                    }}
                  >
                    {info.label}
                  </span>
                  <time style={{ fontSize: '11px', color: '#94A3B8' }}>
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#0F172A',
                    lineHeight: 1.4,
                    marginBottom: '8px',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#64748B',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: '12px',
                  }}
                >
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '2px 8px',
                          background: '#F1F5F9',
                          color: '#64748B',
                          fontSize: '10px',
                          fontWeight: 500,
                          borderRadius: '9999px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
            }}
          >
            <p style={{ fontSize: '18px', color: '#64748B' }}>
              このカテゴリの記事はまだありません。
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
