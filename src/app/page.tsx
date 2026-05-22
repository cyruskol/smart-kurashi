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
  'ai-tech': { bg: '#EEF2FF', text: '#6366F1', dot: '#6366F1' },
  'smart-home': { bg: '#ECFDF5', text: '#10B981', dot: '#10B981' },
  'article': { bg: '#FFF4F0', text: '#E8643A', dot: '#E8643A' },
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
        <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: '#E8643A', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15 }} />
          <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px', background: '#6366F1', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.1 }} />
          
          <div className="max-w-container mx-auto px-md" style={{ padding: '64px 0', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '720px' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: '#E8643A', color: '#fff', fontSize: '11px', fontWeight: 700, borderRadius: '9999px', marginBottom: '16px', letterSpacing: '0.05em' }}>
                ⭐ 注目記事
              </span>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                <Link href={`/posts/${featuredPost.slug}`} style={{ color: '#fff', textDecoration: 'none' }} className="hover:text-orange-300 transition-colors">
                  {featuredPost.title}
                </Link>
              </h1>
              <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '24px' }}>
                {featuredPost.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748B' }}>
                <time>{new Date(featuredPost.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {featuredPost.source && <span>• {featuredPost.source}</span>}
              </div>
              <Link href={`/posts/${featuredPost.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', padding: '12px 24px', background: '#E8643A', color: '#fff', fontWeight: 600, borderRadius: '8px', fontSize: '14px', textDecoration: 'none' }} className="hover:bg-orange-600 transition-colors">
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
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#E8643A', borderRadius: '50%' }} />
                  最新記事
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {latestPosts.map((post) => {
                  const cat = categoryColors[post.category] || categoryColors['article'];
                  return (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1 hover:border-orange-200">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ padding: '2px 10px', background: cat.bg, color: cat.text, fontSize: '11px', fontWeight: 600, borderRadius: '9999px' }}>
                          {post.category === 'ai-tech' ? 'AI & Tech' : post.category === 'smart-home' ? 'Smart Home' : '記事'}
                        </span>
                        <time style={{ fontSize: '11px', color: '#94A3B8' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', lineHeight: 1.4, marginBottom: '8px' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                      {post.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} style={{ padding: '2px 8px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 500, borderRadius: '9999px' }}>
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
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#6366F1', borderRadius: '50%' }} />
                  AI & Tech
                  <span style={{ fontSize: '12px', fontWeight: 400, color: '#94A3B8', marginLeft: '4px' }}>({aiPosts.length})</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {aiPosts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
                      <time style={{ fontSize: '11px', color: '#94A3B8' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', lineHeight: 1.4, marginTop: '6px' }}>{post.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Smart Home Section */}
            {smartHomePosts.length > 0 && (
              <section>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }} />
                  Smart Home
                  <span style={{ fontSize: '12px', fontWeight: 400, color: '#94A3B8', marginLeft: '4px' }}>({smartHomePosts.length})</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {smartHomePosts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
                      <time style={{ fontSize: '11px', color: '#94A3B8' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', lineHeight: 1.4, marginTop: '6px' }}>{post.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside>
            {/* Search box */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>🔍 記事を検索</h3>
              <form action="/search" method="GET">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="search" name="q" placeholder="キーワード..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '13px', background: '#F8FAFC' }} />
                  <button type="submit" style={{ padding: '8px 16px', background: '#E8643A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>検索</button>
                </div>
              </form>
            </div>

            {/* Popular Tags */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>🏷️ 人気タグ</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(([tag, count]) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} style={{ padding: '4px 12px', background: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: 500, borderRadius: '9999px', textDecoration: 'none' }} className="hover:bg-orange-100 hover:text-orange-600 transition-colors">
                    {tag} <span style={{ color: '#94A3A8', fontSize: '10px' }}>({count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts Ranking */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>📰 最新記事</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {allPosts.slice(0, 6).map((post, i) => (
                  <li key={post.slug} style={{ padding: '10px 0', borderBottom: i < 5 ? '1px solid #F1F5F9' : 'none' }}>
                    <Link href={`/posts/${post.slug}`} style={{ display: 'flex', gap: '10px', textDecoration: 'none', alignItems: 'flex-start' }}>
                      <span style={{ width: '24px', height: '24px', background: i < 3 ? '#E8643A' : '#F1F5F9', color: i < 3 ? '#fff' : '#64748B', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h4>
                        <time style={{ fontSize: '11px', color: '#94A3A8', marginTop: '4px', display: 'block' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About CTA */}
            <div style={{ background: 'linear-gradient(135deg, #E8643A, #D05530)', borderRadius: '12px', padding: '24px', color: '#fff' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Smart Kurashi</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '16px' }}>
                スマートホーム・AI家電・IoT技術の最新ニュースを日本語でお届け。
              </p>
              <Link href="/about" style={{ display: 'inline-block', padding: '8px 16px', background: '#fff', color: '#E8643A', fontWeight: 600, borderRadius: '8px', fontSize: '13px', textDecoration: 'none' }}>詳しく見る →</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
