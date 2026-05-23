import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要',
  description: 'Smart Kurashi は、スマートホーム・AI 家電・IoT 技術の最新ニュースと専門情報を提供する日本のテクノロジーメディアです。',
};

export default function AboutPage() {
  return (
    <main style={{ background: '#F8FAFC', padding: '48px 0' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 16px' }}>
        <nav style={{ marginBottom: '24px' }}>
          <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="/" style={{ color: '#5A534E' }} className="hover:text-orange-500">ホーム</a></li>
            <li style={{ color: '#F1F5F9' }}>/</li>
            <li style={{ color: '#4A433F' }}>会社概要</li>
          </ol>
        </nav>

        <div style={{ background: '#fff', borderRadius: '8px', padding: '48px', border: '1px solid #E7E5E4' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '64px', height: '64px', background: '#A9582D', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '24px' }}>SK</span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#292524', letterSpacing: '', marginBottom: '8px' }}>Smart Kurashi</h1>
            <p style={{ fontSize: '16px', color: '#5A534E' }}>スマートなくらいの情報をお届け</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#292524', marginBottom: '16px' }}>私たちについて</h2>
            <p style={{ fontSize: '16px', color: '#4A433F', lineHeight: 1.8, marginBottom: '16px' }}>
              Smart Kurashi は、「スマートなくらい」の実現をミッションに、最新のテクノロジー情報を日本語で提供しています。
              スマートホームデバイス、AI 家電、IoT 技術、省エネルギーソリューションなど、私たちの生活を変える技術トレンドを、専門的かつわかりやすくお届けします。
            </p>
            <p style={{ fontSize: '16px', color: '#4A433F', lineHeight: 1.8 }}>
              AI が家の温度を自動調整し、音声アシスタントが日用品の発注を手伝い、太陽光発電と蓄電池が最適に連携する時代。
              私たちは、そんな未来のくらしに役立つ情報を発信します。
            </p>
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '24px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#292524', marginBottom: '16px' }}>メディア情報</h2>
            <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                ['メディア名', 'Smart Kurashi（スマートくらし）'],
                ['設立', '2026 年'],
                ['運営', 'Smart Kurashi'],
                ['URL', 'smart-kurashi.jp'],
              ].map(([dt, dd]) => (
                <div key={dt}>
                  <dt style={{ fontSize: '12px', fontWeight: 600, color: '#5A534E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{dt}</dt>
                  <dd style={{ fontSize: '15px', fontWeight: 500, color: '#292524' }}>{dd}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#292524', marginBottom: '16px' }}>取り扱い分野</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { title: 'AI&テック', desc: '生成 AI、機械学習、チャットボットなど人工知能分野の最新トレンド', color: '#4338CA' },
                { title: 'スマートホーム', desc: 'スマートスピーカー、照明、セキュリティカメラなど家庭の IoT 化', color: '#047857' },
                { title: '省エネルギー', desc: 'HEMS、太陽光発電、蓄電池など持続可能な住まいの技術', color: '#B45309' },
                { title: 'セキュリティ', desc: 'スマートロック、監視カメラなど家庭の安全を守る技術', color: '#DC2626' },
              ].map((item) => (
                <div key={item.title} style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', borderTop: '2px solid ${item.color}', borderLeft: 'none' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#292524', marginBottom: '4px' }}>{item.title}</h3>
                  <p style={{ fontSize: '12px', color: '#5A534E', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
