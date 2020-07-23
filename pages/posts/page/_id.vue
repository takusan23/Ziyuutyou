// 記事一覧ページ

<template>
  <v-app>
    <!-- 記事表示 -->
    <BlogItemCard :blogItems="blogItems"></BlogItemCard>
    <!-- 次のページ・前のページ -->
    <v-row align="center" justify="center">
      <v-btn
        id="next_btn"
        nuxt
        color="primary"
        :to="`/posts/page/${backTo}`"
        v-if="backButtonVisible"
        class="ma-2"
      >前のページ</v-btn>
      <v-btn id="next_btn" nuxt color="secondary" outlined class="ma-2">{{currentPage}}</v-btn>
      <v-btn
        id="next_btn"
        nuxt
        color="primary"
        :to="`/posts/page/${nextTo}`"
        v-if="nextButtonVisible"
        class="ma-2"
      >次のページ</v-btn>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BlogItemCard from "@/components/BlogItemCard.vue";

export default Vue.extend({
  name: "bloglist",
  // 記事一覧を取り出す
  async asyncData({ $content, params }) {
    const blogItems = await $content(`posts`)
      .sortBy("created_at", "desc") // 投稿日時順に並び替える
      .skip((parseInt(params.id) - 1) * 10) // 指定した分飛ばす。今回は表示ページから１引いて１０掛けた答え分飛ばす。（例:2ページ目の場合は(2-1)*10 = 10記事飛ばす）
      .limit(10) // 10記事取得する
      .fetch();
    return { blogItems };
  },
  data() {
    return {
      blogItems: [],
      nextButtonVisible: false,
      nextTo: "2",
      backButtonVisible: false,
      backTo: "1",
      currentPage: String(this.$route.params.id),
    };
  },
  created() {
    // 次のページ行けるか。まあ面倒くさいので10件取れてたら表示するようにする
    this.nextButtonVisible = this.blogItems.length == 10;
    this.nextTo = String(parseInt(this.currentPage) + 1); // 現在のページ+1
    // 前のページ行けるか。まあ面倒くさいので1ページ目以外なら表示するようにする
    this.backButtonVisible = parseInt(this.currentPage) > 1;
    this.backTo = String(parseInt(this.currentPage) - 1); // 現在のページ-1
    // Vuexてやつでバーのタイトルを変更している。
    this.$store.commit("setBarTitle", "記事一覧");
  },
  components: {
    BlogItemCard,
  },
  head: () => ({
    title: "記事一覧",
  }),
});
</script>
