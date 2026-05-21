import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  'ai-tech': { label: 'AI & Tech', color: 'cat-ai' },
  'smart-home': { label: 'Smart Home', color: 'cat-smart' },
  'article': { label: '記事', color: 'accent' },
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

  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  const config = categoryConfig[post.category] || categoryConfig['article'];
  const categoryHref = `/category/${post.category === 'ai-tech' ? 'ai-tech' : post.category === 'smart-home' ? 'smart-home' : post.category}`;

  const allPosts = getAllPosts();
  const tagCounts: Record<string, number> = {};
  allPosts.forEach((p) => p.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const popularTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([t]) => t);
  const recentPosts = allPosts.filter(p => p.slug !== slug).slice(0, 5);

  return (
    <main className="py-section bg-neutral">
      <div className="max-w-container mx-auto px-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Article content */}
          <article className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav aria-label="パンくずリスト" className="mb-lg">
              <ol className="flex items-center gap-sm text-sm flex-wrap">
                <li><a href="/" className="text-text-muted hover:text-accent transition-colors">ホーム</a></li>
                <li className="text-text-muted">/</li>
                <li><a href={categoryHref} className="text-text-muted hover:text-accent transition-colors">{config.label}</a></li>
                <li className="text-text-muted">/</li>
                <li className="text-text-secondary truncate max-w-[200px]" aria-current="page">{post.title}</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-xl">
              <div className="flex items-center gap-sm mb-md">
                <a href={categoryHref} className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-${config.color}-light text-${config.color}`} style={{ backgroundColor: `var(--color-${config.color}-light)`, color: `var(--color-${config.color})` }}>
                  {config.label}
                </a>
                <time className="text-sm text-text-muted tracking-wide">{formattedDate}</time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary leading-[1.1] tracking-tighter mb-md">
                {post.title}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">{post.excerpt}</p>
              {post.source && <p className="text-sm text-text-muted mt-md">出典: {post.source}</p>}
            </header>

            <hr className="border-border mb-xl" />

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <footer className="mt-xl pt-lg border-t border-border">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-md">タグ</h3>
                <div className="flex flex-wrap gap-sm">
                  {post.tags.map((tag) => (
                    <a key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-neutral-warm text-text-secondary hover:bg-accent hover:text-white transition-colors">
                      {tag}
                    </a>
                  ))}
                </div>
              </footer>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Sidebar popularTags={popularTags} recentPosts={recentPosts} />
          </aside>
        </div>
      </div>
    </main>
  );
}
