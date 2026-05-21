import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  source?: string;
  tags: string[];
  image?: string;
}

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

function parsePost(filePath: string, category: string): Post {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, path.extname(filePath));
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || content.slice(0, 160).replace(/\n/g, ' ') + '...',
    content,
    date: data.date || fs.statSync(filePath).birthtime.toISOString().slice(0, 10),
    category,
    source: data.source || undefined,
    tags: data.tags || [],
    image: data.image || undefined,
  };
}

export function getAllPosts(): Post[] {
  const postsDir = path.join(contentDir, 'posts');
  const files = getMarkdownFiles(postsDir);
  return files
    .map((f) => parsePost(path.join(postsDir, f), 'article'))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostsByCategory(category: string): Post[] {
  const postsDir = path.join(contentDir, 'posts');
  const newsDir = path.join(contentDir, 'news', category);
  const posts = getMarkdownFiles(postsDir)
    .map((f) => parsePost(path.join(postsDir, f), category))
    .filter((p) => p.category === category || p.tags.includes(category));
  const news = getMarkdownFiles(newsDir).map((f) =>
    parsePost(path.join(newsDir, f), category)
  );
  return [...posts, ...news].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const postsDir = path.join(contentDir, 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(filePath, 'article');
}
