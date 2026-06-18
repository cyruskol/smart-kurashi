#!/usr/bin/env node

/**
 * Advanced Content Engine — Autonomous Tri-Track Newsroom
 * ========================================================
 *
 * Fetches 30 RSS feeds (Corporate, Western IT, Japan IT) → filters hot topics
 * → groups by keyword similarity → synthesises Japanese MDX via local LM Studio
 * → saves to ./app/blog → git push → Vercel deploy.
 *
 * Run once:    node scripts/advanced-content-engine.js --once
 * Run daemon:  node scripts/advanced-content-engine.js --cron
 *             (4× daily JST: 06:00, 12:00, 18:00, 00:00)
 *
 * Lock file:   /tmp/newsroom.lock  (prevents overlapping runs)
 */

const RssParser = require('rss-parser');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');
const axios = require('axios');
const cheerio = require('cheerio');

// ─── Configuration ────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SCRIPTS_DIR = __dirname;
const BLOG_DIR = path.join(PROJECT_ROOT, 'content', 'posts');
const STATE_FILE = path.join(SCRIPTS_DIR, '.engine_state.json');
const LOCK_FILE = '/tmp/newsroom.lock';
const LOCK_STALE_MS = 2 * 60 * 60 * 1000; // 2 hours — assume crashed if older
const IMAGE_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'blog');
const AFFILIATE_REGISTRY_FILE = '/Users/gengar_chan/Documents/AI_Vault/Projects/Smart_Kurashi/Affiliate_Link_Registry.md';

const LM_STUDIO_BASE = 'http://127.0.0.1:1234';
const LM_MODEL = 'qwen/qwen3.5-9b';   // exact LM Studio model identifier
const LM_LOAD_CTX = 16384;             // safe for 24 GB unified memory

// ─── OG Image Scraper ──────────────────────────────────────────────────────

/**
 * Fetch the original article HTML and extract the og:image URL.
 * Returns the image URL string, or null if not found.
 */
async function scrapeOgImage(articleUrl) {
  try {
    const res = await axios.get(articleUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      maxRedirects: 5,
    });
    const $ = cheerio.load(res.data);

    // Try og:image first, then twitter:image, then first <img> in article
    const ogImage =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('meta[property="og:image:url"]').attr('content') ||
      $('article img[src]').first().attr('src') ||
      $('img[src]').first().attr('src') ||
      null;

    if (ogImage) {
      // Resolve relative URLs
      if (ogImage.startsWith('//')) return 'https:' + ogImage;
      if (ogImage.startsWith('/')) {
        const parsed = new URL(articleUrl);
        return parsed.origin + ogImage;
      }
      return ogImage;
    }
  } catch (err) {
    console.warn(`[OG] Failed to scrape ${articleUrl}: ${err.message.slice(0, 80)}`);
  }
  return null;
}

/**
 * Download an image URL to ./public/images/blog/ using a sanitized slug.
 * Returns the local public path (e.g., '/images/blog/my-article.jpg') or null.
 */
async function downloadImage(imageUrl, slug) {
  if (!imageUrl) return null;

  // Ensure image directory exists
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  // Determine extension from URL or content-type
  const urlPath = new URL(imageUrl).pathname;
  const ext = path.extname(urlPath).split('?')[0] || '.jpg';
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '-').slice(0, 60);
  const filename = `${safeSlug}${ext}`;
  const filepath = path.join(IMAGE_DIR, filename);
  const publicPath = `/images/blog/${filename}`;

  // Skip if already downloaded
  if (fs.existsSync(filepath)) {
    console.log(`[IMG] Already exists: ${publicPath}`);
    return publicPath;
  }

  return new Promise((resolve) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const req = protocol.get(imageUrl, { timeout: 30000 }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, slug).then(resolve);
        return;
      }
      if (res.statusCode !== 200) {
        console.warn(`[IMG] HTTP ${res.statusCode} for ${imageUrl}`);
        resolve(null);
        return;
      }
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`[IMG] Downloaded: ${publicPath}`);
        resolve(publicPath);
      });
      fileStream.on('error', (err) => {
        console.warn(`[IMG] Write error: ${err.message}`);
        resolve(null);
      });
    });
    req.on('error', (err) => {
      console.warn(`[IMG] Download failed: ${err.message.slice(0, 80)}`);
      resolve(null);
    });
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
  });
}

function shuffleArray(items) {
  return items
    .map((item) => ({ item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ item }) => item);
}

function pickRandomIndices(total, count) {
  const indices = Array.from({ length: total }, (_, i) => i);
  return shuffleArray(indices).slice(0, count).sort((a, b) => a - b);
}

function extractFirstHttpUrl(text) {
  if (!text) return '';
  const match = String(text).match(/https?:\/\/\S+/);
  return match ? match[0].replace(/[)\],.]+$/, '') : '';
}

