---
title: AndroidのRoomを触ってみた
created_at: 2020-05-27 00:17:21
tags:
- Android
- Room
- Kotlin
- データベース
---
どうもこんばんわ。眠いです。  
冬休みの宿題では保健の課題が出ましたが、休校期間の宿題ではお昼ごはんを作る宿題が出ました。  

# ほんだい
AndroidのRoomってのを触ってみたい。SQLiteよりRoomを使うことを**Googleが強く推奨**してるのでそのうちやるんだしやるかって感じで。  

# Room #とは
データベース。多分SQLiteを使いやすくした物だと思う。  
それで`抽象化レイヤ`ってなに？

# SQLite vs Room
| できること         | SQLite                     | Room                                                |
|--------------------|----------------------------|-----------------------------------------------------|
| クエリ             | アプリ実行時まで分からない | コンパイル時（それ以前にIDEが）間違いを教えてくれる |
| UIスレッドでの実行 | できる                     | できない                                            |

あとは各自調べてみて。既存のデータベースをRoomにも移行できるらしい？（要検証）

# 環境
| なまえ  | あたい                    |
|---------|---------------------------|
| 端末    | Pixel 3 XL / Nexus 7 2013 |
| Android | 11 DP 4 / 10 Root権限あり |
| 言語    | Kotlin                    |

今回は生成後にデータベースのファイルを見てみたいのでRootedな端末を用意しました（んなことよりNexus 7の後継出せよ）

# ライブラリ入れます
#SQLite vs Room の項目で**RoomはUIスレッドでは使えない**仕様なため、Roomと一緒にコルーチンも入れます。
```gradle
apply plugin: 'kotlin-kapt' // 一番上に
// 省略
dependencies {
// Room
def room_version = "2.2.5"
implementation "androidx.room:room-runtime:$room_version"
implementation "androidx.room:room-ktx:$room_version"
kapt "androidx.room:room-compiler:$room_version"
// Coroutines
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.4"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.4"
// 省略
}
```

# データベースつくる
習うより慣れろで記事を書いてるので用語がわかりません。  
Roomなデータベースを作るには3つのコンポーネントで構成されてるそうです。

- RoomDatabase
    - データベースにアクセスする時に使う
- Entity
    - データベースのテーブルです？
    - 主キーとか名前とか保存したい値はここで定義します。
    - SQLite時代では`create table ~`の部分。
    - **データクラスです**
- Dao
    - データベースから値を取り出す時に使う。
    - クエリとかはここに書く
    - 追加とか削除とかは特にクエリ書かなくても（私もわからん）できる
    - クエリは実行前に間違いを教えてくれる

## Entity
保存する値を定義します。Excelだと一番上の横の行ですね。  
特に思いつかなかったのでメモでも保存してみますか

```kotlin
@Entity
data class TestDBEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0, // 主キー
    @ColumnInfo(name = "memo") val memo: String
)
```

### @PrimaryKeyと@ColumnInfoについて
@Entityはおまじないです（テーブルですよって目印）  
`@PrimaryKey`は主キーの設定の時に指定します。主キーが何なのかあんまよく分かってませんが多分消す時に便利です（他とは被らない）。
後ろの`autoGenerate = true`は主キーを自動で生成しますよってことだと思います。
`@ColumnInfo(name = "memo")`ってのはデータベースの中ではnameに指定した値（今回は`memo`ですが、多分スネークケースで書く）を使うけど、  
プログラムから扱う時はデータクラスの変数名で書けるよってことだと思います。

## Dao
ここではデータベースにアクセスする時に使う関数たちを書いていきます。  
SQLite時代の`query()`みたいな役割です（それにしてもquery()の引数の後半null何個書くんだよって毎回思いますね）。

```kotlin
@Dao
interface TestDBDao {
    /** 全データ取得 */
    @Query("SELECT * FROM TestDBEntity")
    fun getAll(): List<TestDBEntity>
    
    /** データ更新 */
    @Update
    fun update(testDBEntity: TestDBEntity)

    /** データ追加 */
    @Insert
    fun insert(testDBEntity: TestDBEntity)

    /** データ削除 */
    @Delete
    fun delete(testDBEntity: TestDBEntity)
}
```

`getAll()`のクエリ、ちゃんとFROMの`TestDBEntity`、ちゃんと補充されたのすごい  
基本的なもの（@Insertとか）は最初からあるようです。  
複雑なものはクエリを書けばできます。

## データベース
説明が難しいからなしで

```kotlin
@Database(entities = [TestDBEntity::class], version = 1)
abstract class TestDB : RoomDatabase() {
    abstract fun testDao(): TestDBDao
}
```

これで用意ができました。

# Activityからデータベースにアクセスする

## activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:inputType="textPersonName"
        android:hint="メモ入れてね"
        android:text="" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <Button
            android:id="@+id/add_button"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="追加" />

        <Button
            android:id="@+id/load_button"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="読み込み" />
    </LinearLayout>

    <TextView
        android:id="@+id/memo_textview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</LinearLayout>
