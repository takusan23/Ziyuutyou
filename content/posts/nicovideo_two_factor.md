---
title: ニコ動の二段階認証に対応させた話
created_at: 2020-09-13
tags:
- ニコ動
- Kotlin
- OkHttp
---

https://github.com/takusan23/TatimiDroid/issues/2

の話です。

# 本題
ニコ動へ**二段階認証が設定されている状態で**プログラムからログインしようって話です。  

### どうでもいい

そういえばドコモ口座が熱いですね（テレビで放送される二、三日前からちょっと話題になってたけどね）  
ちなみにあれdocomoユーザーじゃないからノーダメって話ではないです。  

紐付けに **二段階認証が必須 もしくは そもそも連携してない** 銀行以外に口座を持っている人全てが対象になる一大事です。  

# 環境
| なまえ                                | あたい               |
|---------------------------------------|----------------------|
| OS                                    | Windows 10 Pro       |
| 使うソフト（APIを叩ければ何でもいい） | Advanced REST client |

# ログインするまで

`User-Agent`は入れましょうね。  
アクセスする際のCookieには`mfa_token`と`nicosid`が必要の模様です。(ログインAPI以外)  
リダイレクトは無効にしましょう。

**メールで認証コードを受け取る**方法と**スマホのアプリ(Google Authenticator)** の方法がありますが、おそらく同じ処理（プログラム）が使えます。

**なので！おすすめはスマホのアプリの方です（メール認証数秒かかるし）** (スマホなくしたら詰むけど)

## 1 普通にログインする（ログインAPIを叩く）
- https://account.nicovideo.jp/login/redirector
- POST
    - Content-Type : application/x-www-form-urlencoded
    - mail_tel={メアド}&password={パスワード}
- 成功するとステータスコードが302

