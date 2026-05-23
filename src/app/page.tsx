import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import PrBanner from '@/components/PRBanner';

export const metadata: {
  title: string;
  description: string;
} = {
  title: 'ホーム',
  description: 'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。',
};

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  'ai-tech': { bg: '#F5F0EB', text: '#8B7355', dot: '#8B7355' },
  'smart-home': { bg: '#EDF2EE', text: '#4D7C5E', dot: '#4D7C5E' },
  'article': { bg: '#F5F0EB', text: '#8B7355', dot: '#8B7355' },
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts[0];
  const latestPosts = allPosts.slice(1, 7);
  const aiPosts = getPostsByCategory('ai-tech');
  const smartHomePosts = getPostsByCategory('smart-home');

  // Tag counts
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((p) => p.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const popularTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 12);

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      {featuredPost && (
        <section style={{ background: '#FAFAF9', color: '#292524', position: 'relative', overflow: 'hidden' }}>
          
          <div className="max-w-container mx-auto px-md" style={{ padding: '64px 0', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '720px' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: '#C2703E', color: '#fff', fontSize: '11px', fontWeight: 600, borderRadius: '8px', marginBottom: '16' }}>
                注目記事
              </span>
              <h1 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1.1, marginBottom: '16px' }}>
                <Link href={`/posts/${featuredPost.slug}`} style={{ color: '#292524', textDecoration: 'none' }}>
                  {featuredPost.title}
                </Link>
              </h1>
              <p style={{ fontSize: '18px', color: '#57534E', lineHeight: 1.7, marginBottom: '24px' }}>
                {featuredPost.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#78716C' }}>
                <time>{new Date(featuredPost.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {featuredPost.source && <span>• {featuredPost.source}</span>}
              </div>
              <Link href={`/posts/${featuredPost.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', padding: '12px 24px', background: '#C2703E', color: '#fff', fontWeight: 600, borderRadius: '8px', fontSize: '14px', textDecoration: 'none' }}>
                続きを読む →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== MAIN CONTENT + SIDEBAR ===== */}
      <div className="max-w-container mx-auto px-md" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        {/* PR Banner */}
        <PrBanner />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
          
          {/* ===== MAIN CONTENT ===== */}
          <div>
            {/* Latest Posts */}
            <section style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#292524', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#C2703E', borderRadius: '50%' }} />
                  最新記事
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {latestPosts.map((post) => {
                  const cat = categoryColors[post.category] || categoryColors['article'];
                  return (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '20px', textDecoration: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ padding: '2px 10px', background: cat.bg, color: cat.text, fontSize: '11px', fontWeight: 600, borderRadius: '8px' }}>
                          {post.category === 'ai-tech' ? 'AI&テック' : post.category === 'smart-home' ? 'スマートホーム' : '記事'}
                        </span>
                        <time style={{ fontSize: '11px', color: '#78716C' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#292524', lineHeight: 1.4, marginBottom: '8px' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                      {post.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} style={{ padding: '2px 8px', background: '#F5F0EB', color: '#78716C', fontSize: '10px', fontWeight: 400, borderRadius: '8px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* AI & Tech Section */}
            {aiPosts.length > 0 && (
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#292524', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#8B7355', borderRadius: '50%' }} />
                  AI&テック
                  <span style={{ fontSize: '12px', fontWeight: 400, color: '#78716C', marginLeft: '4px' }}>{aiPosts.length})</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {aiPosts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '16px', textDecoration: 'none' }} className="">
                      <time style={{ fontSize: '11px', color: '#78716C' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#292524', lineHeight: 1.4, marginTop: '6px' }}>{post.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* スマートホーム Section */}
            {smartHomePosts.length > 0 && (
              <section>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#292524', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#4D7C5E', borderRadius: '50%' }} />
                  スマートホーム
                  <span style={{ fontSize: '12px', fontWeight: 400, color: '#78716C', marginLeft: '4px' }}>{smartHomePosts.length})</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {smartHomePosts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '16px', textDecoration: 'none' }} className="">
                      <time style={{ fontSize: '11px', color: '#78716C' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#292524', lineHeight: 1.4, marginTop: '6px' }}>{post.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>


          {/* ===== SIDEBAR ===== */}
          <aside>
            {/* Search box */}
            <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#292524', marginBottom: '12px' }}>記事を検索</h3>
              <form action="/search" method="GET">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="search" name="q" placeholder="キーワード..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #E7E5E4', borderRadius: '8px', fontSize: '13px', background: '#FAFAF9' }} />
                  <button type="submit" style={{ padding: '8px 16px', background: '#C2703E', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>検索</button>
                </div>
              </form>
            </div>

            {/* Popular Tags */}
            <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#292524', marginBottom: '12px' }}>人気タグ</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(([tag, count]) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} style={{ padding: '4px 12px', background: '#F5F0EB', color: '#57534E', fontSize: '12px', fontWeight: 400, borderRadius: '8px', textDecoration: 'none' }}>
                    {tag} <span style={{ color: '#78716C', fontSize: '10px' }}>({count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts Ranking */}
            <div style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#292524', marginBottom: '12px' }}>最新記事</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {allPosts.slice(0, 6).map((post, i) => (
                  <li key={post.slug} style={{ padding: '10px 0', borderBottom: i < 5 ? '1px solid #E7E5E4' : 'none' }}>
                    <Link href={`/posts/${post.slug}`} style={{ display: 'flex', gap: '10px', textDecoration: 'none', alignItems: 'flex-start' }}>
                      <span style={{ width: '24px', height: '24px', background: i < 3 ? '#C2703E' : '#F5F0EB', color: i < 3 ? '#fff' : '#78716C', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 500, color: '#292524', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h4>
                        <time style={{ fontSize: '11px', color: '#78716C', marginTop: '4px', display: 'block' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About CTA */}
            <div style={{ background: '#C2703E', borderRadius: '8px', padding: '24px', color: '#fff' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Smart Kurashi</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '16px' }}>
                スマートホーム・AI家電・IoT技術の最新ニュースを日本語でお届け。
              </p>
              <Link href="/about" style={{ display: 'inline-block', padding: '8px 16px', background: '#fff', color: '#C2703E', fontWeight: 600, borderRadius: '8px', fontSize: '13px', textDecoration: 'none' }}>詳しく見る →</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
