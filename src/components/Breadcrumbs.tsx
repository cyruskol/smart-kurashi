import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" style={{ marginBottom: '24px', paddingTop: '8px' }}>
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flexWrap: 'wrap',
          }}
        >
          {items.map((item, index) => (
            <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {index > 0 && (
                <span style={{ color: '#64748B', fontSize: '12px' }}>/</span>
              )}
              {index < items.length - 1 ? (
                <Link
                  href={item.href}
                  style={{ color: '#64748B', textDecoration: 'none' }}
                  className="hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: '#475569', fontWeight: 500 }}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
