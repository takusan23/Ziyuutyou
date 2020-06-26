__NUXT_JSONP__("/posts/taihendattakoto", {data:[{title:"これ作るのに大変だったこと",created_at:"2020-06-02T00:00:00.000Z",tags:["その他","自作ブログ"],bodyContent:"Hexoってすごいんだなって。  \r\nなお完成はいつになるかわかりません。いつ出来上がるんだこれ？  \r\n完成までに思ったことを書いていくと思う。\r\n\r\n~~あとドメインが欲しい。買ったこと無いけどどうなんですかね？~~\r\n\r\n[取りました](\u002Fposts\u002Fdomain_katta)\r\n\r\n## これ作るのに大変だったこと\r\n書く。\r\n\r\n### Vuetifyが`\u003Ccode\u003E`に色つける。\r\n\r\nVuetifyくんが勝手に色を付けてくれます。が、なんかいまいちなので頑張ってCSS書いて直したいんですが、  \r\nVuetifyくんが許してくれません。？  \r\nしかたないので`!important`で黙らせました。    \r\n\r\nassets\u002Fcss\u002Fstyles.css\r\n```css\r\n\u002F* VuetifyのせいでCodeタグに勝手にCSS適用されるので強制上書き *\u002F\r\n\r\n.v-application code {\r\n    box-shadow: initial !important;\r\n    border: 1px solid gray;\r\n    border-radius: 5px !important;\r\n    font-family: 'Koruri Regular';\r\n    margin: 10px;\r\n}\r\n\r\n.v-application code, .v-application kbd {\r\n    font-weight: initial !important;\r\n}\r\n```\r\n\r\nついでに`highlight.js`のCSS、`vs2015.css`を入れてコードにシンタックスハイライトをつけようとしたんですけど、これもうまく動かなかったので`vs2015.css`に`!important`付けて対応しました。\r\n\r\n### CSS\r\nCSSよくわがんね。\r\n\r\n```css\r\n\u002F* ほばー *\u002F\r\n.titleHover:hover {\r\n    color: #5870cb;\r\n    transition: color 0.5s;\r\n}\r\n```\r\n\r\nこれは記事一覧のタイトルをマウスオーバーするとジワーッと色が変わるCSSです。  \r\n\r\n### Processmdくんが時系列順に並べてくれない\r\n\r\nこれはおま環境かもしれないけど、時系列順に並んでくれません。  \r\n流石に時系列順にならないのはきついので、JavaScriptで時系列に並び替えるコードを書きました。sort関数あったし。\r\n\r\n```js\r\n\u002F\u002F なんかしらんけど並び順が新しい順とは限らないらしい？\r\nconst sortedKeyList = Object.keys(fileMap);\r\nsortedKeyList.sort(function(a, b) {\r\n  const aDate = new Date(fileMap[a].created_at).getTime();\r\n  const bDate = new Date(fileMap[b].created_at).getTime();\r\n  if (aDate \u003E bDate) return -1;\r\n  if (aDate \u003C bDate) return 1;\r\n  return 0;\r\n});\r\n```\r\n\r\nKotlinの`sortBy{}`とは使い方が違っててちょっと迷った。\r\n\r\nあとprocessmdくん、\u002Fposts\u002Fjsonに消した記事が残ってるんですがそれは、、\r\n\r\n### ページネーション\r\n\r\n追記（2020\u002F06\u002F27）：もしかしたらこれ書く必要ないと思う（`_id.vue`ファイルは必要だと思う）  \r\n詳細→ [Nuxt.jsを2.13に上げた時の話](\u002Fposts\u002Fnuxt_2_13_sugoi)\r\n\r\n次のページ、前のページを付けることを、ページネーションって言うそうですよ。  \r\nこれ付けないと記事が増えたときのスクロールがとんでもないことになる。  \r\n\r\n記事一覧はこんな感じに静的に出してほしいので（postsに置くとタイトル被りそうなのでpageフォルダがある。）\r\n```js\r\n\u002Fposts\u002Fpage\u002F1\r\n```\r\n\r\n特に需要はなさそうですが一応必要なページ数に合わせて`posts\u002Fpage`の配列を返す関数置いときますね。\r\n\r\n```js\r\n\u002F** 次のページ機能をつける。そうしないと記事一覧にどばーってなってスクロール大変になる *\u002F\r\nconst generatePagenationRoutesList = () =\u003E {\r\n  \u002F\u002F 何ページ必要か計算する（10で割ればいいっしょ）。ただ1ページ目は最低限必要なので1足す\r\n  const calc = Math.floor(postsJSON.sourceFileArray.length \u002F PAGE_LIMIT) + 1\r\n  \u002F\u002F ページ分だけ動的ルーティングの配列出す？\r\n  const dynamicRouterPathList = []\r\n  \u002F\u002F console.log(`ページ数：${calc} \u002F 記事数：${postsJSON.sourceFileArray.length}`)\r\n  \u002F\u002F ページ生成。1ページ目から作るので1からスタート\r\n  for (let i = 1; i \u003C= calc; i++) {\r\n    dynamicRouterPathList.push(`\u002Fposts\u002Fpage\u002F${i}`)\r\n  }\r\n  return dynamicRouterPathList\r\n}\r\n\r\n\u002F\u002F 省略\r\n\r\n\u002F** 静的サイトジェネレート関数。配列(pages\u002Fとposts\u002F)くっつける *\u002F\r\nconst generateRoutes = callback =\u003E {\r\n  callback(null, [generatePagenationRoutesList()].flat())\r\n}\r\n\r\n```\r\n\r\nこれ動かすには`postsフォルダ`に`pageフォルダ`を作って中に、`_id.vue`を置いておく必要があります。\r\n\r\nこれで`posts\u002Fpage\u002F1`などが生成されるようになります（多分）\r\n\r\n~~この記事書いてる途中でなんでこれ動いてんのかよくわからなくなったのは内緒~~←やっぱり生成できてなかったので直しました。（2020\u002F06\u002F03）\r\n\r\n### `\u003Cv-card\u003E`が遅い？→いつの間にか直った？\r\n何故か知りませんが、VuetiryのCardコンポーネントがおそい。というかページ遷移がこいつのせいで遅くなる。  \r\n\r\nせっかくの静的サイトで遅いのは辛いので直したい。（しかも記事一覧に戻った時にワンテンポ遅れるとか見てられない）\r\n\r\nで、なぜか`\u003Cv-card\u003E`を`\u003Cv-sheet\u003E`に置き換えることで解決しました。  \r\n\r\nなんで？\r\n\r\n### 記事一覧を再読み込みした後記事を開くと404\r\n\r\nなんかしらんけどF5するとURLの後ろに`\u002F`が入ります。  \r\n最後に`\u002F`が入っていないのが前提で作っているので、最後に入ると **`..\u002F`(一個前に戻る)** がおかしな場所を指すようになります。\r\n\r\n---追記---\r\n\r\n**別に`..\u002F`使わなくても良いことに気付いたのでこの問題は解決しました。**  \r\n**`to='\u002Fposts\u002Ffirst'`みたいな感じで別に戻る必要ありませんでした。**\r\n\r\n---追記おわり---\r\n\r\nというかこれは私の作り方（ファイル構成）が悪いですね、なんで戻ったりしないといけないんだ。\r\n\r\n- pages\r\n  - pages（固定ページ。今回は省略）\r\n  - posts（ブログ）\r\n    - page\r\n      - _id.vue（記事一覧）\r\n    - tag\r\n      - _id.vue（タグ検索結果）\r\n    - index.vue（本来ここに記事一覧が有るべき？）\r\n    - _slug.vue（記事。ここに居るので一覧から来たら戻らないといけない。）\r\n\r\n\r\n今回は`nuxt.config.js`を開き、URLの最後に`\u002F`を入れる設定を付けました。おかげて修正が必要になりましたが。\r\n\r\n```js\r\nexport.default {\r\n  \u002F\u002F 省略\r\n  router: {\r\n    base: '\u002FZiyuutyou\u002F',\r\n    trailingSlash: true \u002F\u002F ←これ\r\n  }\r\n}\r\n```\r\n\r\n### `sw.js`がよくわからんけどバージョン管理対象外になってて**ホーム画面に追加**が消えてた\r\n\r\nGitHubのリポジトリ開いて`\u002Fdocs`開いたら見事にServiceWorkerだけ抜けてました。なんで？\r\n\r\n### Hexoと違ってリアルタイムで記事の内容が反映されない\r\n\r\nHexoって書いてる途中でも、リロードすれば記事の内容が更新されてどんな感じに見れてるか確認できるんですけど、processmdくんデフォルトだとできないっぽい？  \r\n`processmd`見る感じ、ファイルの中身を監視する`--watch`オプションが存在するのでそれ使えばよさそうです、  \r\nそれで適当に`package.json`の`scripts`の中に実行とprocessmdの監視オプション付きを同時に実行する様に書いたんですけど、  \r\n**nuxt起動から先に進みません！そりゃnuxtもファイルを監視してるからそこで止まりますよね。**\r\n\r\nそれでどうすれば同時に（並列に）起動できるかって話ですが、`npm-run-all`ってのを使えば並列実行ができそうです。  \r\nただ、これ使っても更新できるのは記事の中身だけで記事一覧(summary.json)は更新できないっぽいです。(nuxt起動時にsummary.jsonが空っぽだぞって怒られる。どうやら一度消えるらしい？)  \r\n\r\nでも記事の中身がリアルタイムで反映されるようになったので満足です。VSCode半分にしなくて済むし。  \r\n参考程度の`package.json`のscript\r\n\r\n```json\r\n{\r\n  \"scripts\": {\r\n    \"dev\": \"nuxt --port 11451\",\r\n    \"build\": \"nuxt build\",\r\n    \"start\": \"nuxt start\",\r\n    \"generate\": \"nuxt generate\",\r\n    \"markdown\": \"npm run post && npm run page\",\r\n    \"page\": \"processmd contents\u002Fpages\u002F**\u002F*.md --stdout --outputDir contents\u002Fpages\u002Fjson \u003E contents\u002Fpages\u002Fsummary.json --markdownOptions.linkify\",\r\n    \"post\": \"processmd contents\u002Fposts\u002F**\u002F*.md --stdout --outputDir contents\u002Fposts\u002Fjson \u003E contents\u002Fposts\u002Fsummary.json --markdownOptions.linkify\",\r\n    \"pagewatch\": \"processmd contents\u002Fpages\u002F**\u002F*.md --outputDir contents\u002Fpages\u002Fjson --markdownOptions.linkify --watch\",\r\n    \"postwatch\": \"processmd contents\u002Fposts\u002F**\u002F*.md --outputDir contents\u002Fposts\u002Fjson --markdownOptions.linkify --watch\",\r\n    \"all\": \"npm-run-all markdown --parallel dev postwatch\"\r\n  },\r\n}\r\n```\r\n\r\n`npm run all`を実行すると\r\n- markdownファイルがJSON形式に変換される\r\n- nuxt起動\r\n- nuxt起動と同時にprocessmdの監視を始める\r\n  - `--stdout`オプションは外してあるので、記事一覧は更新されない。\r\n\r\n`--parallel`のあとに指定したスクリプトが並列で実行され、その前に書いてあるスクリプトは直列で実行されます。\r\n\r\nちなみにprocessmdくんがJSONファイルを書き換えるとnuxtのファイル変更監視に引っかかるので自動で更新されるようになります。すげえ\r\n\r\n~~たまにundefinedになるけどしゃーない~~\r\n\r\n### マークダウンに書いたURLがリンクにならない\r\n\r\nprocessmdくんのオプションに`--markdownOptions.linkify`をくっつけて実行すればいいです。\r\n\r\n```json\r\n{\r\n  \"scripts\": {\r\n    \"post\": \"processmd contents\u002Fposts\u002F**\u002F*.md --stdout --outputDir contents\u002Fposts\u002Fjson \u003E contents\u002Fposts\u002Fsummary.json --markdownOptions.linkify\"\r\n  }\r\n}\r\n```\r\n\r\n### ~~しれっと~~Netlifyにお引越ししたりした。\r\n\r\nGitHubPagesより良いのかはしらんけどお試しで引っ越してみた。これ勝手にメアド公開したりしないよな？  \r\n[Netlify へデプロイするには？](https:\u002F\u002Fja.nuxtjs.org\u002Ffaq\u002Fnetlify-deployment\u002F)ってのが有るのでそれに沿ってやればできると思います。\r\n\r\nじゃあなんで**大変だったこと**に書いてんだよって話ですが、っぱコケるんですね。\r\n\r\n\u003Ciframe src=\"https:\u002F\u002Fbest-friends.chat\u002F@takusan_23\u002F104330325427830329\u002Fembed\" class=\"mastodon-embed\" style=\"max-width: 100%; border: 0; height:200px\" width=\"400\" allowfullscreen=\"allowfullscreen\"\u003E\u003C\u002Fiframe\u003E\u003Cscript src=\"https:\u002F\u002Fbest-friends.chat\u002Fembed.js\" async=\"async\"\u003E\u003C\u002Fscript\u003E\r\n\r\nあーJSだからしゃーないのかなーなんて思ってとりあえず検索すると、`Chromeのバージョン的に対応していない`とか出てきたのでワンちゃんNode.jsくんのバージョンがおかしいのではないかと考えました。  \r\n\r\nNetlifyにNode.jsのバージョンを指定する方法ですが、検索したらありました。 [参考元](https:\u002F\u002Fqiita.com\u002Fn0bisuke\u002Fitems\u002F8bddad87610b01c90003)\r\n\r\n`.nvmrc`というファイルを置いて、中にNode.jsのバージョンを書くだけで解決しました。\r\n\r\n`v12.14.1`\r\n\r\nこれだけ。これで成功しました。\r\n\r\nちなみサイト作成時のステップ３で、ビルドコマンドに`npm run generate`、ディレクトリを`docs(GitHubPagesの名残)`すれば、コミット+プッシュ時に勝手に`npm run genreate`して公開してくれます。らく\r\n\r\n### 実は静的サイト書き出しできてなかった\r\nこれは別に記事に書いた→ [Nuxtの静的サイトジェネレートはモードをuniversalにしよう](\u002Fposts\u002Fnuxt_universal)\r\n\r\n読みたくない方向け→`nuxt.config.js`の`mode:`を`universal`にすればHTMLに書き出してくれます。  \r\n`spa`だとHTMLのbody見てもscriptタグが何個か有るだけで、内容はJS実行されるまで表示されませんでした。  \r\n`universal`ならHTMLに書き出してくれるのでJS切っても見れます。\r\n\r\n### (本当かわからんけど)開発時(localhost)の時は別のタブで開けない？\r\n\r\n記事を別のタブで開くと永遠に読み込んでたりするんだけどもしかして別のタブで開くことできない？\r\n\r\n## 特に大変じゃなかったこと\r\n\r\n### PWA\r\n\r\nPWAってめんどいんですよ。アイコン画像を用意するのがね！！！。  \r\n192x192だったり512x512だったりいっぱい要求してくるんですけど、  \r\n`@nuxt\u002Fpwa`は指定がない場合、`static\u002Ficon.png`を使ってくれるので、512x512のpngを置いておくだけで終わりました。PWA RTA行けそう（は？）  \r\n\r\n一応`nuxt.config.js`の`manifest`置いておきますね。\r\n\r\n```js\r\n\u002F** \r\n * PWA manifest.json\r\n *\u002F\r\nmanifest: {\r\n  name: 'たくさんの自由帳',\r\n  title: 'たくさんの自由帳',\r\n  'og:title': 'たくさんの自由帳',\r\n  lang: 'ja',\r\n  theme_color: '#8c9eff',\r\n  background_color: '#5870cb',\r\n  display: 'standalone',\r\n}\r\n```\r\n\r\n### ダークモード\r\n\r\nVuetifyなら  \r\n```js\r\n$vuetify.theme.dark = true\r\n```  \r\nで終わります。Vuetifyすげー\r\n\r\nダークモード切り替えスイッチの例置いときますね。\r\n\r\n```js\r\n\u003C!-- ダークモードスイッチ --\u003E\r\n\u003Cv-switch\r\n  class=\"text-center ma-2\"\r\n  :append-icon=\"`${$vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'}`\"\r\n  v-model=\"$vuetify.theme.dark\"\r\n  label=\"テーマ切り替え\"\r\n\u003E\u003C\u002Fv-switch\u003E\r\n```\r\n\r\n三項演算子使うの初めてかもしれない（まずKotlinにはないし）  \r\n\r\nところで$←これなに？\r\n\r\n### 端末がダークモードかどうか\r\n\r\n以下のJSでダークモードかどうかを監視して、Vuetifyのモードを変更するようにできます。  \r\n[参考：StackOverflow](https:\u002F\u002Fstackoverflow.com\u002Fquestions\u002F56393880\u002Fhow-do-i-detect-dark-mode-using-javascript)\r\n\r\n```js\r\nwindow\r\n      .matchMedia(\"(prefers-color-scheme: dark)\")\r\n      .addEventListener(\"change\", e =\u003E {\r\n        const isDeviceDarkModeEnabled = e.matches;\r\n        \u002F\u002F Vuetify切り替える\r\n        this.$vuetify.theme.dark = isDeviceDarkModeEnabled\r\n      });\r\n```\r\n\r\n**StackOverflow**先生の回答では`e.matches`に`darkかlight`が入ってるっぽいんですが、私のChromeくんでは`trueかfalse`でした。先生の回答ちょっと古かったのかな。\r\n\r\n~~まあダークモードなんてあんま使わないんですけどね（は？）~~\r\n\r\n## おわりに\r\n学校始まるわ。早起きつっら  \r\nあと画像貼る方法確立してない。imgur使うか？",bodyHtml:"\u003Cp\u003EHexoってすごいんだなって。\u003Cbr\u003E\nなお完成はいつになるかわかりません。いつ出来上がるんだこれ？\u003Cbr\u003E\n完成までに思ったことを書いていくと思う。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cs\u003Eあとドメインが欲しい。買ったこと無いけどどうなんですかね？\u003C\u002Fs\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"\u002Fposts\u002Fdomain_katta\"\u003E取りました\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Ch2\u003Eこれ作るのに大変だったこと\u003C\u002Fh2\u003E\n\u003Cp\u003E書く。\u003C\u002Fp\u003E\n\u003Ch3\u003EVuetifyが\u003Ccode\u003E&lt;code&gt;\u003C\u002Fcode\u003Eに色つける。\u003C\u002Fh3\u003E\n\u003Cp\u003EVuetifyくんが勝手に色を付けてくれます。が、なんかいまいちなので頑張ってCSS書いて直したいんですが、\u003Cbr\u003E\nVuetifyくんが許してくれません。？\u003Cbr\u003E\nしかたないので\u003Ccode\u003E!important\u003C\u002Fcode\u003Eで黙らせました。\u003C\u002Fp\u003E\n\u003Cp\u003Eassets\u002Fcss\u002Fstyles.css\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F* VuetifyのせいでCodeタグに勝手にCSS適用されるので強制上書き *\u002F\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-selector-class\"\u003E.v-application\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Ecode\u003C\u002Fspan\u003E {\n    \u003Cspan class=\"hljs-attribute\"\u003Ebox-shadow\u003C\u002Fspan\u003E: initial \u003Cspan class=\"hljs-meta\"\u003E!important\u003C\u002Fspan\u003E;\n    \u003Cspan class=\"hljs-attribute\"\u003Eborder\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E1px\u003C\u002Fspan\u003E solid gray;\n    \u003Cspan class=\"hljs-attribute\"\u003Eborder-radius\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E5px\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-meta\"\u003E!important\u003C\u002Fspan\u003E;\n    \u003Cspan class=\"hljs-attribute\"\u003Efont-family\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'Koruri Regular'\u003C\u002Fspan\u003E;\n    \u003Cspan class=\"hljs-attribute\"\u003Emargin\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E10px\u003C\u002Fspan\u003E;\n}\n\n\u003Cspan class=\"hljs-selector-class\"\u003E.v-application\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Ecode\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-selector-class\"\u003E.v-application\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Ekbd\u003C\u002Fspan\u003E {\n    \u003Cspan class=\"hljs-attribute\"\u003Efont-weight\u003C\u002Fspan\u003E: initial \u003Cspan class=\"hljs-meta\"\u003E!important\u003C\u002Fspan\u003E;\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eついでに\u003Ccode\u003Ehighlight.js\u003C\u002Fcode\u003EのCSS、\u003Ccode\u003Evs2015.css\u003C\u002Fcode\u003Eを入れてコードにシンタックスハイライトをつけようとしたんですけど、これもうまく動かなかったので\u003Ccode\u003Evs2015.css\u003C\u002Fcode\u003Eに\u003Ccode\u003E!important\u003C\u002Fcode\u003E付けて対応しました。\u003C\u002Fp\u003E\n\u003Ch3\u003ECSS\u003C\u002Fh3\u003E\n\u003Cp\u003ECSSよくわがんね。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F* ほばー *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-selector-class\"\u003E.titleHover\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-selector-pseudo\"\u003E:hover\u003C\u002Fspan\u003E {\n    \u003Cspan class=\"hljs-attribute\"\u003Ecolor\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E#5870cb\u003C\u002Fspan\u003E;\n    \u003Cspan class=\"hljs-attribute\"\u003Etransition\u003C\u002Fspan\u003E: color \u003Cspan class=\"hljs-number\"\u003E0.5s\u003C\u002Fspan\u003E;\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eこれは記事一覧のタイトルをマウスオーバーするとジワーッと色が変わるCSSです。\u003C\u002Fp\u003E\n\u003Ch3\u003EProcessmdくんが時系列順に並べてくれない\u003C\u002Fh3\u003E\n\u003Cp\u003Eこれはおま環境かもしれないけど、時系列順に並んでくれません。\u003Cbr\u003E\n流石に時系列順にならないのはきついので、JavaScriptで時系列に並び替えるコードを書きました。sort関数あったし。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F なんかしらんけど並び順が新しい順とは限らないらしい？\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E sortedKeyList = \u003Cspan class=\"hljs-built_in\"\u003EObject\u003C\u002Fspan\u003E.keys(fileMap);\nsortedKeyList.sort(\u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Efunction\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-params\"\u003Ea, b\u003C\u002Fspan\u003E) \u003C\u002Fspan\u003E{\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E aDate = \u003Cspan class=\"hljs-keyword\"\u003Enew\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-built_in\"\u003EDate\u003C\u002Fspan\u003E(fileMap[a].created_at).getTime();\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E bDate = \u003Cspan class=\"hljs-keyword\"\u003Enew\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-built_in\"\u003EDate\u003C\u002Fspan\u003E(fileMap[b].created_at).getTime();\n  \u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E (aDate &gt; bDate) \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-number\"\u003E-1\u003C\u002Fspan\u003E;\n  \u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E (aDate &lt; bDate) \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E;\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E;\n});\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003EKotlinの\u003Ccode\u003EsortBy{}\u003C\u002Fcode\u003Eとは使い方が違っててちょっと迷った。\u003C\u002Fp\u003E\n\u003Cp\u003Eあとprocessmdくん、\u002Fposts\u002Fjsonに消した記事が残ってるんですがそれは、、\u003C\u002Fp\u003E\n\u003Ch3\u003Eページネーション\u003C\u002Fh3\u003E\n\u003Cp\u003E追記（2020\u002F06\u002F27）：もしかしたらこれ書く必要ないと思う（\u003Ccode\u003E_id.vue\u003C\u002Fcode\u003Eファイルは必要だと思う）\u003Cbr\u003E\n詳細→ \u003Ca href=\"\u002Fposts\u002Fnuxt_2_13_sugoi\"\u003ENuxt.jsを2.13に上げた時の話\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E次のページ、前のページを付けることを、ページネーションって言うそうですよ。\u003Cbr\u003E\nこれ付けないと記事が増えたときのスクロールがとんでもないことになる。\u003C\u002Fp\u003E\n\u003Cp\u003E記事一覧はこんな感じに静的に出してほしいので（postsに置くとタイトル被りそうなのでpageフォルダがある。）\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u002Fposts\u002Fpage\u002F1\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E特に需要はなさそうですが一応必要なページ数に合わせて\u003Ccode\u003Eposts\u002Fpage\u003C\u002Fcode\u003Eの配列を返す関数置いときますね。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F** 次のページ機能をつける。そうしないと記事一覧にどばーってなってスクロール大変になる *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E generatePagenationRoutesList = \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-params\"\u003E()\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 何ページ必要か計算する（10で割ればいいっしょ）。ただ1ページ目は最低限必要なので1足す\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E calc = \u003Cspan class=\"hljs-built_in\"\u003EMath\u003C\u002Fspan\u003E.floor(postsJSON.sourceFileArray.length \u002F PAGE_LIMIT) + \u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ページ分だけ動的ルーティングの配列出す？\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E dynamicRouterPathList = []\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F console.log(`ページ数：${calc} \u002F 記事数：${postsJSON.sourceFileArray.length}`)\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ページ生成。1ページ目から作るので1からスタート\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-keyword\"\u003Efor\u003C\u002Fspan\u003E (\u003Cspan class=\"hljs-keyword\"\u003Elet\u003C\u002Fspan\u003E i = \u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E; i &lt;= calc; i++) {\n    dynamicRouterPathList.push(\u003Cspan class=\"hljs-string\"\u003E`\u002Fposts\u002Fpage\u002F\u003Cspan class=\"hljs-subst\"\u003E${i}\u003C\u002Fspan\u003E`\u003C\u002Fspan\u003E)\n  }\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E dynamicRouterPathList\n}\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 省略\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F** 静的サイトジェネレート関数。配列(pages\u002Fとposts\u002F)くっつける *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E generateRoutes = \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-params\"\u003Ecallback\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E {\n  callback(\u003Cspan class=\"hljs-literal\"\u003Enull\u003C\u002Fspan\u003E, [generatePagenationRoutesList()].flat())\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eこれ動かすには\u003Ccode\u003Epostsフォルダ\u003C\u002Fcode\u003Eに\u003Ccode\u003Epageフォルダ\u003C\u002Fcode\u003Eを作って中に、\u003Ccode\u003E_id.vue\u003C\u002Fcode\u003Eを置いておく必要があります。\u003C\u002Fp\u003E\n\u003Cp\u003Eこれで\u003Ccode\u003Eposts\u002Fpage\u002F1\u003C\u002Fcode\u003Eなどが生成されるようになります（多分）\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cs\u003Eこの記事書いてる途中でなんでこれ動いてんのかよくわからなくなったのは内緒\u003C\u002Fs\u003E←やっぱり生成できてなかったので直しました。（2020\u002F06\u002F03）\u003C\u002Fp\u003E\n\u003Ch3\u003E\u003Ccode\u003E&lt;v-card&gt;\u003C\u002Fcode\u003Eが遅い？→いつの間にか直った？\u003C\u002Fh3\u003E\n\u003Cp\u003E何故か知りませんが、VuetiryのCardコンポーネントがおそい。というかページ遷移がこいつのせいで遅くなる。\u003C\u002Fp\u003E\n\u003Cp\u003Eせっかくの静的サイトで遅いのは辛いので直したい。（しかも記事一覧に戻った時にワンテンポ遅れるとか見てられない）\u003C\u002Fp\u003E\n\u003Cp\u003Eで、なぜか\u003Ccode\u003E&lt;v-card&gt;\u003C\u002Fcode\u003Eを\u003Ccode\u003E&lt;v-sheet&gt;\u003C\u002Fcode\u003Eに置き換えることで解決しました。\u003C\u002Fp\u003E\n\u003Cp\u003Eなんで？\u003C\u002Fp\u003E\n\u003Ch3\u003E記事一覧を再読み込みした後記事を開くと404\u003C\u002Fh3\u003E\n\u003Cp\u003EなんかしらんけどF5するとURLの後ろに\u003Ccode\u003E\u002F\u003C\u002Fcode\u003Eが入ります。\u003Cbr\u003E\n最後に\u003Ccode\u003E\u002F\u003C\u002Fcode\u003Eが入っていないのが前提で作っているので、最後に入ると \u003Cstrong\u003E\u003Ccode\u003E..\u002F\u003C\u002Fcode\u003E(一個前に戻る)\u003C\u002Fstrong\u003E がおかしな場所を指すようになります。\u003C\u002Fp\u003E\n\u003Cp\u003E---追記---\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003E別に\u003Ccode\u003E..\u002F\u003C\u002Fcode\u003E使わなくても良いことに気付いたのでこの問題は解決しました。\u003C\u002Fstrong\u003E\u003Cbr\u003E\n\u003Cstrong\u003E\u003Ccode\u003Eto='\u002Fposts\u002Ffirst'\u003C\u002Fcode\u003Eみたいな感じで別に戻る必要ありませんでした。\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E---追記おわり---\u003C\u002Fp\u003E\n\u003Cp\u003Eというかこれは私の作り方（ファイル構成）が悪いですね、なんで戻ったりしないといけないんだ。\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003Epages\n\u003Cul\u003E\n\u003Cli\u003Epages（固定ページ。今回は省略）\u003C\u002Fli\u003E\n\u003Cli\u003Eposts（ブログ）\n\u003Cul\u003E\n\u003Cli\u003Epage\n\u003Cul\u003E\n\u003Cli\u003E_id.vue（記事一覧）\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003Etag\n\u003Cul\u003E\n\u003Cli\u003E_id.vue（タグ検索結果）\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003Eindex.vue（本来ここに記事一覧が有るべき？）\u003C\u002Fli\u003E\n\u003Cli\u003E_slug.vue（記事。ここに居るので一覧から来たら戻らないといけない。）\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E今回は\u003Ccode\u003Enuxt.config.js\u003C\u002Fcode\u003Eを開き、URLの最後に\u003Ccode\u003E\u002F\u003C\u002Fcode\u003Eを入れる設定を付けました。おかげて修正が必要になりましたが。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eexport\u003C\u002Fspan\u003E.default {\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 省略\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003Erouter\u003C\u002Fspan\u003E: {\n    \u003Cspan class=\"hljs-attr\"\u003Ebase\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'\u002FZiyuutyou\u002F'\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003EtrailingSlash\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ←これ\u003C\u002Fspan\u003E\n  }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch3\u003E\u003Ccode\u003Esw.js\u003C\u002Fcode\u003Eがよくわからんけどバージョン管理対象外になってて\u003Cstrong\u003Eホーム画面に追加\u003C\u002Fstrong\u003Eが消えてた\u003C\u002Fh3\u003E\n\u003Cp\u003EGitHubのリポジトリ開いて\u003Ccode\u003E\u002Fdocs\u003C\u002Fcode\u003E開いたら見事にServiceWorkerだけ抜けてました。なんで？\u003C\u002Fp\u003E\n\u003Ch3\u003EHexoと違ってリアルタイムで記事の内容が反映されない\u003C\u002Fh3\u003E\n\u003Cp\u003EHexoって書いてる途中でも、リロードすれば記事の内容が更新されてどんな感じに見れてるか確認できるんですけど、processmdくんデフォルトだとできないっぽい？\u003Cbr\u003E\n\u003Ccode\u003Eprocessmd\u003C\u002Fcode\u003E見る感じ、ファイルの中身を監視する\u003Ccode\u003E--watch\u003C\u002Fcode\u003Eオプションが存在するのでそれ使えばよさそうです、\u003Cbr\u003E\nそれで適当に\u003Ccode\u003Epackage.json\u003C\u002Fcode\u003Eの\u003Ccode\u003Escripts\u003C\u002Fcode\u003Eの中に実行とprocessmdの監視オプション付きを同時に実行する様に書いたんですけど、\u003Cbr\u003E\n\u003Cstrong\u003Enuxt起動から先に進みません！そりゃnuxtもファイルを監視してるからそこで止まりますよね。\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eそれでどうすれば同時に（並列に）起動できるかって話ですが、\u003Ccode\u003Enpm-run-all\u003C\u002Fcode\u003Eってのを使えば並列実行ができそうです。\u003Cbr\u003E\nただ、これ使っても更新できるのは記事の中身だけで記事一覧(summary.json)は更新できないっぽいです。(nuxt起動時にsummary.jsonが空っぽだぞって怒られる。どうやら一度消えるらしい？)\u003C\u002Fp\u003E\n\u003Cp\u003Eでも記事の中身がリアルタイムで反映されるようになったので満足です。VSCode半分にしなくて済むし。\u003Cbr\u003E\n参考程度の\u003Ccode\u003Epackage.json\u003C\u002Fcode\u003Eのscript\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E{\n  \u003Cspan class=\"hljs-attr\"\u003E\"scripts\"\u003C\u002Fspan\u003E: {\n    \u003Cspan class=\"hljs-attr\"\u003E\"dev\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"nuxt --port 11451\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"build\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"nuxt build\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"start\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"nuxt start\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"generate\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"nuxt generate\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"markdown\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"npm run post &amp;&amp; npm run page\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"page\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"processmd contents\u002Fpages\u002F**\u002F*.md --stdout --outputDir contents\u002Fpages\u002Fjson &gt; contents\u002Fpages\u002Fsummary.json --markdownOptions.linkify\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"post\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"processmd contents\u002Fposts\u002F**\u002F*.md --stdout --outputDir contents\u002Fposts\u002Fjson &gt; contents\u002Fposts\u002Fsummary.json --markdownOptions.linkify\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"pagewatch\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"processmd contents\u002Fpages\u002F**\u002F*.md --outputDir contents\u002Fpages\u002Fjson --markdownOptions.linkify --watch\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"postwatch\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"processmd contents\u002Fposts\u002F**\u002F*.md --outputDir contents\u002Fposts\u002Fjson --markdownOptions.linkify --watch\"\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003E\"all\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"npm-run-all markdown --parallel dev postwatch\"\u003C\u002Fspan\u003E\n  },\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E\u003Ccode\u003Enpm run all\u003C\u002Fcode\u003Eを実行すると\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EmarkdownファイルがJSON形式に変換される\u003C\u002Fli\u003E\n\u003Cli\u003Enuxt起動\u003C\u002Fli\u003E\n\u003Cli\u003Enuxt起動と同時にprocessmdの監視を始める\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003E--stdout\u003C\u002Fcode\u003Eオプションは外してあるので、記事一覧は更新されない。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E\u003Ccode\u003E--parallel\u003C\u002Fcode\u003Eのあとに指定したスクリプトが並列で実行され、その前に書いてあるスクリプトは直列で実行されます。\u003C\u002Fp\u003E\n\u003Cp\u003EちなみにprocessmdくんがJSONファイルを書き換えるとnuxtのファイル変更監視に引っかかるので自動で更新されるようになります。すげえ\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cs\u003Eたまにundefinedになるけどしゃーない\u003C\u002Fs\u003E\u003C\u002Fp\u003E\n\u003Ch3\u003Eマークダウンに書いたURLがリンクにならない\u003C\u002Fh3\u003E\n\u003Cp\u003Eprocessmdくんのオプションに\u003Ccode\u003E--markdownOptions.linkify\u003C\u002Fcode\u003Eをくっつけて実行すればいいです。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E{\n  \u003Cspan class=\"hljs-attr\"\u003E\"scripts\"\u003C\u002Fspan\u003E: {\n    \u003Cspan class=\"hljs-attr\"\u003E\"post\"\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E\"processmd contents\u002Fposts\u002F**\u002F*.md --stdout --outputDir contents\u002Fposts\u002Fjson &gt; contents\u002Fposts\u002Fsummary.json --markdownOptions.linkify\"\u003C\u002Fspan\u003E\n  }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch3\u003E\u003Cs\u003Eしれっと\u003C\u002Fs\u003ENetlifyにお引越ししたりした。\u003C\u002Fh3\u003E\n\u003Cp\u003EGitHubPagesより良いのかはしらんけどお試しで引っ越してみた。これ勝手にメアド公開したりしないよな？\u003Cbr\u003E\n\u003Ca href=\"https:\u002F\u002Fja.nuxtjs.org\u002Ffaq\u002Fnetlify-deployment\u002F\"\u003ENetlify へデプロイするには？\u003C\u002Fa\u003Eってのが有るのでそれに沿ってやればできると思います。\u003C\u002Fp\u003E\n\u003Cp\u003Eじゃあなんで\u003Cstrong\u003E大変だったこと\u003C\u002Fstrong\u003Eに書いてんだよって話ですが、っぱコケるんですね。\u003C\u002Fp\u003E\n\u003Cp\u003E&lt;iframe src=&quot;\u003Ca href=\"https:\u002F\u002Fbest-friends.chat\u002F@takusan_23\u002F104330325427830329\u002Fembed\"\u003Ehttps:\u002F\u002Fbest-friends.chat\u002F@takusan_23\u002F104330325427830329\u002Fembed\u003C\u002Fa\u003E&quot; class=&quot;mastodon-embed&quot; style=&quot;max-width: 100%; border: 0; height:200px&quot; width=&quot;400&quot; allowfullscreen=&quot;allowfullscreen&quot;&gt;&lt;\u002Fiframe&gt;&lt;script src=&quot;\u003Ca href=\"https:\u002F\u002Fbest-friends.chat\u002Fembed.js\"\u003Ehttps:\u002F\u002Fbest-friends.chat\u002Fembed.js\u003C\u002Fa\u003E&quot; async=&quot;async&quot;&gt;&lt;\u002Fscript&gt;\u003C\u002Fp\u003E\n\u003Cp\u003EあーJSだからしゃーないのかなーなんて思ってとりあえず検索すると、\u003Ccode\u003EChromeのバージョン的に対応していない\u003C\u002Fcode\u003Eとか出てきたのでワンちゃんNode.jsくんのバージョンがおかしいのではないかと考えました。\u003C\u002Fp\u003E\n\u003Cp\u003ENetlifyにNode.jsのバージョンを指定する方法ですが、検索したらありました。 \u003Ca href=\"https:\u002F\u002Fqiita.com\u002Fn0bisuke\u002Fitems\u002F8bddad87610b01c90003\"\u003E参考元\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003E.nvmrc\u003C\u002Fcode\u003Eというファイルを置いて、中にNode.jsのバージョンを書くだけで解決しました。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Ev12.14.1\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eこれだけ。これで成功しました。\u003C\u002Fp\u003E\n\u003Cp\u003Eちなみサイト作成時のステップ３で、ビルドコマンドに\u003Ccode\u003Enpm run generate\u003C\u002Fcode\u003E、ディレクトリを\u003Ccode\u003Edocs(GitHubPagesの名残)\u003C\u002Fcode\u003Eすれば、コミット+プッシュ時に勝手に\u003Ccode\u003Enpm run genreate\u003C\u002Fcode\u003Eして公開してくれます。らく\u003C\u002Fp\u003E\n\u003Ch3\u003E実は静的サイト書き出しできてなかった\u003C\u002Fh3\u003E\n\u003Cp\u003Eこれは別に記事に書いた→ \u003Ca href=\"\u002Fposts\u002Fnuxt_universal\"\u003ENuxtの静的サイトジェネレートはモードをuniversalにしよう\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E読みたくない方向け→\u003Ccode\u003Enuxt.config.js\u003C\u002Fcode\u003Eの\u003Ccode\u003Emode:\u003C\u002Fcode\u003Eを\u003Ccode\u003Euniversal\u003C\u002Fcode\u003EにすればHTMLに書き出してくれます。\u003Cbr\u003E\n\u003Ccode\u003Espa\u003C\u002Fcode\u003EだとHTMLのbody見てもscriptタグが何個か有るだけで、内容はJS実行されるまで表示されませんでした。\u003Cbr\u003E\n\u003Ccode\u003Euniversal\u003C\u002Fcode\u003EならHTMLに書き出してくれるのでJS切っても見れます。\u003C\u002Fp\u003E\n\u003Ch3\u003E(本当かわからんけど)開発時(localhost)の時は別のタブで開けない？\u003C\u002Fh3\u003E\n\u003Cp\u003E記事を別のタブで開くと永遠に読み込んでたりするんだけどもしかして別のタブで開くことできない？\u003C\u002Fp\u003E\n\u003Ch2\u003E特に大変じゃなかったこと\u003C\u002Fh2\u003E\n\u003Ch3\u003EPWA\u003C\u002Fh3\u003E\n\u003Cp\u003EPWAってめんどいんですよ。アイコン画像を用意するのがね！！！。\u003Cbr\u003E\n192x192だったり512x512だったりいっぱい要求してくるんですけど、\u003Cbr\u003E\n\u003Ccode\u003E@nuxt\u002Fpwa\u003C\u002Fcode\u003Eは指定がない場合、\u003Ccode\u003Estatic\u002Ficon.png\u003C\u002Fcode\u003Eを使ってくれるので、512x512のpngを置いておくだけで終わりました。PWA RTA行けそう（は？）\u003C\u002Fp\u003E\n\u003Cp\u003E一応\u003Ccode\u003Enuxt.config.js\u003C\u002Fcode\u003Eの\u003Ccode\u003Emanifest\u003C\u002Fcode\u003E置いておきますね。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F** \n * PWA manifest.json\n *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Emanifest\u003C\u002Fspan\u003E: {\n  \u003Cspan class=\"hljs-attr\"\u003Ename\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'たくさんの自由帳'\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003Etitle\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'たくさんの自由帳'\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-string\"\u003E'og:title'\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'たくさんの自由帳'\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003Elang\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'ja'\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003Etheme_color\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'#8c9eff'\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003Ebackground_color\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'#5870cb'\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003Edisplay\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E'standalone'\u003C\u002Fspan\u003E,\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch3\u003Eダークモード\u003C\u002Fh3\u003E\n\u003Cp\u003EVuetifyなら\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E$vuetify.theme.dark = \u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eで終わります。Vuetifyすげー\u003C\u002Fp\u003E\n\u003Cp\u003Eダークモード切り替えスイッチの例置いときますね。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E&lt;!-- ダークモードスイッチ --&gt;\n\u003Cspan class=\"xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ev-switch\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"text-center ma-2\"\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E:append-icon\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"`${$vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'}`\"\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003Ev-model\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"$vuetify.theme.dark\"\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003Elabel\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"テーマ切り替え\"\u003C\u002Fspan\u003E\n&gt;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ev-switch\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E三項演算子使うの初めてかもしれない（まずKotlinにはないし）\u003C\u002Fp\u003E\n\u003Cp\u003Eところで$←これなに？\u003C\u002Fp\u003E\n\u003Ch3\u003E端末がダークモードかどうか\u003C\u002Fh3\u003E\n\u003Cp\u003E以下のJSでダークモードかどうかを監視して、Vuetifyのモードを変更するようにできます。\u003Cbr\u003E\n\u003Ca href=\"https:\u002F\u002Fstackoverflow.com\u002Fquestions\u002F56393880\u002Fhow-do-i-detect-dark-mode-using-javascript\"\u003E参考：StackOverflow\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-built_in\"\u003Ewindow\u003C\u002Fspan\u003E\n      .matchMedia(\u003Cspan class=\"hljs-string\"\u003E\"(prefers-color-scheme: dark)\"\u003C\u002Fspan\u003E)\n      .addEventListener(\u003Cspan class=\"hljs-string\"\u003E\"change\"\u003C\u002Fspan\u003E, e =&gt; {\n        \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E isDeviceDarkModeEnabled = e.matches;\n        \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Vuetify切り替える\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-keyword\"\u003Ethis\u003C\u002Fspan\u003E.$vuetify.theme.dark = isDeviceDarkModeEnabled\n      });\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E\u003Cstrong\u003EStackOverflow\u003C\u002Fstrong\u003E先生の回答では\u003Ccode\u003Ee.matches\u003C\u002Fcode\u003Eに\u003Ccode\u003Edarkかlight\u003C\u002Fcode\u003Eが入ってるっぽいんですが、私のChromeくんでは\u003Ccode\u003Etrueかfalse\u003C\u002Fcode\u003Eでした。先生の回答ちょっと古かったのかな。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cs\u003Eまあダークモードなんてあんま使わないんですけどね（は？）\u003C\u002Fs\u003E\u003C\u002Fp\u003E\n\u003Ch2\u003Eおわりに\u003C\u002Fh2\u003E\n\u003Cp\u003E学校始まるわ。早起きつっら\u003Cbr\u003E\nあと画像貼る方法確立してない。imgur使うか？\u003C\u002Fp\u003E\n",dir:"contents\u002Fposts\u002Fjson",base:"taihendattakoto.json",ext:".json",sourceBase:"taihendattakoto.md",sourceExt:".md",params:{slug:"taihendattakoto"}}],fetch:[],mutations:void 0});