function parseAffiliateRegistryRows() {
  if (!fs.existsSync(AFFILIATE_REGISTRY_FILE)) return [];

  const raw = fs.readFileSync(AFFILIATE_REGISTRY_FILE, 'utf-8');
  const headerMatch = raw.match(/(\| 商品名 \| 商品サイト \| Image & Textリンク \| Link Onlyリンク \| レビュー執筆状況 \| smart-kurashi掲載URL \| メモ \|\n\|---\|---\|---\|---\|---\|---\|---\|\n)([\s\S]*?)(\n## Updating rule)/);
  if (!headerMatch) return [];

  return headerMatch[2]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'))
    .filter((line) => !line.includes('---'))
    .map((line) => {
      const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
      return {
        productName: cells[0] || '',
        productSite: cells[1] || '',
        imageTextLink: cells[2] || '',
        linkOnlyLink: cells[3] || '',
        status: cells[4] || '',
        publishedUrl: cells[5] || '',
        memo: cells[6] || '',
      };
    })
    .filter((row) => row.productName);
}

function formatAffiliateRegistryRow(row) {
  return `| ${row.productName || ''} | ${row.productSite || ''} | ${row.imageTextLink || ''} | ${row.linkOnlyLink || ''} | ${row.status || ''} | ${row.publishedUrl || ''} | ${row.memo || ''} |`;
}

function writeAffiliateRegistryRows(rows) {
  const raw = fs.readFileSync(AFFILIATE_REGISTRY_FILE, 'utf-8');
  const updated = raw.replace(
    /(\| 商品名 \| 商品サイト \| Image & Textリンク \| Link Onlyリンク \| レビュー執筆状況 \| smart-kurashi掲載URL \| メモ \|\n\|---\|---\|---\|---\|---\|---\|---\|\n)([\s\S]*?)(\n## Updating rule)/,
    (_, header, _rows, footer) => `${header}${rows.map((row) => formatAffiliateRegistryRow(row)).join('\n')}\n${footer}`,
  );
  fs.writeFileSync(AFFILIATE_REGISTRY_FILE, updated, 'utf-8');
}

function updateAffiliateRegistryRow(productName, updates) {
  const rows = parseAffiliateRegistryRows();
  let changed = false;
  const nextRows = rows.map((row) => {
    if (row.productName !== productName) return row;
    changed = true;
    return { ...row, ...updates };
  });

  if (!changed) {
    console.warn(`[AFFILIATE] Registry row not found: ${productName}`);
    return false;
  }

  writeAffiliateRegistryRows(nextRows);
  return true;
}

function getPendingAffiliateRows() {
  return parseAffiliateRegistryRows().filter((row) => row.status !== '公開済み');
}

function inferAffiliateTopic(productName) {
  const text = String(productName || '');
  if (/(iPhone|iPad|Mac|Apple|RTX|GPU|GeForce|NVIDIA|Palit|GIGABYTE|モニター|ディスプレイ|ノートパソコン|パソコン|PC|Mac Studio|Radeon|Sapphire)/i.test(text)) {
    return 'ai-tech';
  }
  return 'smart-home';
}

const WORLD_CUP_CAMPAIGN_END_DATE = '2026-07-06';
const WORLD_CUP_STATIC_PAGE = '/fifa-world-cup-2026';

function isWorldCupBroadcastRelated(product) {
  const text = `${product.productName || ''} ${product.productSite || ''} ${product.memo || ''}`.toLowerCase();
  return /テレビ|tv|broadcast|放送|配信|地上波|bs|cs|チューナー|アンテナ|録画|hdmi|projector|プロジェクタ|プロジェクター|soundbar|サウンドバー|fire tv|chromecast|apple tv|roku|set-top|stb|レコーダ|ホームシアター|モニター|display|ディスプレイ/i.test(text);
}

function buildAffiliatePrompt(product) {
  const worldCupAddon = isWorldCupBroadcastRelated(product)
    ? `

【20日間の期間限定ルール】
- ${WORLD_CUP_CAMPAIGN_END_DATE} までの間は、テレビ・放送・配信・視聴まわりの商品では、本文のどこかで FIFA World Cup を自然に触れてください。
- 「無料放送」「無料中継」「無料視聴」系の語を、自然で事実に沿う範囲で盛り込んでください。
- 詳細な放送局名や対戦カードは書きすぎず、読者は World Cup 静的ページへ案内してください。
- 本文内に ${WORLD_CUP_STATIC_PAGE} への内部リンクを 1 回以上入れてください。
- 可能なら関連する他のアフィリエイト記事へも自然に内部リンクしてください。`
    : '';

  return `以下はアフィリエイト登録済み商品の1件です。これをもとに、1本の日本語MDX記事にしてください。

商品情報:
- 商品名: ${product.productName}
- 商品サイト: ${product.productSite}
- 画像URL: ${extractFirstHttpUrl(product.memo)}
- 執筆状況: ${product.status}
- メモ: ${product.memo || 'なし'}

執筆ルール:
- これは調査レビューとして書く
- 実機体験は捏造しない
- タイトルは日本語中心で、英字は最小限にする
- 商品の強み、向いている人、向いていない人、設置・利用シーン、比較軸を入れる
- 室内サイズや設置環境の目安を自然に触れる
- 価格や在庫は断定しない
- 画像URLや生の販売URLは本文に出さない
- 1つの主題に絞って、読みやすく自然な日本語でまとめる${worldCupAddon}

出力形式:
- YAMLフロントマター（title, date, categories, tags）
- 本文
- 最後に「編集部の視点」セクション

本文は、読者が「自分に合うか」を判断しやすい流れで書いてください。`;
}

function buildEditorialSystemPrompt(topic, extraRules = '') {
  const linkDictJSON = JSON.stringify(buildInternalLinkDictionary(topic));
  return SYSTEM_PROMPT + `

## 内部リンク（Internal Links）
以下は、すでに公開されている関連記事の一覧です。記事を書く際に、自然な文脈で1〜2つの過去記事へのハイパーリンクを挿入してください。Markdown形式: [関連記事のタイトル](/posts/slug)。強制的に入れる必要はなく、文脈的に滑らかに遷移する場合のみ挿入してください。使用可能な記事一覧（JSON形式）: ${linkDictJSON}${extraRules}`;
}

function buildRunPlan(groups, pendingAffiliateRows) {
  const articleSlots = groups.slice(0, 3);
  const slotCount = articleSlots.length;
  if (slotCount === 0) return [];

  const maxAffiliate = slotCount === 1 ? 1 : Math.min(2, slotCount - 1);
  const desiredAffiliate = Math.min(
    pendingAffiliateRows.length,
    maxAffiliate,
    Math.random() < 0.5 ? 1 : 2,
  );

  if (desiredAffiliate <= 0) {
    return articleSlots.map((group, index) => ({ kind: 'news', index, group }));
  }

  const selectedAffiliateRows = shuffleArray(pendingAffiliateRows).slice(0, desiredAffiliate);
  const affiliateIndices = new Set(pickRandomIndices(slotCount, desiredAffiliate));
  let affiliateCursor = 0;

  return articleSlots.map((group, index) => {
    if (affiliateIndices.has(index)) {
      return { kind: 'affiliate', index, product: selectedAffiliateRows[affiliateCursor++] };
    }
    return { kind: 'news', index, group };
  });
}

function extractHeroImageFromProduct(product) {
  return extractFirstHttpUrl(product.memo || '');
}

function buildPublishedUrl(filepath) {
  const filename = path.basename(filepath, path.extname(filepath));
  return `https://smart-kurashi.jp/posts/${filename}`;
}

// ─── Internal Link Dictionary ──────────────────────────────────────────────

/**
 * Scan the blog directory and build a JSON array of existing articles.
 * Each entry: { title: "...", path: "/posts/slug" }
 * Only includes posts from the same topic (ai-tech or smart-home).
 */
function buildInternalLinkDictionary(currentTopic) {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const links = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
      const catMatch = content.match(/category:\s*["']?([^"'\n]+)["']?/);

      if (!titleMatch) continue;
      const title = titleMatch[1].trim();
      const category = catMatch ? catMatch[1].trim() : 'ai-tech';

      // Only link to same-topic posts (or all if topic is broad)
      if (category === currentTopic || currentTopic === null) {
        const slug = file.replace(/\.(mdx?)$/, '');
        links.push({ title, path: `/posts/${slug}` });
      }
    } catch {
      // skip unreadable files
    }
  }

  console.log(`[LINKS] Built dictionary: ${links.length} articles for topic "${currentTopic}"`);
  return links;
}

// ─── Jitter Schedule State ─────────────────────────────────────────────────

/**
 * Read the engine state JSON file.
 * If missing or corrupt, return a default that signals "time to run".
 */
function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[STATE] Corrupt state file, resetting:', err.message);
  }
  return { last_run_time: null, current_target_interval: 0 };
}

