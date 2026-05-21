import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-container mx-auto px-md py-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl lg:gap-lg">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-lg font-bold text-primary tracking-tight">
              Smart Kurashi
            </Link>
            <p className="text-sm text-text-secondary mt-sm leading-relaxed max-w-xs">
              スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を日本語でお届け。
            </p>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-md">
              コンテンツ
            </h3>
            <nav aria-label="コンテンツナビゲーション">
              <ul className="space-y-sm">
                {[
                  { href: '/', label: 'ホーム' },
                  { href: '/category/ai-tech', label: 'AI & Tech' },
                  { href: '/category/smart-home', label: 'Smart Home' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-md">
              会社情報
            </h3>
            <nav aria-label="会社情報ナビゲーション">
              <ul className="space-y-sm">
                {[
                  { href: '/about', label: '会社概要' },
                  { href: '/contact', label: 'お問い合わせ' },
                  { href: '/privacy', label: 'プライバシーポリシー' },
                  { href: '/terms', label: '利用規約' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-md">
              ニュースレター
            </h3>
            <p className="text-sm text-text-secondary mb-md leading-relaxed">
              最新のテクノロジーニュースを定期配信。
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-light">
        <div className="max-w-container mx-auto px-md py-lg flex flex-col sm:flex-row justify-between items-center gap-sm">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Smart Kurashi. All rights reserved.
          </p>
          <nav aria-label="法的リンク">
            <ul className="flex items-center gap-md">
              <li>
                <Link href="/privacy" className="text-xs text-text-muted hover:text-accent transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-text-muted hover:text-accent transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-xs text-text-muted hover:text-accent transition-colors">
                  サイトマップ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
