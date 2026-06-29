import re

path = "/Users/gengar_chan/smart-kurashi/content/posts/2026-06-29_ai-three-walls-infrastructure-china-manufacturing.mdx"

with open(path, 'rb') as f:
    raw = f.read()

# Remove any EF BF BD (UTF-8 replacement char)
raw = raw.replace(b'\xef\xbf\xbd', b'')

content = raw.decode('utf-8')

# Verify no replacement chars
print(f"Replacement chars at start: {content.count(chr(0xFFFD))}")

# Further compress: merge the 三つの「壁」が交差する地点 section into simpler form
# And compress the Ford section's "AIは何ができなかったのか" subsection

# Strategy: Remove the table section (replace with inline text) and compress Ford section
lines = content.split('\n')
new_lines = []
skip_until_next_section = False
in_table = False

for i, line in enumerate(lines):
    if skip_until_next_section:
        if line.startswith('## ') or line.startswith('### '):
            skip_until_next_section = False
            new_lines.append(line)
        continue

    # Skip the table section entirely - replace with inline summary
    if '## 三つの「壁」が交差する地点' in line:
        new_lines.append('## 三つの「壁」の交差点')
        new_lines.append('')
        new_lines.append('イン�ラが足りなければモデル提供が制限される（第1の壁）。最先端モデルが制限されれば中国に追い上げられる時間的余裕が生まれる（第2の壁）。そしてAIモデルがどれだけ高度でも、現場での実用化には人間の関与が不可欠である（第3の壁）。これらは「熱狂的な期待から現実的な設計への転換点」を示しています。')
        new_lines.append('')
        skip_until_next_section = True
        continue
    
    # Compress Ford "何ができなかった" section
    if '### AIは何ができなかったのか' in line:
        new_lines.append('### AIの限界と人間の役割')
        new_lines.append('')
        new_lines.append('Fordのケースで興味深いのは「AIが完全に失敗した」わけではないという点です。AI自体の性能より「人間とAIの棲み分け」「現場の暗�知の重要性」──設計が不十分でした。再雇用されたベテランは若いスタッフのトレーニングとAIツールの再プログラミングに活用されます。')
        new_lines.append('')
        skip_until_next_section = True
        continue

    # Compress 輸出規制は効いているのか section  
    if '### 輸出規制は効いているのか' in line:
        new_lines.append('')
        skip_until_next_section = True
        continue

    new_lines.append(line)

content = '\n'.join(new_lines)

# Write back
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# Verify final
with open(path, 'r', encoding='utf-8') as f:
    final = f.read()

match = re.search(r'^---\n.*?---\n(.+)', final, re.DOTALL | re.MULTILINE)
body = match.group(1)
cjk = len(re.findall(r'[\u3000-\u9fff\u3040-\u30ff\uff00-\uffef]', body))
eng = len(re.findall(r'[a-zA-Z]+', body))
wc = cjk + int(eng * 1.5)
images = len(re.findall(r'!\[', body))
links = len(re.findall(r'smart-kurashi\.jp/posts/', body))
desumasu = len(re.findall(r'(です|ます|ました|ません|でしょう)', body))
cleaned = re.sub(r'\[.*?\]\(.*?\)', '', body)
cleaned = re.sub(r'!\[.*?\]\(.*?\)', '', cleaned)
raw_urls = len(re.findall(r'https?://', cleaned))

print(f"Final WC: {wc} (CJK:{cjk}, ENG:{eng})")
print(f"Replacement chars: {final.count(chr(0xFFFD))}")
print(f"Images: {images}")
print(f"Internal links: {links}")
print(f"です・ます: {desumasu}")
print(f"Raw URLs: {raw_urls}")
print(f"Lines: {final.count(chr(10))}")

# Check for any remaining corrupted chars in output
for i, line in enumerate(final.split('\n'), 1):
    if '\ufffd' in line:
        print(f"  CORRUPT Line {i}: {line[:100]}")
