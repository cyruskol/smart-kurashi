'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

export default function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Parse H2/H3 from the rendered content area
    const container = document.querySelector('.prose');
    if (!container) return;

    const headings = container.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      const tag = heading.tagName.toLowerCase() as 'h2' | 'h3';
      const text = heading.textContent || '';
      // Generate or use existing id
      const id = heading.id || `mokuji-${index}`;
      if (!heading.id) heading.id = id;

      tocItems.push({ id, text, level: tag });
    });

    setItems(tocItems);
  }, [content]);

  if (items.length < 2) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '32px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px',
          paddingBottom: '12px',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <span style={{ fontSize: '16px' }}>📋</span>
        <span
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#0F172A',
            letterSpacing: '-0.01em',
          }}
        >
          目次
        </span>
      </div>
      <nav aria-label="記事の目次">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                padding: item.level === 'h2' ? '8px 0 8px 0' : '6px 0 6px 20px',
                borderBottom: item.level === 'h2' ? '1px solid #F1F5F9' : 'none',
              }}
            >
              <button
                onClick={() => scrollTo(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: item.level === 'h2' ? '14px' : '13px',
                  fontWeight: item.level === 'h2' ? 600 : 400,
                  color: item.level === 'h2' ? '#0F172A' : '#475569',
                  cursor: 'pointer',
                  textAlign: 'left',
                  lineHeight: 1.5,
                  width: '100%',
                }}
                className="hover:text-orange-500 transition-colors"
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: item.level === 'h2' ? '#E8643A' : '#CBD5E1',
                    marginRight: '10px',
                    flexShrink: 0,
                  }}
                />
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
