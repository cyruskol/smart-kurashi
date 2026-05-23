interface ComparisonProduct {
  image: string;
  name: string;
  price: string;
  size: string;           // New field: サイズ (dimensions)
  smartphone: string;     // New field: スマホ連携 (e.g., "iOS/Android 対応")
  prosCons: string[];     // New field: メリット・デメリット (pros/cons list)
  affiliateUrl: string;
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
            fontWeight: 600,
            color: '#292524',
            marginBottom: '16px',
          }}
        >
          {title}
        </h3>
      )}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: '#fff',
          minWidth: '800px',
        }}
      >
        <thead>
          <tr style={{ background: '#F8FAFC' }}>
            <th style={thStyle}>画像</th>
            <th style={thStyle}>商品名</th>
            <th style={thStyle}>価格</th>
            <th style={thStyle}>サイズ</th>
            <th style={thStyle}>スマホ連携</th>
            <th style={thStyle}>メリット・デメリット</th>
            <th style={thStyle}>詳細を見る</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr
              key={i}
              style={{
                borderTop: '1px solid #E7E5E4',
                background: i === 0 ? '#FFFDF5' : '#fff',
              }}
            >
              {/* 1. Image */}
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
                      fontSize: '24px',
                      margin: '0 auto',
                    }}
                  >
                    📦
                  </div>
                )}
              </td>

              {/* 2. Product Name */}
              <td style={tdStyle}>
                <span style={{ fontWeight: 600, color: '#292524', fontSize: '14px' }}>
                  {product.name}
                </span>
              </td>

              {/* 3. Price (orange highlighted) */}
              <td style={tdStyle}>
                <span style={{ fontWeight: 700, color: '#E8643A', fontSize: '16px' }}>
                  {product.price}
                </span>
              </td>

              {/* 4. Size */}
              <td style={tdStyle}>
                <span style={{ color: '#292524', fontSize: '13px', lineHeight: 1.5 }}>
                  {product.size || '-'}
                </span>
              </td>

              {/* 5. Smartphone Connectivity */}
              <td style={tdStyle}>
                <span style={{ color: '#4A433F', fontSize: '13px', lineHeight: 1.5 }}>
                  {product.smartphone || '-'}
                </span>
              </td>

              {/* 6. Pros/Cons */}
              <td style={tdStyle}>
                <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '13px', color: '#4A433F' }}>
                  {product.prosCons.map((text, j) => (
                    <li key={j} style={{ marginBottom: '4px', lineHeight: 1.4 }}>
                      {text}
                    </li>
                  ))}
                </ul>
              </td>

              {/* 7. CTA Button */}
              <td style={{ ...tdStyle, textAlign: 'center' }}>
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
                  }}
                >
                  詳細を見る →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '12px',
  fontWeight: 600,
  color: '#4A433F',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: '16px',
  verticalAlign: 'top',
  fontSize: '14px',
  color: '#292524',
};
