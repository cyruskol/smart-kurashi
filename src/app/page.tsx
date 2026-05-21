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

  // Collect all unique categories for the features section
  const categories = [
    {
      slug: 'ai-tech',
      label: 'AI & Tech',
      description: '生成AI、機械学習、チャットボットなど人工知能分野の最新トレンド',
      icon: '🤖',
    },
    {
      slug: 'smart-home',
      label: 'Smart Home',
      description: 'スマートスピーカー、照明、セキュリティなど家庭のIoT化',
      icon: '🏠',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-neutral py-xl md:py-xxl" aria-label="ヒーローセクション">
        <div className="max-w-container mx-auto px-md text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight mb-md">
            Smart Kurashi
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-content mx-auto leading-relaxed mb-lg">
            スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を日本語でお届け。
            未来のくらしに役立つ情報を、専門家がわかりやすく解説します。
          </p>
          <div className="flex flex-wrap justify-center gap-md">
            <a
              href="/category/ai-tech"
              className="px-xl py-sm bg-accent text-white font-medium rounded-md hover:bg-accent-hover transition-colors"
            >
              AI & Tech
            </a>
            <a
              href="/category/smart-home"
              className="px-xl py-sm bg-surface text-text-primary font-medium rounded-md border border-border hover:border-accent transition-colors"
            >
              Smart Home
            </a>
          </div>
        </div>
      </section>

      {/* Features / Categories Grid */}
      <section className="py-section bg-surface" aria-label="カテゴリ">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-2xl font-bold text-primary mb-xl text-center">主要カテゴリ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group bg-neutral rounded-lg border border-border p-lg transition-all hover:border-accent hover:shadow-lg"
              >
                <span className="text-3xl mb-md block" role="img" aria-label={cat.label}>
                  {cat.icon}
                </span>
                <h3 className="text-xl font-bold text-primary mb-sm group-hover:text-accent transition-colors">
                  {cat.label}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {cat.description}
                </p>
                <span className="inline-block mt-md text-sm font-medium text-accent">
                  記事一覧を見る →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-section" aria-label="注目記事">
          <div className="max-w-container mx-auto px-md">
            <p className="text-sm font-medium text-accent mb-sm tracking-wider uppercase">
              Featured
            </p>
            <ArticleCard post={featuredPost} variant="featured" />
          </div>
        </section>
      )}

      {/* Latest Posts Grid */}
      {remainingPosts.length > 0 && (
        <section className="py-section bg-surface" aria-label="最新記事">
          <div className="max-w-container mx-auto px-md">
            <div className="flex items-center justify-between mb-xl">
              <h2 className="text-2xl font-bold text-primary">最新記事</h2>
              <a
                href="/category/ai-tech"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                すべて見る →
              </a>
            </div>
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
        <section className="py-section" aria-label="AI & Tech 記事">
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
        <section className="py-section bg-surface" aria-label="Smart Home 記事">
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

      {/* CTA / About Section */}
      {!featuredPost && remainingPosts.length === 0 && aiPosts.length === 0 && smartHomePosts.length === 0 && (
        <section className="py-section" aria-label="はじめに">
          <div className="max-w-content mx-auto px-md text-center">
            <h2 className="text-3xl font-bold text-primary mb-md">
              Smart Kurashiへようこそ
            </h2>
            <p className="text-text-secondary text-lg mb-xl">
              スマートホーム・AI家電の最新ニュースをお届けします。
              <br />
              コンテンツ準備中です。
            </p>
            <a
              href="/about"
              className="inline-block px-xl py-sm bg-accent text-white font-medium rounded-md hover:bg-accent-hover transition-colors"
            >
              私たちについて
            </a>
          </div>
        </section>
      )}

      {/* About CTA */}
      <section className="py-section" aria-label="会社紹介">
        <div className="max-w-container mx-auto px-md">
          <div className="bg-surface rounded-lg border border-border p-xl md:p-xxl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-md">
              Smart Kurashiについて
            </h2>
            <p className="text-text-secondary text-lg max-w-content mx-auto leading-relaxed mb-lg">
              私たちは、スマートホーム・AI家電・IoT技術の最新情報を発信する日本のテクノロジーメディアです。
              初心者から専門家まで、すべての読者に価値ある情報をお届けします。
            </p>
            <div className="flex flex-wrap justify-center gap-md">
              <a
                href="/about"
                className="px-xl py-sm bg-accent text-white font-medium rounded-md hover:bg-accent-hover transition-colors"
              >
                会社概要
              </a>
              <a
                href="/contact"
                className="px-xl py-sm bg-surface text-text-primary font-medium rounded-md border border-border hover:border-accent transition-colors"
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