/**
 * Write the engine state JSON file.
 */
function writeState(lastRunTime, targetInterval) {
  const data = {
    last_run_time: lastRunTime,
    current_target_interval: targetInterval,
  };
  fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`[STATE] Saved: next window +${targetInterval} min (from ${lastRunTime})`);
}

/**
 * Calculate a new random jitter interval: 180 + random(17-131) minutes.
 * This gives a window of 197–311 minutes (~3.3h to ~5.2h).
 */
function calculateJitterInterval() {
  const BASE = 180;
  const MIN_EXTRA = 17;
  const MAX_EXTRA = 131;
  const extra = Math.floor(Math.random() * (MAX_EXTRA - MIN_EXTRA + 1)) + MIN_EXTRA;
  return BASE + extra;
}

/**
 * Check whether the pipeline should run based on the jitter state.
 * Returns true if:
 *   - No state file exists (first run), OR
 *   - last_run_time is null, OR
 *   - minutes elapsed since last_run_time >= current_target_interval
 * Otherwise returns false.
 */
function isTimeToRun() {
  const state = readState();

  if (!state.last_run_time) {
    return true;
  }

  const last = new Date(state.last_run_time).getTime();
  const now = Date.now();
  const elapsedMs = now - last;
  const elapsedMin = elapsedMs / 60000;
  const target = state.current_target_interval;

  if (elapsedMin < target) {
    return false;
  }

  return true;
}

// ─── Feed Definitions — 30 sources, 3 tracks ──────────────────────────────

const TRACKS = [
  {
    name: 'Track 1 — Corporate Press Releases',
    feeds: [
      { label: 'Apple Newsroom',     url: 'https://apple.com/newsroom/rss-feed.rss' },
      { label: 'Google The Keyword', url: 'https://blog.google/rss/' },
      { label: 'OpenAI Blog',        url: 'https://openai.com/blog/rss/' },
      { label: 'Microsoft News',     url: 'https://news.microsoft.com/feed/' },
      { label: 'Nvidia Newsroom',    url: 'https://nvidianews.nvidia.com' },
      { label: 'Sony Japan Press',   url: 'https://sony.com/ja/SonyInfo/News/Press/' },
      { label: 'Panasonic Japan',    url: 'https://news.panasonic.com/jp/press' },
      { label: 'Anthropic News',     url: 'https://anthropic.com/news' },
      { label: 'Samsung Newsroom',   url: 'https://news.samsung.com/global/feed' },
      { label: 'LG Global News',     url: 'https://lgnewsroom.com/feed' },
    ],
  },
  {
    name: 'Track 2 — Western IT & AI',
    feeds: [
      { label: 'The Verge',          url: 'https://theverge.com/rss/index.xml' },
      { label: 'TechCrunch',         url: 'https://techcrunch.com/feed/' },
      { label: 'Ars Technica',       url: 'https://arstechnica.com/feed/' },
      { label: 'Wired',              url: 'https://wired.com/feed/rss' },
      { label: "Tom's Hardware",     url: 'https://tomshardware.com/feeds/all' },
      { label: '9to5Mac',            url: 'https://9to5mac.com/feed/' },
      { label: 'Bloomberg Tech',     url: 'https://feeds.bloomberg.com/markets/news.rss' },
      { label: 'Stratechery',        url: 'https://stratechery.com/feed/' },
      { label: 'Engadget',           url: 'https://engadget.com/rss.xml' },
      { label: 'MIT Tech Review',    url: 'https://technologyreview.com/feed/' },
    ],
  },
  {
    name: 'Track 3 — Japan IT & Gadgets',
    feeds: [
      { label: 'PC Watch',           url: 'https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf' },
      { label: 'ITmedia NEWS',       url: 'https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml' },
      { label: 'Gizmodo Japan',      url: 'https://gizmodo.jp/index.xml' },
      { label: 'ASCII.jp',           url: 'https://ascii.jp/mac/rss.xml' },
      { label: 'GIGAZINE',           url: 'https://gigazine.net/news/rss_2.0/' },
      { label: 'CNET Japan',         url: 'https://feeds.cnet.jp/rss/cnet/all.rdf' },
      { label: 'Mac Otakara',        url: 'https://macotakara.jp/blog/index.rdf' },
      { label: 'Ledge.ai',           url: 'https://ledge.ai/feed/' },
      { label: 'AV Watch',           url: 'https://av.watch.impress.co.jp/data/rss/1.0/avw/feed.rdf' },
      { label: 'Robot Start',        url: 'https://robotstart.info/feed' },
    ],
  },
];

