<template>
  <v-app>
    <!-- ToolbarにかぶせるためにMarginを上に引っ張る？ -->
    <v-card elevation="10" class="pa-5" style="margin-top: -64px;">
      <!-- 本文 -->
      <nuxt-content :document="article" />
      <v-divider></v-divider>
      <!-- 日付 -->
      <div class="post-meta pa-2">
        <v-icon>mdi-file-upload-outline</v-icon>
        <time>{{ (new Date(article.created_at)).toLocaleDateString() }} 投稿</time>
      </div>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  // データ取得
  async asyncData({ $content, params }) {
    const article = await $content(`pages/${params.slug}`).fetch();
    return { article };
  },
  // 使うコンポーネント
  components: {},
  // タイトル変更に使う
  head() {
    // エラーでちゃうからanyで。解決方法ある？
    const title = (this as any).article.title;
    const url = `https://takusan.negitoro.dev/posts/${(this as any).article.slug}`;
    return {
      title: title,
      meta: [
        { hid: "og:url", property: "og:url", content: url },
        { hid: "og:title", property: "og:title", content: title },
      ],
      link: [{ rel: "canonical", href: url }],
    };
  },
  // タイトルバー
  created() {
    this.$store.commit("setBarTitle", (this as any).article.title);
  },
});
</script>