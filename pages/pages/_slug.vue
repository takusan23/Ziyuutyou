<template>
  <v-app>
    <!-- ToolbarにかぶせるためにMarginを上に引っ張る？ -->
    <v-card elevation="10" class="pa-5" style="margin-top: -64px;">
      <!-- 本文 bodyHtml === this.bodyHtml だと -->
      <div id="content" v-html="bodyHtml"></div>
      <v-divider></v-divider>
      <!-- 日付 -->
      <div class="post-meta pa-2">
        <v-icon>mdi-file-upload-outline</v-icon>
        <time>{{ (new Date(this.created_at)).toLocaleDateString() }} 投稿</time>
      </div>
    </v-card>
  </v-app>
</template>
<script>
import { sourceFileArray } from "../../contents/pages/summary.json";
export default {
  // 記事があるかどうか。JSONのsourceFileArrayの配列に含まれているか確認している。
  validate({ params }) {
    return sourceFileArray.includes(
      `contents/pages/markdown/${params.slug}.md`
    );
  },
  // 各記事のJSONファイルを読み込んでる。
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`~/contents/pages/json/${params.slug}.json`),
      { params }
    );
  },
  // 無理やりdocument.getElementById()でToolbarの中身を書き換えている（もっといい方法あればどーぞ）
  mounted() {
    document.getElementById("title").innerText = this.title;
  },
  // さあ？
  head() {
    const title = `${this.title}`;
    const url = `pages/${this.params.slug}/`;
    return {
      title: title,
      meta: [
        { hid: "og:url", property: "og:url", content: url },
        { hid: "og:title", property: "og:title", content: title }
      ],
      link: [{ rel: "canonical", href: url }]
    };
  }
};
</script>