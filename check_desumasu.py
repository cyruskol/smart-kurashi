import re

with open('/Users/gengar_chan/smart-kurashi/content/posts/2026-08-01_ai-infrastructure-cost-crisis-japan-sovereign-route-gennai.mdx', 'r') as f:
    content = f.read()

parts = content.split('---', 2)
body = parts[2] if len(parts) > 2 else ''

# Check for ですます patterns
patterns = [
    r'です。',
    r'ます。',
    r'です、',
    r'ます、',
    r'です$',
    r'ます$',
    r'です\n',
    r'ます\n',
]

for p in patterns:
    matches = re.findall(p, body)
    if matches:
        print(f"Pattern '{p}': {len(matches)} matches")

# Also check the first 500 chars of body
print("\nFirst 500 chars of body:")
print(body[:500])

# Count all です and ます
desu = len(re.findall(r'です', body))
masu = len(re.findall(r'ます', body))
print(f"\nTotal 'です': {desu}")
print(f"Total 'ます': {masu}")
print(f"Combined: {desu + masu}")
