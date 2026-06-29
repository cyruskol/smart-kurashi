import re

path = "/Users/gengar_chan/smart-kurashi/content/posts/2026-06-29_ai-three-walls-infrastructure-china-manufacturing.mdx"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove any remaining replacement chars
content = content.replace('\ufffd', '')

# Count word count before trim
match = re.search(r'^---\n.*?---\n(.+)', content, re.DOTALL | re.MULTILINE)
body = match.group(1)
cjk = len(re.findall(r'[\u3000-\u9fff\u3040-\u30ff\uff00-\uffef]', body))
eng = len(re.findall(r'[a-zA-Z]+', body))
wc = cjk + int(eng * 1.5)
print(f"Before trim - WC: {wc} (CJK:{cjk}, ENG:{eng})")

# Trim strategy: compress the 消費者 section
# Find and replace the verbose consumer section
lines = content.split('\n')
new_lines = []
skip_until_next_section = False
for i, line in enumerate(lines):
    if skip_until_next_section:
        if line.startswith('## ') or line.startswith('### '):
            skip_until_next_section = False
            new_lines.append(line)
        continue
    
    if '## 消費者にとっての意味' in line:
        # Replace entire section with compressed version
        new_lines.append('## 消費者にとっての意味')
        new_lines.append('')
        new_lines.append('これらの変化は一般消費者にも関係します。インフラ逼迫で新機能リリースは�れる可能性があり、AIツールの選択肢は多国籍化し、AIに頼り過ぎない判断力がより重要になります。')
        new_lines.append('')
        skip_until_next_section = True
        continue
    
    if '## 今後の展望' in line:
        # Replace with compressed version
        new_lines.append('## 今後の展望')
        new_lines.append('')
        new_lines.append('当面数年は、インフラ投資の多元化、現場安定性重視のAI評価、人機協調の設計──こうした地味な取り組みに企業リソースが割かれます。それが次の世代のAI体験を支えることになります。')
        new_lines.append('')
        skip_until_next_section = True
        continue
    
    if '## まとめ' in line:
        # Replace with compressed version
        new_lines.append('## まとめ')
        new_lines.append('')
        new_lines.append('2026年6月末、AI業界は三叉の「壁」を同時に目撃しました。イン�ラ逼迫、中国の技術追従、製造現場での限界──いずれも、社会実装へ向けた通過儀礼です。')
        new_lines.append('')
        new_lines.append('AIの進化は終わりません。ただ、進むべき道筋が「性能の追求」から「人間とAIがそれぞれの強みを活かす設計」へと変わっています。')
        new_lines.append('')
        new_lines.append('あなたが普段使っているAIツールで「ここは人間の方が得意だな」と感じる瞬間は、どんなときですか？')
        new_lines.append('')
        skip_until_next_section = True
        continue
    
    new_lines.append(line)

content = '\n'.join(new_lines)

# Write back
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
with open(path, 'r', encoding='utf-8') as f:
    final = f.read()

match = re.search(r'^---\n.*?---\n(.+)', final, re.DOTALL | re.MULTILINE)
body = match.group(1)
cjk = len(re.findall(r'[\u3000-\u9fff\u3040-\u30ff\uff00-\uffef]', body))
eng = len(re.findall(r'[a-zA-Z]+', body))
wc = cjk + int(eng * 1.5)
print(f"After trim - WC: {wc} (CJK:{cjk}, ENG:{eng})")
print(f"Replacement chars: {final.count(chr(0xFFFD))}")

# Count images
images = len(re.findall(r'!\[', body))
print(f"Images: {images}")

# Count internal links
links = len(re.findall(r'smart-kurashi\.jp/posts/', body))
print(f"Internal links: {links}")

# Count です・ます
desumasu = len(re.findall(r'(です|ます|ました|ません|でしょう)', body))
print(f"です・ます: {desumasu}")

# Check raw URLs
cleaned = re.sub(r'\[.*?\]\(.*?\)', '', body)
cleaned = re.sub(r'!\[.*?\]\(.*?\)', '', cleaned)
raw_urls = len(re.findall(r'https?://', cleaned))
print(f"Raw URLs: {raw_urls}")
