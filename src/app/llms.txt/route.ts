import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getAllProducts } from '@/lib/products';

export const dynamic = 'force-static';

const BASE_URL = 'https://smart-kurashi.jp';

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1).trimEnd() + '…';
}

export async function GET() {
  const posts = getAllPosts();
  const products = getAllProducts();

  // Latest 30 ai-tech posts
  const aiTechPosts = posts
    .filter((p) => p.category === 'ai-tech')
    .slice(0, 30);

  // Latest 30 other category posts (smart-home, article)
  const otherPosts = posts
    .filter((p) => p.category !== 'ai-tech')
    .slice(0, 30);

  const lines: string[] = [];

  // Line 1: site name
  lines.push('# スマートくらし');
  lines.push('');

  // Blockquote summary
  lines.push('> 日本のAI・テック分析とスマート家電レビュー／比較の日本語メディア。');
  lines.push('> 本文中の商品リンクにはアフィリエイトリンクが含まれる場合があります。');
  lines.push('');

  // AI・テック section
  lines.push('## AI・テック');
  for (const post of aiTechPosts) {
    lines.push(`- [${post.title}](${BASE_URL}/posts/${post.slug}): ${truncate(post.excerpt, 120)}`);
  }
  lines.push('');

  // スマート家電・レビュー section
  lines.push('## スマート家電・レビュー');
  for (const post of otherPosts) {
    lines.push(`- [${post.title}](${BASE_URL}/posts/${post.slug}): ${truncate(post.excerpt, 120)}`);
  }
  lines.push('');

  // 製品 section
  lines.push('## 製品');
  for (const product of products) {
    lines.push(`- [${product.name}](${BASE_URL}/products/${product.slug})`);
  }
  lines.push('');

  // 主要ページ section
  lines.push('## 主要ページ');
  lines.push(`- [ホーム](${BASE_URL}/)`);
  lines.push(`- [レビュー記事一覧](${BASE_URL}/posts)`);
  lines.push(`- [商品を探す](${BASE_URL}/products)`);
  lines.push(`- [比較・ランキング](${BASE_URL}/compare)`);
  lines.push(`- [レビュー一覧](${BASE_URL}/reviews)`);

  const body = lines.join('\n');

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}