// タグのChipまとめたやつ

<template>
  <div>
    <client-only>
      <!-- なんかしらんけどClientとServerでDOMが違うよエラー出るようになっちゃった。まあclient-onlyしとくか。 -->
      <v-chip
        v-for="tag in tags"
        :key="tag"
        class="ma-1 pa-4"
        color="indigo"
        text-color="white"
        :to="`/posts/tag/${tag}`"
        nuxt
      >
        <v-avatar left>
          <v-icon>mdi-tag-text-outline</v-icon>
        </v-avatar>
        {{tag}}
      </v-chip>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["tags"],
  data: () => ({}),
  methods: {}
};
</script>