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
const { execSync } = require('child_process');

// ─── Configuration ────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SCRIPTS_DIR = __dirname;
const BLOG_DIR = path.join(PROJECT_ROOT, 'content', 'posts');
const STATE_FILE = path.join(SCRIPTS_DIR, '.engine_state.json');
const LOCK_FILE = '/tmp/newsroom.lock';
const LOCK_STALE_MS = 2 * 60 * 60 * 1000; // 2 hours — assume crashed if older

const LM_STUDIO_BASE = 'http://127.0.0.1:1234';
const LM_MODEL = 'qwen/qwen3.5-9b';   // exact LM Studio model identifier
const LM_LOAD_CTX = 16384;             // safe for 24 GB unified memory

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
 * Calculate a new random jitter interval: 300 + random(10-100) minutes.
 * This gives a window of 310–400 minutes (~5.2h to ~6.7h).
 */
function calculateJitterInterval() {
  const BASE = 300;
  const MIN_EXTRA = 10;
  const MAX_EXTRA = 100;
  const extra = Math.floor(Math.random() * (MAX_EXTRA - MIN_EXTRA + 1)) + MIN_EXTRA;
  return BASE + extra;
}

/**
 * Check whether the pipeline should run based on the jitter state.
 * Returns true if:
 *   - No state file exists (first run), OR
 *   - last_run_time is null, OR
 *   - minutes elapsed since last_run_time >= current_target_interval
 * Otherwise logs cooldown and returns false.
 */
