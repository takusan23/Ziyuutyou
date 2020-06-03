(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{305:function(t,e,r){"use strict";r(12),r(9),r(6),r(4),r(8);var n=r(2),o=(r(15),r(310),r(130)),l=r(1),c=(r(85),r(312),r(88)),d=r(13),h=r(87),v=r(131),f=r(14),m=r(0),_=r(5);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var x=Object(_.a)(d.a,Object(h.b)(["absolute","fixed","top","bottom"]),v.a,f.a).extend({name:"v-progress-linear",props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(m.f)(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(m.f)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var t;return t={opacity:null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity)},Object(n.a)(t,this.$vuetify.rtl?"right":"left",Object(m.f)(this.normalizedValue,"%")),Object(n.a)(t,"width",Object(m.f)(this.normalizedBuffer-this.normalizedValue,"%")),t},classes:function(){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped},this.themeClasses)},computedTransition:function(){return this.indeterminate?c.d:c.e},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(m.f)(this.normalizedBuffer,"%")),t}},methods:{genContent:function(){var slot=Object(m.k)(this,"default",{value:this.internalLazyValue});return slot?this.$createElement("div",{staticClass:"v-progress-linear__content"},slot):null},genListeners:function(){var t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar:function(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:Object(n.a)({},t,!0)}))},onClick:function(t){if(this.reactive){var e=this.$el.getBoundingClientRect().width;this.internalValue=t.offsetX/e*100}},normalize:function(t){return t<0?0:t>100?100:parseFloat(t)}},render:function(t){return t("div",{staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,style:{bottom:this.bottom?0:void 0,height:this.active?Object(m.f)(this.height):0,top:this.top?0:void 0},on:this.genListeners()},[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),k=l.a.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(x,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}}),w=r(60);function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function j(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(_.a)(k,w.a,o.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},outlined:Boolean,raised:Boolean,shaped:Boolean},computed:{classes:function(){return j(j({"v-card":!0},w.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--outlined":this.outlined,"v-card--raised":this.raised,"v-card--shaped":this.shaped},o.a.options.computed.classes.call(this))},styles:function(){var style=j({},o.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=k.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},310:function(t,e,r){var content=r(311);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(11).default)("e23b7040",content,!0,{sourceMap:!1})},311:function(t,e,r){(e=r(10)(!1)).push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card .v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--light.v-card.v-card--outlined{border:thin solid rgba(0,0,0,.12)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card .v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.theme--dark.v-card.v-card--outlined{border:thin solid hsla(0,0%,100%,.12)}.v-card{display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal;transition:box-shadow .28s cubic-bezier(.4,0,.2,1);will-change:box-shadow;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-card:not(.v-sheet--tile):not(.v-card--shaped){border-radius:4px}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip),.v-card>:first-child:not(.v-btn):not(.v-chip){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-card--hover:focus,.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--outlined{box-shadow:none}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--shaped{border-radius:24px 4px}',""]),t.exports=e},312:function(t,e,r){var content=r(313);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(11).default)("cf87dc84",content,!0,{sourceMap:!1})},313:function(t,e,r){(e=r(10)(!1)).push([t.i,".theme--light.v-progress-linear{color:rgba(0,0,0,.87)}.theme--dark.v-progress-linear{color:#fff}.v-progress-linear{background:transparent;overflow:hidden;position:relative;transition:.2s cubic-bezier(.4,0,.6,1);width:100%}.v-progress-linear__buffer{height:inherit;left:0;position:absolute;top:0;transition:inherit;width:100%;z-index:1}.v-progress-linear__background{bottom:0;left:0;position:absolute;top:0;transition:inherit}.v-progress-linear__content{align-items:center;display:flex;height:100%;left:0;justify-content:center;position:absolute;top:0;width:100%;z-index:2}.v-progress-linear__determinate{height:inherit;transition:inherit}.v-progress-linear__indeterminate .long,.v-progress-linear__indeterminate .short{background-color:inherit;bottom:0;height:inherit;left:0;position:absolute;top:0;width:auto;will-change:left,right}.v-progress-linear__indeterminate--active .long{-webkit-animation:indeterminate;animation:indeterminate;-webkit-animation-duration:2.2s;animation-duration:2.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.v-progress-linear__indeterminate--active .short{-webkit-animation:indeterminate-short;animation:indeterminate-short;-webkit-animation-duration:2.2s;animation-duration:2.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.v-progress-linear__stream{-webkit-animation:stream .25s linear infinite;animation:stream .25s linear infinite;border-color:currentColor;border-top:4px dotted;bottom:0;opacity:.3;pointer-events:none;position:absolute;right:-8px;top:calc(50% - 2px);transition:inherit}.v-progress-linear__wrapper{overflow:hidden;position:relative;transition:inherit}.v-progress-linear--absolute,.v-progress-linear--fixed{left:0;z-index:1}.v-progress-linear--absolute{position:absolute}.v-progress-linear--fixed{position:fixed}.v-progress-linear--reactive .v-progress-linear__content{pointer-events:none}.v-progress-linear--rounded{border-radius:4px}.v-progress-linear--striped .v-progress-linear__determinate{background-image:linear-gradient(135deg,hsla(0,0%,100%,.25) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.25) 0,hsla(0,0%,100%,.25) 75%,transparent 0,transparent);background-size:40px 40px;background-repeat:repeat}.v-progress-linear--query .v-progress-linear__indeterminate--active .long{-webkit-animation:query;animation:query;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.v-progress-linear--query .v-progress-linear__indeterminate--active .short{-webkit-animation:query-short;animation:query-short;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}@-webkit-keyframes indeterminate{0%{left:-90%;right:100%}60%{left:-90%;right:100%}to{left:100%;right:-35%}}@keyframes indeterminate{0%{left:-90%;right:100%}60%{left:-90%;right:100%}to{left:100%;right:-35%}}@-webkit-keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}@-webkit-keyframes query{0%{right:-90%;left:100%}60%{right:-90%;left:100%}to{right:100%;left:-35%}}@keyframes query{0%{right:-90%;left:100%}60%{right:-90%;left:100%}to{right:100%;left:-35%}}@-webkit-keyframes query-short{0%{right:-200%;left:100%}60%{right:107%;left:-8%}to{right:107%;left:-8%}}@keyframes query-short{0%{right:-200%;left:100%}60%{right:107%;left:-8%}to{right:107%;left:-8%}}@-webkit-keyframes stream{to{transform:translateX(-8px)}}@keyframes stream{to{transform:translateX(-8px)}}",""]),t.exports=e},323:function(t){t.exports=JSON.parse('{"a":["contents/pages/markdown/about.md"]}')},324:function(t,e,r){var map={"./about.json":325};function n(t){var e=o(t);return r(e)}function o(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=o,t.exports=n,n.id=324},325:function(t){t.exports=JSON.parse('{"title":"このサイトについて","created_at":"2020-05-31T00:00:00.000Z","bodyContent":"## このサイトについて\\r\\n普段はAndroid+Kotlinを書いてます。  \\r\\n[備忘録](https://takusan23.github.io/Bibouroku/)の代替になるかはわからん。  \\r\\nWeb系はわかりませんがNuxt.jsの静的サイトジェネレート機能を使ってます。  \\r\\nとりあえず画像を貼る方法がありません(imgurとか使うか？)。  \\r\\n\\r\\nやらないといけないこと\\r\\n- ~~次のページ機能~~\\r\\n- ~~PWA~~\\r\\n- ~~Vuetifyのせいでコード表示がおかしい~~\\r\\n- タグ一覧 / ~~タグソート~~\\r\\n- 移転前にあった**お ま け**\\r\\n- プロフィール書く？\\r\\n- ~~Google Analytics~~\\r\\n\\r\\n## プライバシーポリシー\\r\\n\\r\\nGoogle Analyticsを置いてます。これは私がこのサイトを見てくれた人が何人いるか等を見たいために置きました。\\r\\nGoogle Analyticsはデータの収集でCookieを利用しています。\\r\\nデータ収集は匿名で行われており、個人がわかるような値は収集していません。\\r\\nCookieを無効化することでGoogle Analyticsの収集を拒否することができます。\\r\\n詳しくはここへ→ https://policies.google.com/technologies/partner-sites?hl=ja\\r\\n\\r\\n\\r\\n\\r\\n## 使った技術 / ライセンス\\r\\n- Nuxt.js\\r\\n    - 静的サイトジェネレート\\r\\n- Vuetify\\r\\n    - マテリアルデザイン\\r\\n    - CSSわからんけどそれなりにいい感じにできる。    \\r\\n- highlight.jsのCSS\\r\\n    - https://github.com/highlightjs/highlight.js/tree/master/src/styles\\r\\n    - BSD 3-Clause License\\r\\n- processmd\\r\\n    - MIT License\\r\\n- Koruri Regular\\r\\n    - このブログのフォント。かわいい","bodyHtml":"<h2>このサイトについて</h2>\\n<p>普段はAndroid+Kotlinを書いてます。<br>\\n<a href=\\"https://takusan23.github.io/Bibouroku/\\">備忘録</a>の代替になるかはわからん。<br>\\nWeb系はわかりませんがNuxt.jsの静的サイトジェネレート機能を使ってます。<br>\\nとりあえず画像を貼る方法がありません(imgurとか使うか？)。</p>\\n<p>やらないといけないこと</p>\\n<ul>\\n<li><s>次のページ機能</s></li>\\n<li><s>PWA</s></li>\\n<li><s>Vuetifyのせいでコード表示がおかしい</s></li>\\n<li>タグ一覧 / <s>タグソート</s></li>\\n<li>移転前にあった<strong>お ま け</strong></li>\\n<li>プロフィール書く？</li>\\n<li><s>Google Analytics</s></li>\\n</ul>\\n<h2>プライバシーポリシー</h2>\\n<p>Google Analyticsを置いてます。これは私がこのサイトを見てくれた人が何人いるか等を見たいために置きました。\\nGoogle Analyticsはデータの収集でCookieを利用しています。\\nデータ収集は匿名で行われており、個人がわかるような値は収集していません。\\nCookieを無効化することでGoogle Analyticsの収集を拒否することができます。\\n詳しくはここへ→ https://policies.google.com/technologies/partner-sites?hl=ja</p>\\n<h2>使った技術 / ライセンス</h2>\\n<ul>\\n<li>Nuxt.js\\n<ul>\\n<li>静的サイトジェネレート</li>\\n</ul>\\n</li>\\n<li>Vuetify\\n<ul>\\n<li>マテリアルデザイン</li>\\n<li>CSSわからんけどそれなりにいい感じにできる。</li>\\n</ul>\\n</li>\\n<li>highlight.jsのCSS\\n<ul>\\n<li>https://github.com/highlightjs/highlight.js/tree/master/src/styles</li>\\n<li>BSD 3-Clause License</li>\\n</ul>\\n</li>\\n<li>processmd\\n<ul>\\n<li>MIT License</li>\\n</ul>\\n</li>\\n<li>Koruri Regular\\n<ul>\\n<li>このブログのフォント。かわいい</li>\\n</ul>\\n</li>\\n</ul>\\n","dir":"contents/pages/json","base":"about.json","ext":".json","sourceBase":"about.md","sourceExt":".md"}')},342:function(t,e,r){"use strict";r.r(e);r(35),r(36);var summary=r(323),n={validate:function(t){var e=t.params;return summary.a.includes("contents/pages/markdown/".concat(e.slug,".md"))},asyncData:function(t){var e=t.params;return Object.assign({},r(324)("./".concat(e.slug,".json")),{params:e})},mounted:function(){document.getElementById("title").innerText=this.title},head:function(){var title="".concat(this.title),t="pages/".concat(this.params.slug,"/");return{title:title,meta:[{hid:"og:url",property:"og:url",content:t},{hid:"og:title",property:"og:title",content:title}],link:[{rel:"canonical",href:t}]}}},o=r(62),l=r(82),c=r.n(l),d=r(293),h=r(305),v=r(296),f=r(117),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-card",{staticClass:"pa-5",staticStyle:{"margin-top":"-64px"},attrs:{elevation:"10"}},[r("div",{attrs:{id:"content"},domProps:{innerHTML:t._s(t.bodyHtml)}}),t._v(" "),r("v-divider"),t._v(" "),r("div",{staticClass:"post-meta pa-2"},[r("v-icon",[t._v("mdi-file-upload-outline")]),t._v(" "),r("time",[t._v(t._s(new Date(this.created_at).toLocaleDateString())+" 投稿")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VApp:d.a,VCard:h.a,VDivider:v.a,VIcon:f.a})}}]);