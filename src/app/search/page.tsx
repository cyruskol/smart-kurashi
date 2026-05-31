import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

const breadcrumbItems = [
  { label: 'ホーム', href: 'https://smart-kurashi.jp/' },
];

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `「${q}」の検索結果` : '検索', description: q ? `「${q}」に関する記事を検索` : 'Smart Kurashi の記事を検索' };
}

  const categoryColors: Record<string, { bg: string; text: string }> = {
    'ai-tech': { bg: '#F5F0EB', text: '#5C4A32' },
    'smart-home': { bg: '#EDF2EE', text: '#2C4D38' },
    'article': { bg: '#F5F0EB', text: '#5C4A32' },
  };

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  
  const categoryColors: Record<string, { bg: string; text: string }> = {
    'ai-tech': { bg: '#F5F0EB', text: '#5C4A32' },
    'smart-home': { bg: '#EDF2EE', text: '#2C4D38' },
    'article': { bg: '#F5F0EB', text: '#5C4A32' },
  };

  const results = q ? allPosts.filter((p) => {
    const s = q.toLowerCase();
    return p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s) || p.tags.some((t) => t.toLowerCase().includes(s));
  }) : [];

  const tagCounts: Record<string, number> = {};
  allPosts.forEach((p) => p.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const allTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 30);

  return (
    <main style={{ background: '#FAFAF9', padding: '32px 0' }}>
      <div className="max-w-container mx-auto px-md">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
          <div>
            {/* Search form */}
            <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginBottom: '24px', border: '1px solid #E7E5E4' }}>
              <form action="/search" method="GET" style={{ display: 'flex', gap: '12px' }}>
                <input type="search" name="q" defaultValue={q || ''} placeholder="キーワードを入力..." style={{ flex: 1, padding: '12px 16px', border: '1px solid #E7E5E4', borderRadius: '8px', fontSize: '15px', background: '#FAFAF9' }} className="focus:outline-none" />
                <button type="submit" style={{ padding: '12px 24px', background: '#A9582D', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>検索</button>
              </form>
            </div>

            {/* Results */}
            {q && (
              <>
                <p style={{ fontSize: '14px', color: '#5A534E', marginBottom: '20px' }}>
                  {results.length > 0 ? `「${q}」の検索結果: ${results.length}件` : `「${q}」に一致する記事が見つかりませんでした。`}
                </p>
                {results.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {results.map((post) => {
                      const cat = categoryColors[post.category] || categoryColors['article'];
                      return (
                        <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '20px', textDecoration: 'none' }} className="">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ padding: '2px 10px', background: cat.bg, color: cat.text, fontSize: '11px', fontWeight: 600, borderRadius: '8px' }}>
                              {post.category === 'ai-tech' ? 'AI&テック' : post.category === 'smart-home' ? 'スマートホーム' : '記事'}
                            </span>
                            <time style={{ fontSize: '11px', color: '#5A534E' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                          </div>
                          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#292524', lineHeight: 1.4, marginBottom: '8px' }}>{post.title}</h3>
                          <p style={{ fontSize: '13px', color: '#5A534E', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {!q && (
              <div style={{ textAlign: 'center', padding: '80px 0', background: '#fff', borderRadius: '8px', border: '1px solid #E7E5E4' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#292524', marginBottom: '8px' }}>記事を検索</h2>
                <p style={{ color: '#5A534E' }}>キーワードを入力して記事を検索できます。</p>
              </div>
            )}
          </div>

          {/* Sidebar — Tag cloud */}
          <aside>
            <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#292524', marginBottom: '16px' }}>タグで検索</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allTags.map(([tag, count]) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} style={{ padding: '4px 12px', background: q === tag ? '#A9582D' : '#F5F0EB', color: q === tag ? '#fff' : '#4A433F', fontSize: '12px', fontWeight: 400, borderRadius: '8px', textDecoration: 'none' }}>
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
