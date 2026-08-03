import feedparser
import requests
import json
from datetime import datetime, timezone
import re

sources = {
    "ITmedia_AI": "https://rss.itmedia.co.jp/rss/2.0/aitnews.xml",
    "ITmedia_NEWS": "https://rss.itmedia.co.jp/rss/2.0/news.xml",
    "The_Verge_AI": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    "TechCrunch_AI": "https://techcrunch.com/tag/artificial-intelligence/feed/",
    "Hacker_News": "https://hnrss.org/frontpage",
    "Google_News_JP": "https://news.google.com/rss/search?q=AI+%E4%BA%BA%E5%B7%A5%E7%9F%A5%E8%83%BD&hl=ja&gl=JP&ceid=JP:ja",
    "Google_News_EN": "https://news.google.com/rss/search?q=artificial+intelligence&hl=en&gl=US&ceid=US:en",
}

results = {}
for name, url in sources.items():
    try:
        feed = feedparser.parse(url)
        entries = []
        for entry in feed.entries[:10]:
            title = entry.get('title', '')
            link = entry.get('link', '')
            summary = entry.get('summary', entry.get('description', ''))
            published = entry.get('published', '')
            entries.append({
                'title': title,
                'link': link,
                'summary': summary[:500] if summary else '',
                'published': published
            })
        results[name] = entries
        print(f"✓ {name}: {len(entries)} entries")
    except Exception as e:
        print(f"✗ {name}: {e}")
        results[name] = []

with open('/tmp/sources.json', 'w') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nDone fetching sources")