```

## MainActivity.kt

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 読み込み
        loadDB()

        // 読み込みボタン押したら読み込む
        load_button.setOnClickListener {
            loadDB()
        }

        // 書き込む
        add_button.setOnClickListener {
            writeDB()
        }

    }

    /** データクラスに追加する */
    private fun writeDB() {
        val text = editText.text.toString()
        GlobalScope.launch {
            // データベース用意。「TestDB」は実際に作られるデータベースのファイルの名前
            val database =
                Room.databaseBuilder(this@MainActivity, TestDB::class.java, "TestDB").build()
            val dao = database.testDao()
            // 書き込むデータクラス作る
            val data = TestDBEntity(memo = text)
            // 書き込む
            dao.insert(data)
        }
    }

    /** データベースから読み込む */
    private fun loadDB() {
        GlobalScope.launch(Dispatchers.Main) {
            // まっさらに
            memo_textview.text = ""
            // UIスレッドでは実行できないためコルーチン
            val list = withContext(Dispatchers.IO) {
                // データベース用意
                val database =
                    Room.databaseBuilder(this@MainActivity, TestDB::class.java, "TestDB").build()
                val dao = database.testDao()
                dao.getAll()
            }
            // TextViewに表示
            list.forEach {
                memo_textview.append("${it.memo}\n")
            }
        }
    }
}
```

起動して→メモを入力して→追加を押す→読み込み押す  
と下に入力した内容が表示されているはずです。やったね８８８８８８

{%asset_img add.png add%}

SQLite時代の追加と比べて分かりやすくなってることがわかりますね～
```kotlin
val contentValues = ContentValues()
contentValues.put("memo", "めもだよー")
sqLiteDatabase.insert("table_name", null, contentValues)
```

# 少し凝ったことをやる
削除に関する関数を書き足してみる。  
というわけで`TestDBDao.kt`に書き足します。

```kotlin
/** 指定したidのデータを消す */
@Query("DELETE FROM TestDBEntity WHERE id = :id")
fun deleteById(id: Int)

/** 指定したメモのデータを消す */
@Query("DELETE FROM TestDBEntity WHERE memo = :memo")
fun deleteByMemo(memo:String)
```

SQLite時代ではこんな感じに書いてましたね

```kotlin
delete("table_name", "memo=?", arrayOf(memo))
```

これはidが引数と同じ時に消すというクエリです（多分）  

あとは消すボタンをActivityに置いて

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="メモ入れてね"
        android:inputType="textPersonName"
        android:text="" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <Button
            android:id="@+id/add_button"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="追加" />

        <Button
            android:id="@+id/load_button"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="読み込み" />

        <Button
            android:id="@+id/delete_button"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="削除" />
    </LinearLayout>

    <TextView
        android:id="@+id/memo_textview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</LinearLayout>
```

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 読み込み
        loadDB()

        // 読み込みボタン押したら読み込む
        load_button.setOnClickListener {
            loadDB()
        }

        // 書き込む
        add_button.setOnClickListener {
            writeDB()
        }

        // 削除する
        delete_button.setOnClickListener {
            deleteDB()
        }

    }

    private fun deleteDB() {
        val text = editText.text.toString()
        GlobalScope.launch {
            // データベース用意。「TestDB」は実際に作られるデータベースのファイルの名前
            val database =
                Room.databaseBuilder(this@MainActivity, TestDB::class.java, "TestDB").build()
            val dao = database.testDao()
            // 削除する
            dao.deleteByMemo(text)
        }
    }

    /** データクラスに追加する */
    private fun writeDB() {
        val text = editText.text.toString()
        GlobalScope.launch {
            // データベース用意。「TestDB」は実際に作られるデータベースのファイルの名前
            val database =
                Room.databaseBuilder(this@MainActivity, TestDB::class.java, "TestDB").build()
            val dao = database.testDao()
            // 書き込むデータクラス作る
            val data = TestDBEntity(memo = text)
            // 書き込む
            dao.insert(data)
        }
    }

    /** データベースから読み込む */
    private fun loadDB() {
        GlobalScope.launch(Dispatchers.Main) {
            // まっさらに
            memo_textview.text = ""
            // UIスレッドでは実行できないためコルーチン
            val list = withContext(Dispatchers.IO) {
                // データベース用意
                val database =
                    Room.databaseBuilder(this@MainActivity, TestDB::class.java, "TestDB").build()
                val dao = database.testDao()
                dao.getAll()
            }
            // TextViewに表示
            list.forEach {
                memo_textview.append("id=${it.id} | memo=${it.memo}\n")
            }
        }
    }
}
```

これですでにあるメモの内容を入れたら削除できる機能が追加されました。

{%asset_img delete.png delete%}

# Root取得済み環境でデータベースを覗く
最近はAndroidのRoot化の話題あんま聞かないですね（XperiaはZ4から国内版はまじで取れなくなったし。）  
それどころか最近のdocomo版XperiaはFlashTool使ってもdocomo版のROMしか焼けないようになったそうです。  

それはそうとして、データベースのファイルはRoot権限が必要な領域（`/data/data/${packageName}/databases/TestDB`）に有るのでRoot権限あるかAndroid StudioのDevice Explolerで見る（開発中アプリなら見れる）しか無いと思います多分。  

今回はデータベースが見れるアプリ（Root権限必須）を利用して作成したデータベースを覗いてみます。  

https://play.google.com/store/apps/details?id=com.tomminosoftware.sqliteeditor&hl=ja

{%asset_img root.png root%}

# おわりに
もっと早くからRoom使ってればよかった感。便利。  
ソースコード→ https://github.com/takusan23/AndroidRoomSample

Android Beamが４んだせいでNexus7から写真送るの大変だった（）