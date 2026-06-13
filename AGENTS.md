# AGENTS.md — smart-kurashi.jp

**Project**: smart-kurashi.jp — Japanese product discovery / review / comparison site
**Stack**: Next.js (App Router), TypeScript, Tailwind CSS
**Deploy**: Vercel

---

## Project Constitution

1. **smart-kurashi.jp is a Japanese product discovery/review/comparison site**
2. **Top navigation must remain**: AI・テック / 家電・ガジェット / 商品を探す / 比較・ランキング
3. **No fake reviews, prices, ratings, or hands-on claims** — ever
4. **Product metadata is source of truth** — never hardcode values
5. **Review templates use headings/subheadings**, not numbered section labels
6. **No affiliate-related public wording** unless explicitly requested
7. **Implementation tasks must run build/lint/typecheck**
8. **Risky changes should use git worktrees**
9. **All visible text must be Japanese** — no English labels, headers, or table headers
10. **Use 旅行・出張** never 航

---

## Navigation Structure

```
/                          ← Homepage
/ai-tech                   ← AI・テック category
/smart-home                ← 家電・ガジェット category  
/products                  ← 商品を探す (product discovery)
/products/[slug]           ← Product detail page
/compare                   ← 比較・ランキング
/compare/[slug]            ← Comparison page
/posts/[slug]              ← Blog/review post
```

---

## Content Rules

- Japanese product reviews target **2,500–4,000 words**
- Review structure: Introduction → Specs → Detailed Review → Pros/Cons → Who Should Buy → Verdict
- All product data from metadata system (never hardcoded)
- E-E-A-T signals required: author bio, credentials, first-hand experience markers

---

## Implementation Rules

- **Always run**: `npm run build && npm run lint && npx tsc --noEmit`
- **Use git worktrees** for implementation tasks
- **Never edit main branch directly**
- **MDX raw HTML tables can break builds** — use client React components instead
- **Post ordering depends on frontmatter date strings** — use consistent ISO format (YYYY-MM-DD)

---

## Longer Workflows

Detailed workflows are stored in:
- **Obsidian AI Vault**: `AI_Vault/Playbooks/smart-kurashi_*.md`
- **Hermes Skills**: `~/.hermes/skills/smart-kurashi/`

Do not duplicate long external skill instructions in this file.
Keep this file as the short project constitution.
