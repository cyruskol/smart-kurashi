import Link from 'next/link';

const navItems = [
  { href: '/', label: 'すべて' },
  { href: '/category/ai-tech', label: 'AI・テック' },
  { href: '/category/smart-home', label: '家電・ガジェット' },
];

// Category mapping for header buttons
const categoryHeaderItems = [
  { slug: 'ai-tech', displayLabel: 'AI & Tech' },
  { slug: 'smart-home', displayLabel: 'Smart Home' },
];

export default function Header() {
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

            {/* Category Buttons — rendered server-side, active state via CSS */}
            <nav className="flex items-center flex-wrap justify-end" style={{ gap: '11px' }} aria-label="メインナビゲーション">
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
          </div>
        </div>
      </header>
    </>
  );
}
