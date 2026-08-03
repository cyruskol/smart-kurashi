import re

with open('/Users/gengar_chan/smart-kurashi/content/posts/2026-08-01_ai-infrastructure-cost-crisis-japan-sovereign-route-gennai.mdx', 'r') as f:
    content = f.read()

# Split frontmatter and body
parts = content.split('---', 2)
frontmatter = parts[1] if len(parts) > 1 else ''
body = parts[2] if len(parts) > 2 else ''

print("=== FRONTMATTER CHECK ===")
print(frontmatter[:500])

print("\n=== BODY CHECKS ===")

# 1. JP word count (CJK chars + english_words * 1.5)
cjk_chars = len(re.findall(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]', body))
english_words = len(re.findall(r'\b[a-zA-Z]+\b', body))
jp_word_count = cjk_chars + int(english_words * 1.5)
print(f"1. JP Word Count: {jp_word_count} (CJK: {cjk_chars}, Eng words: {english_words} * 1.5 = {int(english_words * 1.5)})")
print(f"   PASS: {jp_word_count >= 1700}")

# 2. Images count
images = re.findall(r'!\[.*?\]\((https?://[^\)]+)\)', body)
hero_img = re.search(r'heroImage:\s*"(https?://[^"]+)"', frontmatter)
total_images = len(images) + (1 if hero_img else 0)
print(f"2. Images: {total_images} (hero: {bool(hero_img)}, body: {len(images)})")
for i, img in enumerate(images):
    print(f"   Body {i+1}: {img[:80]}...")
print(f"   PASS: {total_images >= 3}")

# 3. Internal links
internal_links = re.findall(r'https://smart-kurashi\.jp/posts/[^\)\s]+', body)
print(f"3. Internal Links: {len(internal_links)}")
for link in internal_links:
    print(f"   - {link}")
print(f"   PASS: {len(internal_links) >= 2}")

# 4. Raw URLs in body (should be none except internal links and maybe image URLs)
# Check for any http URLs that are not images or internal links
all_urls = re.findall(r'https?://[^\s\)]+', body)
raw_urls = [u for u in all_urls if not u.startswith('https://images.unsplash.com') and not u.startswith('https://smart-kurashi.jp')]
print(f"4. Raw URLs in body (excluding images/internal): {len(raw_urls)}")
for u in raw_urls[:10]:
    print(f"   - {u[:100]}")
print(f"   PASS: {len(raw_urls) == 0}")

# 5. ですます count
desumasu = len(re.findall(r'です。|ます。|です、|ます、|です\.|ます\.', body))
print(f"5. ですます count: {desumasu}")
print(f"   PASS: {desumasu >= 20}")

# 6. Forbidden phrases
forbidden = ['要確認', '検証が必要', '事実確認が必要', '編集部の視点']
found_forbidden = [f for f in forbidden if f in body]
print(f"6. Forbidden phrases found: {found_forbidden}")
print(f"   PASS: {len(found_forbidden) == 0}")

# 7. Editorial ending (question to reader or forward-looking takeaway)
# Check last 1000 chars for question or forward-looking
last_section = body[-1500:]
has_question = '？' in last_section or 'か。' in last_section or 'のか。' in last_section
has_forward = any(w in last_section for w in ['問い', '判断', '決める', '答え', '未来', '次に', 'これから'])
print(f"7. Editorial ending: question={has_question}, forward-looking={has_forward}")
print(f"   Last 200 chars: ...{last_section[-200:]}")
print(f"   PASS: {has_question or has_forward}")

# 8. Category check
category_match = re.search(r'category:\s*"([^"]+)"', frontmatter)
print(f"8. Category: {category_match.group(1) if category_match else 'NOT FOUND'}")
print(f"   PASS: {category_match and category_match.group(1) == 'ai-tech'}")

# Additional: Check YAML validity
print(f"\n=== SUMMARY ===")
checks = [
    ("JP Word Count >= 1700", jp_word_count >= 1700),
    ("Images >= 3", total_images >= 3),
    ("Internal Links >= 2", len(internal_links) >= 2),
    ("No Raw URLs", len(raw_urls) == 0),
    ("ですます >= 20", desumasu >= 20),
    ("No Forbidden Phrases", len(found_forbidden) == 0),
    ("Editorial Ending", has_question or has_forward),
    ("Category = ai-tech", category_match and category_match.group(1) == 'ai-tech'),
]
all_pass = all(c[1] for c in checks)
for name, result in checks:
    status = "✓" if result else "✗"
    print(f"  {status} {name}")
print(f"\nALL CHECKS PASSED: {all_pass}")
