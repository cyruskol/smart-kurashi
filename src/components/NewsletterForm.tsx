'use client';

export default function NewsletterForm() {
  return (
    <form className="flex gap-sm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="メールアドレス"
        className="flex-1 min-w-0 px-md py-sm border border-border rounded-md bg-neutral text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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
