__NUXT_JSONP__("/posts/android11_statusbar_hide", {data:[{title:"Hello Android 11。systemUiVisibility編",created_at:"2020-06-22T00:00:00.000Z",tags:["Android","Android11","Kotlin"],bodyContent:"よーこそ`targetSdkVersion 30`の世界へ\r\n\r\n# 本題\r\nActivityを全画面にしたり、ステータスバー、ナビゲーションを一時的に消すときに`window?.decorView?.systemUiVisibility`がAndroid 11から非推奨になった  \r\n代わりに`WindowInsetsController`を使って消すらしい。\r\n\r\n# 環境\r\n\r\n|なまえ|あたい|\r\n|---|---|\r\n|端末|Pixel 3 XL|\r\n|Android|11 Beta 1|\r\n\r\n# 非表示の種類\r\n- **スワイプすることで一時的にはステータスバー、ナビゲーションバーが表示され、数秒操作しないとまた自動で全画面に戻る**\r\n    - 動画アプリとか\r\n    - `WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE`を使う（後述）\r\n- **スワイプして、ステータスバーを表示させるけどそのまま表示したままになる**\r\n    - どこで使ってるかはわからんな\r\n    - `WindowInsetsController.BEHAVIOR_SHOW_BARS_BY_SWIPE`を使う（後述）\r\n\r\n# つくる\r\n\r\nスワイプすると一時的に表示される方  \r\n一時的に表示しているバーは半透明になっている。\r\n\r\n```kotlin\r\nif (Build.VERSION.SDK_INT \u003E= Build.VERSION_CODES.R) {\r\n    \u002F\u002F Android 11 以上と分岐\r\n    window?.insetsController?.apply {\r\n        \u002F\u002F スワイプで一時的に表示可能\r\n        systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE\r\n        \u002F\u002F StatusBar + NavigationBar 非表示\r\n        hide(WindowInsets.Type.systemBars())\r\n        \u002F\u002F ノッチにも侵略\r\n        window?.attributes?.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES\r\n    }\r\n} else {\r\n    \u002F\u002F Android 10 以前。\r\n    window?.decorView?.systemUiVisibility = View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or View.SYSTEM_UI_FLAG_FULLSCREEN or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION\r\n}\r\n```\r\n\r\nノッチまでは広げなくていい場合は、ノッチにも侵略の一行をコメントアウトしてね。  \r\n\r\nもし一時的に表示ではなく、一回表示したらずっと出っぱなしにする際は`systemBarsBehavior`を  \r\n\r\n```kotlin\r\nsystemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_BARS_BY_SWIPE\r\n```\r\n\r\nにすればいいと思います。\r\n\r\n`Type#systemBars()`を使うと、ステータスバーとナビゲーションバーを消しますが、別に以下のコードでも動きます。  \r\n\r\n```kotlin\r\n\u002F\u002F ステータスバー\r\nhide(WindowInsets.Type.statusBars())\r\n\u002F\u002F ナビゲーションバー\r\nhide(WindowInsets.Type.navigationBars())\r\n```\r\n\r\n# おまけ\r\nIME（キーボードのこと）もこの`WindowInsetsController`を利用することで、一行で消せるようになりました。\r\n\r\n```kotlin\r\nwindow?.insetsController?.hide(WindowInsets.Type.ime())\r\n```\r\n\r\nキーボード隠すのなんか面倒だし成功したことないからこの方法が使えるのは嬉しい。🥳",bodyHtml:"\u003Cp\u003Eよーこそ\u003Ccode\u003EtargetSdkVersion 30\u003C\u002Fcode\u003Eの世界へ\u003C\u002Fp\u003E\n\u003Ch1\u003E本題\u003C\u002Fh1\u003E\n\u003Cp\u003EActivityを全画面にしたり、ステータスバー、ナビゲーションを一時的に消すときに\u003Ccode\u003Ewindow?.decorView?.systemUiVisibility\u003C\u002Fcode\u003EがAndroid 11から非推奨になった\u003Cbr\u003E\n代わりに\u003Ccode\u003EWindowInsetsController\u003C\u002Fcode\u003Eを使って消すらしい。\u003C\u002Fp\u003E\n\u003Ch1\u003E環境\u003C\u002Fh1\u003E\n\u003Ctable\u003E\n\u003Cthead\u003E\n\u003Ctr\u003E\n\u003Cth\u003Eなまえ\u003C\u002Fth\u003E\n\u003Cth\u003Eあたい\u003C\u002Fth\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Fthead\u003E\n\u003Ctbody\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E端末\u003C\u002Ftd\u003E\n\u003Ctd\u003EPixel 3 XL\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003EAndroid\u003C\u002Ftd\u003E\n\u003Ctd\u003E11 Beta 1\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Ftbody\u003E\n\u003C\u002Ftable\u003E\n\u003Ch1\u003E非表示の種類\u003C\u002Fh1\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003Eスワイプすることで一時的にはステータスバー、ナビゲーションバーが表示され、数秒操作しないとまた自動で全画面に戻る\u003C\u002Fstrong\u003E\n\u003Cul\u003E\n\u003Cli\u003E動画アプリとか\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EWindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE\u003C\u002Fcode\u003Eを使う（後述）\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003Eスワイプして、ステータスバーを表示させるけどそのまま表示したままになる\u003C\u002Fstrong\u003E\n\u003Cul\u003E\n\u003Cli\u003Eどこで使ってるかはわからんな\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EWindowInsetsController.BEHAVIOR_SHOW_BARS_BY_SWIPE\u003C\u002Fcode\u003Eを使う（後述）\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch1\u003Eつくる\u003C\u002Fh1\u003E\n\u003Cp\u003Eスワイプすると一時的に表示される方\u003Cbr\u003E\n一時的に表示しているバーは半透明になっている。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.R) {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Android 11 以上と分岐\u003C\u002Fspan\u003E\n    window?.insetsController?.apply {\n        \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F スワイプで一時的に表示可能\u003C\u002Fspan\u003E\n        systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE\n        \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F StatusBar + NavigationBar 非表示\u003C\u002Fspan\u003E\n        hide(WindowInsets.Type.systemBars())\n        \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ノッチにも侵略\u003C\u002Fspan\u003E\n        window?.attributes?.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES\n    }\n} \u003Cspan class=\"hljs-keyword\"\u003Eelse\u003C\u002Fspan\u003E {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Android 10 以前。\u003C\u002Fspan\u003E\n    window?.decorView?.systemUiVisibility = View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or View.SYSTEM_UI_FLAG_FULLSCREEN or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eノッチまでは広げなくていい場合は、ノッチにも侵略の一行をコメントアウトしてね。\u003C\u002Fp\u003E\n\u003Cp\u003Eもし一時的に表示ではなく、一回表示したらずっと出っぱなしにする際は\u003Ccode\u003EsystemBarsBehavior\u003C\u002Fcode\u003Eを\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003EsystemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_BARS_BY_SWIPE\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eにすればいいと思います。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003EType#systemBars()\u003C\u002Fcode\u003Eを使うと、ステータスバーとナビゲーションバーを消しますが、別に以下のコードでも動きます。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ステータスバー\u003C\u002Fspan\u003E\nhide(WindowInsets.Type.statusBars())\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ナビゲーションバー\u003C\u002Fspan\u003E\nhide(WindowInsets.Type.navigationBars())\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch1\u003Eおまけ\u003C\u002Fh1\u003E\n\u003Cp\u003EIME（キーボードのこと）もこの\u003Ccode\u003EWindowInsetsController\u003C\u002Fcode\u003Eを利用することで、一行で消せるようになりました。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003Ewindow?.insetsController?.hide(WindowInsets.Type.ime())\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eキーボード隠すのなんか面倒だし成功したことないからこの方法が使えるのは嬉しい。🥳\u003C\u002Fp\u003E\n",dir:"contents\u002Fposts\u002Fjson",base:"android11_statusbar_hide.json",ext:".json",sourceBase:"android11_statusbar_hide.md",sourceExt:".md",params:{slug:"android11_statusbar_hide"}}],fetch:[],mutations:void 0});