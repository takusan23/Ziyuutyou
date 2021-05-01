---
title: JetpackComposeのTextFieldをViewのEditTextに似せたい
created_at: 2021-05-02
tags:
- Android
- Kotlin
- JetpackCompose
---

どうもこんばんわ。これです。

```kotlin
/**
 * ViewのEditTextに似せたTextField
 * */
@Composable
fun TraditionalTextField(
    text: String,
    hint: String = "",
    onChangeText: (String) -> Unit,
) {
    TextField(
        value = text,
        placeholder = { Text(text = hint) }, // Labelじゃない
        onValueChange = { onChangeText(it) },
        colors = TextFieldDefaults.textFieldColors(
            backgroundColor = Color.Transparent,
        ),
    )
}
```

# 使用例

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val text = remember { mutableStateOf("") }
            TraditionalTextField(text = text.value, hint = "ヒント", onChangeText = { text.value = it })
        }
    }
}
```

<img src="https://imgur.com/9DyYLBv.png" width="500">

## 下のバーもいらない

```kotlin
@Composable
fun TraditionalTextField(
    text: String,
    hint: String = "",
    onChangeText: (String) -> Unit,
) {
    TextField(
        value = text,
        placeholder = { Text(text = hint) }, // Labelじゃない
        onValueChange = { onChangeText(it) },
        colors = TextFieldDefaults.textFieldColors(
            backgroundColor = Color.Transparent,
            focusedIndicatorColor = Color.Transparent,
            disabledIndicatorColor = Color.Transparent,
            errorIndicatorColor = Color.Transparent,
            unfocusedIndicatorColor = Color.Transparent,
        ),
    )
}
```

<img src="https://imgur.com/4pW8nwc.png" width="500">