import { affiliateDisclosure } from '@/lib/products';

export default function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      style={{
        margin: compact ? '16px 0' : '24px 0',
        padding: compact ? '12px 14px' : '16px 18px',
        border: '1px solid #DDD8D1',
        borderRadius: '12px',
        background: '#FFF7ED',
        color: '#4A433F',
        display: 'grid',
        gap: '4px',
        fontSize: compact ? '13px' : '14px',
        lineHeight: 1.7,
      }}
      aria-label="広告・アフィリエイト表記"
    >
      <strong style={{ color: '#A9582D' }}>広告・PRを含みます</strong>
      <span>{affiliateDisclosure()}</span>
    </aside>
  );
}
