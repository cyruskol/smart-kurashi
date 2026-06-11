import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'スマートくらしのプライバシーポリシー。個人情報、アクセス解析、Cookie、広告・アフィリエイト、ユーザーの権利について記載しています。',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'プライバシーポリシー | スマートくらし',
    description:
      'スマートくらしのプライバシーポリシー。個人情報、アクセス解析、Cookie、広告・アフィリエイト、ユーザーの権利について記載しています。',
    url: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = '2026年6月4日';

export default function PrivacyPage() {
  return (
    <main className="py-xl bg-neutral">
      <article className="max-w-content mx-auto px-md">
        <nav aria-label="パンくずリスト" className="mb-lg text-sm">
          <ol className="flex items-center gap-sm">
            <li>
              <Link href="/" className="text-text-muted hover:text-accent transition-colors">
                ホーム
              </Link>
            </li>
            <li className="text-text-muted">/</li>
            <li className="text-text-secondary" aria-current="page">
              プライバシーポリシー
            </li>
          </ol>
        </nav>

        <header className="mb-xl">
          <p className="text-sm font-semibold text-accent mb-sm">Privacy Policy</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-md">
            プライバシーポリシー
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            スマートくらし（以下「当サイト」）は、スマートホーム・AI家電・IoTに関する情報を安心して読んでいただけるよう、個人情報と閲覧データの取り扱いを以下の通り定めます。
          </p>
          <p className="text-text-muted text-sm mt-md">最終更新日: {lastUpdated}</p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">1. 収集する情報</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトでは、サイト運営、問い合わせ対応、品質改善のため、必要な範囲で以下の情報を取得する場合があります。
            </p>
            <ul className="list-disc pl-lg text-text-secondary leading-relaxed space-y-sm">
              <li>お問い合わせフォームに入力されたお名前、メールアドレス、お問い合わせ内容</li>
              <li>アクセス解析により取得される閲覧ページ、参照元、利用端末、ブラウザ、滞在時間などの統計情報</li>
              <li>Cookie、広告識別子、その他類似技術により取得される閲覧行動に関する情報</li>
            </ul>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">2. 情報の利用目的</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              取得した情報は、以下の目的で利用します。目的外利用が必要になった場合は、法令に基づき適切な対応を行います。
            </p>
            <ul className="list-disc pl-lg text-text-secondary leading-relaxed space-y-sm">
              <li>お問い合わせへの回答、本人確認、必要な連絡</li>
              <li>記事内容、導線、表示速度、検索性などサイト体験の改善</li>
              <li>不正アクセス、スパム、荒らし行為などの防止</li>
              <li>広告・アフィリエイト成果の計測、掲載内容の改善</li>
            </ul>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">3. Cookieとアクセス解析について</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトでは、Cookieを使用して閲覧状況を把握し、コンテンツ改善や利用状況の分析を行う場合があります。Cookieにより取得される情報には、単独で個人を特定できる情報は含まれません。
            </p>
            <p className="text-text-secondary leading-relaxed">
              Cookieの利用を望まない場合は、ブラウザ設定から無効化できます。ただし、一部の機能や表示が正しく動作しない場合があります。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">4. 広告・アフィリエイトについて</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトは、商品紹介記事などに広告リンク、アフィリエイトリンクを掲載する場合があります。リンク経由で商品・サービスを購入した場合、当サイトが報酬を受け取ることがあります。
            </p>
            <p className="text-text-secondary leading-relaxed">
              掲載する情報は読者の利益を優先して編集しますが、商品価格、在庫、仕様、キャンペーン内容は変更される可能性があります。購入前には販売元の最新情報をご確認ください。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">5. 第三者提供と外部サービス</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              当サイトは、法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供しません。ただし、アクセス解析、広告配信、スパム対策など、サイト運営に必要な外部サービスを利用する場合があります。
            </p>
            <p className="text-text-secondary leading-relaxed">
              外部サービスにおける情報の取り扱いは、各サービス提供者のプライバシーポリシーに従います。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">6. 個人情報の管理</h2>
            <p className="text-text-secondary leading-relaxed">
              当サイトは、個人情報の漏えい、滅失、改ざん、不正アクセスを防ぐため、合理的な安全管理措置を講じます。不要になった情報は、運営上必要な範囲を超えて保持しないよう努めます。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">7. ユーザーの権利</h2>
            <p className="text-text-secondary leading-relaxed mb-md">
              ご本人から、個人情報の開示、訂正、利用停止、削除などの請求があった場合、本人確認のうえ、法令に従って速やかに対応します。
            </p>
            <p className="text-text-secondary leading-relaxed">
              ご希望の方は、下記のお問い合わせフォームよりご連絡ください。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">8. 免責事項</h2>
            <p className="text-text-secondary leading-relaxed">
              当サイトからリンクされた外部サイトで提供される情報、サービス、商品について、当サイトは責任を負いません。また、当サイトの内容は正確性を重視して作成していますが、完全性や最新性を保証するものではありません。
            </p>
          </section>

          <section className="mb-xl">
            <h2 className="text-2xl font-bold text-primary mb-md">9. プライバシーポリシーの変更</h2>
            <p className="text-text-secondary leading-relaxed">
              本ポリシーは、法令変更、サービス内容の変更、運営方針の見直しに応じて改定されることがあります。重要な変更がある場合は、当サイト上で分かりやすく告知します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-md">10. お問い合わせ</h2>
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
