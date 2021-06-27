<template>
  <!-- GitHubのコミット履歴を開くボタン。slug=""で記事のファイル名を渡してあげて -->
  <v-btn
    color="primary"
    text
    target="_blank"
    :href="`https://github.com/takusan23/Ziyuutyou/commits/master/content/posts/${slug}.md`"
  >
    <v-icon>mdi-history</v-icon>記事の変更履歴を開く(GitHubへ飛びます)
  </v-btn>
</template>

<script>
export default {
  props: ["slug"],
  data: () => ({}),
  methods: {},
};
</script>
