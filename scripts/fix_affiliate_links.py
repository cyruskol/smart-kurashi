import re, os

REGISTRY = '/Users/gengar_chan/Documents/AI_Vault/Projects/Smart_Kurashi/Affiliate_Link_Registry.md'
POSTS_DIR = '/Users/gengar_chan/smart-kurashi/content/posts'

ARTICLE_PRODUCT_MAP = {
    '2026-06-21_iphone-17-review.mdx': 'iPhone 17',
    '2026-06-21_panasonic-nr-f49ey3-refrigerator-review.mdx': '冷蔵庫 490L',
    '2026-06-25_panasonic-ny-pcze2-ai-camera-review.mdx': 'NY-PCZE2',
}

def get_registry_products():
    with open(REGISTRY, 'r') as f:
        content = f.read()
    products = {}
    for line in content.split('\n'):
        if line.startswith('|') and 'rakuten' in line and '商品名' not in line and '---' not in line:
            cells = [c.strip() for c in line.split('|')]
            if len(cells) >= 6:
                name = cells[1].strip()
                img = cells[3].strip()
                lnk = cells[4].strip()
                img_urls = re.findall(r'https?://[^\s"]*affiliate\.rakuten[^\s"]+', img)
                lnk_urls = re.findall(r'https?://[^\s"]*affiliate\.rakuten[^\s"]+', lnk)
                if img_urls or lnk_urls:
                    products[name] = {'img': img_urls, 'lnk': lnk_urls}
    return products

def has_rakuten_hrefs(content):
    return len(re.findall(r'href="[^"]*rakuten', content))

def find_product(product_key, products):
    for name, urls in products.items():
        if product_key.lower() in name.lower():
            return name, urls
    return None, None

def inject_section(content, name, urls):
    img_url = urls['img'][0] if urls['img'] else None
    lnk_url = urls['lnk'][0] if urls['lnk'] else None
    if not img_url:
        return content
    
    section = f"""
## 価格・在庫を確認

[商品を楽天で見る]({img_url})
[楽天市場で最新価格を確認]({lnk_url})
"""
    m = re.search(r'\n## 関連記事', content)
    if m:
        return content[:m.start()] + section + '\n' + content[m.start():]
    return content + section

def main():
    products = get_registry_products()
    for article, product_key in ARTICLE_PRODUCT_MAP.items():
        path = os.path.join(POSTS_DIR, article)
        if not os.path.exists(path):
            print(f'MISSING: {article}')
            continue
        with open(path, 'r') as f:
            content = f.read()
        current = has_rakuten_hrefs(content)
        if current >= 2:
            print(f'OK ({current} links): {article}')
            continue
        name, urls = find_product(product_key, products)
        if not name:
            print(f'NO MATCH: {article} (key: {product_key})')
            continue
        new_content = inject_section(content, name, urls)
        new_count = has_rakuten_hrefs(new_content)
        with open(path, 'w') as f:
            f.write(new_content)
        print(f'FIXED: {article} ({current} -> {new_count} links) using: {name[:40]}')

if __name__ == '__main__':
    main()
