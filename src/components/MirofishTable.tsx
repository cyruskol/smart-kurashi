'use client';

import { mirofishPredictions } from '@/data/mirofish-predictions';

function ResultBadge({ result }: { result: string }) {
  if (result === '引分') {
    return <span style={{ color: '#B7791F', fontWeight: 600, fontSize: '12px' }}>引分</span>;
  }

  return <span style={{ color: '#2D3748', fontWeight: 600, fontSize: '12px' }}>{result}勝利</span>;
}

function ConfidenceBadge({ value }: { value: number }) {
  const color = value >= 75 ? '#38A169' : value >= 60 ? '#D69E2E' : '#E53E3E';
  const label = value >= 80 ? '高' : value >= 70 ? 'やや高' : value >= 60 ? '中' : '低';
  return <span style={{ color, fontWeight: 600, fontSize: '12px' }}>{label}（{value}%）</span>;
}

export default function MirofishTable() {
  return (
    <div style={{ overflowX: 'auto', marginTop: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: '#F0F7FF', borderBottom: '2px solid #D0E3F5' }}>
            <th style={{ padding: '8px 4px', minWidth: '56px', textAlign: 'center', fontSize: '12px' }}>試合</th>
            <th style={{ padding: '8px 4px', minWidth: '50px', fontSize: '12px' }}>日付</th>
            <th style={{ padding: '8px 4px', minWidth: '170px', fontSize: '12px' }}>対戦</th>
            <th style={{ padding: '8px 4px', minWidth: '72px', textAlign: 'center', fontSize: '12px' }}>予測比分</th>
            <th style={{ padding: '8px 4px', minWidth: '76px', textAlign: 'center', fontSize: '12px' }}>結果</th>
            <th style={{ padding: '8px 4px', minWidth: '88px', textAlign: 'center', fontSize: '12px' }}>信頼度</th>
          </tr>
        </thead>
        <tbody>
          {mirofishPredictions.map((r) => (
            <tr key={r.match} style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td style={{ padding: '6px 4px', textAlign: 'center', color: '#888', fontSize: '11px' }}>{r.match}</td>
              <td style={{ padding: '6px 4px', fontSize: '11px' }}>{r.date}</td>
              <td style={{ padding: '6px 4px', fontSize: '12px' }}>{r.teamA} 対 {r.teamB}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center', fontWeight: 600 }}>{r.score}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center' }}>
                <ResultBadge result={r.result} />
              </td>
              <td style={{ padding: '6px 4px', textAlign: 'center' }}>
                <ConfidenceBadge value={r.confidence} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
