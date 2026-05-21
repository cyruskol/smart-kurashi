import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ホーム',
  description: 'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
  openGraph: {
    title: 'Smart Kurashi — スマートホーム・AI家電ニュース',
    description: 'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。',
  },
};

export default function HomePage() {
  const latestPosts = getAllPosts();
  const featuredPost = latestPosts[0];
  const remainingPosts = latestPosts.slice(1, 10);
  const aiPosts = getPostsByCategory('ai-tech');
  const smartHomePosts = getPostsByCategory('smart-home');
  const allPosts = getAllPosts();

  const tagCounts: Record<string, number> = {};
  allPosts.forEach((post) => post.tags.forEach((tag) => { tagCounts[tag] = (tagCounts[tag] || 0) + 1; }));
  const popularTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([tag]) => tag);

  return (
    <main>
      {/* Hero — Featured post with dark gradient */}
      {featuredPost && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden" aria-label="注目記事">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cat-ai rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

          <div className="max-w-container mx-auto px-md py-section relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 text-accent text-xs font-bold rounded-full mb-md border border-accent/30">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  注目記事
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tighter mb-md">
                  <a href={`/posts/${featuredPost.slug}`} className="hover:text-accent transition-colors duration-300">
                    {featuredPost.title}
                  </a>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed mb-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-md text-sm text-slate-400">
                  <time>{new Date(featuredPost.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  {featuredPost.source && <span>• {featuredPost.source}</span>}
                </div>
                <a href={`/posts/${featuredPost.slug}`} className="inline-flex items-center gap-sm mt-lg px-xl py-md bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm">
                  続きを読む
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
              <div className="hidden lg:block">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-slate-700/80 to-slate-800/80 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-600/30 backdrop-blur-sm">
                  <div className="text-center">
                    <span className="text-7xl opacity-80 block mb-sm">🏠</span>
                    <span className="text-sm text-slate-400 font-medium">Smart Kurashi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick category links */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-container mx-auto px-md py-md">
          <div className="flex items-center gap-sm overflow-x-auto">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider flex-shrink-0">カテゴリ:</span>
            <a href="/category/ai-tech" className="flex items-center gap-sm px-4 py-2 bg-cat-ai-light text-cat-ai rounded-full text-sm font-medium hover:bg-cat-ai hover:text-white transition-all duration-200 flex-shrink-0">
              <span className="w-2 h-2 bg-cat-ai rounded-full"></span>
              AI & Tech
              <span className="bg-white/50 text-cat-ai text-xs px-1.5 py-0.5 rounded-full">{aiPosts.length}</span>
            </a>
            <a href="/category/smart-home" className="flex items-center gap-sm px-4 py-2 bg-cat-smart-light text-cat-smart rounded-full text-sm font-medium hover:bg-cat-smart hover:text-white transition-all duration-200 flex-shrink-0">
              <span className="w-2 h-2 bg-cat-smart rounded-full"></span>
              Smart Home
              <span className="bg-white/50 text-cat-smart text-xs px-1.5 py-0.5 rounded-full">{smartHomePosts.length}</span>
            </a>
            <a href="/search" className="flex items-center gap-sm px-4 py-2 bg-neutral-warm text-text-secondary rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-all duration-200 flex-shrink-0 ml-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              記事を検索
            </a>
          </div>
        </div>
      </div>

      {/* Main content area with sidebar */}
      <div className="max-w-container mx-auto px-md py-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Latest Posts */}
            {remainingPosts.length > 0 && (
              <section className="mb-section" aria-label="最新記事">
                <div className="flex items-center justify-between mb-lg">
                  <h2 className="text-2xl font-bold text-primary tracking-tight flex items-center gap-sm">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    最新記事
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {remainingPosts.map((post, index) => (
                    <div key={post.slug} className={`opacity-0 animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                      <ArticleCard post={post} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Sidebar popularTags={popularTags} recentPosts={latestPosts.slice(0, 5)} />
          </aside>
        </div>
      </div>
    </main>
  );
}
