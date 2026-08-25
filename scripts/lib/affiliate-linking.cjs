'use strict';

const AFFILIATE_REDIRECT_BASE = 'https://hb.afl.rakuten.co.jp/ichiba/55438527.7baf1b68.55438528.cd8b015a/';
const CTA_LABEL = /楽天|購入|価格|在庫|商品ページ|販売ページ|公式|ストア|ショップ|見る|確認|こちら|チェック|リンク|今すぐ|詳細/;
const SEMANTIC_KEYWORD = /テレビ|モニター|ディスプレイ|掃除機|窓拭きロボット|窓掃除|清掃ルート|食洗機|食器洗い|エアコン|洗濯|冷蔵庫|野菜室|冷凍室|スマートウォッチ|ウェアラブル|低温調理|サウンド|サラウンド|ホームシアター|スピーカー|イヤホン|SSD|ストレージ|転送速度|ミニPC|ノートPC|ノートパソコン|ゲーミング\s*PC|グラフィック|GPU|RTX\s*\d+|スマートフォン|折りたたみスマホ|スマートホーム|Alexa|音声アシスタント|画質|音質|映像|動画|ゲーム|ゲーミング|解像度|応答速度|リフレッシュレート|\d+\s*Hz|非光沢|ブルーライト|VESA|KVM|HDMI|HDR|Dolby|Google TV|水拭き|吸引力|障害物|自動ゴミ|モップ|マッピング|節水|洗浄力|乾燥|設置|給水|省エネ|冷房|暖房|電気代|健康|睡眠|心拍|バッテリー|AI|LLM|推論|冷却|拡張性|メモリ|データ転送|バックアップ|耐衝撃|鮮度|収納|大容量|レイトレーシング|VRAM|温度|料理|調理|操作性|安全性|静音性|耐久性|ナノイー|卓上型|自動投入|大画面|マルチタスク|カメラ|ストリーマ|内部クリーン|タンク式/i;

function extractProductUrl(input) {
  if (!input) return '';
  try {
    const url = new URL(input);
    if (url.hostname === 'hb.afl.rakuten.co.jp') {
      return url.searchParams.get('pc') || '';
    }
    if (url.hostname === 'affiliate.rakuten.co.jp') {
      return url.searchParams.get('me_url') || '';
    }
    if (url.hostname === 'item.rakuten.co.jp') return url.href;
  } catch {}
  return '';
}

function buildTrackedAffiliateUrl(input, linkType = 'hybrid_url') {
  const productUrl = extractProductUrl(input);
  if (!/^https:\/\/item\.rakuten\.co\.jp\/[^/]+\/[^/]+\//i.test(productUrl)) return '';
  return `${AFFILIATE_REDIRECT_BASE}?pc=${encodeURIComponent(productUrl)}&link_type=${linkType}`;
}

function contextualAffiliateLinks(content) {
  const links = [];
  for (const line of String(content || '').split(/\r?\n/)) {
    if (!line.trim() || /^(?:\s*#{1,6}\s|\s*>|\s*[-+*]\s+|\s*\||\s*<|\s*!\[)/.test(line)) continue;
    for (const match of line.matchAll(/\[([^\]]+)\]\((https:\/\/hb\.afl\.rakuten\.co\.jp\/[^)]+)\)/g)) {
      if (!CTA_LABEL.test(match[1])) links.push({ anchor: match[1], url: match[2] });
    }
  }
  return links;
}

function countContextualAffiliateLinks(content) {
  return contextualAffiliateLinks(content).length;
}

function isSemanticAffiliateKeyword(anchor) {
  return SEMANTIC_KEYWORD.test(String(anchor || ''));
}

function validateAffiliateDraft(content, expectedAffiliateUrl) {
  const links = contextualAffiliateLinks(content);
  const anchors = new Set(links.map((link) => link.anchor));
  const semanticAnchors = new Set(links.map((link) => link.anchor).filter(isSemanticAffiliateKeyword));
  const expectedProduct = extractProductUrl(expectedAffiliateUrl);
  const wrongDestinations = links.filter((link) => extractProductUrl(link.url) !== expectedProduct);
  const errors = [];
  if (links.length < 5 || links.length > 8) errors.push(`expected 5-8 contextual affiliate links, found ${links.length}`);
  if (anchors.size < 5) errors.push(`expected at least 5 distinct affiliate keywords, found ${anchors.size}`);
  if (semanticAnchors.size < 3) errors.push(`expected at least 3 category, feature, or use-case keywords, found ${semanticAnchors.size}`);
  if (!expectedProduct) errors.push('missing valid Rakuten product destination');
  if (wrongDestinations.length) errors.push(`${wrongDestinations.length} contextual links point to a different product`);
  return { ok: errors.length === 0, errors, count: links.length, distinct: anchors.size };
}

module.exports = {
  AFFILIATE_REDIRECT_BASE,
  buildTrackedAffiliateUrl,
  countContextualAffiliateLinks,
  extractProductUrl,
  isSemanticAffiliateKeyword,
  validateAffiliateDraft,
};
