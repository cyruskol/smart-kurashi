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
  reviewType?: string;
  productName?: string;
  productCategory?: string;
  priceRange?: string;
  usagePeriod?: string;
  updatedAt?: string;
  conclusion?: string;
  suitableFor?: string[];
  notSuitableFor?: string[];
  pros?: string[];
  cons?: string[];
  experienceIntro?: string;
  experiencePoints?: string[];
  featureReviews?: { title: string; description: string }[];
  comparisonItems?: { name: string; suitableFor: string; feature: string; caution: string; href?: string }[];
  finalVerdict?: string;
  faq?: { question: string; answer: string }[];
  retailerLinks?: { label: string; href: string }[];
}

// ── Cache layer ──────────────────────────────────────────────────────────────
// In production these are cached for the lifetime of the process (ISR).
// In dev they re-read on every request so content changes are reflected.

let _allPostsCache: Post[] | null = null;
const _slugCache: Map<string, Post | null> = new Map();
const _categoryCache: Map<string, Post[]> = new Map();

function ensureCache(): Post[] {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && _allPostsCache) return _allPostsCache;

  const mainPosts = getPostsFromDir(path.join(contentDir, 'posts'), 'article');
  const aiNews = getPostsFromDir(path.join(contentDir, 'news', 'ai-tech'), 'ai-tech');
  const smartHomeNews = getPostsFromDir(path.join(contentDir, 'news', 'smart-home'), 'smart-home');
  const posts = [...mainPosts, ...aiNews, ...smartHomeNews].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  if (!isDev) _allPostsCache = posts;
  return posts;
}

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

function normalizeDate(input: unknown, fallbackPath: string): string {
  if (input instanceof Date) return input.toISOString().slice(0, 10);
  if (typeof input === 'string') return input;
  if (typeof input === 'number') return new Date(input).toISOString().slice(0, 10);
  return fs.statSync(fallbackPath).birthtime.toISOString().slice(0, 10);
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
    date: normalizeDate(data.date, filePath),
    category: data.category || defaultCategory,
    source: data.source || undefined,
    tags: data.tags || [],
    image: data.image || undefined,
    reviewType: data.reviewType || undefined,
    productName: data.productName || undefined,
    productCategory: data.productCategory || undefined,
    priceRange: data.priceRange || undefined,
    usagePeriod: data.usagePeriod || undefined,
    updatedAt: data.updatedAt || undefined,
    conclusion: data.conclusion || undefined,
    suitableFor: data.suitableFor || undefined,
    notSuitableFor: data.notSuitableFor || undefined,
    pros: data.pros || undefined,
    cons: data.cons || undefined,
    experienceIntro: data.experienceIntro || undefined,
    experiencePoints: data.experiencePoints || undefined,
    featureReviews: data.featureReviews || undefined,
    comparisonItems: data.comparisonItems || undefined,
    finalVerdict: data.finalVerdict || undefined,
    faq: data.faq || undefined,
    retailerLinks: data.retailerLinks || undefined,
  };
}

function getPostsFromDir(dir: string, category: string): Post[] {
  return getMarkdownFiles(dir).map((f) => parsePost(path.join(dir, f), category));
}

export function getAllPosts(): Post[] {
  return ensureCache();
}

export function getPostsByCategory(category: string): Post[] {
  if (_categoryCache.has(category)) return _categoryCache.get(category)!;
  const posts = ensureCache()
    .filter((post) => post.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
  _categoryCache.set(category, posts);
  return posts;
}

export function getPostsByTag(tag: string): Post[] {
  return ensureCache()
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && _slugCache.has(slug)) return _slugCache.get(slug)!;

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
      const post = parsePost(filePathMd, category);
      _slugCache.set(slug, post);
      return post;
    }
    if (fs.existsSync(filePathMdx)) {
      const category = dir.includes('ai-tech') ? 'ai-tech' : dir.includes('smart-home') ? 'smart-home' : 'article';
      const post = parsePost(filePathMdx, category);
      _slugCache.set(slug, post);
      return post;
    }
  }
  _slugCache.set(slug, null);
  return null;
}
