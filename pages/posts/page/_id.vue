// 次のページのやつ。

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

<script>
// import { sourceFileArray, fileMap } from "../../../contents/posts/summary.json";
import BlogItemCard from "../../../components/BlogItemCard.vue";

// 一度に表示する記事の数
const PAGE_LIMIT = 10;

export default {
  // 記事一覧のJSON
  asyncData({ params }) {
    return Object.assign({}, require("../../../contents/posts/summary.json"), {
      params
    });
  },
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
    const sortedKeyList = Object.keys(this.fileMap);
    sortedKeyList.sort((a, b) => {
      const aDate = new Date(this.fileMap[a].created_at).getTime();
      const bDate = new Date(this.fileMap[b].created_at).getTime();
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
      const blog = this.fileMap[title];
      // 名前
      const name = blog.sourceBase.replace(".md", "");
      blog.fileName = name;
      // 配列に追加
      this.blogItems.push(blog);
    });
    // 表示済みブログ件数。
    const showedBlogCount = pageId * PAGE_LIMIT; // 3ページ目だったら30件表示されてることに
    // 「次のページ」ボタンを付けるかどうか。一覧より記事数のほうが多くて、今表示してる記事が一個以上有るとき表示する。
    if (pageId * 10 < this.sourceFileArray.length) {
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
  },
  components: {
    BlogItemCard
  },
  head: () => ({
    title: "記事一覧"
  })
};
</script>
