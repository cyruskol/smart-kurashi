import Link from 'next/link';
import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: '商品を探す',
  description: 'レビュー済みのAI・家電・ガジェットを、カテゴリ別に探せる商品一覧。',
};

export default function ProductsPage() {
  const products = getAllProducts();

  const discoveryTiles = [
    {
      href: '/products/sesame-5-smart-lock',
      label: 'スマートロック',
      description: '賃貸でも試しやすい玄関まわりの比較',
    },
    {
      href: '/products/switchbot-robot-vacuum-k10-plus',
      label: 'ロボット掃除機',
      description: '間取りと自動化のバランスで選ぶ',
    },
    {
      href: '/products/echo-dot-matter-hub',
      label: 'スマートスピーカー',
      description: '音声操作と家族利用のしやすさで選ぶ',
    },
    {
      href: '/compare',
      label: '比較・ランキング',
      description: '買う前に比較軸を整理する',
    },
  ];

  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">PRODUCT GUIDE</p>
        <h1>商品を探す</h1>
        <p>
          レビュー済み商品だけをまとめた一覧です。価格だけで決めず、向いている人・注意点・購入先をまとめて確認できるようにしています。
        </p>
        <div className="product-actions">
          <Link href="/compare" className="product-button product-button-primary">
            比較・ランキングを見る
          </Link>
          <Link href="/reviews" className="product-button">
            レビュー一覧へ
          </Link>
        </div>
      </section>

      <section className="category-grid" aria-label="探し方別に探す">
        {discoveryTiles.map((tile) => (
          <Link className="category-card" href={tile.href} key={tile.href}>
            <span>{tile.label}</span>
            <p>{tile.description}</p>
          </Link>
        ))}
      </section>

      <section style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">FEATURED ITEMS</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>注目のレビュー済み商品</h2>
          </div>
          <Link href="/compare" className="product-button">
            比較する
          </Link>
        </div>
        <div className="product-grid" style={{ marginTop: 0 }}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
