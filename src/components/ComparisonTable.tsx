import Link from 'next/link';
import { type ProductReview } from '@/lib/products';

interface ComparisonItem {
  rank: number;
  product: ProductReview;
  note?: string;
  href?: string;
}

interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
  items: ComparisonItem[];
}

export default function ComparisonTable({ title, subtitle, items }: ComparisonTableProps) {
  if (!items.length) return null;

  return (
    <section className="compare-table-wrap">
      {(title || subtitle) && (
        <div style={{ marginBottom: '20px' }}>
          {title ? <h3 style={{ fontSize: '1.35rem', marginBottom: '6px' }}>{title}</h3> : null}
          {subtitle ? <p style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</p> : null}
        </div>
      )}

      <div style={{ display: 'grid', gap: '16px' }}>
        {items.map(({ rank, product, note, href }) => {
          const productHref = href ?? `/products/${product.slug}`;
          return (
            <article
              key={product.slug}
              style={{
                display: 'grid',
                gap: '16px',
                padding: '20px',
                borderRadius: '20px',
                border: '1px solid var(--color-border)',
                background: rank === 1 ? '#FFFDF5' : '#fff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '999px',
                      background: '#3F3A36',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                    }}
                  >
                    {rank}
                  </span>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>{product.name}</h4>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{product.maker} / {product.priceRange}</p>
                  </div>
                </div>
                <span
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
                  {product.bestFor[0]}
                </span>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>{note || product.summary}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div style={{ padding: '14px', borderRadius: '16px', background: '#F9FAF9', border: '1px solid var(--color-border)' }}>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>向いている人</strong>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--color-text-secondary)' }}>
                      {product.bestFor.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '16px', background: '#F9FAF9', border: '1px solid var(--color-border)' }}>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>注意したい点</strong>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--color-text-secondary)' }}>
                      {product.cautions.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product-actions" style={{ marginTop: 0 }}>
                <Link href={productHref} className="product-button product-button-primary">
                  レビューを読む
                </Link>
                {product.affiliateLinks.slice(0, 2).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    rel="sponsored nofollow noopener noreferrer"
                    target="_blank"
                    className="product-button"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
