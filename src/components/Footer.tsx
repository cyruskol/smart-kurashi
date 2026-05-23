import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white hidden sm:block" role="contentinfo">
      {/* Main Footer — 2 columns on desktop */}
      <div className="max-w-container mx-auto px-md py-section">
        <div className="grid grid-cols-2 gap-xl">
          {/* Content Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-md">
              コンテンツ
            </h3>
            <nav aria-label="コンテンツナビゲーション">
              <ul className="space-y-sm">
                <li><Link href="/" className="text-sm text-slate-300 hover:text-accent transition-colors">ホーム</Link></li>
                <li><Link href="/category/ai-tech" className="text-sm text-slate-300 hover:text-accent transition-colors">AI&テック</Link></li>
                <li><Link href="/category/smart-home" className="text-sm text-slate-300 hover:text-accent transition-colors">スマートホーム</Link></li>
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
                <li><Link href="/about" className="text-sm text-slate-300 hover:text-accent transition-colors">会社概要</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-300 hover:text-accent transition-colors">お問い合わせ</Link></li>
                <li><Link href="/privacy" className="text-sm text-slate-300 hover:text-accent transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/terms" className="text-sm text-slate-300 hover:text-accent transition-colors">利用規約</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-container mx-auto px-md py-lg flex justify-between items-center gap-sm">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Smart Kurashi. All rights reserved.
          </p>
          <nav aria-label="法的リンク">
            <ul className="flex items-center gap-md">
              <li><Link href="/privacy" className="text-xs text-slate-500 hover:text-accent transition-colors">プライバシーポリシー</Link></li>
              <li><Link href="/terms" className="text-xs text-slate-500 hover:text-accent transition-colors">利用規約</Link></li>
              <li><a href="/sitemap.xml" className="text-xs text-slate-500 hover:text-accent transition-colors">サイトマップ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
