// 記事本文

<template>
  <!-- ToolbarにかぶせるためにMarginを上に引っ張る？ -->
  <v-card elevation="10" class="pa-5" style="margin-top: -60px">
    <v-row>
      <!-- 投稿日 -->
      <v-col class="post-meta pa-1">
        <v-icon>mdi-file-upload-outline</v-icon>
        <time>{{ new Date(article.created_at).toLocaleDateString() }} 投稿</time>
      </v-col>
      <!-- 文字数。nuxt.config.js参照 -->
      <v-col class="post-meta pa-1">
        <p style="text-align: end">
          <v-icon>mdi-file-document-edit-outline</v-icon> (多分)
          {{ article.text_count }} 文字
        </p>
      </v-col>
    </v-row>
    <!-- タグ -->
    <TagGroup :tags="article.tags"></TagGroup>
    <!-- 区切り線 -->
    <v-divider></v-divider>
    <!-- 本文 -->
    <nuxt-content :document="article" />
    <div id="count"></div>
    <v-divider></v-divider>
    <!-- 共有 -->
    <v-card-actions class="ma-2">
      <v-row align="center">
        <HistoryButton :slug="article.slug"></HistoryButton>
        <v-spacer></v-spacer>
        <MastodonShare></MastodonShare>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import TagGroup from "@/components/TagGroup.vue";
import MastodonShare from "@/components/MastodonShare.vue";
import HistoryButton from "@/components/HistoryButton.vue";

export default Vue.extend({
  // データ取得
  async asyncData({ $content, params, query }) {
    const article = await $content(`posts/${params.slug}`).fetch();
    return { article };
  },
  // 使うコンポーネント
  components: {
    TagGroup,
    MastodonShare,
    HistoryButton,
  },
  data: () => ({}),
  // タイトル変更に使う
  head() {
    // エラーでちゃうからanyで。解決方法ある？
    const title = `${(this as any).article.title}`;
    const url = `https://takusan.negitoro.dev/posts/${(this as any).article.slug}/`;
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
