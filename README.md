# BulkLog

体重を記録・管理するためのシンプルなWebアプリです。

## 概要

日々の体重を手軽に記録し、履歴として確認できます。
Next.js + TypeScript で構築し、Playwright による E2E テストを実装しています。

## 使用技術

- **フロントエンド:** Next.js / TypeScript / CSS
- **テスト:** Playwright（E2Eテスト）

## 機能

- 体重の記録（kg単位）
- 記録履歴の表示

## テストについて

QAエンジニアとしてのスキルアップを目的に、Playwrightを用いたE2Eテストを実装しています。

### 現在のテストケース
- 体重を入力して履歴に表示されること（正常系）
- 空データを登録できないこと
- 登録可能な最小値で登録できること
- 体重登録した同日に再度体重登録を行い、結果が上書きされること


## ローカル起動方法

\`\`\`bash
npm install
npm run dev
\`\`\`

http://localhost:3000 で起動します。

## テスト実行方法

\`\`\`bash
npx playwright test
\`\`\`

## デモ

https://bulk-log.vercel.app
