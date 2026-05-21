import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要',
  description:
    'Smart Kurashiは、スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を提供する日本のテクノロジーメディアです。',
  openGraph: {
    title: '会社概要 | Smart Kurashi',
    description:
      'Smart Kurashiは、スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を提供する日本のテクノロジーメディアです。',
  },
};

export default function AboutPage() {
  return (
    <main className="py-xl bg-neutral">
      <article className="max-w-content mx-auto px-md">
        {/* Breadcrumb */}
        <nav aria-label="パンくずリスト" className="mb-lg text-sm">
          <ol className="flex items-center gap-sm">
            <li>
              <a href="/" className="text-text-muted hover:text-accent transition-colors">
                ホーム
              </a>
            </li>
            <li className="text-text-muted">/</li>
            <li className="text-text-secondary" aria-current="page">
              会社概要
            </li>
          </ol>
        </nav>

        <header className="mb-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-md">
            会社概要
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Smart Kurashiは、スマートホーム・AI家電・IoT技術の最新ニュースと専門情報を提供する日本のテクノロジーメディアです。
          </p>
        </header>

        <section className="mb-xl">
          <h2 className="text-2xl font-bold text-primary mb-lg">私たちについて</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-text-secondary leading-relaxed mb-md">
              Smart Kurashiは、「スマートなくらし」の実現をミッションに、最新のテクノロジー情報を日本語で提供しています。
              スマートホームデバイス、AI家電、IoT技術、省エネルギーソリューションなど、私たちの生活を変える技術トレンドを、専門的かつわかりやすくお届けします。
            </p>
            <p className="text-text-secondary leading-relaxed mb-md">
              AIが家の温度を自動調整し、音声アシスタントが日用品の発注を手伝い、太陽光発電と蓄電池が最適に連携する時代。
              私たちは、そんな未来のくらしに役立つ情報を発信し、読者の皆さまが最適なスマートホーム製品を選択できるようサポートします。
            </p>
            <p className="text-text-secondary leading-relaxed">
              初心者にも専門家にも価値ある情報を提供すること。それがSmart Kurashiの編集方針です。
            </p>
          </div>
        </section>

        <section className="mb-xl bg-surface rounded-lg border border-border p-lg">
          <h2 className="text-2xl font-bold text-primary mb-lg">メディア情報</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div>
              <dt className="text-sm font-medium text-text-muted mb-xs">メディア名</dt>
              <dd className="text-base text-text-primary font-medium">Smart Kurashi（スマートくらし）</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-muted mb-xs">設立</dt>
              <dd className="text-base text-text-primary font-medium">2026年</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-muted mb-xs">運営</dt>
              <dd className="text-base text-text-primary font-medium">Smart Kurashi</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-muted mb-xs">URL</dt>
              <dd className="text-base text-text-primary font-medium">
                <a href="https://smart-kurashi.jp" className="text-accent hover:text-accent-hover transition-colors">
                  smart-kurashi.jp
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-xl">
          <h2 className="text-2xl font-bold text-primary mb-lg">取り扱い分野</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="bg-surface rounded-lg border border-border p-lg">
              <h3 className="text-lg font-semibold text-primary mb-sm">スマートホーム</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                スマートスピーカー、照明、セキュリティカメラ、ドアロックなど、家庭のIoT化に関する最新情報。
              </p>
            </div>
            <div className="bg-surface rounded-lg border border-border p-lg">
              <h3 className="text-lg font-semibold text-primary mb-sm">AI & Tech</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                生成AI、機械学習、チャットボットなど、人工知能分野の最新トレンドと実用的な活用方法。
              </p>
            </div>
            <div className="bg-surface rounded-lg border border-border p-lg">
              <h3 className="text-lg font-semibold text-primary mb-sm">省エネルギー & HEMS</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                家庭のエネルギー管理システム、太陽光発電、蓄電池、EV充電など、持続可能な住まいの技術。
              </p>
            </div>
            <div className="bg-surface rounded-lg border border-border p-lg">
              <h3 className="text-lg font-semibold text-primary mb-sm">製品レビュー & 比較</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                最新デバイスの実機レビュー、製品比較ガイド、購入前のチェックリスト。
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
