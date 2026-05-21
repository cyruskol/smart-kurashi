import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-section" role="contentinfo">
      <div className="max-w-container mx-auto px-md py-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mb-xl">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-bold text-primary tracking-tight">
              Smart Kurashi
            </Link>
            <p className="text-sm text-text-secondary mt-sm leading-relaxed">
              スマートホーム・AI家電・IoT技術の最新ニュースを日本語でお届け。
            </p>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-sm">コンテンツ</h3>
            <nav aria-label="フッターナビゲーション">
              <ul className="space-y-sm">
                <li>
                  <Link href="/" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/category/ai-tech" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    AI & Tech
                  </Link>
                </li>
                <li>
                  <Link href="/category/smart-home" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    Smart Home
                  </Link>
                </li>
                <li>
                  <a href="/sitemap.xml" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    サイトマップ
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-sm">会社情報</h3>
            <nav aria-label="会社情報ナビゲーション">
              <ul className="space-y-sm">
                <li>
                  <Link href="/about" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    会社概要
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    利用規約
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Smart Kurashi. All rights reserved.
          </p>
          <nav aria-label="法的リンク">
            <ul className="flex items-center gap-lg">
              <li>
                <Link href="/privacy" className="text-xs text-text-muted hover:text-accent transition-colors">
                  プライバシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-text-muted hover:text-accent transition-colors">
                  規約
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
