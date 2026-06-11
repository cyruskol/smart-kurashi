import Link from 'next/link';

export default function Footer() {
  const footerLinks = [
    { href: '/products', label: '商品を探す' },
    { href: '/compare', label: '比較・ランキング' },
    { href: '/reviews', label: 'レビュー一覧' },
    { href: '/about', label: '運営情報' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/privacy', label: 'プライバシーポリシー' },
    { href: '/terms', label: '利用規約' },
  ];

  return (
    <footer style={{ background: '#292524', color: '#E7E5E4' }} role="contentinfo">
      <div className="max-w-container mx-auto px-md py-section">
        <nav aria-label="フッターナビゲーション">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} style={{ fontSize: '14px', color: '#A8A29E', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div style={{ borderTop: '1px solid #44403C' }}>
        <div className="max-w-container mx-auto px-md" style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '12px', color: '#A8A29E' }}>
            &copy; {new Date().getFullYear()} スマートくらし. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: '#A8A29E' }}>
            価格・在庫は販売サイトで確認してください。
          </p>
        </div>
      </div>
    </footer>
  );
}
