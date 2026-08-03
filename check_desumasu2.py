import re

with open('/Users/gengar_chan/smart-kurashi/content/posts/2026-08-01_ai-infrastructure-cost-crisis-japan-sovereign-route-gennai.mdx', 'r') as f:
    content = f.read()

parts = content.split('---', 2)
body = parts[2] if len(parts) > 2 else ''

# Search for です and ます in various forms
print("Searching for です...")
for m in re.finditer(r'です', body):
    start = max(0, m.start()-20)
    end = min(len(body), m.end()+20)
    print(f"  ...{body[start:end]}...")

print("\nSearching for ます...")
for m in re.finditer(r'ます', body):
    start = max(0, m.start()-20)
    end = min(len(body), m.end()+20)
    print(f"  ...{body[start:end]}...")

# The text may use different forms - let's check what sentence endings exist
print("\nAll sentence endings (last 2 chars before 。 or ？ or ！):")
endings = re.findall(r'.{2}[。？！]', body)
for e in endings[:30]:
    print(f"  {e}")

# Check if it's actually using ですます - maybe the text uses plain form
print("\nChecking for plain form endings (だ、である、だ。):")
plain = re.findall(r'(だ|である)[。？！]', body)
for p in plain[:20]:
    print(f"  {p}")
