// 指定したタグの一覧。タグ一覧は作るかどうかわからん。

<template>
  <v-app>
    <BlogItemCard :blogItems="findItem"></BlogItemCard>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BlogItemCard from "@/components/BlogItemCard.vue";

export default Vue.extend({
  // 使うコンポーネント
  components: {
    BlogItemCard,
  },
  // データ取得
  async asyncData({ $content, params }) {
    // 正規表現で大文字小文字を無視する
    let regex = new RegExp(params.id, "i");
    const findItem = await $content("posts")
      .where({ tags: { $regex: regex } }) // タグが含まれているかどうか。
      .sortBy("created_at", "desc") // 投稿日時順に並び替える
      .fetch();
    return { findItem };
  },
  created() {
    this.$store.commit(
      "setBarTitle",
      `タグ名：${this.$route.params.id} / 記事：${
        (this as any).findItem.length
      } 件`
    );
  },
  head() {
    // エラーでちゃうからanyで。解決方法ある？
    const title = `タグ名：${this.$route.params.id} / 記事：${
      (this as any).findItem.length
    } 件`;
    return { title: title };
  },
});
</script>