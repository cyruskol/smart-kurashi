import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';
import AuthorProfile from '@/components/AuthorProfile';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'ai-tech': { bg: '#EEF2FF', text: '#4338CA' },
  'smart-home': { bg: '#ECFDF5', text: '#047857' },
  'article': { bg: '#FFF4F0', text: '#A9582D' },
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
  bio: 'スマートホーム愛好家として 50 台以上の IoT 製品を自宅でテストしてきた実務経験を持つ。HEMS、音声アシスタント、スマートロック、カメラセンサーなど、住まいに関わるあらゆる IoT 機器の導入・運用・比較評価を専門とする。',
  expertise: ['スマートホーム', 'IoT', 'HEMS', '音声アシスタント', 'AI 家電'],
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  
  // Dynamic OG image for posts - will be replaced with actual images later
  const ogImageStyle = {
    url: '/og-post-placeholder.png',
    width: 1200,
    height: 630,
    alt: post.title.slice(0, 70) + '...',
  };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { 
      title: post.title, 
      description: post.excerpt, 
      type: 'article',
      images: [ogImageStyle],
    },
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
  
  // Popular tags
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((p) => p.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'ホーム', href: 'https://smart-kurashi.jp/' },
    { label: post.category === 'ai-tech' ? 'AI & Tech' : 'スマート家電', href: `https://smart-kurashi.jp${categoryHref}` },
    { label: post.title, href: `https://smart-kurashi.jp/posts/${slug}` },
  ];

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
      '@id': `https://smart-kurashi.jp/posts/${slug}`,
    },
  };

  return (
    <main style={{ background: '#F8FAFC', padding: '32px 0' }}>
      <div className="max-w-container mx-auto px-md">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>

          {/* ===== ARTICLE ===== */}
          <article
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '40px',
              border: '1px solid #E7E5E4',
            }}
          >
            {/* Breadcrumbs with JSON-LD */}
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
                    fontWeight: 600,
                    borderRadius: '8px',
                  }}
                >
                  {categoryLabel}
                </span>
                <time style={{ fontSize: '13px', color: '#5A534E' }}>{formattedDate}</time>
              </div>
              <h1
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 600,
                  color: '#292524',
                  lineHeight: 1.2,
                  letterSpacing: '',
                  marginBottom: '16px',
                }}
              >
                {post.title}
              </h1>
              <p style={{ fontSize: '18px', color: '#4A433F', lineHeight: 1.7 }}>
                {post.excerpt}
              </p>
            </header>

            <hr
              style={{ border: 'none', borderTop: '1px solid #E7E5E4', margin: '0 0 24px 0' }}
            />

            {/* Table of Contents — after intro paragraph */}
            <TableOfContents content={post.content} />

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
                  borderTop: '1px solid #E7E5E4',
                }}
              >
                <h3
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#5A534E',
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
                        color: '#6B6560',
                        fontSize: '12px',
                        fontWeight: 500,
                        borderRadius: '8px',
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
            <AuthorProfile
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
                  border: '1px solid #E7E5E4',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#292524',
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
                            color: '#292524',
                            lineHeight: 1.5,
                            marginBottom: '4px',
                          }}
                          className="hover:text-orange-500"
                        >
                          {rp.title}
                        </h4>
                        <time style={{ fontSize: '11px', color: '#5A534E' }}>
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
                border: '1px solid #E7E5E4',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#292524',
                  marginBottom: '12px',
                }}
              >
                人気タグ
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    style={{
                      padding: '4px 12px',
                      background: '#F1F5F9',
                      color: '#6B6560',
                      fontSize: '12px',
                      fontWeight: 500,
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                    className="hover:bg-orange-100 hover:text-orange-600"
                  >
                    {tag}{' '}
                    <span style={{ color: '#6B6560', fontSize: '10px' }}>({count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to top */}
            <div
              style={{
                background: '#A9582D',
                borderRadius: '8px',
                padding: '24px',
                color: '#fff',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '14px', color: '#fff', marginBottom: '12px' }}>
                もっと記事を読む
              </p>
              <Link
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#FFFFFF',
                  color: '#A9582D',
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