import Link from 'next/link';
import { categoryMeta, type ProductMetadata } from '@/lib/products';

interface ProductCardProps {
  product: ProductMetadata;
  href?: string;
  rank?: number;
  compact?: boolean;
  eyebrow?: string;
  sourcePage?: string;
}

export default function ProductCard({ product, href, rank, compact = false, eyebrow, sourcePage }: ProductCardProps) {
  const productHref = href ?? product.productUrl ?? `/products/${product.slug}`;
  const category = categoryMeta[product.category] || { label: product.category, description: '' };

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

      <p>{product.shortDescription}</p>

      <dl className="product-facts">
        <div>
          <dt>ブランド</dt>
          <dd>{product.brand || '—'}</dd>
        </div>
        <div>
          <dt>カテゴリ</dt>
          <dd>{product.category}</dd>
        </div>
        <div>
          <dt>レビュー種別</dt>
          <dd>{product.reviewStatus === 'research-review' ? '調査レビュー' : product.reviewStatus}</dd>
        </div>
      </dl>

      <div style={{ display: 'grid', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {product.recommendedFor.slice(0, compact ? 2 : 3).map((item) => (
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
          {product.cons.slice(0, compact ? 1 : 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="product-actions">
        <Link className="product-button product-button-primary" href={product.reviewUrl || productHref}>
          レビューを読む
        </Link>
      </div>

      {compact ? null : (
        <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <span className="sk-eyebrow">{product.reviewStatus === 'research-review' ? '調査レビュー' : product.reviewStatus}</span>
          <span className="sk-eyebrow">{product.handsOnStatus === 'not-used' ? '未実使用' : product.handsOnStatus}</span>
          {product.comparisonEligible ? <span className="sk-eyebrow">比較候補</span> : null}
        </div>
      )}
    </article>
  );
}
