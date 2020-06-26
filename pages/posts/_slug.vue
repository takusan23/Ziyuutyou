<template>
  <!-- ToolbarにかぶせるためにMarginを上に引っ張る？ -->
  <v-card elevation="10" class="pa-5" style="margin-top: -64px;">
    <div class="post-meta pa-2">
      <v-icon>mdi-file-upload-outline</v-icon>
      <time>{{ (new Date(this.created_at)).toLocaleDateString() }} 投稿</time>
    </div>
    <TagGroup :tags="this.tags"></TagGroup>
    <!-- 区切り線 -->
    <v-divider></v-divider>
    <!-- 本文 bodyHtml === this.bodyHtml だと -->
    <div id="content" v-html="$md.render(bodyContent)"></div>
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

<script>
import { sourceFileArray } from "../../contents/posts/summary.json";
import TagGroup from "../../components/TagGroup.vue";
import MastodonShare from "../../components/MastodonShare.vue";

export default {
  // 記事があるかどうか。JSONのsourceFileArrayの配列に含まれているか確認している。
  validate({ params }) {
    return sourceFileArray.includes(
      `contents/posts/markdown/${params.slug}.md`
    );
  },
  // 各記事のJSONファイルを読み込んでる。
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`~/contents/posts/json/${params.slug}.json`),
      { params }
    );
  },
  // 無理やりdocument.getElementById()でToolbarの中身を書き換えている（もっといい方法あればどーぞ）
  mounted() {
    document.getElementById("title").innerText = this.title;
    // document.getElementById("count").innerText = `文字数（だいたい）：${
    //   document.getElementById("content").innerText.length
    // }`;
  },
  // タイトル変更に使う
  head() {
    const title = `${this.title}`;
    const url = `posts/${this.params.slug}/`;
    return {
      title: title,
      meta: [
        { hid: "og:url", property: "og:url", content: url },
        { hid: "og:title", property: "og:title", content: title }
      ],
      link: [{ rel: "canonical", href: url }]
    };
  },
  data: () => ({
    instans: ["best-friends.chat", "pawoo.net"] // 共有先インスタンス名
  }),
  methods: {
    /**
     *  共有画面出す
     * @param name インスタンス名。
     */
    shareDon: function(name) {
      open(
        `https://${name}/share?text=${this.title}\n${location.href}`,
        "_brank"
      );
    }
  },
  components: {
    TagGroup,
    MastodonShare
  }
};
</script>