import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface ArticleCardProps {
  post: Post;
  variant?: 'default' | 'featured';
}

const categoryConfig: Record<string, { label: string; color: string; bg: string; accent: string; icon: string }> = {
  'ai-tech': {
    label: 'AI & Tech',
    color: 'text-cat-ai',
    bg: 'bg-cat-ai-light',
    accent: '#6366F1',
    icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z',
  },
  'smart-home': {
    label: 'Smart Home',
    color: 'text-cat-smart',
    bg: 'bg-cat-smart-light',
    accent: '#10B981',
    icon: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  },
  'article': {
    label: '記事',
    color: 'text-accent',
    bg: 'bg-accent-light',
    accent: '#E8643A',
    icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  },
};

function getReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `約${minutes}分`;
}

export default function ArticleCard({ post, variant = 'default' }: ArticleCardProps) {
  const config = categoryConfig[post.category] || categoryConfig['article'];
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readTime = getReadTime(post.content);

  if (variant === 'featured') {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="relative bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-400 hover:shadow-card-hover hover:border-accent/25 hover:-translate-y-1.5">
          {/* Top accent gradient bar */}
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${config.accent}, ${config.accent}88)` }} />

          <div className="p-xl md:p-2xl">
            {/* Category + meta row */}
            <div className="flex items-center gap-md mb-lg">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                style={{ backgroundColor: `${config.accent}10`, color: config.accent }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
                </svg>
                {config.label}
              </span>
              <div className="flex items-center gap-xs text-xs text-text-muted">
                <time>{formattedDate}</time>
                <span>·</span>
                <span>{readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-primary leading-[1.1] mb-md group-hover:text-accent transition-colors duration-300 tracking-tight">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-base text-text-secondary leading-relaxed line-clamp-3 mb-lg">
              {post.excerpt}
            </p>

            {/* Bottom row: tags + CTA */}
            <div className="flex items-center justify-between gap-md">
              <div className="flex flex-wrap gap-xs">
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-warm text-text-muted hover:text-white transition-all duration-200 tag-hover"
                    style={{ '--tag-hover-bg': config.accent } as React.CSSProperties}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all duration-300 flex-shrink-0">
                続きを読む
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>

            {post.source && (
              <p className="text-xs text-text-muted mt-lg pt-lg border-t border-border-light">
                出典: {post.source}
              </p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <article className="relative bg-surface rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:border-accent/20 hover:-translate-y-1 h-full flex flex-col group/card">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 group-hover:w-1.5" style={{ backgroundColor: config.accent }} />

        <div className="pl-lg pr-md py-md flex-grow flex flex-col">
          {/* Category badge + read time */}
          <div className="flex items-center justify-between gap-sm mb-sm">
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: `${config.accent}10`, color: config.accent }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
              </svg>
              {config.label}
            </span>
            <span className="text-xs text-text-muted font-medium">{readTime}</span>
          </div>

          {/* Title */}
          <h3 className="text-[1.05rem] font-semibold text-primary leading-snug mb-sm group-hover:text-accent transition-colors duration-300 tracking-snug flex-grow">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-md">
            {post.excerpt}
          </p>

          {/* Bottom: date + tags */}
          <div className="mt-auto">
            <time className="text-xs text-text-muted block mb-sm">{formattedDate}</time>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-xs">
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-warm text-text-muted hover:text-white transition-all duration-200 tag-hover"
                    style={{ '--tag-hover-bg': config.accent } as React.CSSProperties}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
