'use client';

import { track } from '@vercel/analytics';
import type { HandsOnStatus, ReviewStatus, RetailerKey, RetailerContext } from '@/lib/products';

export interface RetailerClickPayload {
  productSlug: string;
  productName: string;
  retailer: RetailerKey;
  sourcePage: string;
  ctaPosition: RetailerContext;
  reviewStatus?: ReviewStatus;
  handsOnStatus?: HandsOnStatus;
  currentUrl?: string;
}

export function trackRetailerClick(payload: RetailerClickPayload) {
  const eventPayload = {
    productSlug: payload.productSlug,
    productName: payload.productName,
    retailer: payload.retailer,
    sourcePage: payload.sourcePage,
    ctaPosition: payload.ctaPosition,
    reviewStatus: payload.reviewStatus || 'unknown',
    handsOnStatus: payload.handsOnStatus || 'unknown',
    currentUrl: payload.currentUrl || (typeof window !== 'undefined' ? window.location.href : ''),
  } as Record<string, string>;

  try {
    track('retailer_click', eventPayload);
  } catch {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'retailer_click', eventPayload);
    } else if (typeof window !== 'undefined') {
      console.log('retailer_click', eventPayload);
    }
  }
}
