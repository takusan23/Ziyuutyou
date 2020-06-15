// 指定したタグの一覧。タグ一覧は作るかどうかわからん。

<template>
  <v-app>
    <BlogItemCard :blogItems="blogItems"></BlogItemCard>
  </v-app>
</template>

<script>
// import { sourceFileArray, fileMap } from "../../../contents/posts/summary.json";
import BlogItemCard from "../../../components/BlogItemCard.vue";

export default {
  // 記事一覧のJSON
  asyncData({ params }) {
    return Object.assign({}, require("../../../contents/posts/summary.json"), {
      params
    });
  },
  data: () => ({
    /** タグの名前 */
    tagName: "",
    /** タグが含まれているブログ一覧 */
    blogItems: []
  }),
  created() {
    // タグの名前
    this.tagName = this.$route.params.id;
    // なんかしらんけど並び順が新しい順とは限らないらしい？
    const sortedKeyList = Object.keys(this.fileMap);
    sortedKeyList.sort((a, b) => {
      const aDate = new Date(this.fileMap[a].created_at).getTime();
      const bDate = new Date(this.fileMap[b].created_at).getTime();
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    });
    // タグを含んでいるキー配列
    const hasKeyList = sortedKeyList.filter(key => {
      return this.fileMap[key].tags.includes(this.tagName); // タグを含んでいるかフィルター
    });
    // 記事入れる
    this.blogItems = hasKeyList.map(key => this.fileMap[key]);
    // ファイル名入れる
    this.blogItems.forEach(blog => {
      // 名前
      const name = blog.sourceBase.replace(".md", "");
      blog.fileName = name;
    });
  },
  // タイトル変更など
  head() {
    const title = `タグ：${this.$route.params.id}`;
    return {
      title: title
    };
  },
  components: {
    BlogItemCard
  },
  // TitleBar変える
  mounted() {
    document.getElementById(
      "title"
    ).innerText = `${this.$route.params.id} / 記事数：${this.blogItems.length}`;
  }
};
</script>