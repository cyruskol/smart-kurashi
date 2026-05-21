import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-section">
      <div className="max-w-container mx-auto px-md py-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Smart Kurashi. All rights reserved.
          </div>

          <nav className="flex items-center gap-lg">
            <Link href="/" className="text-sm text-text-secondary hover:text-accent transition-colors">
              ホーム
            </Link>
            <Link href="/category/ai-tech" className="text-sm text-text-secondary hover:text-accent transition-colors">
              AI & Tech
            </Link>
            <Link href="/category/smart-home" className="text-sm text-text-secondary hover:text-accent transition-colors">
              Smart Home
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
