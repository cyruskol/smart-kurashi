import metadataJson from '@/data/product-metadata.json';

export type ProductGroup = 'AI・テック' | '家電・ガジェット';
export type ReviewStatus = 'reviewed' | 'research-review' | 'planned' | 'draft';
export type HandsOnStatus = 'used' | 'not-used' | 'unknown';
export type RetailerKey = 'amazon' | 'rakuten' | 'yahoo' | 'official';
export type TrackingStatus = 'configured' | 'not-configured' | 'not-needed' | 'unknown';

export type RetailerContext = 'review_top' | 'review_middle' | 'review_bottom' | 'product_card' | 'comparison_table' | 'homepage_card' | 'product_page' | 'dashboard';

export interface RetailerLink {
  enabled: boolean;
  label: string;
  url?: string;
  trackingId?: string;
  trackingStatus: TrackingStatus;
  lastChecked?: string;
}

export interface ProductMetadata {
  slug: string;
  name: string;
  brand?: string;
  group: ProductGroup;
  category: string;
  tags: string[];
  shortDescription: string;
  bestFor?: string;
  notFor?: string;
  reviewStatus: ReviewStatus;
  handsOnStatus: HandsOnStatus;
  rating?: number;
  ratingBasis?: string;
  pros: string[];
  cons: string[];
  recommendedFor: string[];
  notRecommendedFor: string[];
  productUrl?: string;
  reviewUrl?: string;
  comparisonEligible: boolean;
  retailers: Partial<Record<RetailerKey, RetailerLink>>;
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
  updatedAt: string;
}

export interface ProductMetadataValidationResult {
  errors: string[];
  warnings: string[];
}

export interface ProductMetadataReport {
  totals: {
    count: number;
    reviewed: number;
    researchReview: number;
    planned: number;
    draft: number;
    comparisonEligible: number;
    readyForCard: number;
    trackableRetailers: number;
  };
  missing: {
    reviewUrl: string[];
    productUrl: string[];
    pros: string[];
    cons: string[];
    recommendedFor: string[];
    notRecommendedFor: string[];
    seoTitle: string[];
    seoDescription: string[];
  };
  trackingNotConfigured: Array<{ productSlug: string; retailer: RetailerKey; label: string }>;
  metadataWarnings: Array<{ productSlug: string; warnings: string[] }>;
  validationErrors: string[];
}

const productMetadata = metadataJson as ProductMetadata[];

export const categoryMeta: Record<string, { label: string; description: string }> = {
  'スマートテレビ': {
    label: 'スマートテレビ',
    description: '寝室・書斎の2台目テレビとして選ぶスマートテレビ',
  },
};

export const retailerOrder: RetailerKey[] = ['amazon', 'rakuten', 'yahoo', 'official'];

function isEnabledRetailer(link?: RetailerLink): link is RetailerLink {
  return Boolean(link && link.enabled && link.url);
}

export function getAllProducts(): ProductMetadata[] {
  return [...productMetadata].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getProductBySlug(slug: string): ProductMetadata | null {
  return getAllProducts().find((product) => product.slug === slug) || null;
}

export function getProductByReviewUrl(reviewUrl: string): ProductMetadata | null {
  return getAllProducts().find((product) => product.reviewUrl === reviewUrl) || null;
}

export function getProductByProductUrl(productUrl: string): ProductMetadata | null {
  return getAllProducts().find((product) => product.productUrl === productUrl) || null;
}

export function getComparisonReadyProducts(): ProductMetadata[] {
  return getAllProducts().filter((product) => product.comparisonEligible);
}

export function getReviewableProducts(): ProductMetadata[] {
  return getAllProducts().filter((product) => ['reviewed', 'research-review'].includes(product.reviewStatus));
}

export function getFeaturedProducts(): ProductMetadata[] {
  return getReviewableProducts().slice(0, 3);
}

export function getRetailerLink(productSlug: string, retailerKey: RetailerKey, context: RetailerContext) {
  const product = getProductBySlug(productSlug);
  const retailer = product?.retailers?.[retailerKey];
  if (!product || !retailer || !isEnabledRetailer(retailer)) return null;

  return {
    productSlug,
    productName: product.name,
    retailer: retailerKey,
    label: retailer.label,
    href: `/go/${retailerKey}/${productSlug}?from=${encodeURIComponent(context)}`,
    externalUrl: retailer.url,
    trackingStatus: retailer.trackingStatus,
  };
}

export function getEnabledRetailers(productSlug: string, context: RetailerContext) {
  return retailerOrder
    .map((retailerKey) => getRetailerLink(productSlug, retailerKey, context))
    .filter(Boolean) as Array<ReturnType<typeof getRetailerLink>>;
}

export function validateProductMetadata(products: ProductMetadata[] = getAllProducts()): ProductMetadataValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();

  for (const product of products) {
    if (!product.slug) errors.push('Missing slug');
    if (seen.has(product.slug)) errors.push(`Duplicate slug: ${product.slug}`);
    seen.add(product.slug);
    if (!product.name) warnings.push(`${product.slug}: missing name`);
    if (!product.group) warnings.push(`${product.slug}: missing group`);
    if (!product.category) warnings.push(`${product.slug}: missing category`);
    if (!product.shortDescription) warnings.push(`${product.slug}: missing shortDescription`);
    if (!product.seo?.title) warnings.push(`${product.slug}: missing SEO title`);
    if (!product.seo?.description) warnings.push(`${product.slug}: missing SEO description`);
    if (!product.updatedAt) warnings.push(`${product.slug}: missing updatedAt`);
    if (product.reviewStatus === 'reviewed' && !product.reviewUrl) warnings.push(`${product.slug}: reviewed but missing reviewUrl`);
    if (product.handsOnStatus === 'used' && !product.ratingBasis) warnings.push(`${product.slug}: hands-on status is used but ratingBasis/evidence is missing`);
    if (product.rating !== undefined && !product.ratingBasis) warnings.push(`${product.slug}: rating exists but ratingBasis is missing`);
    if (product.comparisonEligible && (!product.pros?.length || !product.cons?.length || !product.recommendedFor?.length || !product.notRecommendedFor?.length)) {
      warnings.push(`${product.slug}: comparison eligible but comparison fields are incomplete`);
    }

    for (const retailerKey of retailerOrder) {
      const retailer = product.retailers?.[retailerKey];
      if (!retailer) continue;
      if (retailer.enabled && !retailer.url) warnings.push(`${product.slug}: ${retailerKey} enabled but missing URL`);
      if (retailer.trackingStatus === 'configured' && !retailer.trackingId && !retailer.url) {
        warnings.push(`${product.slug}: ${retailerKey} tracking configured but missing trackingId/URL`);
      }
      if (retailer.trackingStatus === 'not-configured') {
        warnings.push(`${product.slug}: ${retailerKey} tracking not-configured`);
      }
    }
  }

  return { errors, warnings };
}

