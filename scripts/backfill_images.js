#!/usr/bin/env node
/**
 * Backfill OG Images for Existing Posts
 * ======================================
 * Reads each existing post, finds a relevant source URL by searching
 * the original RSS feeds based on the post title, scrapes the OG image,
 * downloads it locally, and injects it into the post's frontmatter
 * and content — all while respecting the word count limit.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(PROJECT_ROOT, 'content', 'posts');
const IMAGE_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'blog');

// Ensure image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function countJapaneseWords(text) {
  // Count Japanese characters + kana + kanji (rough estimate)
  // Strip markdown/frontmatter first
  const clean = text
    .replace(/---[\s\S]*?---/, '') // remove frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // remove links, keep text
    .replace(/[#*_\-<>`]/g, ''); // remove markdown chars

  // Count meaningful characters (Japanese + alphanumeric)
  const chars = clean.replace(/\s/g, '').length;
  // Rough: 1 JP word ≈ 1.5 characters on average
  return Math.round(chars / 1.5);
}

// ─── OG Image Scraper ──────────────────────────────────────────────────────

async function scrapeOgImage(articleUrl) {
  try {
    const res = await axios.get(articleUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.9,en;q=0.5',
      },
      maxRedirects: 5,
    });
    const $ = cheerio.load(res.data);
    const ogImage =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('meta[property="og:image:url"]').attr('content') ||
      null;
    if (ogImage) {
      if (ogImage.startsWith('//')) return 'https:' + ogImage;
      if (ogImage.startsWith('/')) {
        const parsed = new URL(articleUrl);
        return parsed.origin + ogImage;
      }
      return ogImage;
    }
  } catch (err) {
    console.warn(`  [OG] Failed for ${articleUrl.slice(0, 60)}: ${err.message.slice(0, 60)}`);
  }
  return null;
}

async function downloadImage(imageUrl, slug) {
  if (!imageUrl) return null;
  const urlPath = new URL(imageUrl).pathname;
  const ext = path.extname(urlPath).split('?')[0] || '.jpg';
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '-').slice(0, 60);
  const filename = `${safeSlug}${ext}`;
  const filepath = path.join(IMAGE_DIR, filename);
  const publicPath = `/images/blog/${filename}`;
  if (fs.existsSync(filepath)) {
    console.log(`  [IMG] Already exists: ${publicPath}`);
    return publicPath;
  }
  return new Promise((resolve) => {
    try {
      const protocol = imageUrl.startsWith('https') ? https : http;
      const req = protocol.get(imageUrl, { timeout: 30000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadImage(res.headers.location, slug).then(resolve);
          return;
        }
        if (res.statusCode !== 200) { console.warn(`  [IMG] HTTP ${res.statusCode}`); resolve(null); return; }
        const ws = fs.createWriteStream(filepath);
        res.pipe(ws);
        ws.on('finish', () => { console.log(`  [IMG] Downloaded: ${publicPath}`); resolve(publicPath); });
        ws.on('error', (e) => { console.warn(`  [IMG] Write error: ${e.message}`); resolve(null); });
      });
      req.on('error', (e) => { console.warn(`  [IMG] Download failed: ${e.message.slice(0, 60)}`); resolve(null); });
      req.on('timeout', () => { req.destroy(); resolve(null); });
    } catch (e) { resolve(null); }
  });
}

// ─── Find Source URL from RSS ──────────────────────────────────────────────

const RSS_FEEDS = [
  // Track 1 — Corporate
  { url: 'https://techcrunch.com/feed/', label: 'TechCrunch' },
  { url: 'https://www.theverge.com/rss/index.xml', label: 'The Verge' },
  { url: 'https://arstechnica.com/feed/', label: 'Ars Technica' },
  { url: 'https://blog.google/rss/', label: 'Google' },
  { url: 'https://openai.com/blog/rss/', label: 'OpenAI' },
  { url: 'https://news.microsoft.com/feed/', label: 'Microsoft' },
  { url: 'https://anthropic.com/news', label: 'Anthropic' },
  { url: 'https://news.samsung.com/global/feed', label: 'Samsung' },
  // Track 2 — Japan IT
  { url: 'https://gigazine.net/news/rss_2.0/', label: 'GIGAZINE' },
  { url: 'https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml', label: 'ITmedia' },
  { url: 'https://engadget.com/rss.xml', label: 'Engadget' },
  { url: 'https://www.technologyreview.com/feed/', label: 'MIT Tech Review' },
];

// ─── Find Source URL from RSS ──────────────────────────────────────────────

async function findSourceUrl(postTitle) {
  // Build search queries from the post title
  // Extract key terms (both JP and English tech terms)
  const cleanTitle = postTitle.replace(/[「」『』（）・ー\-—]/g, ' ').trim();

  // Try DuckDuckGo Lite (HTML version) with very specific queries
  // These are the original source domains from our RSS feeds
  const searches = [
    { site: 'techcrunch.com', query: cleanTitle.split(' ').slice(0, 4).join(' ') },
    { site: 'theverge.com', query: cleanTitle.split(' ').slice(0, 4).join(' ') },
    { site: 'gigazine.net', query: cleanTitle },
  ];

  for (const { site, query } of searches) {
    const ddgUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query + ' site:' + site)}&kd=-1`;

    try {
      const res = await axios.get(ddgUrl, {
        timeout: 8000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      const $ = cheerio.load(res.data);

      // DuckDuckGo Lite result links
      $('a.result-link').each((_, el) => {
        const href = $(el).attr('href') || '';
        if (href.includes(site)) {
          throw new Error('FOUND:' + href); // break out of loop
        }
      });
    } catch (err) {
      if (err.message?.startsWith('FOUND:')) {
        const url = err.message.replace('FOUND:', '');
        console.log(`  [FOUND] ${url.slice(0, 60)}...`);
        return url;
      }
      // otherwise continue to next search
    }
  }
  return null;
}

// ─── Main Backfill ─────────────────────────────────────────────────────────

async function backfill() {
  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .filter(f => !f.includes('untitled'));

  console.log(`\n🖼️ Backfill OG Images for ${files.length} existing posts\n`);

  let done = 0, skipped = 0, failed = 0;

  for (const file of files) {
    const filepath = path.join(BLOG_DIR, file);
    let content = fs.readFileSync(filepath, 'utf-8');

    // Skip if already has an image
    if (content.includes('image:') && content.includes('/images/blog/')) {
      console.log(`⏭️  SKIP (already has image): ${file}`);
      skipped++;
      continue;
    }

    // Extract title
    const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
    const title = titleMatch ? titleMatch[1].trim() : file;

    // Check word count — don't bloat posts that are already near the limit
    const wordCount = countJapaneseWords(content);
    console.log(`\n📄 ${file} (${wordCount} words)`);

    if (wordCount > 2600) {
      console.log(`  ⏭️ SKIP (word count ${wordCount} near 2800 limit — adding image would bloat)`);
      skipped++;
      continue;
    }

    // Step 1: Find source URL
    console.log(`  🔍 Searching RSS feeds for: "${title.slice(0, 40)}..."`);
    const sourceUrl = await findSourceUrl(title);

    if (!sourceUrl) {
      console.log(`  ❌ No matching source URL found`);
      failed++;
      continue;
    }

    // Step 2: Scrape OG image
    console.log(`  🖼️ Scraping OG image from: ${sourceUrl.slice(0, 60)}...`);
    const ogUrl = await scrapeOgImage(sourceUrl);

    if (!ogUrl) {
      console.log(`  ❌ No OG image found at source`);
      failed++;
      continue;
    }

    // Step 3: Download image
    const slug = slugify(title);
    const localPath = await downloadImage(ogUrl, slug);

    if (!localPath) {
      console.log(`  ❌ Failed to download image`);
      failed++;
      continue;
    }

    // Step 4: Inject image into post
    // Add image: to frontmatter
    if (content.includes('---\n')) {
      // Insert image field after source: line, or after category: line
      content = content.replace(
        /(source:\s*"[^"]*")/,
        `$1\nimage: "${localPath}"`
      );
      if (!content.includes('image:')) {
        content = content.replace(
          /(category:\s*"[^"]*")/,
          `$1\nimage: "${localPath}"`
        );
      }
    }

    // Add the OG image at the top of the body content (after frontmatter closing ---)
    const frontmatterEnd = content.indexOf('---', 3) + 3;
    const before = content.slice(0, frontmatterEnd);
    const after = content.slice(frontmatterEnd);
    // Add image with minimal markdown — just the image, no extra text
    content = `${before}\n![${title}](${localPath})\n${after}`;

    // Write back
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`  ✅ Image injected: ${localPath}`);
    done++;

    // Polite delay
    await new Promise(r => setTimeout(r, 2000));
  }

  // Git commit
  if (done > 0) {
    try {
      execSync('git add .', { cwd: PROJECT_ROOT });
      execSync(`git commit -m "Backfill OG images for ${done} existing posts"`, { cwd: PROJECT_ROOT });
      execSync('git push origin main', { cwd: PROJECT_ROOT, timeout: 60000 });
      console.log(`\n✅ Committed & pushed ${done} posts with images`);
    } catch (e) {
      console.warn(`⚠️ Git push failed: ${e.message}`);
    }
  }

  console.log(`\n📊 RESULT: ${done} done, ${skipped} skipped, ${failed} failed (${files.length} total)`);
}

// ─── Run ────────────────────────────────────────────────────────────────────
backfill().catch(err => {
  console.error('Backfill error:', err);
  process.exit(1);
});