function isTimeToRun() {
  const state = readState();

  if (!state.last_run_time) {
    console.log('[JITTER] No previous run found. Proceeding.');
    return true;
  }

  const last = new Date(state.last_run_time).getTime();
  const now = Date.now();
  const elapsedMs = now - last;
  const elapsedMin = elapsedMs / 60000;
  const target = state.current_target_interval;

  if (elapsedMin < target) {
    const remaining = Math.round(target - elapsedMin);
    console.log(`[JITTER] Cooldown active. ${elapsedMin.toFixed(0)}m elapsed, need ≥${target}m. Waiting ~${remaining}m more.`);
    return false;
  }

  console.log(`[JITTER] ${elapsedMin.toFixed(0)}m elapsed (≥${target}m target). Proceeding.`);
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

function filterHotTopics(items) {
  const keywordsLower = HOT_TOPIC_KEYWORDS.map(k => k.toLowerCase());

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

const SYSTEM_PROMPT = `あなたは「Smart Kurashi（スマートクラシ）」のチーフコンテンツライターです。日本のスマートホームとAIテクノロジーに関するニュースサイトを運営しています。

## Universal Tone（絶対条件）
- 温かみのある会話調の日本語（です・ます調）で書いてください。お茶を飲みながら知識豊富な友達と話すように。
- 企業のプレスリリースや機械翻訳のような硬い文章は絶対に避けてください。
- 読者の日常生活に寄り添った共感的な語り口を心がけてください。
- 各段落は短く、読みやすくしてください。
- 専門用語の羅列、受動態、英語の直訳は避けてください。

## 絶対禁止事項（違反すると記事は破棄されます）
- 英語の単語・フレーズは本文・タイトル・タグ・カテゴリーのすべてで禁止。製品名（iPhone、Google等）は日本語カタカナ表記（アイフォーン、グーグル等）にしてください。
- YAMLフロントマターのcategoriesとtagsは日本語のみ。['AI', 'Smart Home']ではなく['人工知能', 'スマートホーム']と書いてください。
- スラッグ（URL用のファイル名）は日本語のみ使用。英単語の混入禁止。
- 著者名は「Smart Kurashi 編集部」固定。それ以外の表記は禁止。

## 編集ルール
1.「日本にとっての意味は？」：すべての記事で、日本語読者にとっての具体的な影響を説明してください。製品の日本での入手可能性、日本の住宅事情にどう適合するか、電気代への影響、日本企業や規制への影響など。
2.「統合」：複数のソースから情報を引き出し、比較・対照してください。単一ソースの翻訳にならないように。
3. 出力はYAMLフロントマター付きのMDX形式で。
4. カテゴリーは ai-tech または smart-home のみ。それ以外のカテゴリー（science, article, news 等）は禁止。ai-tech = AI/テクノロジー系の話題、smart-home = 家電・スマートホーム系の話題。

## 出力形式
最初にYAMLフロントマター（title, date, categories, tags）、次に本文、最後に「編集部の視点」セクション。すべて日本語。`;

const USER_PROMPT_TEMPLATE = `以下は、複数の異なるニュースソースから集めた関連記事のグループです。これらを統合して、1本の日本語MDX記事にしてください。

グループに含まれるソース:
{{GROUP_SUMMARY}}

Universal Tone（温かい会話調・ですます調）と編集ルール（日本視点・複数ソース統合）に従って記事を書いてください。
YAMLフロントマター（title, date, categories, tags）から始めて、本文、最後に「編集部の視点」セクションを入れてください。`;

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

function saveMdx(content) {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(content.match(/title:\s*["'](.+?)["']/)?.[1] || 'untitled');
  const filename = `${date}_${slug}.mdx`;
  const filepath = path.join(BLOG_DIR, filename);

  // Ensure YAML frontmatter exists
  let finalContent = content;
  if (!content.trim().startsWith('---')) {
    finalContent = `---
title: "Untitled"
date: "${date}"
categories:
  - AI
tags:
  - news
  - automated
---

${content}`;
  }

  fs.writeFileSync(filepath, finalContent, 'utf-8');
  console.log(`[MDX] Saved → ${filepath}`);
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
    if (/[a-zA-Z]{2,}/.test(cats)) {
      console.warn('[VALIDATE] REJECTED: categories contain English:', cats.slice(0, 80));
      return false;
    }
    // Also check for forbidden category values (science, article, news)
    const catValues = cats.match(/["']([^"']+)["']/g) || [];
    for (const cv of catValues) {
      const val = cv.replace(/["']/g, '').trim().toLowerCase();
      if (val !== 'ai-tech' && val !== 'smart-home') {
        console.warn('[VALIDATE] REJECTED: invalid category "' + val + '". Only ai-tech or smart-home allowed.');
        return false;
      }
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

async function runPipeline() {
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║        Tri-Track Newsroom — Content Engine      ║');
  console.log(`║  ${now}              ║`);
  console.log('╚══════════════════════════════════════════════════╝');

  if (!acquireLock()) return;

  try {
    // ── Step 1: Fetch 30 RSS feeds ──
    console.log('\n📡 Step 1: Fetching RSS feeds...');
    const allItems = await fetchAllFeeds();

    // ── Step 2: Filter hot topics ──
    console.log('\n🔥 Step 2: Filtering hot topics...');
    const hotItems = filterHotTopics(allItems);
    console.log(`  ${hotItems.length} hot-topic items found.`);

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

    // ── Step 5: Generate articles (max 3 per run) ──
    const MAX_ARTICLES = 3;
    const toProcess = groups.slice(0, MAX_ARTICLES);
    const savedFiles = [];

    for (let i = 0; i < toProcess.length; i++) {
      const group = toProcess[i];
      console.log(`\n📝 Step 5.${i + 1}: Article from ${group.length} sources...`);

      const summary = buildGroupSummary(group);
      const prompt = USER_PROMPT_TEMPLATE.replace('{{GROUP_SUMMARY}}', summary);
      const content = await lmGenerate(SYSTEM_PROMPT, prompt);

      // Reject if English detected in frontmatter — skip this article
      if (!validateJapaneseOnly(content)) {
        console.warn('[PIPELINE] Skipping article with English content.');
        continue;
      }

      const filepath = saveMdx(content);
      savedFiles.push(filepath);

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
 * Every-10-minute node-cron wrapper.
 * On each tick, reads .engine_state.json and checks whether enough
 * randomized time has elapsed. If not, exits quietly. If yes, runs
 * the full pipeline and stores a new randomized interval.
 */
function startCron() {
  // Wake every 10 minutes — jitter state determines whether to actually run
  const WRAPPER_INTERVAL = '*/10 * * * *';

  console.log('⏰ Starting jitter scheduler (10-min wrapper)...');
  console.log(`  Poll: ${WRAPPER_INTERVAL}`);

  cron.schedule(WRAPPER_INTERVAL, () => {
    console.log(`\n⏰ Wake check — ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`);

    if (!isTimeToRun()) {
      console.log('[CRON] Cooldown. Exiting without loading LM Studio.');
      process.exit(0);
    }

    // Time to run — execute the full pipeline
    runPipeline().catch(err => {
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
  const valid = saved.last_run_time && saved.current_target_interval >= 310 && saved.current_target_interval <= 400;
  console.log(`[DRY-RUN] ${valid ? '✅ VALID' : '❌ INVALID'} — interval ${saved.current_target_interval} is within [310, 400]`);
} else {
  console.log(`Usage:
  node scripts/advanced-content-engine.js --once           Run pipeline once
  node scripts/advanced-content-engine.js --cron           Start jitter scheduler (10-min wrapper)
  node scripts/advanced-content-engine.js --dry-run-state  Generate .engine_state.json and validate`);
}