const fs = require('fs');
const path = require('path');

const cacheDir = path.join(process.env.HOME, '.hermes', 'cache', 'images');
const blogDir = path.join(process.env.HOME, 'smart-kurashi', 'public', 'images', 'blog');

if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const imageMap = [
  { file: 'openai_codex_gpt-image-2-high_20260529_115522_9cf8c8b4.png', slug: 'ai-polymer-nanocarrier-precision-medicine' },
  { file: 'openai_codex_gpt-image-2-high_20260529_115750_c21b5e06.png', slug: 'ml-sdl-materials-discovery' },
  { file: 'openai_codex_gpt-image-2-high_20260529_115859_3f8c50d5.png', slug: 'nanomaterial-safety-ai-risk-assessment' },
  { file: 'openai_codex_gpt-image-2-high_20260529_120047_44f2f57b.png', slug: 'polymer-genome-robotics-nano' },
  { file: 'openai_codex_gpt-image-2-high_20260529_120158_81098221.png', slug: 'ai-industry-analysis' },
  { file: 'openai_codex_gpt-image-2-high_20260529_120301_f9e07ce8.png', slug: 'smart-home-beyond-smartphone' },
];

let copied = 0;
for (const { file, slug } of imageMap) {
  const src = path.join(cacheDir, file);
  const dest = path.join(blogDir, `${slug}.png`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${slug}.png (${(fs.statSync(src).size / 1024).toFixed(0)} KB)`);
    copied++;
  } else {
    console.warn(`NOT FOUND: ${file}`);
  }
}
console.log(`\nDone: ${copied}/${imageMap.length} images copied`);
