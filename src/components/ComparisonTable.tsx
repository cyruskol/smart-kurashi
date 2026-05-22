interface ComparisonProduct {
  image: string;
  name: string;
  price: string;
  specs: string[];
  affiliateUrl: string;
  badge?: string;
}

interface ComparisonTableProps {
  products: ComparisonProduct[];
  title?: string;
}

export default function ComparisonTable({ products, title }: ComparisonTableProps) {
  if (!products || products.length === 0) return null;

  return (
    <div style={{ margin: '32px 0', overflowX: 'auto' }}>
      {title && (
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>📊</span> {title}
        </h3>
      )}
      <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: '#fff',
            minWidth: '640px',
          }}
        >
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              <th style={thStyle}>商品</th>
              <th style={thStyle}>製品名</th>
              <th style={thStyle}>価格</th>
              <th style={thStyle}>スペック</th>
              <th style={thStyle}>リンク</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={i}
                style={{
                  borderTop: '1px solid #E2E8F0',
                  background: i === 0 ? '#FFFDF5' : '#fff',
                }}
              >
                <td style={{ ...tdStyle, textAlign: 'center', padding: '16px' }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        background: '#F1F5F9',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        margin: '0 auto',
                      }}
                    >
                      📦
                    </div>
                  )}
                  {product.badge && (
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '6px',
                        padding: '2px 8px',
                        background: '#E8643A',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 700,
                        borderRadius: '4px',
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>
                    {product.name}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 700, color: '#E8643A', fontSize: '16px' }}>
                    {product.price}
                  </span>
                </td>
                <td style={{ ...tdStyle, padding: '12px' }}>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#475569' }}>
                    {product.specs.map((spec, j) => (
                      <li key={j} style={{ marginBottom: '4px', lineHeight: 1.5 }}>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', padding: '16px' }}>
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      background: '#E8643A',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '13px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                    className="hover:bg-orange-600 transition-colors"
                  >
                    見る →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '12px',
  fontWeight: 700,
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: '16px',
  verticalAlign: 'top',
  fontSize: '14px',
  color: '#0F172A',
};