export function buildProductMetadataReport(products: ProductMetadata[] = getAllProducts()): ProductMetadataReport {
  const validation = validateProductMetadata(products);
  const report: ProductMetadataReport = {
    totals: {
      count: products.length,
      reviewed: products.filter((p) => p.reviewStatus === 'reviewed').length,
      researchReview: products.filter((p) => p.reviewStatus === 'research-review').length,
      planned: products.filter((p) => p.reviewStatus === 'planned').length,
      draft: products.filter((p) => p.reviewStatus === 'draft').length,
      comparisonEligible: products.filter((p) => p.comparisonEligible).length,
      readyForCard: products.filter((p) => p.shortDescription && p.productUrl && p.seo?.title && p.seo?.description).length,
      trackableRetailers: products.reduce((count, product) => {
        return count + retailerOrder.filter((key) => isEnabledRetailer(product.retailers?.[key])).length;
      }, 0),
    },
    missing: {
      reviewUrl: products.filter((p) => !p.reviewUrl).map((p) => p.slug),
      productUrl: products.filter((p) => !p.productUrl).map((p) => p.slug),
      pros: products.filter((p) => !p.pros?.length).map((p) => p.slug),
      cons: products.filter((p) => !p.cons?.length).map((p) => p.slug),
      recommendedFor: products.filter((p) => !p.recommendedFor?.length).map((p) => p.slug),
      notRecommendedFor: products.filter((p) => !p.notRecommendedFor?.length).map((p) => p.slug),
      seoTitle: products.filter((p) => !p.seo?.title).map((p) => p.slug),
      seoDescription: products.filter((p) => !p.seo?.description).map((p) => p.slug),
    },
    trackingNotConfigured: [],
    metadataWarnings: [],
    validationErrors: validation.errors,
  };

  for (const product of products) {
    const warnings: string[] = [];
    for (const retailerKey of retailerOrder) {
      const retailer = product.retailers?.[retailerKey];
      if (!retailer) continue;
      if (retailer.trackingStatus === 'not-configured') {
        report.trackingNotConfigured.push({ productSlug: product.slug, retailer: retailerKey, label: retailer.label });
      }
      if (retailer.enabled && !retailer.url) warnings.push(`${retailerKey}: enabled but missing URL`);
    }
    if (!product.reviewUrl) warnings.push('missing reviewUrl');
    if (!product.productUrl) warnings.push('missing productUrl');
    if (!product.shortDescription) warnings.push('missing shortDescription');
    if (warnings.length > 0) report.metadataWarnings.push({ productSlug: product.slug, warnings });
  }

  return report;
}

export function buildRetailerGoUrl(productSlug: string, retailerKey: RetailerKey, context: RetailerContext) {
  return `/go/${retailerKey}/${productSlug}?from=${encodeURIComponent(context)}`;
}

export function buildRetailerRecord(productSlug: string, retailerKey: RetailerKey, context: RetailerContext) {
  return getRetailerLink(productSlug, retailerKey, context);
}

export function getRetailerLabel(retailerKey: RetailerKey) {
  switch (retailerKey) {
    case 'amazon':
      return 'Amazonで見る';
    case 'rakuten':
      return '楽天で見る';
    case 'yahoo':
      return 'Yahooで見る';
    case 'official':
      return '公式サイトを見る';
  }
}

export function getReviewLink(productSlug: string) {
  const product = getProductBySlug(productSlug);
  return product?.reviewUrl || null;
}

export function getProductSeo(productSlug: string) {
  const product = getProductBySlug(productSlug);
  if (!product) return null;
  return product.seo;
}
