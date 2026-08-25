import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const {
  buildTrackedAffiliateUrl,
  countContextualAffiliateLinks,
  validateAffiliateDraft,
} = require('./lib/affiliate-linking.cjs');

const generator = 'https://affiliate.rakuten.co.jp/link/pc/item?me_id=1&item_id=2&me_url=https%3A%2F%2Fitem.rakuten.co.jp%2Fexample%2Fsku-1%2F';
const tracked = buildTrackedAffiliateUrl(generator);
assert.match(tracked, /^https:\/\/hb\.afl\.rakuten\.co\.jp\/ichiba\//);
assert.equal(decodeURIComponent(new URL(tracked).searchParams.get('pc')), 'https://item.rakuten.co.jp/example/sku-1/');

const prose = (anchors) => anchors.map((anchor) => `[${anchor}](${tracked})は本文内で自然に説明します。`).join('\n\n');
const five = prose(['高リフレッシュレート', '応答速度', '非光沢パネル', 'ブルーライトカット', 'VESA対応']);
assert.equal(countContextualAffiliateLinks(five), 5);
assert.equal(validateAffiliateDraft(five, tracked).ok, true);
assert.equal(validateAffiliateDraft(prose(['画質', '音質', '省エネ', '設置性']), tracked).ok, false);

const nineLinks = prose(['画質', '音質', '省エネ', '設置性', '操作性', '安全性', '静音性', '拡張性', '耐久性']);
assert.equal(validateAffiliateDraft(nineLinks, tracked).ok, false);

const productNameOnly = prose(['製品A', '製品B', '製品C', '製品D', '製品E']);
const productNameOnlyResult = validateAffiliateDraft(productNameOnly, tracked);
assert.equal(productNameOnlyResult.ok, false);
assert.match(productNameOnlyResult.errors.join(' '), /category, feature, or use-case/);

console.log('Affiliate workflow tests passed.');
