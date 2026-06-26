import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { type ProductMetadata } from '@/lib/products';
import PRBanner from '@/components/PRBanner';

export interface RetailerLink {
  label: string;
  href: string;
}

export interface ComparisonItem {
  name: string;
  suitableFor: string;
  feature: string;
  caution: string;
  href?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewTemplateData {
  productName?: string;
  productCategory?: string;
  reviewType?: string;
  priceRange?: string;
  usagePeriod?: string;
  updatedAt?: string;
  conclusion?: string;
  suitableFor?: string[];
  notSuitableFor?: string[];
  pros?: string[];
  cons?: string[];
  experienceIntro?: string;
  experiencePoints?: string[];
  featureReviews?: { title: string; description: string }[];
  comparisonItems?: ComparisonItem[];
  finalVerdict?: string;
  faq?: FaqItem[];
  retailerLinks?: RetailerLink[];
}

function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header style={{ marginBottom: '18px' }}>
      {eyebrow ? (
        <p className="sk-eyebrow" style={{ marginBottom: '8px' }}>
          {eyebrow}
        </p>
      ) : null}
      <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.9rem)', marginBottom: description ? '10px' : 0 }}>{title}</h2>
      {description ? <p style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>{description}</p> : null}
    </header>
  );
}

export function ReviewSummaryBox({
  conclusion,
  suitableFor = [],
  notSuitableFor = [],
  pros = [],
  cons = [],
}: {
  conclusion: string;
  suitableFor?: string[];
  notSuitableFor?: string[];
  pros?: string[];
  cons?: string[];
}) {
  return (
    <section className="product-card" style={{ borderRadius: '24px' }} aria-label="結論サマリー">
      <SectionHeading eyebrow="結論サマリー" title="まず結論を知りたい人へ" />
      <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '18px' }}>{conclusion}</p>
      <div className="two-column-panel" style={{ marginTop: 0, padding: 0, border: 'none', background: 'transparent' }}>
        <div className="product-card" style={{ padding: '18px', background: '#F9FAF9' }}>
          <h3 style={{ fontSize: '1.02rem', marginBottom: '10px' }}>向いている人</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.8 }}>
            {suitableFor.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="product-card" style={{ padding: '18px', background: '#F9FAF9' }}>
          <h3 style={{ fontSize: '1.02rem', marginBottom: '10px' }}>向いていない人</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.8 }}>
            {notSuitableFor.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      <div className="two-column-panel" style={{ marginTop: '18px', padding: 0, border: 'none', background: 'transparent' }}>
        <div className="product-card" style={{ padding: '18px', background: '#FFFDF5' }}>
          <h3 style={{ fontSize: '1.02rem', marginBottom: '10px' }}>主なメリット</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.8 }}>
            {pros.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="product-card" style={{ padding: '18px', background: '#FFF7F2' }}>
          <h3 style={{ fontSize: '1.02rem', marginBottom: '10px' }}>主な注意点</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.8 }}>
            {cons.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProductInfoTable({
  rows,
}: {
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="product-card" aria-label="基本情報">
      <SectionHeading eyebrow="基本情報" title="製品の基本データ" />
      <dl className="product-facts" style={{ marginBottom: 0 }}>
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function RecommendedForBlock({ items }: { items: string[] }) {
  return (
    <section className="product-card" aria-label="この商品がおすすめな人">
      <SectionHeading eyebrow="この商品がおすすめな人" title="こんな人に合いやすい" />
      <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.9 }}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

export function NotRecommendedForBlock({ items }: { items: string[] }) {
  return (
    <section className="product-card" aria-label="おすすめしない人">
      <SectionHeading eyebrow="おすすめしない人" title="合わない可能性がある人" />
      <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.9 }}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

export function ProsConsBlock({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <section className="two-column-panel" aria-label="良い点と気になる点" style={{ padding: '24px', borderRadius: '22px' }}>
      <div>
        <SectionHeading eyebrow="良い点" title="使って分かる強み" />
        <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.9 }}>
          {pros.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div>
        <SectionHeading eyebrow="気になる点" title="先に知っておきたい注意点" />
        <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.9 }}>
          {cons.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function HandsOnExperienceBlock({
  title = '調査ベースで分かったこと',
  intro,
  items,
}: {
  title?: string;
  intro: string;
  items: string[];
}) {
  return (
    <section className="product-card" aria-label={title}>
      <SectionHeading eyebrow={title} title={title} />
      <p style={{ lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>{intro}</p>
      <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.9 }}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

export function FeatureReviewBlock({
  items,
}: {
  items: Array<{ title: string; description: string }>;
}) {
  return (
    <section className="product-card" aria-label="機能・使い勝手の詳細レビュー">
      <SectionHeading eyebrow="機能・使い勝手の詳細レビュー" title="買う前に気になるポイントを分解して確認" />
      <div style={{ display: 'grid', gap: '14px' }}>
        {items.map((item) => (
          <div key={item.title} style={{ padding: '16px', borderRadius: '18px', background: '#F9FAF9', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ marginBottom: 0, lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductComparisonBlock({
  items,
  decisionGuide,
}: {
  items: ComparisonItem[];
  decisionGuide: string;
}) {
  return (
    <section className="compare-table-wrap" aria-label="他の商品との比較">
      <SectionHeading eyebrow="他の商品との比較" title="迷ったときの比較候補" description={decisionGuide} />
      <div style={{ display: 'grid', gap: '14px' }}>
        {items.map((item) => (
          <article key={item.name} style={{ padding: '18px', borderRadius: '18px', background: '#fff', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontSize: '1.08rem', marginBottom: '6px' }}>{item.name}</h3>
                <p style={{ marginBottom: '8px', color: 'var(--color-text-secondary)' }}>向いている人：{item.suitableFor}</p>
              </div>
              {item.href ? (
                <Link href={item.href} style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
                  詳細を見る
                </Link>
              ) : null}
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.8 }}>
              <li>特徴：{item.feature}</li>
              <li>注意点：{item.caution}</li>
            </ul>
          </article>
        ))}
      </div>
      <p style={{ marginTop: '16px', marginBottom: 0, fontWeight: 700 }}>{decisionGuide}</p>
    </section>
  );
}

export function FinalVerdictBox({ verdict }: { verdict: string }) {
  return (
    <section className="buy-panel" aria-label="最終評価・結論">
      <SectionHeading eyebrow="最終評価・結論" title="最後にもう一度、買うべきかを整理" />
      <p style={{ marginBottom: 0, lineHeight: 1.9 }}>{verdict}</p>
    </section>
  );
}

export function ReviewFAQBlock({ items }: { items: FaqItem[] }) {
  return (
    <section className="product-card" aria-label="よくある質問">
      <SectionHeading eyebrow="よくある質問" title="購入前によくある疑問" />
      <div style={{ display: 'grid', gap: '14px' }}>
        {items.map((item) => (
          <details key={item.question} style={{ padding: '16px', borderRadius: '18px', background: '#F9FAF9', border: '1px solid var(--color-border)' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{item.question}</summary>
            <p style={{ marginTop: '10px', marginBottom: 0, lineHeight: 1.9, color: 'var(--color-text-secondary)' }}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function ReviewTemplate({
  post,
  data,
  product,
  sourcePage,
}: {
  post: Post;
  data: ReviewTemplateData;
  product?: ProductMetadata | null;
  sourcePage?: string;
}) {
  const resolvedProductName = product?.name || data.productName || post.title.replace(/\s*レビュー.*$/, '');
  const resolvedProductCategory = product?.category || data.productCategory || 'レビュー';
  const productSlug = product?.slug || '';
  const updatedAt = product?.updatedAt || data.updatedAt || post.date;
  const priceRange = data.priceRange || '価格は販売サイトで確認';
  const source = sourcePage || `/posts/${post.slug}`;

  const infoRows = [
    { label: '商品名', value: resolvedProductName },
    { label: 'カテゴリ', value: resolvedProductCategory },
    { label: 'グループ', value: product?.group || '—' },
    { label: '主な用途', value: product?.shortDescription || post.excerpt },
    { label: '価格帯', value: priceRange },
    { label: 'レビュー種別', value: product ? (product.reviewStatus === 'research-review' ? '調査レビュー' : product.reviewStatus) : (data.reviewType || '調査レビュー') },
    { label: '使用期間', value: product ? (product.handsOnStatus === 'used' ? '実使用あり' : product.handsOnStatus === 'not-used' ? '調査レビューのため未使用' : '不明') : (data.usagePeriod || '調査レビューのため未使用') },
    { label: '更新日', value: updatedAt },
  ];

  const summaryConclusion = product?.shortDescription
    ? `${product.shortDescription}${product.bestFor ? ` ${product.bestFor}` : ''}`.trim()
    : data.conclusion || post.excerpt;

  const summaryPros = product?.pros || data.pros || [];
  const summaryCons = product?.cons || data.cons || [];
  const summarySuitableFor = product?.recommendedFor || data.suitableFor || [];
  const summaryNotSuitableFor = product?.notRecommendedFor || data.notSuitableFor || [];

  return (
    <div style={{ display: 'grid', gap: '22px', marginTop: '24px' }}>
      <PRBanner />
      <section className="product-card" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #fff 100%)' }}>
        <p className="sk-eyebrow">{resolvedProductCategory}</p>
        <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', lineHeight: 1.2, marginBottom: '12px' }}>
          {post.title}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '10px' }}>{post.excerpt}</p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: 0 }}>
          公開日: {new Date(post.date).toLocaleDateString('ja-JP')} / 更新日: {new Date(updatedAt).toLocaleDateString('ja-JP')}
        </p>
      </section>

      <ReviewSummaryBox
        conclusion={summaryConclusion}
        suitableFor={summarySuitableFor}
        notSuitableFor={summaryNotSuitableFor}
        pros={summaryPros}
        cons={summaryCons}
      />

      <div className="two-column-panel" style={{ padding: 0, border: 'none', background: 'transparent' }}>
        <ProductInfoTable rows={infoRows} />
        <RecommendedForBlock items={summarySuitableFor} />
      </div>

      <NotRecommendedForBlock items={summaryNotSuitableFor} />

      <ProsConsBlock pros={summaryPros} cons={summaryCons} />

      <HandsOnExperienceBlock
        title={product?.handsOnStatus === 'used' ? '実際に使って感じたこと' : '調査ベースで分かったこと'}
        intro={
          product?.handsOnStatus === 'used'
            ? product?.ratingBasis || data.experienceIntro || '設置した環境、使った期間、実際の操作感をもとに整理しています。'
            : product?.ratingBasis || data.experienceIntro || '公式情報、販売ページ、口コミ、スペック、類似製品との比較をもとに整理しています。'
        }
        items={data.experiencePoints || []}
      />

      <FeatureReviewBlock items={data.featureReviews || []} />

      <ProductComparisonBlock
        items={data.comparisonItems || []}
        decisionGuide={
          data.comparisonItems && data.comparisonItems.length > 0
            ? '迷ったら、まずは自分の部屋や用途に近い候補から絞るのがおすすめです。'
            : '比較候補が少ない場合は、同カテゴリの上位機種と価格差を見て判断すると失敗しにくいです。'
        }
      />

      <FinalVerdictBox
        verdict={
          data.finalVerdict ||
          (product?.shortDescription
            ? `結論として、${resolvedProductName}は用途が合う人には有力な候補です。購入前は、価格、設置性、使い方の3点を優先して判断してください。`
            : '結論として、用途が合う人には有力な候補です。購入前は、価格、設置性、使い方の3点を優先して判断してください。')
        }
      />

      <ReviewFAQBlock items={data.faq || []} />
    </div>
  );
}