// ─── Hot-Topic Keywords ────────────────────────────────────────────────────

const HOT_TOPIC_KEYWORDS = [
  // AI / ML
  'ai', 'artificial intelligence', 'machine learning', 'deep learning',
  'llm', 'large language model', 'gpt', 'claude', 'gemini', 'copilot',
  'openai', 'anthropic', 'google ai', 'meta ai', 'neural network',
  // Smart Home
  'smart home', 'smart speaker', 'smart display', 'home automation',
  'matter', 'thread', 'zigbee', 'homekit', 'alexa', 'google home',
  'iot', 'smart appliance', 'smart lock', 'robot vacuum',
  // IT Gadgets
  'smartphone', 'iphone', 'android', 'foldable', 'chip', 'processor',
  'cpu', 'gpu', 'npu', 'qualcomm', 'apple silicon', 'm-series',
  'laptop', 'tablet', 'wearable', 'headphones', 'display', 'oled',
  'robot', 'humanoid', 'drone', 'camera', 'sensor',
  // Japanese market context
  '日本', '日本市場', '日本語', '日本発売',
  'スマートホーム', '家電', 'ロボット', 'AI', '半導体',
];

// ─── LM Studio Lifecycle ──────────────────────────────────────────────────

/**
 * GET /v1/models — returns OpenAI-compatible model list.
 * We use this to check if LM Studio is alive and what's loaded.
 */
async function lmFetchModels() {
  try {
    const res = await fetch(`${LM_STUDIO_BASE}/v1/models`, { signal: AbortSignal.timeout(8000) });
    return await res.json();
  } catch (err) {
    console.error('[LM] Connection failed — is LM Studio running?', err.message);
    return null;
  }
}

/**
 * Wait until LM Studio is idle (no model actively processing).
 * Polls every 5 seconds, up to 60 attempts (5 min max).
 */
async function lmWaitUntilIdle() {
  for (let i = 0; i < 60; i++) {
    const data = await lmFetchModels();
    if (data === null) return false;

    // LM Studio API v1/models returns { data: [...] }
    const models = data.data || data.models || [];
    // We consider it "idle" if the server responds successfully;
    // there's no standard "status" field in OpenAI format.
    // The real check is that we can reach it.
    if (models.length >= 0) {
      console.log('[LM] Server reachable ✓');
      return true;
    }

    console.log(`[LM] Waiting for server (attempt ${i + 1}/60)...`);
    await sleep(5000);
  }

  console.error('[LM] Timed out waiting for LM Studio.');
  return false;
}

/**
 * Unload the currently loaded model via LM Studio's native API.
 * POST /api/v1/models/unload with { instance_id }.
 */
