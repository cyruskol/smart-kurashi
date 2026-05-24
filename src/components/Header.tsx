'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'ALL' },
  { href: '/category/ai-tech', label: 'AI&Tech', color: '#5B5246' },
  { href: '/category/smart-home', label: 'Appliances & Gadgets', color: '#4F6F5D' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Main header */}
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
              <Image
                src="/logo.png"
                alt="Smart Kurashi"
                width={32}
                height={32}
                style={{ borderRadius: '8px' }}
                priority
              />
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#292524' }}>
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
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background: isActive
                        ? (hasColor ? '#EFE8DD' : '#E7EFEA')
                        : 'transparent',
                      color: isActive
                        ? (hasColor ? item.color : '#4F6F5D')
                        : '#57514C',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
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
            <nav className="md:hidden pb-4 pt-2 border-t border-[#E7E5E4]" aria-label="モバイルナビゲーション">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-2 px-4 rounded-lg text-sm font-medium"
                        style={{
                          background: isActive ? '#EFE8DD' : 'transparent',
                          color: isActive ? '#4F6F5D' : '#57514C',
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
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

      {/* Category sub-nav bar — desktop only */}
      <div className="hidden md:block" style={{ background: '#FAFAF9', borderBottom: '1px solid #E7E5E4' }}>
        <div className="max-w-container mx-auto px-md">
          <div className="flex items-center gap-sm py-2">
            <Link href="/category/ai-tech" className="px-3 py-1.5 text-xs font-semibold transition-colors" style={{ borderRadius: '8px', background: '#EFE8DD', color: '#6D6254' }}>
              AI&Tech
            </Link>
            <Link href="/category/smart-home" className="px-3 py-1.5 text-xs font-semibold transition-colors" style={{ borderRadius: '8px', background: '#E7EFEA', color: '#4F6F5D' }}>
              Appliances &amp; Gadgets
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
