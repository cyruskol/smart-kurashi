'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const categories = [
  { href: '/category/ai-tech', label: 'AI & Tech', color: 'cat-ai' },
  { href: '/category/smart-home', label: 'Smart Home', color: 'cat-smart' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-xs">
        <div className="max-w-container mx-auto px-md flex items-center justify-between h-8">
          <div className="flex items-center gap-md">
            <span className="text-text-muted">スマートホーム・AI家電の最新ニュース</span>
          </div>
          <div className="flex items-center gap-md">
            <Link href="/about" className="text-text-muted hover:text-white transition-colors">会社概要</Link>
            <Link href="/contact" className="text-text-muted hover:text-white transition-colors">お問い合わせ</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-lg border-border shadow-sm'
            : 'bg-surface border-border-light'
        }`}
        role="banner"
      >
        <div className="max-w-container mx-auto px-md">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-sm" aria-label="Smart Kurashi ホーム">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <span className="text-xl font-bold text-primary tracking-tight hidden sm:block">
                Smart Kurashi
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-xs" aria-label="メインナビゲーション">
              <Link
                href="/"
                className={`px-md py-sm rounded-md text-sm font-medium transition-colors ${
                  pathname === '/' ? 'bg-accent-light text-accent' : 'text-text-secondary hover:text-primary hover:bg-neutral-warm'
                }`}
              >
                ホーム
              </Link>
              {categories.map((cat) => {
                const isActive = pathname === cat.href;
                return (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className={`px-md py-sm rounded-md text-sm font-medium transition-colors ${
                      isActive ? `bg-${cat.color}-light text-${cat.color}` : 'text-text-secondary hover:text-primary hover:bg-neutral-warm'
                    }`}
                    style={isActive ? { backgroundColor: `var(--color-${cat.color}-light)`, color: `var(--color-${cat.color})` } : {}}
                  >
                    {cat.label}
                  </Link>
                );
              })}
              <Link
                href="/about"
                className={`px-md py-sm rounded-md text-sm font-medium transition-colors ${
                  pathname === '/about' ? 'bg-accent-light text-accent' : 'text-text-secondary hover:text-primary hover:bg-neutral-warm'
                }`}
              >
                会社概要
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-sm">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-text-secondary hover:text-primary transition-colors rounded-md hover:bg-neutral-warm"
                aria-label="検索"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              {/* CTA */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex px-lg py-sm bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent-hover transition-all shadow-sm"
              >
                お問い合わせ
              </Link>

              {/* Mobile menu */}
              <button
                className="lg:hidden p-2 -mr-sm text-text-secondary hover:text-primary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label="メニュー"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-md animate-fade-in">
              <form action="/search" method="GET" className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="記事を検索..."
                  className="w-full px-md py-sm.5 pr-12 border border-border rounded-lg bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  autoFocus
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-text-muted hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-lg pt-sm border-t border-border-light animate-fade-in" aria-label="モバイルナビゲーション">
            <ul className="flex flex-col gap-xs px-md">
              <li>
                <Link href="/" className={`block py-sm px-md rounded-md text-sm font-medium ${pathname === '/' ? 'bg-accent-light text-accent' : 'text-text-secondary'}`} onClick={() => setMobileOpen(false)}>
                  ホーム
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className={`block py-sm px-md rounded-md text-sm font-medium ${pathname === cat.href ? 'text-accent' : 'text-text-secondary'}`} onClick={() => setMobileOpen(false)} style={pathname === cat.href ? { color: `var(--color-${cat.color})` } : {}}>
                    {cat.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/about" className="block py-sm px-md rounded-md text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>会社概要</Link></li>
              <li className="pt-sm"><Link href="/contact" className="block w-full text-center py-sm.5 px-lg bg-accent text-white text-sm font-semibold rounded-md" onClick={() => setMobileOpen(false)}>お問い合わせ</Link></li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
