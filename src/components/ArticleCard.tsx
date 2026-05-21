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
        <article className="card-featured card-glow-accent card-image-zoom relative overflow-hidden border border-border bg-surface">
          {post.image && (
            <div className="aspect-[16/9] bg-neutral-warm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="relative z-[2] p-lg md:p-xl">
            <div className="flex items-center gap-sm mb-md">
              <Link
                href={`/category/${categorySlug}`}
                className="relative z-[3] inline-block text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent/[0.07] text-accent border border-accent/10 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
              >
                {categoryLabel}
              </Link>
              <time className="text-xs text-text-muted tracking-wide font-medium">{formattedDate}</time>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary leading-[1.1] mb-sm group-hover:text-accent transition-colors duration-300 tracking-tight">
              {post.title}
            </h2>
            <p className="text-base text-text-secondary leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            {post.source && (
              <p className="text-xs text-text-muted mt-md font-medium">出典: {post.source}</p>
            )}
            {/* Read more indicator */}
            <div className="mt-lg flex items-center gap-2 text-sm font-semibold text-accent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span>続きを読む</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <article className="card-base card-glow-accent relative h-full flex flex-col overflow-hidden">
        <div className="relative z-[2] p-md flex flex-col flex-grow">
          <div className="flex items-center gap-sm mb-sm">
            <Link
              href={`/category/${categorySlug}`}
              className="relative z-[3] inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-accent/[0.07] text-accent border border-accent/10 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            >
              {categoryLabel}
            </Link>
            <time className="text-[11px] text-text-muted tracking-wide font-medium">{formattedDate}</time>
          </div>
          <h3 className="text-[15px] font-semibold text-primary leading-snug mb-sm group-hover:text-accent transition-colors duration-300 tracking-snug flex-grow">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-md">
            {post.excerpt}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-xs mt-auto pt-sm border-t border-border-light">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-warm text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
