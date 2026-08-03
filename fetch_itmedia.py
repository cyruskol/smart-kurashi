import feedparser
import requests

# Try different ITmedia URLs
urls = {
    "ITmedia_AI_alt": "https://rss.itmedia.co.jp/rss/2.0/ai.xml",
    "ITmedia_AI_alt2": "https://rss.itmedia.co.jp/rss/2.0/aitnews.xml",
    "ITmedia_NEWS_alt": "https://rss.itmedia.co.jp/rss/2.0/news.xml",
    "ITmedia_NEWS_alt2": "https://rss.itmedia.co.jp/rss/2.0/ait_news.xml",
}

for name, url in urls.items():
    try:
        response = requests.get(url, timeout=10)
        print(f"{name}: HTTP {response.status_code}")
        if response.status_code == 200:
            feed = feedparser.parse(response.content)
            print(f"  Entries: {len(feed.entries)}")
            for i, entry in enumerate(feed.entries[:3]):
                print(f"  {i+1}. {entry.get('title', 'No title')[:80]}")
    except Exception as e:
        print(f"{name}: {e}")
