import type { Metadata } from 'next';
import Link from 'next/link';
import { categoryMeta, getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'スマートホーム製品 比較表',
  description: 'スマートロック、ロボット掃除機、スマートスピーカーを価格帯・向いている人・注意点で比較します。',
};

export default function ComparePage() {
  const products = getAllProducts();
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">COMPARE</p>
        <h1>スマートホーム製品 比較表</h1>
        <p>価格だけでなく、設置しやすさ・日本の住まいへの合いやすさ・追加費用まで横並びで確認できるよ。</p>
      </section>
      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr><th>製品</th><th>カテゴリ</th><th>価格帯</th><th>評価</th><th>向いている人</th><th>注意点</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <th><Link href={`/products/${product.slug}`}>{product.name}</Link></th>
                <td>{categoryMeta[product.category].label}</td>
                <td>{product.priceRange}</td>
                <td>{product.rating.toFixed(1)} / 5</td>
                <td>{product.bestFor[0]}</td>
                <td>{product.cautions[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
