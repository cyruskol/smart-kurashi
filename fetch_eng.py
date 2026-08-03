import feedparser
import requests

sources = {
    "The_Verge_AI": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    "TechCrunch_AI": "https://techcrunch.com/tag/artificial-intelligence/feed/",
    "Hacker_News": "https://hnrss.org/frontpage",
    "Google_News_JP": "https://news.google.com/rss/search?q=AI+%E4%BA%BA%E5%B7%A5%E7%9F%A5%E8%83%BD&hl=ja&gl=JP&ceid=JP:ja",
    "Google_News_EN": "https://news.google.com/rss/search?q=artificial+intelligence&hl=en&gl=US&ceid=US:en",
}

for name, url in sources.items():
    try:
        response = requests.get(url, timeout=10)
        print(f"{name}: HTTP {response.status_code}")
        if response.status_code == 200:
            feed = feedparser.parse(response.content)
            print(f"  Entries: {len(feed.entries)}")
            for i, entry in enumerate(feed.entries[:5]):
                title = entry.get('title', 'No title')
                link = entry.get('link', '')
                print(f"  {i+1}. {title[:100]}")
                print(f"     {link}")
    except Exception as e:
        print(f"{name}: {e}")
    print()
