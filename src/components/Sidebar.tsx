import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface SidebarProps {
  popularTags: string[];
  recentPosts: Post[];
}

export default function Sidebar({ popularTags, recentPosts }: SidebarProps) {
  return (
    <div className="space-y-xl">
      {/* Popular Tags */}
      <section className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="px-lg pt-lg pb-sm">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-sm">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            人気タグ
          </h3>
        </div>
        <div className="px-lg pb-lg">
          <div className="flex flex-wrap gap-sm">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1.5 bg-neutral-warm text-text-secondary text-xs font-medium rounded-full hover:bg-accent hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="px-lg pt-lg pb-sm">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-sm">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            最新記事
          </h3>
        </div>
        <div className="px-lg pb-lg">
          <ul className="space-y-0">
            {recentPosts.map((post, i) => (
              <li key={post.slug} className="group">
                <Link href={`/posts/${post.slug}`} className="flex gap-sm py-md hover:bg-neutral-warm/50 -mx-md px-md rounded-lg transition-colors duration-200">
                  <span className="flex-shrink-0 w-7 h-7 bg-neutral-warm rounded-lg flex items-center justify-center text-xs font-bold text-text-muted group-hover:bg-accent group-hover:text-white transition-all duration-200">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-grow">
                    <h4 className="text-sm font-medium text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <time className="text-xs text-text-muted mt-xs block">
                      {new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="px-lg pt-lg pb-sm">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-sm">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            カテゴリ
          </h3>
        </div>
        <div className="px-lg pb-lg">
          <ul className="space-y-xs">
            <li>
              <Link href="/category/ai-tech" className="flex items-center justify-between px-md py-sm.5 rounded-lg hover:bg-neutral-warm transition-all duration-200 group">
                <span className="flex items-center gap-sm">
                  <span className="w-3 h-3 bg-cat-ai rounded-full ring-2 ring-cat-ai/20 group-hover:ring-cat-ai/40 transition-all"></span>
                  <span className="text-sm font-medium text-text-primary group-hover:text-cat-ai transition-colors">AI & Tech</span>
                </span>
                <span className="text-xs text-text-muted bg-neutral-warm px-2 py-0.5 rounded-full group-hover:bg-cat-ai-light transition-colors">
                  {recentPosts.filter(p => p.category === 'ai-tech').length}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/category/smart-home" className="flex items-center justify-between px-md py-sm.5 rounded-lg hover:bg-neutral-warm transition-all duration-200 group">
                <span className="flex items-center gap-sm">
                  <span className="w-3 h-3 bg-cat-smart rounded-full ring-2 ring-cat-smart/20 group-hover:ring-cat-smart/40 transition-all"></span>
                  <span className="text-sm font-medium text-text-primary group-hover:text-cat-smart transition-colors">Smart Home</span>
                </span>
                <span className="text-xs text-text-muted bg-neutral-warm px-2 py-0.5 rounded-full group-hover:bg-cat-smart-light transition-colors">
                  {recentPosts.filter(p => p.category === 'smart-home').length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* About CTA */}
      <section className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-orange-600"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
        <div className="relative p-lg text-white">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-sm">Smart Kurashi</h3>
          <p className="text-sm text-white/80 leading-relaxed mb-md">
            スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を日本語でお届け。
          </p>
          <Link href="/about" className="inline-flex items-center gap-xs text-sm font-semibold hover:gap-sm transition-all duration-200 text-white/90 hover:text-white">
            詳しく見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
