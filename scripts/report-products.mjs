#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataPath = path.join(root, 'src', 'data', 'product-metadata.json');
const outDir = path.join(root, 'reports');
const outPath = path.join(outDir, 'product-metadata-report.md');

const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const retailerKeys = ['amazon', 'rakuten', 'yahoo', 'official'];

const counts = {
  total: products.length,
  reviewed: products.filter((p) => p.reviewStatus === 'reviewed').length,
  researchReview: products.filter((p) => p.reviewStatus === 'research-review').length,
  planned: products.filter((p) => p.reviewStatus === 'planned').length,
  draft: products.filter((p) => p.reviewStatus === 'draft').length,
  comparisonEligible: products.filter((p) => p.comparisonEligible).length,
  notConfigured: [],
};

const missing = {
  reviewUrl: [],
  productUrl: [],
  pros: [],
  cons: [],
  recommendedFor: [],
  notRecommendedFor: [],
  seoTitle: [],
  seoDescription: [],
};

const warnings = [];
const errors = [];
const slugs = new Set();

for (const product of products) {
  if (!product.slug) errors.push('Missing slug');
  if (slugs.has(product.slug)) errors.push(`Duplicate slug: ${product.slug}`);
  slugs.add(product.slug);

  if (!product.name) warnings.push(`${product.slug}: missing name`);
  if (!product.group) warnings.push(`${product.slug}: missing group`);
  if (!product.category) warnings.push(`${product.slug}: missing category`);
  if (!product.shortDescription) warnings.push(`${product.slug}: missing shortDescription`);
  if (!product.seo?.title) missing.seoTitle.push(product.slug);
  if (!product.seo?.description) missing.seoDescription.push(product.slug);
  if (!product.updatedAt) warnings.push(`${product.slug}: missing updatedAt`);
  if (!product.reviewUrl) missing.reviewUrl.push(product.slug);
  if (!product.productUrl) missing.productUrl.push(product.slug);
  if (!product.pros?.length) missing.pros.push(product.slug);
  if (!product.cons?.length) missing.cons.push(product.slug);
  if (!product.recommendedFor?.length) missing.recommendedFor.push(product.slug);
  if (!product.notRecommendedFor?.length) missing.notRecommendedFor.push(product.slug);
  if (product.reviewStatus === 'reviewed' && !product.reviewUrl) warnings.push(`${product.slug}: reviewed but no reviewUrl`);
  if (product.rating !== undefined && !product.ratingBasis) warnings.push(`${product.slug}: rating exists but ratingBasis is missing`);
  if (product.comparisonEligible && (!product.pros?.length || !product.cons?.length || !product.recommendedFor?.length || !product.notRecommendedFor?.length)) {
    warnings.push(`${product.slug}: comparison eligible but missing comparison fields`);
  }

  for (const key of retailerKeys) {
    const link = product.retailers?.[key];
    if (!link) continue;
    if (link.enabled && !link.url) warnings.push(`${product.slug}: ${key} enabled but missing URL`);
    if (link.trackingStatus === 'not-configured') {
      counts.notConfigured.push({ slug: product.slug, retailer: key, label: link.label });
    }
  }
}

const md = `# Product Metadata Report

Generated: ${new Date().toISOString()}

## Totals
- Total products: ${counts.total}
- Reviewed: ${counts.reviewed}
- Research reviews: ${counts.researchReview}
- Planned: ${counts.planned}
- Draft: ${counts.draft}
- Comparison eligible: ${counts.comparisonEligible}

## Missing fields
- Missing reviewUrl: ${missing.reviewUrl.length ? missing.reviewUrl.join(', ') : 'none'}
- Missing productUrl: ${missing.productUrl.length ? missing.productUrl.join(', ') : 'none'}
- Missing pros: ${missing.pros.length ? missing.pros.join(', ') : 'none'}
- Missing cons: ${missing.cons.length ? missing.cons.join(', ') : 'none'}
- Missing recommendedFor: ${missing.recommendedFor.length ? missing.recommendedFor.join(', ') : 'none'}
- Missing notRecommendedFor: ${missing.notRecommendedFor.length ? missing.notRecommendedFor.join(', ') : 'none'}
- Missing SEO title: ${missing.seoTitle.length ? missing.seoTitle.join(', ') : 'none'}
- Missing SEO description: ${missing.seoDescription.length ? missing.seoDescription.join(', ') : 'none'}

## Retailer tracking not configured
${counts.notConfigured.length ? counts.notConfigured.map((item) => `- ${item.slug}: ${item.label} (${item.retailer})`).join('\n') : '- none'}

## Warnings
${warnings.length ? warnings.map((w) => `- ${w}`).join('\n') : '- none'}

## Errors
${errors.length ? errors.map((e) => `- ${e}`).join('\n') : '- none'}
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, md, 'utf8');
process.stdout.write(md);
process.exit(errors.length ? 1 : 0);
