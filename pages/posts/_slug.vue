// 記事本文

<template>
  <!-- ToolbarにかぶせるためにMarginを上に引っ張る？ -->
  <v-card elevation="10" class="pa-5" style="margin-top: -60px">
    <div class="post-meta pa-2">
      <v-icon>mdi-file-upload-outline</v-icon>
      <time>{{ new Date(article.created_at).toLocaleDateString() }} 投稿</time>
    </div>
    <TagGroup :tags="article.tags"></TagGroup>
    <!-- 区切り線 -->
    <v-divider></v-divider>
    <!-- 本文 -->
    <nuxt-content :document="article" />
    <div id="count"></div>
    <v-divider></v-divider>
    <!-- 共有 -->
    <v-card-actions>
      <v-row align="center" justify="end">
        <MastodonShare></MastodonShare>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import TagGroup from "@/components/TagGroup.vue";
import MastodonShare from "@/components/MastodonShare.vue";

export default Vue.extend({
  // データ取得
  async asyncData({ $content, params }) {
    const article = await $content(`posts/${params.slug}`).fetch();
    return { article };
  },
  // 使うコンポーネント
  components: {
    TagGroup,
    MastodonShare,
  },
  data: () => ({}),
  // タイトル変更に使う
  head() {
    // エラーでちゃうからanyで。解決方法ある？
    const title = `${(this as any).article.title}`;
    const url = `posts/${(this as any).article.slug}/`;
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
  mounted() {
    // Array.from(document.getElementsByTagName("pre")).forEach((pre) => {
    //   pre.addEventListener("click", () => {
    //     // コード押した時
    //     // 見えないTextAreaを作成する
    //     const goneTextArea = document.createElement("textarea");
    //     goneTextArea.value = pre.textContent ?? "";
    //     document.body.appendChild(goneTextArea);
    //     goneTextArea.select();
    //     document.execCommand("copy");
    //     document.body.removeChild(goneTextArea);
    //     // コピーしたSnackBarを出す
    //     this.snackbar = true;
    //   });
    // });
  },
});
</script>