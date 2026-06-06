# Smart Kurashi 商品発見サイト化 - 変更ログ

## 変更概要
- ホームを商品発見 / 比較 / レビュー導線中心に再設計
- トップナビを 4 項目に整理
- 商品カードと比較セクションを共通コンポーネント化
- 商品一覧・比較一覧・レビュー一覧を商品購買文脈で再構成
- メタデータ / JSON-LD / フッター文言を商品サイト向けに更新
- 偽のアフィリエイトIDを使わず、販売サイト検索リンクに差し替え

## 変更ファイル
- `src/app/page.tsx`
- `src/app/products/page.tsx`
- `src/app/reviews/page.tsx`
- `src/app/compare/page.tsx`
- `src/app/layout.tsx`
- `src/app/category/[slug]/page.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/ProductCard.tsx`
- `src/components/ComparisonTable.tsx`
- `src/lib/products.ts`

## コンポーネント
- `ProductCard`: 商品名、価格帯、評価、向いている人、注意点、購入先リンクをまとめて表示
- `ComparisonTable`: 比較・ランキング向けのカード群を再利用可能な形で表示
- `AffiliateDisclosure` を削除し、ホーム/商品一覧/比較/レビューの注意ボックスを廃止

## ナビゲーション変更
- `AI・テック`
- `家電・ガジェット`
- `商品を探す`
- `比較・ランキング`

## ホーム変更
- 商品発見を最優先にしたヒーロー
- 検索フォーム
- カテゴリ導線
- 比較・ランキング
- レビュー済み商品
- 買う前に読むガイド
- 最新レビュー / 更新情報

## SEO / 構造化データ
- page metadata を商品発見サイト向けに更新
- WebSite / Organization / ItemList の JSON-LD を更新
- カテゴリ説明も商品比較文脈に調整

## テスト
- `npm run build` ✅
- `npm run lint` ✅（既存の `img` 警告 2件のみ）
- ブラウザで `/`, `/products`, `/compare` をローカル確認 ✅

## 既知の制約
- 価格・在庫は販売サイト側で確認する前提
- リンクは現時点では検索/公式URL中心で、実アフィリエイトIDへの差し替え余地あり
- 既存の一部記事群はニュース/解説寄りで、今後さらに商品レビューへ寄せる余地あり
