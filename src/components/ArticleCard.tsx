import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface ArticleCardProps {
  post: Post;
  variant?: 'default' | 'featured';
}

const categoryLabels: Record<string, string> = {
  'ai-tech': 'AI & Tech',
  'smart-home': 'Smart Home',
  'article': '記事',
};

export default function ArticleCard({ post, variant = 'default' }: ArticleCardProps) {
  const categoryLabel = categoryLabels[post.category] || post.category;
  const categorySlug = post.category === 'ai-tech' ? 'ai-tech' : post.category === 'smart-home' ? 'smart-home' : post.category;
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'featured') {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="bg-surface rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1">
          {post.image && (
            <div className="aspect-[16/9] bg-neutral-warm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-lg md:p-xl">
            <div className="flex items-center gap-sm mb-md">
              <Link
                href={`/category/${categorySlug}`}
                className="tag-accent inline-block text-xs font-semibold px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-colors"
              >
                {categoryLabel}
              </Link>
              <time className="text-xs text-text-muted tracking-wide">{formattedDate}</time>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary leading-snug mb-sm group-hover:text-accent transition-colors tracking-tight">
              {post.title}
            </h2>
            <p className="text-base text-text-secondary leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            {post.source && (
              <p className="text-xs text-text-muted mt-md">出典: {post.source}</p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-surface rounded-lg border border-border p-md transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-0.5 h-full flex flex-col">
        <div className="flex items-center gap-sm mb-sm">
          <Link
            href={`/category/${categorySlug}`}
            className="tag-accent inline-block text-xs font-semibold px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-colors"
          >
            {categoryLabel}
          </Link>
          <time className="text-xs text-text-muted tracking-wide">{formattedDate}</time>
        </div>
        <h3 className="text-base font-semibold text-primary leading-snug mb-sm group-hover:text-accent transition-colors tracking-snug flex-grow">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-md">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-xs mt-auto">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="tag inline-block text-xs font-medium px-2.5 py-0.5 rounded-full"
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