![Imgur](https://imgur.com/QLNGU3i.png)

## 2 ログインAPIのレスポンスヘッダーから以下の内容を控える
- `Set-Cookie`
    - `mfa_session=`と`nicosid=`の値
    - `mfa_session=------------;nicosid=-----.-----`みたいな感じで文字列連結させて（区切りは`;`）控える
    - （実際はちゃんと英数字が入ってるけど今回は伏せてる）
- `Location`
    - 二段階認証のWebページURLが入ってる
    - https://account.nicovideo.jp/mfa?continue
        - こんな感じのURLだと思う
- 二段階認証が未設定の場合との分岐は、Set-Cookieにユーザーセッションがあるかどうか？


## 3 LocationのURLへアクセスする（こんなの：https://account.nicovideo.jp/mfa?continue）
- GET
- `Cookie`の指定が必須
    - **2 ログインAPIのレスポンスから以下の内容を控える**で控えたCookieを詰める
    - `mfa_session=------------;nicosid=-----.-----`みたいな
- 成功するとステータスコードが200
    - HTMLが返ってくる
    
## 4 スクレイピング
- HTML内（レスポンスボディ）に`<form>`要素が一個だけあるのでその要素の`action`属性の値を取ります。
    - こんな感じの：`<form action="/mfa?site=なんとか`
    - `/mfa?site=`が始まる値を取れれば成功
    - 先頭に`https://account.nicovideo.jp`をつけて、`https://account.nicovideo.jp/mfa?site=`の形にしてURLを完成させます。

画像だとここらへん  
![Imgur](https://imgur.com/XOGHvxb.png)

## 5 二段階認証のコード
- メールの場合は
    - メールが来てるはずなので受信トレイを見に行ってください。
- Google Authenticator
    - アプリを開いてコードを確認する

## 6 二段階認証をする
- URLは先ほど作成した、`https://account.nicovideo.jp/mfa?site=なんとか`
- POST
    - Content-Type : application/x-www-form-urlencoded
        - `otp={メールに書いてあった認証コード}&loginBtn=ログイン&device_name={デバイス名とかアプリ名}`
        - デバイスを信頼させる場合は`&is_mfa_trusted_device=true`を追加でくっつける
            - これするとレスポンスヘッダーの`Set-Cookie`に、`mfa_trusted_device_token`が入ってくる。
            - 二回目以降はログインAPIを叩く際に、この値をくっつけてPOSTすればパスできる？（要検証）
            - ということは、信頼してもCookieを消したら意味がない？
- Cookie
    - **2 ログインAPIのレスポンスから以下の内容を控える**で控えたCookieを詰める
    - `mfa_session=------------;nicosid=-----.-----`みたいな
- 成功するとステータスコードが302

![Imgur](https://imgur.com/I42Q9FO.png)

## 7 二段階認証のレスポンス
- レスポンスヘッダーの`Location`の値を取得
    - このURLへアクセスするとユーザーセッションを取得する事ができる

## 8 ユーザーセッション取得（これでAPI叩くの最後）
- 二段階認証のレスポンスヘッダーの`Location`の値へアクセス
- GET
- Cookie
    - **2 ログインAPIのレスポンスから以下の内容を控える**で控えたCookieを詰める
    - `mfa_session=------------;nicosid=-----.-----`みたいな

## 9 レスポンスヘッダーを確認
- `Set-Cookie`の中に`user_session`が入ってるはずです。
- お疲れさまでした！
- 成功すると、ステータスコードは302になります

![Imgur](https://imgur.com/UUyAIYZ.png)

Cookieに`mfa_session`と`nicosid`を入れるのが必要みたいですね。  
~~nicosid入れないといけないことに気付くのが長かった~~

# Android + OkHttp + Kotlin Coroutine + Jsoup を使った実装例

今回はAndroidで行きます。インターネットパーミッションを忘れずに。

## build.gradle

```gradle
// HTML Parser
implementation 'org.jsoup:jsoup:1.12.1'
// Coroutines
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.4"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.4" // バージョン合わせないとだめなんか？
implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.3.0-alpha06"
// OkHttp
implementation("com.squareup.okhttp3:okhttp:4.7.2")
```

## レイアウト

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/login_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:text="ログイン" />

    <EditText
        android:id="@+id/one_time_password_edittext"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:ems="10"
        android:hint="ワンタイムパスワード"
        android:inputType="textPersonName" />

    <Button
        android:id="@+id/two_factor_login"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:text="二段階認証開始" />

</LinearLayout>
```

## MainActivity

```kotlin
class MainActivity : AppCompatActivity() {

    private val okHttpClient = OkHttpClient().newBuilder().apply {
        // リダイレクトを禁止する
        followRedirects(false)
        followSslRedirects(false)
    }.build()

    /** 二段階認証APIのURL */
    private var twoFactorAPIURL = ""

    /**
     * ログインで何回かAPIを叩くけど、その際に共通で指定するCookie。
     * mfa_session と nicosid が必要
     * */
    var loginCookie = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        login_button.setOnClickListener {
            lifecycleScope.launch {
                val response = postLogin("めあど", "ぱすわーど")
                // ユーザーセッションがあれば二段階認証ではない
                if (response.headers.find { pair -> pair.second.contains("user_session=user_session") } != null) {
                    println("二段階認証では有りません")
                    println("ユーザーセッション：${parseUserSession(response)}")
                } else {
                    twoFactorAPIURL = getTwoFactorAPIURL(response.headers["Location"]!!)
                }
            }
        }

        two_factor_login.setOnClickListener {
            // ワンタイムパスワードの値取得
            val otp = one_time_password_edittext.text.toString()
            lifecycleScope.launch {
                val location = postOneTimePassword(twoFactorAPIURL, otp) ?: return@launch
                val userSession = getUserSession(location)
                println("おわり。ユーザーセッション：$userSession")
            }
        }

    }

    /**
     * niconicoへログインする関数
     * */
    private suspend fun postLogin(mail: String, pass: String) = withContext(Dispatchers.Default) {
        val url =
            "https://account.nicovideo.jp/login/redirector"
        val postData = "mail_tel=$mail&password=$pass"
        val request = Request.Builder().apply {
            url(url)
            addHeader("User-Agent", "TatimiDroid;@takusan_23")
            post(postData.toRequestBody("application/x-www-form-urlencoded".toMediaTypeOrNull())) // 送信するデータ。
        }.build()
        println("ログイン開始：$url")
        val response = okHttpClient.newCall(request).execute()
        // Set-Cookieを解析
        var mfaSession = ""
        var nicosid = ""
        response.headers.forEach {
            // Set-Cookie に入ってる mfa_session と nicosid を控える
            if (it.first == "Set-Cookie") {
                if (it.second.contains("mfa_session")) {
                    mfaSession = it.second.split(";")[0]
                }
                if (it.second.contains("nicosid")) {
                    nicosid = it.second.split(";")[0]
                }
            }
        }
        // これからの通信で使うCookieを作成
        loginCookie = "$mfaSession;$nicosid"
        response
    }

    /**
     * 二段階認証のWebページへアクセスして、認証コードを送るAPIのURLを取り出す
     * @param location ログインAPIのレスポンスヘッダーのLocation
     * @return 二段階認証APIのURL
     * */
    private suspend fun getTwoFactorAPIURL(location: String) = withContext(Dispatchers.Default) {
        println("二段階認証APIのURL取得API：$location")
        val request = Request.Builder().apply {
            url(location)
            addHeader("User-Agent", "TatimiDroid;@takusan_23")
            addHeader("Cookie", loginCookie)
            get()
        }.build()
        val response = okHttpClient.newCall(request).execute()
        println("二段階認証APIのURL取得API ステータスコード：${response.code}")
        val responseString = response.body?.string()
        // HTML内からURLを探す
        val document = Jsoup.parse(responseString)
        val path = document.getElementsByTag("form")[0].attr("action")
        // 二段階認証をするAPIのURLを返す
        "https://account.nicovideo.jp$path"
    }

    /**
     * ワンタイムパスワードを入れて二段階認証を完了させる関数
     * @param otp メールで送られてくる認証コード
     * @param twoFactorAPIURL [getTwoFactorAPIURL]の戻り値
     * @return 最後に叩くAPIのURL。叩くと、ユーザーセッションが手に入る。
     * */
    private suspend fun postOneTimePassword(twoFactorAPIURL: String, otp: String) = withContext(Dispatchers.Default) {
        println("二段階認証API叩く：$twoFactorAPIURL")
        val formData = FormBody.Builder().apply {
            add("otp", otp) // メールで送られてきた認証コード
            add("loginBtn", "ログイン")
            add("device_name", "Android") // デバイス名
        }.build()
        val request = Request.Builder().apply {
            url(twoFactorAPIURL)
            addHeader("User-Agent", "TatimiDroid;@takusan_23")
            addHeader("Cookie", loginCookie)
            post(formData)
        }.build()
        val response = okHttpClient.newCall(request).execute()
        println("二段階認証API ステータスコード：${response.code}")
        response.headers["Location"]
    }

    /**
     * 最後。ユーザーセッションを取得する
     * @param location [postOneTimePassword]の戻り値
     * @return ユーザーセッション
     * */
    private suspend fun getUserSession(location: String) = withContext(Dispatchers.Default) {
        val url = location // URLを完成させる
        println("ユーザーセッション取得：$url")
        val request = Request.Builder().apply {
            url(url)
            addHeader("User-Agent", "TatimiDroid;@takusan_23")
            addHeader("Cookie", loginCookie)
            get()
        }.build()
        val response = okHttpClient.newCall(request).execute()
        println("ユーザーセッション取得 ステータスコード：${response.code}")
        parseUserSession(response)
    }

    /**
     * レスポンスヘッダーからユーザーセッションを取り出す
     * */
    private fun parseUserSession(response: Response): String {
        return response.headers.filter { pair -> pair.second.contains("user_session") }[1].second.split(";")[0]
    }

}
```

わかりにくいなこれ。あと二段階認証が未設定のときもログインできるかどうかは怪しい。

`めあど、ぱすわーど`のところは各自書き換えてね。

一応ソースコード置いとくわ  

https://github.com/takusan23/NicoTwoFactorLoginSample

# 要検証


# おわりに
途中から`たちみどろいど`の方やりだしちゃったから書く気なくしたので雑です。  

なんかしらんけど、使うAPIテストツールによって、Set-Cookieが足りなかったりするんだけどなんなん？  
(nicosidが無い時があった。ない場合はしゃーないから無いままログインを完了させればいいっぽい？)