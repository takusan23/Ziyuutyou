// わたし

// 一番上に表示する名前のやつ
<template>
  <div align="center" class="profile">
    <img class="icon" src="@/static/icon.png" />
    <h2>{{ displayName }} / {{ name }}</h2>
    <!-- ブログ遷移ボタン -->
    <v-btn class="ma-2" color="primary" nuxt to="/posts/page/1/">
      <v-icon>{{ blogButtonIcon }}</v-icon>
      <span>{{ blogButtonText }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    text:
      "KotlinでAndroidアプリを作っていたりする。AndroidとMinecraftとボカロが好き。",
    displayName: "たくさん",
    name: "takusan_23",
    blogButtonText: "ブログ / 記事一覧へ",
    blogButtonIcon: "mdi-book-edit-outline",
  }),
};
</script>

<style scoped>
.icon {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.profile {
  padding: 10px;
}
</style>