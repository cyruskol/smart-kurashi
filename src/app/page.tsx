import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: {
  title: string;
  description: string;
} = {
  title: 'ホーム',
  description: 'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。',
};

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  'ai-tech': { bg: '#EFE8DD', text: '#6D6254', dot: '#6D6254' },
  'smart-home': { bg: '#E7EFEA', text: '#4F6F5D', dot: '#4F6F5D' },
  'article': { bg: '#EFE8DD', text: '#6D6254', dot: '#6D6254' },
};

const heroButtons = [
  { href: '/', label: 'すべて' },
  { href: '/category/ai-tech', label: 'AI・テック' },
  { href: '/category/smart-home', label: '家電・ガジェット' },
];

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
        <section style={{ background: '#F7F5F2', color: '#3F3A36', position: 'relative', overflow: 'hidden' }}>
          <div className="max-w-container mx-auto px-md" style={{ minHeight: '58vh', padding: '0 0 110px 0', position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <Link href="/" aria-label="Smart Kurashi ホーム">
                <Image src="/logo.png" alt="Smart Kurashi" width={128} height={128} priority />
              </Link>
            </div>

            <div style={{ maxWidth: '860px' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: '#E8E3DD', color: '#57514C', fontSize: '11px', fontWeight: 600, borderRadius: '8px', marginBottom: '16px' }}>
                注目記事
              </span>
              <h1 style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', fontWeight: 600, lineHeight: 1.15, marginBottom: '14px' }}>
                <Link href={`/posts/${featuredPost.slug}`} style={{ color: '#3F3A36', textDecoration: 'none' }}>
                  {featuredPost.title}
                </Link>
              </h1>
              <p style={{ fontSize: '18px', color: '#57514C', lineHeight: 1.65, marginBottom: '20px' }}>
                {featuredPost.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#726B65' }}>
                <time>{new Date(featuredPost.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
            </div>

            <nav aria-label="トップカテゴリ" style={{ position: 'absolute', left: '16px', bottom: '16px', display: 'flex', gap: '11px', flexWrap: 'wrap' }}>
              {heroButtons.map((btn) => (
                <Link key={btn.href} href={btn.href} className="japandi-btn" style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', color: '#57514C', textDecoration: 'none', fontWeight: 500 }}>
                  {btn.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      {/* ===== MAIN CONTENT + SIDEBAR ===== */}
      <div className="max-w-container mx-auto px-md" style={{ paddingTop: '48px', paddingBottom: '48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
          
          {/* ===== MAIN CONTENT ===== */}
          <div>
            {/* Latest Posts */}
            <section style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#3F3A36', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#9B9389', borderRadius: '50%' }} />
                  最新記事
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {latestPosts.map((post) => {
                  const cat = categoryColors[post.category] || categoryColors['article'];
                  return (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #DDD8D1', borderRadius: '8px', padding: '20px', textDecoration: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ padding: '2px 10px', background: cat.bg, color: cat.text, fontSize: '11px', fontWeight: 600, borderRadius: '8px' }}>
                          {post.category === 'ai-tech' ? 'AI&Tech' : post.category === 'smart-home' ? 'スマートホーム' : '記事'}
                        </span>
                        <time style={{ fontSize: '11px', color: '#726B65' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#3F3A36', lineHeight: 1.4, marginBottom: '8px' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#726B65', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                      {post.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} style={{ padding: '2px 8px', background: '#EFE8DD', color: '#726B65', fontSize: '10px', fontWeight: 400, borderRadius: '8px' }}>
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
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#3F3A36', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#6D6254', borderRadius: '50%' }} />
                  AI&Tech
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {aiPosts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #DDD8D1', borderRadius: '8px', padding: '16px', textDecoration: 'none' }} className="">
                      <time style={{ fontSize: '11px', color: '#726B65' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#3F3A36', lineHeight: 1.4, marginTop: '6px' }}>{post.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* スマートホーム Section */}
            {smartHomePosts.length > 0 && (
              <section>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#3F3A36', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#9B9389', borderRadius: '50%' }} />
                  Appliances &amp; Gadgets
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {smartHomePosts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid #DDD8D1', borderRadius: '8px', padding: '16px', textDecoration: 'none' }} className="">
                      <time style={{ fontSize: '11px', color: '#726B65' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#3F3A36', lineHeight: 1.4, marginTop: '6px' }}>{post.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>


          {/* ===== SIDEBAR ===== */}
          <aside>
            {/* Search box */}
            <div style={{ background: '#fff', border: '1px solid #DDD8D1', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#3F3A36', marginBottom: '12px' }}>記事を検索</h3>
              <form action="/search" method="GET">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="search" name="q" placeholder="キーワード..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #DDD8D1', borderRadius: '8px', fontSize: '13px', background: '#F7F5F2' }} />
                  <button type="submit" className="japandi-btn" style={{ padding: '8px 16px', color: '#57514C', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>検索</button>
                </div>
              </form>
            </div>

            {/* Popular Tags */}
            <div style={{ background: '#fff', border: '1px solid #DDD8D1', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#3F3A36', marginBottom: '12px' }}>人気タグ</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(([tag, count]) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} style={{ padding: '4px 12px', background: '#EFE8DD', color: '#57514C', fontSize: '12px', fontWeight: 400, borderRadius: '8px', textDecoration: 'none' }}>
                    {tag} <span style={{ color: '#726B65', fontSize: '10px' }}>({count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div style={{ background: '#fff', border: '1px solid #DDD8D1', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#3F3A36', marginBottom: '12px' }}>最新記事</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {allPosts.slice(0, 6).map((post, i) => (
                  <li key={post.slug} style={{ padding: '10px 0', borderBottom: i < 5 ? '1px solid #DDD8D1' : 'none' }}>
                    <Link href={`/posts/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 500, color: '#3F3A36', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h4>
                        <time style={{ fontSize: '11px', color: '#726B65', marginTop: '4px', display: 'block' }}>{new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</time>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About CTA */}
            <div style={{ background: '#EEEAE4', border: '1px solid #DDD8D1', borderRadius: '8px', padding: '24px', color: '#57514C' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#57514C' }}>Smart Kurashi</h3>
              <p style={{ fontSize: '13px', color: '#726B65', lineHeight: 1.6, marginBottom: '16px' }}>
                スマートホーム・AI家電・IoT技術の最新ニュースを日本語でお届け。
              </p>
              <Link href="/about" className="japandi-btn" style={{ display: 'inline-block', padding: '8px 16px', color: '#57514C', fontWeight: 600, borderRadius: '8px', fontSize: '13px', textDecoration: 'none' }}>詳しく見る →</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
