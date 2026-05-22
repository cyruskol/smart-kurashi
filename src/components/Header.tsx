'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'ホーム', icon: '🏠' },
  { href: '/category/ai-tech', label: 'AI & Tech', color: '#6366F1' },
  { href: '/category/smart-home', label: 'Smart Home', color: '#10B981' },
  { href: '/search', label: '検索', icon: '🔍' },
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
    <>
      {/* Top utility bar */}
      <div style={{ background: '#0F172A', color: '#94A3B8', fontSize: '12px' }}>
        <div className="max-w-container mx-auto px-md flex items-center justify-between" style={{ height: '32px' }}>
          <span>🏠 スマートホーム・AI家電の最新ニュース</span>
          <div className="flex items-center gap-md">
            <Link href="/about" style={{ color: '#94A3B8' }} className="hover:text-white transition-colors">会社概要</Link>
            <Link href="/contact" style={{ color: '#94A3B8' }} className="hover:text-white transition-colors">お問い合わせ</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease',
        }}
        role="banner"
      >
        <div className="max-w-container mx-auto px-md">
          <div className="flex items-center justify-between" style={{ height: '60px' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-sm" aria-label="Smart Kurashi ホーム">
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #E8643A, #D05530)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>SK</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>
                Smart Kurashi
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-xs" aria-label="メインナビゲーション">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const hasColor = !!item.color;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: isActive
                        ? (hasColor ? `${item.color}15` : '#FFF4F0')
                        : 'transparent',
                      color: isActive
                        ? (hasColor ? item.color : '#E8643A')
                        : '#475569',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.icon && <span className="mr-1">{item.icon}</span>}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
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

          {/* Mobile Nav */}
          {mobileOpen && (
            <nav className="md:hidden pb-4 pt-2 border-t border-slate-200" aria-label="モバイルナビゲーション">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-2 px-4 rounded-lg text-sm font-medium"
                        style={{
                          background: isActive ? '#FFF4F0' : 'transparent',
                          color: isActive ? '#E8643A' : '#475569',
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Category sub-nav bar */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-container mx-auto px-md">
          <div className="flex items-center gap-sm overflow-x-auto py-2" style={{ scrollbarWidth: 'none' }}>
            <Link href="/search" className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0">
              🔍 検索
            </Link>
            <Link href="/category/ai-tech" className="px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors" style={{ background: '#EEF2FF', color: '#6366F1' }}>
              🤖 AI & Tech
            </Link>
            <Link href="/category/smart-home" className="px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors" style={{ background: '#ECFDF5', color: '#10B981' }}>
              🏠 Smart Home
            </Link>
            <Link href="/category/ai-tech" className="px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors" style={{ background: '#FFFBEB', color: '#F59E0B' }}>
              📡 IoT
            </Link>
            <Link href="/category/smart-home" className="px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors" style={{ background: '#FEF2F2', color: '#EF4444' }}>
              🔒 セキュリティ
            </Link>
            <Link href="/category/smart-home" className="px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors" style={{ background: '#ECFEFF', color: '#06B6D4' }}>
              ⚡ 省エネ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
