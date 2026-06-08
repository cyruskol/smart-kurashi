'use client';

import Link from 'next/link';
import { useState } from 'react';

const headerItems = [
  { href: '/category/ai-tech', label: 'AI・テック' },
  { href: '/category/smart-home', label: '家電・ガジェット' },
  { href: '/products', label: '商品を探す' },
  { href: '/compare', label: '比較・ランキング' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #E7E5E4',
        }}
        role="banner"
      >
        <div
          className="max-w-container mx-auto px-md"
          style={{
            paddingTop: '14px',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '16px',
          }}
        >
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', flex: '0 0 auto', textDecoration: 'none' }}
            aria-label="Smart Kurashi ホーム"
          >
            <img
              src="/logo.png"
              alt="Smart Kurashi"
              width={180}
              height={180}
              style={{ width: 'clamp(120px, 18vw, 180px)', height: 'auto', display: 'block' }}
            />
          </Link>

          <nav
            className="header-desktop-nav"
            aria-label="メインナビゲーション"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginLeft: 'auto',
              justifyContent: 'flex-end',
            }}
          >
            {headerItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '40px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  border: '1px solid #DDD8D1',
                  color: '#4A433F',
                  background: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className={`mobile-nav-trigger ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(true)}
            aria-label="メニューを開く"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            style={{ marginLeft: 'auto' }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {mobileOpen && <div className="drawer-overlay" onClick={() => setMobileOpen(false)} />}

      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="drawer open"
          role="dialog"
          aria-modal="true"
          aria-label="モバイルメニュー"
        >
          <div className="drawer-header">
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#292524' }}>メニュー</span>
            <button className="drawer-close" onClick={() => setMobileOpen(false)} aria-label="メニューを閉じる">
              ×
            </button>
          </div>
          <nav className="drawer-nav" aria-label="モバイルナビゲーション">
            {headerItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/reviews" onClick={() => setMobileOpen(false)}>
              レビュー一覧
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              運営情報
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              お問い合わせ
            </Link>
            <Link href="/privacy" onClick={() => setMobileOpen(false)}>
              プライバシーポリシー
            </Link>
            <Link href="/terms" onClick={() => setMobileOpen(false)}>
              利用規約
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
