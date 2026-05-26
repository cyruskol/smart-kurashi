# Smart Kurashi — Publish/Archive Action Log

**Date:** 2026-05-26
**Decision:** ARCHIVE (do not publish)

## Evidence

| Check | Result |
|---|---|
| Project exists at /Users/gengar_chan/smart-kurashi | Yes |
| Git repo initialized | Yes (.git/ present) |
| Branch state | main + backup-before-reset-20260524; origin/main synced |
| Last commit | 2026-05-25T02:49 — "chore: remove PR affiliate disclaimer banner from category and post pages" |
| Uncommitted changes | 7 modified files, unstaged (layout.tsx, Header.tsx, ContactForm.tsx, page.tsx, Breadcrumbs.tsx, NewsletterForm.tsx, posts.ts) |
| Working tree size | layout.tsx: -128/+89 lines; Header.tsx: major restructure |

## Reasoning

- 7 files modified but not committed — project is actively in-progress.
- Last commit was a chore (not feature-complete). No recent feature work suggests completion.
- Significant uncommitted restructuring of layout.tsx and Header.tsx indicates ongoing UI overhaul.
- Safe-to-publish cannot be confirmed due to unstaged changes across core components.

## Archive Path Suggestion

```
/Users/gengar_chan/smart-kurashi/archive/
```

Create the archive directory if it does not exist, then move or copy the project there before publishing:

```bash
mkdir -p /Users/gengar_chan/smart-kurashi/archive
cp -R /Users/gengar_chan/smart-kurashi/* /Users/gengar_chan/smart-kurashi/archive/
# Or git archive approach:
cd /Users/gengar_chan/smart-kurashi && git stash && git add -A && git commit -m "archive snapshot before publish"
```

## Recommendation

1. Commit current working tree changes first (or stash).
2. Create archive directory at `/Users/gengar_chan/smart-kurashi/archive/`.
3. Copy project contents there as a pre-publish backup.
4. Publish only after committing or stashing all uncommitted changes.
