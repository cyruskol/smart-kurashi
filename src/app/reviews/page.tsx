import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'レビュー一覧',
  description: 'Smart Kurashi編集部によるスマートテレビのレビュー一覧です。',
};

export default function ReviewsPage() {
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">REVIEWS</p>
        <h1>レビュー一覧</h1>
        <p>いま掲載しているのは、実際に公開したTVレビューだけ。ほかの商品はまだ追加していないよ。</p>
      </section>
      <section className="product-grid">
        <article className="product-card">
          <div className="product-meta">スマートテレビ</div>
          <h2><Link href="/posts/2026-06-03_fp-dvision-jg32-pb-review">FP-DVISION JG32-PB レビュー — F1観戦にも最適な32インチスマートテレビ</Link></h2>
          <p>FP-DVISION JG32-PBを、F1視聴・部屋サイズ・使い勝手の観点でまとめたレビュー。楽天の購入導線と部屋のサイズ感も含めて整理している。</p>
          <Link className="sk-card-cta" href="/posts/2026-06-03_fp-dvision-jg32-pb-review">レビューを読む</Link>
        </article>
      </section>
    </main>
  );
}
