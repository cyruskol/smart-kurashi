import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { categoryMeta, getAllProducts, getProductBySlug } from '@/lib/products';

interface PageProps { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not Found' };
  return { title: `${product.name} レビュー`, description: product.summary };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = categoryMeta[product.category];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: { '@type': 'Brand', name: product.maker },
    description: product.summary,
    review: { '@type': 'Review', author: { '@type': 'Organization', name: 'Smart Kurashi編集部' }, reviewRating: { '@type': 'Rating', ratingValue: product.rating, bestRating: 5 } },
  };
  return (
    <main className="sk-commerce-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="sk-breadcrumb"><Link href="/">ホーム</Link><span>/</span><Link href="/products">製品レビュー</Link><span>/</span>{product.name}</nav>
      <article className="sk-review-layout">
        <header className="sk-review-hero">
          <p className="sk-eyebrow">{category.label}</p>
          <h1>{product.name} レビュー</h1>
          <p>{product.summary}</p>
          <AffiliateDisclosure compact />
        </header>
        <section className="sk-score-card" aria-label="評価サマリー">
          <div className="sk-score">{product.rating.toFixed(1)}<span>/5</span></div>
          <dl className="sk-product-facts">
            <div><dt>メーカー</dt><dd>{product.maker}</dd></div>
            <div><dt>価格帯</dt><dd>{product.priceRange}</dd></div>
            {Object.entries(product.specs).map(([key, value]) => (<div key={key}><dt>{key}</dt><dd>{value}</dd></div>))}
          </dl>
        </section>
        <section className="sk-two-column">
          <div><h2>向いている人</h2><ul>{product.bestFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h2>購入前の注意点</h2><ul>{product.cautions.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>
        <section className="prose sk-review-body">
          {product.reviewBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <section className="sk-affiliate-box" aria-label="購入リンク">
          <h2>価格・在庫を確認する</h2>
          <p>価格は変動します。購入前に販売ページで最新条件、返品条件、対応オプションを確認してね。</p>
          <div className="sk-link-list">{product.affiliateLinks.map((link) => <a key={link.href} href={link.href} rel="sponsored nofollow noopener noreferrer" target="_blank">{link.label}</a>)}</div>
        </section>
      </article>
    </main>
  );
}
