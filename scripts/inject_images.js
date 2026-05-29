const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.env.HOME, 'smart-kurashi', 'content', 'posts');
const IMG_BASE = '/images/blog';

// Map post filename patterns to their generated image
const updates = [
  { pattern: 'ai-polymer-nanocarrier', image: 'ai-polymer-nanocarrier-precision-medicine.png' },
  { pattern: 'ml-sdl-materials', image: 'ml-sdl-materials-discovery.png' },
  { pattern: 'nanomaterial-safety', image: 'nanomaterial-safety-ai-risk-assessment.png' },
  { pattern: 'polymer-genome-robotics', image: 'polymer-genome-robotics-nano.png' },
  { pattern: '2026-05-22_ai-industry', image: 'ai-industry-analysis.png' },
  { pattern: '2026-05-24_smart-home', image: 'smart-home-beyond-smartphone.png' },
];

function countWords(content) {
  // Strip frontmatter and markdown
  const clean = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/[#*_\-<>`]/g, '')
    .replace(/\s+/g, '');
  // Approx: 1.5 chars per Japanese word
  return Math.round(clean.length / 1.5);
}

function injectImage(content, imagePath, title) {
  // Add image: field to frontmatter (after source: or category: line)
  let updated = content;

  // Inject image field into frontmatter
  if (updated.match(/source:\s*"([^"]+)"/)) {
    updated = updated.replace(/(source:\s*"[^"]*")/, `$1\nimage: "${imagePath}"`);
  } else if (updated.match(/category:\s*"([^"]+)"/)) {
    updated = updated.replace(/(category:\s*"[^"]*")/, `$1\nimage: "${imagePath}"`);
  }

  // Inject image markdown at top of body (after frontmatter closing ---)
  const fmEnd = updated.indexOf('---', 3) + 3;
  const before = updated.slice(0, fmEnd);
  const after = updated.slice(fmEnd);
  updated = `${before}\n![${title}](${imagePath})\n${after}`;

  return updated;
}

let done = 0;
for (const { pattern, image } of updates) {
  // Find matching file
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.includes(pattern));
  if (files.length === 0) { console.warn(`NOT FOUND: ${pattern}`); continue; }

  const filepath = path.join(POSTS_DIR, files[0]);
  let content = fs.readFileSync(filepath, 'utf-8');

  // Skip if already has image
  if (content.includes('image:') && content.includes('/images/blog/')) {
    console.log(`SKIP (already has image): ${files[0]}`);
    continue;
  }

  // Check word count
  const wordCount = countWords(content);
  if (wordCount > 2600) {
    console.log(`SKIP (word count ${wordCount} near limit): ${files[0]}`);
    continue;
  }

  // Extract title from frontmatter
  const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1].trim() : files[0];

  // Inject image
  const imagePath = `${IMG_BASE}/${image}`;
  content = injectImage(content, imagePath, title);

  // Write back
  fs.writeFileSync(filepath, content, 'utf-8');
  const newWordCount = countWords(content);
  console.log(`✅ ${files[0]}: image added (${wordCount} → ${newWordCount} words)`);
  done++;
}

console.log(`\nDone: ${done} posts updated with images`);
