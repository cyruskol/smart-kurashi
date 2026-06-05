import Link from 'next/link';
import type { Metadata } from 'next';
import { categoryMeta, getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'スマートホーム製品レビュー・比較',
  description: 'Smart Kurashi編集部が、スマートロック、ロボット掃除機、スマートスピーカーなどを日本の暮らし目線で比較レビューします。',
};

export default function ProductsPage() {
  const products = getAllProducts();
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">PRODUCT GUIDE</p>
        <h1>スマートホーム製品レビュー・比較</h1>
        <p>導入しやすさ、家族での使いやすさ、追加費用、賃貸適性まで含めて、買う前に確認したいポイントを整理しているよ。</p>
        <div className="product-actions">
          <Link href="/compare" className="product-button product-button-primary">比較表を見る</Link>
          <Link href="/reviews" className="product-button">レビュー一覧へ</Link>
        </div>
      </section>

      <section className="category-grid" aria-label="カテゴリ別に探す">
        {Object.entries(categoryMeta).map(([slug, meta]) => (
          <Link className="category-card" href={`/products?category=${slug}`} key={slug}>
            <span>{meta.label}</span>
            <p>{meta.description}</p>
          </Link>
        ))}
      </section>

      <section className="product-grid" aria-label="注目製品">
        {products.map((product) => (
          <article className="product-card" key={product.slug}>
            <div className="product-meta">{categoryMeta[product.category].label} / {product.maker}</div>
            <h2><Link href={`/products/${product.slug}`}>{product.name}</Link></h2>
            <p>{product.summary}</p>
            <dl className="product-facts">
              <div><dt>価格帯</dt><dd>{product.priceRange}</dd></div>
              <div><dt>評価</dt><dd>{product.rating.toFixed(1)} / 5</dd></div>
            </dl>
            <Link className="sk-card-cta" href={`/products/${product.slug}`}>レビューを読む</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
