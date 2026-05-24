'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'すべて' },
  { href: '/category/ai-tech', label: 'AI・テック' },
  { href: '/category/smart-home', label: '家電・ガジェット' },
];

export default function Header() {
  const pathname = usePathname();

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

            {/* Category Buttons (always visible) */}
            <nav className="flex items-center flex-wrap justify-end" style={{ gap: '11px' }} aria-label="メインナビゲーション">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="japandi-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border"
                    style={{
                      borderColor: isActive ? '#A9A39B' : '#DDD8D1',
                      color: isActive ? '#57514C' : '#726B65',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

        </div>
      </header>

    </>
  );
}
