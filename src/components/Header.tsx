'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/category/ai-tech', label: 'AI & Tech' },
  { href: '/category/smart-home', label: 'Smart Home' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-container mx-auto px-md flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
          Smart Kurashi
        </Link>

        <nav className="flex items-center gap-lg">
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
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
