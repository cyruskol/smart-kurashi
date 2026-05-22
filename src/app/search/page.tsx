import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `「${q}」の検索結果` : '検索', description: q ? `「${q}」に関する記事を検索` : 'Smart Kurashiの記事を検索' };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'ai-tech': { bg: '#EEF2FF', text: '#6366F1' },
  'smart-home': { bg: '#ECFDF5', text: '#10B981' },
  'article': { bg: '#FFF4F0', text: '#E8643A' },
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  const results = q ? allPosts.filter((p) => {
    const s = q.toLowerCase();
    return p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s) || p.tags.some((t) => t.toLowerCase().includes(s));
  }) : [];

  const tagCounts: Record<string, number> = {};
  allPosts.forEach((p) => p.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const allTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 30);

  return (
    <main style={{ background: '#F8FAFC', padding: '32px 0' }}>
      <div className="max-w-container mx-auto px-md">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
          <div>
            {/* Search form */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #E2E8F0' }}>
              <form action="/search" method="GET" style={{ display: 'flex', gap: '12px' }}>
                <input type="search" name="q" defaultValue={q || ''} placeholder="キーワードを入力..." style={{ flex: 1, padding: '12px 16px', border: '2px solid #E2E8F0', borderRadius: '10px', fontSize: '15px', background: '#F8FAFC' }} className="focus:border-orange-400 focus:outline-none" />
                <button type="submit" style={{ padding: '12px 24px', background: '#E8643A', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>🔍 検索</button>
              </form>
            </div>

            {/* Results */}
            {q && (
              <>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
                  {results.length > 0 ? `「${q}」の検索結果: ${results.length}件` : `「${q}」に一致する記事が見つかりませんでした。`}
                </p>
                {results.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {results.map((post) => {
                      const cat = categoryColors[post.category] || categoryColors['article'];
                      return (
                        <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ padding: '2px 10px', background: cat.bg, color: cat.text, fontSize: '11px', fontWeight: 600, borderRadius: '9999px' }}>
                              {post.category === 'ai-tech' ? 'AI & Tech' : post.category === 'smart-home' ? 'Smart Home' : '記事'}
                            </span>
                            <time style={{ fontSize: '11px', color: '#94A3B8' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                          </div>
                          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', lineHeight: 1.4, marginBottom: '8px' }}>{post.title}</h3>
                          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {!q && (
              <div style={{ textAlign: 'center', padding: '80px 0', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔍</span>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>記事を検索</h2>
                <p style={{ color: '#64748B' }}>キーワードを入力して記事を検索できます。</p>
              </div>
            )}
          </div>

          {/* Sidebar — Tag cloud */}
          <aside>
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>🏷️ タグで検索</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allTags.map(([tag, count]) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} style={{ padding: '4px 12px', background: q === tag ? '#E8643A' : '#F1F5F9', color: q === tag ? '#fff' : '#475569', fontSize: '12px', fontWeight: 500, borderRadius: '9999px', textDecoration: 'none' }} className={q !== tag ? 'hover:bg-orange-100 hover:text-orange-600' : ''}>
                    {tag} <span style={{ opacity: 0.7, fontSize: '10px' }}>({count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
