'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MobileNavDrawerProps {
  triggerId?: string;
}

/**
 * Mobile hamburger menu drawer for category navigation
 * Replaces desktop category buttons on mobile devices
 */
export default function MobileNavDrawer({ triggerId = 'mobile-nav-trigger' }: MobileNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="drawer-overlay" onClick={toggleDrawer} />}
      
      {/* Drawer Panel */}
      <div className={`drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="メニュー">
        <header className="drawer-header">
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#3F3A36' }}>Smart Kurashi メニュー</span>
          <button 
            className="drawer-close" 
            onClick={toggleDrawer}
            aria-label="メニューを閉じる"
          >
            ×
          </button>
        </header>

        <nav className="drawer-nav">
          <Link href="/" onClick={toggleDrawer}>
            ホームへ戻る
          </Link>
          
          <Link href="/category/ai-tech" onClick={toggleDrawer}>
            AI・テック
          </Link>
          
          <Link href="/category/smart-home" onClick={toggleDrawer}>
            家電・ガジェット
          </Link>

          <Link href="/about" onClick={toggleDrawer}>
            会社概要
          </Link>

          <Link href="/contact" onClick={toggleDrawer}>
            お問い合わせ
          </Link>

          <Link href="/privacy" onClick={toggleDrawer}>
            プライバシーポリシー
          </Link>

          <Link href="/terms" onClick={toggleDrawer}>
            利用規約
          </Link>
        </nav>
      </div>

      {/* Mobile Nav Trigger - shown only on mobile */}
      <button
        className="mobile-nav-trigger desktop-category-nav"
        id={triggerId}
        onClick={toggleDrawer}
        aria-label="メニューを開く"
        style={{
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '32px',
          height: '24px',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ display: 'block', width: '100%', height: '2px', background: '#3F3A36', transition: 'all 0.3s ease' }}></span>
        <span style={{ display: 'block', width: '100%', height: '2px', background: '#3F3A36', transition: 'all 0.3s ease' }}></span>
        <span style={{ display: 'block', width: '100%', height: '2px', background: '#3F3A36', transition: 'all 0.3s ease' }}></span>
      </button>
    </>
  );
}