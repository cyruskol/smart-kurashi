#!/usr/bin/env python3
"""
Verification script for Smart Kurashi articles.
Run on the actual .mdx file before publishing.
"""

import re
import sys
from pathlib import Path


def verify_article(filepath: Path) -> tuple[bool, list[str]]:
    """Run all verification checks. Returns (passed, errors)."""
    content = filepath.read_text(encoding="utf-8")

    # Strip frontmatter
    body = re.sub(r"^---.*?---", "", content, flags=re.DOTALL).strip()

    errors = []

    # 1. JP word count >= 1700
    cjk_chars = len(re.findall(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", body))
    eng_words = len(re.findall(r"[A-Za-z]+", body))
    jp_words = cjk_chars + int(eng_words * 1.5)
    if jp_words < 1700:
        errors.append(f"JP word count: {jp_words} < 1700 (CJK={cjk_chars}, ENG={eng_words})")

    # 2. Images >= 3 (hero + 2 body)
    body_images = len(re.findall(r"!\[.*?\]\(https?://", body))
    frontmatter_hero = 1 if "heroImage:" in content else 0
    frontmatter_body = len(re.findall(r"bodyImage\d:", content))
    total_images = body_images + frontmatter_hero + frontmatter_body
    if total_images < 3:
        errors.append(f"Images: {total_images} < 3 (body={body_images}, frontmatter={frontmatter_hero + frontmatter_body})")

    # 3. Internal links >= 2
    internal_links = len(re.findall(r"https://smart-kurashi\.jp/posts/", body))
    if internal_links < 2:
        errors.append(f"Internal links: {internal_links} < 2")

    # 4. Raw URLs == 0 in body
    raw_urls = re.findall(r"(?<!\])\((https?://[^\s\)]+)", body)
    filtered_raw = [u for u in raw_urls if not u.endswith((".jpg", ".jpeg", ".png", ".webp", ".gif"))]
    if filtered_raw:
        errors.append(f"Raw URLs in body: {len(filtered_raw)} found (e.g., {filtered_raw[0][:80]}...)")

    # 5. です・ます density >= 20
    desu_masu = len(re.findall(r"です|ます|でした|ました|ください|くださいませ|ございます|でございます|いたします|させていただきます", body))
    if desu_masu < 20:
        errors.append(f"です・ます count: {desu_masu} < 20")

    # 6. Forbidden phrases
    forbidden = ["要確認", "検証が必要", "事実確認が必要", "編集部の視点"]
    found_forbidden = [f for f in forbidden if f in body]
    if found_forbidden:
        errors.append(f"Forbidden phrases found: {found_forbidden}")

    # 7. Editorial ending (natural question/forward-looking, NOT "編集部の視点" heading)
    last_para = body.strip().split("\n\n")[-1] if body.strip() else ""
    has_editorial_heading = "## 編集部の視点" in body or "### 編集部の視点" in body
    ends_with_question = last_para.rstrip().endswith(("?", "？", "。"))
    if has_editorial_heading:
        errors.append("Contains forbidden heading '編集部の視点'")
    if not ends_with_question:
        errors.append("Final paragraph does not end with question/forward-looking takeaway")

    # 8. Category is ai-tech or smart-home
    cat_match = re.search(r"category:\s*[\"']?(ai-tech|smart-home)[\"']?", content)
    if not cat_match:
        errors.append("Category not ai-tech or smart-home")

    # 9. Affiliate links (if affiliate article) - check for 2+ distinct rakuten.co.jp
    is_affiliate = "affiliate" in filepath.name.lower() or "review" in filepath.name.lower()
    if is_affiliate:
        rakuten_links = set(re.findall(r"https?://(?:hb\.afl\.)?rakuten\.co\.jp/[^\s\)]+", body))
        if len(rakuten_links) < 2:
            errors.append(f"Affiliate article but only {len(rakuten_links)} distinct rakuten.co.jp links")

    return len(errors) == 0, errors


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python verify-article.py <path-to-mdx>")
        sys.exit(1)

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"File not found: {path}")
        sys.exit(1)

    passed, errors = verify_article(path)
    if passed:
        print("✅ ALL CHECKS PASSED")
        sys.exit(0)
    else:
        print("❌ VERIFICATION FAILED:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)