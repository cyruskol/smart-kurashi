export type ProductCategory = 'smart-lock' | 'robot-vacuum' | 'smart-speaker' | 'smart-light';

export interface AffiliateLink {
  label: string;
  href: string;
  merchant: string;
  trackingId: string;
}

export interface ProductReview {
  slug: string;
  name: string;
  category: ProductCategory;
  maker: string;
  priceRange: string;
  rating: number;
  summary: string;
  bestFor: string[];
  cautions: string[];
  specs: Record<string, string>;
  image: string;
  affiliateLinks: AffiliateLink[];
  reviewBody: string[];
  publishedAt: string;
  updatedAt: string;
}

export const categoryMeta: Record<ProductCategory, { label: string; description: string }> = {
  'smart-lock': {
    label: 'スマートロック',
    description: '賃貸適性・原状回復・家族共有まで含めて選ぶ玄関まわりの比較',
  },
  'robot-vacuum': {
    label: 'ロボット掃除機',
    description: '間取り・段差・水拭き・自動ゴミ収集で選ぶ時短家電',
  },
  'smart-speaker': {
    label: 'スマートスピーカー',
    description: '音声操作・Matter・家族利用のしやすさで選ぶ定番デバイス',
  },
  'smart-light': {
    label: 'スマート照明',
    description: '工事不要・調光・在宅ワークとの相性で選ぶ照明',
  },
};

export const products: ProductReview[] = [
  {
    slug: 'sesame-5-smart-lock',
    name: 'SESAME 5 スマートロック',
    category: 'smart-lock',
    maker: 'CANDY HOUSE',
    priceRange: '約4,000〜7,000円台',
    rating: 4.4,
    summary: '工事不要で始めやすく、賃貸の玄関にも合わせやすいコスパ重視のスマートロック。',
    bestFor: ['賃貸で原状回復を重視したい人', 'まず低予算でスマートロックを試したい人', '家族や同居人へ一時的な鍵共有をしたい人'],
    cautions: ['ドア形状によっては追加アダプター確認が必要', '遠隔操作には別売りWi-Fiモジュールが必要な場合あり'],
    specs: {
      '工事': '不要（両面テープ固定）',
      '電池': 'CR123A',
      'Matter': '別売ハブ連携で検討',
      '賃貸適性': '高い',
    },
    image: '/logo.png',
    affiliateLinks: [
      {
        label: 'Amazonで探す',
        merchant: 'Amazon',
        trackingId: 'not-configured',
        href: 'https://www.amazon.co.jp/s?k=SESAME+5+スマートロック',
      },
      {
        label: '楽天で探す',
        merchant: 'Rakuten',
        trackingId: 'not-configured',
        href: 'https://search.rakuten.co.jp/search/mall/SESAME+5+スマートロック/',
      },
      {
        label: 'Yahooで探す',
        merchant: 'Yahoo Shopping',
        trackingId: 'not-configured',
        href: 'https://shopping.yahoo.co.jp/search?p=SESAME+5+スマートロック',
      },
      {
        label: '公式サイトを見る',
        merchant: 'Official',
        trackingId: 'not-configured',
        href: 'https://candyhouse.co/',
      },
    ],
    reviewBody: [
      'SESAME 5は「とりあえず生活をスマート化したい」人に向いた一台です。既存のサムターンに後付けしやすく、設置ハードルが低いのが魅力です。',
      '一方で、遠隔操作やオートメーションまで広げるならハブ構成も一緒に確認したいところ。Smart Kurashiでは本体価格だけでなく、追加費用込みで判断することを推奨します。',
    ],
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-05',
  },
  {
    slug: 'switchbot-robot-vacuum-k10-plus',
    name: 'SwitchBot ロボット掃除機 K10+ 系',
    category: 'robot-vacuum',
    maker: 'SwitchBot',
    priceRange: '約40,000〜70,000円台',
    rating: 4.2,
    summary: '小型ボディで日本の狭めの間取りに合わせやすい、自動ゴミ収集対応モデル。',
    bestFor: ['一人暮らし・1LDK前後の部屋', '家具の脚まわりが多い家庭', '掃除の自動化をコンパクトに始めたい人'],
    cautions: ['厚手ラグや大きな段差は事前確認が必要', '水拭き重視なら上位モデル比較が必要'],
    specs: {
      '自動ゴミ収集': '対応',
      '水拭き': 'モデルにより対応',
      'アプリ連携': 'SwitchBotアプリ',
      '日本住宅適性': '高い',
    },
    image: '/logo.png',
    affiliateLinks: [
      {
        label: 'Amazonで探す',
        merchant: 'Amazon',
        trackingId: 'not-configured',
        href: 'https://www.amazon.co.jp/s?k=SwitchBot+K10%2B',
      },
      {
        label: '楽天で探す',
        merchant: 'Rakuten',
        trackingId: 'not-configured',
        href: 'https://search.rakuten.co.jp/search/mall/SwitchBot+K10%2B/',
      },
      {
        label: '公式サイトを見る',
        merchant: 'Official',
        trackingId: 'not-configured',
        href: 'https://www.switchbot.jp/',
      },
    ],
    reviewBody: [
      'K10+系は、日本の住宅でありがちな「廊下が細い」「家具が近い」環境に合いやすいサイズ感が強みです。',
      '大型フラッグシップほど万能ではありませんが、掃除を任せる範囲を明確にすれば満足度は高くなります。',
    ],
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-05',
  },
  {
    slug: 'echo-dot-matter-hub',
    name: 'Echo Dot / Echoシリーズ',
    category: 'smart-speaker',
    maker: 'Amazon',
    priceRange: '約5,000〜12,000円台',
    rating: 4.1,
    summary: '音声操作とスマートホーム入門に強い、家族でも使いやすい定番スピーカー。',
    bestFor: ['音声で照明・家電を操作したい人', 'Amazonサービスをよく使う家庭', 'Matter対応機器を少しずつ増やしたい人'],
    cautions: ['細かな自動化はアプリ設定に慣れが必要', '音質重視なら上位スピーカーも比較したい'],
    specs: {
      '音声AI': 'Alexa',
      'Matter': '対応モデルあり',
      '設置': '置くだけ',
      '家族利用': '高い',
    },
    image: '/logo.png',
    affiliateLinks: [
      {
        label: 'Amazonで探す',
        merchant: 'Amazon',
        trackingId: 'not-configured',
        href: 'https://www.amazon.co.jp/s?k=Echo+Dot',
      },
      {
        label: '楽天で探す',
        merchant: 'Rakuten',
        trackingId: 'not-configured',
        href: 'https://search.rakuten.co.jp/search/mall/Echo+Dot/',
      },
      {
        label: 'Yahooで探す',
        merchant: 'Yahoo Shopping',
        trackingId: 'not-configured',
        href: 'https://shopping.yahoo.co.jp/search?p=Echo+Dot',
      },
      {
        label: '公式サイトを見る',
        merchant: 'Official',
        trackingId: 'not-configured',
        href: 'https://www.amazon.co.jp/',
      },
    ],
    reviewBody: [
      'Echoシリーズは、スマートホームを「毎日使う操作」に落とし込みやすいのが魅力です。声で照明やエアコンを動かすだけでも、体験はかなり変わります。',
      '購入時はMatter対応の有無、ハブ機能の有無、置き場所に合う音量を確認しましょう。',
    ],
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-05',
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.slice(0, 3);
}
