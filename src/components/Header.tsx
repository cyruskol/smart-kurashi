'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/category/ai-tech', label: 'AI & Tech' },
  { href: '/category/smart-home', label: 'Smart Home' },
  { href: '/about', label: '会社概要' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-sm'
          : 'bg-surface'
      }`}
      role="banner"
    >
      <div className="max-w-container mx-auto px-md">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-primary tracking-tight hover:text-accent transition-colors"
            aria-label="Smart Kurashi ホーム"
          >
            Smart Kurashi
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-lg" aria-label="メインナビゲーション">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-sm px-lg py-sm bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent-hover transition-all shadow-sm hover:shadow-glow"
            >
              お問い合わせ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-sm text-text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'メニューを閉じる' : 'メニューを開く'}
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

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-lg pt-sm border-t border-border-light" aria-label="モバイルナビゲーション">
            <ul className="flex flex-col gap-xs">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-sm px-md rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-accent bg-neutral-warm'
                          : 'text-text-secondary hover:text-primary hover:bg-neutral-warm'
                      }`}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-sm px-md">
                <Link
                  href="/contact"
                  className="block w-full text-center py-sm px-lg bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent-hover transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
