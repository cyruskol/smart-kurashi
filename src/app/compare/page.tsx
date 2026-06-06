import Link from 'next/link';
import type { Metadata } from 'next';
import ComparisonTable from '@/components/ComparisonTable';
import ProductCard from '@/components/ProductCard';
import { getAllPosts } from '@/lib/posts';
import { getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: '比較・ランキング',
  description: '買う前に比べたい商品と、比較の考え方をまとめたページ。',
};

export default function ComparePage() {
  const products = getAllProducts();
  const posts = getAllPosts();
  const comparisonPosts = posts.filter((post) => post.title.includes('比較') || post.excerpt.includes('比較')).slice(0, 3);
  const rankingArticles = comparisonPosts.length > 0 ? comparisonPosts : posts.slice(0, 3);

  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">COMPARISON / RANKING</p>
        <h1>比較・ランキング</h1>
        <p>
          価格だけでなく、賃貸適性・家族利用・追加費用・設置のしやすさで比べるためのページです。まずは「自分の暮らしに合うか」から絞り込みます。
        </p>
        <div className="product-actions">
          <Link href="/products" className="product-button product-button-primary">
            商品を探す
          </Link>
          <Link href="/reviews" className="product-button">
            レビュー一覧へ
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">RANKED CANDIDATES</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>買う前に比べたい候補</h2>
          </div>
          <Link href="/products" className="product-button">
            商品一覧へ
          </Link>
        </div>
        <ComparisonTable
          title="用途別の有力候補"
          subtitle="ランキングは、価格帯よりも暮らしへのフィット感を優先して並べています。"
          items={products.map((product, index) => ({ rank: index + 1, product, note: product.summary }))}
        />
      </section>

      <section style={{ marginTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">RANKING LENSES</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>比較の考え方がわかる記事</h2>
          </div>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {rankingArticles.map((post) => (
            <article key={post.slug} className="product-card">
              <div className="product-meta">比較記事</div>
              <h2 style={{ fontSize: '1.2rem' }}>
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

      <section style={{ marginTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">FEATURED PRODUCT</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>比較しやすい注目商品</h2>
          </div>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} rank={index + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
