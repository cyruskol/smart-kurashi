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
        <div className="grid grid-cols-2 gap-xl">
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FAFAF9', marginBottom: '8px' }}>Smart Kurashi</h3>
            <p style={{ fontSize: '13px', color: '#A8A29E', lineHeight: 1.75, maxWidth: '32rem' }}>
              日本で買って失敗しにくいAI・家電・ガジェットを、レビュー・比較・購入導線までまとめて案内する商品発見サイト。
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#A8A29E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              サイト内リンク
            </h3>
            <nav aria-label="フッターナビゲーション">
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
        </div>
      </div>

      <div style={{ borderTop: '1px solid #44403C' }}>
        <div className="max-w-container mx-auto px-md" style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '12px', color: '#A8A29E' }}>
            &copy; {new Date().getFullYear()} Smart Kurashi. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: '#A8A29E' }}>
            価格・在庫は販売サイトで確認してください。
          </p>
        </div>
      </div>
    </footer>
  );
}
