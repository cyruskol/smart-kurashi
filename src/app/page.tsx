import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { getFeaturedProducts, getAllProducts } from '@/lib/products';
import ComparisonTable from '@/components/ComparisonTable';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'ホーム',
  description: 'AIツール、家電、ガジェットをレビュー・比較・買い方ガイドで探せる Smart Kurashi のホーム。',
};

const categoryTiles = [
  {
    href: '/category/ai-tech',
    label: 'AI・テック',
    description: 'AIツール、ソフトウェア、仕事効率化の比較とレビュー',
  },
  {
    href: '/category/smart-home',
    label: '家電・ガジェット',
    description: 'スマートロック、掃除機、照明、日常を楽にする家電',
  },
  {
    href: '/products',
    label: '商品を探す',
    description: 'レビュー済み商品だけをまとめて探す',
  },
  {
    href: '/compare',
    label: '比較・ランキング',
    description: '買う前の比較軸でランキングをチェックする',
  },
  {
    href: '/reviews',
    label: 'レビュー一覧',
    description: '実際に公開しているレビュー記事へ',
  },
  {
    href: '/about',
    label: '運営方針',
    description: '比較基準・更新方針・PRの考え方',
  },
];

const heroStats = [
  'レビュー済み商品を優先',
  '比較・ランキングを先に置く',
  '購入先リンクは販売サイトで確認',
  '日本の住環境に合わせて選ぶ',
];

export default async function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getAllProducts();
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 4);
  const reviewPost = posts.find((post) => post.slug.includes('review'));

  return (
    <main>
      <section style={{ background: 'linear-gradient(180deg, #F8F6F1 0%, #FFF 100%)', borderBottom: '1px solid #E7E5E4' }}>
        <div className="max-w-container mx-auto px-md" style={{ padding: '32px 16px 40px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            <section
              style={{
                borderRadius: '28px',
                border: '1px solid #DDD8D1',
                background: 'rgba(255,255,255,0.82)',
                padding: 'clamp(24px, 4vw, 40px)',
                boxShadow: '0 20px 50px rgba(63,58,54,0.08)',
              }}
            >
              <p style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em', color: '#4F6F5D', marginBottom: '12px' }}>
                PRODUCT DISCOVERY / AFFILIATE GUIDE
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: '16px' }}>
                日本で買って失敗しにくいAI・家電・ガジェットを、<br />
                比較目線でわかりやすく探せる。
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.02rem', lineHeight: 1.8, maxWidth: '44rem' }}>
                Smart Kurashi は、レビュー済み商品・比較記事・買い方ガイドをまとめて見せる商品発見サイト。価格だけでなく、賃貸適性・家族での使いやすさ・追加費用まで含めて選べるようにしています。
              </p>

              <div className="product-actions" style={{ marginTop: '24px' }}>
                <Link href="/products" className="product-button product-button-primary">
                  商品を探す
                </Link>
                <Link href="/compare" className="product-button">
                  比較・ランキングを見る
                </Link>
                <Link href="/reviews" className="product-button">
                  レビュー一覧を見る
                </Link>
              </div>

              <form action="/search" method="GET" style={{ marginTop: '22px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  name="q"
                  type="search"
                  placeholder="商品名・用途・悩みで検索"
                  aria-label="サイト内検索"
                  style={{
                    flex: '1 1 320px',
                    minHeight: '46px',
                    padding: '12px 16px',
                    borderRadius: '999px',
                    border: '1px solid #DDD8D1',
                    background: '#fff',
                    fontSize: '16px',
                  }}
                />
                <button type="submit" className="product-button product-button-primary" style={{ cursor: 'pointer' }}>
                  検索する
                </button>
              </form>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px' }}>
                {heroStats.map((item) => (
                  <span
                    key={item}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: '999px',
                      padding: '7px 12px',
                      background: '#F1F5F4',
                      color: '#4A433F',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-md" style={{ paddingTop: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em', color: '#4F6F5D', marginBottom: '8px' }}>
              NAVIGATION
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>探し方から入れるカテゴリ</h2>
          </div>
          <Link href="/products" className="product-button">
            商品一覧へ
          </Link>
        </div>
        <div className="category-grid" style={{ marginTop: 0 }}>
          {categoryTiles.map((tile) => (
            <Link key={tile.href} href={tile.href} className="category-card" style={{ textDecoration: 'none' }}>
              <span>{tile.label}</span>
              <p>{tile.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-container mx-auto px-md" style={{ paddingTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em', color: '#4F6F5D', marginBottom: '8px' }}>
              COMPARISON & RANKING
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>比較・ランキングの注目候補</h2>
          </div>
          <Link href="/compare" className="product-button">
            すべて見る
          </Link>
        </div>
        <ComparisonTable
          title="買う前に比べたい3製品"
          subtitle="価格帯だけでなく、賃貸適性・自動化のしやすさ・家族での使いやすさを見て選ぶ。"
          items={featuredProducts.map((product, index) => ({ rank: index + 1, product, note: product.shortDescription }))}
        />
      </section>

      <section className="max-w-container mx-auto px-md" style={{ paddingTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em', color: '#4F6F5D', marginBottom: '8px' }}>
              REVIEWED PRODUCTS
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>レビュー済み商品</h2>
          </div>
          <Link href="/products" className="product-button">
            商品一覧へ
          </Link>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {allProducts.map((product) => (
            <ProductCard key={product.slug} product={product} compact sourcePage="/" />
          ))}
        </div>
      </section>

      <section className="max-w-container mx-auto px-md" style={{ paddingTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em', color: '#4F6F5D', marginBottom: '8px' }}>
              BUYING GUIDES
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>買う前に読むガイド</h2>
          </div>
          <Link href="/reviews" className="product-button">
            レビュー一覧へ
          </Link>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {latestPosts.map((post) => (
            <article key={post.slug} className="product-card">
              <div className="product-meta">{post.category === 'ai-tech' ? 'AI・テック' : '家電・ガジェット'}</div>
              <h2 style={{ fontSize: '1.2rem' }}>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="product-actions" style={{ marginTop: '20px' }}>
                <Link href={`/posts/${post.slug}`} className="product-button product-button-primary">
                  読む
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-container mx-auto px-md" style={{ paddingTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em', color: '#4F6F5D', marginBottom: '8px' }}>
              LATEST REVIEWS
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>最新レビュー / 更新情報</h2>
          </div>
          <Link href="/reviews" className="product-button">
            もっと見る
          </Link>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {reviewPost ? (
            <article className="product-card">
              <div className="product-meta">レビュー記事</div>
              <h2>
                <Link href={`/posts/${reviewPost.slug}`}>{reviewPost.title}</Link>
              </h2>
              <p>{reviewPost.excerpt}</p>
              <div className="product-actions">
                <Link href={`/posts/${reviewPost.slug}`} className="product-button product-button-primary">
                  レビューを読む
                </Link>
              </div>
            </article>
          ) : null}
          {posts.slice(0, 2).map((post) => (
            <article key={post.slug} className="product-card">
              <div className="product-meta">更新記事</div>
              <h2>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="product-actions">
                <Link href={`/posts/${post.slug}`} className="product-button product-button-primary">
                  読む
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
