// タグのChipまとめたやつ

<template>
  <div>
    <v-chip
      v-for="tag in tags"
      :to="`/posts/tag/${tag}/`"
      :key="tag"
      class="ma-1 pa-4"
      color="indigo"
      text-color="white"
      nuxt
    >
      <v-avatar left>
        <v-icon>mdi-tag-text-outline</v-icon>
      </v-avatar>
      {{ tag }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: ["tags"],
  data: () => ({}),
  methods: {},
};
</script>
