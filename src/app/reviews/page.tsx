import type { Metadata } from 'next';
import Link from 'next/link';
import { categoryMeta, getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'レビュー一覧',
  description: 'Smart Kurashi編集部によるスマートホーム製品レビュー一覧です。',
};

export default function ReviewsPage() {
  const products = getAllProducts();
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">REVIEWS</p>
        <h1>レビュー一覧</h1>
        <p>スマートホーム導入前に読んでおきたい製品レビューをまとめているよ。</p>
      </section>
      <section className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.slug}>
            <div className="product-meta">{categoryMeta[product.category].label}</div>
            <h2><Link href={`/products/${product.slug}`}>{product.name}</Link></h2>
            <p>{product.summary}</p>
            <Link className="sk-card-cta" href={`/products/${product.slug}`}>詳しく見る</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
