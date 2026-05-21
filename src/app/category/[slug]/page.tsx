import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryInfo: Record<string, { label: string; description: string }> = {
  'ai-tech': {
    label: 'AI & Tech',
    description: 'AI技術、機械学習、生成AI、チャットボットなど最新テクノロジーニュース',
  },
  'smart-home': {
    label: 'Smart Home',
    description: 'スマートホーム家電、IoT機器、HEMS、音声アシスタントなど住まいのテクノロジー',
  },
};

export async function generateStaticParams() {
  return Object.keys(categoryInfo).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const info = categoryInfo[slug];
  if (!info) return { title: 'Not Found' };
  return {
    title: info.label,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const info = categoryInfo[slug];

  if (!info) {
    notFound();
  }

  const allPosts = getAllPosts();
  const posts = allPosts.filter(
    (post) => post.category === slug || post.tags.some((t) => t.includes(slug))
  );

  return (
    <main className="py-xl">
      <div className="max-w-container mx-auto px-md">
        {/* Category Header */}
        <header className="mb-xl">
          <h1 className="text-3xl font-bold text-primary mb-sm">{info.label}</h1>
          <p className="text-text-secondary">{info.description}</p>
        </header>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-xl">
            <p className="text-text-secondary text-lg">
              このカテゴリの記事はまだありません。
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
