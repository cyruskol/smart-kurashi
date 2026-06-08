import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, type RetailerKey } from '@/lib/products';

const retailerKeys: RetailerKey[] = ['amazon', 'rakuten', 'yahoo', 'official'];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ retailer: string; productSlug: string }> },
) {
  const { retailer, productSlug } = await params;
  const validRetailer = retailer as RetailerKey;
  if (!retailerKeys.includes(validRetailer)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const product = getProductBySlug(productSlug);
  if (!product) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const retailerLink = product.retailers?.[validRetailer];
  if (!retailerLink || !retailerLink.enabled || !retailerLink.url) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const destination = new URL(retailerLink.url);
  const from = request.nextUrl.searchParams.get('from');
  if (from) destination.searchParams.set('from', from);

  return NextResponse.redirect(destination, { status: 302 });
}
