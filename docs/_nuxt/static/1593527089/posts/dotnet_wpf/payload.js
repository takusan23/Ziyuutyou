__NUXT_JSONP__("/posts/dotnet_wpf", {data:[{title:".NET CoreでWPFアプリ作るぞ",created_at:"2020\u002F06\u002F09",tags:["CS","WPF",".NETCore"],bodyContent:".NET Coreってなに\r\n\r\n# ほんだい\r\nWPFなんてめったに触らんから未来の私がWPFやる時に見に来る記事。  \r\n[WPFアプリ作ったので](..\u002F..\u002Fposts\u002Fmousecursor_wpf\u002F)その時に躓いたこ\r\n\r\n# 環境\r\n|なまえ|あたい|\r\n|---|---|\r\n|OS|Windows 10 Pro 2004|\r\n|Visual Studio|Community 2019|\r\n\r\n# .NET Coreってなに\r\nしらない。なんかよくわからんけど使う。  \r\n.NET Coreはクロスプラットフォームって言われてるけど、WPFに関してはWindowsに依存してるから関係ないよ\r\n\r\n[ソース](https:\u002F\u002Fdocs.microsoft.com\u002Fja-jp\u002Fwindows\u002Fapps\u002Fdesktop\u002Fmodernize\u002Fmodernize-wpf-tutorial)\r\n\r\n# Visual Studio 2019 入れる\r\n最新版入れましょう。最新版じゃないと`WPF App (.NET Core)`が選べないと思います。  \r\nちなみに私は最新版にアップデートする際、ダウンロードするファイルが3GBを超えてました。クソ長かったわ。\r\n\r\n# プロジェクト作成\r\n検索ボックスに`wpf`って入れれば出ます。  \r\n`.NET Framework`じゃないほうを選びましょうね。\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FBHxIloY.png)\r\n\r\n\r\nその後の`プロジェクト名`とかは各自決めてね。\r\n\r\n# ぷよぐらみんぐ\r\n久々のC#くんです。  \r\n（多分）Androidと同じ感じで、xamlでレイアウト決めて、C#でプログラムを書いていく感じですが、ちょっと違うのね。\r\n\r\n- Androidの`findViewById`\r\n    - C#ではレイアウトに`Name`付けとけばC#から扱える。\r\n    - KotlinでfindViewByIdが省略できるみたいな感じで書ける。\r\n\r\n## レイアウト\r\n**MainWindow.xaml**\r\n\r\n```xml\r\n\u003CWindow x:Class=\"DotNetCoreWPF.MainWindow\"\r\n        xmlns=\"http:\u002F\u002Fschemas.microsoft.com\u002Fwinfx\u002F2006\u002Fxaml\u002Fpresentation\"\r\n        xmlns:x=\"http:\u002F\u002Fschemas.microsoft.com\u002Fwinfx\u002F2006\u002Fxaml\"\r\n        xmlns:d=\"http:\u002F\u002Fschemas.microsoft.com\u002Fexpression\u002Fblend\u002F2008\"\r\n        xmlns:mc=\"http:\u002F\u002Fschemas.openxmlformats.org\u002Fmarkup-compatibility\u002F2006\"\r\n        xmlns:local=\"clr-namespace:DotNetCoreWPF\"\r\n        mc:Ignorable=\"d\"\r\n        Title=\"MainWindow\" Height=\"450\" Width=\"800\"\u003E\r\n    \u003CGrid\u003E\r\n        \u003CTextBox FontSize=\"20\" HorizontalAlignment=\"Center\" Name=\"TimeTextBox\" Text=\"\" TextWrapping=\"Wrap\" TextAlignment=\"Center\" VerticalAlignment=\"Center\" Height=\"30\" Width=\"228\"\u002F\u003E\r\n\r\n    \u003C\u002FGrid\u003E\r\n\u003C\u002FWindow\u003E\r\n```\r\n\r\n真ん中にテキストを表示する`TextBox`を置いただけです。  \r\n\r\n## C#\r\n**MainWindow.cs**\r\n上の`using`は省略してるので気をつけて\r\n```cs\r\nnamespace DotNetCoreWPF\r\n{\r\n    \u002F\u002F\u002F \u003Csummary\u003E\r\n    \u002F\u002F\u002F Interaction logic for MainWindow.xaml\r\n    \u002F\u002F\u002F \u003C\u002Fsummary\u003E\r\n    public partial class MainWindow : Window\r\n    {\r\n        public MainWindow()\r\n        {\r\n            InitializeComponent();\r\n\r\n            \u002F\u002F タイマー初期化\r\n            var dispatcherTimer = new DispatcherTimer();\r\n            dispatcherTimer.Tick += new EventHandler(dispatcherTimer_Tick);\r\n            dispatcherTimer.Interval = new TimeSpan(0, 0, 1);\r\n            dispatcherTimer.Start();\r\n\r\n        }\r\n\r\n        \u002F\u002F タイマーで毎秒ここ呼ばれる。\r\n        private void dispatcherTimer_Tick(object sender, EventArgs e)\r\n        {\r\n            \u002F\u002F 時間を表示\r\n            TimeTextBox.Text = DateTime.Now.ToString();\r\n        }\r\n\r\n    }\r\n}\r\n```\r\n\r\nこれでデジタル時計の完成です。はっっや\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FZmZzxBb.png)\r\n\r\n# exeにする\r\n`.NET Framework`時代ではどうやってexeを配布してたのかよくわかりませんが、  \r\n`.NET Core`では**自己完結型**が使えるそうです。（.NET Frameworkじゃできない？）  \r\n## 自己完結型 #とは\r\n必要なもの全部を一つの`exeファイル`にできる機能。  \r\nちょっと前だとWindowsのフリーソフトを入れる際に、**.NET Framework のバージョンなんとか以上が必要**みたいなやつがよくありましたが、  \r\n`.NET Core（正確には3.0から）`では.NET Core（.NET Frameworkの後継）が入っていないPCでも実行できるように、.NET Coreのランタイムやらなんやらを一つのexeにいれて環境に関係なく動くようになるらしい。  \r\n変わりにファイルサイズが大きくなるけど。  \r\n\r\n今回は`.NET Core ランタイム入り（.NET Core入ってないPCでも動くやつ）`と`.NET Coreのランタイム無し`の両方をやろうと思います。\r\n\r\n## ソリューションエクスプローラー開いて\r\n名前のところを押して**発行**を押します。\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FxjXxEdu.png)\r\n\r\n**フォルダー**を選んで次へ\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FWBZdhUB.png)\r\n\r\nそのまま**完了**押して良いと思います。\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FgZPdL5D.png)\r\n\r\nそしたら後ろのVS 2019の内容が画像のように変わるので、**構成**のところの鉛筆マークを押します。\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FdGv9U3Z.png)\r\n\r\nそしてこの先は作りたいexeファイルによって操作が変わります。\r\n\r\n# .NET Core ランタイム入りのexeファイルを作成する\r\n\r\nプロファイル設定で、**配置モード**を**自己完結**にします。  \r\nそれから、下の**ファイルの公開オプション**を押して、**単一ファイルの作成**にチェックを入れます。\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FARUKDNH.png)\r\n\r\nそしたら保存して、**発行**ボタンを押せば作成されます。\r\n作成された`exeファイル`は`bin\u002FRelease\u002Fnetcoreapp3.1\u002Fpublish`の中にあると思います。\r\n\r\n実際に起動してみたの図。これだけなのにファイルサイズでけえ。\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FhN2DDg4.png)\r\n\r\n# .NET Core ランタイム無しのexeファイルを作成する\r\n\r\nプロファイル設定で、**配置モード**を**フレームワーク依存**にします。  \r\nそれから、下の**ファイルの公開オプション**を押して、**単一ファイルの作成**にチェックを入れます。\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FsRKKtZN.png)\r\n\r\nそしたら保存して、**発行**ボタンを押せば作成されます。\r\n作成された`exeファイル`は`bin\u002FRelease\u002Fnetcoreapp3.1\u002Fpublish`の中にあると思います。\r\n\r\n\r\n実際に起動してみたの図。ファイルサイズは小さい。\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002FbyF4X4v.png)\r\n\r\n\r\n# おわりに\r\nこれで正解なのかはよく分かっていない。 \r\n\r\nというかなんで`TextBox`使ったの？`TextBlock`で良かったじゃん。\r\n\r\n一応ソースコード置いときますね→ https:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDotNetCoreWPF\r\n\r\nあと少しずれるんだけど、画像を入れても何故かコケる問題。画像を右クリックしてプロパティ選んで、ビルドアクションをリソースにすればいいのね。時間奪われた。\r\n\r\n# 参考にしました\r\nありがとうございます\r\n\r\n\r\nhttps:\u002F\u002Fwww.telerik.com\u002Fblogs\u002Fcreating-a-single-exe-application-with-net-core\r\n\r\nhttps:\u002F\u002Ftechinfoofmicrosofttech.osscons.jp\u002Findex.php?.NET%20Core%E3%81%AE%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4\r\n\r\nhttps:\u002F\u002Frksoftware.hatenablog.com\u002Fentry\u002F2019\u002F02\u002F17\u002F194701",bodyHtml:"\u003Cp\u003E.NET Coreってなに\u003C\u002Fp\u003E\n\u003Ch1\u003Eほんだい\u003C\u002Fh1\u003E\n\u003Cp\u003EWPFなんてめったに触らんから未来の私がWPFやる時に見に来る記事。\u003Cbr\u003E\n\u003Ca href=\"..\u002F..\u002Fposts\u002Fmousecursor_wpf\u002F\"\u003EWPFアプリ作ったので\u003C\u002Fa\u003Eその時に躓いたこ\u003C\u002Fp\u003E\n\u003Ch1\u003E環境\u003C\u002Fh1\u003E\n\u003Ctable\u003E\n\u003Cthead\u003E\n\u003Ctr\u003E\n\u003Cth\u003Eなまえ\u003C\u002Fth\u003E\n\u003Cth\u003Eあたい\u003C\u002Fth\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Fthead\u003E\n\u003Ctbody\u003E\n\u003Ctr\u003E\n\u003Ctd\u003EOS\u003C\u002Ftd\u003E\n\u003Ctd\u003EWindows 10 Pro 2004\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003EVisual Studio\u003C\u002Ftd\u003E\n\u003Ctd\u003ECommunity 2019\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Ftbody\u003E\n\u003C\u002Ftable\u003E\n\u003Ch1\u003E.NET Coreってなに\u003C\u002Fh1\u003E\n\u003Cp\u003Eしらない。なんかよくわからんけど使う。\u003Cbr\u003E\n.NET Coreはクロスプラットフォームって言われてるけど、WPFに関してはWindowsに依存してるから関係ないよ\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fdocs.microsoft.com\u002Fja-jp\u002Fwindows\u002Fapps\u002Fdesktop\u002Fmodernize\u002Fmodernize-wpf-tutorial\"\u003Eソース\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Ch1\u003EVisual Studio 2019 入れる\u003C\u002Fh1\u003E\n\u003Cp\u003E最新版入れましょう。最新版じゃないと\u003Ccode\u003EWPF App (.NET Core)\u003C\u002Fcode\u003Eが選べないと思います。\u003Cbr\u003E\nちなみに私は最新版にアップデートする際、ダウンロードするファイルが3GBを超えてました。クソ長かったわ。\u003C\u002Fp\u003E\n\u003Ch1\u003Eプロジェクト作成\u003C\u002Fh1\u003E\n\u003Cp\u003E検索ボックスに\u003Ccode\u003Ewpf\u003C\u002Fcode\u003Eって入れれば出ます。\u003Cbr\u003E\n\u003Ccode\u003E.NET Framework\u003C\u002Fcode\u003Eじゃないほうを選びましょうね。\n\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FBHxIloY.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eその後の\u003Ccode\u003Eプロジェクト名\u003C\u002Fcode\u003Eとかは各自決めてね。\u003C\u002Fp\u003E\n\u003Ch1\u003Eぷよぐらみんぐ\u003C\u002Fh1\u003E\n\u003Cp\u003E久々のC#くんです。\u003Cbr\u003E\n（多分）Androidと同じ感じで、xamlでレイアウト決めて、C#でプログラムを書いていく感じですが、ちょっと違うのね。\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EAndroidの\u003Ccode\u003EfindViewById\u003C\u002Fcode\u003E\n\u003Cul\u003E\n\u003Cli\u003EC#ではレイアウトに\u003Ccode\u003EName\u003C\u002Fcode\u003E付けとけばC#から扱える。\u003C\u002Fli\u003E\n\u003Cli\u003EKotlinでfindViewByIdが省略できるみたいな感じで書ける。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003Eレイアウト\u003C\u002Fh2\u003E\n\u003Cp\u003E\u003Cstrong\u003EMainWindow.xaml\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003EWindow\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Ex:Class\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"DotNetCoreWPF.MainWindow\"\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-attr\"\u003Exmlns\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"http:\u002F\u002Fschemas.microsoft.com\u002Fwinfx\u002F2006\u002Fxaml\u002Fpresentation\"\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-attr\"\u003Exmlns:x\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"http:\u002F\u002Fschemas.microsoft.com\u002Fwinfx\u002F2006\u002Fxaml\"\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-attr\"\u003Exmlns:d\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"http:\u002F\u002Fschemas.microsoft.com\u002Fexpression\u002Fblend\u002F2008\"\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-attr\"\u003Exmlns:mc\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"http:\u002F\u002Fschemas.openxmlformats.org\u002Fmarkup-compatibility\u002F2006\"\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-attr\"\u003Exmlns:local\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"clr-namespace:DotNetCoreWPF\"\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-attr\"\u003Emc:Ignorable\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"d\"\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-attr\"\u003ETitle\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"MainWindow\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EHeight\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"450\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EWidth\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"800\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003EGrid\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003ETextBox\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EFontSize\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"20\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EHorizontalAlignment\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"Center\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EName\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"TimeTextBox\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EText\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003ETextWrapping\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"Wrap\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003ETextAlignment\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"Center\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EVerticalAlignment\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"Center\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EHeight\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"30\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EWidth\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"228\"\u003C\u002Fspan\u003E\u002F&gt;\u003C\u002Fspan\u003E\n\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003EGrid\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003EWindow\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E真ん中にテキストを表示する\u003Ccode\u003ETextBox\u003C\u002Fcode\u003Eを置いただけです。\u003C\u002Fp\u003E\n\u003Ch2\u003EC#\u003C\u002Fh2\u003E\n\u003Cp\u003E\u003Cstrong\u003EMainWindow.cs\u003C\u002Fstrong\u003E\n上の\u003Ccode\u003Eusing\u003C\u002Fcode\u003Eは省略してるので気をつけて\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Enamespace\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EDotNetCoreWPF\u003C\u002Fspan\u003E\n{\n    \u003Cspan class=\"hljs-comment\"\u003E\u003Cspan class=\"hljs-doctag\"\u003E\u002F\u002F\u002F\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-doctag\"\u003E&lt;summary&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-comment\"\u003E\u003Cspan class=\"hljs-doctag\"\u003E\u002F\u002F\u002F\u003C\u002Fspan\u003E Interaction logic for MainWindow.xaml\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-comment\"\u003E\u003Cspan class=\"hljs-doctag\"\u003E\u002F\u002F\u002F\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-doctag\"\u003E&lt;\u002Fsummary&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Epublic\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Epartial\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EMainWindow\u003C\u002Fspan\u003E : \u003Cspan class=\"hljs-title\"\u003EWindow\u003C\u002Fspan\u003E\n    {\n        \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Epublic\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EMainWindow\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E)\u003C\u002Fspan\u003E\n        {\n            InitializeComponent();\n\n            \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F タイマー初期化\u003C\u002Fspan\u003E\n            \u003Cspan class=\"hljs-keyword\"\u003Evar\u003C\u002Fspan\u003E dispatcherTimer = \u003Cspan class=\"hljs-keyword\"\u003Enew\u003C\u002Fspan\u003E DispatcherTimer();\n            dispatcherTimer.Tick += \u003Cspan class=\"hljs-keyword\"\u003Enew\u003C\u002Fspan\u003E EventHandler(dispatcherTimer_Tick);\n            dispatcherTimer.Interval = \u003Cspan class=\"hljs-keyword\"\u003Enew\u003C\u002Fspan\u003E TimeSpan(\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E);\n            dispatcherTimer.Start();\n\n        }\n\n        \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F タイマーで毎秒ここ呼ばれる。\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eprivate\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Evoid\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EdispatcherTimer_Tick\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-params\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eobject\u003C\u002Fspan\u003E sender, EventArgs e\u003C\u002Fspan\u003E)\u003C\u002Fspan\u003E\n        {\n            \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 時間を表示\u003C\u002Fspan\u003E\n            TimeTextBox.Text = DateTime.Now.ToString();\n        }\n\n    }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eこれでデジタル時計の完成です。はっっや\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FZmZzxBb.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Ch1\u003Eexeにする\u003C\u002Fh1\u003E\n\u003Cp\u003E\u003Ccode\u003E.NET Framework\u003C\u002Fcode\u003E時代ではどうやってexeを配布してたのかよくわかりませんが、\u003Cbr\u003E\n\u003Ccode\u003E.NET Core\u003C\u002Fcode\u003Eでは\u003Cstrong\u003E自己完結型\u003C\u002Fstrong\u003Eが使えるそうです。（.NET Frameworkじゃできない？）\u003C\u002Fp\u003E\n\u003Ch2\u003E自己完結型 #とは\u003C\u002Fh2\u003E\n\u003Cp\u003E必要なもの全部を一つの\u003Ccode\u003Eexeファイル\u003C\u002Fcode\u003Eにできる機能。\u003Cbr\u003E\nちょっと前だとWindowsのフリーソフトを入れる際に、\u003Cstrong\u003E.NET Framework のバージョンなんとか以上が必要\u003C\u002Fstrong\u003Eみたいなやつがよくありましたが、\u003Cbr\u003E\n\u003Ccode\u003E.NET Core（正確には3.0から）\u003C\u002Fcode\u003E\u003Ca href=\"http:\u002F\u002Fxn--n9jq.NET\"\u003Eでは.NET\u003C\u002Fa\u003E Core（.NET Frameworkの後継）が入っていないPCでも実行できるように、.NET Coreのランタイムやらなんやらを一つのexeにいれて環境に関係なく動くようになるらしい。\u003Cbr\u003E\n変わりにファイルサイズが大きくなるけど。\u003C\u002Fp\u003E\n\u003Cp\u003E今回は\u003Ccode\u003E.NET Core ランタイム入り（.NET Core入ってないPCでも動くやつ）\u003C\u002Fcode\u003Eと\u003Ccode\u003E.NET Coreのランタイム無し\u003C\u002Fcode\u003Eの両方をやろうと思います。\u003C\u002Fp\u003E\n\u003Ch2\u003Eソリューションエクスプローラー開いて\u003C\u002Fh2\u003E\n\u003Cp\u003E名前のところを押して\u003Cstrong\u003E発行\u003C\u002Fstrong\u003Eを押します。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FxjXxEdu.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003Eフォルダー\u003C\u002Fstrong\u003Eを選んで次へ\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FWBZdhUB.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eそのまま\u003Cstrong\u003E完了\u003C\u002Fstrong\u003E押して良いと思います。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FgZPdL5D.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eそしたら後ろのVS 2019の内容が画像のように変わるので、\u003Cstrong\u003E構成\u003C\u002Fstrong\u003Eのところの鉛筆マークを押します。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FdGv9U3Z.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eそしてこの先は作りたいexeファイルによって操作が変わります。\u003C\u002Fp\u003E\n\u003Ch1\u003E.NET Core ランタイム入りのexeファイルを作成する\u003C\u002Fh1\u003E\n\u003Cp\u003Eプロファイル設定で、\u003Cstrong\u003E配置モード\u003C\u002Fstrong\u003Eを\u003Cstrong\u003E自己完結\u003C\u002Fstrong\u003Eにします。\u003Cbr\u003E\nそれから、下の\u003Cstrong\u003Eファイルの公開オプション\u003C\u002Fstrong\u003Eを押して、\u003Cstrong\u003E単一ファイルの作成\u003C\u002Fstrong\u003Eにチェックを入れます。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FARUKDNH.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eそしたら保存して、\u003Cstrong\u003E発行\u003C\u002Fstrong\u003Eボタンを押せば作成されます。\n作成された\u003Ccode\u003Eexeファイル\u003C\u002Fcode\u003Eは\u003Ccode\u003Ebin\u002FRelease\u002Fnetcoreapp3.1\u002Fpublish\u003C\u002Fcode\u003Eの中にあると思います。\u003C\u002Fp\u003E\n\u003Cp\u003E実際に起動してみたの図。これだけなのにファイルサイズでけえ。\n\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FhN2DDg4.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Ch1\u003E.NET Core ランタイム無しのexeファイルを作成する\u003C\u002Fh1\u003E\n\u003Cp\u003Eプロファイル設定で、\u003Cstrong\u003E配置モード\u003C\u002Fstrong\u003Eを\u003Cstrong\u003Eフレームワーク依存\u003C\u002Fstrong\u003Eにします。\u003Cbr\u003E\nそれから、下の\u003Cstrong\u003Eファイルの公開オプション\u003C\u002Fstrong\u003Eを押して、\u003Cstrong\u003E単一ファイルの作成\u003C\u002Fstrong\u003Eにチェックを入れます。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FsRKKtZN.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eそしたら保存して、\u003Cstrong\u003E発行\u003C\u002Fstrong\u003Eボタンを押せば作成されます。\n作成された\u003Ccode\u003Eexeファイル\u003C\u002Fcode\u003Eは\u003Ccode\u003Ebin\u002FRelease\u002Fnetcoreapp3.1\u002Fpublish\u003C\u002Fcode\u003Eの中にあると思います。\u003C\u002Fp\u003E\n\u003Cp\u003E実際に起動してみたの図。ファイルサイズは小さい。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002FbyF4X4v.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Ch1\u003Eおわりに\u003C\u002Fh1\u003E\n\u003Cp\u003Eこれで正解なのかはよく分かっていない。\u003C\u002Fp\u003E\n\u003Cp\u003Eというかなんで\u003Ccode\u003ETextBox\u003C\u002Fcode\u003E使ったの？\u003Ccode\u003ETextBlock\u003C\u002Fcode\u003Eで良かったじゃん。\u003C\u002Fp\u003E\n\u003Cp\u003E一応ソースコード置いときますね→ \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDotNetCoreWPF\"\u003Ehttps:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDotNetCoreWPF\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eあと少しずれるんだけど、画像を入れても何故かコケる問題。画像を右クリックしてプロパティ選んで、ビルドアクションをリソースにすればいいのね。時間奪われた。\u003C\u002Fp\u003E\n\u003Ch1\u003E参考にしました\u003C\u002Fh1\u003E\n\u003Cp\u003Eありがとうございます\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fwww.telerik.com\u002Fblogs\u002Fcreating-a-single-exe-application-with-net-core\"\u003Ehttps:\u002F\u002Fwww.telerik.com\u002Fblogs\u002Fcreating-a-single-exe-application-with-net-core\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Ftechinfoofmicrosofttech.osscons.jp\u002Findex.php?.NET%20Core%E3%81%AE%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4\"\u003Ehttps:\u002F\u002Ftechinfoofmicrosofttech.osscons.jp\u002Findex.php?.NET Coreのデプロイ\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Frksoftware.hatenablog.com\u002Fentry\u002F2019\u002F02\u002F17\u002F194701\"\u003Ehttps:\u002F\u002Frksoftware.hatenablog.com\u002Fentry\u002F2019\u002F02\u002F17\u002F194701\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n",dir:"contents\u002Fposts\u002Fjson",base:"dotnet_wpf.json",ext:".json",sourceBase:"dotnet_wpf.md",sourceExt:".md",params:{slug:"dotnet_wpf"}}],fetch:[],mutations:void 0});