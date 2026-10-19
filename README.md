# Pixi Battle

アンテ風バトルのひな形です。ロジックは素の JavaScript で書き、描画だけ PixiJS に任せます。

## ファイル

- `src/main.js`：ゲームループ。ロジックは 60fps 固定で進める
- `src/input.js`：キーボードとタッチのドラッグ
- `src/game.js`：ロジック（位置・弾・当たり判定）。画面のことは知らない
- `src/sprites.js`：文字列からドット絵テクスチャを作る
- `src/view.js`：`state` を読んで Pixi のスプライトに写す

## コマンド

    npm install       # 最初に1回
    npm run dev       # 開発サーバー（保存すると自動で更新）
    npm run build     # dist/index.html 1ファイルに書き出し

## 操作

- 矢印キー / WASD：移動
- スマホ：画面をドラッグ
