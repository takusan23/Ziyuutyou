(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{326:function(n){n.exports=JSON.parse('{"a":["contents/pages/markdown/about.md"]}')},327:function(n,t,e){var map={"./about.json":328};function r(n){var t=l(n);return e(t)}function l(n){if(!e.o(map,n)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return map[n]}r.keys=function(){return Object.keys(map)},r.resolve=l,n.exports=r,r.id=327},328:function(n){n.exports=JSON.parse('{"title":"このサイトについて","created_at":"2020-05-31T00:00:00.000Z","bodyContent":"## このサイトについて\\r\\n普段はAndroid+Kotlinを書いてます。  \\r\\n[備忘録](https://takusan23.github.io/Bibouroku/)の代替になるかはわからん。  \\r\\nWeb系はわかりませんがNuxt.jsの静的サイトジェネレート機能を使ってます。  \\r\\nとりあえず画像を貼る方法がありません(imgurとか使うか？)。  \\r\\n\\r\\nやらないといけないこと\\r\\n- ~~次のページ機能~~\\r\\n- ~~PWA~~\\r\\n- ~~Vuetifyのせいでコード表示がおかしい~~\\r\\n- タグ一覧 / ~~タグソート~~\\r\\n- 移転前にあった**お ま け**\\r\\n- プロフィール書く？\\r\\n- ~~Google Analytics~~\\r\\n\\r\\n## プライバシーポリシー\\r\\n\\r\\nGoogle Analyticsを置いてます。これは私がこのサイトを見てくれた人が何人いるか等を見たいために置きました。\\r\\nGoogle Analyticsはデータの収集でCookieを利用しています。\\r\\nデータ収集は匿名で行われており、個人がわかるような値は収集していません。\\r\\nCookieを無効化することでGoogle Analyticsの収集を拒否することができます。\\r\\n詳しくはここへ→ https://policies.google.com/technologies/partner-sites?hl=ja\\r\\n\\r\\n\\r\\n\\r\\n## 使った技術 / ライセンス\\r\\n- Nuxt.js\\r\\n    - 静的サイトジェネレート\\r\\n- Vuetify\\r\\n    - マテリアルデザイン\\r\\n    - CSSわからんけどそれなりにいい感じにできる。    \\r\\n- highlight.jsのCSS\\r\\n    - https://github.com/highlightjs/highlight.js/tree/master/src/styles\\r\\n    - BSD 3-Clause License\\r\\n- processmd\\r\\n    - MIT License\\r\\n- Koruri Regular\\r\\n    - このブログのフォント。かわいい","bodyHtml":"<h2>このサイトについて</h2>\\n<p>普段はAndroid+Kotlinを書いてます。<br>\\n<a href=\\"https://takusan23.github.io/Bibouroku/\\">備忘録</a>の代替になるかはわからん。<br>\\nWeb系はわかりませんがNuxt.jsの静的サイトジェネレート機能を使ってます。<br>\\nとりあえず画像を貼る方法がありません(imgurとか使うか？)。</p>\\n<p>やらないといけないこと</p>\\n<ul>\\n<li><s>次のページ機能</s></li>\\n<li><s>PWA</s></li>\\n<li><s>Vuetifyのせいでコード表示がおかしい</s></li>\\n<li>タグ一覧 / <s>タグソート</s></li>\\n<li>移転前にあった<strong>お ま け</strong></li>\\n<li>プロフィール書く？</li>\\n<li><s>Google Analytics</s></li>\\n</ul>\\n<h2>プライバシーポリシー</h2>\\n<p>Google Analyticsを置いてます。これは私がこのサイトを見てくれた人が何人いるか等を見たいために置きました。\\nGoogle Analyticsはデータの収集でCookieを利用しています。\\nデータ収集は匿名で行われており、個人がわかるような値は収集していません。\\nCookieを無効化することでGoogle Analyticsの収集を拒否することができます。\\n詳しくはここへ→ https://policies.google.com/technologies/partner-sites?hl=ja</p>\\n<h2>使った技術 / ライセンス</h2>\\n<ul>\\n<li>Nuxt.js\\n<ul>\\n<li>静的サイトジェネレート</li>\\n</ul>\\n</li>\\n<li>Vuetify\\n<ul>\\n<li>マテリアルデザイン</li>\\n<li>CSSわからんけどそれなりにいい感じにできる。</li>\\n</ul>\\n</li>\\n<li>highlight.jsのCSS\\n<ul>\\n<li>https://github.com/highlightjs/highlight.js/tree/master/src/styles</li>\\n<li>BSD 3-Clause License</li>\\n</ul>\\n</li>\\n<li>processmd\\n<ul>\\n<li>MIT License</li>\\n</ul>\\n</li>\\n<li>Koruri Regular\\n<ul>\\n<li>このブログのフォント。かわいい</li>\\n</ul>\\n</li>\\n</ul>\\n","dir":"contents/pages/json","base":"about.json","ext":".json","sourceBase":"about.md","sourceExt":".md"}')},345:function(n,t,e){"use strict";e.r(t);e(35),e(36);var summary=e(326),r={validate:function(n){var t=n.params;return summary.a.includes("contents/pages/markdown/".concat(t.slug,".md"))},asyncData:function(n){var t=n.params;return Object.assign({},e(327)("./".concat(t.slug,".json")),{params:t})},mounted:function(){document.getElementById("title").innerText=this.title},head:function(){var title="".concat(this.title),n="pages/".concat(this.params.slug,"/");return{title:title,meta:[{hid:"og:url",property:"og:url",content:n},{hid:"og:title",property:"og:title",content:title}],link:[{rel:"canonical",href:n}]}}},l=e(62),o=e(82),c=e.n(o),h=e(296),d=e(299),m=e(118),v=e(29),component=Object(l.a)(r,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-app",[e("v-sheet",{staticClass:"pa-5",staticStyle:{"margin-top":"-64px"},attrs:{elevation:"10"}},[e("div",{attrs:{id:"content"},domProps:{innerHTML:n._s(n.bodyHtml)}}),n._v(" "),e("v-divider"),n._v(" "),e("div",{staticClass:"post-meta pa-2"},[e("v-icon",[n._v("mdi-file-upload-outline")]),n._v(" "),e("time",[n._v(n._s(new Date(this.created_at).toLocaleDateString())+" 投稿")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VApp:h.a,VDivider:d.a,VIcon:m.a,VSheet:v.a})}}]);