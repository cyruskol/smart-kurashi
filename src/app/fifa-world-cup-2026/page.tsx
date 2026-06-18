import Link from 'next/link';
import type { Metadata } from 'next';
import MirofishTable from '@/components/MirofishTable';

export const metadata: Metadata = {
  title: '2026年サッカーW杯 視聴ガイド｜日本での放送・配信と海外無料視聴',
  description: '2026年FIFAワールドカップの日本視聴ガイド。NHK・日本テレビ・フジテレビの地上波放送、DAZN・ABEMA配信の料金比較、海外無料視聴オプションを解説。Mirofishによるグループステージ72試合予測、各チーム分析、グループ展望も掲載。放送権の仕組み、契約期間、画質比較、北米3カ国開催のW杯2026情報を網羅。',
};

export default function FifaWorldCup2026Page() {
  return (
    <main className="product-page">
      <section className="product-hero">
        <p className="sk-eyebrow">2026年サッカーW杯</p>
        <h1>2026年サッカーW杯 視聴ガイド</h1>
        <p>
          2026年夏、北米3カ国（アメリカ・カナダ・メキシコ）で開催されるFIFAワールドカップ2026。日本から全試合を視聴できる放送・配信先、料金プランの比較、契約期間の注意点、海外旅行・出張先での無料視聴オプションを詳しく解説します。また、Mirofishによるグループステージ全72試合の予測も掲載。
        </p>
        <div className="product-actions">
          <a href="#japan-broadcast" className="product-button product-button-primary">
            日本での放送・配信
          </a>
          <a href="#groups" className="product-button">
            グループステージ分析
          </a>
          <a href="#comparison" className="product-button">
            プラットフォーム比較
          </a>
          <a href="#mirofish" className="product-button">
            Mirofish予測
          </a>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="japan-broadcast">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">日本での放送・配信</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>日本での放送・配信先</h2>
          </div>
        </div>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          2026年FIFAワールドカップの日本における放送権は複数の放送局・配信サービスが保有しています。日本代表戦は地上波（NHK、日本テレビ、フジテレビ）で無料視聴が可能ですが、全試合を網羅するにはDAZNやABEMAなどのネット配信サービスが必要です。以下に各プラットフォームの詳細をまとめました。
        </p>

        <div className="product-grid" style={{ marginTop: 0 }}>
          <article className="product-card">
            <div className="product-meta">地上波（無料）</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>NHK</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              日本戦全試合を総合テレビとBSで生中継。受信料のみで視聴できる最も基本的なオプションです。2026年W杯ではBSの4K対応も予定されており、高精細でサッカー観戦を楽しめます。解説陣も強化され、元日本代表選手や専門解説員がリアルタイムで試合を分析します。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>料金:</strong> 無料（受信料のみ）<br />
              <strong>対象:</strong> 日本戦全試合<br />
              <strong>契約期間:</strong> 不要<br />
              <strong>画質:</strong> 地デジ・BS（4K対応予定）
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">地上波（無料）</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>日本テレビ</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              日本テレビもワールドカップ2026の放送権を保有。日本戦を中心に中継予定で、グループステージの主要試合や決勝トーナメントの日本戦をカバーします。日テレ系の配信サービス「Hulu」や「日テレPLUS」との併用で、見逃し配信も利用可能です。
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
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              フジテレビも放送権を保有しており、全10試合を系列で生中継する予定です。日本戦に加え、日本と親和性の高いチームの試合や、注目のグループステージ選戦を中継する見通しです。フジテレビの見逃し配信サービス「FOD」でも一部試合を視聴できる可能性があります。
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
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              2026年サッカーW杯のネット配信権を保有。全試合の配信をカバーする予定で、日本戦以外の全試合を視聴するにはDAZNが最も確実です。DAZNはスポーツ配信に特化したサービスで、サッカーのみならずF1や格闘技なども視聴可能。W杯期間中は特別プランが用意される可能性もあり、月額契約ですが大会期間だけの利用も柔軟にできます。マルチデバイス対応（スマホ・タブレット・PC・テレビ）で、自宅でも外出先でも視聴できます。
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
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              ABEMAもワールドカップ2026の配信を予定。無料プランで視聴できる試合もある一方、全試合を網羅するには有料プランが必要になる可能性があります。ABEMAはアニメやバラエティなど多彩なコンテンツも配信しており、スポーツ観戦とエンタメを一つのアプリで楽しめる点が魅力です。W杯期間中はスポーツカテゴリが強化される見通しです。
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

      <section style={{ marginTop: '44px' }} id="groups">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">グループステージ分析</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>W杯グループステージ 組み合わせと展望</h2>
          </div>
        </div>

        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          2026年FIFAワールドカップは史上最多の48チームが参加し、12グループ（各4チーム）でグループステージが行われます。以下に各グループの組み合わせと、各チームの強み・弱み、注目ポイントを詳しく解説します。
        </p>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループA：東道主メキシコ、南アフリカ、韓国、チェコ</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            東道主メキシコが率いるグループA。メキシコはW杯の常連国で、ホームアドバンテージを活かした攻撃的なサッカーが特徴です。南アフリカはフィジカルと組織力が強みで、W杯本大会経験も豊富。韓国はスピードと技術を武器にしており、チェコは堅守とカウンター攻撃が得意です。このグループは実力が拮抗しており、どのチームも進出する可能性があります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>メキシコ対南アフリカ（6/11）、韓国対チェコ（6/11）の同日カードがグループの行方を決める重要な試合になります。メキシコのホームでの開幕戦は大会の盛り上がりを左右する注目の一戦です。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループB：アメリカ、パラグアイ、オーストラリア、トルコ</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            開催国アメリカが率いるグループB。アメリカは若手選手の台頭により攻撃力が向上しており、W杯での活躍が期待されています。パラグアイは堅守とフィジカルが強みで、南米らしいタフなサッカーを展開。オーストラリアは身体能力の高さが武器で、トルコは攻撃的でクリエイティブなサッカーが特徴です。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>アメリカ対パラグアイ（6/12）はグループの首位を争う重要な一戦。オーストラリア対トルコ（6/13）も含め、実力が近いチーム同士の激戦が予想されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループC：ドイツ、コートジボワール、エクアドル、キュラソー</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            ドイツが圧倒的な実力でグループCの最有力候補です。W杯4回優勝経験を持つドイツは、若手とベテランのバランスが良く、どの戦術にも対応可能な柔軟性が強み。コートジボワールはアフリカの雄として身体能力と技術を兼ね備え、エクアドルは粘り強さが特徴。キュラソーはW杯初出場を目指す意気込みがあります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>ドイツ対コートジボワール（6/20）はグループのハイライト。ドイツの攻撃力とコートジボワールの堅守の勝負が注目されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループD：オランダ、日本、スウェーデン、チュニジア</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            日本代表が入るグループDは「死のグループ」と呼ばれる可能性があります。オランダは攻撃的で華麗なサッカーが特徴で、日本は組織力と技術の高さが強み。スウェーデンはフィジカルと規律が武器で、チュニジアはスピードと個人技が光ります。日本にとっては厳しいグループですが、W杯での経験を活かせば進出の可能性は十分にあります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>オランダ対日本（6/14）は日本のW杯の命運を決める最重要カード。スウェーデン対チュニジア（6/14）も同日に行われ、グループの混雑度が高まります。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループE：ブラジル、モロッコ、ハイチ、スコットランド</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            ブラジルが所属するグループE。ブラジルはW杯最多優勝回数（5回）を誇り、攻撃的で華やかなサッカーが特徴です。モロッコは2022年W杯でベスト4に入る活躍を見せ、ハイチとスコットランドはW杯での経験を活かした戦いが求められます。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>ブラジル対モロッコ（6/13）はグループの首位争い。ブラジル対ハイチ（6/19）も注目のカードで、ブラジルの攻撃力が試されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループF：フランス、セネガル、イラク、ノルウェー</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            前回大会王者フランスが入るグループF。フランスは選手層の厚さと戦術の柔軟性が強みで、W杯連覇を狙う姿勢は揺るぎません。セネガルはアフリカ王者として身体能力と組織力を兼ね備え、イラクとノルウェーは粘り強さが特徴です。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>フランス対セネガル（6/16）はグループの最重要カード。フランスの攻撃力とセネガルの堅守の勝負に注目が集まります。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループG：スペイン、サウジアラビア、ウルグアイ、カーボベルデ</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            スペインが率いるグループG。スペインはパスゲームとポゼッションサッカーが特徴で、W杯での経験も豊富。サウジアラビアは急速なサッカー強化を進めており、ウルグアイは南米の伝統的な強豪。カーボベルデはW杯初出場を目指す意気込みがあります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>スペイン対サウジアラビア（6/15）はグループの首位を争う一戦。スペインのパスゲームとサウジアラビアのスピードの対比が注目されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループH：アルゼンチン、アルジェリア、オーストリア、ヨルダン</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            前回大会優勝アルゼンチンが入るグループH。アルゼンチンはW杯優勝経験と選手層の厚さが強みで、W杯2連覇を狙います。アルジェリアはアフリカの強豪として組織力とスピードが武器。オーストラリアとヨルダンは粘り強さが特徴で、波乱を起こす可能性があります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>アルゼンチン対アルジェリア（6/16）はグループのハイライト。アルゼンチンの攻撃力とアルジェリアの組織力の対決が注目されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループI：ポルトガル、コロンビア、コンゴ民主共和国、ウズベキスタン</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            ポルトガルが率いるグループI。ポルトガルはW杯経験豊富で、攻撃的で華やかなサッカーが特徴。コロンビアは南米の強豪として技術とスピードが武器。コンゴ民主共和国とウズベキスタンはW杯での経験を活かした戦いが求められます。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>ポルトガル対コロンビア（6/17）はグループの最重要カード。両チームの攻撃力の高さが注目されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループJ：イングランド、クロアチア、ガーナ、パナマ</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            イングランドが所属するグループJ。イングランドは攻撃力と選手層の厚さが強みで、W杯での活躍が期待されています。クロアチアは2018年W杯準優勝経験があり、ガーナはアフリカの強豪。パナマはW杯初出場を目指す意気込みがあります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>イングランド対クロアチア（6/17）はグループのハイライト。両チームの攻撃的サッカーがぶつかり合う注目の一戦です。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループK：ベルギー、イラン、エジプト、ニュージーランド</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            ベルギーが率いるグループK。ベルギーは「黄金世代」と呼ばれ、攻撃的で華麗なサッカーが特徴。イランとエジプトはアジア・アフリカの強豪として組織力が強み。ニュージーランドはW杯初出場を目指す意気込みがあります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>ベルギー対イラン（6/15）はグループの首位争い。ベルギーの攻撃力とイランの組織力の対決が注目されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>グループL：サウジアラビア、ウルグアイ、スペイン、カーボベルデ</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            サウジアラビアとウルグアイが同じグループに。サウジアラビアは急速なサッカー強化を進めており、ウルグアイは南米の伝統的な強豪。スペインはパスゲームとポゼッションサッカーが特徴で、カーボベルデはW杯初出場を目指す意気込みがあります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>注目カード：</strong>サウジアラビア対ウルグアイ（6/15）はグループの最重要カード。両チームの対比が注目されます。
          </p>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#F0F7FF', borderRadius: '8px', border: '1px solid #D0E3F5' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#2C5282' }}>2026年W杯の注目ポイント</h3>
          <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#2C5282' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>史上最多48チーム参加：</strong>2026年W杯は初めて48チームが参加する大会。従来の32チームから拡大され、より多くの国がW杯の舞台を目指します。グループステージは12グループ（各4チーム）で行われ、各グループの上位2チームと、成績が良かった8チームの計24チームが決勝トーナメントに進出します。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>北米3カ国での共催：</strong>アメリカ、カナダ、メキシオの3カ国で開催されるW杯は、史上最大規模のスポーツイベントの一つ。北米大陸の広大な大地で、サッカーの熱狂が巻き起こります。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>日本代表の戦い：</strong>日本はグループDでオランダ、スウェーデン、チュニジアと対戦。厳しいグループですが、W杯での経験を活かせば進出の可能性は十分にあります。日本戦は地上波で無料視聴可能なので、ぜひ応援しましょう。
            </p>
            <p>
              <strong>放送権の仕組み：</strong>日本のW杯放送権は複数の放送局・配信サービスが保有。地上波は日本戦中心、DAZNは全試合カバーが予定されています。海外では各国の公共放送局が放送権を保有しており、現地で無料視聴が可能です。
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="comparison">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">放送・配信プラットフォーム</p>
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
                <td style={{ padding: '12px 8px' }}>地デジ・BS（4K予定）</td>
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
              <strong>「日本戦だけ見たい」場合：</strong>NHKが最も確実です。総合テレビ・BSで日本戦全試合を生中継し、受信料のみで視聴できます。日本テレビやフジテレビも日本戦を中継しますが、NHKが最もカバー範囲が広いです。2026年はBSの4K対応も予定されており、高精細でサッカー観戦を楽しみたい方におすすめです。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>「全試合網羅したい」場合：</strong>DAZNが最も確実です。2026年サッカーW杯のネット配信権を保有し、全試合の配信をカバーする予定です。月額契約ですが、大会期間だけの利用も柔軟にできます。DAZNはサッカー以外にもF1や格闘技など多彩なスポーツを配信しており、W杯が終わっても継続して利用できる点が魅力です。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>「無料でできるだけ多く見たい」場合：</strong>NHK（日本戦）+ ABEMA（無料プラン）の組み合わせがコスパが良いです。ABEMAは無料で視聴できる試合もあるため、DAZNと併用するのも手です。ABEMAはアニメやバラエティなど多彩なコンテンツも配信しており、スポーツ観戦とエンタメを一つのアプリで楽しめます。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>「海外旅行・出張先で視聴したい」場合：</strong>オーストリアのORF、ベルギーのRTBF、ドイツのARD/ZDF、スイスのSRG SSRなど、各国の公共放送局がW杯の放送権を保有しています。現地からアクセスすれば無料で視聴可能です。ただし、日本からのアクセスは放送権の地域制限により視聴できない場合があります。
            </p>
            <p>
              <strong>契約期間について：</strong>地上波は契約の縛りがありません。DAZN・ABEMAともに月額契約のため、大会期間中だけの利用も柔軟にできます。長期契約を求められるサービスは少ないですが、最新の料金プランは必ず公式サイトで確認してください。解約手数料や最低利用期間がないかも確認することをおすすめします。
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="overseas">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">海外での視聴</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>海外旅行・出張先での視聴</h2>
          </div>
        </div>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          海外旅行や出張先でワールドカップを視聴する場合、現地の無料放送局でライブ中継を楽しめる場合があります。以下は、F1の海外無料視聴としても紹介した地域の放送局です。ワールドカップについても、これらの地域では無料で視聴できる可能性があります。
        </p>

        <div className="product-grid" style={{ marginTop: 0 }}>
          <article className="product-card">
            <div className="product-meta">オーストリア</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ORF（オーストリア放送協会）</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              オーストリアの公共放送ORFは、サッカーW杯の放送権を保有しています。オーストリア旅行・出張中はORFのウェブサイトやアプリから無料でライブ視聴が可能です。ORF ONはスマホ・タブレット・PCに対応しており、ホテルのWi-Fiや現地のモバイル回線から視聴できます。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>視聴方法:</strong> ORF ON（ウェブ・アプリ）<br />
              <strong>料金:</strong> 無料<br />
              <strong>言語:</strong> ドイツ語
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">ベルギー</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>RTBF（ベルギー・フランス語放送）</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              ベルギーのフランス語圏公共放送RTBFもワールドカップの放送権を保有。ベルギー旅行・出張中はRTBFのウェブサイトから無料で視聴できます。RTBF Auvioはベルギー国内からアクセス可能で、フランス語の実況を楽しめます。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>視聴方法:</strong> RTBF Auvio（ウェブ・アプリ）<br />
              <strong>料金:</strong> 無料<br />
              <strong>言語:</strong> フランス語
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">ドイツ</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ARD / ZDF（ドイツ公共放送）</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              ドイツのARDとZDFは、サッカーW杯の主要試合の放送権を保有しています。ドイツ旅行・出張中は無料で視聴可能です。ARD MediathekとZDFmediathekはドイツ国内からアクセス可能で、ドイツ語の実況を楽しめます。
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>視聴方法:</strong> ARD Mediathek / ZDFmediathek<br />
              <strong>料金:</strong> 無料<br />
              <strong>言語:</strong> ドイツ語
            </div>
          </article>

          <article className="product-card">
            <div className="product-meta">スイス</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>SRG SSR（スイス公共放送）</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.7' }}>
              スイスのSRG SSRもワールドカップ放送権を保有。スイス旅行・出張中は無料視聴が可能です。srf.chとrts.chはスイス国内からアクセス可能で、ドイツ語・フランス語・イタリア語の実況を楽しめます。
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
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '8px' }}>
            上記の放送局は、それぞれの国内からアクセスした場合に無料で視聴できるサービスです。日本からアクセスする場合は、放送権の地域制限により視聴できない場合があります。海外旅行・出張の際は、現地のホテルや滞在先のテレビでも視聴できる可能性があります。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            スポーツ観戦についても同様の仕組みで視聴できます。詳しくは
            <Link href="/posts/2026-06-03_fp-dvision-jg32-pb-review" style={{ color: '#4A433F', textDecoration: 'underline' }}>
              FP-DVISION JG32-PBのレビュー記事
            </Link>
            を参照してください。
          </p>
        </div>
      </section>

      <section style={{ marginTop: '44px' }} id="mirofish">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div>
            <p className="sk-eyebrow">Mirofish予測</p>
            <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)' }}>Mirofishによるグループステージ予測</h2>
          </div>
        </div>

        <div style={{ padding: '20px', background: '#F0F7FF', borderRadius: '8px', marginBottom: '24px', border: '1px solid #D0E3F5' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#2C5282' }}>Mirofishとは？</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#2C5282', marginBottom: '12px' }}>
            Mirofishは、スポーツ予測のための分散型予測プラットフォームです。複数のAIエージェントと人間の専門家が協力して、スポーツ試合の結果を予測します。従来の単一モデルによる予測とは異なり、多様な視点・手法を統合することで、より精度の高い予測を実現することを目指しています。
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#2C5282' }}>
            Mirofishの名前は、魚の群れが持つ集団知能に由来します。個々の魚は限定的な情報しか持たないものの、群れ全体として最適な行動を選択するように、Mirofishは複数のエージェントの知見を統合して予測を行います。
          </p>
        </div>

        <div style={{ padding: '20px', background: '#F9F7F5', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>予測手法と方法論</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
            Mirofishの予測は、以下の手法を組み合わせて算出しています：
          </p>
          <div style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px', paddingLeft: '16px' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>1. モデルベース予測（Opta、Elo、国際ランキング）：</strong>統計モデルとアルゴリズムに基づく客観的な予測です。Optaはスポーツデータ分析の世界的リーダーで、Eloレーティングはチェスで考案された手法をスポーツに応用したものです。FIFA国際ランキングも参考にされます。これらのモデルは過去の対戦データ、チームの戦力、フォームなどを数値化して予測を行います。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>2. 人間判断ベース予測（ジャーナリスト、ファン、審判）：</strong>サッカー専門家やファン、審判員の主観的な判断を反映します。モデルでは捉えきれない要素（チームの雰囲気、怪我・停戦の影響、監督の戦術変更など）を人間の視点から補完します。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>3. 市場動向分析：</strong>ブッカーのオッズ変動や、賭け市場の動向も参考にされます。市場は多くの参加者の判断を反映しており、予測の精度向上に寄与します。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>4. 審判要因分析：</strong>審判の傾向（イエローカードの出しやすさ、ペナルティ判定の傾向など）も予測に組み込まれます。W杯では審判の判断が試合結果を大きく左右することがあります。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>5. 議論と統合：</strong>1500以上（11種類）のエージェントが各チームの戦力、戦術、過去の対戦データ、市場動向、審判要因などを分析し、72場のグループステージ全試合について比分を予測しました。モデルベースのエージェントと人間判断ベースのエージェントの議論を経て、各試合の予測比分と信頼度を算出しています。
            </p>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <strong>信頼度について：</strong>各予測には信頼度（%）が付与されています。信頼度が高いほど複数のエージェントが同じ予測に合意していることを意味し、低いほど予測の分岐が大きいことを示します。信頼度80%以上は「高」、70-79%は「やや高」、60-69%は「中」、60%未満は「低」と表示しています。
          </p>
        </div>

        <div style={{ padding: '20px', background: '#FFF8F0', borderRadius: '8px', marginBottom: '24px', border: '1px solid #F5D9A8' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#7B4F1A' }}>予測の読み方</h3>
          <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#7B4F1A' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>試合番号と日付：</strong>各試合には番号と開催日付が記載されています。グループステージは6月11日から6月27日まで行われます。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>対戦カード：</strong>対戦する2チームが表示されています。日本代表の試合はグループD（オランダ、スウェーデン、チュニジアとの対戦）が含まれています。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>予測比分：</strong>Mirofishが予測したスコアです。例えば「2-0」はチームAの2-0勝利を予測しています。「引分」は引き分けを予測しています。
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>結果：</strong>予測された勝利チームです。「引分」の場合は引き分けを予測しています。
            </p>
            <p>
              <strong>信頼度：</strong>予測の確実性を示す指標です。複数のエージェントが同じ予測に合意しているほど信頼度が高くなります。
            </p>
          </div>
        </div>

        <MirofishTable />

        <div style={{ marginTop: '24px', padding: '16px', background: '#F0F7FF', borderRadius: '8px', border: '1px solid #D0E3F5' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#2C5282' }}>免責事項</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#2C5282' }}>
            本予測はMirofishが実施したシミュレーションに基づいた参考情報です。実際の試合結果を保証するものではありません。予測は統計データと専門家の判断を組み合わせていますが、スポーツの結果は予測不可能な要素（怪イ、天候、審判の判断など）に左右されるため、実際の結果と異なる場合があります。ギャンブルでの利用はお控えください。
          </p>
        </div>
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
