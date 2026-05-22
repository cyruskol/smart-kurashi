import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrDisclaimer from '@/components/PrDisclaimer';
import Mokuji from '@/components/Mokuji';
import AuthorBox from '@/components/AuthorBox';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'ai-tech': { bg: '#EEF2FF', text: '#6366F1' },
  'smart-home': { bg: '#ECFDF5', text: '#10B981' },
  'article': { bg: '#FFF4F0', text: '#E8643A' },
};

const categoryLabels: Record<string, string> = {
  'ai-tech': 'AI & Tech',
  'smart-home': 'Smart Home',
  'article': '記事',
};

const categoryHrefs: Record<string, string> = {
  'ai-tech': '/category/ai-tech',
  'smart-home': '/category/smart-home',
  'article': '/',
};

// Default author — can be overridden per-post via frontmatter later
const defaultAuthor = {
  name: 'Smart Kurashi 編集部',
  avatarUrl: '',
  bio: 'スマートホーム・AI家電・IoT技術の専門メディア。製品レビュー、比較ガイド、業界動向の分析を得意とする。2020年より日本のスマートリビング分野の情報発信を行ってきた。',
  expertise: ['スマートホーム', 'AI家電', 'IoT', 'HEMS', '省エネ'],
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const cat = categoryColors[post.category] || categoryColors['article'];
  const categoryLabel = categoryLabels[post.category] || '記事';
  const categoryHref = categoryHrefs[post.category] || '/';

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 4);
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((p) => p.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Article-level JSON-LD (Article + NewsArticle schema)
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: defaultAuthor.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Smart Kurashi',
      logo: {
        '@type': 'ImageObject',
        url: 'https://smart-kurashi.jp/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://smart-kurashi.jp/posts/' + slug,
    },
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'ホーム', href: 'https://smart-kurashi.jp/' },
    { label: categoryLabel, href: `https://smart-kurashi.jp${categoryHref}` },
    { label: post.title, href: `https://smart-kurashi.jp/posts/${slug}` },
  ];

  return (
    <main style={{ background: '#F8FAFC', padding: '32px 0' }}>
      <Script
        id="jsonld-article"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <div className="max-w-container mx-auto px-md">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>

          {/* ===== ARTICLE ===== */}
          <article
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '40px',
              border: '1px solid #E2E8F0',
            }}
          >
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Header */}
            <header style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    padding: '4px 14px',
                    background: cat.bg,
                    color: cat.text,
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '9999px',
                  }}
                >
                  {categoryLabel}
                </span>
                <time style={{ fontSize: '13px', color: '#94A3B8' }}>{formattedDate}</time>
                {post.source && (
                  <span style={{ fontSize: '13px', color: '#94A3B8' }}>• {post.source}</span>
                )}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                {post.title}
              </h1>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7 }}>
                {post.excerpt}
              </p>
            </header>

            {/* PR Disclaimer — right below H1 */}
            <PrDisclaimer />

            <hr
              style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '0 0 24px 0' }}
            />

            {/* Table of Contents — after intro paragraph */}
            <Mokuji content={post.content} />

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote
                source={post.content}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <footer
                style={{
                  marginTop: '40px',
                  paddingTop: '24px',
                  borderTop: '1px solid #E2E8F0',
                }}
              >
                <h3
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '12px',
                  }}
                >
                  タグ
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      style={{
                        padding: '4px 14px',
                        background: '#F1F5F9',
                        color: '#475569',
                        fontSize: '12px',
                        fontWeight: 500,
                        borderRadius: '9999px',
                        textDecoration: 'none',
                      }}
                      className="hover:bg-orange-100 hover:text-orange-600"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </footer>
            )}

            {/* Author Trust Box (E-E-A-T) */}
            <AuthorBox
              name={defaultAuthor.name}
              avatarUrl={defaultAuthor.avatarUrl || undefined}
              bio={defaultAuthor.bio}
              expertise={defaultAuthor.expertise}
            />
          </article>

          {/* ===== SIDEBAR ===== */}
          <aside>
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '16px',
                  }}
                >
                  📖 関連記事
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedPosts.map((rp) => (
                    <li
                      key={rp.slug}
                      style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}
                    >
                      <Link href={`/posts/${rp.slug}`} style={{ textDecoration: 'none' }}>
                        <h4
                          style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#0F172A',
                            lineHeight: 1.5,
                            marginBottom: '4px',
                          }}
                          className="hover:text-orange-500"
                        >
                          {rp.title}
                        </h4>
                        <time style={{ fontSize: '11px', color: '#94A3B8' }}>
                          {new Date(rp.date).toLocaleDateString('ja-JP', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Popular Tags */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0F172A',
                  marginBottom: '12px',
                }}
              >
                🏷️ 人気タグ
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    style={{
                      padding: '4px 12px',
                      background: '#F1F5F9',
                      color: '#475569',
                      fontSize: '12px',
                      fontWeight: 500,
                      borderRadius: '9999px',
                      textDecoration: 'none',
                    }}
                    className="hover:bg-orange-100 hover:text-orange-600"
                  >
                    {tag}{' '}
                    <span style={{ color: '#94A3A8', fontSize: '10px' }}>({count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to top */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                borderRadius: '12px',
                padding: '24px',
                color: '#fff',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '12px' }}>
                もっと記事を読む
              </p>
              <Link
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#E8643A',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: '8px',
                  fontSize: '13px',
                  textDecoration: 'none',
                }}
              >
                ホームに戻る →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
