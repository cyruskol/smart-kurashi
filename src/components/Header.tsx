'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'すべて' },
  { href: '/category/ai-tech', label: 'AI・テック' },
  { href: '/category/smart-home', label: '家電・ガジェット' },
];

const categoryHeaderItems = [
  { slug: 'ai-tech', displayLabel: 'AI & Tech' },
  { slug: 'smart-home', displayLabel: 'Smart Home' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'static',
          background: '#fff',
          borderBottom: '1px solid #E7E5E4',
        }}
        role="banner"
      >
        <div className="max-w-container mx-auto px-md">
          <div className="flex items-center justify-between" style={{ height: '56px' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-sm">
              <img
                src="/logo.png"
                alt="Smart Kurashi"
                width={32}
                height={32}
                style={{ borderRadius: '8px', height: 'auto' }}
              />
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#292524' }}>
                Smart Kurashi
              </span>
            </Link>

            {/* Desktop Category Buttons */}
            <nav className="flex items-center flex-wrap justify-end header-desktop-nav" style={{ gap: '11px' }} aria-label="メインナビゲーション">
              {categoryHeaderItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="japandi-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border"
                  style={{
                    borderColor: '#DDD8D1',
                    color: '#726B65',
                  }}
                >
                  {item.displayLabel}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="mobile-nav-trigger"
              onClick={() => setMobileOpen(true)}
              aria-label="メニューを開く"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="drawer-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={`drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#292524' }}>メニュー</span>
          <button
            className="drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="メニューを閉じる"
          >
            ×
          </button>
        </div>
        <nav className="drawer-nav" aria-label="モバイルナビゲーション">
          <Link href="/" onClick={() => setMobileOpen(false)}>ホーム</Link>
          <Link href="/category/ai-tech" onClick={() => setMobileOpen(false)}>AI・テック</Link>
          <Link href="/category/smart-home" onClick={() => setMobileOpen(false)}>家電・ガジェット</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>会社概要</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>お問い合わせ</Link>
          <Link href="/privacy" onClick={() => setMobileOpen(false)}>プライバシーポリシー</Link>
          <Link href="/terms" onClick={() => setMobileOpen(false)}>利用規約</Link>
        </nav>
      </div>
    </>
  );
}
