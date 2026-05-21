'use client';

export default function ContactForm() {
  return (
    <section className="card-base p-lg md:p-xl">
      <form action="/api/contact" method="POST" className="space-y-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-sm">
            お名前 <span className="text-accent">*</span>
          </label>
          <input
            type="text" id="name" name="name" required autoComplete="name"
            placeholder="山田 太郎"
            className="w-full px-md py-sm.5 border border-border rounded-md bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-sm">
            メールアドレス <span className="text-accent">*</span>
          </label>
          <input
            type="email" id="email" name="email" required autoComplete="email"
            placeholder="example@email.com"
            className="w-full px-md py-sm.5 border border-border rounded-md bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-sm">
            お問い合わせ種別
          </label>
          <select
            id="category" name="category"
            className="w-full px-md py-sm.5 border border-border rounded-md bg-neutral text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm"
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
          <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-sm">
            お問い合わせ内容 <span className="text-accent">*</span>
          </label>
          <textarea
            id="message" name="message" required rows={6}
            placeholder="お問い合わせ内容をご記入ください。"
            className="w-full px-md py-sm.5 border border-border rounded-md bg-neutral text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-y text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-xl py-md bg-accent text-white font-semibold rounded-md hover:bg-accent-hover transition-all shadow-sm hover:shadow-glow text-sm"
        >
          送信する
        </button>
      </form>
    </section>
  );
}
