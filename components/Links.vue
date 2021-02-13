りんく集

<template>
  <div align="center" class="links">
    <h1 class="link_title">リンク</h1>
    <v-chip outlined class="ma-2 pa-2" v-for="link in links" v-bind:key="link.name">
      <v-icon>{{ link.icon }}</v-icon>
      <a :href="link.address" rel="">{{ link.name }}</a>
    </v-chip>
  </div>
</template>

<style scoped>
.links {
  padding: 20px;
}
.link_title {
  padding: 5px;
}
.link_tag {
  margin-right: 5px;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    links: [
      {
        name: "Twitter",
        icon: "mdi-twitter",
        address: "https://twitter.com/takusan__23",
      },
      {
        name: "Misskey",
        icon: "mdi-lan-connect",
        address: "https://misskey.m544.net/@takusan_23",
      },
      {
        name: "Mastodon",
        icon: "mdi-mastodon",
        address: "https://best-friends.chat/@takusan_23",
      },
      {
        name: "GitHub",
        icon: "mdi-github",
        address: "https://github.com/takusan23",
      },
      {
        name: "このページのソースコード",
        icon: "mdi-git",
        address: "https://github.com/takusan23/Ziyuutyou",
      },
    ],
  }),
});
</script>