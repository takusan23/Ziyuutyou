// リンク集

<template>
  <v-card class="ma-2 pa-2" elevation="10">
    <v-card-title class="headline">なんかあればどうぞ</v-card-title>
    <!-- アドレス集 -->
    <v-list-item v-for="item in links" :key="item.title" :href="item.address" target="_blank">
      <v-list-item-icon>
        <v-icon v-text="item.icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-list-item-subtitle v-text="item.address"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    listItem: false,
    links: [
      {
        name: "Mastodon",
        icon: "mdi-mastodon",
        address: "https://best-friends.chat/@takusan_23"
      },
      {
        name: "GitHub",
        icon: "mdi-github",
        address: "https://github.com/takusan23"
      },
      {
        name: "このページのソースコード",
        icon: "mdi-git",
        address: "https://github.com/takusan23/Ziyuutyou"
      }
    ]
  }),
  head: () => ({
    title: "トップページ"
  })
};
</script>