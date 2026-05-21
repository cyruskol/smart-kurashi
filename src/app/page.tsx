import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

export default function HomePage() {
  const latestPosts = getAllPosts();
  const featuredPost = latestPosts[0];
  const remainingPosts = latestPosts.slice(1, 7);
  const aiPosts = getPostsByCategory('ai-tech').slice(0, 3);
  const smartHomePosts = getPostsByCategory('smart-home').slice(0, 3);

  return (
    <main>
      {/* Hero / Featured */}
      {featuredPost && (
        <section className="bg-neutral py-xl">
          <div className="max-w-container mx-auto px-md">
            <p className="text-sm font-medium text-accent mb-sm tracking-wider uppercase">
              Latest
            </p>
            <ArticleCard post={featuredPost} variant="featured" />
          </div>
        </section>
      )}

      {/* Latest Posts Grid */}
      {remainingPosts.length > 0 && (
        <section className="py-section">
          <div className="max-w-container mx-auto px-md">
            <h2 className="text-2xl font-bold text-primary mb-xl">最新記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {remainingPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI & Tech Section */}
      {aiPosts.length > 0 && (
        <section className="py-section bg-surface">
          <div className="max-w-container mx-auto px-md">
            <div className="flex items-center justify-between mb-xl">
              <h2 className="text-2xl font-bold text-primary">AI & Tech</h2>
              <a
                href="/category/ai-tech"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                すべて見る →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {aiPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Smart Home Section */}
      {smartHomePosts.length > 0 && (
        <section className="py-section">
          <div className="max-w-container mx-auto px-md">
            <div className="flex items-center justify-between mb-xl">
              <h2 className="text-2xl font-bold text-primary">Smart Home</h2>
              <a
                href="/category/smart-home"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                すべて見る →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {smartHomePosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {latestPosts.length === 0 && (
        <section className="py-section">
          <div className="max-w-content mx-auto px-md text-center">
            <h1 className="text-3xl font-bold text-primary mb-md">
              Smart Kurashi
            </h1>
            <p className="text-text-secondary text-lg">
              スマートホーム・AI家電の最新ニュースをお届けします。
              <br />
              コンテンツ準備中です。
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
