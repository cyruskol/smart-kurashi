import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="py-section min-h-[60vh] flex items-center justify-center">
      <div className="max-w-content mx-auto px-md text-center">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-sm">404</p>
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-md tracking-tighter">ページが見つかりません</h1>
        <p className="text-text-secondary text-lg mb-xl leading-relaxed max-w-md mx-auto">
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block px-xl py-md bg-accent text-white font-semibold rounded-md hover:bg-accent-hover transition-all shadow-sm hover:shadow-glow text-sm"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
