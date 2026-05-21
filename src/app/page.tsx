import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ホーム',
  description:
    'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
  openGraph: {
    title: 'Smart Kurashi — スマートホーム・AI家電ニュース',
    description:
      'スマートホーム・AI家電・IoT技術の最新ニュースをお届け。専門家によるレビュー、比較ガイド、業界動向まで幅広くカバー。',
  },
};

export default function HomePage() {
  const latestPosts = getAllPosts();
  const featuredPost = latestPosts[0];
  const remainingPosts = latestPosts.slice(1, 7);
  const aiPosts = getPostsByCategory('ai-tech').slice(0, 3);
  const smartHomePosts = getPostsByCategory('smart-home').slice(0, 3);

  const categories = [
    {
      slug: 'ai-tech',
      label: 'AI & Tech',
      description: '生成AI、機械学習、チャットボットなど人工知能分野の最新トレンドと実用的な活用方法。',
      icon: '🤖',
    },
    {
      slug: 'smart-home',
      label: 'Smart Home',
      description: 'スマートスピーカー、照明、セキュリティカメラ、HEMSなど家庭のIoT化に関する最新情報。',
      icon: '🏠',
    },
  ];

  return (
    <main>
      {/* Hero Section — Premium editorial style */}
      <section className="bg-surface border-b border-border-light" aria-label="ヒーローセクション">
        <div className="max-w-container mx-auto px-md py-section md:py-3xl">
          <div className="max-w-content mx-auto text-center">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-md animate-fade-in">
              スマートなくらしの情報をお届け
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.05] tracking-tighter mb-lg animate-fade-in-up">
              Smart Kurashi
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed mb-xl animate-fade-in-up">
              スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を日本語でお届け。
              未来のくらしに役立つ情報を、専門家がわかりやすく解説します。
            </p>
            <div className="flex flex-wrap justify-center gap-md animate-fade-in-up">
              <a
                href="/category/ai-tech"
                className="px-xl py-md bg-accent text-white font-semibold rounded-md hover:bg-accent-hover transition-all shadow-sm hover:shadow-glow text-sm"
              >
                AI & Tech を見る
              </a>
              <a
                href="/category/smart-home"
                className="px-xl py-md bg-neutral text-primary font-semibold rounded-md border border-border hover:border-accent hover:text-accent transition-all text-sm"
              >
                Smart Home を見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="bg-neutral" aria-label="注目記事">
          <div className="max-w-container mx-auto px-md py-section">
            <ArticleCard post={featuredPost} variant="featured" />
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="bg-surface" aria-label="カテゴリ">
        <div className="max-w-container mx-auto px-md py-section">
          <h2 className="text-2xl font-bold text-primary mb-xl text-center tracking-tight">
            主要カテゴリ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg stagger-children">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card-base card-glow-accent group p-lg md:p-xl overflow-hidden"
              >
                <span className="text-4xl mb-md block" role="img" aria-label={cat.label}>
                  {cat.icon}
                </span>
                <h3 className="text-xl font-bold text-primary mb-sm group-hover:text-accent transition-colors duration-300 tracking-tight">
                  {cat.label}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-md text-sm font-semibold text-accent group-hover:gap-2.5 transition-all duration-300">
                  記事一覧を見る
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      {remainingPosts.length > 0 && (
        <section className="bg-neutral" aria-label="最新記事">
          <div className="max-w-container mx-auto px-md py-section">
            <div className="flex items-center justify-between mb-xl">
              <h2 className="text-2xl font-bold text-primary tracking-tight">最新記事</h2>
              <a
                href="/category/ai-tech"
                className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                すべて見る →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg stagger-children">
              {remainingPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI & Tech Section */}
      {aiPosts.length > 0 && (
        <section className="bg-surface" aria-label="AI & Tech 記事">
          <div className="max-w-container mx-auto px-md py-section">
            <div className="flex items-center justify-between mb-xl">
              <h2 className="text-2xl font-bold text-primary tracking-tight">AI & Tech</h2>
              <a
                href="/category/ai-tech"
                className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                すべて見る →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg stagger-children">
              {aiPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Smart Home Section */}
      {smartHomePosts.length > 0 && (
        <section className="bg-neutral" aria-label="Smart Home 記事">
          <div className="max-w-container mx-auto px-md py-section">
            <div className="flex items-center justify-between mb-xl">
              <h2 className="text-2xl font-bold text-primary tracking-tight">Smart Home</h2>
              <a
                href="/category/smart-home"
                className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                すべて見る →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg stagger-children">
              {smartHomePosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About CTA */}
      <section className="bg-surface border-t border-border-light" aria-label="会社紹介">
        <div className="max-w-container mx-auto px-md py-section">
          <div className="max-w-content mx-auto text-center">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-sm">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-md tracking-tight">
              Smart Kurashiについて
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-xl max-w-xl mx-auto">
              私たちは、スマートホーム・AI家電・IoT技術の最新情報を発信する日本のテクノロジーメディアです。
              初心者から専門家まで、すべての読者に価値ある情報をお届けします。
            </p>
            <div className="flex flex-wrap justify-center gap-md">
              <a
                href="/about"
                className="px-xl py-md bg-accent text-white font-semibold rounded-md hover:bg-accent-hover transition-all shadow-sm hover:shadow-glow text-sm"
              >
                会社概要
              </a>
              <a
                href="/contact"
                className="px-xl py-md bg-neutral text-primary font-semibold rounded-md border border-border hover:border-accent hover:text-accent transition-all text-sm"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
