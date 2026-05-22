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

function parsePost(filePath: string, defaultCategory: string): Post {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, path.extname(filePath));
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || content.slice(0, 160).replace(/\n/g, ' ') + '...',
    content,
    date: data.date || fs.statSync(filePath).birthtime.toISOString().slice(0, 10),
    category: data.category || defaultCategory,
    source: data.source || undefined,
    tags: data.tags || [],
    image: data.image || undefined,
  };
}

function getPostsFromDir(dir: string, category: string): Post[] {
  return getMarkdownFiles(dir).map((f) => parsePost(path.join(dir, f), category));
}

export function getAllPosts(): Post[] {
  // Scan both content/posts/ and content/news/[category]/
  const mainPosts = getPostsFromDir(path.join(contentDir, 'posts'), 'article');
  const aiNews = getPostsFromDir(path.join(contentDir, 'news', 'ai-tech'), 'ai-tech');
  const smartHomeNews = getPostsFromDir(path.join(contentDir, 'news', 'smart-home'), 'smart-home');
  return [...mainPosts, ...aiNews, ...smartHomeNews].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts()
    .filter((post) => post.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts()
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  // Search in all content directories
  const searchDirs = [
    path.join(contentDir, 'posts'),
    path.join(contentDir, 'news', 'ai-tech'),
    path.join(contentDir, 'news', 'smart-home'),
  ];
  for (const dir of searchDirs) {
    const filePathMd = path.join(dir, `${slug}.md`);
    const filePathMdx = path.join(dir, `${slug}.mdx`);
    if (fs.existsSync(filePathMd)) {
      const category = dir.includes('ai-tech') ? 'ai-tech' : dir.includes('smart-home') ? 'smart-home' : 'article';
      return parsePost(filePathMd, category);
    }
    if (fs.existsSync(filePathMdx)) {
      const category = dir.includes('ai-tech') ? 'ai-tech' : dir.includes('smart-home') ? 'smart-home' : 'article';
      return parsePost(filePathMdx, category);
    }
  }
  return null;
}
