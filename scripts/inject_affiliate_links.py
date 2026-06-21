#!/usr/bin/env python3
"""
Affiliate Link Injector for Smart Kurashi

Usage: python3 inject_affiliate_links.py <article_path> <registry_path>

Reads the article and registry, finds the product being reviewed,
and injects rakuten affiliate links into the article body.
"""

import sys
import re
import os

def parse_registry(registry_path):
    """Parse the affiliate registry and return products with links."""
    with open(registry_path, 'r') as f:
        content = f.read()
    
    products = []
    lines = content.split('\n')
    for line in lines:
        if line.startswith('|') and 'rakuten' in line and '商品名' not in line and '---' not in line:
            cells = [c.strip() for c in line.split('|')]
            if len(cells) >= 6:
                name = cells[1].strip()
                image_text = cells[3].strip()
                link_only = cells[4].strip()
                status = cells[5].strip() if len(cells) > 5 else ''
                
                img_urls = re.findall(r'https?://[^\s<>"\']+rakuten[^\s<>"\']+', image_text)
                lnk_urls = re.findall(r'https?://[^\s<>"\']+rakuten[^\s<>"\']+', link_only)
                
                if img_urls or lnk_urls:
                    products.append({
                        'name': name,
                        'image_urls': img_urls,
                        'link_urls': lnk_urls,
                        'status': status
                    })
    
    return products

def find_product_in_article(article_content, products):
    """Find which product from the registry is being discussed in the article."""
    best_match = None
    best_score = 0
    
    for product in products:
        name = product['name']
        # Extract key search terms
        terms = []
        # Add full name words
        for word in name.split():
            clean = re.sub(r'[^\w]', '', word)
            if len(clean) >= 3:
                terms.append(clean)
        
        score = 0
        content_lower = article_content.lower()
        for term in terms:
            if term.lower() in content_lower:
                score += len(term)
        
        if score > best_score:
            best_score = score
            best_match = product
    
    return best_match

def has_rakuten_links(article_content):
    """Check if article already has rakuten affiliate links."""
    return bool(re.search(r'href="[^"]*rakuten', article_content))

def count_rakuten_links(article_content):
    """Count rakuten links in article."""
    return len(re.findall(r'href="[^"]*rakuten', article_content))

def inject_links(article_content, product):
    """Inject rakuten affiliate links into the article."""
    if not product:
        return article_content
    
    image_url = product['image_urls'][0] if product['image_urls'] else None
    link_url = product['link_urls'][0] if product['link_urls'] else image_url
    
    if not image_url:
        return article_content
    
    link_section = f"""
## 在庫・価格の確認

最新の価格・在庫・キャンペーン情報は、以下のリンクから確認できます。

[商品を楽天で見る]({image_url})

[楽天市場で最新価格を確認]({link_url})
"""
    
    # Strategy 1: Insert before "関連記事" section
    related_match = re.search(r'\n## 関連記事', article_content)
    if related_match:
        insert_pos = related_match.start()
        article_content = article_content[:insert_pos] + link_section + '\n' + article_content[insert_pos:]
        return article_content
    
    # Strategy 2: Insert before "まとめ" section
    summary_match = re.search(r'\n## まとめ', article_content)
    if summary_match:
        insert_pos = summary_match.start()
        article_content = article_content[:insert_pos] + link_section + '\n' + article_content[insert_pos:]
        return article_content
    
    # Strategy 3: Append to end (before last --- if exists)
    trailing_sep = re.search(r'\n---\s*$', article_content)
    if trailing_sep:
        insert_pos = trailing_sep.start()
        article_content = article_content[:insert_pos] + link_section + '\n' + article_content[insert_pos:]
    else:
        article_content += '\n' + link_section
    
    return article_content

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 inject_affiliate_links.py <article_path> <registry_path>")
        sys.exit(1)
    
    article_path = sys.argv[1]
    registry_path = sys.argv[2]
    
    if not os.path.exists(article_path):
        print(f"ERROR: Article not found: {article_path}")
        sys.exit(1)
    
    if not os.path.exists(registry_path):
        print(f"ERROR: Registry not found: {registry_path}")
        sys.exit(1)
    
    with open(article_path, 'r') as f:
        article_content = f.read()
    
    current_links = count_rakuten_links(article_content)
    if current_links >= 2:
        print(f"OK: Article already has {current_links} rakuten links: {article_path}")
        sys.exit(0)
    
    products = parse_registry(registry_path)
    if not products:
        print(f"ERROR: No products with links found in registry")
        sys.exit(1)
    
    product = find_product_in_article(article_content, products)
    if not product:
        print(f"WARNING: No matching product found in registry for: {article_path}")
        sys.exit(1)
    
    print(f"Found product: {product['name'][:50]}")
    
    new_content = inject_links(article_content, product)
    new_links = count_rakuten_links(new_content)
    
    if new_links > current_links:
        with open(article_path, 'w') as f:
            f.write(new_content)
        print(f"SUCCESS: Injected links ({current_links} -> {new_links}) in {article_path}")
        sys.exit(0)
    else:
        print(f"ERROR: Failed to inject links (still {new_links})")
        sys.exit(1)

if __name__ == '__main__':
    main()
