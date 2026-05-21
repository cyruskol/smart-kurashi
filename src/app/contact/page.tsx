import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'Smart Kurashiへのお問い合わせはこちらから。取材依頼、広告掲載、コンテンツに関するご質問など、お気軽にご連絡ください。',
  openGraph: {
    title: 'お問い合わせ | Smart Kurashi',
    description:
      'Smart Kurashiへのお問い合わせはこちらから。取材依頼、広告掲載、コンテンツに関するご質問など、お気軽にご連絡ください。',
  },
};

export default function ContactPage() {
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
              お問い合わせ
            </li>
          </ol>
        </nav>

        <header className="mb-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-md">
            お問い合わせ
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            取材依頼、広告掲載、コンテンツに関するご質問、その他お問い合わせは以下のフォームよりご連絡ください。
          </p>
        </header>

        <section className="bg-surface rounded-lg border border-border p-lg md:p-xl">
          <form action="/api/contact" method="POST" className="space-y-lg">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary mb-sm"
              >
                お名前 <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="山田 太郎"
                className="w-full px-md py-sm border border-border rounded-md bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-sm"
              >
                メールアドレス <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                placeholder="example@email.com"
                className="w-full px-md py-sm border border-border rounded-md bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-text-primary mb-sm"
              >
                お問い合わせ種別
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-md py-sm border border-border rounded-md bg-neutral text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              >
                <option value="">選択してください</option>
                <option value="取材依頼">取材依頼</option>
                <option value="広告掲載">広告掲載のご相談</option>
                <option value="コンテンツについて">コンテンツについて</option>
                <option value="技術的なお問い合わせ">技術的なお問い合わせ</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-primary mb-sm"
              >
                お問い合わせ内容 <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="お問い合わせ内容をご記入ください。"
                className="w-full px-md py-sm border border-border rounded-md bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-xl py-sm bg-accent text-white font-medium rounded-md hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              送信する
            </button>
          </form>
        </section>
      </article>
    </main>
  );
}
