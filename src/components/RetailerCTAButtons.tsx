'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  buildRetailerGoUrl,
  getProductBySlug,
  getRetailerLabel,
  retailerOrder,
  type RetailerContext,
  type RetailerKey,
} from '@/lib/products';
import { trackRetailerClick } from '@/lib/product-tracking';

interface RetailerCTAButtonsProps {
  productSlug: string;
  sourcePage: string;
  ctaPosition: RetailerContext;
  variant?: 'default' | 'compact';
  retailerKeys?: RetailerKey[];
  showLabels?: boolean;
}

export default function RetailerCTAButtons({
  productSlug,
  sourcePage,
  ctaPosition,
  variant = 'default',
  retailerKeys = retailerOrder,
  showLabels = true,
}: RetailerCTAButtonsProps) {
  const pathname = usePathname();
  const product = getProductBySlug(productSlug);
  if (!product) return null;

  const links = retailerKeys
    .map((retailer) => {
      const item = product.retailers?.[retailer];
      if (!item || !item.enabled || !item.url) return null;
      return {
        retailer,
        label: item.label || getRetailerLabel(retailer),
        href: buildRetailerGoUrl(productSlug, retailer, ctaPosition),
      };
    })
    .filter(Boolean) as Array<{ retailer: RetailerKey; label: string; href: string }>;

  if (!links.length) return null;

  const visibleLinks = variant === 'compact' ? links.slice(0, 2) : links;

  return (
    <div className="sk-link-list" aria-label={`${product.name} の価格・在庫確認リンク`}>
      {visibleLinks.map((link) => (
        <Link
          key={link.retailer}
          href={link.href}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={() => {
            trackRetailerClick({
              productSlug: product.slug,
              productName: product.name,
              retailer: link.retailer,
              sourcePage,
              ctaPosition,
              reviewStatus: product.reviewStatus,
              handsOnStatus: product.handsOnStatus,
              currentUrl: pathname,
            });
          }}
          className={link.retailer === 'amazon' ? 'product-button product-button-primary' : 'product-button'}
        >
          {showLabels ? link.label : getRetailerLabel(link.retailer)}
        </Link>
      ))}
    </div>
  );
}
