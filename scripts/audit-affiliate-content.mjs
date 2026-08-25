import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const postsDir = path.join(root, 'content/posts');
const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.mdx'));
const failures = [];
const deadTargets = [
  'directplus/omnibook-7-aero-13-bg',
  'panasonic-store/np-tml1',
  'directplus/omen16-ap-rai724',
  'item.rakuten.co.jp/xprice/',
  'item.rakuten.co.jp/ck-direct/',
  'dreame-shop/mop-pad-x30',
  'dreame-shop/detergent-cartridge',
  'dreame-shop/dust-bag-3.5l',
  'ysm-online/usb-c-cable-1m',
  'ysm-online/dp14-cable-2m',
  'ysm-online/monitor-arm-32',
  'geekom/vsa-mount',
  'geekom/gan120w-trigger',
  'b-surprise2/4589449350205',
];

for (const file of files) {
  const fullPath = path.join(postsDir, file);
  const text = fs.readFileSync(fullPath, 'utf8');
  if (/https?:\/\/affiliate\.rakuten\.co\.jp\/link\/pc\/(?:item|shop)/i.test(text)) {
    failures.push(`${file}: Rakuten dashboard/generator URL`);
  }
  if (/(?:^|\()affiliate\.rakuten\.co\.jp\/link\/pc\//m.test(text)) {
    failures.push(`${file}: affiliate URL without https scheme`);
  }
  if (/Image\s*&\s*Text|Link\s*Only|affiliate link/gi.test(text)) {
    failures.push(`${file}: English affiliate label`);
  }
  for (const match of text.matchAll(/https:\/\/hb\.afl\.rakuten\.co\.jp\/[^\s"')\]]+/g)) {
    try {
      const destination = decodeURIComponent(new URL(match[0]).searchParams.get('pc') || '');
      if (/^https?:\/\/www\.rakuten\.co\.jp\//i.test(destination)) {
        failures.push(`${file}: affiliate link points to a shop homepage instead of a product`);
      }
      const deadTarget = deadTargets.find((target) => destination.includes(target));
      if (deadTarget) failures.push(`${file}: dead Rakuten target ${deadTarget}`);
    } catch {
      failures.push(`${file}: malformed Rakuten affiliate URL`);
    }
  }
  for (const match of text.matchAll(/<a\b[^>]*href=["'][^"']*hb\.afl\.rakuten\.co\.jp[^"']*["'][^>]*>/gi)) {
    const rawAnchor = match[0];
    if (!/rel=["'][^"']*sponsored[^"']*nofollow[^"']*noopener[^"']*["']/i.test(rawAnchor)) {
      failures.push(`${file}: raw Rakuten anchor is missing sponsored/nofollow/noopener`);
    }
    if (!/target=["']_blank["']/i.test(rawAnchor)) {
      failures.push(`${file}: raw Rakuten anchor is missing target=_blank`);
    }
  }
  for (const match of text.matchAll(/\/images\/[^\s"')\]]+/g)) {
    const localUrl = match[0].split(/[?#]/)[0];
    const imagePath = path.join(root, 'public', localUrl);
    if (!fs.existsSync(imagePath)) failures.push(`${file}: missing local image ${localUrl}`);
  }
}

const expectedTargets = new Map([
  ['2026-07-07_minisforum-ai-x1-pro-mini-pc-local-ai-review.mdx', 'item.rakuten.co.jp%2Fminisforum%2Fx1pro470'],
  ['2026-08-21_gigabyte-m28u-4k-144hz-kvm-monitor-affiliate-review.mdx', 'item.rakuten.co.jp%2Fbiccamera%2F0889523024867'],
]);
for (const [file, expected] of expectedTargets) {
  const text = fs.readFileSync(path.join(postsDir, file), 'utf8');
  if (!text.includes(expected)) failures.push(`${file}: wrong affiliate product target; expected ${expected}`);
}

const postPage = fs.readFileSync(path.join(root, 'src/app/posts/[slug]/page.tsx'), 'utf8');
const affiliateAnchor = path.join(root, 'src/components/AffiliateAnchor.tsx');
if (!postPage.includes('a: AffiliateAnchor')) failures.push('MDX renderer: custom affiliate anchor is not registered');
if (!fs.existsSync(affiliateAnchor)) {
  failures.push('AffiliateAnchor component is missing');
} else {
  const anchorSource = fs.readFileSync(affiliateAnchor, 'utf8');
  if (!anchorSource.includes('sponsored nofollow noopener')) failures.push('AffiliateAnchor: required rel attributes are missing');
  if (!anchorSource.includes("target={isRakuten ? '_blank'")) failures.push('AffiliateAnchor: Rakuten links do not open safely in a new tab');
}

if (failures.length) {
  console.error(`Affiliate/content audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Affiliate/content audit passed for ${files.length} MDX posts.`);
