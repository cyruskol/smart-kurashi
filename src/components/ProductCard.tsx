import Link from 'next/link';
import { categoryMeta, type ProductReview } from '@/lib/products';

interface ProductCardProps {
  product: ProductReview;
  href?: string;
  rank?: number;
  compact?: boolean;
  eyebrow?: string;
}

export default function ProductCard({ product, href, rank, compact = false, eyebrow }: ProductCardProps) {
  const category = categoryMeta[product.category];
  const productHref = href ?? `/products/${product.slug}`;
  const primaryLink = product.affiliateLinks[0];

  return (
    <article className={`product-card ${compact ? 'product-card-compact' : ''}`}>
      <div className="product-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {rank ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '2rem',
              height: '2rem',
              borderRadius: '999px',
              background: '#3F3A36',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 800,
            }}
          >
            {rank}
          </span>
        ) : null}
        <span>{eyebrow || category.label}</span>
      </div>

      <h2>
        <Link href={productHref}>{product.name}</Link>
      </h2>

      <p>{product.summary}</p>

      <dl className="product-facts">
        <div>
          <dt>メーカー</dt>
          <dd>{product.maker}</dd>
        </div>
        <div>
          <dt>価格帯</dt>
          <dd>{product.priceRange}</dd>
        </div>
        <div>
          <dt>評価</dt>
          <dd>{product.rating.toFixed(1)} / 5</dd>
        </div>
      </dl>

      <div style={{ display: 'grid', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {product.bestFor.slice(0, compact ? 2 : 3).map((item) => (
            <span
              key={item}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '999px',
                padding: '5px 10px',
                background: '#F1F5F4',
                color: '#4F6F5D',
                fontSize: '0.82rem',
                fontWeight: 700,
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          {product.cautions.slice(0, compact ? 1 : 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="product-actions">
        <Link className="product-button product-button-primary" href={productHref}>
          レビューを読む
        </Link>
        {primaryLink ? (
          <a href={primaryLink.href} rel="sponsored nofollow noopener noreferrer" target="_blank" className="product-button">
            {primaryLink.label}
          </a>
        ) : null}
      </div>

      {compact ? null : (
        <div className="sk-link-list" aria-label={`${product.name} の購入リンク`}>
          {product.affiliateLinks.slice(0, 3).map((link) => (
            <a key={link.href} href={link.href} rel="sponsored nofollow noopener noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
