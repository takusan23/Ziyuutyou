// このサイトの紹介的ななにか

<template>
  <v-card class="ma-2 pa-2" elevation="10">
    <v-card-title class="headline">備忘録をNuxtで作り直してみる。</v-card-title>
    <v-card-text>
      <p>JavaScript + Nuxt.js + processmd + Vuetify</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="secondary" href="https://takusan23.github.io/Bibouroku/" target="_blank">前のブログ</v-btn>
      <v-btn color="primary" nuxt to="/pages/about">進捗</v-btn>
      <v-btn color="primary" nuxt to="/posts/page/1">記事一覧</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>