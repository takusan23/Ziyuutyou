__NUXT_JSONP__("/posts/android11_devicecontrol", {data:[{title:"Android 11 のデバイスコントロールAPIを試す",created_at:"2020-06-11T00:00:00.000Z",tags:["Android","Android11","Kotlin","Android R"],bodyContent:"Android 11 Beta きたぞおおおおおおおおお   \r\n🥳←これすき\r\n\r\n# 追記：2020\u002F06\u002F13\r\nGoogle Payが使えないと言いました。が、Suicaで電車に乗れたので多分**おｻｲﾌｹｰﾀｲ**アプリでは対応していない**NFC Pay**あたりが使えないんだと思います。  \r\nFelica使う系は多分行けるんじゃないですかね？\r\n\r\nあとスライダー(RangeTemplate)動いたのでそれも\r\n\r\n# 本題\r\nAndroid 11 Beta 1 来ました。  \r\nわたし的に楽しみにしてる機能は\r\n- Device Control API (正式名称しらん)\r\n    - 証明のON\u002FOFFとか明るさスライダーなど\r\n    - Quick Settings のスマートホーム版\r\n    - **スマートホームなんて金かかるからやらないと思う（よって使わない）**\r\n- Dynamic Intent Filter\r\n- Wi-Fi経由のADB\r\n    - カスROMには前からあるって？\r\n    - 公式で対応なんですよ！！！\r\n- Bubble\r\n    - **他のアプリに重ねて表示**が年々厳しくなってるので（最近、設定アプリの上に表示できなくなった）代替。\r\n    - ポップアップ再生の代替にはならなそう。あくまでメッセージアプリ向けなのかな。\r\n\r\n## Android 11 Beta入れようとしている各位\r\nGoogle Pay 使えなくなるらしいよ。DP4の段階では使えたんだけどまた使えなくなった。  \r\n![Imgur](https:\u002F\u002Fimgur.com\u002Fr914HON.png)  \r\nSuica使えるんかな？  \r\n\r\n# Device Control API を試す\r\n**スマートホームなんてする予定なけど**せっかくBeta版の登場と一緒にAPIが文書化されてるので試しに追加してみる。\r\n\r\n[ドキュメント](https:\u002F\u002Fdeveloper.android.com\u002Fpreview\u002Ffeatures\u002Fdevice-control)\r\n\r\n# 環境\r\n|なまえ|あたい|\r\n|---|---|\r\n|言語|Kotlin|\r\n|Android|11 Beta 1|\r\n|端末|Pixel 3 XL|\r\n\r\n## Android R Betaの環境を揃えます。\r\nSDK Manager開いて、SDK Platformsタブを押して、**Android 10.0+(R)**にチェックを入れて**Apply**押してダウンロードしましょう。\r\n\r\n# build.gradle\r\n## バージョン\r\n```gradle\r\nandroid {\r\n    compileSdkVersion 30\r\n    buildToolsVersion \"29.0.3\"\r\n\r\n    defaultConfig {\r\n        applicationId \"io.github.takusan23.devicecontrolstest\"\r\n        minSdkVersion 30\r\n        targetSdkVersion 30\r\n        versionCode 1\r\n        versionName \"1.0\"\r\n        testInstrumentationRunner \"androidx.test.runner.AndroidJUnitRunner\"\r\n    }\r\n\r\n    buildTypes {\r\n        release {\r\n            minifyEnabled false\r\n            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n`compileSdkVersion 30`と`targetSdkVersion 30`になってればいいと思います。多分\r\n\r\n## ライブラリいれる\r\nドキュメントがRxJava入れてることを前提にしているので私も入れます。  \r\nRxJavaなんて使ったことないんだけどね。\r\n```gradle\r\ndependencies {\r\n    implementation 'org.reactivestreams:reactive-streams:1.0.3'\r\n    implementation 'io.reactivex.rxjava2:rxjava:2.2.0'\r\n}\r\n```\r\n\r\n# AndroidManifest書く\r\nおまじないです。\r\n```xml\r\n\u003Cservice\r\n    android:name=\".DeviceControlsService\"\r\n    android:label=\"@string\u002Fapp_name\"\r\n    android:permission=\"android.permission.BIND_CONTROLS\"\u003E\r\n    \u003Cintent-filter\u003E\r\n        \u003Caction android:name=\"android.service.controls.ControlsProviderService\" \u002F\u003E\r\n    \u003C\u002Fintent-filter\u003E\r\n\u003C\u002Fservice\u003E\r\n```\r\n\r\n# DeviceControlsService っていうサービス作成\r\n`DeviceControlsService.kt`を作成します。  \r\n作成したら、`ControlsProviderService()`を継承します。\r\n```kotlin\r\nclass DeviceControlsService : ControlsProviderService() {\r\n    override fun createPublisherForAllAvailable(): Flow.Publisher\u003CControl\u003E {\r\n\r\n    }\r\n\r\n    override fun performControlAction(p0: String, p1: ControlAction, p2: Consumer\u003CInt\u003E) {\r\n\r\n    }\r\n\r\n    override fun createPublisherFor(p0: MutableList\u003CString\u003E): Flow.Publisher\u003CControl\u003E {\r\n\r\n    }\r\n}\r\n```\r\n\r\nでもこのままだと返り値なにもないのでIDEが赤いなみなみ出すので今から書いていきましょう。\r\n\r\n## 利用可能コントローラーの一覧を用意する\r\nこれから追加可能コントローラーを作っていきます。  \r\nここからユーザーが選ぶわけですね。  \r\n`createPublisherForAllAvailable()`に書いていきます。\r\n```kotlin\r\n\u002F\u002F 追加するデバイスのID\r\nval TOGGLE_BUTTON_ID = \"toggle_button_id\"\r\n\u002F**\r\n * 追加可能コントローラーを用意する。\r\n * *\u002F\r\noverride fun createPublisherForAllAvailable(): Flow.Publisher\u003CControl\u003E {\r\n    \u002F\u002F コントローラーを長押しした時に表示するActivity\r\n    val intent = Intent(baseContext, MainActivity::class.java)\r\n    val pendingIntent =\r\n        PendingIntent.getActivity(baseContext, 10, intent, PendingIntent.FLAG_UPDATE_CURRENT)\r\n    \u002F\u002F まとめてコントローラーを追加するので配列に\r\n    val controlList = mutableListOf\u003CControl\u003E()\r\n    \u002F\u002F ON\u002FOFFサンプル。\r\n    val toggleControl = Control.StatelessBuilder(TOGGLE_BUTTON_ID, pendingIntent)\r\n        .setTitle(\"ON\u002FOFFサンプル\") \u002F\u002F たいとる\r\n        .setSubtitle(\"おすとON\u002FOFFが切り替わります。\") \u002F\u002F サブタイトル\r\n        .setDeviceType(DeviceTypes.TYPE_LIGHT) \u002F\u002F あいこんといろの設定。\r\n        .build()\r\n    \u002F\u002F 配列に追加\r\n    controlList.add(toggleControl)\r\n    \u002F\u002F Reactive Streamsの知識が必要な模様。私にはないのでサンプルコピペする。\r\n    return FlowAdapters.toFlowPublisher(Flowable.fromIterable(controlList))\r\n}\r\n```\r\n\r\nコメント文は各自消してね。  \r\n### 注意\r\nここで使う`Control`は`Control.StatelessBuilder`の方です。  \r\nこれはまだ状態が（スイッチがONとかOFFとかって話）が分からない時に使うとか書いてあるけど多分この時に使います。\r\n\r\n## ユーザーが選んだコントローラーを用意する\r\n`利用可能コントローラーの一覧を用意する`で選んだコントローラーをユーザーが操作できるようにします。\r\n\r\n```kotlin\r\nlateinit var updatePublisher: ReplayProcessor\u003CControl\u003E\r\n\u002F**\r\n * ユーザーが選んだコントローラーを用意する\r\n * 電源ボタン長押しでよばれる\r\n * *\u002F\r\noverride fun createPublisherFor(p0: MutableList\u003CString\u003E): Flow.Publisher\u003CControl\u003E {\r\n    \u002F\u002F コントローラーを長押ししたときに表示するActivity\r\n    val intent = Intent(baseContext, MainActivity::class.java)\r\n    val pendingIntent =\r\n        PendingIntent.getActivity(baseContext, 12, intent, PendingIntent.FLAG_UPDATE_CURRENT)\r\n    \u002F\u002F 知識不足でわからん\r\n    updatePublisher = ReplayProcessor.create()\r\n    \u002F\u002F コントローラー\r\n    if(p0.contains(TOGGLE_BUTTON_ID)) {\r\n        \u002F\u002F ON\u002FOFF\r\n        val toggle = ToggleTemplate(\"toggle_template\", ControlButton(false, \"OFFですねえ！\"))\r\n        \u002F\u002F ここで作るControlは StatefulBuilder を使う。\r\n        val control = Control.StatefulBuilder(TOGGLE_BUTTON_ID, pendingIntent)\r\n            .setTitle(\"ON\u002FOFFサンプル\") \u002F\u002F たいとる\r\n            .setSubtitle(\"おすとON\u002FOFFが切り替わります。\") \u002F\u002F サブタイトル\r\n            .setDeviceType(DeviceTypes.TYPE_LIGHT) \u002F\u002F 多分アイコンに使われてる？\r\n            .setStatus(Control.STATUS_OK) \u002F\u002F 現在の状態\r\n            .setControlTemplate(toggle) \u002F\u002F 今回はON\u002FOFFボタン\r\n            .build()\r\n        updatePublisher.onNext(control)\r\n    }\r\n    return FlowAdapters.toFlowPublisher(updatePublisher)\r\n}\r\n```\r\n\r\nこれでエラーは一応消えるので、早速実行してみましょう。\r\n\r\n# コントローラー追加\r\n電源ボタン長押しすると、**デバイス コントロール**が追加されているので、押してみましょう。  \r\n押すと、コントローラーが提供されているアプリ一覧画面が表示されるので、今作っているアプリを選びましょう。  \r\nすると、さっき作ったコントローラーが現れるのでチェックを入れて、右下の保存ボタンを押しましょう。  \r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002Fr2Wyog1.png)\r\n\r\nするとコントローラーが追加されているはずです。  \r\nですがこの段階では押してもなにも変わらないのでこれから押した時に`ON\u002FOFF`を切り替える処理を書いていきたいと思います。\r\n\r\nちなみにエミュレータでAndroid 11動かすのにダウンロードが長かった。\r\n\r\n# コントローラーを押したときの処理\r\n押した時にON\u002FOFFを切り替えられるようにします。\r\n```kotlin\r\n\u002F**\r\n * コントローラーを押したとき\r\n * *\u002F\r\noverride fun performControlAction(p0: String, p1: ControlAction, p2: Consumer\u003CInt\u003E) {\r\n    \u002F\u002F コントローラーを長押ししたときに表示するActivity\r\n    val intent = Intent(baseContext, MainActivity::class.java)\r\n    val pendingIntent =\r\n        PendingIntent.getActivity(baseContext, 11, intent, PendingIntent.FLAG_UPDATE_CURRENT)\r\n    \u002F\u002F システムに処理中とおしえる\r\n    p2.accept(ControlAction.RESPONSE_OK)\r\n    \u002F\u002F コントローラー分岐\r\n    when (p0) {\r\n        TOGGLE_BUTTON_ID -\u003E {\r\n            \u002F\u002F ON\u002FOFF切り替え\r\n            \u002F\u002F ToggleTemplate は BooleanAction\r\n            if (p1 is BooleanAction) {\r\n                \u002F\u002F ONかどうか\r\n                val isOn = p1.newState\r\n                val message = if (isOn) \"ONです\" else \"OFFです\"\r\n                val toggle = ToggleTemplate(\"toggle_template\", ControlButton(isOn, message))\r\n                \u002F\u002F Control更新\r\n                val control = Control.StatefulBuilder(TOGGLE_BUTTON_ID, pendingIntent)\r\n                    .setTitle(\"ON\u002FOFFサンプル\") \u002F\u002F たいとる\r\n                    .setSubtitle(\"おすとON\u002FOFFが切り替わります。\") \u002F\u002F サブタイトル\r\n                    .setDeviceType(DeviceTypes.TYPE_LIGHT) \u002F\u002F 多分アイコンに使われてる？\r\n                    .setStatus(Control.STATUS_OK) \u002F\u002F 現在の状態\r\n                    .setControlTemplate(toggle) \u002F\u002F 今回はON\u002FOFFボタン\r\n                    .setStatusText(message)\r\n                    .build()\r\n                updatePublisher.onNext(control)\r\n            }\r\n        }\r\n    }\r\n}\r\n```\r\n\r\nこれで押した時にON\u002FOFFが切り替わるようになりました。  \r\n`DeviceType#TYPE_LIGHT`見た目いい感じ。  \r\nスマートホームやってみたい（金ないけど）\r\n\r\n![Imgur](https:\u002F\u002Fimgur.com\u002F2TNFYZz.png)\r\n\r\n# おわりに\r\nソースコードです。https:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDeviceControlsTest\r\n\r\n~~それと**本当**はスライダー（値を調整できる`RangeTemplate`てやつ）コントローラーがあったんですけど、私の環境ではうまく動きませんでした。Beta版だからなのかそもそも私が間違ってるのか？~~\r\n\r\n**RangeTemplate**動きました。[参考にしました](https:\u002F\u002Fgist.github.com\u002FKieronQuinn\u002Fc9950f3ee09e11f305ce16e7f48f03b8)\r\n\r\n```kotlin\r\nval sliderControl = Control.StatefulBuilder(SLIDER_BUTTON_ID, pendingIntent)\r\n    .setTitle(\"スライダーサンプル\") \u002F\u002F たいとる\r\n    .setSubtitle(\"スライダーです。\") \u002F\u002F サブタイトル\r\n    .setDeviceType(DeviceTypes.TYPE_LIGHT) \u002F\u002F 多分アイコンに使われてる？\r\n    .setControlId(SLIDER_BUTTON_ID)\r\n    .setStatus(Control.STATUS_OK) \u002F\u002F 現在の状態\r\nsliderControl.setControlTemplate(\r\n    ToggleRangeTemplate(\r\n        \"slider_template\",\r\n        ControlButton(true, \"slider_button\"),\r\n        RangeTemplate(\"range\", 0f, 10f, 1f, 1f, null)\r\n    )\r\n)\r\nupdatePublisher.onNext(sliderControl.build())\r\n```\r\n\r\nperformControlAction()はこうです。\r\n\r\n```kotlin\r\n\u002F\u002F スライダー\r\n\u002F\u002F RangeTemplate は FloatAction\r\nif (p1 is FloatAction) {\r\n    \u002F\u002F 現在の値\r\n    val currentValue = p1.newValue\r\n    val sliderControl = Control.StatefulBuilder(SLIDER_BUTTON_ID, pendingIntent)\r\n        .setTitle(\"スライダーサンプル\") \u002F\u002F たいとる\r\n        .setSubtitle(\"スライダーです。\") \u002F\u002F サブタイトル\r\n        .setDeviceType(DeviceTypes.TYPE_LIGHT) \u002F\u002F 多分アイコンに使われてる？\r\n        .setControlId(SLIDER_BUTTON_ID)\r\n        .setStatus(Control.STATUS_OK) \u002F\u002F 現在の状態\r\n    val controlButton = ControlButton(true, \"slider_button\")\r\n    sliderControl.setControlTemplate(\r\n        ToggleRangeTemplate(\r\n            \"slider_template\",\r\n            controlButton,\r\n            RangeTemplate(\"range\", 0f, 10f, currentValue, 1f, null)\r\n        )\r\n    )\r\n    updatePublisher.onNext(sliderControl.build())\r\n}\r\n```\r\n\r\n\r\nあと`DeviceType`がいっぱいあるので全種類アイコンと色を見てみたい。やってみるか。\r\n\r\nやりました→ https:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDeviceControlAllDeviceTypeSample\r\n\r\n\r\nDynamic Intent Filterもやりたい",bodyHtml:"\u003Cp\u003EAndroid 11 Beta きたぞおおおおおおおおお\u003Cbr\u003E\n🥳←これすき\u003C\u002Fp\u003E\n\u003Ch1\u003E追記：2020\u002F06\u002F13\u003C\u002Fh1\u003E\n\u003Cp\u003EGoogle Payが使えないと言いました。が、Suicaで電車に乗れたので多分\u003Cstrong\u003Eおｻｲﾌｹｰﾀｲ\u003C\u002Fstrong\u003Eアプリでは対応していない\u003Cstrong\u003ENFC Pay\u003C\u002Fstrong\u003Eあたりが使えないんだと思います。\u003Cbr\u003E\nFelica使う系は多分行けるんじゃないですかね？\u003C\u002Fp\u003E\n\u003Cp\u003Eあとスライダー(RangeTemplate)動いたのでそれも\u003C\u002Fp\u003E\n\u003Ch1\u003E本題\u003C\u002Fh1\u003E\n\u003Cp\u003EAndroid 11 Beta 1 来ました。\u003Cbr\u003E\nわたし的に楽しみにしてる機能は\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EDevice Control API (正式名称しらん)\n\u003Cul\u003E\n\u003Cli\u003E証明のON\u002FOFFとか明るさスライダーなど\u003C\u002Fli\u003E\n\u003Cli\u003EQuick Settings のスマートホーム版\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003Eスマートホームなんて金かかるからやらないと思う（よって使わない）\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003EDynamic Intent Filter\u003C\u002Fli\u003E\n\u003Cli\u003EWi-Fi経由のADB\n\u003Cul\u003E\n\u003Cli\u003EカスROMには前からあるって？\u003C\u002Fli\u003E\n\u003Cli\u003E公式で対応なんですよ！！！\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003EBubble\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003E他のアプリに重ねて表示\u003C\u002Fstrong\u003Eが年々厳しくなってるので（最近、設定アプリの上に表示できなくなった）代替。\u003C\u002Fli\u003E\n\u003Cli\u003Eポップアップ再生の代替にはならなそう。あくまでメッセージアプリ向けなのかな。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2\u003EAndroid 11 Beta入れようとしている各位\u003C\u002Fh2\u003E\n\u003Cp\u003EGoogle Pay 使えなくなるらしいよ。DP4の段階では使えたんだけどまた使えなくなった。\u003Cbr\u003E\n\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002Fr914HON.png\" alt=\"Imgur\"\u003E\u003Cbr\u003E\nSuica使えるんかな？\u003C\u002Fp\u003E\n\u003Ch1\u003EDevice Control API を試す\u003C\u002Fh1\u003E\n\u003Cp\u003E\u003Cstrong\u003Eスマートホームなんてする予定なけど\u003C\u002Fstrong\u003EせっかくBeta版の登場と一緒にAPIが文書化されてるので試しに追加してみる。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fdeveloper.android.com\u002Fpreview\u002Ffeatures\u002Fdevice-control\"\u003Eドキュメント\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Ch1\u003E環境\u003C\u002Fh1\u003E\n\u003Ctable\u003E\n\u003Cthead\u003E\n\u003Ctr\u003E\n\u003Cth\u003Eなまえ\u003C\u002Fth\u003E\n\u003Cth\u003Eあたい\u003C\u002Fth\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Fthead\u003E\n\u003Ctbody\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E言語\u003C\u002Ftd\u003E\n\u003Ctd\u003EKotlin\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003EAndroid\u003C\u002Ftd\u003E\n\u003Ctd\u003E11 Beta 1\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E端末\u003C\u002Ftd\u003E\n\u003Ctd\u003EPixel 3 XL\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Ftbody\u003E\n\u003C\u002Ftable\u003E\n\u003Ch2\u003EAndroid R Betaの環境を揃えます。\u003C\u002Fh2\u003E\n\u003Cp\u003ESDK Manager開いて、SDK Platformsタブを押して、\u003Cstrong\u003EAndroid 10.0+(R)\u003Cstrong\u003Eにチェックを入れて\u003C\u002Fstrong\u003EApply\u003C\u002Fstrong\u003E押してダウンロードしましょう。\u003C\u002Fp\u003E\n\u003Ch1\u003Ebuild.gradle\u003C\u002Fh1\u003E\n\u003Ch2\u003Eバージョン\u003C\u002Fh2\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003Eandroid {\n    compileSdkVersion \u003Cspan class=\"hljs-number\"\u003E30\u003C\u002Fspan\u003E\n    buildToolsVersion \u003Cspan class=\"hljs-string\"\u003E\"29.0.3\"\u003C\u002Fspan\u003E\n\n    defaultConfig {\n        applicationId \u003Cspan class=\"hljs-string\"\u003E\"io.github.takusan23.devicecontrolstest\"\u003C\u002Fspan\u003E\n        minSdkVersion \u003Cspan class=\"hljs-number\"\u003E30\u003C\u002Fspan\u003E\n        targetSdkVersion \u003Cspan class=\"hljs-number\"\u003E30\u003C\u002Fspan\u003E\n        versionCode \u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E\n        versionName \u003Cspan class=\"hljs-string\"\u003E\"1.0\"\u003C\u002Fspan\u003E\n        testInstrumentationRunner \u003Cspan class=\"hljs-string\"\u003E\"androidx.test.runner.AndroidJUnitRunner\"\u003C\u002Fspan\u003E\n    }\n\n    buildTypes {\n        release {\n            minifyEnabled \u003Cspan class=\"hljs-keyword\"\u003Efalse\u003C\u002Fspan\u003E\n            proguardFiles getDefaultProguardFile(\u003Cspan class=\"hljs-string\"\u003E'proguard-android-optimize.txt'\u003C\u002Fspan\u003E), \u003Cspan class=\"hljs-string\"\u003E'proguard-rules.pro'\u003C\u002Fspan\u003E\n        }\n    }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E\u003Ccode\u003EcompileSdkVersion 30\u003C\u002Fcode\u003Eと\u003Ccode\u003EtargetSdkVersion 30\u003C\u002Fcode\u003Eになってればいいと思います。多分\u003C\u002Fp\u003E\n\u003Ch2\u003Eライブラリいれる\u003C\u002Fh2\u003E\n\u003Cp\u003EドキュメントがRxJava入れてることを前提にしているので私も入れます。\u003Cbr\u003E\nRxJavaなんて使ったことないんだけどね。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Edependencies\u003C\u002Fspan\u003E {\n    implementation \u003Cspan class=\"hljs-string\"\u003E'org.reactivestreams:reactive-streams:1.0.3'\u003C\u002Fspan\u003E\n    implementation \u003Cspan class=\"hljs-string\"\u003E'io.reactivex.rxjava2:rxjava:2.2.0'\u003C\u002Fspan\u003E\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch1\u003EAndroidManifest書く\u003C\u002Fh1\u003E\n\u003Cp\u003Eおまじないです。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Eservice\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eandroid:name\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\".DeviceControlsService\"\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eandroid:label\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"@string\u002Fapp_name\"\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eandroid:permission\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"android.permission.BIND_CONTROLS\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Eintent-filter\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Eaction\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eandroid:name\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"android.service.controls.ControlsProviderService\"\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Eintent-filter\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Eservice\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch1\u003EDeviceControlsService っていうサービス作成\u003C\u002Fh1\u003E\n\u003Cp\u003E\u003Ccode\u003EDeviceControlsService.kt\u003C\u002Fcode\u003Eを作成します。\u003Cbr\u003E\n作成したら、\u003Ccode\u003EControlsProviderService()\u003C\u002Fcode\u003Eを継承します。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-class\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EDeviceControlsService\u003C\u002Fspan\u003E : \u003Cspan class=\"hljs-type\"\u003EControlsProviderService\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E() {\n    \u003Cspan class=\"hljs-keyword\"\u003Eoverride\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Efun\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EcreatePublisherForAllAvailable\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-params\"\u003E()\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E: Flow.Publisher&lt;Control&gt; {\n\n    }\n\n    \u003Cspan class=\"hljs-keyword\"\u003Eoverride\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Efun\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EperformControlAction\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-params\"\u003E(p0: \u003Cspan class=\"hljs-type\"\u003EString\u003C\u002Fspan\u003E, p1: \u003Cspan class=\"hljs-type\"\u003EControlAction\u003C\u002Fspan\u003E, p2: \u003Cspan class=\"hljs-type\"\u003EConsumer\u003C\u002Fspan\u003E&lt;\u003Cspan class=\"hljs-type\"\u003EInt\u003C\u002Fspan\u003E&gt;)\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E {\n\n    }\n\n    \u003Cspan class=\"hljs-keyword\"\u003Eoverride\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Efun\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EcreatePublisherFor\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-params\"\u003E(p0: \u003Cspan class=\"hljs-type\"\u003EMutableList\u003C\u002Fspan\u003E&lt;\u003Cspan class=\"hljs-type\"\u003EString\u003C\u002Fspan\u003E&gt;)\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E: Flow.Publisher&lt;Control&gt; {\n\n    }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eでもこのままだと返り値なにもないのでIDEが赤いなみなみ出すので今から書いていきましょう。\u003C\u002Fp\u003E\n\u003Ch2\u003E利用可能コントローラーの一覧を用意する\u003C\u002Fh2\u003E\n\u003Cp\u003Eこれから追加可能コントローラーを作っていきます。\u003Cbr\u003E\nここからユーザーが選ぶわけですね。\u003Cbr\u003E\n\u003Ccode\u003EcreatePublisherForAllAvailable()\u003C\u002Fcode\u003Eに書いていきます。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 追加するデバイスのID\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E TOGGLE_BUTTON_ID = \u003Cspan class=\"hljs-string\"\u003E\"toggle_button_id\"\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-comment\"\u003E\u002F**\n * 追加可能コントローラーを用意する。\n * *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Eoverride\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Efun\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EcreatePublisherForAllAvailable\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-params\"\u003E()\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E: Flow.Publisher&lt;Control&gt; {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F コントローラーを長押しした時に表示するActivity\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E intent = Intent(baseContext, MainActivity::\u003Cspan class=\"hljs-class\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title\"\u003Ejava\u003C\u002Fspan\u003E)\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E pendingIntent =\n        PendingIntent.getActivity(baseContext, \u003Cspan class=\"hljs-number\"\u003E10\u003C\u002Fspan\u003E, intent, PendingIntent.FLAG_UPDATE_CURRENT)\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F まとめてコントローラーを追加するので配列に\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E controlList = mutableListOf&lt;Control&gt;()\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ON\u002FOFFサンプル。\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E toggleControl = Control.StatelessBuilder(TOGGLE_BUTTON_ID, pendingIntent)\n        .setTitle(\u003Cspan class=\"hljs-string\"\u003E\"ON\u002FOFFサンプル\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F たいとる\u003C\u002Fspan\u003E\n        .setSubtitle(\u003Cspan class=\"hljs-string\"\u003E\"おすとON\u002FOFFが切り替わります。\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F サブタイトル\u003C\u002Fspan\u003E\n        .setDeviceType(DeviceTypes.TYPE_LIGHT) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F あいこんといろの設定。\u003C\u002Fspan\u003E\n        .build()\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 配列に追加\u003C\u002Fspan\u003E\n    controlList.add(toggleControl)\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Reactive Streamsの知識が必要な模様。私にはないのでサンプルコピペする。\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E FlowAdapters.toFlowPublisher(Flowable.fromIterable(controlList))\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eコメント文は各自消してね。\u003C\u002Fp\u003E\n\u003Ch3\u003E注意\u003C\u002Fh3\u003E\n\u003Cp\u003Eここで使う\u003Ccode\u003EControl\u003C\u002Fcode\u003Eは\u003Ccode\u003EControl.StatelessBuilder\u003C\u002Fcode\u003Eの方です。\u003Cbr\u003E\nこれはまだ状態が（スイッチがONとかOFFとかって話）が分からない時に使うとか書いてあるけど多分この時に使います。\u003C\u002Fp\u003E\n\u003Ch2\u003Eユーザーが選んだコントローラーを用意する\u003C\u002Fh2\u003E\n\u003Cp\u003E\u003Ccode\u003E利用可能コントローラーの一覧を用意する\u003C\u002Fcode\u003Eで選んだコントローラーをユーザーが操作できるようにします。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Elateinit\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Evar\u003C\u002Fspan\u003E updatePublisher: ReplayProcessor&lt;Control&gt;\n\u003Cspan class=\"hljs-comment\"\u003E\u002F**\n * ユーザーが選んだコントローラーを用意する\n * 電源ボタン長押しでよばれる\n * *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Eoverride\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Efun\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EcreatePublisherFor\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-params\"\u003E(p0: \u003Cspan class=\"hljs-type\"\u003EMutableList\u003C\u002Fspan\u003E&lt;\u003Cspan class=\"hljs-type\"\u003EString\u003C\u002Fspan\u003E&gt;)\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E: Flow.Publisher&lt;Control&gt; {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F コントローラーを長押ししたときに表示するActivity\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E intent = Intent(baseContext, MainActivity::\u003Cspan class=\"hljs-class\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title\"\u003Ejava\u003C\u002Fspan\u003E)\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E pendingIntent =\n        PendingIntent.getActivity(baseContext, \u003Cspan class=\"hljs-number\"\u003E12\u003C\u002Fspan\u003E, intent, PendingIntent.FLAG_UPDATE_CURRENT)\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 知識不足でわからん\u003C\u002Fspan\u003E\n    updatePublisher = ReplayProcessor.create()\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F コントローラー\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E(p0.contains(TOGGLE_BUTTON_ID)) {\n        \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ON\u002FOFF\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E toggle = ToggleTemplate(\u003Cspan class=\"hljs-string\"\u003E\"toggle_template\"\u003C\u002Fspan\u003E, ControlButton(\u003Cspan class=\"hljs-literal\"\u003Efalse\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-string\"\u003E\"OFFですねえ！\"\u003C\u002Fspan\u003E))\n        \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ここで作るControlは StatefulBuilder を使う。\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E control = Control.StatefulBuilder(TOGGLE_BUTTON_ID, pendingIntent)\n            .setTitle(\u003Cspan class=\"hljs-string\"\u003E\"ON\u002FOFFサンプル\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F たいとる\u003C\u002Fspan\u003E\n            .setSubtitle(\u003Cspan class=\"hljs-string\"\u003E\"おすとON\u002FOFFが切り替わります。\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F サブタイトル\u003C\u002Fspan\u003E\n            .setDeviceType(DeviceTypes.TYPE_LIGHT) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 多分アイコンに使われてる？\u003C\u002Fspan\u003E\n            .setStatus(Control.STATUS_OK) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 現在の状態\u003C\u002Fspan\u003E\n            .setControlTemplate(toggle) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 今回はON\u002FOFFボタン\u003C\u002Fspan\u003E\n            .build()\n        updatePublisher.onNext(control)\n    }\n    \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E FlowAdapters.toFlowPublisher(updatePublisher)\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eこれでエラーは一応消えるので、早速実行してみましょう。\u003C\u002Fp\u003E\n\u003Ch1\u003Eコントローラー追加\u003C\u002Fh1\u003E\n\u003Cp\u003E電源ボタン長押しすると、\u003Cstrong\u003Eデバイス コントロール\u003C\u002Fstrong\u003Eが追加されているので、押してみましょう。\u003Cbr\u003E\n押すと、コントローラーが提供されているアプリ一覧画面が表示されるので、今作っているアプリを選びましょう。\u003Cbr\u003E\nすると、さっき作ったコントローラーが現れるのでチェックを入れて、右下の保存ボタンを押しましょう。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002Fr2Wyog1.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Eするとコントローラーが追加されているはずです。\u003Cbr\u003E\nですがこの段階では押してもなにも変わらないのでこれから押した時に\u003Ccode\u003EON\u002FOFF\u003C\u002Fcode\u003Eを切り替える処理を書いていきたいと思います。\u003C\u002Fp\u003E\n\u003Cp\u003EちなみにエミュレータでAndroid 11動かすのにダウンロードが長かった。\u003C\u002Fp\u003E\n\u003Ch1\u003Eコントローラーを押したときの処理\u003C\u002Fh1\u003E\n\u003Cp\u003E押した時にON\u002FOFFを切り替えられるようにします。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F**\n * コントローラーを押したとき\n * *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Eoverride\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Efun\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EperformControlAction\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-params\"\u003E(p0: \u003Cspan class=\"hljs-type\"\u003EString\u003C\u002Fspan\u003E, p1: \u003Cspan class=\"hljs-type\"\u003EControlAction\u003C\u002Fspan\u003E, p2: \u003Cspan class=\"hljs-type\"\u003EConsumer\u003C\u002Fspan\u003E&lt;\u003Cspan class=\"hljs-type\"\u003EInt\u003C\u002Fspan\u003E&gt;)\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F コントローラーを長押ししたときに表示するActivity\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E intent = Intent(baseContext, MainActivity::\u003Cspan class=\"hljs-class\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title\"\u003Ejava\u003C\u002Fspan\u003E)\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E pendingIntent =\n        PendingIntent.getActivity(baseContext, \u003Cspan class=\"hljs-number\"\u003E11\u003C\u002Fspan\u003E, intent, PendingIntent.FLAG_UPDATE_CURRENT)\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F システムに処理中とおしえる\u003C\u002Fspan\u003E\n    p2.accept(ControlAction.RESPONSE_OK)\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F コントローラー分岐\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Ewhen\u003C\u002Fspan\u003E (p0) {\n        TOGGLE_BUTTON_ID -&gt; {\n            \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ON\u002FOFF切り替え\u003C\u002Fspan\u003E\n            \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ToggleTemplate は BooleanAction\u003C\u002Fspan\u003E\n            \u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E (p1 \u003Cspan class=\"hljs-keyword\"\u003Eis\u003C\u002Fspan\u003E BooleanAction) {\n                \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F ONかどうか\u003C\u002Fspan\u003E\n                \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E isOn = p1.newState\n                \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E message = \u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E (isOn) \u003Cspan class=\"hljs-string\"\u003E\"ONです\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Eelse\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E\"OFFです\"\u003C\u002Fspan\u003E\n                \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E toggle = ToggleTemplate(\u003Cspan class=\"hljs-string\"\u003E\"toggle_template\"\u003C\u002Fspan\u003E, ControlButton(isOn, message))\n                \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Control更新\u003C\u002Fspan\u003E\n                \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E control = Control.StatefulBuilder(TOGGLE_BUTTON_ID, pendingIntent)\n                    .setTitle(\u003Cspan class=\"hljs-string\"\u003E\"ON\u002FOFFサンプル\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F たいとる\u003C\u002Fspan\u003E\n                    .setSubtitle(\u003Cspan class=\"hljs-string\"\u003E\"おすとON\u002FOFFが切り替わります。\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F サブタイトル\u003C\u002Fspan\u003E\n                    .setDeviceType(DeviceTypes.TYPE_LIGHT) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 多分アイコンに使われてる？\u003C\u002Fspan\u003E\n                    .setStatus(Control.STATUS_OK) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 現在の状態\u003C\u002Fspan\u003E\n                    .setControlTemplate(toggle) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 今回はON\u002FOFFボタン\u003C\u002Fspan\u003E\n                    .setStatusText(message)\n                    .build()\n                updatePublisher.onNext(control)\n            }\n        }\n    }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eこれで押した時にON\u002FOFFが切り替わるようになりました。\u003Cbr\u003E\n\u003Ccode\u003EDeviceType#TYPE_LIGHT\u003C\u002Fcode\u003E見た目いい感じ。\u003Cbr\u003E\nスマートホームやってみたい（金ないけど）\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fimgur.com\u002F2TNFYZz.png\" alt=\"Imgur\"\u003E\u003C\u002Fp\u003E\n\u003Ch1\u003Eおわりに\u003C\u002Fh1\u003E\n\u003Cp\u003Eソースコードです。\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDeviceControlsTest\"\u003Ehttps:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDeviceControlsTest\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cs\u003Eそれと\u003Cstrong\u003E本当\u003C\u002Fstrong\u003Eはスライダー（値を調整できる\u003Ccode\u003ERangeTemplate\u003C\u002Fcode\u003Eてやつ）コントローラーがあったんですけど、私の環境ではうまく動きませんでした。Beta版だからなのかそもそも私が間違ってるのか？\u003C\u002Fs\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003ERangeTemplate\u003C\u002Fstrong\u003E動きました。\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002FKieronQuinn\u002Fc9950f3ee09e11f305ce16e7f48f03b8\"\u003E参考にしました\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E sliderControl = Control.StatefulBuilder(SLIDER_BUTTON_ID, pendingIntent)\n    .setTitle(\u003Cspan class=\"hljs-string\"\u003E\"スライダーサンプル\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F たいとる\u003C\u002Fspan\u003E\n    .setSubtitle(\u003Cspan class=\"hljs-string\"\u003E\"スライダーです。\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F サブタイトル\u003C\u002Fspan\u003E\n    .setDeviceType(DeviceTypes.TYPE_LIGHT) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 多分アイコンに使われてる？\u003C\u002Fspan\u003E\n    .setControlId(SLIDER_BUTTON_ID)\n    .setStatus(Control.STATUS_OK) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 現在の状態\u003C\u002Fspan\u003E\nsliderControl.setControlTemplate(\n    ToggleRangeTemplate(\n        \u003Cspan class=\"hljs-string\"\u003E\"slider_template\"\u003C\u002Fspan\u003E,\n        ControlButton(\u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-string\"\u003E\"slider_button\"\u003C\u002Fspan\u003E),\n        RangeTemplate(\u003Cspan class=\"hljs-string\"\u003E\"range\"\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E0f\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E10f\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E1f\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E1f\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-literal\"\u003Enull\u003C\u002Fspan\u003E)\n    )\n)\nupdatePublisher.onNext(sliderControl.build())\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003EperformControlAction()はこうです。\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"hljs\"\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F スライダー\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F RangeTemplate は FloatAction\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E (p1 \u003Cspan class=\"hljs-keyword\"\u003Eis\u003C\u002Fspan\u003E FloatAction) {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 現在の値\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E currentValue = p1.newValue\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E sliderControl = Control.StatefulBuilder(SLIDER_BUTTON_ID, pendingIntent)\n        .setTitle(\u003Cspan class=\"hljs-string\"\u003E\"スライダーサンプル\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F たいとる\u003C\u002Fspan\u003E\n        .setSubtitle(\u003Cspan class=\"hljs-string\"\u003E\"スライダーです。\"\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F サブタイトル\u003C\u002Fspan\u003E\n        .setDeviceType(DeviceTypes.TYPE_LIGHT) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 多分アイコンに使われてる？\u003C\u002Fspan\u003E\n        .setControlId(SLIDER_BUTTON_ID)\n        .setStatus(Control.STATUS_OK) \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 現在の状態\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Eval\u003C\u002Fspan\u003E controlButton = ControlButton(\u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-string\"\u003E\"slider_button\"\u003C\u002Fspan\u003E)\n    sliderControl.setControlTemplate(\n        ToggleRangeTemplate(\n            \u003Cspan class=\"hljs-string\"\u003E\"slider_template\"\u003C\u002Fspan\u003E,\n            controlButton,\n            RangeTemplate(\u003Cspan class=\"hljs-string\"\u003E\"range\"\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E0f\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-number\"\u003E10f\u003C\u002Fspan\u003E, currentValue, \u003Cspan class=\"hljs-number\"\u003E1f\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-literal\"\u003Enull\u003C\u002Fspan\u003E)\n        )\n    )\n    updatePublisher.onNext(sliderControl.build())\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eあと\u003Ccode\u003EDeviceType\u003C\u002Fcode\u003Eがいっぱいあるので全種類アイコンと色を見てみたい。やってみるか。\u003C\u002Fp\u003E\n\u003Cp\u003Eやりました→ \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDeviceControlAllDeviceTypeSample\"\u003Ehttps:\u002F\u002Fgithub.com\u002Ftakusan23\u002FDeviceControlAllDeviceTypeSample\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EDynamic Intent Filterもやりたい\u003C\u002Fp\u003E\n",dir:"contents\u002Fposts\u002Fjson",base:"android11_devicecontrol.json",ext:".json",sourceBase:"android11_devicecontrol.md",sourceExt:".md",params:{slug:"android11_devicecontrol"}}],fetch:[],mutations:void 0});