// 次のページのやつ。

<template>
  <v-app>
    <v-card
      class="ma-2 pa-5"
      v-for="item in blogItems"
      :key="item.title"
      :to="`../${item.fileName}`"
    >
      <div class="headline mb-1 titleHover">{{item.title}}</div>
      <v-divider></v-divider>
      <div class="post-meta pa-2">
        <v-icon>mdi-file-upload-outline</v-icon>
        <time>{{ (new Date(item.created_at)).toLocaleDateString() }} 投稿</time>
      </div>
      <v-chip
        class="ma-1"
        small
        color="indigo"
        text-color="white"
        v-for="tag in item.tags"
        :key="tag"
      >{{tag}}</v-chip>
    </v-card>

    <v-row align="center" justify="center">
      <v-btn
        id="next_btn"
        nuxt
        color="primary"
        :to="backTo"
        v-if="backButtonVisible"
        class="ma-2"
      >前のページ</v-btn>
      <v-btn id="next_btn" nuxt color="secondary" outlined class="ma-2">{{currentPage}}</v-btn>
      <v-btn
        id="next_btn"
        nuxt
        color="primary"
        :to="nextTo"
        v-if="nextButtonVisible"
        class="ma-2"
      >次のページ</v-btn>
    </v-row>
  </v-app>
</template>

<script>
import { sourceFileArray, fileMap } from "../../../contents/posts/summary.json";

// 一度に表示する記事の数
const PAGE_LIMIT = 10;

export default {
  data: () => {
    return {
      blogItems: [],
      nextButtonVisible: false,
      nextTo: "2",
      backButtonVisible: false,
      backTo: "1",
      currentPage: "1"
    };
  },
  created() {
    // ページ数　最初のページは /posts/page/1 1~10まで
    const pageId = parseInt(this.$route.params.id);
    this.currentPage = pageId;
    // なんかしらんけど並び順が新しい順とは限らないらしい？
    const sortedKeyList = Object.keys(fileMap);
    sortedKeyList.sort(function(a, b) {
      const aDate = new Date(fileMap[a].created_at).getTime();
      const bDate = new Date(fileMap[b].created_at).getTime();
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    });
    // 範囲内の記事を取り出す
    const pageList = sortedKeyList.slice(
      (pageId - 1) * PAGE_LIMIT,
      pageId * PAGE_LIMIT
    );
    // キーを取り出す
    pageList.forEach(title => {
      // 記事一個ずつ取る
      const blog = fileMap[title];
      // 名前
      const name = blog.sourceBase.replace(".md", "");
      blog.fileName = name;
      // 配列に追加
      this.blogItems.push(blog);
    });
    // 表示済みブログ件数。
    const showedBlogCount = pageId * PAGE_LIMIT; // 3ページ目だったら30件表示されてることに
    // 「次のページ」ボタンを付けるかどうか。一覧より記事数のほうが多くて、今表示してる記事が一個以上有るとき表示する。
    if (pageId * 10 < sourceFileArray.length) {
      this.nextTo = `${pageId + 1}`;
      this.nextButtonVisible = true;
    }
    // 1ページ以外の場合は戻るボタンおく
    if (pageId > 1) {
      this.backTo = `${pageId - 1}`;
      this.backButtonVisible = true;
    }
  },
  mounted() {
    // ToolBarのテキスト変えとく
    document.getElementById("title").innerText = `記事一覧`;
  },
  methods: {
    //
  }
};
</script>
