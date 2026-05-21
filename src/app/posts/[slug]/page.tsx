import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  'ai-tech': 'AI & Tech',
  'smart-home': 'Smart Home',
  'article': '記事',
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const categoryLabel = categoryLabels[post.category] || post.category;
  const categoryHref = `/category/${post.category === 'ai-tech' ? 'ai-tech' : post.category === 'smart-home' ? 'smart-home' : post.category}`;

  return (
    <main className="py-section md:py-2xl bg-neutral">
      <article className="max-w-content mx-auto px-md">
        {/* Breadcrumb */}
        <nav aria-label="パンくずリスト" className="mb-lg">
          <ol className="flex items-center gap-sm text-sm">
            <li>
              <a href="/" className="text-text-muted hover:text-accent transition-colors">
                ホーム
              </a>
            </li>
            <li className="text-text-muted">/</li>
            <li>
              <a href={categoryHref} className="text-text-muted hover:text-accent transition-colors">
                {categoryLabel}
              </a>
            </li>
            <li className="text-text-muted">/</li>
            <li className="text-text-secondary truncate max-w-[200px]" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-xl">
          <div className="flex items-center gap-sm mb-md">
            <a
              href={categoryHref}
              className="tag-accent inline-block text-xs font-semibold px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              {categoryLabel}
            </a>
            <time className="text-sm text-text-muted tracking-wide">{formattedDate}</time>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary leading-[1.1] tracking-tighter mb-md">
            {post.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
          {post.source && (
            <p className="text-sm text-text-muted mt-md">出典: {post.source}</p>
          )}
        </header>

        {/* Divider */}
        <hr className="border-border mb-xl" />

        {/* MDX Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <footer className="mt-xl pt-lg border-t border-border">
            <div className="flex flex-wrap gap-sm">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag inline-block text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
