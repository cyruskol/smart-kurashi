import Link from 'next/link';
import type { Metadata } from 'next';
import MirofishTable from '@/components/MirofishTable';

export const metadata: Metadata = {
  title: 'FIFAワールドカップ2026 視聴ガイド｜日本での放送・配信と海外無料視聴',
  description: 'FIFAワールドカップ2026を日本で視聴する方法をまとめたページ。NHK、日本テレビ、フジテレビ、DAZN、ABEMAの放送・配信先、料金プラン、契約期間の注意点、海外旅行・出張先での無料視聴オプションを解説。Mirofishによるグループステージ予測も掲載。',
};

export default function FifaWorldCup2026Page() {
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">FIFA WORLD CUP 2026</p>
        <h1>FIFAワールドカップ2026 視聴ガイド</h1>
        <p>
          2026年夏、北米3カ国（アメリカ・カナダ・メキシコ）で開催されるFIFAワールドカップ。日本から全試合を視聴できる放送・配信先、料金プラン、契約の注意点、海外旅行・出張先での視聴オプションをまとめました。
        </p>
        <div className="product-actions">
          <a href="#japan-broadcast" className="product-button product-button-primary">
            日本での放送・配信
          </a>
          <a href="#comparison" className="product-button">
            プラットフォーム比較
          </a>
          <a href="#overseas" className="product-button">
            海外での視聴
          </a>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="japan-broadcast">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">JAPAN BROADCAST</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>日本での放送・配信先</h2>
          </div>
        </div>
        <p style={{ marginBottom: '24px' }}>
          2026年大会の日本における放送権は複数の放送局・配信サービスが保有しています。日本戦は地上波で無料視聴できる一方、全試合を網羅するにはDAZNやABEMAなどの配信サービスが必要です。
        </p>

        <div className="product-grid" style={{ marginTop: 0 }}>
          <article className="product-card">
            <div className="product-meta">地上波（無料）</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>NHK</h3>
            <p style={{ marginBottom: '12px' }}>
              日本戦全試合を総合テレビとBSで生中継。受信料のみで視聴できる最も基本的なオプションです。本田圭佑さんが解説を務める点も注目です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料（受信料のみ）<br />
              <strong>対象:</strong> 日本戦全試合<br />
              <strong>契約期間:</strong> 不要<br />
              <strong>画質:</strong> 地デジ・BS
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">地上波（無料）</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>日本テレビ</h3>
            <p style={{ marginBottom: '12px' }}>
              日本テレビもワールドカップ2026の放送権を保有。日本戦を中心に中継予定です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料（受信料のみ）<br />
              <strong>対象:</strong> 日本戦中心<br />
              <strong>契約期間:</strong> 不要<br />
              <strong>画質:</strong> 地デジ
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">地上波（無料）</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>フジテレビ</h3>
            <p style={{ marginBottom: '12px' }}>
              フジテレビも放送権を保有しており、全10試合を系列で生中継する予定です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料（受信料のみ）<br />
              <strong>対象:</strong> 10試合<br />
              <strong>契約期間:</strong> 不要<br />
              <strong>画質:</strong> 地デジ
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">配信（有料）</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>DAZN</h3>
            <p style={{ marginBottom: '12px' }}>
              FIFAワールドカップ2026のネット配信権を保有。全試合の配信をカバーする予定で、日本戦以外の全試合を視聴するにはDAZNが最も確実です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 月額制（詳細は公式サイト参照）<br />
              <strong>対象:</strong> 全試合（予定）<br />
              <strong>契約期間:</strong> 月額契約<br />
              <strong>画質:</strong> 最大4K
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">配信（無料〜）</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ABEMA</h3>
            <p style={{ marginBottom: '12px' }}>
              ABEMAもワールドカップ2026の配信を予定。無料プランで視聴できる試合もある一方、全試合を網羅するには有料プランが必要になる可能性があります。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料プランあり（一部有料）<br />
              <strong>対象:</strong> 全試合（予定）<br />
              <strong>契約期間:</strong> 月額契約<br />
              <strong>画質:</strong> 最大1080p
            </div>
          </article>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="comparison">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">PLATFORM COMPARISON</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>プラットフォーム詳細比較</h2>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E7E5E4' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', minWidth: '100px' }}>サービス</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>種類</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>料金</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>対象試合</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>画質</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>契約期間</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>おすすめ度</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px', fontWeight: 600 }}>NHK</td>
                <td style={{ padding: '12px 8px' }}>地上波</td>
                <td style={{ padding: '12px 8px' }}>無料</td>
                <td style={{ padding: '12px 8px' }}>日本戦全試合</td>
                <td style={{ padding: '12px 8px' }}>地デジ・BS</td>
                <td style={{ padding: '12px 8px' }}>不要</td>
                <td style={{ padding: '12px 8px' }}>★★★★★</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px', fontWeight: 600 }}>日本テレビ</td>
                <td style={{ padding: '12px 8px' }}>地上波</td>
                <td style={{ padding: '12px 8px' }}>無料</td>
                <td style={{ padding: '12px 8px' }}>日本戦中心</td>
                <td style={{ padding: '12px 8px' }}>地デジ</td>
                <td style={{ padding: '12px 8px' }}>不要</td>
                <td style={{ padding: '12px 8px' }}>★★★★☆</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px', fontWeight: 600 }}>フジテレビ</td>
                <td style={{ padding: '12px 8px' }}>地上波</td>
                <td style={{ padding: '12px 8px' }}>無料</td>
                <td style={{ padding: '12px 8px' }}>10試合</td>
                <td style={{ padding: '12px 8px' }}>地デジ</td>
                <td style={{ padding: '12px 8px' }}>不要</td>
                <td style={{ padding: '12px 8px' }}>★★★☆☆</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px', fontWeight: 600 }}>DAZN</td>
                <td style={{ padding: '12px 8px' }}>配信</td>
                <td style={{ padding: '12px 8px' }}>有料（月額）</td>
                <td style={{ padding: '12px 8px' }}>全試合（予定）</td>
                <td style={{ padding: '12px 8px' }}>最大4K</td>
                <td style={{ padding: '12px 8px' }}>月額契約</td>
                <td style={{ padding: '12px 8px' }}>★★★★★</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px', fontWeight: 600 }}>ABEMA</td>
                <td style={{ padding: '12px 8px' }}>配信</td>
                <td style={{ padding: '12px 8px' }}>無料〜</td>
                <td style={{ padding: '12px 8px' }}>全試合（予定）</td>
                <td style={{ padding: '12px 8px' }}>最大1080p</td>
                <td style={{ padding: '12px 8px' }}>月額契約</td>
                <td style={{ padding: '12px 8px' }}>★★★★☆</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#F9F7F5', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>プラットフォーム選びのポイント</h3>
          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>「日本戦だけ見たい」場合：</strong>NHKが最も確実です。総合テレビ・BSで日本戦全試合を生中継し、受信料のみで視聴できます。日本テレビやフジテレビも日本戦を中継しますが、NHKが最もカバー範囲が広いです。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>「全試合網羅したい」場合：</strong>DAZNが最も確実です。FIFAワールドカップ2026のネット配信権を保有し、全試合の配信をカバーする予定です。月額契約ですが、大会期間だけの利用も可能です。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>「無料でできるだけ多く見たい」場合：</strong>NHK（日本戦）+ ABEMA（無料プラン）の組み合わせがコスパが良いです。ABEMAは無料で視聴できる試合もあるため、DAZNと併用するのも手です。
            </p>
            <p>
              <strong>契約期間について：</strong>地上波は契約の縛りがありません。DAZN・ABEMAともに月額契約のため、大会期間中だけの利用も柔軟にできます。長期契約を求められるサービスは少ないですが、最新の料金プランは必ず公式サイトで確認してください。
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="overseas">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">OVERSEAS VIEWING</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>海外旅行・出張先での視聴</h2>
          </div>
        </div>
        <p style={{ marginBottom: '24px' }}>
          海外旅行や出張先でワールドカップを視聴する場合、現地の無料放送局でライブ中継を楽しめる場合があります。以下は、F1の海外無料視聴としても紹介した地域の放送局です。ワールドカップについても、これらの地域では無料で視聴できる可能性があります。
        </p>

        <div className="product-grid" style={{ marginTop: 0 }}>
          <article className="product-card">
            <div className="product-meta">Austria 🇦🇹</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ORF（オーストリア放送協会）</h3>
            <p style={{ marginBottom: '12px' }}>
              オーストリアの公共放送ORFは、FIFAワールドカップの放送権を保有しています。オーストリア旅行・出張中はORFのウェブサイトやアプリから無料でライブ視聴が可能です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>視聴方法:</strong> ORF ON（ウェブ・アプリ）<br />
              <strong>料金:</strong> 無料<br />
              <strong>言語:</strong> ドイツ語
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">Belgium 🇧🇪</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>RTBF（ベルギー・フランス語放送）</h3>
            <p style={{ marginBottom: '12px' }}>
              ベルギーのフランス語圏公共放送RTBFもワールドカップの放送権を保有。ベルギー旅行・出張中はRTBFのウェブサイトから無料で視聴できます。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>視聴方法:</strong> RTBF Auvio（ウェブ・アプリ）<br />
              <strong>料金:</strong> 無料<br />
              <strong>言語:</strong> フランス語
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">Germany 🇩🇪</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ARD / ZDF（ドイツ公共放送）</h3>
            <p style={{ marginBottom: '12px' }}>
              ドイツのARDとZDFは、FIFAワールドカップの主要試合の放送権を保有しています。ドイツ旅行・出張中は無料で視聴可能です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>視聴方法:</strong> ARD Mediathek / ZDFmediathek<br />
              <strong>料金:</strong> 無料<br />
              <strong>言語:</strong> ドイツ語
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">Switzerland 🇨🇭</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>SRG SSR（スイス公共放送）</h3>
            <p style={{ marginBottom: '12px' }}>
              スイスのSRG SSRもワールドカップ放送権を保有。スイス旅行・出張中は無料視聴が可能です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>視聴方法:</strong> srf.ch / rts.ch<br />
              <strong>料金:</strong> 無料<br />
              <strong>言語:</strong> ドイツ語・フランス語・イタリア語
            </div>
          </article>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#F9F7F5', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>海外視聴のポイント</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            上記の放送局は、それぞれの国内からアクセスした場合に無料で視聴できるサービスです。日本からアクセスする場合は、放送権の地域制限により視聴できない場合があります。海外旅行・出張の際は、現地のホテルや滞在先のテレビでも視聴できる可能性があります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '8px' }}>
            スポーツ観戦についても同様の仕組みで視聴できます。詳しくは
            <Link href="/posts/2026-06-03_fp-dvision-jg32-pb-review" style={{ color: '#4A433F', textDecoration: 'underline' }}>
              FP-DVISION JG32-PBのレビュー記事
            </Link>
            を参照してください。
          </p>
        </div>
      </section>

      <section style={{ marginTop: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">MIROFISH PREDICTION</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>Mirofishによるグループステージ予測</h2>
          </div>
        </div>

        <div style={{ padding: '16px', background: '#F0F7FF', borderRadius: '8px', marginBottom: '24px', border: '1px solid #D0E3F5' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#2C5282' }}>
            本予測はMirofishが実施したシミュレーションに基づいています。1500以上（11種類）のAgentが各チームの戦力、戦術、過去の対戦データ、市場動向、審判要因などを分析し、72場のグループステージ全試合について比分を予測しました。モデルベースのAgent（Opta、Elo、FIFAランキング）と人間判断ベースのAgent（ジャーナリスト、ファン、審判）の議論を経て、各試合の予測比分と信頼度を算出しています。参考情報としてご活用ください。
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
