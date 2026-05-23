export default function PrBanner() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        background: '#F1F5F9',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#5B6270',
        marginBottom: '24px',
      }}
    >
      <span style={{ fontWeight: 600, color: '#5B6270', fontSize: '11px', letterSpacing: '0.05em' }}>
        【PR】
      </span>
      <span>
        当サイトはアフィリエイト広告（Amazonアソシエイト含む）を掲載しています。
      </span>
    </div>
  );
}
