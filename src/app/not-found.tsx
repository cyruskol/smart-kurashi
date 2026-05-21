import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="py-section min-h-[60vh] flex items-center justify-center">
      <div className="max-w-content mx-auto px-md text-center">
        <h1 className="text-6xl font-bold text-primary mb-md">404</h1>
        <h2 className="text-2xl font-bold text-primary mb-md">
          ページが見つかりません
        </h2>
        <p className="text-text-secondary text-lg mb-xl leading-relaxed">
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block px-xl py-sm bg-accent text-white font-medium rounded-md hover:bg-accent-hover transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
