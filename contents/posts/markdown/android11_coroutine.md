---
title: Android11からAsyncTask非推奨だしCoroutine使おう
created_at: 2020-06-19
tags:
- Android
- Android11
- Kotlin
- Coroutine
---

どうもこんばんわ。  
OkHttpの非同期もコルーチンに対応できたので記事書く。

あとあってるかは知りません。一応動くとは思いますが

# ~~AsyncTask~~
非推奨になりました。  
OkHttpの非同期処理ばっか使ったせいでAsyncTaskあんま使わなかったですね。

![Imgur](https://imgur.com/8YPfGeW.png)

# 環境

|なまえ|あたい|
|---|---|
|Android|11 Beta 1|
|targetSdkVersion|30（Android 11）|
|言語|Kotlin|

# OkHttp+CoroutineでWebAPI使う

今回はWebAPIに[ニコニコ動画のランキングRSS](https://dwango.github.io/niconico/genre_ranking/ranking_rss/)を使おうと思います。

# ライブラリ入れる
`app/build.gradle`を開いて、

```gradle
dependencies {
    // okhttp
    implementation("com.squareup.okhttp3:okhttp:4.7.2")
    // Coroutines
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.4"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.4"
}
```

OkHttpとCoroutineを入れます。

# レイアウト
TextView見切れた場合でもScrollView置いてるのでスクロールできます。

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical" >

            <TextView
                android:id="@+id/textview"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:text="Hello World!" />
        </LinearLayout>
    </ScrollView>

</LinearLayout>
```

# まずOkHttpだけだとどうなの？
AndroidはUIスレッドで通信できないのでOkHttpの非同期通信で

```kotlin
val request = Request.Builder().apply {
    url(RANKING_RSS_URL)
    addHeader("User-Agent", "@takusan_23")
    get()
}.build()
val okHttpClient = OkHttpClient()
okHttpClient.newCall(request).enqueue(object : Callback {
    override fun onFailure(call: Call, e: IOException) {
        // 失敗時
    }
    override fun onResponse(call: Call, response: Response) {
        if (response.isSuccessful) {
            // 成功時
            textview.text = response.body?.string()
        } else {
            // 失敗時
        }
    }
})
```

括弧が多いね。  


# GlobalScope#launch{ }

`thread {  }`みたいに現在のスレッドに関係なく動くやつ（だと思います）。

```kotlin
// こるーちん
GlobalScope.launch(Dispatchers.Main) {
    // 取得前
    Toast.makeText(this@MainActivity, "取得するね", Toast.LENGTH_SHORT).show()
    // 取得
    val rankingString = withContext(Dispatchers.IO) {
        getRanking().await()
    }
    textview.text = rankingString
}
```

`getRanking()`関数はこう

```kotlin
// ニコ動の例のアレランキングRSS
val RANKING_RSS_URL = "https://www.nicovideo.jp/ranking/genre/other?video_ranking_menu&rss=2.0&lang=ja-jp"
private fun getRanking() = GlobalScope.async {
    val request = Request.Builder().apply {
        url(RANKING_RSS_URL)
        addHeader("User-Agent", "@takusan_23")
        get()
    }.build()
    val okHttpClient = OkHttpClient()
    try {
        okHttpClient.newCall(request).execute().body?.string()
    } catch (e: IOException) {
        null
    }
}
```

try/catch置いてる理由はタイムアウトすると落ちると思うからです。

## （分かる範囲で）解説
`Dispatchers.Main`はUI操作可能なコルーチンを作成しますよってことです。  
でもUI操作できるスレッドでは通信ができないので、`withContext(Dispatchers.IO)`を利用して通信します。この中ではUI操作はできません。  
通信が終わると`withContext`の後の処理が始まります。  
まってこれ動いてるけどあってんの？

# AsyncTaskを書き換えるならこんな感じ？

```kotlin
GlobalScope.launch {
    // AsyncTaskのonPreExecute()でやる処理（読み込み中出すなど）はここに書く
    withContext(Dispatchers.IO){
        // AsyncTaskのdoInBackground()でやる処理（WebAPI叩くなど）はここに書く
    }
    // AsyncTaskのonPostExecute()でやる処理（WebAPIのレスポンス結果）はここに書く。
}
```

# runBlocking { }
こいつは`GlobalScope.launch { }`とは違い、現在のスレッドを止めます。**UIスレッドだろうと止めます。** ぶっちゃけどこで使えば良いのかよくわからん。

```kotlin
// 取得前
Toast.makeText(this@MainActivity, "取得するね", Toast.LENGTH_SHORT).show()
val rankingString = runBlocking(Dispatchers.IO) {
    getRanking().await()
}
textview.text = rankingString
```

`getRanking()`関数はこう

```kotlin
// ニコ動の例のアレランキングRSS
val RANKING_RSS_URL = "https://www.nicovideo.jp/ranking/genre/other?video_ranking_menu&rss=2.0&lang=ja-jp"
private fun getRanking() = GlobalScope.async {
    val request = Request.Builder().apply {
        url(RANKING_RSS_URL)
        addHeader("User-Agent", "@takusan_23")
        get()
    }.build()
    val okHttpClient = OkHttpClient()
    try {
        okHttpClient.newCall(request).execute().body?.string()
    } catch (e: IOException) {
        null
    }
}
```


## 本当にUIスレッド止めてるの？
多分。Activity起動が遅くなってる気がする。  
`GlobalScope.launch { }`の方は  
**Activity表示→WebAPI叩く** みたいな感じだけど、

`runBlocking { }`の方は  
**WebAPI叩く→Activity表示** みたいな感じ。データ取得終わってからActivityを表示してますね。

# おまけ OkHttpの非同期通信をコルーチンに対応させる
`OkHttpのコルーチン`以外にも高階関数などでも使い回せると思います。頑張って作った高階関数もコルーチンに対応できます。

参考にしました：https://medium.com/@star_zero/callback%E5%BD%A2%E5%BC%8F%E3%81%AE%E3%82%82%E3%81%AE%E3%82%92coroutines%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B-9384dfa6ad77

```kotlin
/** ランキングRSS取得関数 */
private suspend fun getRanking() = suspendCoroutine<String?> { suspendCoroutine ->
    val request = Request.Builder().apply {
        url(RANKING_RSS_URL)
        addHeader("User-Agent", "@takusan_23")
        get()
    }.build()
    val okHttpClient = OkHttpClient()
    okHttpClient.newCall(request).enqueue(object : Callback {
        override fun onFailure(call: Call, e: IOException) {
            suspendCoroutine.resumeWithException(e)
        }
        override fun onResponse(call: Call, response: Response) {
            if (response.isSuccessful) {
                suspendCoroutine.resume(response.body?.string())
            } else {
                suspendCoroutine.resume(null)
            }
        }
    })
}
```

`suspendCoroutine`を使えばコールバックなコードでもコルーチンに対応できます。  

使い方はこう

```kotlin
// こるーちん
GlobalScope.launch(Dispatchers.Main) {
    // 取得前
    Toast.makeText(this@MainActivity, "取得するね", Toast.LENGTH_SHORT).show()
    // 取得
    val rankingString = withContext(Dispatchers.IO) {
        getRanking()
    }
    textview.text = rankingString
}
```

`suspend`ってのは中断って意味らしいですよ。

# おわりに
なんとなくでCoroutine触ってるけどやっぱりよくわからない。  

あとOkHttp作ってるSquareってあのクレカ決済とかキャッシュレスの決済やってる会社？すごくね？