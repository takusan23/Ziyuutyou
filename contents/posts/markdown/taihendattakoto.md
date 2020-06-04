---
title: これ作るのに大変だったこと
created_at: 2020-06-02
tags:
- その他
- 自作ブログ
---

Hexoってすごいんだなって。  
なお完成はいつになるかわかりません。いつ出来上がるんだこれ？  
完成までに思ったことを書いていくと思う。

## これ作るのに大変だったこと
書く。

### Vuetifyが`<code>`に色つける。

Vuetifyくんが勝手に色を付けてくれます。が、なんかいまいちなので頑張ってCSS書いて直したいんですが、  
Vuetifyくんが許してくれません。？  
しかたないので`!important`で黙らせました。    

assets/css/styles.css
```css
/* VuetifyのせいでCodeタグに勝手にCSS適用されるので強制上書き */

.v-application code {
    box-shadow: initial !important;
    border: 1px solid gray;
    border-radius: 5px !important;
    font-family: 'Koruri Regular';
    margin: 10px;
}

.v-application code, .v-application kbd {
    font-weight: initial !important;
}
```

ついでに`highlight.js`のCSS、`vs2015.css`を入れてコードにシンタックスハイライトをつけようとしたんですけど、これもうまく動かなかったので`vs2015.css`に`!important`付けて対応しました。

### CSS
CSSよくわがんね。

```css
/* ほばー */
.titleHover:hover {
    color: #5870cb;
    transition: color 0.5s;
}
```

これは記事一覧のタイトルをマウスオーバーするとジワーッと色が変わるCSSです。  

### Processmdくんが時系列順に並べてくれない

これはおま環境かもしれないけど、時系列順に並んでくれません。  
流石に時系列順にならないのはきついので、JavaScriptで時系列に並び替えるコードを書きました。sort関数あったし。

```js
// なんかしらんけど並び順が新しい順とは限らないらしい？
const sortedKeyList = Object.keys(fileMap);
sortedKeyList.sort(function(a, b) {
  const aDate = new Date(fileMap[a].created_at).getTime();
  const bDate = new Date(fileMap[b].created_at).getTime();
  if (aDate > bDate) return -1;
  if (aDate < bDate) return 1;
  return 0;
});
```

Kotlinの`sortBy{}`とは使い方が違っててちょっと迷った。

あとprocessmdくん、/posts/jsonに消した記事が残ってるんですがそれは、、

### ページネーション

次のページ、前のページを付けることを、ページネーションって言うそうですよ。  
これ付けないと記事が増えたときのスクロールがとんでもないことになる。  

記事一覧はこんな感じに静的に出してほしいので（postsに置くとタイトル被りそうなのでpageフォルダがある。）
```js
/posts/page/1
```

特に需要はなさそうですが一応必要なページ数に合わせて`posts/page`の配列を返す関数置いときますね。

```js
/** 次のページ機能をつける。そうしないと記事一覧にどばーってなってスクロール大変になる */
const generatePagenationRoutesList = () => {
  // 何ページ必要か計算する（10で割ればいいっしょ）。ただ1ページ目は最低限必要なので1足す
  const calc = Math.floor(postsJSON.sourceFileArray.length / PAGE_LIMIT) + 1
  // ページ分だけ動的ルーティングの配列出す？
  const dynamicRouterPathList = []
  // console.log(`ページ数：${calc} / 記事数：${postsJSON.sourceFileArray.length}`)
  // ページ生成。1ページ目から作るので1からスタート
  for (let i = 1; i <= calc; i++) {
    dynamicRouterPathList.push(`/posts/page/${i}`)
  }
  return dynamicRouterPathList
}

// 省略

/** 静的サイトジェネレート関数。配列(pages/とposts/)くっつける */
const generateRoutes = callback => {
  callback(null, [generatePagenationRoutesList()].flat())
}

```

これ動かすには`postsフォルダ`に`pageフォルダ`を作って中に、`_id.vue`を置いておく必要があります。

これで`posts/page/1`などが生成されるようになります（多分）

~~この記事書いてる途中でなんでこれ動いてんのかよくわからなくなったのは内緒~~←やっぱり生成できてなかったので直しました。（2020/06/03）

### `<v-card>`が遅い？
何故か知りませんが、VuetiryのCardコンポーネントがおそい。というかページ遷移がこいつのせいで遅くなる。  

せっかくの静的サイトで遅いのは辛いので直したい。（しかも記事一覧に戻った時にワンテンポ遅れるとか見てられない）

で、なぜか`<v-card>`を`<v-sheet>`に置き換えることで解決しました。  

なんで？

### 記事一覧を再読み込みした後記事を開くと404

なんかしらんけどF5するとURLの後ろに`/`が入ります。  
最後に`/`が入っていないのが前提で作っているので、最後に入ると **`../`(一個前に戻る)** がおかしな場所を指すようになります。

というかこれは私の作り方（ファイル構成）が悪いですね、なんで戻ったりしないといけないんだ。

- pages
  - pages（固定ページ。今回は省略）
  - posts（ブログ）
    - page
      - _id.vue（記事一覧）
    - tag
      - _id.vue（タグ検索結果）
    - index.vue（本来ここに記事一覧が有るべき？）
    - _slug.vue（記事。ここに居るので一覧から来たら戻らないといけない。）


今回は`nuxt.config.js`を開き、URLの最後に`/`を入れる設定を付けました。おかげて修正が必要になりましたが。

```js
export.default {
  // 省略
  router: {
    base: '/Ziyuutyou/',
    trailingSlash: true // ←これ
  }
}
```


## 特に大変じゃなかったこと

### PWA

PWAってめんどいんですよ。アイコン画像を用意するのがね！！！。  
192x192だったり512x512だったりいっぱい要求してくるんですけど、  
`@nuxt/pwa`は指定がない場合、`static/icon.png`を使ってくれるので、512x512のpngを置いておくだけで終わりました。PWA RTA行けそう（は？）  

一応`nuxt.config.js`の`manifest`置いておきますね。

```js
/** 
 * PWA manifest.json
 */
manifest: {
  name: 'たくさんの自由帳',
  title: 'たくさんの自由帳',
  'og:title': 'たくさんの自由帳',
  lang: 'ja',
  theme_color: '#8c9eff',
  background_color: '#5870cb',
  display: 'standalone',
}
```

### ダークモード

Vuetifyなら  
```js
$vuetify.theme.dark = true
```  
で終わります。Vuetifyすげー

ダークモード切り替えスイッチの例置いときますね。

```js
<!-- ダークモードスイッチ -->
<v-switch
  class="text-center ma-2"
  :append-icon="`${$vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'}`"
  v-model="$vuetify.theme.dark"
  label="テーマ切り替え"
></v-switch>
```

三項演算子使うの初めてかもしれない（まずKotlinにはないし）  

ところで$←これなに？

## おわりに
学校始まるわ。早起きつっら  
あと画像貼る方法確立してない。imgur使うか？