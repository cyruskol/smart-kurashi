'use client';

import { mirofishPredictions, type MirofishPrediction } from '@/data/mirofish-predictions';

function ResultBadge({ result }: { result: string }) {
  const color = result === 'Draw' ? '#B7791F' : result === 'B Win' ? '#C53030' : '#2D3748';
  return <span style={{ color, fontWeight: 600 }}>{result}</span>;
}

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 75 ? '#38A169' : value >= 60 ? '#D69E2E' : '#E53E3E';
  return (
    <span style={{ color, fontWeight: 600 }}>
      {value >= 80 ? 'Very High' : value >= 70 ? 'High' : value >= 60 ? 'Medium' : 'Low'} ({value}%)
    </span>
  );
}

export default function MirofishTable({ limit }: { limit?: number }) {
  const rows = limit ? mirofishPredictions.slice(0, limit) : mirofishPredictions;

  return (
    <div style={{ overflowX: 'auto', marginTop: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: '#F0F7FF', borderBottom: '2px solid #D0E3F5' }}>
            <th style={{ padding: '8px 4px', minWidth: '32px', textAlign: 'center' }}>No.</th>
            <th style={{ padding: '8px 4px', minWidth: '60px' }}>Date</th>
            <th style={{ padding: '8px 4px', minWidth: '140px' }}>Match</th>
            <th style={{ padding: '8px 4px', minWidth: '60px', textAlign: 'center' }}>Score</th>
            <th style={{ padding: '8px 4px', minWidth: '60px', textAlign: 'center' }}>Result</th>
            <th style={{ padding: '8px 4px', minWidth: '100px', textAlign: 'center' }}>Confidence</th>
            <th style={{ padding: '8px 4px', minWidth: '180px' }}>Key Debate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r: MirofishPrediction) => (
            <tr key={r.match} style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td style={{ padding: '6px 4px', textAlign: 'center', color: '#888' }}>{r.match}</td>
              <td style={{ padding: '6px 4px' }}>{r.date}</td>
              <td style={{ padding: '6px 4px' }}>{r.teamA} vs {r.teamB}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center', fontWeight: 600 }}>{r.score}</td>
              <td style={{ padding: '6px 4px', textAlign: 'center' }}><ResultBadge result={r.result} /></td>
              <td style={{ padding: '6px 4px', textAlign: 'center' }}><ConfidenceBar value={r.confidence} /></td>
              <td style={{ padding: '6px 4px', fontSize: '12px', lineHeight: 1.5 }}>{r.debate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
