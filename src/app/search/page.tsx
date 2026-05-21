import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `「${q}」の検索結果` : '検索',
    description: q ? `「${q}」に関する記事を検索` : 'Smart Kurashiの記事を検索',
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  
  const results = q
    ? allPosts.filter((post) => {
        const searchLower = q.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          post.category.toLowerCase().includes(searchLower)
        );
      })
    : [];

  // Collect all unique tags for tag cloud
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const allTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);

  return (
    <main className="py-section bg-neutral">
      <div className="max-w-container mx-auto px-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Search form */}
            <div className="bg-surface rounded-xl border border-border p-lg mb-lg">
              <form action="/search" method="GET" className="relative">
                <input
                  type="search"
                  name="q"
                  defaultValue={q || ''}
                  placeholder="記事を検索...（キーワード、タグ名など）"
                  className="w-full px-md py-sm.5 pr-12 border border-border rounded-lg bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-text-muted hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Results */}
            {q && (
              <>
                <p className="text-sm text-text-secondary mb-lg">
                  {results.length > 0 ? (
                    <>「{q}」の検索結果: {results.length}件</>
                  ) : (
                    <>「{q}」に一致する記事が見つかりませんでした。</>
                  )}
                </p>
                {results.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    {results.map((post) => (
                      <ArticleCard key={post.slug} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}

            {!q && (
              <div className="text-center py-xl">
                <svg className="w-16 h-16 text-text-muted mx-auto mb-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h2 className="text-xl font-bold text-primary mb-sm">記事を検索</h2>
                <p className="text-text-secondary">キーワードを入力して記事を検索できます。</p>
              </div>
            )}
          </div>

          {/* Sidebar — Tag cloud */}
          <aside className="lg:col-span-1">
            <div className="bg-surface rounded-xl border border-border p-lg sticky top-24">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-md">タグで検索</h3>
              <div className="flex flex-wrap gap-sm">
                {allTags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      q === tag
                        ? 'bg-accent text-white'
                        : 'bg-neutral-warm text-text-secondary hover:bg-accent hover:text-white'
                    }`}
                  >
                    {tag}
                    <span className="ml-1 opacity-60">({count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
