import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface ArticleCardProps {
  post: Post;
  variant?: 'default' | 'featured';
}

const categoryLabels: Record<string, string> = {
  'ai-tech': 'AI & Tech',
  'smart-home': 'Smart Home',
};

const categorySlugMap: Record<string, string> = {
  'ai-tech': 'ai-tech',
  'smart-home': 'smart-home',
};

export default function ArticleCard({ post, variant = 'default' }: ArticleCardProps) {
  const categorySlug = categorySlugMap[post.category] || post.category;
  const categoryLabel = categoryLabels[post.category] || post.category;
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'featured') {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="bg-surface rounded-lg border border-border overflow-hidden transition-all hover:border-accent hover:shadow-lg">
          {post.image && (
            <div className="aspect-video bg-surface-alt overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-lg">
            <div className="flex items-center gap-sm mb-sm">
              <Link
                href={`/category/${categorySlug}`}
                className="inline-block text-xs font-medium text-accent bg-surface-alt px-3 py-1 rounded-sm hover:bg-accent hover:text-white transition-colors"
              >
                {categoryLabel}
              </Link>
              <time className="text-xs text-text-muted">{formattedDate}</time>
            </div>
            <h2 className="text-xl font-bold text-primary leading-tight mb-sm group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-text-secondary line-clamp-2">{post.excerpt}</p>
            {post.source && (
              <p className="text-xs text-text-muted mt-sm">出典: {post.source}</p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-surface rounded-lg border border-border p-md transition-all hover:border-accent hover:shadow-md">
        <div className="flex items-center gap-sm mb-sm">
          <Link
            href={`/category/${categorySlug}`}
            className="inline-block text-xs font-medium text-accent bg-surface-alt px-3 py-1 rounded-sm hover:bg-accent hover:text-white transition-colors"
          >
            {categoryLabel}
          </Link>
          <time className="text-xs text-text-muted">{formattedDate}</time>
        </div>
        <h3 className="text-base font-semibold text-primary leading-snug mb-xs group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-xs mt-sm">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-text-muted bg-surface-alt px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
