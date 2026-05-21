import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ホーム',
  description: 'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
  openGraph: {
    title: 'Smart Kurashi — スマートホーム・ア家電ニュース',
    description: 'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。',
  },
};

export default function HomePage() {
  const latestPosts = getAllPosts();
  const featuredPost = latestPosts[0];
  const remainingPosts = latestPosts.slice(1, 7);
  const aiPosts = getPostsByCategory('ai-tech').slice(0, 3);
  const smartHomePosts = getPostsByCategory('smart-home').slice(0, 3);
  const allPosts = getAllPosts();

  // Collect all unique tags
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([tag]) => tag);

  return (
    <main>
      {/* Hero — Featured post */}
      {featuredPost && (
        <section className="bg-gradient-to-br from-primary to-slate-800 text-white" aria-label="注目記事">
          <div className="max-w-container mx-auto px-md py-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full mb-md">
                  Featured
                </span>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tighter mb-md">
                  <a href={`/posts/${featuredPost.slug}`} className="hover:text-accent transition-colors">
                    {featuredPost.title}
                  </a>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed mb-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-md text-sm text-slate-400">
                  <time>{new Date(featuredPost.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  {featuredPost.source && <span>出典: {featuredPost.source}</span>}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-full aspect-video bg-slate-700 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">🏠</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content area with sidebar */}
      <div className="max-w-container mx-auto px-md py-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Latest Posts */}
            {remainingPosts.length > 0 && (
              <section className="mb-section" aria-label="最新記事">
                <div className="flex items-center justify-between mb-lg">
                  <h2 className="text-2xl font-bold text-primary tracking-tight">最新記事</h2>
                  <a href="/category/ai-tech" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                    すべて見る →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {remainingPosts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* AI & Tech */}
            {aiPosts.length > 0 && (
              <section className="mb-section" aria-label="AI & Tech">
                <div className="flex items-center justify-between mb-lg">
                  <h2 className="text-2xl font-bold text-primary tracking-tight flex items-center gap-sm">
                    <span className="w-2 h-2 bg-cat-ai rounded-full"></span>
                    AI & Tech
                  </h2>
                  <a href="/category/ai-tech" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                    すべて見る →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {aiPosts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Smart Home */}
            {smartHomePosts.length > 0 && (
              <section aria-label="Smart Home">
                <div className="flex items-center justify-between mb-lg">
                  <h2 className="text-2xl font-bold text-primary tracking-tight flex items-center gap-sm">
                    <span className="w-2 h-2 bg-cat-smart rounded-full"></span>
                    Smart Home
                  </h2>
                  <a href="/category/smart-home" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                    すべて見る →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {smartHomePosts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
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
