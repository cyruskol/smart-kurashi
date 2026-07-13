import requests
import xml.etree.ElementTree as ET
import json
from datetime import datetime, timedelta
import time

sources = {
    "ITmedia_AI": "https://rss.itmedia.co.jp/rss/2.0/aiplus.xml",
    "ITmedia_NEWS": "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml",
    "The_Verge_AI": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    "TechCrunch_AI": "https://techcrunch.com/tag/artificial-intelligence/feed/",
    "Hacker_News": "https://hnrss.org/newest?q=AI+OR+LLM+OR+agent+OR+GPT+OR+Claude+OR+Gemini",
    "Google_News_JP_AI": "https://news.google.com/rss/search?q=AI+OR+%E4%BA%BA%E5%B7%A5%E7%9F%A5%E8%83%BD+OR+LLM+OR+%E7%94%9F%E6%88%90AI&hl=ja&gl=JP&ceid=JP:ja",
    "Google_News_EN_AI": "https://news.google.com/rss/search?q=AI+OR+LLM+OR+agent+OR+GPT+OR+Claude+OR+Gemini&hl=en&gl=US&ceid=US:en",
}

all_items = []

for name, url in sources.items():
    try:
        resp = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        root = ET.fromstring(resp.content)
        
        # Handle different RSS structures
        items = root.findall('.//item') or root.findall('.//entry')
        
        for item in items[:15]:  # Top 15 per source
            title = item.findtext('title') or item.findtext('{http://www.w3.org/2005/Atom}title') or ''
            link = item.findtext('link') or item.findtext('{http://www.w3.org/2005/Atom}link') or ''
            desc = item.findtext('description') or item.findtext('{http://www.w3.org/2005/Atom}summary') or ''
            pub_date = item.findtext('pubDate') or item.findtext('{http://www.w3.org/2005/Atom}published') or ''
            
            if title and link:
                all_items.append({
                    'source': name,
                    'title': title.strip(),
                    'link': link.strip(),
                    'description': desc.strip()[:500],
                    'pub_date': pub_date.strip()
                })
    except Exception as e:
        print(f"Error fetching {name}: {e}")

# Save
with open('/Users/gengar_chan/smart-kurashi/scripts/tmp_sources/ai_tech_sources.json', 'w') as f:
    json.dump(all_items, f, ensure_ascii=False, indent=2)

print(f"Total items fetched: {len(all_items)}")
for item in all_items[:20]:
    print(f"[{item['source']}] {item['title'][:80]}")
