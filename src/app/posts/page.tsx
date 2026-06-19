import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'レビュー記事一覧 | スマートくらし',
  description: 'スマートくらしのレビュー記事一覧。AI・テック、家電・ガジェットに関する比較・レビュー・買い方ガイドをまとめています。',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">レビュー記事</p>
        <h1>レビュー記事一覧</h1>
        <p>
          AI・テック、家電・ガジェットに関する比較記事・レビュー・買い方ガイドをまとめています。
        </p>
      </section>

      <section style={{ marginTop: '44px' }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          {posts.map((post) => (
            <article key={post.slug} style={{ border: '1px solid #E7E5E4', borderRadius: '8px', padding: '20px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>{post.date}</span>
                {post.category && (
                  <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', background: '#F0F0F0', color: '#666' }}>
                    {post.category === 'ai-tech' ? 'AI・テック' : post.category === 'smart-home' ? 'スマート家電' : post.category}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                <Link href={`/posts/${post.slug}`} style={{ color: '#2D2D2D', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '12px' }}>
                  {post.excerpt}
                </p>
              )}
              <Link href={`/posts/${post.slug}`} style={{ fontSize: '14px', color: '#4A433F', textDecoration: 'underline' }}>
                読む →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
