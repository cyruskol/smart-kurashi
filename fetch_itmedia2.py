import feedparser
import requests

url = "https://rss.itmedia.co.jp/rss/2.0/ait_news.xml"
response = requests.get(url, timeout=10)
feed = feedparser.parse(response.content)

for i, entry in enumerate(feed.entries[:20]):
    title = entry.get('title', '')
    link = entry.get('link', '')
    summary = entry.get('summary', entry.get('description', ''))
    print(f"{i+1}. {title}")
    print(f"   Link: {link}")
    print(f"   Summary: {summary[:300]}")
    print()
