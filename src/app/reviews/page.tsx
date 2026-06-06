import Link from 'next/link';
import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { getAllPosts } from '@/lib/posts';
import { getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'レビュー一覧',
  description: '公開済みのレビュー記事と、レビュー済み商品の一覧。',
};

export default function ReviewsPage() {
  const reviewPosts = getAllPosts().filter((post) => post.slug.includes('review'));
  const products = getAllProducts();

  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">REVIEWS</p>
        <h1>レビュー一覧</h1>
        <p>
          実際に公開したレビュー記事と、商品ページをまとめた一覧です。記事から商品ページへ、商品ページから比較ページへ移動しやすい構成にしています。
        </p>
        <div className="product-actions">
          <Link href="/compare" className="product-button product-button-primary">
            比較・ランキングを見る
          </Link>
          <Link href="/products" className="product-button">
            商品を探す
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">PUBLISHED REVIEW</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>公開済みレビュー記事</h2>
          </div>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {reviewPosts.map((post) => (
            <article key={post.slug} className="product-card">
              <div className="product-meta">レビュー記事</div>
              <h2 style={{ fontSize: '1.2rem' }}>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="product-actions">
                <Link href={`/posts/${post.slug}`} className="product-button product-button-primary">
                  レビューを読む
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">REVIEWED ITEMS</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>レビュー済み商品</h2>
          </div>
          <Link href="/products" className="product-button">
            商品一覧へ
          </Link>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
