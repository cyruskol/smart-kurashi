import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#292524', color: '#E7E5E4' }} className="hidden sm:block" role="contentinfo">
      <div className="max-w-container mx-auto px-md py-section">
        <div className="grid grid-cols-2 gap-xl">
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FAFAF9', marginBottom: '8px' }}>Smart Kurashi</h3>
            <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.7 }}>
              スマートホーム・AI 家電・IoT 技術の最新ニュースをお届け。
            </p>
          </div>
          {/* Company Links */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 400, color: '#78716C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              会社情報
            </h3>
            <nav aria-label="会社情報ナビゲーション">
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><Link href="/about" style={{ fontSize: '14px', color: '#A8A29E', textDecoration: 'none' }}>会社概要</Link></li>
                <li><Link href="/contact" style={{ fontSize: '14px', color: '#A8A29E', textDecoration: 'none' }}>お問い合わせ</Link></li>
                <li><Link href="/privacy" style={{ fontSize: '14px', color: '#A8A29E', textDecoration: 'none' }}>プライバシーポリシー</Link></li>
                <li><Link href="/terms" style={{ fontSize: '14px', color: '#A8A29E', textDecoration: 'none' }}>利用規約</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #44403C' }}>
        <div className="max-w-container mx-auto px-md" style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: '#78716C' }}>
            &copy; {new Date().getFullYear()} Smart Kurashi. All rights reserved.
          </p>
          <nav aria-label="法的リンク">
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '16px' }}>
              <li><Link href="/privacy" style={{ fontSize: '12px', color: '#78716C', textDecoration: 'none' }}>プライバシーポリシー</Link></li>
              <li><Link href="/terms" style={{ fontSize: '12px', color: '#78716C', textDecoration: 'none' }}>利用規約</Link></li>
              <li><a href="/sitemap.xml" style={{ fontSize: '12px', color: '#78716C', textDecoration: 'none' }}>サイトマップ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
