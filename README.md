# ziyuutyou

[![Netlify Status](https://api.netlify.com/api/v1/badges/cc14df48-3e5f-4582-a498-503503d319f3/deploy-status)](https://app.netlify.com/sites/takusan23-ziyuutyou/deploys)

![image](https://user-images.githubusercontent.com/32033405/83749090-20968380-a69e-11ea-849e-834fa30597ba.png)

https://takusan23-ziyuutyou.netlify.app/

自由帳。🚧作成途中🚧  
Nuxt.jsでブログ自作できるらしいので作ってみた。  
[備忘録](https://takusan23.github.io/Bibouroku/)の代替に・・・なるかな？

JavaScriptむずくない？  

あとしれっとnetlifyにお引越ししました。どうだろ？

## 起動方法
初回時は以下の1行を入れてね
```console
npm install
```

それから（2回目以降も）
```console
npm run dev
```

## 記事の保存場所

`contents/posts/markdown` にあります。

書いたら

```console
npm run markdown
```

を実行してJSONファイルを書き出してください。  

## 静的サイトジェネレート

をするとHTMLファイルが生成されます。  

```console
npm run generate
```