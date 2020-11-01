---
title: JitPackでAndroidライブラリを公開する
created_at: 2020-11-01
tags:
- Android
- JitPack
- GitHub
---

自分用メモ

# ライブラリ作成
## 適当なプロジェクトを作成します。
ここで作成したプロジェクトはExample的な役割をする。

## ライブラリを作成
上の`File`を押して、`New`を押して、`New Module...`を選択して、  
`Android Library`を選択して、ライブラリ名をつけます。

![Imgur](https://imgur.com/tQF3cW2.png)

## 最初に作ったプロジェクトでライブラリを参照できるようにする
`app`フォルダにある`build.gradle`(`app/build.gradle`)を開き、`dependencies { }`に書き足します。

```gradle
dependencies {
    // 作ったライブラリ
    implementation project(':ライブラリ名')
}
```

ライブラリ名が、`SearchPreferenceFragment`だった場合は、

```gradle
dependencies {
    // 作ったライブラリ
    implementation project(':SearchPreferenceFragment')
}
```

となります。

# JitPackで公開する流れ
## build.gradleに書き足す
ここで言ってる`build.gradle`は、appフォルダでもない、ライブラリ名のついたフォルダでもない、`build.gradle`のことです。  
開いてみて、以下と明らかに中身が違う場合は開くの間違ってます。
```gradle
buildscript {
    ext.kotlin_version = "1.4.10"
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:4.1.0"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        // JitPack公開で使う
        classpath 'com.github.dcendents:android-maven-gradle-plugin:2.1' // Add this line
    }
}
```
開けたら、上のように`dependencies{ }`の中に書き足します。

```gradle
// JitPack公開で使う
classpath 'com.github.dcendents:android-maven-gradle-plugin:2.1' // Add this line
```

今度は、`ライブラリ名/build.gradle`（ライブラリ名のフォルダに有るbuild.gradle）を開いて、上の部分を書き換えます。

```gradle
plugins {
    id 'com.android.library'
    id 'kotlin-android'
    id 'kotlin-android-extensions'
    // JitPackで必要
    id 'com.github.dcendents.android-maven'
}

// これもJitPackで使う
group = 'com.github.takusan23'
```

`takusan23`の部分は各自違うと思う。

あとなんかいつの間にか、`apply plugin`が、`plugins`に変わっててよくわからなくなったけど、多分`id なんとか`みたいな感じで足していけばいいと思う。

# 他の人に使ってもらう
## build.gradle
appフォルダでもない、ライブラリ名のついたフォルダでもない、`build.gradle`を開いて、以下のように書き足します

```gradle
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://jitpack.io' }
    }
}
```

## app/build.gradle
を開き、`dependencies{ }`に書き足します。

```gradle
dependencies {
    // 検索できるPreference
    implementation 'com.github.takusan23:SearchPreferenceFragment:1.0.0'
}
```

以上です。