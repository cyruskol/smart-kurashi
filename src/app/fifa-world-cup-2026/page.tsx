import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIFAワールドカップ2026 視聴ガイド｜日本での放送・配信と海外無料視聴',
  description: 'FIFAワールドカップ2026を日本で視聴する方法をまとめたページ。NHK、日本テレビ、フジテレビ、ABEMAなどの放送・配信先、料金プラン、契約期間の注意点、海外からの無料視聴オプションを解説。',
};

export default function FifaWorldCup2026Page() {
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">FIFA WORLD CUP 2026</p>
        <h1>FIFAワールドカップ2026 視聴ガイド</h1>
        <p>
          2026年夏、北米3カ国（アメリカ・カナダ・メキシコ）で開催されるFIFAワールドカップ。日本から全試合を視聴できる放送・配信先、料金プラン、契約の注意点をまとめました。
        </p>
        <div className="product-actions">
          <a
            href="#japan-broadcast"
            className="product-button product-button-primary"
          >
            日本での放送・配信
          </a>
          <a
            href="#overseas"
            className="product-button"
          >
            海外からの視聴
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
          2026年大会の日本における放送権は複数の放送局・配信サービスが保有しています。日本戦は地上波で視聴できる一方、全試合を網羅するには配信サービスの併用が現実的です。
        </p>

        <div className="product-grid" style={{ marginTop: 0 }}>
          <article className="product-card">
            <div className="product-meta">地上波</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>NHK</h3>
            <p style={{ marginBottom: '12px' }}>
              日本戦全試合を総合テレビとBSで生中継。無料で視聴できる最もオプションです。本田圭佑さんが解務を務める点も注目です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料（受信料のみ）<br />
              <strong>対象:</strong> 日本戦全試合<br />
              <strong>契約期間:</strong> 不要
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">地上波</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>日本テレビ</h3>
            <p style={{ marginBottom: '12px' }}>
              日本テレビもワールドカップ2026の放送権を保有。日本戦を中心に中継予定です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料（受信料のみ）<br />
              <strong>対象:</strong> 日本戦中心<br />
              <strong>契約期間:</strong> 不要
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">地上波</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>フジテレビ</h3>
            <p style={{ marginBottom: '12px' }}>
              フジテレビも放送権を保有しており、一部試合の中継を予定しています。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料（受信料のみ）<br />
              <strong>対象:</strong> 一部試合<br />
              <strong>契約期間:</strong> 不要
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">配信</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ABEMA</h3>
            <p style={{ marginBottom: '12px' }}>
              ネット配信ではABEMAがワールドカップ2026の配信を予定。全試合の配信をカバーする可能性が高く、スマートフォンやテレビからの視聴が可能です。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料プランあり（一部有料）<br />
              <strong>対象:</strong> 全試合（予定）<br />
              <strong>契約期間:</strong> 不要
            </div>
          </article>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="pricing">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">PLANS &amp; PRICING</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>料金プラン比較</h2>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E7E5E4' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>サービス</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>料金</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>対象試合</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>契約期間</th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>おすすめ度</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px' }}>NHK</td>
                <td style={{ padding: '12px 8px' }}>無料</td>
                <td style={{ padding: '12px 8px' }}>日本戦全試合</td>
                <td style={{ padding: '12px 8px' }}>不要</td>
                <td style={{ padding: '12px 8px' }}>★★★★★</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px' }}>日本テレビ</td>
                <td style={{ padding: '12px 8px' }}>無料</td>
                <td style={{ padding: '12px 8px' }}>日本戦中心</td>
                <td style={{ padding: '12px 8px' }}>不要</td>
                <td style={{ padding: '12px 8px' }}>★★★★☆</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px' }}>フジテレビ</td>
                <td style={{ padding: '12px 8px' }}>無料</td>
                <td style={{ padding: '12px 8px' }}>一部試合</td>
                <td style={{ padding: '12px 8px' }}>不要</td>
                <td style={{ padding: '12px 8px' }}>★★★☆☆</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td style={{ padding: '12px 8px' }}>ABEMA</td>
                <td style={{ padding: '12px 8px' }}>無料〜</td>
                <td style={{ padding: '12px 8px' }}>全試合（予定）</td>
                <td style={{ padding: '12px 8px' }}>不要</td>
                <td style={{ padding: '12px 8px' }}>★★★★☆</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#F9F7F5', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>契約期間について</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            地上波（NHK・日本テレビ・フジテレビ）は契約期間の縛りがなく、受信料のみで視聴可能です。ABEMAも基本的に月額契約のため、大会期間だけの利用も柔軟にできます。長期契約を求められるサービスは少ないですが、各サービスの最新料金プランは必ず公式サイトで確認してください。
          </p>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="overseas">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">OVERSEAS VIEWING</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>海外からの無料視聴</h2>
          </div>
        </div>
        <p style={{ marginBottom: '24px' }}>
          海外渡航中にワールドカップを視聴する場合、現地の無料放送局でライブ中継を楽しめる場合があります。以下は、F1の海外無料視聴としても紹介した地域の放送局です。ワールドカップについても、これらの地域では無料で視聴できる可能性があります。
        </p>

        <div className="product-grid" style={{ marginTop: 0 }}>
          <article className="product-card">
            <div className="product-meta">Austria 🇦🇹</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ORF（オーストリア放送協会）</h3>
            <p style={{ marginBottom: '12px' }}>
              オーストリアの公共放送ORFは、FIFAワールドカップの放送権を保有しています。オーストリア滞在中はORFのウェブサイトやアプリから無料でライブ視聴が可能です。
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
              ベルギーのフランス語圏公共放送RTBFもワールドカップの放送権を保有。ベルギー滞在中はRTBFのウェブサイトから無料で視聴できます。
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
              ドイツのARDとZDFは、FIFAワールドカップの主要試合の放送権を保有しています。ドイツ滞在中は無料で視聴可能です。
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
              スイスのSRG SSRもワールドカップ放送権を保有。スイス滞在中は無料視聴が可能です。
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
            上記の放送局は、それぞれの国内からアクセスした場合に無料で視聴できるサービスです。日本からアクセスする場合は、放送権の地域制限により視聴できない場合があります。海外渡航の際は、現地のホテルや滞在先のテレビでも視聴できる可能性があります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '8px' }}>
            F1の海外無料視聴についても同様の仕組みで視聴できます。詳しくは
            <Link href="/posts/2026-06-03_fp-dvision-jg32-pb-review" style={{ color: '#4A433F', textDecoration: 'underline' }}>
              FP-DVISION JG32-PBのレビュー記事
            </Link>
            を参照してください。
          </p>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="summary">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">SUMMARY</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem' }}>まとめ</h2>
          </div>
        </div>

        <div style={{ padding: '20px', background: '#F9F7F5', borderRadius: '12px' }}>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8', fontSize: '15px' }}>
            <li>日本戦だけ見たいなら、NHK・日本テレビ・フジテレビの地上波で無料視聴可能</li>
            <li>全試合網羅ならABEMAが最もコスパが良い</li>
            <li>契約期間の縛りはほとんどなく、柔軟に利用できる</li>
            <li>海外渡航中は、現地の公共放送で無料視聴できる場合がある（ORF、RTBF、ARD/ZDF、SRG SSRなど）</li>
            <li>海外の放送局は、F1の視聴と同じ仕組みでワールドカップもカバーしている</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '44px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#888' }}>
          このページは随時更新されます。最新情報は各放送局・配信サービスの公式サイトでご確認ください。
        </p>
      </section>
    </main>
  );
}
