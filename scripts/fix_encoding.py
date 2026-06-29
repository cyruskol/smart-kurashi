import re

path = '/Users/gengar_chan/smart-kurashi/content/posts/2026-06-29_ai-three-walls-infrastructure-china-manufacturing.mdx'

with open(path, 'rb') as f:
    raw = f.read()

# Find bytes that represent U+FFFD (EF BF BD) and remove them
cleaned = raw.replace(b'\xef\xbf\xbd', b'')

# Also remove any lone bytes that might cause issues
content = cleaned.decode('utf-8')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
with open(path, 'r', encoding='utf-8') as f:
    final = f.read()

ffd = final.count('\ufffd')
print(f"Replacement chars remaining: {ffd}")

if ffd > 0:
    for i, line in enumerate(final.split('\n'), 1):
        if '\ufffd' in line:
            print(f"  Line {i}: {line[:120]}")

# Final word count
match = re.search(r'^---\n.*?---\n(.+)', final, re.DOTALL | re.MULTILINE)
body = match.group(1)
cjk = len(re.findall(r'[\u3000-\u9fff\u3040-\u30ff\uff00-\uffef]', body))
eng = len(re.findall(r'[a-zA-Z]+', body))
wc = cjk + int(eng * 1.5)
images = len(re.findall(r'!\[', body))
links = len(re.findall(r'smart-kurashi\.jp/posts/', body))
desumasu = len(re.findall(r'(です|ます|ました|ません|でしょう)', body))

cleaned_body = re.sub(r'\[.*?\]\(.*?\)', '', body)
cleaned_body = re.sub(r'!\[.*?\]\(.*?\)', '', cleaned_body)
raw_urls = len(re.findall(r'https?://', cleaned_body))

print(f"\n=== FINAL VERIFICATION ===")
print(f"WC: {wc} (CJK:{cjk}, ENG:{eng})")
print(f"Images: {images}")
print(f"Internal links: {links}")
print(f"です・ます: {desumasu}")
print(f"Raw URLs: {raw_urls}")

all_pass = True
checks = [
    ("WC >= 1700", wc >= 1700),
    ("WC <= 3500", wc <= 3500),
    ("Images >= 3", images >= 3),
    ("Internal links >= 2", links >= 2),
    ("Raw URLs = 0", raw_urls == 0),
    ("です・ます >= 20", desumasu >= 20),
    ("No replacement chars", ffd == 0),
]
for name, result in checks:
    status = "PASS" if result else "FAIL"
    if not result:
        all_pass = False
    print(f"  {status}: {name}")

print(f"\n{'ALL PASSED' if all_pass else 'SOME FAILED'}")
