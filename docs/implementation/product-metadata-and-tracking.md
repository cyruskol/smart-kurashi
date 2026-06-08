# Product Metadata and Tracking

## What lives where
- Product metadata: `src/data/product-metadata.json`
- Metadata helpers and validation: `src/lib/products.ts`
- Retailer click tracking: `src/lib/product-tracking.ts`
- Retailer buttons: `src/components/RetailerCTAButtons.tsx`
- Local metadata dashboard: `src/app/dev/product-metadata/page.tsx`
- Metadata report command: `npm run report:products`

## How to add a new product
1. Add one product object to `src/data/product-metadata.json`.
2. Fill the core fields:
   - slug
   - name
   - group
   - category
   - shortDescription
   - reviewStatus
   - handsOnStatus
   - recommendedFor / notRecommendedFor
   - pros / cons
   - seo.title / seo.description
   - updatedAt
3. Add retailer links only when a real URL exists.
4. Set `trackingStatus` to `not-configured` until outbound tracking is actually configured.

## How to mark review state
- `reviewed`: final review content exists and the product is ready to present as reviewed.
- `research-review`: based on research, specs, and public information.
- `planned`: not published yet.
- `draft`: incomplete internal draft.

## How retailer links work
- Public buttons use neutral wording such as `Amazonで見る` or `価格・在庫を確認`.
- Buttons route through `/go/[retailer]/[productSlug]`.
- The redirect route validates both slug and retailer key before redirecting.

## How click tracking works
- Clicks call `trackRetailerClick()` before navigation.
- The event payload includes:
  - product slug
  - product name
  - retailer
  - source page
  - CTA position
  - review status
  - hands-on status
- Tracking uses Vercel Analytics custom events when available.
- If analytics is unavailable, the code falls back safely to console logging.

## How to inspect metadata from desktop
- Run: `npm run report:products`
- Open the local dashboard while running dev server:
  - `http://localhost:3000/dev/product-metadata` or the port shown by Next.js
- The dashboard is local-only and returns 404 in production.

## What still needs real setup
- Real retailer tracking IDs, if the site owner wants them.
- Any site-wide analytics configuration beyond Vercel Analytics.
- Additional products beyond the initial seed entry.
