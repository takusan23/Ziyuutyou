# ziyuutyou

![image](https://user-images.githubusercontent.com/32033405/83629172-99310d80-a5d4-11ea-95fc-e3db29f53756.png)


自由帳。  
Nuxt.jsでブログ自作できるらしいので作ってみた。  
[備忘録](https://takusan23.github.io/Bibouroku/)の代替に・・・なるかな？

JavaScriptむずくない？

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