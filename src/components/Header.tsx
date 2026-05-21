'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/category/ai-tech', label: 'AI & Tech' },
  { href: '/category/smart-home', label: 'Smart Home' },
  { href: '/about', label: '会社概要' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border" role="banner">
      <div className="max-w-container mx-auto px-md flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
          Smart Kurashi
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-lg" aria-label="メインナビゲーション">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-accent font-semibold'
                    : 'text-text-secondary hover:text-primary'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="メニューを開く"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-surface border-t border-border" aria-label="モバイルナビゲーション">
          <ul className="px-md py-sm space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-sm text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent font-semibold'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
