import type { Metadata } from 'next';
import MirofishTable from '@/components/MirofishTable';

const groupSummaries = [
  { group: '第1組', first: 'メキシコ', second: 'チェコ', third: '韓国', fourth: '南アフリカ' },
  { group: '第2組', first: 'スイス', second: 'カナダ', third: 'ボスニア・ヘルツェゴビナ', fourth: 'カタール' },
  { group: '第3組', first: 'ブラジル', second: 'モロッコ', third: 'スコットランド', fourth: 'ハイチ' },
  { group: '第4組', first: 'アメリカ', second: 'トルコ', third: 'パラグアイ', fourth: 'オーストラリア' },
  { group: '第5組', first: 'ドイツ', second: 'コートジボワール', third: 'エクアドル', fourth: 'キュラソー' },
  { group: '第6組', first: 'オランダ', second: 'スウェーデン', third: '日本', fourth: 'チュニジア' },
  { group: '第7組', first: 'ベルギー', second: 'エジプト', third: 'イラン', fourth: 'ニュージーランド' },
  { group: '第8組', first: 'スペイン', second: 'ウルグアイ', third: 'カーボベルデ', fourth: 'サウジアラビア' },
  { group: '第9組', first: 'フランス', second: 'セネガル', third: 'ノルウェー', fourth: 'イラク' },
  { group: '第10組', first: 'アルゼンチン', second: 'アルジェリア', third: 'オーストリア', fourth: 'ヨルダン' },
  { group: '第11組', first: 'ポルトガル', second: 'コロンビア', third: 'コンゴ民主共和国', fourth: 'ウズベキスタン' },
  { group: '第12組', first: 'イングランド', second: 'クロアチア', third: 'ガーナ', fourth: 'パナマ' },
];

export const metadata: Metadata = {
  title: '2026年大会 視聴案内｜予測更新版',
  description: '更新版の予測レポートを反映したページです。Mirofishのグループステージ予測と組別順位の見通しを日本語でまとめています。',
};

export default function FifaWorldCup2026Page() {
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">2026年大会</p>
        <h1>2026年大会 視聴案内と予測更新</h1>
        <p>
          更新版の予測レポートを反映し、Mirofishのグループステージ予測結果と組別順位の見通しを最新内容に差し替えました。全72試合の予測比分を日本語で見やすく整理しています。
        </p>
        <div className="product-actions">
          <a href="#summary" className="product-button product-button-primary">
            更新の要点
          </a>
          <a href="#predictions" className="product-button">
            予測一覧
          </a>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="summary">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">更新の要点</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>組別順位の見通し</h2>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E7E5E4' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', minWidth: '88px' }}>組</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', minWidth: '120px' }}>1位</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', minWidth: '120px' }}>2位</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', minWidth: '120px' }}>3位</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', minWidth: '120px' }}>4位</th>
              </tr>
            </thead>
            <tbody>
              {groupSummaries.map((row) => (
                <tr key={row.group} style={{ borderBottom: '1px solid #E7E5E4' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600 }}>{row.group}</td>
                  <td style={{ padding: '12px 8px' }}>{row.first}</td>
                  <td style={{ padding: '12px 8px' }}>{row.second}</td>
                  <td style={{ padding: '12px 8px' }}>{row.third}</td>
                  <td style={{ padding: '12px 8px' }}>{row.fourth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#F9F7F5', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>注目ポイント</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8', fontSize: '14px' }}>
            <li>第1組はメキシコが首位、チェコが2位の見立てです。</li>
            <li>第2組はスイスとカナダが同勝点で並ぶ接戦です。</li>
            <li>第6組はオランダが首位、日本は3位予想です。</li>
            <li>第12組はイングランドが首位、クロアチアが2位予想です。</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="predictions">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">Mirofish予測</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>Mirofishによるグループステージ予測</h2>
          </div>
        </div>

        <div style={{ padding: '16px', background: '#F0F7FF', borderRadius: '8px', marginBottom: '24px', border: '1px solid #D0E3F5' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#2C5282' }}>
            更新版の予測レポートをもとに、全72試合の予測比分、勝敗、信頼度を差し替えています。Mirofishの更新内容を確認するための参考情報としてご利用ください。
          </p>
        </div>

        <MirofishTable />
      </section>

      <section style={{ marginTop: '44px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#888' }}>
          このページは随時更新されます。Mirofishの予測について詳細は
          <a href="https://github.com/cyruskol/smart-kurashi" target="_blank" rel="noopener noreferrer" style={{ color: '#4A433F', textDecoration: 'underline' }}>
            リポジトリ
          </a>
          を参照してください。
        </p>
      </section>
    </main>
  );
}
