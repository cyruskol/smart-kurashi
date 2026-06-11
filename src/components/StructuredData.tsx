import type { Metadata } from 'next';

export interface StructuredDataProps {
  title?: string;
  description?: string;
  type?: 'NewsArticle' | 'WebPage' | 'Website' | 'Organization';
}

/**
 * Reusable structured data component for SEO
 * Supports NewsArticle, WebSite, Organization schemas
 */
export default function StructuredData({ title, description = '', type = 'NewsArticle' }: StructuredDataProps) {
  const siteUrl = 'https://smart-kurashi.jp';
  
  let schema: any = {};

  if (type === 'NewsArticle') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: title,
      description,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'スマートくらし 編集部',
      },
      publisher: {
        '@type': 'Organization',
        name: 'スマートくらし',
        logo: {
          '@type': 'ImageObject',
          url: siteUrl + '/logo.png',
          width: 128,
          height: 128,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/`,
      },
    };
  } else if (type === 'Website') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'スマートくらし',
      url: siteUrl,
      description,
      inLanguage: 'ja-JP',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  } else if (type === 'Organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'スマートくらし',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: siteUrl + '/logo.png',
        width: 128,
        height: 128,
      },
      description,
      sameAs: [
        'https://twitter.com/smartkurashi',
        'https://instagram.com/smartkurashi',
      ],
    };
  } else if (type === 'WebPage') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: `${siteUrl}/${title?.toLowerCase().replace(/\s+/g, '-') || ''}`,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}