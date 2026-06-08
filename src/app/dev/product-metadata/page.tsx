import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildProductMetadataReport, getAllProducts, retailerOrder } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default function ProductMetadataDevPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  const products = getAllProducts();
  const report = buildProductMetadataReport(products);

  return (
    <main style={{ padding: '32px', background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: '24px' }}>
        <header style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, padding: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', color: '#A9582D' }}>LOCAL ONLY</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: 8 }}>Product metadata dashboard</h1>
          <p style={{ color: '#5A534E', marginBottom: 0 }}>Products, review status, retailer tracking readiness, and comparison eligibility in one place.</p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            ['Total products', report.totals.count],
            ['Reviewed', report.totals.reviewed],
            ['Research reviews', report.totals.researchReview],
            ['Planned', report.totals.planned],
            ['Draft', report.totals.draft],
            ['Comparison eligible', report.totals.comparisonEligible],
            ['Trackable retailers', report.totals.trackableRetailers],
            ['Ready for card', report.totals.readyForCard],
          ].map(([label, value]) => (
            <div key={label as string} style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, padding: 18 }}>
              <div style={{ fontSize: 12, color: '#5A534E', marginBottom: 8 }}>{label as string}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{String(value)}</div>
            </div>
          ))}
        </section>

        <section style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, padding: 24 }}>
          <h2 style={{ marginBottom: 16 }}>Metadata warnings</h2>
          {report.validationErrors.length > 0 ? (
            <div style={{ marginBottom: 16, color: '#B91C1C' }}>
              <strong>Critical errors</strong>
              <ul style={{ marginTop: 8, paddingLeft: '1.2rem' }}>
                {report.validationErrors.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
          {report.metadataWarnings.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#7C2D12' }}>
              {report.metadataWarnings.map((item) => (
                <li key={item.productSlug}>
                  <strong>{item.productSlug}</strong>: {item.warnings.join(' / ')}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ marginBottom: 0 }}>No metadata warnings.</p>
          )}
        </section>

        <section style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, padding: 24 }}>
          <h2 style={{ marginBottom: 16 }}>Retailer tracking not configured</h2>
          {report.trackingNotConfigured.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {report.trackingNotConfigured.map((item) => (
                <li key={`${item.productSlug}-${item.retailer}`}>
                  {item.productSlug} → {item.label} ({item.retailer})
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ marginBottom: 0 }}>All enabled retailers are configured.</p>
          )}
        </section>

        <section style={{ background: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <h2 style={{ marginBottom: 0 }}>Product list</h2>
            <Link href="/products" style={{ color: '#A9582D', fontWeight: 700 }}>Open product listing</Link>
          </div>
          <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
            {products.map((product) => (
              <article key={product.slug} style={{ border: '1px solid #E7E5E4', borderRadius: 16, padding: 20, background: '#FAFAF9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: '#5A534E' }}>{product.group} / {product.category}</p>
                    <h3 style={{ margin: '6px 0 8px' }}>{product.name}</h3>
                    <p style={{ margin: 0, color: '#5A534E' }}>{product.shortDescription}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#5A534E' }}>Review status</div>
                    <div style={{ fontWeight: 700 }}>{product.reviewStatus}</div>
                    <div style={{ fontSize: 12, color: '#5A534E', marginTop: 8 }}>Hands-on</div>
                    <div style={{ fontWeight: 700 }}>{product.handsOnStatus}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 16 }}>
                  <div>
                    <strong>Missing data check</strong>
                    <ul style={{ margin: '8px 0 0', paddingLeft: '1.2rem' }}>
                      {!product.reviewUrl ? <li>Missing reviewUrl</li> : null}
                      {!product.productUrl ? <li>Missing productUrl</li> : null}
                      {!product.pros?.length ? <li>Missing pros</li> : null}
                      {!product.cons?.length ? <li>Missing cons</li> : null}
                      {!product.recommendedFor?.length ? <li>Missing recommendedFor</li> : null}
                      {!product.notRecommendedFor?.length ? <li>Missing notRecommendedFor</li> : null}
                      {!product.seo?.title ? <li>Missing SEO title</li> : null}
                      {!product.seo?.description ? <li>Missing SEO description</li> : null}
                      {product.reviewStatus === 'reviewed' && !product.reviewUrl ? <li>Reviewed but no reviewUrl</li> : null}
                    </ul>
                  </div>
                  <div>
                    <strong>Retailers</strong>
                    <ul style={{ margin: '8px 0 0', paddingLeft: '1.2rem' }}>
                      {retailerOrder.map((retailer) => {
                        const link = product.retailers?.[retailer];
                        return (
                          <li key={retailer}>
                            {retailer}: {link?.enabled ? (link.trackingStatus || 'unknown') : 'disabled'}
                          </li>
                        );
                      })}
                    </ul>
                    <div style={{ marginTop: 12, display: 'grid', gap: 6 }}>
                      {retailerOrder.map((retailer) => (
                        <Link key={retailer} href={`/go/${retailer}/${product.slug}?from=dashboard`} style={{ color: '#A9582D', fontWeight: 700 }}>
                          /go/{retailer}/{product.slug}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
