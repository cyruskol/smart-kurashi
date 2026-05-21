import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'Smart Kurashiのプライバシーポリシー。個人情報の取り扱い、Cookieの使用、アクセス解析について記載しています。',
  openGraph: {
    title: 'プライバシーポリシー | Smart Kurashi',
    description:
      'Smart Kurashiのプライバシーポリシー。個人情報の取り扱い、Cookieの使用、アクセス解析について記載しています。',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="py-xl bg-neutral">
      <article className="max-w-content mx-auto px-md">
        <nav aria-label="パンくずリスト" className="mb-lg text-sm">
          <ol className="flex items-center gap-sm">
            <li>
              <a href="/" className="text-text-muted hover:text-accent transition-colors">
                ホーム
              </a>
            </li>
            <li className="text-text-muted">/</li>
            <li className="text-text-secondary" aria-current="page">
              プライバシーポリシー
            </li>
          </ol>
        </nav>

        <header className="mb-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-md">
            プライバシーポリシー
          </h1>
          <p className="text-text-secondary text-lg">
            最終更新日: 2026年5月22日
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">1. はじめに</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              Smart Kurashi（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
              本プライバシーポリシーは、当サイトがどのように情報を収集、使用、保護するかを説明するものです。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">2. 収集する情報</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトでは、以下の情報を収集する場合があります。
            </p>
            <ul className="list-disc pl-lg text-text-secondary leading-relaxed space-y-sm">
              <li>お問い合わせフォームに入力された情報（お名前、メールアドレス、お問い合わせ内容）</li>
              <li>アクセス解析ツールによる利用状況データ（ブラウザ種類、閲覧ページ、滞在時間など）</li>
              <li>Cookieおよび類似技術による情報</li>
            </ul>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">3. 情報の利用目的</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              収集した情報は、以下の目的で利用します。
            </p>
            <ul className="list-disc pl-lg text-text-secondary leading-relaxed space-y-sm">
              <li>お問い合わせへの回答</li>
              <li>サイトの改善およびコンテンツの最適化</li>
              <li>利用状況の分析と統計データの作成</li>
            </ul>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">4. Cookieの使用</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトでは、ユーザーエクスペリエンスの向上およびアクセス解析のためにCookieを使用しています。
              ブラウザの設定によりCookieを無効にすることも可能ですが、一部の機能が正常に動作しない場合があります。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">5. アクセス解析</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトでは、Google Analyticsなどのアクセス解析ツールを使用しています。
              これらのツールは、Cookieを使用して匿名の収集データを取得します。
              個人を特定する情報は収集されません。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">6. 第三者への提供</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">7. セキュリティ</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトは、個人情報の不正アクセス、紛失、破壊、改ざん、漏洩を防ぐため、適切なセキュリティ対策を実施しています。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">8. プライバシーポリシーの変更</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              本プライバシーポリシーは、必要に応じて変更される場合があります。
              変更後のポリシーは、本サイトに掲載された時点で効力を持ちます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-md">9. お問い合わせ</h2>
            <p className="text-text-secondary leading-relaxed">
              プライバシーポリシーに関するお問い合わせは、
              <a href="/contact" className="text-accent hover:text-accent-hover transition-colors">
                お問い合わせフォーム
              </a>
              よりご連絡ください。
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
