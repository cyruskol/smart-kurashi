'use client';

export default function NewsletterForm() {
  return (
    <form className="flex gap-sm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="メールアドレス"
        className="flex-1 min-w-0 px-md py-sm border border-slate-600 rounded-md bg-slate-800 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        aria-label="メールアドレス"
      />
      <button
        type="submit"
        className="px-md py-sm bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent-hover transition-colors shadow-sm whitespace-nowrap"
      >
        登録
      </button>
    </form>
  );
}
