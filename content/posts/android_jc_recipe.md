---
title: Jetpack Compose の例
created_at: 2020-12-31
tags:
- Android
- Kotlin
- JetpackCompose
---

この続きです。

https://takusan.negitoro.dev/posts/android_jc/

## Snackbar表示

`Scaffold { }`で囲ってあげる必要があります。  
Snackbar表示以外でもアプリバーとかドロワーの表示でも使うので置いておいて損はないはず。

また、Compose内で利用できるコルーチン(`rememberCoroutineScope()`)を利用する必要があります。

```kotlin
@ExperimentalMaterialApi
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
        MaterialTheme {
            val state = rememberScaffoldState()
            val scope = rememberCoroutineScope()
            Scaffold(
                scaffoldState = state,
                topBar = {
                    TopAppBar() {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxHeight().padding(10.dp),
                        ) {
                            Text(text = "ブログ一覧")
                        }
                    }
                }
            ) {
                OutlinedButton(onClick = {
                    scope.launch {
                        val result = state.snackbarHostState.showSnackbar(
                            message = "Snackbar表示",
                            actionLabel = "押せます",
                            duration = SnackbarDuration.Short,
                        )
                        // 押せたかどうか
                        if (result == SnackbarResult.ActionPerformed) {
                            Toast.makeText(this@MainActivity, "押せました！", Toast.LENGTH_SHORT).show()
                        }
                    }
                }) {
                    Text(text = "Snackbar表示")
                }
            }
        }
    }
}
```

実行結果

![Imgur](https://imgur.com/T2NNPnK.png)

参考にしました：https://gist.github.com/gildor/82ec960cc0c5873453f024870495eab3

## Context取得
リソース取得等は用意されてるけど、それ以外でContentを使いたい場合はこうです！

```kotlin
@Composable
fun needContext() {
    val context = AmbientContext.current
}
```

## コルーチンは？

```kotlin
val scope = rememberCoroutineScope()
scope.launch {

}
```

## テーマとか文字の色にカラーコードを使いたい！
`Color.parseColor()`がそのままでは使えないので、`androidx.compose.ui.graphics`の方の`Color`の引数に入れてあげます。

```kotlin
Text(
    text = AnniversaryDate.makeAnniversaryMessage(anniversary),
    color = Color(android.graphics.Color.parseColor("#252525"))
)
```

ちなみに黒背景にすると`Icon()`等が勝手に検知してアイコンの色を白色に変更してくれるそうです。ダークモード対応の手間が減る

## ダークモード

まずは`ThemeColor.kt`みたいな色だけを書いておくクラスを作ってはりつけ  
なんか`isDarkMode`に`@Composable`を付ける理由はわかりません。サンプルコードがそうなってたので便乗

```kotlin
/**
 * [MaterialTheme]に渡すテーマ。コードでテーマの設定ができるってマジ？
 * */

/** ダークモード。OLED特化 */
val DarkColors = darkColors(
    primary = Color.White,
    secondary = Color.Black,
)

/** ライトテーマ */
val LightColors = lightColors(
    primary = Color(android.graphics.Color.parseColor("#757575")),
    primaryVariant = Color(android.graphics.Color.parseColor("#494949")),
    secondary = Color(android.graphics.Color.parseColor("#a4a4a4")),
)

/** ダークモードかどうか */
@Composable
fun isDarkMode(context: Context): Boolean {
    val conf = context.resources.configuration
    val nightMode = conf.uiMode and Configuration.UI_MODE_NIGHT_MASK
    return nightMode == Configuration.UI_MODE_NIGHT_YES // ダークモードなら true
}
```

そしたら`MaterialTheme { }`に渡してあげます。if文を一行で書く

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(
                // 色の設定
                colors = if (isDarkMode(AmbientContext.current)) DarkColors else LightColors
            ) {
                Scaffold {
                    Column(
                        modifier = Modifier.fillMaxWidth().fillMaxHeight(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        // この２つ、ダークモードなら白色、それ以外なら黒色になるはず
                        Text(text = "もじのいろ")
                        Icon(imageVector = Icons.Outlined.Home)
                    }
                }
            }
        }
    }
}
```

ちゃんと動けばダークモードのときは真っ暗になると思います。AOD

![Imgur](https://imgur.com/pMaRzgc.png)