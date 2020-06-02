---
title: 自作ブログ(Nuxt.js+processmd)の使い方
created_at: '2020-05-31 21:10:00'
tags:
- とりせつ
- Markdown
- Nuxt.js
---

# 自作ブログ(Nuxt.js+processmd)の使い方
めも

# 起動方法

```console
npm run dev
```

# ファイル構成

多分こうなってるはず

- assets
    - CSSファイル置いてある（フォント指定のために）
- Components
    - Vue.jsのやつと同じだと思う。
    - UIの部品を分けて他で使い回す的な
    - AndroidのFragmentに近いかな？
- contents
    - 重要フォルダ。
    - 最重要なので後で詳しく。
- dist
    - `nuxt generate`で書き出したファイルの置き場所です。
    - htmlがある。
    - あとはこのフォルダでWebサーバー建てるなりすれば見れるはずです。
- layouts
    - （Viewの階層的に）一番下に居るやつ。
    - AppBarとかNavigationDrawerはここに書いてある。
    - Androidで言うとActivity？
- middleware
    - さあ？
- node_modules
    - 多分ライブラリが入ってる。基本いじらない。
    - ~~Black holeよりも深い~~
    - npmコマンドでコケた時はまず消して`npm install`する。
- plugins
    - わからん（使ってない）
- static
    - 静的サイトジェネレートのときのfaviconとか？
- store
    - さあ？
- .から始まるファイル
    - 基本触らないと思う
- nuxt.config.js
    - 静的サイトジェネレートの時にどのファイルを作ればいいかとか書く。
    - Vuetifyでなんかやるときも書く。
    - cssとかも
- package-look.json
    - ？
- package.json
    - このプログラムについてなど。
    - 作者とかライセンスとかが書いてある。
    - 必要なライブラリも書いてある。
- README.md
    - GitHub以外で見ること有る？
- tsconfig.json
    - ？

# contentsフォルダについて / 記事の書き方
## 共通
記事を書いたら以下のコマンドを入れてね。（JSONファイルを更新するため）  
↓ブログ(posts)書いたとき
```console
npm run md
```
↓固定ページ(markdown)書いたとき
```console
npm run page
```  
↓同時に実行する
```console
npm run markdown
```
## contents/pages/markdown
固定ページを書く時に使います。  
このサイトでは`pages/about`(このサイトについて)を書く時に使いました。  
Nuxt Routerでは`pages/{ファイル名}`を指定する。
## contents/posts/markdown
ブログ書く時に使う。  
記事はここに入れる。  
Nuxt Routerでは`posts/{ファイル名}`を指定する。

なおどちらも`contents/*/markdown`に入れてね。（他にもjsonとかsummary.jsonとか有るけど気にするな。）  
そうしないとJSON生成（ブログ一覧生成など）でコケる気がします。

## markdownひながた
↓これをmarkdownの先頭に書いてください。  
それぞれ適切な値を入れてね。
```markdown
---
title: タイトル
created_at: 2020-05-31
tags:
- Android
---
```

いじょう？