async function lmUnloadAll() {
  // First discover loaded instances
  try {
    const res = await fetch(`${LM_STUDIO_BASE}/api/v1/models`, { signal: AbortSignal.timeout(8000) });
    const data = await res.json();
    const models = data.models || [];

    for (const m of models) {
      const instances = m.loaded_instances || [];
      for (const inst of instances || []) {
        const instanceId = inst.id || m.key;
        if (instanceId) {
          try {
            await fetch(`${LM_STUDIO_BASE}/api/v1/models/unload`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ instance_id: instanceId }),
              signal: AbortSignal.timeout(10000),
            });
            console.log(`[LM] Unloaded instance: ${instanceId}`);
          } catch (err) {
            console.warn(`[LM] Failed to unload ${instanceId}:`, err.message);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[LM] Unload discovery failed:', err.message);
  }

  await sleep(2000); // let memory free
}

/**
 * Load a model by name.
 * POST /api/v1/models/load with { model: name, context_length: N }.
 */
async function lmLoadModel(modelName) {
  const body = { model: modelName };
  if (LM_LOAD_CTX) body.context_length = LM_LOAD_CTX;

  const res = await fetch(`${LM_STUDIO_BASE}/api/v1/models/load`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LM Studio load error ${res.status}: ${text}`);
  }

  const data = await res.json();
  console.log(`[LM] Loaded ${modelName} (ctx=${LM_LOAD_CTX}, time=${data.load_time_seconds || '?'}s)`);
  await sleep(2000); // let it settle
}

/**
 * Generate text via LM Studio's OpenAI-compatible endpoint.
 * POST /v1/chat/completions
 */
async function lmGenerate(systemMsg, userMsg) {
  const payload = {
    model: LM_MODEL,
    messages: [
      { role: 'system', content: systemMsg },
      { role: 'user', content: userMsg },
    ],
    temperature: 0.7,
    max_tokens: 4096,
    reasoning: 'off',   // prevents thinking tokens leaking into content
  };

  const res = await fetch(`${LM_STUDIO_BASE}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(180000), // 3 min for generation
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LM Studio API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ─── Lock Management ──────────────────────────────────────────────────────

function acquireLock() {
  if (fs.existsSync(LOCK_FILE)) {
    const stat = fs.statSync(LOCK_FILE);
    const age = Date.now() - stat.mtimeMs;
    const pid = fs.readFileSync(LOCK_FILE, 'utf-8').trim();

    if (age < LOCK_STALE_MS) {
      console.log(`[LOCK] Another run in progress (PID ${pid}, age ${Math.round(age / 1000)}s). Skipping.`);
      return false;
    }

    console.log(`[LOCK] Stale lock (PID ${pid}, age ${Math.round(age / 1000)}s). Removing.`);
    fs.unlinkSync(LOCK_FILE);
  }

  fs.writeFileSync(LOCK_FILE, String(process.pid));
  console.log(`[LOCK] Acquired (PID ${process.pid}).`);
  return true;
}

function releaseLock() {
  try {
    if (fs.existsSync(LOCK_FILE) && fs.readFileSync(LOCK_FILE, 'utf-8').trim() === String(process.pid)) {
      fs.unlinkSync(LOCK_FILE);
      console.log('[LOCK] Released.');
    }
  } catch { /* best effort */ }
}

// ─── RSS Fetching ─────────────────────────────────────────────────────────

async function fetchAllFeeds() {
  const parser = new RssParser({
    timeout: 20000,
    headers: {
      'User-Agent': 'SmartKurashi-Newsroom/2.0',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    },
    customFields: {
      item: ['summary', 'content:encoded'],
    },
  });

  const allItems = [];

  for (const track of TRACKS) {
    console.log(`\n[FEED] ${track.name}...`);

    for (const feed of track.feeds) {
      try {
        const result = await parser.parseURL(feed.url);
        const items = (result.items || []).slice(0, 10);

        for (const item of items) {
          allItems.push({
            title: item.title || '',
            content: item.contentSnippet || item.content || item.summary || '',
            link: item.link || '',
            pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
            source: feed.label,
            track: track.name,
          });
        }

        console.log(`  ✓ ${feed.label}: ${items.length} items`);
      } catch (err) {
        console.warn(`  ✗ ${feed.label}: ${err.message.slice(0, 80)}`);
      }

      await sleep(1000); // polite delay between feeds
    }
  }

  console.log(`\n[FEED] Total: ${allItems.length} items`);
  return allItems;
}

// ─── Hot-Topic Filtering ──────────────────────────────────────────────────

function filterHotTopics(items, topic) {
  const aiTechKws = [
    'ai', 'artificial intelligence', 'machine learning', 'deep learning',
    'llm', 'large language model', 'gpt', 'claude', 'gemini', 'copilot',
    'openai', 'anthropic', 'google ai', 'meta ai', 'neural network',
    'chatgpt', 'llm', 'model', 'training', 'inference',
  ];
  const smartHomeKws = [
    'smart home', 'smart speaker', 'smart display', 'home automation',
    'matter', 'thread', 'zigbee', 'homekit', 'alexa', 'google home',
    'iot', 'smart appliance', 'smart lock', 'robot vacuum',
    'smartphone', 'iphone', 'android', 'foldable', 'chip', 'processor',
    'cpu', 'gpu', 'npu', 'qualcomm', 'apple silicon', 'm-series',
    'laptop', 'tablet', 'wearable', 'headphones', 'display', 'oled',
    'robot', 'humanoid', 'drone', 'camera', 'sensor', 'semiconductor',
    'pc', 'motherboard', 'memory', 'ssd', 'monitor', 'keyboard',
  ];
  // Only apply topic filter when topic is specified; otherwise use all keywords
  const topicKws = topic
    ? (topic === 'ai-tech' ? aiTechKws : smartHomeKws)
    : [...aiTechKws, ...smartHomeKws];
  const keywordsLower = topicKws.map(k => k.toLowerCase());

  return items.filter(item => {
    const text = `${item.title} ${item.content}`.toLowerCase();
    return keywordsLower.some(kw => text.includes(kw));
  });
}

// ─── Similarity Grouping ──────────────────────────────────────────────────

function extractKeywords(item) {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'it', 'its',
    'this', 'that', 'from', 'as', 'has', 'have', 'had', 'not', 'but',
    'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each',
    'their', 'them', 'they', 'will', 'can', 'would', 'could', 'should',
    'about', 'into', 'over', 'after', 'then', 'than', 'just', 'also',
    'new', 'more', 'some', 'such', 'than', 'very', 'your', 'our',
  ]);

  const text = `${item.title} ${item.content}`.toLowerCase();
  return text
    .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
}

function groupSimilar(items, minOverlap = 2) {
  const groups = [];
  const assigned = new Set();

  for (let i = 0; i < items.length; i++) {
    if (assigned.has(i)) continue;

    const group = [items[i]];
    assigned.add(i);
    const wordsA = extractKeywords(items[i]);

    for (let j = i + 1; j < items.length; j++) {
      if (assigned.has(j)) continue;
      const wordsB = extractKeywords(items[j]);
      const overlap = wordsA.filter(w => wordsB.includes(w)).length;

      if (overlap >= minOverlap) {
        group.push(items[j]);
        assigned.add(j);
      }
    }

    groups.push(group);
  }

  console.log(`[GROUP] ${groups.length} clusters from ${items.length} hot-topic items`);
  return groups;
}

// ─── Synthesis via LM Studio ──────────────────────────────────────────────

const SYSTEM_PROMPT = `あなたは「Smart Kurashi（スマートクラシ）」の kolseo 記事執筆担当です。日本のスマートホームとAIテクノロジーに関するニュースサイトの記事を、SEO記事として書いてください。

## Universal Tone（絶対条件）
- 温かみのある会話調の日本語（です・ます調）で書いてください。お茶を飲みながら知識豊富な友達と話すように。
- 企業のプレスリリースや機械翻訳のような硬い文章は絶対に避けてください。
- 読者の日常生活に寄り添った共感的な語り口を心がけてください。
- 各段落は短く、読みやすくしてください。
- 専門用語の羅列、受動態、英語の直訳は避けてください。

## 絶対禁止事項（違反すると記事は破棄されます）
- 英語の単語・フレーズは本文・タイトル・タグのすべてで禁止。製品名（iPhone、Google等）は日本語カタカナ表記（アイフォーン、グーグル等）にしてください。
- YAMLフロントマターのtagsは日本語のみ。['AI', 'Smart Home']ではなく['人工知能', 'スマートホーム']と書いてください。
- カテゴリー（categories）は ai-tech または smart-home のみ。これらは英語表記のまま使用してください（サイトの内部カテゴリ名です）。それ以外のカテゴリー（science, article, news 等）は禁止。
- スラッグ（URL用のファイル名）は日本語のみ使用。英単語の混入禁止。
- 著者名は「Smart Kurashi 編集部」固定。それ以外の表記は禁止。

## 編集ルール
1.「日本にとっての意味は？」：すべての記事で、日本語読者にとっての具体的な影響を説明してください。製品の日本での入手可能性、日本の住宅事情にどう適合するか、電気代への影響、日本企業や規制への影響など。
2.「統合」：複数のソースから情報を引き出し、比較・対照してください。単一ソースの翻訳にならないように。
3. 出力はYAMLフロントマター付きのMDX形式で。
4. カテゴリーは ai-tech または smart-home のみ。それ以外のカテゴリー（science, article, news 等）は禁止。ai-tech = AI/テクノロジー系の話題、smart-home = 家電・スマートホーム系の話題。

## 出力形式
最初にYAMLフロントマター（title, date, categories, tags）を必ず含めてください。frontmatterは「---」で囲み、必ず「---」で閉じてから本文を書いてください。frontmatterなしの記事は破棄されます。`;

const USER_PROMPT_TEMPLATE = `以下は、複数の異なるニュースソースから集めた関連記事のグループです。これらを統合して、kolseo として1本の日本語MDX記事にしてください。

グループに含まれるソース:
{{GROUP_SUMMARY}}

Universal Tone（温かい会話調・ですます調）と編集ルール（日本視点・複数ソース統合）に従って記事を書いてください。
YAMLフロントマター（title, date, categories, tags）から始めて、本文、最後に「編集部の視点」セクションを入れてください。`;

const AFFILIATE_REVIEW_RULES = `

## アフィリエイト商品記事ルール
- これは調査レビューとして書く
- 実機体験は捏造しない
- タイトルは日本語中心で、英字は最小限にする
- 商品の強み、向いている人、向いていない人、設置・利用シーン、比較軸を入れる
- 室内サイズや設置環境の目安を自然に触れる
- 価格や在庫は断定しない
- 画像URLや生の販売URLは本文に出さない
- 1つの主題に絞って、読みやすく自然な日本語でまとめる`;

function buildGroupSummary(group) {
  return group.map((item, i) =>
    `[ソース${i + 1}: ${item.source} (${item.track})]
タイトル: ${item.title}
日付: ${item.pubDate}
URL: ${item.link}
内容: ${item.content.slice(0, 1000)}`
  ).join('\n\n---\n\n');
}

// ─── MDX Saving ───────────────────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function saveMdx(content, topic, ogImagePath) {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(content.match(/title:\s*["'](.+?)["']/)?.[1] || 'untitled');
  const filename = `${date}_${slug}.mdx`;
  const filepath = path.join(BLOG_DIR, filename);

  // Set category based on topic
  const category = topic === 'smart-home' ? 'smart-home' : 'ai-tech';

  // Strip any leading newlines before frontmatter
  let finalContent = content.replace(/^\n+/, '');

  // Validate: must have frontmatter
  if (!finalContent.trim().startsWith('---')) {
    console.warn(`[SKIP] Content has no frontmatter. Not saving ${filename}.`);
    return null;
  }

  // Validate: must have a real title (not "Untitled") and meaningful body
  const titleMatch = finalContent.match(/title:\s*["'](.+?)["']/);
  const bodyMatch = finalContent.split('---').slice(2).join('---').trim();

  if (!titleMatch || !titleMatch[1] || titleMatch[1].toLowerCase() === 'untitled' || titleMatch[1].trim() === '') {
    console.warn(`[SKIP] No valid title found. Title was: "${titleMatch?.[1] || 'none'}"`);
    return null;
  }

  if (!bodyMatch || bodyMatch.length < 100) {
    console.warn(`[SKIP] Body too short (${bodyMatch?.length || 0} chars)`);
    return null;
  }

  console.log(`[SAVE] Valid post: "${titleMatch[1].slice(0, 60)}..." (${bodyMatch.length} chars body)`);

  // Ensure YAML frontmatter has correct category and source
  // Fix category in existing frontmatter
  finalContent = finalContent.replace(/category:\s*[^\n]*/g, `category: "${category}"`);
  // Ensure source field exists
  if (!finalContent.includes('source:')) {
    finalContent = finalContent.replace(/---\n/, `---\nsource: "Smart Kurashi × @kolnews_bot"\n`);
  }
  // Add image field to frontmatter if we have one
  if (ogImagePath) {
    finalContent = finalContent.replace(/^---\nm:/, `---\nimage: "${ogImagePath}"\nm:`);
    if (!finalContent.includes('image:')) {
      finalContent = finalContent.replace(/source:\s*"([^"]+)"/, `source: "$1"\nimage: "${ogImagePath}"`);
    }
  }

  fs.writeFileSync(filepath, finalContent, 'utf-8');
  console.log(`[MDX] Saved → ${filepath} (category: ${category})`);
  return filepath;
}

// ─── Git Deploy ───────────────────────────────────────────────────────────

function gitPush(filepath) {
  const filename = path.basename(filepath);
  const title = filename.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.mdx?$/, '');

  try {
    execSync('git add .', { cwd: PROJECT_ROOT });
    execSync(`git commit -m "Auto-publish: ${title}"`, { cwd: PROJECT_ROOT });
    execSync('git push origin main', { cwd: PROJECT_ROOT, timeout: 60000 });
    console.log('[GIT] ✓ Deploy triggered on Vercel.');
  } catch (err) {
    const stderr = err.stderr?.toString() || '';
    // If nothing to commit (no changes), that's fine
    if (!stderr.includes('nothing to commit') && !stderr.includes('Everything up-to-date')) {
      console.error('[GIT] Failed:', stderr.slice(0, 300));
    } else {
      console.log('[GIT] No changes to push.');
    }
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Japanese-Only Validation ─────────────────────────────────────────────

/**
 * Reject content that contains English words in frontmatter fields.
 * Returns true if valid (Japanese-only), false if English detected.
 */
function validateJapaneseOnly(content) {
  // Check categories - must be only ai-tech or smart-home
  const catMatch = content.match(/categories:\s*\[([^\]]+)\]/);
  if (catMatch) {
    const cats = catMatch[1];
    // Extract individual category values
    const catValues = cats.match(/["']([^"']+)["']/g) || [];
    for (const cv of catValues) {
      const val = cv.replace(/["']/g, '').trim().toLowerCase();
      if (val !== 'ai-tech' && val !== 'smart-home') {
        console.warn('[VALIDATE] REJECTED: invalid category "' + val + '". Only ai-tech or smart-home allowed.');
        return false;
      }
    }
    // Also reject if categories line has unquoted English words that are not ai-tech/smart-home
    const stripped = cats.replace(/["'][^"']*["']/g, '').trim();
    if (/[a-zA-Z]{2,}/.test(stripped) && !/^(ai-tech|smart-home)(\s*,\s*(ai-tech|smart-home))?$/.test(stripped)) {
      console.warn('[VALIDATE] REJECTED: categories contain invalid English:', cats.slice(0, 80));
      return false;
    }
  }

  // Check tags - must not contain English words
  const tagMatch = content.match(/tags:\s*\[([^\]]+)\]/);
  if (tagMatch) {
    const tags = tagMatch[1];
    if (/[a-zA-Z]{2,}/.test(tags)) {
      console.warn('[VALIDATE] REJECTED: tags contain English:', tags.slice(0, 80));
      return false;
    }
  }

  // Check title - must not contain English words (allow common tech names in katakana)
  const titleMatch = content.match(/title:\s*["']?([^"'\n]+)/);
  if (titleMatch) {
    const title = titleMatch[1];
    // Allow only if title is almost entirely Japanese chars
    const enChars = (title.match(/[a-zA-Z]/g) || []).length;
    if (enChars > 10) {
      console.warn('[VALIDATE] REJECTED: title contains too much English:', title.slice(0, 60));
      return false;
    }
  }

  return true;
}

async function runPipeline(topic) {
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║        Tri-Track Newsroom — Content Engine      ║');
  console.log(`║  ${now}              ║`);
  console.log(`║  Topic: ${topic}                                  ║`);
  console.log('╚══════════════════════════════════════════════════╝');

  if (!acquireLock()) return;

  try {
    // ── Step 1: Fetch 30 RSS feeds ──
    console.log('\n📡 Step 1: Fetching RSS feeds...');
    const allItems = await fetchAllFeeds();

    // ── Step 2: Filter hot topics ──
    console.log('\n🔥 Step 2: Filtering hot topics...');
    const hotItems = filterHotTopics(allItems, topic);
    console.log(`  Topic: ${topic} | ${hotItems.length} hot-topic items found.`);

    if (hotItems.length === 0) {
      console.log('  No hot topics this cycle. Exiting.');
      return;
    }

    // ── Step 3: Group similar items ──
    console.log('\n📦 Step 3: Grouping similar items...');
    const groups = groupSimilar(hotItems);

    // ── Step 4: LM Studio lifecycle (check → wait → unload) ──
    console.log('\n🧠 Step 4: Preparing LM Studio...');
    const ready = await lmWaitUntilIdle();
    if (!ready) {
      console.error('[LM] Cannot proceed — LM Studio unreachable.');
      return;
    }

    await lmUnloadAll();                    // unload whatever is loaded
    await lmLoadModel(LM_MODEL);              // load the reasoning model

    // ── Step 4.5: Scrape OG images for each group ──
    console.log(`\n🖼️ Step 4.5: Scraping OG images for ${groups.length} groups...`);
    const ogImages = [];
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      // Pick the first article link from the group to scrape
      const firstLink = group[0]?.link;
      if (firstLink) {
        const ogUrl = await scrapeOgImage(firstLink);
        if (ogUrl) {
          const slug = slugify(group[0]?.title || `article-${i}`);
          const localPath = await downloadImage(ogUrl, slug);
          ogImages[i] = localPath;
          console.log(`  [OG] Scraped image for group ${i + 1}: ${localPath}`);
        } else {
          ogImages[i] = null;
          console.log(`  [OG] No image found for group ${i + 1}`);
        }
      } else {
        ogImages[i] = null;
      }
      await sleep(1000); // polite delay between scrapes
    }

    // ── Step 4.6: Build internal link dictionary ──
    const pendingAffiliateRows = getPendingAffiliateRows();
    const runPlan = buildRunPlan(groups, pendingAffiliateRows);
    const affiliateCount = runPlan.filter((slot) => slot.kind === 'affiliate').length;
    const normalCount = runPlan.filter((slot) => slot.kind === 'news').length;
    console.log(`\n🔀 Step 4.6: Run plan = ${normalCount} ABAB post(s) + ${affiliateCount} affiliate post(s)`);

    if (pendingAffiliateRows.length === 0) {
      console.log('  [AFFILIATE] All affiliate products are already published. Using ABAB only.');
    }

    const normalSystemPrompt = buildEditorialSystemPrompt(topic);

    // ── Step 5: Generate articles (max 3 per run) ──
    const savedFiles = [];

    for (let i = 0; i < runPlan.length; i++) {
      const slot = runPlan[i];
      console.log(`\n📝 Step 5.${i + 1}: Building ${slot.kind === 'affiliate' ? 'affiliate' : 'news'} article...`);

      let prompt;
      let systemPrompt;
      let ogImagePath = null;
      let finalTopic = topic;
      let registryProductName = null;

      if (slot.kind === 'affiliate') {
        const product = slot.product;
        registryProductName = product.productName;
        finalTopic = inferAffiliateTopic(product.productName || topic);
        systemPrompt = buildEditorialSystemPrompt(finalTopic, AFFILIATE_REVIEW_RULES);
        prompt = buildAffiliatePrompt(product);
        updateAffiliateRegistryRow(product.productName, { status: '執筆中' });

        const heroImageUrl = extractHeroImageFromProduct(product);
        if (heroImageUrl) {
          ogImagePath = await downloadImage(heroImageUrl, slugify(product.productName || `affiliate-${i}`));
          console.log(`  [IMG] Downloaded affiliate hero image: ${ogImagePath || 'none'}`);
        }
      } else {
        const group = slot.group;
        systemPrompt = normalSystemPrompt;
        const summary = buildGroupSummary(group);
        prompt = USER_PROMPT_TEMPLATE.replace('{{GROUP_SUMMARY}}', summary);

        const groupImage = ogImages[slot.index];
        ogImagePath = groupImage || null;
      }

      const content = await lmGenerate(systemPrompt, prompt);

      // Reject if English detected in frontmatter — skip this article
      if (!validateJapaneseOnly(content)) {
        console.warn('[PIPELINE] Skipping article with English content.');
        if (registryProductName) {
          updateAffiliateRegistryRow(registryProductName, { status: '未執筆', publishedUrl: '' });
        }
        continue;
      }

      // Prepend the image to the content if we have one and it is not already included
      let finalContent = content;
      if (ogImagePath && !finalContent.includes(ogImagePath)) {
        // Insert the image at the very top of the content (after frontmatter)
        const frontmatterEnd = finalContent.indexOf('---', 3) + 3;
        const before = finalContent.slice(0, frontmatterEnd);
        const after = finalContent.slice(frontmatterEnd);
        finalContent = `${before}\n![${slot.kind === 'affiliate' ? slot.product.productName : slot.group[0]?.title || ''}](${ogImagePath})\n${after}`;
        console.log(`  [IMG] Injected hero image: ${ogImagePath}`);
      }

      const filepath = saveMdx(finalContent, finalTopic, ogImagePath);
      if (filepath) {
        savedFiles.push(filepath);
        if (registryProductName) {
          updateAffiliateRegistryRow(registryProductName, {
            status: '公開済み',
            publishedUrl: buildPublishedUrl(filepath),
          });
        }
      } else {
        console.warn(`[PIPELINE] Skipped saving invalid content for slot ${i + 1}`);
        if (registryProductName) {
          updateAffiliateRegistryRow(registryProductName, { status: '未執筆', publishedUrl: '' });
        }
      }

      await sleep(2000);
    }

    // ── Step 6: Git push ──
    console.log('\n🚀 Step 6: Deploying...');
    for (const fp of savedFiles) {
      gitPush(fp);
    }

    console.log('\n✅ Pipeline complete.');

    // Save jitter state for next randomized window
    const now = new Date();
    const nextInterval = calculateJitterInterval();
    writeState(now.toISOString(), nextInterval);
  } catch (err) {
    console.error('\n❌ Pipeline error:', err.message);
    console.error(err.stack);
  } finally {
    // ── Always unload ──
    console.log('\n🧹 Final: Unloading model...');
    await lmUnloadAll();
    releaseLock();
  }
}

// ─── Cron Scheduler — Jitter Wrapper ───────────────────────────────────────

/**
 * Every-87-minute node-cron wrapper.
 * On each tick, reads .engine_state.json and checks whether enough
 * randomized time has elapsed. If not, exits quietly. If yes, runs
 * the full pipeline with ABAB topic alternation plus occasional affiliate substitutions and stores a new randomized interval.
 */
function startCron() {
  // Wake every 87 minutes — jitter state determines whether to actually run
  const WRAPPER_INTERVAL = '*/87 * * * *';

  console.log('⏰ Starting jitter scheduler (87-min wrapper)...');
  console.log(`  Poll: ${WRAPPER_INTERVAL}`);

  cron.schedule(WRAPPER_INTERVAL, () => {
    if (!isTimeToRun()) {
      process.exit(0);
    }

    // Time to run — determine ABAB topic and execute the full pipeline
    const state = readState();
    const lastTopic = state.last_topic || null;
    // ABAB: alternate between ai-tech and smart-home as the base lane;
    // affiliate posts are mixed into the run plan separately.
    const thisTopic = (lastTopic === 'ai-tech') ? 'smart-home' : 'ai-tech';
    console.log(`[TOPIC] last=${lastTopic || 'none'} → this=${thisTopic}`);

    // Save the topic immediately so it persists even if pipeline crashes
    writeState(new Date().toISOString(), calculateJitterInterval());
    // Update with topic (writeState only saves time+interval, so we patch the file)
    const newState = readState();
    newState.last_topic = thisTopic;
    fs.writeFileSync(STATE_FILE, JSON.stringify(newState, null, 2) + '\n', 'utf-8');

    runPipeline(thisTopic).catch(err => {
      console.error('[CRON] Pipeline error:', err.message);
      process.exit(1);
    });
  });

  console.log('📡 Scheduler running. Press Ctrl+C to stop.\n');
}

// ─── Entry Point ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--cron')) {
  startCron();
} else if (args.includes('--once')) {
  runPipeline().catch(() => process.exit(1));
} else if (args.includes('--dry-run-state')) {
  // STOIC EXIT CONDITION test: dry-run that generates .engine_state.json
  const now = new Date().toISOString();
  const interval = calculateJitterInterval();
  writeState(now, interval);
  const saved = readState();
  console.log(`[DRY-RUN] State file written to ${STATE_FILE}`);
  console.log(`  last_run_time:             ${saved.last_run_time}`);
  console.log(`  current_target_interval:  ${saved.current_target_interval} min`);
  const valid = saved.last_run_time && saved.current_target_interval >= 197 && saved.current_target_interval <= 311;
  console.log(`[DRY-RUN] ${valid ? '✅ VALID' : '❌ INVALID'} — interval ${saved.current_target_interval} is within [197, 311]`);
} else {
  console.log(`Usage:
  node scripts/advanced-content-engine.js --once           Run pipeline once
  node scripts/advanced-content-engine.js --cron           Start jitter scheduler (10-min wrapper)
  node scripts/advanced-content-engine.js --dry-run-state  Generate .engine_state.json and validate`);
}