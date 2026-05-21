import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-container mx-auto px-md py-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-sm mb-md">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <span className="text-lg font-bold tracking-tight">Smart Kurashi</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を日本語でお届け。未来のくらしに役立つ情報を発信します。
            </p>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-md">
              コンテンツ
            </h3>
            <nav aria-label="コンテンツナビゲーション">
              <ul className="space-y-sm">
                {[
                  { href: '/', label: 'ホーム' },
                  { href: '/category/ai-tech', label: 'AI & Tech' },
                  { href: '/category/smart-home', label: 'Smart Home' },
                  { href: '/search', label: '記事を検索' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-md">
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
                    <Link href={link.href} className="text-sm text-slate-300 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-md">
              ニュースレター
            </h3>
            <p className="text-sm text-slate-400 mb-md leading-relaxed">
              最新のテクノロジーニュースを定期配信。
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-container mx-auto px-md py-lg flex flex-col sm:flex-row justify-between items-center gap-sm">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Smart Kurashi. All rights reserved.
          </p>
          <nav aria-label="法的リンク">
            <ul className="flex items-center gap-md">
              <li>
                <Link href="/privacy" className="text-xs text-slate-500 hover:text-accent transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-slate-500 hover:text-accent transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-xs text-slate-500 hover:text-accent transition-colors">
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
