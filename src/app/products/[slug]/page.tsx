import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, getProductBySlug } from '@/lib/products';

interface PageProps { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not Found' };
  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      type: 'article',
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviewHref = product.reviewUrl || '/reviews';

  return (
    <main className="product-page">
      <nav className="product-breadcrumb">
        <Link href="/">ホーム</Link><span>/</span><Link href="/products">商品を探す</Link><span>/</span>{product.name}
      </nav>

      <article className="product-detail">
        <header className="product-hero">
          <p className="sk-eyebrow">{product.group}</p>
          <h1>{product.name}</h1>
          <p>{product.shortDescription}</p>
          <div className="product-actions">
            <Link href={reviewHref} className="product-button product-button-primary">
              レビューを読む
            </Link>
            <Link href="/compare" className="product-button">
              比較・ランキングを見る
            </Link>
          </div>
        </header>

        <section className="rating-panel" aria-label="評価サマリー">
          <div className="sk-score" style={{ background: product.reviewStatus === 'research-review' ? '#A9582D' : '#4F6F5D' }}>
            {product.reviewStatus === 'research-review' ? '調' : '評'}
          </div>
          <dl className="product-facts">
            <div><dt>ブランド</dt><dd>{product.brand || '—'}</dd></div>
            <div><dt>カテゴリ</dt><dd>{product.category}</dd></div>
            <div><dt>レビュー種別</dt><dd>{product.reviewStatus === 'research-review' ? '調査レビュー' : product.reviewStatus}</dd></div>
            <div><dt>手元検証</dt><dd>{product.handsOnStatus === 'not-used' ? '未使用' : product.handsOnStatus}</dd></div>
            <div><dt>比較候補</dt><dd>{product.comparisonEligible ? 'はい' : 'いいえ'}</dd></div>
            <div><dt>更新日</dt><dd>{new Date(product.updatedAt).toLocaleDateString('ja-JP')}</dd></div>
          </dl>
        </section>

        <section className="two-column-panel">
          <div>
            <h2>おすすめな人</h2>
            <ul>{product.recommendedFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h2>おすすめしない人</h2>
            <ul>{product.notRecommendedFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="two-column-panel">
          <div>
            <h2>良い点</h2>
            <ul>{product.pros.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h2>気になる点</h2>
            <ul>{product.cons.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="product-card">
          <h2>SEO・メタデータ</h2>
          <dl className="product-facts">
            <div><dt>SEOタイトル</dt><dd>{product.seo.title}</dd></div>
            <div><dt>SEOディスクリプション</dt><dd>{product.seo.description}</dd></div>
            <div><dt>キーワード</dt><dd>{product.seo.keywords?.join(' / ') || '—'}</dd></div>
            <div><dt>レビューURL</dt><dd>{product.reviewUrl || '—'}</dd></div>
            <div><dt>商品URL</dt><dd>{product.productUrl || '—'}</dd></div>
          </dl>
        </section>

        <section className="buy-panel" aria-label="価格・在庫を確認する">
          <h2>価格・在庫を確認する</h2>
          <p>価格・在庫は販売サイトで確認してください。</p>
        </section>
      </article>
    </main>
  );
}
