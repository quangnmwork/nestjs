# React number format と　 Intl API を比較

## Intl API

### Pros

- Built-in API : パッケージ必要はない

### Cons

- 文字列を数値に反転するのは非常に複雑 -> リスク高いかも
- 値形式から数値への変換 (たとえば、1,000 から 1000 となる) に関するドキュメントはあまりない
- これは私の個人的な意見ですが、10 進数値の処理は非常に困難です (Intl.tsx ファイルのコード 27 行目を参照)

## React number format API

### Pros

- Shadcn と統合できる
- ユーザーの入力時に検証する（例：10,000 円を超える値の入力を許可しない、テキストの入力を許可しない）
- クレジット カードの入力検証に適したパターン形式をサポート (Int はサポートしない)　(https://s-yadav.github.io/react-number-format/docs/pattern_format)
- React-number-format はコンポーネントをサポートするだけでなく、format のためのユーティリティ関数もサポート
- 他のライブラリの中で最もダウンロード数が多い

### Cons
