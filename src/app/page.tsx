import { getAllPosts, getPostsByCategory } from '@/lib/posts';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);
  const aiPosts = getPostsByCategory('ai-tech').slice(0, 3);
  const smartHomePosts = getPostsByCategory('smart-home').slice(0, 3);

  return (
    <main>
      <section>
        <h1>Latest</h1>
        {latestPosts.map((post) => (
          <article key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <time>{post.date}</time>
            <span>{post.category}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
