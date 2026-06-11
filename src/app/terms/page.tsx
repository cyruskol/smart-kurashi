import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: '利用規約',
  description:
    'スマートくらし の利用規約。サイトのご利用にあたっての条件や注意事項を記載しています。',
  openGraph: {
    title: '利用規約 | スマートくらし',
    description:
      'スマートくらし の利用規約。サイトのご利用にあたっての条件や注意事項を記載しています。',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PageProps {}

export default function TermsPage({}: PageProps) {
  const breadcrumbItems = [
    { label: 'ホーム', href: 'https://smart-kurashi.jp/' },
    { label: '利用規約', href: 'https://smart-kurashi.jp/terms' },
  ];

  return (
    <main className="py-xl bg-neutral">
      <article className="max-w-content mx-auto px-md">
        {/* Breadcrumbs with JSON-LD */}
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-md">
            利用規約
          </h1>
          <p className="text-text-secondary text-lg">
            最終更新日: 2026年5月22日
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">1. はじめに</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              本利用規約（以下「本規約」）は、スマートくらし（以下「当サイト」）の利用条件を定めるものです。
              当サイトをご利用いただくことで、本規約に同意したものとみなします。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">2. サービスの提供</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトは、スマートホーム・AI家電・IoT技術に関するニュース、レビュー、比較ガイドなどのコンテンツを提供します。
              当サイトは、予告なしにサービスの内容を変更、中断、終了する場合があります。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">3. 知的財産権</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトに掲載される記事、画像、デザイン、ロゴなどのコンテンツは、当サイトまたは権利者に帰属します。
              無断での複製、転載、改変、商用利用を禁止します。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">4. 禁止事項</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトの利用にあたり、以下の行為を禁止します。
            </p>
            <ul className="list-disc pl-lg text-text-secondary leading-relaxed space-y-sm">
              <li>法令または公序良俗に反する行為</li>
              <li>当サイトまたは第三者の権利を侵害する行為</li>
              <li>不正アクセス、システムへの攻撃行為</li>
              <li>スパム、迷惑行為</li>
              <li>コンテンツの無断転載、商用利用</li>
              <li>その他、当サイトが不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">5. 免責事項</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトの情報は、正確性と信頼性に努めていますが、その内容を保証するものではありません。
              当サイトの利用によって生じた損害について、当サイトは一切の責任を負いません。
              製品の購入やサービスの利用にあたっては、ご自身の判断でお願いいたします。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">6. 広告について</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトには、第三者の広告が掲載される場合があります。
              広告主の商品・サービスに関するお問い合わせは、広告主に直接ご連絡ください。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">7. リンクについて</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトは原則としてリンクフリーです。ただし、リンク元のサイトの内容が当サイトの信用を損なう場合には、リンクの削除をお願いする場合があります。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">8. 規約の変更</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              本規約は、必要に応じて変更される場合があります。
              変更後の規約は、当サイトに掲載された時点で効力を持ちます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-md">9. 準拠法</h2>
            <p className="text-text-secondary leading-relaxed">
              本規約の解釈および適用は、日本法に準拠するものとします。
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
