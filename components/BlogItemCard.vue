// ブログ一覧の項目。タグ一覧/記事一覧で使うので
// props ： blogItems | 配列 | ブログの記事配列。

<template>
  <div>
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
      <!-- タグ -->
      <TagGroup :tags="item.tags"></TagGroup>
    </v-card>
  </div>
</template>

<script>
// タグ
import TagGroup from "./TagGroup.vue";

export default {
  props: ["blogItems"],
  components: {
    TagGroup
  }
};
</script>