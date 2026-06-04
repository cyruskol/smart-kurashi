'use client';

import Link from 'next/link';
import { useState } from 'react';

const categoryHeaderItems = [
  { href: '/', displayLabel: '記事一覧' },
  { href: '/category/ai-tech', displayLabel: 'AI・テック' },
  { href: '/category/smart-home', displayLabel: '家電・ガジェット' },
  { href: '/privacy', displayLabel: 'プライバシー' },
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
          margin: 0,
          padding: 0,
        }}
        role="banner"
      >
        <div style={{ width: '100%', margin: 0, padding: 0, position: 'relative' }}>
          <div
            style={{
              minHeight: '168px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '16px',
              flexWrap: 'nowrap',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                flex: '0 0 auto',
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <img
                src="/logo.png"
                alt="Smart Kurashi"
                width={144}
                height={144}
                style={{ borderRadius: '24px', height: '144px', width: '144px', display: 'block' }}
              />
            </Link>

            {/* Desktop Category Buttons */}
            <nav
              className="header-desktop-nav"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'nowrap',
                flexShrink: 0,
                marginLeft: '20%',
              }}
              aria-label="メインナビゲーション"
            >
                {categoryHeaderItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '36px',
                      padding: '0 14px',
                      borderRadius: '999px',
                      border: '1px solid #DDD8D1',
                      color: '#57514C',
                      background: '#fff',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: 1,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.displayLabel}
                  </Link>
                ))}
              </nav>

            {/* Mobile Hamburger */}
            <button
              className={`mobile-nav-trigger ${mobileOpen ? 'active' : ''}`}
              onClick={() => setMobileOpen(true)}
              aria-label="メニューを開く"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
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
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="drawer open"
          role="dialog"
          aria-modal="true"
          aria-label="モバイルメニュー"
        >
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
      )}
    </>
  );
}
